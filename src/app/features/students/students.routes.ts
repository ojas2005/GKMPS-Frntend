import { Routes } from '@angular/router';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/students/students.component').then(m => m.StudentsComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/student-detail/student-detail.component').then(m => m.StudentDetailComponent),
  },
];
