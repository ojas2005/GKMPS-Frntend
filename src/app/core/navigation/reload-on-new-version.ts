import { NavigationError } from '@angular/router';

// Each page's code is a separate file fetched the first time the page is opened, with the build
// hash in its name. A tab opened before a deploy still runs the old app, and the old files are
// gone from the server, so opening a page it hasn't loaded yet fails -- the router gives up
// and nothing happens on the click. Browsers word it differently:
//   Chrome/Edge  "Failed to fetch dynamically imported module"
//   Safari       "Importing a module script failed."
//   Firefox      "error loading dynamically imported module"
const STALE_BUILD = /dynamically imported module|importing a module script failed|ChunkLoadError|Loading chunk/i;
const GUARD_KEY = 'gkmps.reloadedForNewVersion';

export function isStaleBuildError(error: unknown): boolean {
  const message = error instanceof Error ? `${error.name} ${error.message}` : String(error ?? '');
  return STALE_BUILD.test(message);
}

/**
 * Router navigation-error handler: when a page's code can't be loaded because a newer version
 * was deployed, load the new version straight onto the page that was clicked. Sign-in survives
 * (it's kept in sessionStorage). At most once a minute, so a real outage can't cause a reload loop.
 */
export function reloadOnNewVersion(event: NavigationError): void {
  if (!isStaleBuildError(event.error)) return;
  try {
    const last = Number(sessionStorage.getItem(GUARD_KEY) ?? 0);
    if (Date.now() - last < 60_000) return;
    sessionStorage.setItem(GUARD_KEY, String(Date.now()));
  } catch {
    // Storage blocked: still reload; the browser's own cache rules keep this from looping.
  }
  window.location.assign(event.url);
}
