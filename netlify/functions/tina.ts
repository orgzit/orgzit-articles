import path from 'node:path';
import fs from 'node:fs/promises';
import express, { type Request, type Response, type NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import ServerlessHttp from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Octokit } from '@octokit/rest';
import { TinaNodeBackend, type BackendAuthProvider } from '@tinacms/datalayer';
import databaseClient from '../../tina/__generated__/databaseClient';

dotenv.config();

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';
// public/images/ is two levels above netlify/functions/ in the project root.
const LOCAL_IMAGES_ROOT = path.join(process.cwd(), 'public', 'images');

function isAuthorizedRequest(req: Request): boolean {
  return req.headers['authorization'] === `Bearer ${process.env.ADMIN_PASSWORD}`;
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

// Every media path is relative to public/images/ — matching the existing
// convention every migrated article's images already use.
function repoPath(directory: string, filename: string) {
  const dir = directory.replace(/^\/+|\/+$/g, '');
  return path.posix.join('public/images', dir, filename);
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
      const dirPath = path.join(LOCAL_IMAGES_ROOT, directory);
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
    const dirPath = path.posix.join('public/images', directory.replace(/^\/+|\/+$/g, ''));
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

  try {
    if (isLocal) {
      const dirPath = path.join(LOCAL_IMAGES_ROOT, directory);
      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(path.join(dirPath, filename), Buffer.from(contentBase64, 'base64'));
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
    const filePath = repoPath(directory, filename);

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
      const folderRelPath = path.posix.join(directory, filename);

      if (isLocal) {
        await fs.rm(path.join(LOCAL_IMAGES_ROOT, folderRelPath), { recursive: true, force: true });
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

      await deleteRecursive(path.posix.join('public/images', folderRelPath));
      res.json({ ok: true });
      return;
    }

    if (isLocal) {
      await fs.unlink(path.join(LOCAL_IMAGES_ROOT, directory, filename));
      res.json({ ok: true });
      return;
    }

    const octokit = getOctokit();
    const { owner, repo, branch } = repoInfo();
    const filePath = repoPath(directory, filename);
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
app.use(cors());
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
