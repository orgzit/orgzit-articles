// Registers a "Media Usage" screen in the Tina admin sidebar, right below
// "Media Manager" (same navCategory, added right after Tina's own
// MediaManagerScreenPlugin — see cmsCallback in config.ts). Tina's own
// built-in usage dashboard (media-usage-dashboard-screen.tsx in the tinacms
// package) only auto-registers when isLocalClient is true, which doesn't
// apply to this self-hosted setup — so this is a small custom equivalent
// that reuses our own GET /api/tina/media/usage endpoint instead of Tina's
// client-side document scanner.
import React, { useCallback, useEffect, useState } from 'react';
import { useCMS } from 'tinacms';

const STORAGE_KEY = 'orgzit-admin-token';

interface UsageFile {
  filename: string;
  used: boolean;
  usedIn: string[];
}

interface UsageFolder {
  folder: string;
  totalCount: number;
  usedCount: number;
  unusedCount: number;
  files: UsageFile[];
}

interface UsageReport {
  totalImages: number;
  usedImages: number;
  unusedImages: number;
  folders: UsageFolder[];
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M21 15l-5-5-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: 'total' | 'used' | 'unused' }) {
  const toneClass =
    tone === 'used' ? 'text-emerald-600' : tone === 'unused' ? 'text-amber-600' : 'text-blue-600';
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className={`text-3xl font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}

// Shown before any folder delete goes through — lists exactly which images
// inside the folder are still referenced by an article, and by name, so a
// non-technical user can see what would break before confirming.
function DeleteFolderModal({
  folder,
  deleting,
  error,
  onCancel,
  onConfirm,
}: {
  folder: UsageFolder;
  deleting: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const usedFiles = folder.files.filter((f) => f.used);
  const unusedFiles = folder.files.filter((f) => !f.used);
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
          <h3 className="font-semibold text-gray-800">
            Delete folder <span className="font-mono">{folder.folder}</span>?
          </h3>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-lg leading-none">
            ✕
          </button>
        </div>

        <div className="px-5 py-4 overflow-auto grow">
          <p className="text-sm text-gray-600 mb-4">
            This folder contains {plural(folder.totalCount, 'image')}: {plural(folder.usedCount, 'image')} currently
            in use, {plural(folder.unusedCount, 'image')} unused.
          </p>

          {usedFiles.length > 0 && (
            <>
              <p className="text-sm font-semibold text-amber-700 mb-2">
                The following {usedFiles.length === 1 ? 'image is' : 'images are'} still referenced in an article.
                Deleting this folder will remove {usedFiles.length === 1 ? 'it' : 'them'} from that article as well:
              </p>
              <ul className="space-y-2 mb-4">
                {usedFiles.map((f) => (
                  <li key={f.filename} className="text-sm bg-amber-50 border border-amber-100 rounded-lg p-2.5">
                    <div className="font-mono text-xs text-gray-700">{f.filename}</div>
                    <div className="text-gray-500 mt-1 flex gap-1 flex-wrap">
                      Used in:
                      {f.usedIn.map((name) => (
                        <code key={name} className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-xs">
                          {name}
                        </code>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              {unusedFiles.length > 0 && (
                <p className="text-sm text-gray-500">
                  The remaining {plural(unusedFiles.length, 'image')} in this folder are not referenced anywhere.
                </p>
              )}
            </>
          )}

          {usedFiles.length === 0 && (
            <p className="text-sm text-emerald-700">
              None of the {plural(folder.totalCount, 'image')} in this folder {folder.totalCount === 1 ? 'is' : 'are'}{' '}
              referenced in any article. This folder can be safely deleted.
            </p>
          )}

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </div>

        <div className="px-5 py-4 border-t border-gray-200 flex gap-3 justify-end shrink-0">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {deleting
              ? 'Deleting…'
              : usedFiles.length > 0
              ? 'Delete anyway'
              : 'Yes, delete folder'}
          </button>
        </div>
      </div>
    </div>
  );
}

function FolderRow({ folder, onDeleted }: { folder: UsageFolder; onDeleted: () => void }) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const cms = useCMS();
  const isRealFolder = folder.folder !== '(root)';

  const openConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteError(null);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await cms.media.delete({ type: 'dir', id: folder.folder, directory: '', filename: folder.folder });
      setConfirmOpen(false);
      onDeleted();
    } catch (err) {
      setDeleteError(`Could not delete "${folder.folder}": ${err instanceof Error ? err.message : 'unknown error'}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-3 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-gray-50"
      >
        <span className="font-semibold text-gray-800 flex items-center gap-2">
          <span className={`inline-block transition-transform text-gray-400 ${open ? 'rotate-90' : ''}`}>▶</span>
          {folder.folder}
        </span>
        <span className="flex gap-2 text-xs flex-wrap items-center">
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold whitespace-nowrap">
            {folder.totalCount} total
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold whitespace-nowrap">
            {folder.usedCount} used
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold whitespace-nowrap">
            {folder.unusedCount} unused
          </span>
          {isRealFolder && (
            <button
              type="button"
              disabled={deleting}
              onClick={openConfirm}
              className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-semibold whitespace-nowrap hover:bg-red-100 disabled:opacity-50"
            >
              Delete folder
            </button>
          )}
        </span>
      </button>
      {confirmOpen && (
        <DeleteFolderModal
          folder={folder}
          deleting={deleting}
          error={deleteError}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
      {open && (
        <table className="w-full text-sm border-t border-gray-200">
          <thead>
            <tr className="text-left text-xs uppercase text-gray-500">
              <th className="px-4 py-2">File</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Used in</th>
            </tr>
          </thead>
          <tbody>
            {folder.files.map((f) => (
              <tr key={f.filename} className="border-t border-gray-100">
                <td className="px-4 py-2 font-mono text-xs">{f.filename}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      f.used ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {f.used ? 'Used' : 'Unused'}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {f.usedIn.length > 0
                    ? f.usedIn.map((name) => (
                        <code key={name} className="bg-gray-100 rounded px-1 py-0.5 text-xs mr-1">
                          {name}
                        </code>
                      ))
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function MediaUsageDashboard() {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [report, setReport] = useState<UsageReport | null>(null);
  const [query, setQuery] = useState('');

  const fetchReport = useCallback(() => {
    setState('loading');
    const password = window.localStorage.getItem(STORAGE_KEY);
    fetch('/api/tina/media/usage', {
      headers: { Authorization: `Bearer ${password ?? ''}` },
      cache: 'no-store',
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        setReport(data);
        setState('ok');
      })
      .catch(() => setState('error'));
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  if (state === 'loading' && !report) {
    return <div className="p-6 text-gray-500">Loading media usage report…</div>;
  }
  if (state === 'error' && !report) {
    return <div className="p-6 text-red-600">Could not load the media usage report.</div>;
  }
  if (!report) {
    return null;
  }

  const trimmedQuery = query.trim().toLowerCase();
  const filteredFolders = trimmedQuery
    ? report.folders.filter((f) => f.folder.toLowerCase().includes(trimmedQuery))
    : report.folders;

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total images" value={report.totalImages} tone="total" />
        <StatCard label="Used" value={report.usedImages} tone="used" />
        <StatCard label="Unused" value={report.unusedImages} tone="unused" />
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search folder name…"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {trimmedQuery && (
        <p className="text-xs text-gray-500 mb-3">
          {filteredFolders.length === 0
            ? `No folders match "${query}".`
            : `${filteredFolders.length} of ${report.folders.length} folders match "${query}".`}
        </p>
      )}

      {filteredFolders.map((folder) => (
        <FolderRow key={folder.folder} folder={folder} onDeleted={fetchReport} />
      ))}
    </div>
  );
}

const mediaUsageScreenPlugin = {
  __type: 'screen' as const,
  name: 'Media Usage',
  Icon: ImageIcon,
  layout: 'fullscreen' as const,
  Component: MediaUsageDashboard,
};

export default mediaUsageScreenPlugin;
