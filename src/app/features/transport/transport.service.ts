import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';

export interface TransportRoute {
  id: string;
  name: string;
  startPoint?: string | null;
  endPoint?: string | null;
  monthlyFee?: number;
  /** Switched-off routes can't be chosen for new students. */
  isActive?: boolean;
  studentCount?: number;
  [key: string]: unknown;
}

export interface StudentTransport {
  studentId: string;
  routeId: string;
  routeName: string;
  monthlyFee: number;
  routeActive: boolean;
  pickupPoint: string;
  assignedAtUtc: string;
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  capacity?: number;
  driverName?: string;
  [key: string]: unknown;
}

export interface StudentRouteMapping {
  id: string;
  studentId: string;
  studentName: string;
  admissionNumber?: string;
  routeId: string;
  pickupPoint: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class TransportService {
  private api = inject(ApiService);

  listRoutes(): Observable<TransportRoute[]> {
    return this.api.get('/api/routes');
  }

  getRoute(id: string): Observable<TransportRoute> {
    return this.api.get(`/api/routes/${id}`);
  }

  createRoute(body: {
    name: string;
    startPoint?: string | null;
    endPoint?: string | null;
    monthlyFee: number;
  }): Observable<TransportRoute> {
    return this.api.post('/api/routes', body);
  }

  /** Rename, re-price or switch a route on/off. A new charge applies to transport fees created from now on. */
  updateRoute(id: string, body: { name: string; startPoint?: string | null; endPoint?: string | null; monthlyFee: number; isActive: boolean }): Observable<TransportRoute> {
    return this.api.put(`/api/routes/${id}`, body);
  }

  studentTransport(studentId: string): Observable<StudentTransport | null> {
    return this.api.get(`/api/student-route-mappings/students/${studentId}`);
  }

  /** Takes a student off transport: no more transport fees. */
  stopTransport(studentId: string): Observable<unknown> {
    return this.api.delete(`/api/student-route-mappings/students/${studentId}`);
  }

  createVehicle(body: {
    registrationNumber: string;
    capacity?: number;
    driverName?: string;
  }): Observable<Vehicle> {
    return this.api.post('/api/vehicles', body);
  }

  getStudentsOnRoute(routeId: string): Observable<StudentRouteMapping[]> {
    return this.api.get('/api/student-route-mappings', { routeId });
  }

  mapStudentToRoute(body: {
    studentId: string;
    routeId: string;
    pickupPoint?: string;
  }): Observable<unknown> {
    return this.api.post('/api/student-route-mappings', body);
  }
}
