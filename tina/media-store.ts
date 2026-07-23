// Custom Tina media store, backed by our own GitHub-backed endpoints in
// netlify/functions/tina.ts — not a third-party service (Cloudinary/S3/etc).
// The browser never talks to GitHub directly (that would mean exposing the
// GitHub token client-side); it only calls our own password-protected
// backend, which does the actual GitHub API calls server-side.

interface Media {
  type: 'file' | 'dir';
  id: string;
  filename: string;
  directory: string;
  src?: string;
  thumbnails?: { [name: string]: string };
}

interface MediaUploadOptions {
  directory: string;
  file: File;
}

interface MediaListOptions {
  directory?: string;
  limit?: number;
  offset?: string | number;
  thumbnailSizes?: { w: number; h: number }[];
}

interface MediaList {
  items: Media[];
  nextOffset?: string | number;
}

const STORAGE_KEY = 'orgzit-admin-token';

function getStoredPassword(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip the "data:<mime>;base64," prefix — the backend only wants the payload
      resolve(result.slice(result.indexOf(',') + 1));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

class GitHubMediaStore {
  accept = 'image/*';
  // GitHub's Contents API caps base64-encoded uploads at ~1MB per file.
  maxSize = 1024 * 1024;

  private authHeaders(): HeadersInit {
    return { Authorization: `Bearer ${getStoredPassword()}` };
  }

  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const results: Media[] = [];
    for (const { directory, file } of files) {
      const contentBase64 = await fileToBase64(file);
      const res = await fetch('/api/tina/media/upload', {
        method: 'POST',
        headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ directory, filename: file.name, contentBase64 }),
      });
      if (!res.ok) throw new Error(`Upload failed: ${await res.text()}`);
      results.push(await res.json());
    }
    return results;
  }

  async delete(media: Media): Promise<void> {
    const res = await fetch('/api/tina/media/delete', {
      method: 'DELETE',
      headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ directory: media.directory, filename: media.filename, type: media.type }),
    });
    if (!res.ok) throw new Error(`Delete failed: ${await res.text()}`);
  }

  async list(options?: MediaListOptions): Promise<MediaList> {
    const directory = options?.directory ?? '';
    // The grid/list view looks up item.thumbnails["<w>x<h>"] and falls back
    // to a generic file icon if it's missing — forwarding the requested
    // sizes is what makes real image previews show up instead of icons.
    const params = new URLSearchParams({ directory });
    if (options?.thumbnailSizes) {
      params.set('thumbnailSizes', JSON.stringify(options.thumbnailSizes));
    }
    const res = await fetch(`/api/tina/media/list?${params.toString()}`, {
      headers: this.authHeaders(),
    });
    if (!res.ok) throw new Error(`List failed: ${await res.text()}`);
    return res.json();
  }

  parse(media: Media): string {
    return media.src ?? '';
  }
}

export default GitHubMediaStore;
