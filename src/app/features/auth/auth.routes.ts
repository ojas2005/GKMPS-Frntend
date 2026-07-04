import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

// Self-registration is disabled — the school owner creates every account and hands
// out the login ID + password. Login is the only auth page.
export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
