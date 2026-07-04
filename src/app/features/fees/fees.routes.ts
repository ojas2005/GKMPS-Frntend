import { Routes } from '@angular/router';

export const FEES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/fees/fees.component').then(m => m.FeesComponent),
  },
];
