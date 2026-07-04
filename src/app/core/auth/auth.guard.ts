import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Blocks routes unless the user is logged in.
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  router.navigate(['/auth/login']);
  return false;
};

// Restricts a route to specific roles: data: { roles: [RoleNames.Admin, ...] }
export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = (route.data?.['roles'] as string[]) ?? [];
  if (auth.isLoggedIn() && (roles.length === 0 || auth.hasRole(...roles))) return true;
  router.navigate(['/dashboard']);
  return false;
};
