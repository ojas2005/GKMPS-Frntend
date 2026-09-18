import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard, pendingActionGuard, roleGuard } from './core/auth/auth.guard';
import { rolesFor } from './core/constants/nav';

export const routes: Routes = [
  // Auth pages render WITHOUT the sidebar/topbar shell.
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  // Everything else is behind the layout shell, requires login, and each route
  // is additionally gated by role via roleGuard (data.roles from the nav catalog).
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard, pendingActionGuard],
    canActivateChild: [pendingActionGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      },
      {
        // Every signed-in role: own profile + change password (reached from the user menu).
        path: 'account',
        loadChildren: () => import('./features/account/account.routes').then(m => m.ACCOUNT_ROUTES),
      },
      {
        path: 'my-portal',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/my-portal') },
        loadChildren: () => import('./features/my-portal/my-portal.routes').then(m => m.MY_PORTAL_ROUTES),
      },
      {
        path: 'students',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/students') },
        loadChildren: () => import('./features/students/students.routes').then(m => m.STUDENTS_ROUTES),
      },
      {
        path: 'teachers',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/teachers') },
        loadChildren: () => import('./features/teachers/teachers.routes').then(m => m.TEACHERS_ROUTES),
      },
      {
        path: 'attendance',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/attendance') },
        loadChildren: () => import('./features/attendance/attendance.routes').then(m => m.ATTENDANCE_ROUTES),
      },
      {
        path: 'academics',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/academics') },
        loadChildren: () => import('./features/academics/academics.routes').then(m => m.ACADEMICS_ROUTES),
      },
      {
        path: 'timetable',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/timetable') },
        loadChildren: () => import('./features/timetable/timetable.routes').then(m => m.TIMETABLE_ROUTES),
      },
      {
        path: 'examination',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/examination') },
        loadChildren: () => import('./features/examination/examination.routes').then(m => m.EXAMINATION_ROUTES),
      },
      {
        path: 'fees',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/fees') },
        loadChildren: () => import('./features/fees/fees.routes').then(m => m.FEES_ROUTES),
      },
      {
        path: 'communication',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/communication') },
        loadChildren: () => import('./features/communication/communication.routes').then(m => m.COMMUNICATION_ROUTES),
      },
      {
        path: 'library',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/library') },
        loadChildren: () => import('./features/library/library.routes').then(m => m.LIBRARY_ROUTES),
      },
      {
        path: 'transport',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/transport') },
        loadChildren: () => import('./features/transport/transport.routes').then(m => m.TRANSPORT_ROUTES),
      },
      {
        path: 'reports',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/reports') },
        loadChildren: () => import('./features/reports/reports.routes').then(m => m.REPORTS_ROUTES),
      },
      {
        path: 'settings',
        canActivate: [roleGuard],
        data: { roles: rolesFor('/settings') },
        loadChildren: () => import('./features/settings/settings.routes').then(m => m.SETTINGS_ROUTES),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
