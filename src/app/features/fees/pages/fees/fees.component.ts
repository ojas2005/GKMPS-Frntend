import { Component, OnInit, inject, signal } from '@angular/core';
import { openDownload } from '../../../../core/config/runtime-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeesService, FeeStatement } from '../../fees.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { FeeOverviewComponent } from '../../components/fee-overview.component';
import { FeeLedgerComponent } from '../../components/fee-ledger.component';
import { FeeStructureComponent } from '../../components/fee-structure.component';
import { apiError, feeCategoryLabel, feeStatusClass, feeStatusLabel } from '../../fee-ui';

type FeesTab = 'overview' | 'entries' | 'students' | 'structure';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, FormsModule, FeeOverviewComponent, FeeLedgerComponent, FeeStructureComponent],
  template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">{{ selfService ? (parentView ? "My Child's Fees" : 'My Fees') : 'Fees' }}</h1>
        <p class="text-neutral-600 text-sm">{{ selfService
          ? 'Every fee on the account, what has been paid, and what is due.'
          : 'Collections and dues, every fee on every account, and the fee structure.' }}</p>
      </div>

      <!-- Staff -->
      <ng-container *ngIf="!selfService">
        <div class="flex flex-wrap gap-2 border-b border-neutral-200" role="tablist" aria-label="Fees sections">
          <button *ngFor="let t of tabs" role="tab" [attr.aria-selected]="tab() === t.id" (click)="tab.set(t.id)" [class]="tabClass(t.id)">{{ t.label }}</button>
        </div>
        <app-fee-overview *ngIf="tab() === 'overview'" />
        <app-fee-ledger *ngIf="tab() === 'entries'" mode="entries" />
        <app-fee-ledger *ngIf="tab() === 'students'" mode="students" />
        <app-fee-structure *ngIf="tab() === 'structure'" />
      </ng-container>

      <!-- Parent -->
      <ng-container *ngIf="selfService">
        <div *ngIf="loading()" class="space-y-3"><div *ngFor="let i of [1,2,3,4]" class="skeleton h-12"></div></div>
        <div *ngIf="error()" class="p-6 text-center text-error-600 bg-white rounded-xl border border-neutral-200">{{ error() }}</div>
        <ng-container *ngIf="statement() as st">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="rounded-xl p-5 shadow-sm border" [class]="st.totals.pendingDue > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
              <p class="text-sm" [class]="st.totals.pendingDue > 0 ? 'text-error-700' : 'text-success-700'">{{ st.totals.pendingDue > 0 ? 'To pay now' : 'Fee status' }}</p>
              <p class="text-3xl font-bold" [class]="st.totals.pendingDue > 0 ? 'text-error-700' : 'text-success-700'">
                {{ st.totals.pendingDue > 0 ? (st.totals.pendingDue | currency:'INR':'symbol':'1.0-2') : 'All paid ✓' }}
              </p>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-neutral-200">
              <p class="text-sm text-neutral-500">Coming up this session</p>
              <p class="text-2xl font-bold text-neutral-900">{{ st.totals.upcoming | currency:'INR':'symbol':'1.0-2' }}</p>
              <p class="text-xs text-neutral-500 mt-1">Fees created for later dates; not payable yet.</p>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-neutral-200">
              <p class="text-sm text-neutral-500">Paid so far</p>
              <p class="text-2xl font-bold text-success-700">{{ st.totals.paid | currency:'INR':'symbol':'1.0-2' }}</p>
              <p *ngIf="st.transport" class="text-xs text-neutral-500 mt-1">Transport: {{ st.transport.routeName }} · {{ st.transport.monthlyFee | currency:'INR':'symbol':'1.0-0' }}/month</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div *ngIf="st.entries.length === 0" class="p-8 text-center text-neutral-500">No fees yet.</div>
            <div *ngIf="st.entries.length > 0" class="overflow-x-auto">
              <table class="w-full text-sm min-w-[40rem]">
                <thead class="bg-neutral-50 text-neutral-600 text-left">
                  <tr><th class="px-5 py-3 font-medium">Fee</th><th class="px-3 py-3 font-medium">Due</th><th class="px-3 py-3 font-medium text-right">Amount</th>
                    <th class="px-3 py-3 font-medium text-right">Paid</th><th class="px-3 py-3 font-medium text-right">To pay</th><th class="px-5 py-3 font-medium">Status</th></tr>
                </thead>
                <tbody>
                  <tr *ngFor="let e of st.entries" class="border-t border-neutral-100">
                    <td class="px-5 py-2.5"><p class="text-neutral-900">{{ e.label }}</p><p class="text-xs text-neutral-500">{{ categoryLabel(e.category) }}</p></td>
                    <td class="px-3 py-2.5 text-neutral-600 whitespace-nowrap">{{ e.dueDate ? (e.dueDate | date:'d MMM yyyy') : '—' }}</td>
                    <td class="px-3 py-2.5 text-right text-neutral-900">{{ e.totalAmount | currency:'INR':'symbol':'1.0-2' }}</td>
                    <td class="px-3 py-2.5 text-right text-neutral-600">{{ e.paidAmount | currency:'INR':'symbol':'1.0-2' }}<span *ngIf="e.discountAmount > 0" class="block text-[11px]">−{{ e.discountAmount | currency:'INR':'symbol':'1.0-2' }} concession</span></td>
                    <td class="px-3 py-2.5 text-right font-medium" [class]="e.pending > 0 ? 'text-error-600' : 'text-success-600'">{{ e.pending | currency:'INR':'symbol':'1.0-2' }}</td>
                    <td class="px-5 py-2.5"><span [class]="statusClass(e.status, e.isOverdue)">{{ statusLabel(e.status, e.isOverdue, e.isDue) }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Receipts</h2>
            <p *ngIf="st.payments.length === 0" class="text-neutral-500 text-sm">No payments recorded yet.</p>
            <div *ngFor="let t of st.payments" class="flex items-center justify-between py-2 text-sm border-t border-neutral-100 first:border-t-0">
              <div>
                <span class="text-neutral-900">{{ t.description || t.periodLabel || t.feeStructureName || 'Fee' }}</span>
                <span class="text-neutral-500"> · {{ t.amount | currency:'INR':'symbol':'1.0-2' }} · {{ t.paidAtUtc | date:'mediumDate' }} · {{ t.receiptNumber }}</span>
              </div>
              <button (click)="downloadReceipt(t.id)" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Download →</button>
            </div>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
})
export class FeesComponent implements OnInit {
  private service = inject(FeesService);
  private auth = inject(AuthService);
  selfService = this.auth.isSelfService();
  parentView = this.auth.isParentView();

  readonly tabs: Array<{ id: FeesTab; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'entries', label: 'All fees' },
    { id: 'students', label: 'By student' },
    { id: 'structure', label: 'Fee structure' },
  ];
  tab = signal<FeesTab>('overview');

  statement = signal<FeeStatement | null>(null);
  loading = signal(false);
  error = signal('');

  categoryLabel = feeCategoryLabel;
  statusClass = feeStatusClass;
  statusLabel = feeStatusLabel;

  ngOnInit(): void {
    if (this.selfService) this.loadMine();
  }

  tabClass(t: FeesTab): string {
    const base = 'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ';
    return base + (this.tab() === t ? 'border-primary-600 text-primary-700' : 'border-transparent text-neutral-500 hover:text-neutral-800');
  }

  loadMine(): void {
    const id = this.auth.studentId();
    if (!id) { this.error.set('Your account is not linked to a student record yet.'); return; }
    this.loading.set(true); this.error.set('');
    this.service.statement(id).subscribe({
      next: (st) => { this.statement.set(st); this.loading.set(false); },
      error: (err) => { this.error.set(apiError(err, 'Failed to load the fees.')); this.loading.set(false); },
    });
  }

  downloadReceipt(transactionId: string): void {
    this.service.receipt(transactionId).subscribe({ next: (link) => openDownload(link?.downloadUrl), error: () => {} });
  }
}
