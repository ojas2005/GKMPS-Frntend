import { Injectable, NgZone, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap, throwError, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiBaseUrl } from '../config/runtime-config';
import { ApiResponse } from '../models/api-response';
import { AuthResult, CurrentUser, LoginOutcome, LoginRequest, PendingAction, RefreshRequest } from './auth.models';
import {
  SignOutReason, clearSessionActivity, noteServerContact, recordActivity, setIdleTimeoutMinutes, setSignOutReason,
} from './session-activity';

const REFRESH_KEY = 'gkmps.refreshToken';
const USER_KEY = 'gkmps.user';
// Set when the user ticked "Keep me signed in on this device".
const REMEMBER_KEY = 'gkmps.remember';

/**
 * Where the sign-in is kept: sessionStorage by default, which the browser wipes when it
 * closes -- so the next person on a shared school computer doesn't inherit the session --
 * or localStorage when the user chose to stay signed in on their own device.
 */
function storages(): { local: Storage | null; session: Storage | null } {
  try {
    return {
      local: typeof localStorage !== 'undefined' ? localStorage : null,
      session: typeof sessionStorage !== 'undefined' ? sessionStorage : null,
    };
  } catch {
    return { local: null, session: null };
  }
}
function remembered(): boolean {
  return storages().local?.getItem(REMEMBER_KEY) === '1';
}
function activeStore(): Storage | null {
  const { local, session } = storages();
  return remembered() ? local : session;
}
function readKey(key: string): string | null {
  const { local, session } = storages();
  return session?.getItem(key) ?? local?.getItem(key) ?? null;
}

/**
 * Holds auth state.
 *  - accessToken: in memory only (signal), per backend guidance (limits XSS blast radius)
 *  - refreshToken + user: sessionStorage (until the browser closes), or localStorage when
 *    the user chose "Keep me signed in" -- either way a page reload keeps the session
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = apiBaseUrl();

  private accessToken = signal<string | null>(null);
  readonly currentUser = signal<CurrentUser | null>(this.readStoredUser());
  readonly isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    // Signing out in one tab (or being signed out for inactivity) signs out every tab.
    if (typeof window !== 'undefined') {
      const router = inject(Router);
      const zone = inject(NgZone);
      window.addEventListener('storage', (e) => {
        if (e.key === REFRESH_KEY && e.newValue === null && this.currentUser()) {
          zone.run(() => {
            this.accessToken.set(null);
            this.currentUser.set(null);
            router.navigate(['/auth/login']);
          });
        }
      });
    }
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  getRefreshToken(): string | null {
    return readKey(REFRESH_KEY);
  }

  hasRole(...roles: string[]): boolean {
    const role = this.currentUser()?.role;
    return !!role && roles.includes(role);
  }

  // Roles that only ever see their own data.
  isSelfService(): boolean {
    return this.hasRole('Student', 'Parent');
  }

  // A parent sees the same self-service pages as their child, so the wording says
  // "my child's" instead of "my".
  isParentView(): boolean {
    return this.hasRole('Parent');
  }

  // The logged-in student's own studentId (null for staff).
  studentId(): string | null {
    return this.currentUser()?.studentId ?? null;
  }

  classId(): string | null {
    return this.currentUser()?.classId ?? null;
  }

  sectionId(): string | null {
    return this.currentUser()?.sectionId ?? null;
  }

  // The logged-in staff member's own staffId (null for students/unlinked accounts).
  staffId(): string | null {
    return this.currentUser()?.staffId ?? null;
  }

  // True when this teacher is the class teacher (head teacher) of some class.
  isClassTeacher(): boolean {
    return !!this.currentUser()?.classTeacherOfClassId;
  }

  classTeacherClassId(): string | null {
    return this.currentUser()?.classTeacherOfClassId ?? null;
  }

  classTeacherSectionId(): string | null {
    return this.currentUser()?.classTeacherOfSectionId ?? null;
  }

  login(body: LoginRequest): Observable<LoginOutcome> {
    // Decided now, so both the password step and the two-step code step store the same way.
    const { local } = storages();
    if (body.rememberMe) local?.setItem(REMEMBER_KEY, '1');
    else local?.removeItem(REMEMBER_KEY);
    return this.http
      .post<ApiResponse<AuthResult>>(`${this.base}/api/auth/login`, body)
      .pipe(
        map((r): LoginOutcome =>
          r.data!.twoFactorRequired
            ? { kind: 'two-factor', challenge: r.data!.twoFactorChallenge! }
            : { kind: 'signed-in', user: this.applyAuth(r.data!) },
        ),
      );
  }

  /** Second step of signing in: a code from the authenticator app, or a recovery code. */
  completeTwoFactor(challenge: string, code: string): Observable<CurrentUser> {
    return this.http
      .post<ApiResponse<AuthResult>>(`${this.base}/api/auth/login/two-factor`, { challenge, code })
      .pipe(map((r) => this.applyAuth(r.data!)));
  }

  /** The step this user must finish before using the app, if any. */
  pendingAction(): PendingAction | null {
    return this.currentUser()?.pendingAction ?? null;
  }

  /** The server said a step is still required (e.g. a stale page after sign-in). */
  markPending(action: PendingAction): void {
    const user = this.currentUser();
    if (user && user.pendingAction !== action) this.storeUser({ ...user, pendingAction: action });
  }

  // Changing your own password signs out every other session; this one gets fresh tokens.
  changePassword(currentPassword: string, newPassword: string): Observable<CurrentUser> {
    return this.http
      .post<ApiResponse<AuthResult>>(`${this.base}/api/auth/change-password`, { currentPassword, newPassword })
      .pipe(map((r) => this.applyAuth(r.data!)));
  }

  // Called by the interceptor on a 401.
  refresh(isRetry = false): Observable<string> {
    const sent = this.getRefreshToken() ?? '';
    // After a page reload the in-memory access token is gone; the refresh token alone is
    // enough for the backend, so only send the access token when we still have one.
    const body: RefreshRequest = {
      refreshToken: sent,
      ...(this.accessToken() ? { accessToken: this.accessToken()! } : {}),
    };
    return this.http
      .post<ApiResponse<AuthResult>>(`${this.base}/api/auth/refresh`, body)
      .pipe(
        map((r) => r.data!),
        tap((result) => this.applyAuth(result)),
        map((result) => result.accessToken),
        // Each refresh token can be used once. If another tab of this browser used it at the
        // same moment, the server refuses this tab -- but that tab stores the new token a
        // moment later, and this one can simply carry on with it.
        catchError((err) =>
          isRetry
            ? throwError(() => err)
            : timer(1500).pipe(
                switchMap(() => {
                  const now = this.getRefreshToken();
                  return now && now !== sent ? this.refresh(true) : throwError(() => err);
                }),
              ),
        ),
      );
  }

  // `reason` is remembered so the login page can explain an automatic sign-out.
  logout(reason: SignOutReason = 'manual'): void {
    setSignOutReason(reason);
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      // Best-effort server-side revoke (needs only the refresh token); ignore failures.
      this.http
        .post(`${this.base}/api/auth/logout`, { refreshToken })
        .subscribe({ error: () => {} });
    }
    this.clear();
  }

  private applyAuth(result: AuthResult): CurrentUser {
    this.accessToken.set(result.accessToken);
    setIdleTimeoutMinutes(result.sessionIdleTimeoutMinutes);
    recordActivity();
    noteServerContact();
    const user: CurrentUser = {
      userId: result.userId,
      email: result.email,
      fullName: result.fullName,
      role: result.role,
      username: result.username ?? null,
      studentId: result.studentId ?? null,
      classId: result.classId ?? null,
      sectionId: result.sectionId ?? null,
      staffId: result.staffId ?? null,
      classTeacherOfClassId: result.classTeacherOfClassId ?? null,
      classTeacherOfSectionId: result.classTeacherOfSectionId ?? null,
      pendingAction: result.pendingAction ?? null,
    };
    const { local, session } = storages();
    // Keep it in exactly one place: the chosen store.
    (remembered() ? session : local)?.removeItem(REFRESH_KEY);
    activeStore()?.setItem(REFRESH_KEY, result.refreshToken);
    this.storeUser(user);
    return user;
  }

  private storeUser(user: CurrentUser): void {
    this.currentUser.set(user);
    const { local, session } = storages();
    (remembered() ? session : local)?.removeItem(USER_KEY);
    activeStore()?.setItem(USER_KEY, JSON.stringify(user));
  }

  private clear(): void {
    this.accessToken.set(null);
    this.currentUser.set(null);
    clearSessionActivity();
    const { local, session } = storages();
    for (const store of [local, session]) {
      store?.removeItem(REFRESH_KEY);
      store?.removeItem(USER_KEY);
    }
    local?.removeItem(REMEMBER_KEY);
  }

  private readStoredUser(): CurrentUser | null {
    const raw = readKey(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as CurrentUser;
    } catch {
      return null;
    }
  }
}
