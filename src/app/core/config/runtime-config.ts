import { environment } from '../../../environments/environment';

/**
 * Settings read at startup from /config.json, so one production build can be pointed at
 * any backend without rebuilding:
 *   - apiBaseUrl "" (default): same-origin -- the frontend is served from the same domain
 *     as the gateway (e.g. behind the same Caddy), or `ng serve` proxies /api.
 *   - apiBaseUrl "https://api.yourschool.com": frontend hosted elsewhere; that origin must
 *     then be listed in the gateway's Cors:AllowedOrigins (FRONTEND_URL).
 *   - privacyContact: who families contact about their data, shown on the privacy notice
 *     (e.g. "the Principal, principal@school.in, 0120-1234567").
 */
export interface RuntimeConfig {
  apiBaseUrl: string;
  privacyContact: string;
}

let config: RuntimeConfig = { apiBaseUrl: environment.apiBaseUrl, privacyContact: 'the school office' };

export async function loadRuntimeConfig(): Promise<void> {
  try {
    const res = await fetch('config.json', { cache: 'no-store' });
    if (res.ok) {
      const json = (await res.json()) as Partial<RuntimeConfig>;
      if (typeof json.apiBaseUrl === 'string') {
        config = { ...config, apiBaseUrl: json.apiBaseUrl.replace(/\/+$/, '') };
      }
      if (typeof json.privacyContact === 'string' && json.privacyContact.trim()) {
        config = { ...config, privacyContact: json.privacyContact.trim() };
      }
    }
  } catch {
    // No config.json (or unreadable): keep the build-time default.
  }
}

export function apiBaseUrl(): string {
  return config.apiBaseUrl;
}

export function privacyContact(): string {
  return config.privacyContact;
}

/**
 * Opens a download link from the API. File links are relative to the API ("/api/files/...")
 * when the backend keeps files itself, so they're resolved against apiBaseUrl; absolute
 * links (e.g. Azure Blob SAS URLs) open as they are.
 */
export function openDownload(url: string | null | undefined): void {
  if (!url) return;
  const target = url.startsWith('/') ? `${apiBaseUrl()}${url}` : url;
  window.open(target, '_blank', 'noopener');
}
