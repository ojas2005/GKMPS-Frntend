import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';

// Shared across concurrent requests so we only refresh once.
let isRefreshing = false;
const refreshedToken$ = new BehaviorSubject<string | null>(null);

/**
 * Functional interceptor:
 *  - attaches `Authorization: Bearer <token>` to every gateway call
 *  - on 401, refreshes the token once and retries the original request
 *  - if refresh fails, logs out and redirects to login
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Only the token endpoints themselves skip refresh-and-retry. Other /api/auth calls
  // (register, change-password) are ordinary authenticated requests and must recover
  // from an expired token like anything else.
  const isAuthCall = /\/api\/auth\/(login|refresh|logout)$/.test(req.url.split('?')[0]);

  const withToken = (token: string | null) =>
    token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(withToken(auth.getAccessToken())).pipe(
    catchError((error: HttpErrorResponse) => {
      // Only try to recover from 401s on non-auth endpoints, when we have a refresh token.
      if (error.status !== 401 || isAuthCall || !auth.getRefreshToken()) {
        return throwError(() => error);
      }

      if (isRefreshing) {
        // Wait for the in-flight refresh, then retry.
        return refreshedToken$.pipe(
          filter((t): t is string => t !== null),
          take(1),
          switchMap((token) => next(withToken(token))),
        );
      }

      isRefreshing = true;
      refreshedToken$.next(null);

      return auth.refresh().pipe(
        switchMap((newToken) => {
          isRefreshing = false;
          refreshedToken$.next(newToken);
          return next(withToken(newToken));
        }),
        catchError((refreshErr) => {
          isRefreshing = false;
          auth.logout();
          router.navigate(['/auth/login']);
          return throwError(() => refreshErr);
        }),
      );
    }),
  );
};
