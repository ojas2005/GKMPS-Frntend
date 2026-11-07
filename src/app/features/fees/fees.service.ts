import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';
import { DownloadLink, PagedResult } from '../../core/models/api-response';

export type FeeCategory = 'Admission' | 'Tuition' | 'Exam' | 'Transport' | 'Other';
export const FEE_CATEGORIES: FeeCategory[] = ['Admission', 'Tuition', 'Exam', 'Transport', 'Other'];
export const FEE_CATEGORY_LABELS: Record<FeeCategory, string> = {
  Admission: 'Admission fee', Tuition: 'Monthly tuition', Exam: 'Examination', Transport: 'Transport', Other: 'Other charges',
};
export type FeeStatus = 'Pending' | 'PartiallyPaid' | 'Paid';
export const FEE_STATUS_LABELS: Record<string, string> = { Pending: 'Pending', PartiallyPaid: 'Partially paid', Paid: 'Paid', Due: 'Pending' };

/** One class's fee structure (Fee Structure page). */
export interface ClassFeeRate {
  classId: string;
  className: string;
  order: number;
  admissionFee: number;
  monthlyTuition: number;
  quarterlyExamFee: number;
  halfYearlyExamFee: number;
  annualExamFee: number;
  updatedAtUtc?: string | null;
}

export interface FeeSchedule {
  monthlyDueDay: number;
  quarterlyExamDueMonth: number;
  quarterlyExamDueDay: number;
  halfYearlyExamDueMonth: number;
  halfYearlyExamDueDay: number;
  annualExamDueMonth: number;
  annualExamDueDay: number;
}

export interface FeeLine {
  category: FeeCategory;
  periodLabel: string;
  description?: string | null;
  academicYear: string;
  periodKey?: string | null;
  dueDate: string;
  amount: number;
  dueNow: boolean;
}

export interface ExamFeeLine { period: string; label: string; amount: number; dueDate: string; charged: boolean; }

/** The fee summary for a class (and route): admission preview and admission result. */
export interface FeeBreakdown {
  academicYear: string;
  classId: string;
  className: string;
  startDate: string;
  admissionFee: number;
  monthlyTuition: number;
  exams: ExamFeeLine[];
  examTotal: number;
  transport?: { routeId: string; routeName: string; monthlyFee: number } | null;
  previousDues: number;
  lines: FeeLine[];
  initialPending: number;
  upcomingTotal: number;
  monthlyTotal: number;
  warning?: string | null;
}

/** A fee entry on the dashboard or a statement. */
export interface FeeEntry {
  id: string;
  studentId: string;
  studentName?: string | null;
  admissionNumber?: string | null;
  classId?: string | null;
  className: string;
  category: FeeCategory;
  academicYear?: string | null;
  periodKey?: string | null;
  label: string;
  description?: string | null;
  dueDate?: string | null;
  totalAmount: number;
  paidAmount: number;
  discountAmount: number;
  pending: number;
  status: FeeStatus;
  isDue: boolean;
  isOverdue: boolean;
  lastPaidAtUtc?: string | null;
  isWaiverRequested: boolean;
  feeStructureId?: string | null;
}

export interface StudentFeeBalance {
  studentId: string;
  studentName?: string | null;
  admissionNumber?: string | null;
  classId?: string | null;
  className: string;
  studentStatus?: string | null;
  billed: number;
  paid: number;
  discount: number;
  pendingDue: number;
  upcoming: number;
  oldestUnpaidDueDate?: string | null;
}

export interface FeeCategoryTotals { category: FeeCategory; billed: number; paid: number; discount: number; pendingDue: number; upcoming: number; }

export interface FeeOverview {
  academicYear: string;
  collectedThisSession: number;
  collectedThisMonth: number;
  collectedToday: number;
  pendingDue: number;
  upcoming: number;
  discounts: number;
  byCategory: FeeCategoryTotals[];
  openAccounts: number;
  currentStudentsWithoutAccount: number;
}

export interface MonthlyCollection { year: number; month: number; label: string; billed: number; collected: number; }

export interface FeeHistoryItem { id: string; kind: string; amount: number; reason?: string | null; feePaymentId?: string | null; feeLabel?: string | null; actorRole?: string | null; createdAtUtc: string; }

export interface FeeStatement {
  student: { id: string; fullName: string; admissionNumber?: string | null; classId?: string | null; className: string; status?: string | null };
  account?: { isOpen: boolean; billingStartDate: string; closedAtUtc?: string | null; closedReason?: string | null; lastGeneratedAtUtc?: string | null } | null;
  transport?: { routeId: string; routeName: string; monthlyFee: number; pickupPoint?: string | null; routeActive: boolean } | null;
  totals: { billed: number; paid: number; discount: number; pendingDue: number; upcoming: number };
  entries: FeeEntry[];
  payments: PaymentTransactionSummary[];
  history: FeeHistoryItem[];
}

export interface FeeEntryQuery {
  keyword?: string;
  classId?: string;
  academicYear?: string;
  category?: string;
  month?: string; // yyyy-MM
  status?: string; // Pending | PartiallyPaid | Paid | Outstanding | Overdue
  includeUpcoming?: boolean;
  page?: number;
  pageSize?: number;
}

export const PAYMENT_METHODS = ['Cash', 'UPI', 'Card', 'BankTransfer', 'Cheque'];

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

  // --- Fee structure
  classRates(): Observable<ClassFeeRate[]> { return this.api.get('/api/fee-setup/classes'); }
  saveClassRates(rates: ClassFeeRate[]): Observable<ClassFeeRate[]> { return this.api.put('/api/fee-setup/classes', { rates }); }
  schedule(): Observable<FeeSchedule> { return this.api.get('/api/fee-setup/schedule'); }
  saveSchedule(s: FeeSchedule): Observable<FeeSchedule> { return this.api.put('/api/fee-setup/schedule', s); }
  /** What admitting into this class (with this route) would charge. */
  preview(classId: string, routeId?: string | null, previousDues?: number | null): Observable<FeeBreakdown> {
    return this.api.get('/api/fee-setup/preview', { classId, routeId: routeId || undefined, previousDues: previousDues || undefined });
  }

  // --- Dashboard
  overview(academicYear?: string): Observable<FeeOverview> { return this.api.get('/api/fees/overview', { academicYear }); }
  entries(q: FeeEntryQuery): Observable<PagedResult<FeeEntry>> { return this.api.get('/api/fees/entries', { ...q }); }
  studentBalances(q: FeeEntryQuery): Observable<PagedResult<StudentFeeBalance>> { return this.api.get('/api/fees/students', { ...q }); }
  monthlyCollections(academicYear?: string): Observable<MonthlyCollection[]> { return this.api.get('/api/fees/collections/monthly', { academicYear }); }

  // --- Accounts
  statement(studentId: string): Observable<FeeStatement> { return this.api.get(`/api/fee-accounts/${studentId}`); }
  openAccount(studentId: string, body: { billingStartDate?: string | null; chargeAdmissionFee?: boolean }): Observable<FeeBreakdown> {
    return this.api.post(`/api/fee-accounts/${studentId}/open`, body);
  }
  openAllAccounts(body: { billingStartDate?: string | null }): Observable<{ opened: number; alreadyOpen: number; feesCreated: number }> {
    return this.api.post('/api/fee-accounts/open-all', body);
  }
  generate(studentId?: string): Observable<{ accountsChecked: number; feesCreated: number }> {
    return this.api.post(`/api/fee-accounts/generate${studentId ? '?studentId=' + studentId : ''}`);
  }
  concession(feePaymentId: string, amount: number, reason: string): Observable<FeePayment> {
    return this.api.post(`/api/fee-payments/${feePaymentId}/concession`, { amount, reason });
  }

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
    body: { classId: string; amount: number; periodLabel: string; description?: string; dueDate?: string },
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
