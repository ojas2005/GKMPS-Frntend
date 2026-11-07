import { Component, OnInit, inject, signal, input, effect, untracked } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { openDownload } from '../../../core/config/runtime-config';
import { FeesService, FeeStatement, FeeEntry, PAYMENT_METHODS } from '../fees.service';
import { TransportService, TransportRoute } from '../../transport/transport.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { THEMED_FIELDS } from '../../../shared/forms';
import { Student } from '../../students/students.service';
import { apiError, feeCategoryLabel, feeStatusClass, feeStatusLabel, localIsoDate } from '../fee-ui';

type Action = { kind: 'pay' | 'discount'; entry: FeeEntry } | { kind: 'charge' } | null;

const HISTORY_LABELS: Record<string, string> = {
  Concession: 'Concession', WaiverApproved: 'Waiver approved', ChargeAdded: 'Charge added', Repriced: 'Re-priced',
  AccountOpened: 'Account opened', AccountClosed: 'Billing stopped', AccountReopened: 'Billing resumed', TransportChanged: 'Transport',
};

/**
 * A student's fee account on their page: every fee with its due date and status, payments
 * (full or partial) with receipts, discounts, extra charges, transport, and the full history.
 */
@Component({
  selector: 'app-student-fees',
  standalone: true,
  imports: [CommonModule, FormsModule, ...THEMED_FIELDS],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-neutral-200">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-neutral-200 flex flex-wrap items-center gap-3">
        <h2 class="text-lg font-semibold text-neutral-900 mr-auto">Fees</h2>
        <ng-container *ngIf="st() as s">
          <span class="px-3 py-1 rounded-lg text-sm font-semibold" [class]="s.totals.pendingDue > 0 ? 'bg-error-50 text-error-700' : 'bg-success-50 text-success-700'">
            {{ s.totals.pendingDue > 0 ? 'Pending ' + (s.totals.pendingDue | currency:'INR':'symbol':'1.0-2') : 'Nothing due' }}
          </span>
          <span *ngIf="s.totals.upcoming > 0" class="px-3 py-1 rounded-lg text-sm bg-neutral-100 text-neutral-700">Upcoming {{ s.totals.upcoming | currency:'INR':'symbol':'1.0-0' }}</span>
          <span class="px-3 py-1 rounded-lg text-sm bg-neutral-100 text-neutral-700">Paid {{ s.totals.paid | currency:'INR':'symbol':'1.0-0' }}</span>
          <button *ngIf="canCollect && s.account?.isOpen" (click)="generate()" [disabled]="busy()" class="px-3 py-1.5 border border-neutral-300 rounded-lg text-xs hover:bg-neutral-50" title="Create any monthly or exam fees that are due by today">Update now</button>
        </ng-container>
      </div>

      <div *ngIf="loading()" class="p-6 space-y-3"><div *ngFor="let i of [1,2,3,4]" class="skeleton h-10"></div></div>
      <div *ngIf="error()" class="p-6 text-error-600 text-sm">{{ error() }}</div>

      <ng-container *ngIf="st() as s">
        <!-- Account state -->
        <div *ngIf="!s.account && student().status === 'Active'" class="mx-6 mt-4 rounded-xl border border-warning-200 bg-warning-50 p-4 flex flex-wrap items-end gap-3">
          <div class="flex-1 min-w-[16rem] text-sm text-warning-700">
            <p class="font-semibold">No fee account yet</p>
            <p class="text-xs mt-0.5">This student was admitted before automatic billing. Start the account to bill {{ s.student.className }}'s monthly tuition, transport and exam fees from the date chosen.</p>
          </div>
          <ng-container *ngIf="canCollect">
            <div>
              <label class="block text-xs text-warning-700 mb-1" for="sf-open-from">Bill from</label>
              <input id="sf-open-from" type="date" [(ngModel)]="openFrom" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
            </div>
            <label class="flex items-center gap-2 text-xs text-warning-700 pb-2"><input type="checkbox" [(ngModel)]="openWithAdmission"> Charge the admission fee too</label>
            <button (click)="openAccount()" [disabled]="busy()" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">Start fee account</button>
          </ng-container>
        </div>
        <p *ngIf="s.account && !s.account.isOpen" class="mx-6 mt-4 text-sm text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2">
          Billing stopped{{ s.account.closedAtUtc ? ' on ' + (s.account.closedAtUtc | date:'d MMM yyyy') : '' }}{{ s.account.closedReason ? ' — ' + s.account.closedReason : '' }}. No new fees are created; what's owed stays payable.
        </p>
        <p *ngIf="s.account?.isOpen" class="mx-6 mt-4 text-xs text-neutral-500">
          Fee account open since {{ s.account!.billingStartDate | date:'d MMM yyyy' }} · {{ s.student.className }} · monthly fees are created on the 1st of each month.
        </p>

        <!-- Transport -->
        <div class="mx-6 mt-4 rounded-xl border border-neutral-200 p-4">
          <div class="flex flex-wrap items-center gap-3">
            <div class="mr-auto text-sm">
              <p class="font-medium text-neutral-900">Transportation</p>
              <p *ngIf="s.transport" class="text-neutral-600">{{ s.transport.routeName }} · {{ s.transport.monthlyFee | currency:'INR':'symbol':'1.0-0' }}/month{{ s.transport.pickupPoint ? ' · pickup: ' + s.transport.pickupPoint : '' }}<span *ngIf="!s.transport.routeActive" class="text-warning-700"> · route switched off</span></p>
              <p *ngIf="!s.transport" class="text-neutral-500">Not using school transport.</p>
            </div>
            <ng-container *ngIf="canManageTransport && student().status === 'Active'">
              <button (click)="startRouteEdit()" class="px-3 py-1.5 border border-neutral-300 rounded-lg text-xs hover:bg-neutral-50">{{ s.transport ? 'Change route' : 'Add transport' }}</button>
              <button *ngIf="s.transport" (click)="stopTransport()" [disabled]="busy()" class="px-3 py-1.5 border border-error-200 text-error-600 rounded-lg text-xs hover:bg-error-50">Stop transport</button>
            </ng-container>
          </div>
          <div *ngIf="editingRoute()" class="mt-3 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-3 items-end">
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="sf-route">Route</label>
              <select id="sf-route" [(ngModel)]="routeForm.routeId" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                <option value="" disabled>Select a route</option>
                <option *ngFor="let r of routes()" [value]="r.id">{{ r.name }} — {{ (r.monthlyFee ?? 0) | currency:'INR':'symbol':'1.0-0' }}/month</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="sf-pickup">Pickup point</label>
              <input id="sf-pickup" [(ngModel)]="routeForm.pickupPoint" maxlength="200" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            </div>
            <button (click)="saveRoute()" [disabled]="busy() || !routeForm.routeId" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">Save</button>
            <button (click)="editingRoute.set(false)" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Cancel</button>
            <p class="md:col-span-4 text-xs text-neutral-500">The new route's charge applies from the next monthly transport fee. Fees already created keep their amount.</p>
          </div>
        </div>

        <!-- Statement -->
        <div class="px-6 pt-5 flex flex-wrap items-center gap-4">
          <h3 class="text-sm font-semibold text-neutral-900 mr-auto">Fee statement</h3>
          <label class="flex items-center gap-2 text-xs text-neutral-600"><input type="checkbox" [(ngModel)]="showPaid"> Show paid</label>
          <label class="flex items-center gap-2 text-xs text-neutral-600"><input type="checkbox" [(ngModel)]="showUpcoming"> Show upcoming</label>
          <button *ngIf="canCollect" (click)="openCharge()" class="px-3 py-1.5 border border-neutral-300 rounded-lg text-xs hover:bg-neutral-50">+ Add a charge</button>
        </div>
        <div class="px-6 pb-2">
          <p *ngIf="visibleEntries().length === 0" class="py-6 text-center text-neutral-500 text-sm">{{ s.entries.length ? 'Nothing to show with these filters.' : 'No fees on this account.' }}</p>
          <div *ngIf="visibleEntries().length > 0" class="overflow-x-auto">
            <table class="w-full text-sm min-w-[52rem] mt-2">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2 font-medium">Fee</th><th class="py-2 font-medium">Session</th><th class="py-2 font-medium">Due</th>
                  <th class="py-2 font-medium text-right">Amount</th><th class="py-2 font-medium text-right">Paid</th><th class="py-2 font-medium text-right">Discount</th>
                  <th class="py-2 font-medium text-right">Pending</th><th class="py-2 font-medium pl-4">Status</th><th class="py-2"></th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let e of visibleEntries()" class="border-t border-neutral-100" [class.bg-primary-50]="isActive(e)">
                  <td class="py-2.5 pr-3">
                    <p class="text-neutral-900">{{ e.label }}</p>
                    <p class="text-xs text-neutral-500">{{ categoryLabel(e.category) }}{{ e.category === 'Transport' && e.description ? ' · ' + e.description : '' }}{{ e.className && e.className !== s.student.className ? ' · ' + e.className : '' }}</p>
                  </td>
                  <td class="py-2.5 text-neutral-600">{{ e.academicYear || '—' }}</td>
                  <td class="py-2.5 text-neutral-600 whitespace-nowrap">{{ e.dueDate ? (e.dueDate | date:'d MMM yyyy') : '—' }}</td>
                  <td class="py-2.5 text-right text-neutral-900">{{ e.totalAmount | currency:'INR':'symbol':'1.0-2' }}</td>
                  <td class="py-2.5 text-right text-neutral-600">{{ e.paidAmount | currency:'INR':'symbol':'1.0-2' }}<span *ngIf="e.lastPaidAtUtc" class="block text-[11px] text-neutral-500">{{ e.lastPaidAtUtc | date:'d MMM' }}</span></td>
                  <td class="py-2.5 text-right text-neutral-600">{{ e.discountAmount ? (e.discountAmount | currency:'INR':'symbol':'1.0-2') : '—' }}</td>
                  <td class="py-2.5 text-right font-medium" [class]="e.pending > 0 ? 'text-error-600' : 'text-success-600'">{{ e.pending | currency:'INR':'symbol':'1.0-2' }}</td>
                  <td class="py-2.5 pl-4"><span [class]="statusClass(e.status, e.isOverdue)">{{ statusLabel(e.status, e.isOverdue, e.isDue) }}</span></td>
                  <td class="py-2.5 text-right whitespace-nowrap">
                    <ng-container *ngIf="e.pending > 0">
                      <button *ngIf="canCollect" (click)="openPay(e)" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Pay</button>
                      <button *ngIf="canDiscount" (click)="openDiscount(e)" class="ml-3 text-neutral-600 hover:text-neutral-900 text-xs font-medium">Discount</button>
                    </ng-container>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Action panel -->
        <div *ngIf="action() as a" class="mx-6 mb-4 rounded-xl border border-primary-200 bg-primary-50 p-4">
          <ng-container *ngIf="a.kind === 'pay' || a.kind === 'discount'">
            <p class="text-sm font-semibold text-neutral-900 mb-3">
              {{ a.kind === 'pay' ? 'Record a payment' : 'Apply a discount / concession' }} — {{ a.entry.label }}
              <span class="font-normal text-neutral-600">({{ a.entry.pending | currency:'INR':'symbol':'1.0-2' }} still owed)</span>
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs text-neutral-500 mb-1" for="sf-amount">Amount (₹) *</label>
                <input id="sf-amount" type="number" min="0.01" [max]="a.entry.pending" step="0.01" [(ngModel)]="form.amount" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                <p class="text-[11px] text-neutral-500 mt-1">{{ a.kind === 'pay' ? 'Less than the full amount records a part payment.' : 'Taken off this fee; cannot be more than what is owed.' }}</p>
              </div>
              <ng-container *ngIf="a.kind === 'pay'">
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="sf-method">Payment method</label>
                  <select id="sf-method" [(ngModel)]="form.method" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option *ngFor="let m of methods" [value]="m">{{ m === 'BankTransfer' ? 'Bank transfer' : m }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="sf-ref">Reference (UPI / cheque no.)</label>
                  <input id="sf-ref" [(ngModel)]="form.reference" maxlength="100" placeholder="Optional" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                </div>
              </ng-container>
              <div *ngIf="a.kind === 'discount'" class="md:col-span-2">
                <label class="block text-xs text-neutral-500 mb-1" for="sf-reason">Reason *</label>
                <input id="sf-reason" [(ngModel)]="form.reason" maxlength="500" placeholder="e.g. Sibling concession, staff ward" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
              </div>
            </div>
          </ng-container>
          <ng-container *ngIf="a.kind === 'charge'">
            <p class="text-sm font-semibold text-neutral-900 mb-3">Add a charge</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs text-neutral-500 mb-1" for="sf-desc">What for *</label>
                <input id="sf-desc" [(ngModel)]="form.description" maxlength="50" placeholder="e.g. Sports kit, late fee" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
              </div>
              <div>
                <label class="block text-xs text-neutral-500 mb-1" for="sf-charge-amount">Amount (₹) *</label>
                <input id="sf-charge-amount" type="number" min="1" [(ngModel)]="form.amount" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
              </div>
              <div>
                <label class="block text-xs text-neutral-500 mb-1" for="sf-due">Due on</label>
                <input id="sf-due" type="date" [(ngModel)]="form.dueDate" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
              </div>
            </div>
          </ng-container>
          <div class="mt-3 flex items-center gap-3">
            <button (click)="submit()" [disabled]="busy()" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ busy() ? 'Saving…' : a.kind === 'pay' ? 'Record payment' : a.kind === 'discount' ? 'Apply discount' : 'Add charge' }}
            </button>
            <button (click)="action.set(null)" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-white">Cancel</button>
            <span *ngIf="actionError()" class="text-sm text-error-600">{{ actionError() }}</span>
          </div>
        </div>

        <!-- Payments & history -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6 pt-2 border-t border-neutral-200 mt-2">
          <div>
            <h3 class="text-sm font-semibold text-neutral-900 mt-4 mb-2">Payments &amp; receipts</h3>
            <p *ngIf="s.payments.length === 0" class="text-neutral-500 text-sm">No payments recorded yet.</p>
            <div *ngFor="let t of s.payments" class="flex items-center justify-between py-2 text-sm border-t border-neutral-100 first:border-t-0">
              <div class="min-w-0">
                <p class="text-neutral-900 truncate">{{ t.description || t.periodLabel || t.feeStructureName || 'Fee' }}</p>
                <p class="text-xs text-neutral-500">{{ t.amount | currency:'INR':'symbol':'1.0-2' }} · {{ t.paymentMethod }} · {{ t.paidAtUtc | date:'d MMM yyyy, h:mm a' }} · {{ t.receiptNumber }}</p>
              </div>
              <button (click)="downloadReceipt(t.id)" class="text-primary-600 hover:text-primary-700 text-xs font-medium shrink-0 ml-3">Receipt →</button>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-neutral-900 mt-4 mb-2">History</h3>
            <p *ngIf="s.history.length === 0" class="text-neutral-500 text-sm">No changes yet.</p>
            <div *ngFor="let h of s.history.slice(0, historyLimit())" class="py-2 text-sm border-t border-neutral-100 first:border-t-0">
              <p class="text-neutral-900">
                {{ historyLabel(h.kind) }}<ng-container *ngIf="h.amount && h.kind !== 'AccountOpened'"> · {{ h.amount | currency:'INR':'symbol':'1.0-2' }}</ng-container>
                <span *ngIf="h.feeLabel" class="text-neutral-500"> · {{ h.feeLabel }}</span>
              </p>
              <p class="text-xs text-neutral-500">{{ h.createdAtUtc | date:'d MMM yyyy, h:mm a' }}{{ h.actorRole ? ' · ' + h.actorRole : '' }}{{ h.reason ? ' · ' + h.reason : '' }}</p>
            </div>
            <button *ngIf="s.history.length > historyLimit()" (click)="historyLimit.set(s.history.length)" class="text-xs text-primary-600 mt-1">Show all {{ s.history.length }}</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class StudentFeesComponent implements OnInit {
  private fees = inject(FeesService);
  private transport = inject(TransportService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  student = input.required<Student>();

  readonly canCollect = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin', 'Accountant');
  readonly canDiscount = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');
  readonly canManageTransport = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');
  readonly methods = PAYMENT_METHODS;

  st = signal<FeeStatement | null>(null);
  loading = signal(false);
  error = signal('');
  busy = signal(false);
  action = signal<Action>(null);
  actionError = signal('');
  editingRoute = signal(false);
  routes = signal<TransportRoute[]>([]);
  historyLimit = signal(6);

  showPaid = true;
  showUpcoming = true;
  openFrom = localIsoDate();
  openWithAdmission = false;
  form = { amount: 0, method: 'Cash', reference: '', reason: '', description: '', dueDate: localIsoDate() };
  routeForm = { routeId: '', pickupPoint: '' };

  categoryLabel = feeCategoryLabel;
  statusClass = feeStatusClass;
  statusLabel = feeStatusLabel;
  historyLabel = (k: string) => HISTORY_LABELS[k] ?? k;

  constructor() {
    // Removing, restoring or moving the student changes their fees on the server (billing
    // stops or resumes, upcoming exam fees are re-priced). That happens just after the change,
    // in the background, so reload a moment later.
    let last: string | null = null;
    effect((onCleanup) => {
      const s = this.student();
      const key = `${s.status}|${s.classId}`;
      if (last !== null && key !== last) {
        const timer = setTimeout(() => untracked(() => this.load()), 1500);
        onCleanup(() => clearTimeout(timer));
      }
      last = key;
    });
  }

  ngOnInit(): void { this.load(); }

  visibleEntries(): FeeEntry[] {
    return (this.st()?.entries ?? []).filter((e) => (this.showPaid || e.status !== 'Paid') && (this.showUpcoming || e.isDue || e.status === 'Paid'));
  }

  isActive(e: FeeEntry): boolean {
    const a = this.action();
    return !!a && a.kind !== 'charge' && a.entry.id === e.id;
  }

  load(): void {
    this.loading.set(!this.st()); this.error.set('');
    this.fees.statement(this.student().id).subscribe({
      next: (s) => { this.st.set(s); this.loading.set(false); },
      error: (err) => { this.error.set(apiError(err, 'Failed to load fees.')); this.loading.set(false); },
    });
  }

  openPay(e: FeeEntry): void {
    this.form = { ...this.form, amount: e.pending, reference: '', method: 'Cash' };
    this.actionError.set(''); this.action.set({ kind: 'pay', entry: e });
  }

  openDiscount(e: FeeEntry): void {
    this.form = { ...this.form, amount: 0, reason: '' };
    this.actionError.set(''); this.action.set({ kind: 'discount', entry: e });
  }

  openCharge(): void {
    this.form = { ...this.form, amount: 0, description: '', dueDate: localIsoDate() };
    this.actionError.set(''); this.action.set({ kind: 'charge' });
  }

  submit(): void {
    const a = this.action();
    if (!a) return;
    const amount = Number(this.form.amount);
    if (!amount || amount <= 0) { this.actionError.set('Enter an amount above zero.'); return; }
    const sid = this.student().id;

    if (a.kind === 'charge') {
      if (!this.form.description.trim()) { this.actionError.set('Say what the charge is for.'); return; }
      this.run(this.fees.addAdHocDue(sid, {
        classId: this.student().classId ?? '', amount, periodLabel: this.form.description.trim(), description: this.form.description.trim(),
        dueDate: this.form.dueDate ? `${this.form.dueDate}T00:00:00` : undefined,
      }), 'Charge added.');
      return;
    }
    if (amount > a.entry.pending + 0.001) { this.actionError.set(`That's more than the ₹${a.entry.pending} still owed on this fee.`); return; }
    if (a.kind === 'pay') {
      this.run(this.fees.pay({ studentId: sid, feePaymentId: a.entry.id, amount, paymentMethod: this.form.method, gatewayReference: this.form.reference.trim() || undefined }),
        amount < a.entry.pending ? 'Part payment recorded. Receipt is ready below.' : 'Payment recorded. Receipt is ready below.');
    } else {
      if (this.form.reason.trim().length < 3) { this.actionError.set('Give a reason for the discount.'); return; }
      this.run(this.fees.concession(a.entry.id, amount, this.form.reason.trim()), 'Discount applied.');
    }
  }

  private run(call: Observable<unknown>, ok: string): void {
    this.busy.set(true); this.actionError.set('');
    call.subscribe({
      next: () => { this.busy.set(false); this.action.set(null); this.toast.success(ok); this.load(); },
      error: (err) => { this.busy.set(false); this.actionError.set(apiError(err, 'Could not save.')); },
    });
  }

  generate(): void {
    this.busy.set(true);
    this.fees.generate(this.student().id).subscribe({
      next: (r) => { this.busy.set(false); this.toast.success(r.feesCreated ? `Created ${r.feesCreated} fee${r.feesCreated === 1 ? '' : 's'}.` : 'Already up to date.'); this.load(); },
      error: (err) => { this.busy.set(false); this.toast.error(apiError(err, 'Could not update the fees.')); },
    });
  }

  openAccount(): void {
    this.busy.set(true);
    this.fees.openAccount(this.student().id, { billingStartDate: this.openFrom ? `${this.openFrom}T00:00:00` : null, chargeAdmissionFee: this.openWithAdmission }).subscribe({
      next: (b) => { this.busy.set(false); this.toast.success(`Fee account started: ${b.lines.length} fee${b.lines.length === 1 ? '' : 's'} created.`); this.load(); },
      error: (err) => { this.busy.set(false); this.toast.error(apiError(err, 'Could not start the fee account.')); },
    });
  }

  startRouteEdit(): void {
    const t = this.st()?.transport;
    this.routeForm = { routeId: t?.routeId ?? '', pickupPoint: t?.pickupPoint ?? '' };
    this.editingRoute.set(true);
    this.transport.listRoutes().subscribe({
      next: (list) => this.routes.set((list ?? []).filter((r) => r.isActive !== false || r.id === t?.routeId)),
      error: () => this.routes.set([]),
    });
  }

  saveRoute(): void {
    this.busy.set(true);
    this.transport.mapStudentToRoute({ studentId: this.student().id, routeId: this.routeForm.routeId, pickupPoint: this.routeForm.pickupPoint.trim() || undefined }).subscribe({
      next: () => { this.busy.set(false); this.editingRoute.set(false); this.toast.success('Route saved. The new charge applies from the next transport fee.'); this.load(); },
      error: (err) => { this.busy.set(false); this.toast.error(apiError(err, 'Could not change the route.')); },
    });
  }

  stopTransport(): void {
    if (!confirm('Stop school transport for this student? No more transport fees will be created; fees already created stay.')) return;
    this.busy.set(true);
    this.transport.stopTransport(this.student().id).subscribe({
      next: () => { this.busy.set(false); this.toast.success('Transport stopped.'); this.load(); },
      error: (err) => { this.busy.set(false); this.toast.error(apiError(err, 'Could not stop transport.')); },
    });
  }

  downloadReceipt(transactionId: string): void {
    this.fees.receipt(transactionId).subscribe({ next: (link) => openDownload(link?.downloadUrl), error: (err) => this.toast.error(apiError(err, 'Could not get the receipt.')) });
  }
}
