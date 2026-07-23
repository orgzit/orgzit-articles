import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import express, { type Request, type Response, type NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import ServerlessHttp from 'serverless-http';
import dotenv from 'dotenv';
import { Octokit } from '@octokit/rest';
import { TinaNodeBackend, type BackendAuthProvider } from '@tinacms/datalayer';
import databaseClient from '../../tina/__generated__/databaseClient';

dotenv.config();

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';
// public/images/ is two levels above netlify/functions/ in the project root.
const LOCAL_IMAGES_ROOT = path.join(process.cwd(), 'public', 'images');

// Best-effort brute-force throttle on the shared admin password, keyed by
// client IP. Tracked in memory per warm function instance — not perfectly
// distributed across concurrent invocations, and resets on a cold start,
// but meaningfully slows a sustained guessing attempt without pulling in
// external rate-limiting infrastructure just for this. Only failed
// attempts count, so a legitimate user who mistypes a few times never
// gets locked out of their own correct password.
const MAX_FAILED_ATTEMPTS = 10;
const FAILED_ATTEMPT_WINDOW_MS = 5 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; windowStart: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  return req.ip ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.windowStart > FAILED_ATTEMPT_WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILED_ATTEMPTS;
}

function recordFailedAttempt(ip: string): void {
  const entry = failedAttempts.get(ip);
  if (!entry || Date.now() - entry.windowStart > FAILED_ATTEMPT_WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, windowStart: Date.now() });
  } else {
    entry.count += 1;
  }
}

function isAuthorizedRequest(req: Request): boolean {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) return false;

  // Constant-time comparison — a plain === leaks how many leading
  // characters matched via response-time differences. The length check
  // first is the standard, accepted exception: it leaks far less (just
  // whether lengths match) than a byte-by-byte comparison would.
  const provided = Buffer.from(String(req.headers['authorization'] ?? ''));
  const expected = Buffer.from(`Bearer ${process.env.ADMIN_PASSWORD ?? ''}`);
  const ok = provided.length === expected.length && crypto.timingSafeEqual(provided, expected);

  if (!ok) recordFailedAttempt(ip);
  return ok;
}

// Independent of the /admin page gate (netlify/edge-functions/admin-gate.ts) —
// this is what actually stops someone from POSTing GraphQL mutations straight
// to this endpoint without ever going through the /admin UI.
const sharedPasswordAuthProvider: BackendAuthProvider = {
  isAuthorized: async (req) => {
    if (isAuthorizedRequest(req as unknown as Request)) {
      return { isAuthorized: true };
    }
    return { isAuthorized: false, errorMessage: 'Unauthorized', errorCode: 401 };
  },
};

function getOctokit() {
  return new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
}

function repoInfo() {
  return {
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    branch: process.env.GITHUB_BRANCH || 'main',
  };
}

// Guards every media path against traversal outside public/images/ — an
// unsanitized directory/filename (e.g. "../../netlify/functions") would
// otherwise let anyone holding the shared admin password read, overwrite,
// or delete files anywhere on disk (locally) or anywhere in the GitHub
// repo (production) — including this backend's own source code. Every
// route below resolves its final path through one of these before
// touching the filesystem or GitHub, rather than trusting the request.
function safeLocalPath(...segments: string[]): string {
  const resolved = path.resolve(LOCAL_IMAGES_ROOT, ...segments);
  if (resolved !== LOCAL_IMAGES_ROOT && !resolved.startsWith(LOCAL_IMAGES_ROOT + path.sep)) {
    throw new Error('Invalid path: escapes public/images/');
  }
  return resolved;
}

// Every media path is relative to public/images/ — matching the existing
// convention every migrated article's images already use. path.posix.join
// collapses ".." segments; if the collapsed result no longer starts with
// public/images/, the request was trying to escape it.
function safeRepoPath(directory: string, filename = ''): string {
  const joined = filename
    ? path.posix.join('public/images', directory, filename)
    : path.posix.join('public/images', directory);
  if (joined !== 'public/images' && !joined.startsWith('public/images/')) {
    throw new Error('Invalid path: escapes public/images/');
  }
  return joined;
}

// The media manager's grid/list rendering reads item.thumbnails["75x75"] and
// ["400x400"] directly, and falls back to a generic file icon if the key is
// missing — regardless of whether the *browsing* UI ever actually requested
// thumbnailSizes on this particular list() call (it usually doesn't; only a
// separate post-upload reconciliation path does). So these are populated
// unconditionally on every response rather than only when asked for. There's
// no real thumbnail-resizing service here, so every size just reuses the
// full-size image itself, which the browser scales down fine for previews.
const THUMBNAIL_SIZES = [{ w: 75, h: 75 }, { w: 400, h: 400 }, { w: 1000, h: 1000 }];

function buildThumbnails(src: string): Record<string, string> {
  const thumbnails: Record<string, string> = {};
  for (const { w, h } of THUMBNAIL_SIZES) {
    thumbnails[`${w}x${h}`] = src;
  }
  return thumbnails;
}

// Server-side upload validation — the media store's `accept`/`maxSize` are
// enforced client-side only and don't stop anyone calling this endpoint
// directly. SVG is deliberately excluded even though it's a common image
// format: it's XML and can carry an embedded <script>, a well-known upload-
// based XSS vector — and nothing in this project currently uses it.
const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
// Matches the ~1MB base64 cap the GitHub Contents API itself enforces —
// see media-store.ts's client-side maxSize, kept in sync with this.
const MAX_UPLOAD_BYTES = 1024 * 1024;

// Extensions are trivially spoofable (naming a script "photo.jpg" defeats
// an extension-only check) — this confirms the actual bytes match a real
// image format before anything gets written to disk or committed to GitHub.
function matchesImageSignature(ext: string, buf: Buffer): boolean {
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return buf.length > 2 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    case '.png':
      return buf.length > 3 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
    case '.gif':
      return buf.length > 2 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46;
    case '.webp':
      return (
        buf.length > 11 &&
        buf.toString('ascii', 0, 4) === 'RIFF' &&
        buf.toString('ascii', 8, 12) === 'WEBP'
      );
    default:
      return false;
  }
}

function validateImageUpload(filename: string, buf: Buffer): string | null {
  if (buf.length === 0) return 'File is empty';
  if (buf.length > MAX_UPLOAD_BYTES) return 'File exceeds the 1MB upload limit';
  const ext = path.extname(filename).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) return `File type ${ext || '(none)'} is not allowed`;
  if (!matchesImageSignature(ext, buf)) return 'File content does not match its extension';
  return null;
}

const mediaRouter = express.Router();

mediaRouter.use((req: Request, res: Response, next: NextFunction) => {
  if (!isAuthorizedRequest(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
});

mediaRouter.get('/list', async (req: Request, res: Response) => {
  // Media contents change (uploads/deletes) — never let the browser serve a
  // stale cached listing for a folder it already fetched once.
  res.set('Cache-Control', 'no-store');
  const directory = String(req.query.directory || '');
  try {
    if (isLocal) {
      const dirPath = safeLocalPath(directory);
      let entries: string[] = [];
      try {
        entries = await fs.readdir(dirPath);
      } catch {
        entries = [];
      }
      const items = await Promise.all(
        entries.map(async (name) => {
          const stat = await fs.stat(path.join(dirPath, name));
          if (stat.isDirectory()) {
            return { type: 'dir' as const, id: path.posix.join(directory, name), filename: name, directory };
          }
          const src = path.posix.join('/images', directory, name);
          return {
            type: 'file' as const,
            id: path.posix.join(directory, name),
            filename: name,
            directory,
            src,
            thumbnails: buildThumbnails(src),
          };
        })
      );
      res.json({ items });
      return;
    }

    const octokit = getOctokit();
    const { owner, repo, branch } = repoInfo();
    const dirPath = safeRepoPath(directory);
    const { data } = await octokit.rest.repos.getContent({ owner, repo, path: dirPath, ref: branch });
    const list = Array.isArray(data) ? data : [data];
    const items = list.map((entry) => {
      if (entry.type === 'dir') {
        return { type: 'dir' as const, id: path.posix.join(directory, entry.name), filename: entry.name, directory };
      }
      const src = path.posix.join('/images', directory, entry.name);
      return {
        type: 'file' as const,
        id: path.posix.join(directory, entry.name),
        filename: entry.name,
        directory,
        src,
        thumbnails: buildThumbnails(src),
      };
    });
    res.json({ items });
  } catch (err) {
    // A directory that doesn't exist yet is a normal, empty result — not an error.
    res.json({ items: [] });
  }
});

mediaRouter.post('/upload', async (req: Request, res: Response) => {
  const { directory = '', filename, contentBase64 } = req.body as {
    directory?: string;
    filename: string;
    contentBase64: string;
  };
  if (!filename || !contentBase64) {
    res.status(400).json({ error: 'filename and contentBase64 are required' });
    return;
  }

  const decoded = Buffer.from(contentBase64, 'base64');
  const validationError = validateImageUpload(filename, decoded);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    if (isLocal) {
      const filePath = safeLocalPath(directory, filename);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, decoded);
      const src = path.posix.join('/images', directory, filename);
      res.json({
        type: 'file',
        id: path.posix.join(directory, filename),
        filename,
        directory,
        src,
        thumbnails: buildThumbnails(src),
      });
      return;
    }

    const octokit = getOctokit();
    const { owner, repo, branch } = repoInfo();
    const filePath = safeRepoPath(directory, filename);

    // createOrUpdateFileContents needs the existing file's sha to update it —
    // omit it entirely when creating a new file.
    let sha: string | undefined;
    try {
      const existing = await octokit.rest.repos.getContent({ owner, repo, path: filePath, ref: branch });
      if (!Array.isArray(existing.data)) sha = existing.data.sha;
    } catch {
      // File doesn't exist yet — that's fine, this is a create, not an update.
    }

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      branch,
      path: filePath,
      message: `Upload media: ${filePath}`,
      content: contentBase64,
      sha,
    });

    const src = path.posix.join('/images', directory, filename);
    res.json({
      type: 'file',
      id: path.posix.join(directory, filename),
      filename,
      directory,
      src,
      thumbnails: buildThumbnails(src),
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Upload failed' });
  }
});

mediaRouter.delete('/delete', async (req: Request, res: Response) => {
  const { directory = '', filename, type } = req.body as {
    directory?: string;
    filename: string;
    type?: 'file' | 'dir';
  };
  if (!filename) {
    res.status(400).json({ error: 'filename is required' });
    return;
  }

  try {
    // Folders are deleted by removing every file inside them recursively —
    // GitHub doesn't track empty directories, so once all files under a
    // path are gone the folder itself disappears with nothing left to delete.
    if (type === 'dir') {
      if (isLocal) {
        await fs.rm(safeLocalPath(directory, filename), { recursive: true, force: true });
        res.json({ ok: true });
        return;
      }

      const octokit = getOctokit();
      const { owner, repo, branch } = repoInfo();

      async function deleteRecursive(repoDirPath: string) {
        const { data } = await octokit.rest.repos.getContent({ owner, repo, path: repoDirPath, ref: branch });
        const entries = Array.isArray(data) ? data : [data];
        for (const entry of entries) {
          if (entry.type === 'dir') {
            await deleteRecursive(entry.path);
          } else if (entry.type === 'file') {
            await octokit.rest.repos.deleteFile({
              owner,
              repo,
              branch,
              path: entry.path,
              message: `Delete media: ${entry.path}`,
              sha: entry.sha,
            });
          }
        }
      }

      await deleteRecursive(safeRepoPath(directory, filename));
      res.json({ ok: true });
      return;
    }

    if (isLocal) {
      await fs.unlink(safeLocalPath(directory, filename));
      res.json({ ok: true });
      return;
    }

    const octokit = getOctokit();
    const { owner, repo, branch } = repoInfo();
    const filePath = safeRepoPath(directory, filename);
    const existing = await octokit.rest.repos.getContent({ owner, repo, path: filePath, ref: branch });
    if (Array.isArray(existing.data)) throw new Error('Path is a directory, not a file');

    await octokit.rest.repos.deleteFile({
      owner,
      repo,
      branch,
      path: filePath,
      message: `Delete media: ${filePath}`,
      sha: existing.data.sha,
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Delete failed' });
  }
});

// Extracts every /images/... path an article file actually references —
// markdown images, raw <img> tags, and the authorAvatar frontmatter field.
function extractImageRefs(content: string): string[] {
  const refs: string[] = [];
  for (const m of content.matchAll(/!\[[^\]]*\]\((\/images\/[^)\s]+)/g)) refs.push(m[1]);
  for (const m of content.matchAll(/<img[^>]+src=["'](\/images\/[^"']+)["']/g)) refs.push(m[1]);
  const avatarMatch = content.match(/^authorAvatar:\s*"?(\/images\/[^"\n]+)"?/m);
  if (avatarMatch) refs.push(avatarMatch[1]);
  return refs;
}

function summarizeUsage(
  usageMap: Map<string, string[]>,
  foldersWithFiles: { folder: string; files: string[] }[]
) {
  const folders = foldersWithFiles.map(({ folder, files }) => {
    const fileDetails = files.map((filename) => {
      const imgPath = folder === '(root)' ? `/images/${filename}` : `/images/${folder}/${filename}`;
      const usedIn = usageMap.get(imgPath) || [];
      return { filename, used: usedIn.length > 0, usedIn };
    });
    const usedCount = fileDetails.filter((f) => f.used).length;
    return {
      folder,
      totalCount: files.length,
      usedCount,
      unusedCount: files.length - usedCount,
      usedInFiles: [...new Set(fileDetails.flatMap((f) => f.usedIn))],
      files: fileDetails,
    };
  });
  folders.sort((a, b) => a.folder.localeCompare(b.folder));
  const totalImages = folders.reduce((sum, f) => sum + f.totalCount, 0);
  const usedImages = folders.reduce((sum, f) => sum + f.usedCount, 0);
  return { totalImages, usedImages, unusedImages: totalImages - usedImages, folders };
}

mediaRouter.get('/usage', async (req: Request, res: Response) => {
  res.set('Cache-Control', 'no-store');
  try {
    const usageMap = new Map<string, string[]>();
    const addUsage = (imgPath: string, mdFile: string) => {
      const arr = usageMap.get(imgPath.trim()) ?? [];
      if (!arr.includes(mdFile)) arr.push(mdFile);
      usageMap.set(imgPath.trim(), arr);
    };

    if (isLocal) {
      const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles');
      const mdFiles = (await fs.readdir(articlesDir)).filter((f) => f.endsWith('.md'));
      for (const mdFile of mdFiles) {
        const content = await fs.readFile(path.join(articlesDir, mdFile), 'utf-8');
        for (const ref of extractImageRefs(content)) addUsage(ref, mdFile);
      }

      const rootEntries = await fs.readdir(LOCAL_IMAGES_ROOT, { withFileTypes: true });
      const folderNames = rootEntries.filter((e) => e.isDirectory()).map((e) => e.name);
      const rootFiles = rootEntries.filter((e) => e.isFile()).map((e) => e.name);

      const foldersWithFiles = await Promise.all(
        folderNames.map(async (folder) => ({
          folder,
          files: await fs.readdir(path.join(LOCAL_IMAGES_ROOT, folder)),
        }))
      );
      if (rootFiles.length > 0) foldersWithFiles.push({ folder: '(root)', files: rootFiles });

      res.json(summarizeUsage(usageMap, foldersWithFiles));
      return;
    }

    const octokit = getOctokit();
    const { owner, repo, branch } = repoInfo();

    const articlesList = await octokit.rest.repos.getContent({
      owner, repo, ref: branch, path: 'src/content/articles',
    });
    const mdEntries = Array.isArray(articlesList.data)
      ? articlesList.data.filter((e) => e.type === 'file' && e.name.endsWith('.md'))
      : [];
    for (const entry of mdEntries) {
      const file = await octokit.rest.repos.getContent({ owner, repo, ref: branch, path: entry.path });
      if (Array.isArray(file.data) || file.data.type !== 'file') continue;
      const content = Buffer.from(file.data.content, 'base64').toString('utf-8');
      for (const ref of extractImageRefs(content)) addUsage(ref, entry.name);
    }

    const imagesList = await octokit.rest.repos.getContent({
      owner, repo, ref: branch, path: 'public/images',
    });
    const imageEntries = Array.isArray(imagesList.data) ? imagesList.data : [];
    const folderEntries = imageEntries.filter((e) => e.type === 'dir');
    const rootFileEntries = imageEntries.filter((e) => e.type === 'file');

    const foldersWithFiles = await Promise.all(
      folderEntries.map(async (dir) => {
        const sub = await octokit.rest.repos.getContent({ owner, repo, ref: branch, path: dir.path });
        const files = Array.isArray(sub.data) ? sub.data.filter((e) => e.type === 'file').map((e) => e.name) : [];
        return { folder: dir.name, files };
      })
    );
    if (rootFileEntries.length > 0) {
      foldersWithFiles.push({ folder: '(root)', files: rootFileEntries.map((e) => e.name) });
    }

    res.json(summarizeUsage(usageMap, foldersWithFiles));
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Usage report failed' });
  }
});

// Backs the built-in search box on the "Support Articles" collection list in
// /admin (tina/search-client.ts wires it up on the frontend). Tina's own
// search backends — TinaCMSSearchClient (TinaCloud's hosted index) and
// LocalSearchClient (tinacms dev's own localhost:4001 index server) — don't
// apply to this self-hosted setup, so this does a plain, live, case-
// insensitive text match over each article's frontmatter + body instead of
// maintaining a separate search index.
function parseFrontmatterField(content: string, key: string): string {
  const match = content.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'));
  return match ? match[1] : '';
}

const searchRouter = express.Router();

searchRouter.use((req: Request, res: Response, next: NextFunction) => {
  if (!isAuthorizedRequest(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
});

searchRouter.get('/', async (req: Request, res: Response) => {
  // Search results must never be served stale from the browser's HTTP cache.
  res.set('Cache-Control', 'no-store');
  const query = String(req.query.q || '').trim().toLowerCase();
  // Every word must appear somewhere in the article, but not as one exact
  // contiguous phrase — a literal whole-phrase match means "config" (singular)
  // fails to find a title like "Configs" (plural), which is the kind of near
  // miss a real search box should tolerate.
  const queryWords = query.split(/\s+/).filter(Boolean);
  const limit = Number(req.query.limit) || 15;

  if (!query) {
    res.json({ results: [], total: 0, nextCursor: null, prevCursor: null });
    return;
  }

  try {
    let entries: { filename: string; content: string }[];

    if (isLocal) {
      const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles');
      const mdFiles = (await fs.readdir(articlesDir)).filter((f) => f.endsWith('.md'));
      entries = await Promise.all(
        mdFiles.map(async (filename) => ({
          filename,
          content: await fs.readFile(path.join(articlesDir, filename), 'utf-8'),
        }))
      );
    } else {
      const octokit = getOctokit();
      const { owner, repo, branch } = repoInfo();
      const list = await octokit.rest.repos.getContent({ owner, repo, ref: branch, path: 'src/content/articles' });
      const mdEntries = Array.isArray(list.data)
        ? list.data.filter((e) => e.type === 'file' && e.name.endsWith('.md'))
        : [];
      entries = await Promise.all(
        mdEntries.map(async (entry) => {
          const file = await octokit.rest.repos.getContent({ owner, repo, ref: branch, path: entry.path });
          const content =
            !Array.isArray(file.data) && file.data.type === 'file'
              ? Buffer.from(file.data.content, 'base64').toString('utf-8')
              : '';
          return { filename: entry.name, content };
        })
      );
    }

    const matches = entries
      .map(({ filename, content }) => {
        const title = parseFrontmatterField(content, 'title') || filename;
        const summary = parseFrontmatterField(content, 'summary');
        const category = parseFrontmatterField(content, 'category');
        const haystack = `${title} ${summary} ${category} ${content}`.toLowerCase();
        return { filename, title, summary, category, matched: queryWords.every((w) => haystack.includes(w)) };
      })
      .filter((m) => m.matched);

    const results = matches.slice(0, limit).map((m) => ({
      _id: `article:${m.filename}`,
      _match: {},
      title: m.title,
      summary: m.summary,
      category: m.category,
    }));

    res.json({ results, total: matches.length, nextCursor: null, prevCursor: null });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Search failed' });
  }
});

const app = express();
app.use(express.urlencoded({ extended: true }));
// No CORS middleware — the admin UI and this API are always served from
// the same origin (relative /api/tina/* fetches), so there's no legitimate
// cross-origin caller. Without CORS headers, browsers already enforce
// same-origin by default; adding cors() here would only have widened that
// to allow any origin to read responses if a request were ever replayed
// cross-site.
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use('/api/tina/media', mediaRouter);
app.use('/api/tina/search', searchRouter);

const tinaBackend = TinaNodeBackend({
  authProvider: sharedPasswordAuthProvider,
  databaseClient,
});

// Express 5 (path-to-regexp v8+) requires a named wildcard segment —
// bare '*' throws "Missing parameter name" at startup.
app.all('/api/tina/*splat', (req: Request, res: Response, _next: NextFunction) => tinaBackend(req, res));

export const handler = ServerlessHttp(app);
