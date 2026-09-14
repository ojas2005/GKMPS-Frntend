import { environment } from '../../../environments/environment';

/**
 * Settings read at startup from /config.json, so one production build can be pointed at
 * any backend without rebuilding:
 *   - apiBaseUrl "" (default): same-origin -- the frontend is served from the same domain
 *     as the gateway (e.g. behind the same Caddy), or `ng serve` proxies /api.
 *   - apiBaseUrl "https://api.yourschool.com": frontend hosted elsewhere; that origin must
 *     then be listed in the gateway's Cors:AllowedOrigins (FRONTEND_URL).
 */
export interface RuntimeConfig {
  apiBaseUrl: string;
}

let config: RuntimeConfig = { apiBaseUrl: environment.apiBaseUrl };

export async function loadRuntimeConfig(): Promise<void> {
  try {
    const res = await fetch('config.json', { cache: 'no-store' });
    if (res.ok) {
      const json = (await res.json()) as Partial<RuntimeConfig>;
      if (typeof json.apiBaseUrl === 'string') {
        config = { ...config, apiBaseUrl: json.apiBaseUrl.replace(/\/+$/, '') };
      }
    }
  } catch {
    // No config.json (or unreadable): keep the build-time default.
  }
}

export function apiBaseUrl(): string {
  return config.apiBaseUrl;
}
