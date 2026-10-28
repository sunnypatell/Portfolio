const RETRY_KEY = "chunk-reload-at";
const CHUNK_ERROR =
  /ChunkLoadError|Loading chunk|Failed to load chunk|importing a module script failed|dynamically imported module/i;

// a tab open across a deploy asks for deleted chunks; reload once, the timestamp stops loops
export function reloadOnStaleChunk(error: unknown) {
  const text = error instanceof Error ? `${error.name} ${error.message}` : String(error);
  if (!CHUNK_ERROR.test(text)) return;
  try {
    if (Date.now() - Number(sessionStorage.getItem(RETRY_KEY) || 0) <= 10000) return;
    sessionStorage.setItem(RETRY_KEY, String(Date.now()));
  } catch {
    return; // storage blocked means no loop guard, so never reload
  }
  window.location.reload();
}
