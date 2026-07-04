import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';

export interface EnrollmentReport {
  totalStudents?: number;
  byClass?: Array<{ classId: string; className?: string; count: number }>;
  [key: string]: unknown;
}

export interface FeeCollectionReport {
  total?: number;
  byDay?: Array<{ date: string; amount: number }>;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private api = inject(ApiService);

  enrollment(): Observable<EnrollmentReport> {
    return this.api.get('/api/reports/enrollment');
  }

  enrollmentPdf(): Observable<Blob> {
    return this.api.getBlob('/api/reports/enrollment/pdf');
  }

  feeCollection(fromUtc: string, toUtc: string): Observable<FeeCollectionReport> {
    return this.api.get('/api/reports/fee-collection', { fromUtc, toUtc });
  }
}
