import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiBaseUrl } from '../config/runtime-config';
import { ApiResponse } from '../models/api-response';
import { AuthResult, CurrentUser, LoginRequest, RefreshRequest } from './auth.models';

const REFRESH_KEY = 'gkmps.refreshToken';
const USER_KEY = 'gkmps.user';

/**
 * Holds auth state.
 *  - accessToken: in memory only (signal), per backend guidance (limits XSS blast radius)
 *  - refreshToken + user: localStorage so a page reload keeps the session
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = apiBaseUrl();

  private accessToken = signal<string | null>(null);
  readonly currentUser = signal<CurrentUser | null>(this.readStoredUser());
  readonly isLoggedIn = computed(() => !!this.currentUser());

  getAccessToken(): string | null {
    return this.accessToken();
  }

  getRefreshToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(REFRESH_KEY) : null;
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

  login(body: LoginRequest): Observable<CurrentUser> {
    return this.http
      .post<ApiResponse<AuthResult>>(`${this.base}/api/auth/login`, body)
      .pipe(map((r) => this.applyAuth(r.data!)));
  }

  // Changing your own password signs out every other session; this one gets fresh tokens.
  changePassword(currentPassword: string, newPassword: string): Observable<CurrentUser> {
    return this.http
      .post<ApiResponse<AuthResult>>(`${this.base}/api/auth/change-password`, { currentPassword, newPassword })
      .pipe(map((r) => this.applyAuth(r.data!)));
  }

  // Called by the interceptor on a 401.
  refresh(): Observable<string> {
    // After a page reload the in-memory access token is gone; the refresh token alone is
    // enough for the backend, so only send the access token when we still have one.
    const body: RefreshRequest = {
      refreshToken: this.getRefreshToken() ?? '',
      ...(this.accessToken() ? { accessToken: this.accessToken()! } : {}),
    };
    return this.http
      .post<ApiResponse<AuthResult>>(`${this.base}/api/auth/refresh`, body)
      .pipe(
        map((r) => r.data!),
        tap((result) => this.applyAuth(result)),
        map((result) => result.accessToken),
      );
  }

  logout(): void {
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
    };
    this.currentUser.set(user);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(REFRESH_KEY, result.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    return user;
  }

  private clear(): void {
    this.accessToken.set(null);
    this.currentUser.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  private readStoredUser(): CurrentUser | null {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as CurrentUser;
    } catch {
      return null;
    }
  }
}
