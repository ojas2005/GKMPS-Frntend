import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';
import { DownloadLink } from '../../core/models/api-response';

export interface FeeStructure {
  id: string;
  name?: string;
  classId?: string;
  academicYear?: string;
  amount?: number;
  [key: string]: unknown;
}

export interface FeePayment {
  id: string;
  studentId: string;
  feeStructureId?: string | null;
  classId?: string | null;
  description?: string | null;
  periodLabel?: string | null;
  feeStructureName?: string | null;
  amount: number;
  paymentMethod?: string;
  transactionId?: string;
  paidAtUtc?: string;
  [key: string]: unknown;
}

export interface FeeSubmissionResult {
  due: FeePayment;
  transactionId: string;
  receiptNumber: string;
}

export interface PaymentTransactionSummary {
  id: string;
  feePaymentId: string;
  amount: number;
  receiptNumber: string;
  paymentMethod: string;
  paidAtUtc: string;
  periodLabel?: string | null;
  description?: string | null;
  feeStructureName?: string | null;
}

export interface CollectionTotals {
  totalCollected: number;
  count?: number;
  [key: string]: unknown;
}

export interface StudentPendingSummary {
  studentId: string;
  totalDue: number;
  totalPaid: number;
  totalWaiver: number;
  pending: number;
}

export interface ClassPendingSummary {
  classId: string;
  totalPending: number;
  students: StudentPendingSummary[];
}

@Injectable({ providedIn: 'root' })
export class FeesService {
  private api = inject(ApiService);

  listStructures(classId?: string, academicYear?: string): Observable<FeeStructure[]> {
    return this.api.get('/api/fee-structures', { classId, academicYear });
  }

  createStructure(body: {
    name: string;
    classId: string;
    academicYear: string;
    amount: number;
    dueDateUtc: string; // ISO, required by backend
  }): Observable<FeeStructure> {
    return this.api.post('/api/fee-structures', body);
  }

  // Called right after admitting a student (class + fee structures already known):
  // creates one due per unassessed structure for their class/year, plus an optional
  // one-time opening balance for fee that was already pending at admission.
  assessDues(
    studentId: string,
    body: { classId: string; academicYear: string; openingBalance?: number; openingBalanceDescription?: string },
  ): Observable<FeePayment[]> {
    return this.api.post(`/api/fee-payments/students/${studentId}/assess`, body);
  }

  // Pay a due — either a class-structure due (feeStructureId; creates the row on first
  // payment if needed) or a specific due row directly (feePaymentId; the only way to pay
  // an ad-hoc due like an opening balance, which has no FeeStructure to key off).
  pay(body: {
    studentId: string;
    feeStructureId?: string;
    feePaymentId?: string;
    amount: number;
    paymentMethod: string;
    gatewayReference?: string;
  }): Observable<FeePayment> {
    return this.api.post('/api/fee-payments', body);
  }

  // A student's own fee ledger (scoped server-side to the caller).
  myPayments(studentId: string): Observable<FeePayment[]> {
    return this.api.get(`/api/fee-payments/students/${studentId}`);
  }

  // Owner view: every student with a due in this class, with their pending total.
  pendingSummaryByClass(classId: string): Observable<ClassPendingSummary> {
    return this.api.get('/api/fee-payments/pending-summary', { classId });
  }

  // Owner logs a fee submission directly on a student's page: amount + a custom period
  // (e.g. "May 2026 - Jun 2026") + description — no FeeStructure needs to exist first.
  // Immediately fully paid; produces a receipt right away.
  submitPayment(
    studentId: string,
    body: { classId: string; amount: number; periodLabel: string; description?: string; paymentMethod: string; gatewayReference?: string },
  ): Observable<FeeSubmissionResult> {
    return this.api.post(`/api/fee-payments/students/${studentId}/submit`, body);
  }

  // Creates an unpaid ad-hoc due (no payment, no receipt) -- e.g. a transport route's
  // monthly fee added the moment a student is mapped to that route.
  addAdHocDue(
    studentId: string,
    body: { classId: string; amount: number; periodLabel: string; description?: string },
  ): Observable<FeePayment> {
    return this.api.post(`/api/fee-payments/students/${studentId}/dues`, body);
  }

  // Every receipt across a student's dues (scoped server-side to the caller).
  transactionsForStudent(studentId: string): Observable<PaymentTransactionSummary[]> {
    return this.api.get(`/api/fee-payments/students/${studentId}/transactions`);
  }

  receipt(transactionId: string): Observable<DownloadLink> {
    return this.api.get(`/api/fee-payments/transactions/${transactionId}/receipt`);
  }

  requestWaiver(body: {
    studentId: string;
    feeStructureId: string;
    reason: string;
    amount: number;
  }): Observable<unknown> {
    return this.api.post('/api/fee-payments/waivers/request', body);
  }

  approveWaiver(feePaymentId: string): Observable<unknown> {
    return this.api.post(`/api/fee-payments/${feePaymentId}/waivers/approve`);
  }

  collectionTotals(fromUtc: string, toUtc: string): Observable<CollectionTotals> {
    return this.api.get('/api/fee-payments/collection-totals', { fromUtc, toUtc });
  }
}
