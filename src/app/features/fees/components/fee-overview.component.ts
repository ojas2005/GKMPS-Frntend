import { Component, OnInit, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeesService, FeeOverview, MonthlyCollection } from '../fees.service';
import { AuthService } from '../../../core/auth/auth.service';
import { ACADEMIC_YEAR_CHOICES, CURRENT_ACADEMIC_YEAR } from '../../../core/constants/classes';
import { THEMED_FIELDS } from '../../../shared/forms';
import { apiError, feeCategoryLabel, localIsoDate } from '../fee-ui';

/** Fee dashboard: what's been collected, what's owed, by category and month by month. */
@Component({
  selector: 'app-fee-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, ...THEMED_FIELDS],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap items-center gap-3">
        <label class="text-sm text-neutral-600" for="fo-year">Session</label>
        <select id="fo-year" [(ngModel)]="year" (ngModelChange)="load()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option *ngFor="let y of years" [value]="y">{{ y }}</option>
        </select>
        <button *ngIf="canBill" (click)="runBilling()" [disabled]="billing()"
          class="ml-auto px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50 disabled:opacity-60">
          {{ billing() ? 'Updating…' : 'Generate due fees now' }}
        </button>
      </div>
      <p *ngIf="billingMsg()" class="text-sm text-neutral-600" role="status">{{ billingMsg() }}</p>

      <!-- Students who were admitted before automatic billing -->
      <div *ngIf="o()?.currentStudentsWithoutAccount && canOpenAccounts" class="rounded-xl border border-warning-200 bg-warning-50 p-4 flex flex-wrap items-center gap-3">
        <div class="flex-1 min-w-[16rem] text-sm text-warning-700">
          <p class="font-semibold">{{ o()!.currentStudentsWithoutAccount }} current student{{ o()!.currentStudentsWithoutAccount === 1 ? '' : 's' }} without a fee account</p>
          <p class="text-xs mt-0.5">They were admitted before automatic billing. Start their accounts to bill monthly tuition, transport and exam fees from the date below (no admission fee).</p>
        </div>
        <input type="date" [(ngModel)]="openFrom" aria-label="Start billing from" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
        <button (click)="openAll()" [disabled]="opening()" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
          {{ opening() ? 'Starting…' : 'Start fee accounts' }}
        </button>
      </div>

      <div *ngIf="error()" class="p-4 rounded-xl border border-error-200 bg-error-50 text-error-700 text-sm">{{ error() }}</div>

      <!-- Headline numbers -->
      <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div *ngFor="let k of kpis()" class="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <p class="text-xs text-neutral-500">{{ k.label }}</p>
          <p class="text-xl font-bold mt-1" [class]="k.tone">{{ loading() ? '…' : (k.value | currency:'INR':'symbol':'1.0-0') }}</p>
          <p *ngIf="k.hint" class="text-[11px] text-neutral-500 mt-1">{{ k.hint }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        <!-- By category -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div class="px-5 py-4 border-b border-neutral-200">
            <h3 class="font-semibold text-neutral-900">By fee type — {{ year }}</h3>
            <p class="text-xs text-neutral-500">Billed counts fees already due; upcoming fees are created but not due yet.</p>
          </div>
          <div class="overflow-x-auto">
          <table class="w-full text-sm min-w-[36rem]">
            <thead class="bg-neutral-50 text-neutral-600 text-left">
              <tr><th class="px-5 py-2 font-medium">Fee type</th><th class="px-3 py-2 font-medium text-right">Billed</th><th class="px-3 py-2 font-medium text-right">Collected</th><th class="px-3 py-2 font-medium text-right">Discounts</th><th class="px-3 py-2 font-medium text-right">Pending</th><th class="px-5 py-2 font-medium text-right">Upcoming</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of o()?.byCategory ?? []" class="border-t border-neutral-100">
                <td class="px-5 py-2.5 text-neutral-900">{{ categoryLabel(c.category) }}</td>
                <td class="px-3 py-2.5 text-right text-neutral-700">{{ c.billed | currency:'INR':'symbol':'1.0-0' }}</td>
                <td class="px-3 py-2.5 text-right text-success-700">{{ c.paid | currency:'INR':'symbol':'1.0-0' }}</td>
                <td class="px-3 py-2.5 text-right text-neutral-600">{{ c.discount | currency:'INR':'symbol':'1.0-0' }}</td>
                <td class="px-3 py-2.5 text-right font-medium" [class]="c.pendingDue > 0 ? 'text-error-600' : 'text-neutral-500'">{{ c.pendingDue | currency:'INR':'symbol':'1.0-0' }}</td>
                <td class="px-5 py-2.5 text-right text-neutral-600">{{ c.upcoming | currency:'INR':'symbol':'1.0-0' }}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <!-- Month by month -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div class="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-neutral-900">Monthly collection — {{ year }}</h3>
              <p class="text-xs text-neutral-500">Fees falling due each month against money received that month.</p>
            </div>
            <div class="flex items-center gap-3 text-[11px] text-neutral-500">
              <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-neutral-400"></span>Billed</span>
              <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-sm bg-primary-600"></span>Collected</span>
            </div>
          </div>
          <div class="px-5 py-3 space-y-2">
            <div *ngFor="let m of months()" class="grid grid-cols-[6.5rem_1fr_6rem] items-center gap-3 text-xs">
              <span class="text-neutral-600">{{ m.label }}</span>
              <div class="space-y-1">
                <div class="h-2 rounded bg-neutral-100 overflow-hidden"><div class="h-full bg-neutral-400" [style.width.%]="pct(m.billed)"></div></div>
                <div class="h-2 rounded bg-neutral-100 overflow-hidden"><div class="h-full bg-primary-600" [style.width.%]="pct(m.collected)"></div></div>
              </div>
              <span class="text-right text-neutral-900 tabular-nums">{{ m.collected | currency:'INR':'symbol':'1.0-0' }}</span>
            </div>
          </div>
          <div class="px-5 py-3 border-t border-neutral-200 text-sm flex justify-between">
            <span class="text-neutral-600">Session total</span>
            <span class="font-semibold text-neutral-900">{{ monthsCollected() | currency:'INR':'symbol':'1.0-0' }} collected of {{ monthsBilled() | currency:'INR':'symbol':'1.0-0' }} billed</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FeeOverviewComponent implements OnInit {
  private fees = inject(FeesService);
  private auth = inject(AuthService);

  /** Raised after accounts were opened or fees generated, so other tabs can refresh. */
  changed = output<void>();

  readonly years = ACADEMIC_YEAR_CHOICES;
  readonly canBill = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin', 'Accountant');
  readonly canOpenAccounts = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');
  year = CURRENT_ACADEMIC_YEAR;
  openFrom = localIsoDate();

  o = signal<FeeOverview | null>(null);
  months = signal<MonthlyCollection[]>([]);
  loading = signal(false);
  error = signal('');
  billing = signal(false);
  billingMsg = signal('');
  opening = signal(false);

  monthsCollected = computed(() => this.months().reduce((s, m) => s + m.collected, 0));
  monthsBilled = computed(() => this.months().reduce((s, m) => s + m.billed, 0));
  private maxMonth = computed(() => Math.max(1, ...this.months().map((m) => Math.max(m.billed, m.collected))));

  kpis = computed(() => {
    const o = this.o();
    return [
      { label: `Collected in ${this.year}`, value: o?.collectedThisSession ?? 0, tone: 'text-neutral-900', hint: '' },
      { label: 'Collected this month', value: o?.collectedThisMonth ?? 0, tone: 'text-neutral-900', hint: '' },
      { label: 'Collected today', value: o?.collectedToday ?? 0, tone: 'text-neutral-900', hint: '' },
      { label: 'Pending (due now)', value: o?.pendingDue ?? 0, tone: (o?.pendingDue ?? 0) > 0 ? 'text-error-600' : 'text-success-600', hint: 'All sessions' },
      { label: 'Upcoming', value: o?.upcoming ?? 0, tone: 'text-neutral-900', hint: 'Created, not due yet' },
      { label: `Discounts in ${this.year}`, value: o?.discounts ?? 0, tone: 'text-neutral-900', hint: '' },
    ];
  });

  categoryLabel = feeCategoryLabel;
  pct = (v: number) => Math.round((v / this.maxMonth()) * 100);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.fees.overview(this.year).subscribe({
      next: (o) => { this.o.set(o); this.loading.set(false); },
      error: (err) => { this.error.set(apiError(err, 'Failed to load the fee overview.')); this.loading.set(false); },
    });
    this.fees.monthlyCollections(this.year).subscribe({ next: (m) => this.months.set(m ?? []), error: () => this.months.set([]) });
  }

  runBilling(): void {
    this.billing.set(true); this.billingMsg.set('');
    this.fees.generate().subscribe({
      next: (r) => {
        this.billing.set(false);
        this.billingMsg.set(r.feesCreated ? `Created ${r.feesCreated} fee${r.feesCreated === 1 ? '' : 's'} across ${r.accountsChecked} accounts.` : 'All fee accounts are up to date.');
        this.load(); this.changed.emit();
      },
      error: (err) => { this.billing.set(false); this.billingMsg.set(apiError(err, 'Could not generate fees.')); },
    });
  }

  openAll(): void {
    this.opening.set(true); this.billingMsg.set('');
    this.fees.openAllAccounts({ billingStartDate: this.openFrom ? `${this.openFrom}T00:00:00` : null }).subscribe({
      next: (r) => {
        this.opening.set(false);
        this.billingMsg.set(`Started ${r.opened} fee account${r.opened === 1 ? '' : 's'} (${r.feesCreated} fees created).`);
        this.load(); this.changed.emit();
      },
      error: (err) => { this.opening.set(false); this.billingMsg.set(apiError(err, 'Could not start the fee accounts.')); },
    });
  }
}
