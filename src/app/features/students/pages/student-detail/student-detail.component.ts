import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService, Student } from '../../students.service';
import { AttendanceService } from '../../../attendance/attendance.service';
import { FeesService, FeePayment, PaymentTransactionSummary } from '../../../fees/fees.service';
import { ExaminationService, StudentResult } from '../../../examination/examination.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { classNameById, sectionNameById } from '../../../../core/constants/classes';

/**
 * Owner/staff view: everything about one student in one place — profile, attendance
 * percentage, fee ledger with pending amount, a fee-submission form, receipts, and exam
 * results. Each panel loads independently so one failing service doesn't blank the page.
 */
@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center gap-3">
        <a routerLink="/students" class="text-primary-600 hover:text-primary-700 text-sm">← Students</a>
      </div>

      <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading student...</div>
      <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>

      <ng-container *ngIf="student() as s">
        <!-- Profile -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold text-neutral-900">{{ s.fullName }}</h1>
              <p class="text-neutral-600 text-sm mt-1">
                {{ className(s.classId) }} - {{ sectionName(s.sectionId) }}
                &nbsp;·&nbsp; Admission # {{ s.admissionNumber || '—' }}
                &nbsp;·&nbsp; {{ s.status || 'Active' }}
              </p>
            </div>
            <div class="text-right text-3xl font-bold" [class]="pctClass()">
              {{ attendancePct() !== null ? attendancePct() + '%' : '—' }}
              <div class="text-xs font-normal text-neutral-500">attendance (90 days)</div>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <div><span class="text-neutral-500 block text-xs">Gender</span>{{ s['gender'] || '—' }}</div>
            <div><span class="text-neutral-500 block text-xs">Date of birth</span>{{ dob(s) ? (dob(s) | date:'mediumDate') : '—' }}</div>
            <div><span class="text-neutral-500 block text-xs">Guardian</span>{{ s['parentName'] || s.guardianName || '—' }}</div>
            <div><span class="text-neutral-500 block text-xs">Guardian phone</span>{{ s['parentPhone'] || s.guardianPhone || '—' }}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Fees -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-neutral-900">Fees</h2>
              <span class="text-sm font-semibold" [class]="pendingTotal() > 0 ? 'text-error-600' : 'text-success-600'">
                {{ pendingTotal() > 0 ? ('Pending ₹' + pendingTotal()) : 'No dues' }}
              </span>
            </div>
            <p *ngIf="feesError()" class="text-error-600 text-sm">{{ feesError() }}</p>
            <p *ngIf="!feesError() && fees().length === 0" class="text-neutral-500 text-sm">No fee records.</p>
            <table *ngIf="fees().length > 0" class="w-full text-sm">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2">Fee</th><th class="py-2">Total</th><th class="py-2">Paid</th><th class="py-2">Pending</th><th class="py-2">Status</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let f of fees()" class="border-t border-neutral-100">
                  <td class="py-2 text-neutral-900">{{ f['feeStructureName'] || f['description'] || 'Fee' }}</td>
                  <td class="py-2 text-neutral-600">₹{{ total(f) }}</td>
                  <td class="py-2 text-neutral-600">₹{{ paid(f) }}</td>
                  <td class="py-2 font-medium" [class]="pending(f) > 0 ? 'text-error-600' : 'text-success-600'">₹{{ pending(f) }}</td>
                  <td class="py-2 text-neutral-600">{{ f['status'] || '—' }}</td>
                </tr>
              </tbody>
            </table>

            <!-- Submit a fee payment (Admin/Principal/SuperAdmin/Accountant only) -->
            <div *ngIf="canSubmitFees()" class="mt-5 pt-4 border-t border-neutral-200">
              <h3 class="text-sm font-semibold text-neutral-900 mb-1">Submit fee payment</h3>
              <p class="text-xs text-neutral-500 mb-3">Records the amount as fully paid for the period given and produces a receipt immediately.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Amount (₹) *</label>
                  <input [(ngModel)]="submitForm.amount" type="number" min="0.01" placeholder="5000" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Fee duration *</label>
                  <input [(ngModel)]="submitForm.periodLabel" placeholder="e.g. May 2026 - Jun 2026" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs text-neutral-500 mb-1">Description</label>
                  <input [(ngModel)]="submitForm.description" placeholder="e.g. Tuition fee, cash" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Payment method</label>
                  <select [(ngModel)]="submitForm.paymentMethod" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option>Cash</option><option>Card</option><option>UPI</option><option>BankTransfer</option>
                  </select>
                </div>
              </div>
              <div class="mt-3 flex items-center gap-3">
                <button (click)="submitFee()" [disabled]="submittingFee()"
                  class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                  {{ submittingFee() ? 'Submitting...' : 'Submit payment' }}
                </button>
                <span *ngIf="submitFeeMsg()" class="text-sm" [class]="submitFeeOk() ? 'text-success-600' : 'text-error-600'">{{ submitFeeMsg() }}</span>
              </div>
            </div>

            <!-- Receipts -->
            <div class="mt-5 pt-4 border-t border-neutral-200">
              <h3 class="text-sm font-semibold text-neutral-900 mb-2">Receipts</h3>
              <p *ngIf="transactions().length === 0" class="text-neutral-500 text-sm">No payments recorded yet.</p>
              <div *ngFor="let t of transactions()" class="flex items-center justify-between py-1.5 text-sm border-t border-neutral-100 first:border-t-0">
                <div>
                  <span class="text-neutral-900">{{ t.periodLabel || t.feeStructureName || t.description || 'Fee' }}</span>
                  <span class="text-neutral-500"> · ₹{{ t.amount }} · {{ t.paidAtUtc | date:'mediumDate' }}</span>
                </div>
                <button (click)="downloadReceipt(t.id)" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Download →</button>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Exam results</h2>
            <p *ngIf="resultsError()" class="text-error-600 text-sm">{{ resultsError() }}</p>
            <p *ngIf="!resultsError() && results().length === 0" class="text-neutral-500 text-sm">No marks entered yet.</p>
            <table *ngIf="results().length > 0" class="w-full text-sm">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2">Exam</th><th class="py-2">Marks</th><th class="py-2">Result</th><th class="py-2">Published</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of results()" class="border-t border-neutral-100">
                  <td class="py-2 text-neutral-900">{{ r.examName }}</td>
                  <td class="py-2 text-neutral-600">{{ r.marksObtained }} / {{ r.maxMarks }}</td>
                  <td class="py-2 font-medium" [class]="r.marksObtained >= r.passingMarks ? 'text-success-600' : 'text-error-600'">
                    {{ r.marksObtained >= r.passingMarks ? 'Pass' : 'Fail' }}{{ r.grade ? ' (' + r.grade + ')' : '' }}
                  </td>
                  <td class="py-2 text-neutral-600">{{ r.isResultPublished ? 'Yes' : 'Draft' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent attendance -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Recent attendance (last 30 days)</h2>
          <p *ngIf="attError()" class="text-error-600 text-sm">{{ attError() }}</p>
          <p *ngIf="!attError() && attendance().length === 0" class="text-neutral-500 text-sm">No attendance records in this window.</p>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let a of attendance()"
              class="px-2.5 py-1 rounded-lg text-xs font-medium"
              [class]="a['status'] === 'Present' ? 'bg-success-50 text-success-700' : (a['status'] === 'Late' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
              {{ a['date'] }} · {{ a['status'] }}
            </span>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class StudentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private studentsService = inject(StudentsService);
  private attendanceService = inject(AttendanceService);
  private feesService = inject(FeesService);
  private examsService = inject(ExaminationService);
  private auth = inject(AuthService);

  student = signal<Student | null>(null);
  loading = signal(false);
  error = signal('');
  attendancePct = signal<number | null>(null);
  attendance = signal<Record<string, unknown>[]>([]);
  attError = signal('');
  fees = signal<FeePayment[]>([]);
  feesError = signal('');
  results = signal<StudentResult[]>([]);
  resultsError = signal('');

  transactions = signal<PaymentTransactionSummary[]>([]);
  submitForm = { amount: 0, periodLabel: '', description: '', paymentMethod: 'Cash' };
  submittingFee = signal(false);
  submitFeeMsg = signal('');
  submitFeeOk = signal(false);

  canSubmitFees = (): boolean => this.auth.hasRole('SuperAdmin', 'Principal', 'Admin', 'Accountant');

  className = classNameById;
  sectionName = sectionNameById;

  dob = (s: Student): string | null => (s['dateOfBirthUtc'] as string) || (s['dateOfBirth'] as string) || null;
  total = (f: FeePayment): number => Number(f['totalAmount'] ?? f['amount'] ?? 0);
  paid = (f: FeePayment): number => Number(f['paidAmount'] ?? 0);
  pending = (f: FeePayment): number =>
    Math.max(0, this.total(f) - this.paid(f) - Number(f['waiverAmount'] ?? 0));
  pendingTotal = (): number => this.fees().reduce((sum, f) => sum + this.pending(f), 0);
  pctClass = (): string => {
    const p = this.attendancePct();
    return p === null ? 'text-neutral-400' : p >= 75 ? 'text-success-600' : 'text-error-600';
  };

  private id = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error.set('No student id in the URL.'); return; }
    this.id = id;
    this.loading.set(true);

    this.studentsService.get(id).subscribe({
      next: (s) => { this.student.set(s); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load the student.')); this.loading.set(false); },
    });

    const today = new Date().toISOString().slice(0, 10);
    const days30 = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    const days90 = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);

    this.attendanceService.studentPercentage(id, days90, today).subscribe({
      next: (r: any) => this.attendancePct.set(Math.round((r?.percentage ?? 0) * 10) / 10),
      error: () => {},
    });
    this.attendanceService.studentRecords(id, days30, today).subscribe({
      next: (list: any) => this.attendance.set(list ?? []),
      error: (err) => this.attError.set(this.msg(err, 'Failed to load attendance.')),
    });
    this.feesService.myPayments(id).subscribe({
      next: (list) => this.fees.set(list ?? []),
      error: (err) => this.feesError.set(this.msg(err, 'Failed to load fees.')),
    });
    this.examsService.studentResults(id).subscribe({
      next: (list) => this.results.set(list ?? []),
      error: (err) => this.resultsError.set(this.msg(err, 'Failed to load results.')),
    });
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.feesService.transactionsForStudent(this.id).subscribe({
      next: (list) => this.transactions.set(list ?? []),
      error: () => {},
    });
  }

  submitFee(): void {
    const s = this.student();
    if (!s?.classId) { this.submitFeeOk.set(false); this.submitFeeMsg.set('Student has no class on record.'); return; }
    if (!this.submitForm.amount || this.submitForm.amount <= 0 || !this.submitForm.periodLabel.trim()) {
      this.submitFeeOk.set(false); this.submitFeeMsg.set('Amount and fee duration are required.');
      return;
    }
    this.submittingFee.set(true); this.submitFeeMsg.set('');
    this.feesService.submitPayment(this.id, {
      classId: s.classId,
      amount: this.submitForm.amount,
      periodLabel: this.submitForm.periodLabel.trim(),
      description: this.submitForm.description.trim() || undefined,
      paymentMethod: this.submitForm.paymentMethod,
    }).subscribe({
      next: () => {
        this.submittingFee.set(false); this.submitFeeOk.set(true);
        this.submitFeeMsg.set('Payment submitted and receipt generated.');
        this.submitForm = { amount: 0, periodLabel: '', description: '', paymentMethod: 'Cash' };
        this.feesService.myPayments(this.id).subscribe({ next: (list) => this.fees.set(list ?? []), error: () => {} });
        this.loadTransactions();
      },
      error: (err) => { this.submittingFee.set(false); this.submitFeeOk.set(false); this.submitFeeMsg.set(this.msg(err, 'Could not submit payment.')); },
    });
  }

  downloadReceipt(transactionId: string): void {
    this.feesService.receipt(transactionId).subscribe({
      next: (link) => { if (link?.downloadUrl) window.open(link.downloadUrl, '_blank'); },
      error: () => {},
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the gateway on localhost:5100. Is the backend running?';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
