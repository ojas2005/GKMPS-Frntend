import { Routes } from '@angular/router';

export const EXAMINATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/examination/examination.component').then(m => m.ExaminationComponent),
  },
];
