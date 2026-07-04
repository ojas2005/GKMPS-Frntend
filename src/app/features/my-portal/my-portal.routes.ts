import { Routes } from '@angular/router';

export const MY_PORTAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/my-portal/my-portal.component').then(m => m.MyPortalComponent),
  },
];
