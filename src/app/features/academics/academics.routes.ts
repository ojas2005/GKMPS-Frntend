import { Routes } from '@angular/router';

export const ACADEMICS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/academics/academics.component').then(m => m.AcademicsComponent),
  },
];
