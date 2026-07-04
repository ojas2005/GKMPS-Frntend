import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';

export interface AttendanceRecord {
  id?: string;
  studentId: string;
  studentName?: string;
  classId: string;
  sectionId: string;
  date: string; // "2026-07-03"
  status: 'Present' | 'Absent' | 'Late' | 'Leave' | string;
  arrivalTime?: string; // "09:15:00"
  [key: string]: unknown;
}

export interface MarkAttendanceRequest {
  studentId: string;
  classId: string;
  sectionId: string;
  date: string;
  status: string;
  arrivalTime?: string;
}

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private api = inject(ApiService);

  mark(body: MarkAttendanceRequest): Observable<AttendanceRecord> {
    return this.api.post('/api/attendance', body);
  }

  getClass(classId: string, sectionId: string, date: string): Observable<AttendanceRecord[]> {
    return this.api.get('/api/attendance/class', { classId, sectionId, date });
  }

  studentPercentage(
    studentId: string,
    from: string,
    to: string,
  ): Observable<{ percentage: number } & Record<string, unknown>> {
    return this.api.get(`/api/attendance/students/${studentId}/percentage`, { from, to });
  }

  // Day-by-day log for one student (a student may only fetch their own).
  studentRecords(studentId: string, from: string, to: string): Observable<AttendanceRecord[]> {
    return this.api.get(`/api/attendance/students/${studentId}/records`, { from, to });
  }
}
