import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, filter, of, switchMap, take, tap, throwError } from 'rxjs';
import { noteServerContact } from './session-activity';
import { AuthService } from './auth.service';

// Shared across concurrent requests so we only refresh once. `false` means the last refresh
// failed, so requests waiting on it give up instead of hanging.
let isRefreshing = false;
const refreshedToken$ = new BehaviorSubject<string | null | false>(null);

/**
 * Functional interceptor:
 *  - attaches `Authorization: Bearer <token>` to every gateway call
 *  - on 401, refreshes the token once and retries the original request
 *  - signs out only when the refresh itself fails -- never because the retried request
 *    failed for an ordinary reason (403, 404, 500...)
 *  - on a 403 saying a required step comes first, shows the account page
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Only the token endpoints themselves skip refresh-and-retry. Other /api/auth calls
  // (register, change-password) are ordinary authenticated requests and must recover
  // from an expired token like anything else.
  const isAuthCall = /\/api\/auth\/(login|refresh|logout)$/.test(req.url.split('?')[0]);

  const withToken = (token: string | null) =>
    token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  // Sends the request. The server counts every signed-in request as activity (so the idle
  // tracker only heartbeats when the page is quiet), and a 403 naming a required step (new
  // password, two-step setup) sends the user to the page where they complete it.
  const send = (token: string | null) =>
    next(withToken(token)).pipe(
      tap(() => noteServerContact()),
      catchError((error: HttpErrorResponse) => {
        const pending = error.status === 403 ? error.error?.errors?.[0] : null;
        if (pending === 'change-password' || pending === 'setup-two-factor') {
          auth.markPending(pending);
          router.navigate(['/account']);
        }
        return throwError(() => error);
      }),
    );

  // A fresh access token: joins a refresh already under way, or starts one.
  const freshToken = (): Observable<string> => {
    if (isRefreshing) {
      return refreshedToken$.pipe(
        filter((t) => t !== null),
        take(1),
        switchMap((t) => (t === false ? throwError(() => new Error('refresh failed')) : of(t))),
      );
    }
    isRefreshing = true;
    refreshedToken$.next(null);
    return auth.refresh().pipe(
      tap((token) => {
        isRefreshing = false;
        refreshedToken$.next(token);
      }),
      catchError((refreshErr) => {
        isRefreshing = false;
        refreshedToken$.next(false);
        // The server refused to continue the session (idle too long, signed out elsewhere,
        // password changed) -- say so on the login page.
        auth.logout('expired');
        router.navigate(['/auth/login']);
        return throwError(() => refreshErr);
      }),
    );
  };

  return send(auth.getAccessToken()).pipe(
    catchError((error: HttpErrorResponse) => {
      // Only try to recover from 401s on non-auth endpoints, when we have a refresh token.
      if (error.status !== 401 || isAuthCall || !auth.getRefreshToken()) {
        return throwError(() => error);
      }
      // The retried request's own errors pass straight back to the caller.
      return freshToken().pipe(switchMap((token) => send(token)));
    }),
  );
};
