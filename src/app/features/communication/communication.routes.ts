import { Routes } from '@angular/router';

export const COMMUNICATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/communication/communication.component').then(m => m.CommunicationComponent),
  },
];
