/**
 * Shared, framework-free session bookkeeping so the HTTP interceptor and the idle tracker can
 * both use it without injecting each other.
 *
 * - lastActivity lives in localStorage so every open tab shares it: working in one tab keeps
 *   the others signed in, and all of them time out together.
 * - lastServerContact is per tab: when this tab last heard from the API (any response
 *   counts, because the server records each authenticated request as activity).
 */
const LAST_ACTIVITY_KEY = 'gkmps.lastActivity';
const IDLE_MINUTES_KEY = 'gkmps.idleTimeoutMinutes';
const SIGNOUT_REASON_KEY = 'gkmps.signoutReason';

export const DEFAULT_IDLE_MINUTES = 30;

export type SignOutReason = 'idle' | 'expired' | 'manual';

let lastServerContact = Date.now();

function storage(): Storage | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

export function recordActivity(at = Date.now()): void {
  storage()?.setItem(LAST_ACTIVITY_KEY, String(at));
}

export function lastActivity(): number {
  const raw = Number(storage()?.getItem(LAST_ACTIVITY_KEY));
  return Number.isFinite(raw) && raw > 0 ? raw : Date.now();
}

export function noteServerContact(): void {
  lastServerContact = Date.now();
}

export function msSinceServerContact(): number {
  return Date.now() - lastServerContact;
}

export function idleTimeoutMinutes(): number {
  const raw = Number(storage()?.getItem(IDLE_MINUTES_KEY));
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_IDLE_MINUTES;
}

export function setIdleTimeoutMinutes(minutes: number | null | undefined): void {
  if (minutes && minutes > 0) storage()?.setItem(IDLE_MINUTES_KEY, String(minutes));
}

/** Remembered across the redirect (and other tabs) so the login page can say why. */
export function setSignOutReason(reason: SignOutReason): void {
  storage()?.setItem(SIGNOUT_REASON_KEY, reason);
}

export function takeSignOutReason(): SignOutReason | null {
  const s = storage();
  const reason = s?.getItem(SIGNOUT_REASON_KEY) as SignOutReason | null;
  s?.removeItem(SIGNOUT_REASON_KEY);
  return reason;
}

export function clearSessionActivity(): void {
  storage()?.removeItem(LAST_ACTIVITY_KEY);
}
