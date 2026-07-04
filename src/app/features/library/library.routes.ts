import { Routes } from '@angular/router';

export const LIBRARY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/library/library.component').then(m => m.LibraryComponent),
  },
];
