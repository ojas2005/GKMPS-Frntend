import { Component, OnInit, inject, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FeesService, FeeEntry, StudentFeeBalance, FEE_CATEGORIES, FeeEntryQuery } from '../fees.service';
import { SCHOOL_CLASSES, ACADEMIC_YEAR_CHOICES, CURRENT_ACADEMIC_YEAR } from '../../../core/constants/classes';
import { THEMED_FIELDS } from '../../../shared/forms';
import { apiError, feeCategoryLabel, feeStatusClass, feeStatusLabel, sessionMonths } from '../fee-ui';

type LedgerMode = 'entries' | 'students';

/**
 * Every fee on every account, or each student's balance, with search and filters. Rows open
 * the student's page, where payments, discounts and extra charges are recorded.
 */
@Component({
  selector: 'app-fee-ledger',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ...THEMED_FIELDS],
  template: `
    <div class="space-y-4">
      <!-- Filters -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 space-y-3">
        <div class="flex flex-wrap gap-3">
          <input [(ngModel)]="q.keyword" (keyup.enter)="search()" placeholder="Search by student name or admission number…" aria-label="Search students"
            class="flex-1 min-w-[14rem] px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <button (click)="search()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Search</button>
          <button (click)="reset()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Clear</button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <select [(ngModel)]="q.classId" (ngModelChange)="search()" aria-label="Class" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
            <option value="">All classes</option>
            <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
          </select>
          <select [(ngModel)]="q.academicYear" (ngModelChange)="onYear()" aria-label="Session" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
            <option value="">All sessions</option>
            <option *ngFor="let y of years" [value]="y">{{ y }}</option>
          </select>
          <select [(ngModel)]="q.month" (ngModelChange)="search()" aria-label="Due month" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
            <option value="">Any month</option>
            <option *ngFor="let m of months" [value]="m.value">{{ m.label }}</option>
          </select>
          <select [(ngModel)]="q.category" (ngModelChange)="search()" aria-label="Fee type" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
            <option value="">All fee types</option>
            <option *ngFor="let c of categories" [value]="c">{{ categoryLabel(c) }}</option>
          </select>
          <ng-container *ngIf="mode() === 'entries'">
          <select [(ngModel)]="q.status" (ngModelChange)="search()" aria-label="Payment status" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Any status</option>
              <option value="Outstanding">Unpaid</option>
              <option value="Overdue">Overdue</option>
              <option value="Pending">Pending</option>
              <option value="PartiallyPaid">Partially paid</option>
              <option value="Paid">Paid</option>
            </select>
            <label class="flex items-center gap-2 text-sm text-neutral-700 px-1">
              <input type="checkbox" [(ngModel)]="q.includeUpcoming" (ngModelChange)="search()"> Include upcoming
            </label>
          </ng-container>
          <label *ngIf="mode() === 'students'" class="flex items-center gap-2 text-sm text-neutral-700 px-1">
            <input type="checkbox" [(ngModel)]="onlyOwing" (ngModelChange)="search()"> Only students with dues now
          </label>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-5 space-y-3"><div *ngFor="let i of [1,2,3,4,5,6]" class="skeleton h-10"></div></div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>

        <!-- Fee entries -->
        <ng-container *ngIf="mode() === 'entries' && !loading() && !error()">
          <div *ngIf="entries().length === 0" class="p-8 text-center text-neutral-500">No fees match these filters.</div>
          <div *ngIf="entries().length > 0" class="overflow-x-auto">
            <table class="w-full text-sm min-w-[56rem]">
              <thead class="bg-neutral-50 text-neutral-600 text-left">
                <tr>
                  <th class="px-4 py-3 font-medium">Student</th><th class="px-3 py-3 font-medium">Class</th>
                  <th class="px-3 py-3 font-medium">Fee</th><th class="px-3 py-3 font-medium">Session</th>
                  <th class="px-3 py-3 font-medium">Due</th><th class="px-3 py-3 font-medium text-right">Amount</th>
                  <th class="px-3 py-3 font-medium text-right">Paid</th><th class="px-3 py-3 font-medium text-right">Pending</th>
                  <th class="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let e of entries()" [routerLink]="['/students', e.studentId]" class="border-t border-neutral-100 hover:bg-neutral-50 cursor-pointer">
                  <td class="px-4 py-2.5">
                    <p class="font-medium text-neutral-900">{{ e.studentName || 'Unknown student' }}</p>
                    <p class="text-xs text-neutral-500">{{ e.admissionNumber || '' }}</p>
                  </td>
                  <td class="px-3 py-2.5 text-neutral-600">{{ e.className }}</td>
                  <td class="px-3 py-2.5">
                    <p class="text-neutral-900">{{ e.label }}</p>
                    <p class="text-xs text-neutral-500">{{ categoryLabel(e.category) }}{{ e.category === 'Transport' && e.description ? ' · ' + e.description : '' }}</p>
                  </td>
                  <td class="px-3 py-2.5 text-neutral-600">{{ e.academicYear || '—' }}</td>
                  <td class="px-3 py-2.5 text-neutral-600 whitespace-nowrap">{{ e.dueDate ? (e.dueDate | date:'d MMM yyyy') : '—' }}</td>
                  <td class="px-3 py-2.5 text-right text-neutral-900">{{ e.totalAmount | currency:'INR':'symbol':'1.0-2' }}</td>
                  <td class="px-3 py-2.5 text-right text-neutral-600">
                    {{ e.paidAmount | currency:'INR':'symbol':'1.0-2' }}
                    <span *ngIf="e.discountAmount > 0" class="block text-[11px] text-neutral-500">−{{ e.discountAmount | currency:'INR':'symbol':'1.0-2' }} off</span>
                  </td>
                  <td class="px-3 py-2.5 text-right font-medium" [class]="e.pending > 0 ? 'text-error-600' : 'text-success-600'">{{ e.pending | currency:'INR':'symbol':'1.0-2' }}</td>
                  <td class="px-4 py-2.5"><span [class]="statusClass(e.status, e.isOverdue)">{{ statusLabel(e.status, e.isOverdue, e.isDue) }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </ng-container>

        <!-- Per student -->
        <ng-container *ngIf="mode() === 'students' && !loading() && !error()">
          <div *ngIf="balances().length === 0" class="p-8 text-center text-neutral-500">No students match these filters.</div>
          <div *ngIf="balances().length > 0" class="overflow-x-auto">
            <table class="w-full text-sm min-w-[48rem]">
              <thead class="bg-neutral-50 text-neutral-600 text-left">
                <tr>
                  <th class="px-4 py-3 font-medium">Student</th><th class="px-3 py-3 font-medium">Class</th>
                  <th class="px-3 py-3 font-medium text-right">Billed</th><th class="px-3 py-3 font-medium text-right">Paid</th>
                  <th class="px-3 py-3 font-medium text-right">Discounts</th><th class="px-3 py-3 font-medium text-right">Pending now</th>
                  <th class="px-3 py-3 font-medium text-right">Upcoming</th><th class="px-4 py-3 font-medium">Oldest unpaid</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let b of balances()" [routerLink]="['/students', b.studentId]" class="border-t border-neutral-100 hover:bg-neutral-50 cursor-pointer">
                  <td class="px-4 py-2.5">
                    <p class="font-medium text-neutral-900">{{ b.studentName || 'Unknown student' }}</p>
                    <p class="text-xs text-neutral-500">{{ b.admissionNumber || '' }}{{ b.studentStatus && b.studentStatus !== 'Active' ? ' · left' : '' }}</p>
                  </td>
                  <td class="px-3 py-2.5 text-neutral-600">{{ b.className }}</td>
                  <td class="px-3 py-2.5 text-right text-neutral-900">{{ b.billed | currency:'INR':'symbol':'1.0-0' }}</td>
                  <td class="px-3 py-2.5 text-right text-success-700">{{ b.paid | currency:'INR':'symbol':'1.0-0' }}</td>
                  <td class="px-3 py-2.5 text-right text-neutral-600">{{ b.discount | currency:'INR':'symbol':'1.0-0' }}</td>
                  <td class="px-3 py-2.5 text-right font-semibold" [class]="b.pendingDue > 0 ? 'text-error-600' : 'text-success-600'">{{ b.pendingDue | currency:'INR':'symbol':'1.0-0' }}</td>
                  <td class="px-3 py-2.5 text-right text-neutral-600">{{ b.upcoming | currency:'INR':'symbol':'1.0-0' }}</td>
                  <td class="px-4 py-2.5 text-neutral-600 whitespace-nowrap">{{ b.oldestUnpaidDueDate ? (b.oldestUnpaidDueDate | date:'d MMM yyyy') : '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ng-container>

        <!-- Paging -->
        <div *ngIf="total() > 0 && !loading()" class="flex items-center justify-between px-4 py-3 border-t border-neutral-200 text-sm">
          <span class="text-neutral-600">{{ (page() - 1) * pageSize + 1 }}–{{ min(page() * pageSize, total()) }} of {{ total() }}</span>
          <div class="flex gap-2">
            <button (click)="go(page() - 1)" [disabled]="page() <= 1" class="px-3 py-1.5 border border-neutral-300 rounded-lg disabled:opacity-40">Previous</button>
            <button (click)="go(page() + 1)" [disabled]="page() * pageSize >= total()" class="px-3 py-1.5 border border-neutral-300 rounded-lg disabled:opacity-40">Next</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FeeLedgerComponent implements OnInit {
  private fees = inject(FeesService);

  mode = input<LedgerMode>('entries');

  readonly classes = SCHOOL_CLASSES;
  readonly years = ACADEMIC_YEAR_CHOICES;
  readonly categories = FEE_CATEGORIES;
  readonly pageSize = 50;
  months = sessionMonths(CURRENT_ACADEMIC_YEAR);

  q: Required<Pick<FeeEntryQuery, 'keyword' | 'classId' | 'academicYear' | 'month' | 'category' | 'status'>> & { includeUpcoming: boolean } = this.blank();

  /** By-student list: hide students who owe nothing now. Totals there always cover every fee. */
  onlyOwing = true;
  entries = signal<FeeEntry[]>([]);
  balances = signal<StudentFeeBalance[]>([]);
  total = signal(0);
  page = signal(1);
  loading = signal(false);
  error = signal('');

  categoryLabel = feeCategoryLabel;
  statusClass = feeStatusClass;
  statusLabel = feeStatusLabel;
  min = Math.min;

  private blank() {
    return { keyword: '', classId: '', academicYear: CURRENT_ACADEMIC_YEAR, month: '', category: '', status: 'Outstanding', includeUpcoming: false };
  }

  ngOnInit(): void { this.load(); }

  reset(): void { this.q = this.blank(); this.months = sessionMonths(CURRENT_ACADEMIC_YEAR); this.search(); }

  onYear(): void {
    this.months = sessionMonths(this.q.academicYear || CURRENT_ACADEMIC_YEAR);
    if (this.q.month && !this.months.some((m) => m.value === this.q.month)) this.q.month = '';
    this.search();
  }

  search(): void { this.page.set(1); this.load(); }
  go(p: number): void { this.page.set(p); this.load(); }

  load(): void {
    this.loading.set(true); this.error.set('');
    const query: FeeEntryQuery = { ...this.q, page: this.page(), pageSize: this.pageSize };
    if (this.mode() === 'students') {
      // A student's balance counts every fee -- paid, part-paid and upcoming -- so the
      // fee-list status filters don't apply; "only students with dues" picks the rows instead.
      Object.assign(query, { status: '', includeUpcoming: true, onlyOwing: this.onlyOwing });
      this.fees.studentBalances(query).subscribe({
        next: (r) => { this.balances.set(r?.items ?? []); this.total.set(r?.totalCount ?? 0); this.loading.set(false); },
        error: (err) => { this.error.set(apiError(err, 'Failed to load balances.')); this.loading.set(false); },
      });
    } else {
      this.fees.entries(query).subscribe({
        next: (r) => { this.entries.set(r?.items ?? []); this.total.set(r?.totalCount ?? 0); this.loading.set(false); },
        error: (err) => { this.error.set(apiError(err, 'Failed to load fees.')); this.loading.set(false); },
      });
    }
  }
}
