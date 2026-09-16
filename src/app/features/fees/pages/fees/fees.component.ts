import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FeesService, FeeStructure, FeePayment, StudentPendingSummary, PaymentTransactionSummary } from '../../fees.service';
import { StudentsService, Student } from '../../../students/students.service';
import { SCHOOL_CLASSES, DEFAULT_CLASS, classNameById, sectionNameById } from '../../../../core/constants/classes';
import { AuthService } from '../../../../core/auth/auth.service';

interface PendingRow extends StudentPendingSummary {
  student?: Student;
}

interface SearchPendingRow {
  student: Student;
  pending: number;
  error?: string;
}

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">{{ selfService ? 'My Fees' : 'Fees' }}</h1>
          <p class="text-neutral-600 text-sm">{{ selfService ? 'Your fee payments and dues.' : 'Fee structures, pending dues & collection totals from Fee.API.' }}</p>
        </div>
        <button *ngIf="!selfService" (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Fee Structure' }}
        </button>
      </div>

      <!-- Self-service: pending summary + my fee ledger -->
      <div *ngIf="selfService && !loading() && !error()" class="rounded-xl p-6 shadow-sm border"
        [class]="pendingTotal() > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
        <p class="text-sm" [class]="pendingTotal() > 0 ? 'text-error-700' : 'text-success-700'">
          {{ pendingTotal() > 0 ? 'Amount to pay' : 'Fee status' }}
        </p>
        <p class="text-3xl font-bold" [class]="pendingTotal() > 0 ? 'text-error-700' : 'text-success-700'">
          {{ pendingTotal() > 0 ? ('₹' + pendingTotal()) : 'All paid ✓' }}
        </p>
      </div>
      <div *ngIf="selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-5 space-y-3">
          <div *ngFor="let i of [1,2,3,4,5]" class="skeleton h-11"></div>
        </div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && myFees().length === 0" class="p-8 text-center text-neutral-500">No fee records yet.</div>
        <table *ngIf="!loading() && !error() && myFees().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Fee</th><th class="px-6 py-3 font-medium">Total</th><th class="px-6 py-3 font-medium">Paid</th><th class="px-6 py-3 font-medium">Waiver</th><th class="px-6 py-3 font-medium">Pending</th><th class="px-6 py-3 font-medium">Status</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let f of myFees()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ f.feeStructureName || f.description || 'Fee' }}</td>
              <td class="px-6 py-3 text-neutral-600">₹{{ f['totalAmount'] ?? f.amount }}</td>
              <td class="px-6 py-3 text-neutral-600">₹{{ f['paidAmount'] ?? 0 }}</td>
              <td class="px-6 py-3 text-neutral-600">₹{{ f['waiverAmount'] ?? 0 }}</td>
              <td class="px-6 py-3 font-medium" [class]="pending(f) > 0 ? 'text-error-600' : 'text-success-600'">₹{{ pending(f) }}</td>
              <td class="px-6 py-3">
                <span class="px-2 py-1 rounded-full text-xs"
                  [class]="(f['status'] === 'Paid') ? 'bg-success-50 text-success-700' : (f['status'] === 'PartiallyPaid' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
                  {{ f['status'] || '—' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Self-service: receipts -->
      <div *ngIf="selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Receipts</h2>
        <p *ngIf="myTransactions().length === 0" class="text-neutral-500 text-sm">No payments recorded yet.</p>
        <div *ngFor="let t of myTransactions()" class="flex items-center justify-between py-2 text-sm border-t border-neutral-100 first:border-t-0">
          <div>
            <span class="text-neutral-900">{{ t.periodLabel || t.feeStructureName || t.description || 'Fee' }}</span>
            <span class="text-neutral-500"> · ₹{{ t.amount }} · {{ t.paidAtUtc | date:'mediumDate' }}</span>
          </div>
          <button (click)="downloadReceipt(t.id)" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Download →</button>
        </div>
      </div>

      <!-- Owner/staff: pending fees by class -->
      <div *ngIf="!selfService" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-1">Pending fees — by class</h2>
        <p class="text-xs text-neutral-500 mb-4">Every student with a due in this class, most-pending first.</p>
        <div class="flex items-center gap-3 mb-4">
          <select [(ngModel)]="pendingClassId" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
            <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
          </select>
          <button (click)="loadPendingByClass()" [disabled]="pendingLoading()"
            class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ pendingLoading() ? 'Loading...' : 'Load' }}
          </button>
          <span *ngIf="pendingRows().length > 0" class="text-sm text-neutral-600 ml-auto">
            Total pending: <span class="font-semibold text-error-600">₹{{ pendingClassTotal() }}</span>
          </span>
        </div>
        <p *ngIf="pendingError()" class="text-error-600 text-sm">{{ pendingError() }}</p>
        <p *ngIf="!pendingError() && pendingLoaded() && pendingRows().length === 0" class="text-neutral-500 text-sm">No dues for this class yet.</p>
        <table *ngIf="pendingRows().length > 0" class="w-full text-sm">
          <thead class="text-neutral-500 text-left text-xs">
            <tr><th class="py-2">Student</th><th class="py-2">Total due</th><th class="py-2">Paid</th><th class="py-2">Pending</th><th class="py-2"></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of pendingRows()" [routerLink]="['/students', r.studentId]" class="border-t border-neutral-100 cursor-pointer hover:bg-neutral-50">
              <td class="py-2 font-medium text-neutral-900">{{ r.student?.fullName || r.studentId }}</td>
              <td class="py-2 text-neutral-600">₹{{ r.totalDue }}</td>
              <td class="py-2 text-neutral-600">₹{{ r.totalPaid }}</td>
              <td class="py-2 font-medium" [class]="r.pending > 0 ? 'text-error-600' : 'text-success-600'">₹{{ r.pending }}</td>
              <td class="py-2 text-primary-600 text-right text-xs">View →</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Owner/staff: search a specific student's pending fee by name/ID -->
      <div *ngIf="!selfService" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-1">Pending fees — search a student</h2>
        <p class="text-xs text-neutral-500 mb-4">Search by name or admission number.</p>
        <div class="flex gap-3 mb-4">
          <input [(ngModel)]="searchKeyword" (keyup.enter)="searchStudents()" placeholder="e.g. Aarav or ADM-1023"
            class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <button (click)="searchStudents()" [disabled]="searching()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">
            {{ searching() ? 'Searching...' : 'Search' }}
          </button>
        </div>
        <p *ngIf="searchError()" class="text-error-600 text-sm">{{ searchError() }}</p>
        <p *ngIf="!searchError() && searched() && searchResults().length === 0" class="text-neutral-500 text-sm">No students matched.</p>
        <table *ngIf="searchResults().length > 0" class="w-full text-sm">
          <thead class="text-neutral-500 text-left text-xs">
            <tr><th class="py-2">Student</th><th class="py-2">Class</th><th class="py-2">Pending fee</th><th class="py-2"></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of searchResults()" [routerLink]="['/students', r.student.id]" class="border-t border-neutral-100 cursor-pointer hover:bg-neutral-50">
              <td class="py-2 font-medium text-neutral-900">{{ r.student.fullName }}</td>
              <td class="py-2 text-neutral-600">{{ className(r.student.classId) }}{{ r.student.sectionId ? ' - ' + sectionName(r.student.sectionId) : '' }}</td>
              <td class="py-2 font-medium" [class]="r.pending > 0 ? 'text-error-600' : 'text-success-600'">
                {{ r.error ? '—' : ('₹' + r.pending) }}
              </td>
              <td class="py-2 text-primary-600 text-right text-xs">View →</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Collection totals (staff only) -->
      <div *ngIf="!selfService" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Collection totals</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <input [(ngModel)]="fromDate" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <input [(ngModel)]="toDate" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <button (click)="loadTotals()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Get total</button>
          <div class="text-2xl font-bold text-neutral-900">{{ total() !== null ? ('₹' + total()) : '—' }}</div>
        </div>
      </div>

      <!-- Create structure -->
      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Name *</label>
            <input [(ngModel)]="form.name" placeholder="Tuition Term 1" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Class *</label>
            <select [(ngModel)]="form.classId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Academic year *</label>
            <input [(ngModel)]="form.academicYear" placeholder="2026-27" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Amount *</label>
            <input [(ngModel)]="form.amount" type="number" placeholder="25000" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Due date *</label>
            <input [(ngModel)]="form.dueDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
        </div>
        <p class="text-xs text-neutral-500 mt-3">
          New structures apply to students admitted afterwards automatically. To backfill this due for already-admitted students in the class, re-open each student's page — dues sync there.
        </p>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Create' }}
          </button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <!-- Structures list (staff only) -->
      <div *ngIf="!selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div class="flex items-center gap-3 p-4 border-b border-neutral-200">
          <select [(ngModel)]="filterClassId" class="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
            <option value="">All classes</option>
            <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
          </select>
          <button (click)="load()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Load</button>
        </div>
        <div *ngIf="loading()" class="p-5 space-y-3">
          <div *ngFor="let i of [1,2,3,4,5]" class="skeleton h-11"></div>
        </div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No fee structures.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Name</th><th class="px-6 py-3 font-medium">Year</th><th class="px-6 py-3 font-medium">Amount</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let f of rows()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ f.name || '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ f.academicYear || '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ f.amount != null ? ('₹' + f.amount) : '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class FeesComponent implements OnInit {
  private service = inject(FeesService);
  private studentsService = inject(StudentsService);
  private auth = inject(AuthService);
  selfService = this.auth.isSelfService();
  myFees = signal<FeePayment[]>([]);
  myTransactions = signal<PaymentTransactionSummary[]>([]);
  rows = signal<FeeStructure[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  total = signal<number | null>(null);
  filterClassId = '';
  fromDate = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  toDate = new Date().toISOString().slice(0, 10);
  classes = SCHOOL_CLASSES;
  className = classNameById;
  sectionName = sectionNameById;
  form = { name: '', classId: DEFAULT_CLASS.id, academicYear: '', amount: 0, dueDate: '' };

  // Pending by class
  pendingClassId = DEFAULT_CLASS.id;
  pendingRows = signal<PendingRow[]>([]);
  pendingLoading = signal(false);
  pendingLoaded = signal(false);
  pendingError = signal('');

  // Search a student
  searchKeyword = '';
  searching = signal(false);
  searched = signal(false);
  searchError = signal('');
  searchResults = signal<SearchPendingRow[]>([]);

  pending(f: FeePayment): number {
    const total = Number(f['totalAmount'] ?? f['amount'] ?? 0);
    return Math.max(0, total - Number(f['paidAmount'] ?? 0) - Number(f['waiverAmount'] ?? 0));
  }

  pendingTotal(): number {
    return this.myFees().reduce((sum, f) => sum + this.pending(f), 0);
  }

  pendingClassTotal(): number {
    return this.pendingRows().reduce((sum, r) => sum + r.pending, 0);
  }

  ngOnInit(): void {
    if (this.selfService) { this.loadMine(); } else { this.load(); this.loadPendingByClass(); }
  }

  loadMine(): void {
    const id = this.auth.studentId();
    if (!id) { this.error.set('Your account is not linked to a student record yet.'); return; }
    this.loading.set(true); this.error.set('');
    this.service.myPayments(id).subscribe({
      next: (list) => { this.myFees.set(list ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load your fees.')); this.loading.set(false); },
    });
    this.service.transactionsForStudent(id).subscribe({
      next: (list) => this.myTransactions.set(list ?? []),
      error: () => {},
    });
  }

  downloadReceipt(transactionId: string): void {
    this.service.receipt(transactionId).subscribe({
      next: (link) => { if (link?.downloadUrl) window.open(link.downloadUrl, '_blank'); },
      error: () => {},
    });
  }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.service.listStructures(this.filterClassId || undefined).subscribe({
      next: (list) => { this.rows.set(list ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load fee structures.')); this.loading.set(false); },
    });
  }

  loadPendingByClass(): void {
    this.pendingLoading.set(true); this.pendingError.set(''); this.pendingLoaded.set(false);
    this.service.pendingSummaryByClass(this.pendingClassId).subscribe({
      next: (summary) => {
        const students = summary?.students ?? [];
        if (students.length === 0) {
          this.pendingRows.set([]); this.pendingLoading.set(false); this.pendingLoaded.set(true);
          return;
        }
        // Resolve names for this class in one page load, then merge by id.
        this.studentsService.list({ classId: this.pendingClassId, pageSize: 200 }).subscribe({
          next: (page) => {
            const byId = new Map((page?.items ?? []).map((s) => [s.id, s]));
            this.pendingRows.set(students.map((s) => ({ ...s, student: byId.get(s.studentId) })));
            this.pendingLoading.set(false); this.pendingLoaded.set(true);
          },
          error: () => {
            this.pendingRows.set(students.map((s) => ({ ...s })));
            this.pendingLoading.set(false); this.pendingLoaded.set(true);
          },
        });
      },
      error: (err) => { this.pendingError.set(this.msg(err, 'Failed to load pending fees.')); this.pendingLoading.set(false); },
    });
  }

  searchStudents(): void {
    if (!this.searchKeyword.trim()) return;
    this.searching.set(true); this.searchError.set(''); this.searched.set(false);
    this.studentsService.list({ keyword: this.searchKeyword, pageSize: 20 }).subscribe({
      next: (page) => {
        const students = page?.items ?? [];
        if (students.length === 0) {
          this.searchResults.set([]); this.searching.set(false); this.searched.set(true);
          return;
        }
        forkJoin(
          students.map((student) =>
            this.service.myPayments(student.id).pipe(
              map((fees) => ({ student, pending: (fees ?? []).reduce((sum, f) => sum + this.pending(f), 0) })),
              catchError(() => of({ student, pending: 0, error: 'Could not load fees' })),
            ),
          ),
        ).subscribe((results) => {
          this.searchResults.set(results.sort((a, b) => b.pending - a.pending));
          this.searching.set(false); this.searched.set(true);
        });
      },
      error: (err) => { this.searchError.set(this.msg(err, 'Search failed.')); this.searching.set(false); },
    });
  }

  loadTotals(): void {
    this.service.collectionTotals(this.fromDate + 'T00:00:00Z', this.toDate + 'T23:59:59Z').subscribe({
      next: (t) => this.total.set(t?.totalCollected ?? 0),
      error: () => this.total.set(null),
    });
  }

  save(): void {
    if (!this.form.name || !this.form.classId || !this.form.academicYear || !this.form.amount || !this.form.dueDate) {
      this.formError.set('Name, class, year, amount and due date are required.'); return;
    }
    this.saving.set(true); this.formError.set('');
    this.service.createStructure({
      name: this.form.name, classId: this.form.classId, academicYear: this.form.academicYear,
      amount: this.form.amount, dueDateUtc: `${this.form.dueDate}T00:00:00Z`,
    }).subscribe({
      next: () => { this.saving.set(false); this.showForm.set(false); this.form = { name: '', classId: '', academicYear: '', amount: 0, dueDate: '' }; this.load(); },
      error: (err) => { this.saving.set(false); this.formError.set(this.msg(err, 'Could not create.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
