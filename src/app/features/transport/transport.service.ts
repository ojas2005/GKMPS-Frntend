import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';

export interface TransportRoute {
  id: string;
  name: string;
  startPoint?: string;
  endPoint?: string;
  monthlyFee?: number;
  [key: string]: unknown;
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  capacity?: number;
  driverName?: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class TransportService {
  private api = inject(ApiService);

  listRoutes(): Observable<TransportRoute[]> {
    return this.api.get('/api/routes');
  }

  createRoute(body: {
    name: string;
    startPoint: string;
    endPoint: string;
    monthlyFee: number;
  }): Observable<TransportRoute> {
    return this.api.post('/api/routes', body);
  }

  createVehicle(body: {
    registrationNumber: string;
    capacity?: number;
    driverName?: string;
  }): Observable<Vehicle> {
    return this.api.post('/api/vehicles', body);
  }

  mapStudentToRoute(body: {
    studentId: string;
    routeId: string;
    stop?: string;
  }): Observable<unknown> {
    return this.api.post('/api/student-route-mappings', body);
  }
}
