import { Routes } from '@angular/router';

export const TEACHERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/teachers/teachers.component').then(m => m.TeachersComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/teacher-detail/teacher-detail.component').then(m => m.TeacherDetailComponent),
  },
];
