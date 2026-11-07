import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeesService, ClassFeeRate, FeeSchedule } from '../fees.service';
import { TransportService, TransportRoute } from '../../transport/transport.service';
import { AuthService } from '../../../core/auth/auth.service';
import { THEMED_FIELDS } from '../../../shared/forms';
import { ToastService } from '../../../core/services/toast.service';
import { apiError, MONTH_NAMES } from '../fee-ui';

type StructureTab = 'tuition' | 'admission' | 'exam' | 'transport' | 'schedule';

interface RouteRow extends TransportRoute { draft: { name: string; startPoint: string; endPoint: string; monthlyFee: number; isActive: boolean }; saving?: boolean; }

/**
 * The configurable fee structure. Every amount a student is charged comes from here; changing
 * an amount affects only fees created afterwards, never fees already on students' accounts.
 */
@Component({
  selector: 'app-fee-structure',
  standalone: true,
  imports: [CommonModule, FormsModule, ...THEMED_FIELDS],
  template: `
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2 border-b border-neutral-200" role="tablist" aria-label="Fee structure sections">
        <button *ngFor="let t of tabs" role="tab" [attr.aria-selected]="tab() === t.id" (click)="tab.set(t.id)" [class]="tabClass(t.id)">{{ t.label }}</button>
      </div>

      <p class="text-xs text-neutral-500">
        Amounts are copied onto a student's account when each fee is created. Changing them here affects fees created from now on —
        fees already generated or paid stay as they are.
        <span *ngIf="!canEdit" class="font-medium">You can view the fee structure; the office edits it.</span>
      </p>

      <div *ngIf="error()" class="p-4 rounded-xl border border-error-200 bg-error-50 text-error-700 text-sm">{{ error() }}</div>

      <!-- Class-wise amounts -->
      <div *ngIf="tab() === 'tuition' || tab() === 'admission' || tab() === 'exam'" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div class="px-5 py-4 border-b border-neutral-200">
          <h3 class="font-semibold text-neutral-900">{{ heading() }}</h3>
          <p class="text-xs text-neutral-500">{{ subheading() }}</p>
        </div>
        <div *ngIf="loading()" class="p-5 space-y-3"><div *ngFor="let i of [1,2,3,4,5]" class="skeleton h-10"></div></div>
        <div *ngIf="!loading()" class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-neutral-50 text-neutral-600 text-left">
              <tr>
                <th class="px-5 py-3 font-medium">Class</th>
                <ng-container *ngIf="tab() === 'tuition'"><th class="px-3 py-3 font-medium">Monthly tuition fee (₹)</th></ng-container>
                <ng-container *ngIf="tab() === 'admission'"><th class="px-3 py-3 font-medium">Admission fee (₹, once)</th></ng-container>
                <ng-container *ngIf="tab() === 'exam'">
                  <th class="px-3 py-3 font-medium">Quarterly (₹)</th><th class="px-3 py-3 font-medium">Half-yearly (₹)</th>
                  <th class="px-3 py-3 font-medium">Annual (₹)</th><th class="px-3 py-3 font-medium text-right">Per year</th>
                </ng-container>
                <th class="px-5 py-3 font-medium text-right w-28"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of rates()" class="border-t border-neutral-100">
                <td class="px-5 py-2 font-medium text-neutral-900">{{ r.className }}</td>
                <ng-container *ngIf="tab() === 'tuition'">
                  <td class="px-3 py-2"><input type="number" min="0" step="1" [(ngModel)]="r.monthlyTuition" [disabled]="!canEdit" [attr.aria-label]="r.className + ' monthly tuition fee'" class="w-36 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                </ng-container>
                <ng-container *ngIf="tab() === 'admission'">
                  <td class="px-3 py-2"><input type="number" min="0" step="1" [(ngModel)]="r.admissionFee" [disabled]="!canEdit" [attr.aria-label]="r.className + ' admission fee'" class="w-36 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                </ng-container>
                <ng-container *ngIf="tab() === 'exam'">
                  <td class="px-3 py-2"><input type="number" min="0" step="1" [(ngModel)]="r.quarterlyExamFee" [disabled]="!canEdit" [attr.aria-label]="r.className + ' quarterly exam fee'" class="w-28 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                  <td class="px-3 py-2"><input type="number" min="0" step="1" [(ngModel)]="r.halfYearlyExamFee" [disabled]="!canEdit" [attr.aria-label]="r.className + ' half-yearly exam fee'" class="w-28 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                  <td class="px-3 py-2"><input type="number" min="0" step="1" [(ngModel)]="r.annualExamFee" [disabled]="!canEdit" [attr.aria-label]="r.className + ' annual exam fee'" class="w-28 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                  <td class="px-3 py-2 text-right text-neutral-600">{{ (+r.quarterlyExamFee || 0) + (+r.halfYearlyExamFee || 0) + (+r.annualExamFee || 0) | currency:'INR':'symbol':'1.0-0' }}</td>
                </ng-container>
                <td class="px-5 py-2 text-right text-xs">
                  <span *ngIf="isDirty(r)" class="text-warning-700 font-medium">Unsaved</span>
                  <span *ngIf="!isDirty(r) && tab() === 'admission' && !r.admissionFee" class="text-neutral-500">Not charged</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div *ngIf="canEdit && !loading()" class="px-5 py-3 border-t border-neutral-200 flex items-center gap-3">
          <button (click)="saveRates()" [disabled]="saving() || dirtyCount() === 0" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving…' : dirtyCount() ? 'Save ' + dirtyCount() + ' change' + (dirtyCount() === 1 ? '' : 's') : 'No changes' }}
          </button>
          <button *ngIf="dirtyCount()" (click)="discard()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Discard</button>
        </div>
      </div>

      <!-- Transport routes -->
      <div *ngIf="tab() === 'transport'" class="space-y-4">
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div class="px-5 py-4 border-b border-neutral-200">
            <h3 class="font-semibold text-neutral-900">Transportation routes</h3>
            <p class="text-xs text-neutral-500">Each route's monthly charge is billed to the students on it, alongside tuition. A switched-off route can't be chosen for new students.</p>
          </div>
          <div *ngIf="routesLoading()" class="p-5 space-y-3"><div *ngFor="let i of [1,2,3,4]" class="skeleton h-10"></div></div>
          <div *ngIf="!routesLoading() && routes().length === 0" class="p-8 text-center text-neutral-500">No routes yet.</div>
          <div *ngIf="!routesLoading() && routes().length > 0" class="overflow-x-auto">
            <table class="w-full text-sm min-w-[52rem]">
              <thead class="bg-neutral-50 text-neutral-600 text-left">
                <tr><th class="px-5 py-3 font-medium">Route name</th><th class="px-3 py-3 font-medium">From</th><th class="px-3 py-3 font-medium">To</th>
                  <th class="px-3 py-3 font-medium">Monthly charge (₹)</th><th class="px-3 py-3 font-medium">Students</th><th class="px-3 py-3 font-medium">Active</th><th class="px-5 py-3"></th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of routes()" class="border-t border-neutral-100" [class.opacity-60]="!r.draft.isActive">
                  <td class="px-5 py-2"><input [(ngModel)]="r.draft.name" [disabled]="!canEdit" maxlength="100" [attr.aria-label]="'Name of ' + r.name" class="w-40 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                  <td class="px-3 py-2"><input [(ngModel)]="r.draft.startPoint" [disabled]="!canEdit" maxlength="200" placeholder="Optional" [attr.aria-label]="r.name + ' start point'" class="w-36 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                  <td class="px-3 py-2"><input [(ngModel)]="r.draft.endPoint" [disabled]="!canEdit" maxlength="200" placeholder="Optional" [attr.aria-label]="r.name + ' end point'" class="w-36 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                  <td class="px-3 py-2"><input type="number" min="0" step="1" [(ngModel)]="r.draft.monthlyFee" [disabled]="!canEdit" [attr.aria-label]="r.name + ' monthly charge'" class="w-28 px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"></td>
                  <td class="px-3 py-2 text-neutral-600">{{ r.studentCount ?? 0 }}</td>
                  <td class="px-3 py-2"><input type="checkbox" [(ngModel)]="r.draft.isActive" [disabled]="!canEdit" [attr.aria-label]="r.name + ' active'"></td>
                  <td class="px-5 py-2 text-right">
                    <button *ngIf="canEdit && routeDirty(r)" (click)="saveRoute(r)" [disabled]="r.saving" class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-xs font-medium">
                      {{ r.saving ? 'Saving…' : 'Save' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div *ngIf="canEdit" class="bg-white rounded-xl p-5 shadow-sm border border-neutral-200">
          <h3 class="font-semibold text-neutral-900 mb-3">Add a route</h3>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
            <div><label class="block text-xs text-neutral-500 mb-1" for="nr-name">Route name *</label>
              <input id="nr-name" [(ngModel)]="newRoute.name" maxlength="100" placeholder="Route 11" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"></div>
            <div><label class="block text-xs text-neutral-500 mb-1" for="nr-from">From</label>
              <input id="nr-from" [(ngModel)]="newRoute.startPoint" maxlength="200" placeholder="Optional" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"></div>
            <div><label class="block text-xs text-neutral-500 mb-1" for="nr-to">To</label>
              <input id="nr-to" [(ngModel)]="newRoute.endPoint" maxlength="200" placeholder="Optional" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"></div>
            <div><label class="block text-xs text-neutral-500 mb-1" for="nr-fee">Monthly charge (₹) *</label>
              <input id="nr-fee" type="number" min="0" [(ngModel)]="newRoute.monthlyFee" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"></div>
            <button (click)="addRoute()" [disabled]="addingRoute()" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ addingRoute() ? 'Adding…' : 'Add route' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Due dates -->
      <div *ngIf="tab() === 'schedule'" class="bg-white rounded-xl p-5 shadow-sm border border-neutral-200 space-y-5">
        <div>
          <h3 class="font-semibold text-neutral-900">When fees fall due</h3>
          <p class="text-xs text-neutral-500">Each month's tuition and transport fee is created on the 1st and is due on the day below. A new student's first month is due on the admission date.
            The session runs April to March; exam fees are created at the start of the session (or at admission) and are due on these dates.</p>
        </div>
        <div *ngIf="schedule() as s" class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="sch-day">Monthly fees due on day</label>
            <select id="sch-day" [(ngModel)]="s.monthlyDueDay" [disabled]="!canEdit" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let d of days28" [ngValue]="d">{{ d }} of each month</option>
            </select>
          </div>
          <div></div>
          <ng-container *ngFor="let e of examDueFields">
            <div class="md:col-span-2 grid grid-cols-[10rem_1fr_6rem] items-end gap-3">
              <span class="text-sm text-neutral-900 pb-2">{{ e.label }}</span>
              <div>
                <label class="block text-xs text-neutral-500 mb-1" [for]="'sch-' + e.month">Month</label>
                <select [id]="'sch-' + e.month" [(ngModel)]="s[e.month]" [disabled]="!canEdit" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                  <option *ngFor="let m of sessionMonthOrder" [ngValue]="m">{{ monthNames[m - 1] }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-neutral-500 mb-1" [for]="'sch-' + e.day">Day</label>
                <input [id]="'sch-' + e.day" type="number" min="1" max="31" [(ngModel)]="s[e.day]" [disabled]="!canEdit" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
              </div>
            </div>
          </ng-container>
        </div>
        <button *ngIf="canEdit" (click)="saveSchedule()" [disabled]="saving()" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
          {{ saving() ? 'Saving…' : 'Save due dates' }}
        </button>
      </div>
    </div>
  `,
})
export class FeeStructureComponent implements OnInit {
  private fees = inject(FeesService);
  private transport = inject(TransportService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  readonly canEdit = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');
  readonly tabs: Array<{ id: StructureTab; label: string }> = [
    { id: 'tuition', label: 'Tuition fees' },
    { id: 'admission', label: 'Admission fees' },
    { id: 'exam', label: 'Examination fees' },
    { id: 'transport', label: 'Transportation' },
    { id: 'schedule', label: 'Due dates' },
  ];
  readonly days28 = Array.from({ length: 28 }, (_, i) => i + 1);
  readonly monthNames = MONTH_NAMES;
  readonly sessionMonthOrder = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
  readonly examDueFields: Array<{ label: string; month: keyof FeeSchedule; day: keyof FeeSchedule }> = [
    { label: 'Quarterly exam', month: 'quarterlyExamDueMonth', day: 'quarterlyExamDueDay' },
    { label: 'Half-yearly exam', month: 'halfYearlyExamDueMonth', day: 'halfYearlyExamDueDay' },
    { label: 'Annual exam', month: 'annualExamDueMonth', day: 'annualExamDueDay' },
  ];

  tab = signal<StructureTab>('tuition');
  rates = signal<ClassFeeRate[]>([]);
  private original = new Map<string, string>();
  private version = signal(0); // bumps on edits so dirtyCount recomputes
  routes = signal<RouteRow[]>([]);
  schedule = signal<FeeSchedule | null>(null);
  loading = signal(false);
  routesLoading = signal(false);
  saving = signal(false);
  addingRoute = signal(false);
  error = signal('');
  newRoute = { name: '', startPoint: '', endPoint: '', monthlyFee: 0 };

  heading = computed(() => ({ tuition: 'Monthly tuition fees', admission: 'Admission fees', exam: 'Examination fees' } as Record<string, string>)[this.tab()] ?? '');
  subheading = computed(() => ({
    tuition: "Charged every month according to the student's class.",
    admission: 'Charged once, when the student is admitted. Leave at ₹0 to charge none.',
    exam: 'Charged for each of the three exams in a session. Students admitted after an exam are not charged for it.',
  } as Record<string, string>)[this.tab()] ?? '');

  ngOnInit(): void {
    this.loadRates();
    this.loadRoutes();
    this.fees.schedule().subscribe({ next: (s) => this.schedule.set(s), error: () => {} });
  }

  tabClass(t: StructureTab): string {
    const base = 'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ';
    return base + (this.tab() === t ? 'border-primary-600 text-primary-700' : 'border-transparent text-neutral-500 hover:text-neutral-800');
  }

  private key(r: ClassFeeRate): string {
    return [r.admissionFee, r.monthlyTuition, r.quarterlyExamFee, r.halfYearlyExamFee, r.annualExamFee].map((v) => Number(v) || 0).join('|');
  }

  isDirty(r: ClassFeeRate): boolean { return this.original.get(r.classId) !== this.key(r); }
  dirtyCount(): number { return this.rates().filter((r) => this.isDirty(r)).length; }

  loadRates(): void {
    this.loading.set(true); this.error.set('');
    this.fees.classRates().subscribe({
      next: (list) => {
        const rows = (list ?? []).map((r) => ({ ...r, ...this.round(r) }));
        this.original = new Map(rows.map((r) => [r.classId, this.key(r)]));
        this.rates.set(rows); this.loading.set(false);
      },
      error: (err) => { this.error.set(apiError(err, 'Failed to load the fee structure.')); this.loading.set(false); },
    });
  }

  private round(r: ClassFeeRate) {
    const n = (v: number) => Math.round(Number(v) * 100) / 100;
    return { admissionFee: n(r.admissionFee), monthlyTuition: n(r.monthlyTuition), quarterlyExamFee: n(r.quarterlyExamFee), halfYearlyExamFee: n(r.halfYearlyExamFee), annualExamFee: n(r.annualExamFee) };
  }

  discard(): void { this.loadRates(); }

  saveRates(): void {
    const changed = this.rates().filter((r) => this.isDirty(r));
    const bad = changed.find((r) => [r.admissionFee, r.monthlyTuition, r.quarterlyExamFee, r.halfYearlyExamFee, r.annualExamFee].some((v) => v === null || v === undefined || isNaN(Number(v)) || Number(v) < 0));
    if (bad) { this.error.set(`Check the amounts for ${bad.className}: each must be ₹0 or more.`); return; }
    this.saving.set(true); this.error.set('');
    this.fees.saveClassRates(changed.map((r) => ({ ...r, ...this.round(r) }))).subscribe({
      next: (list) => {
        const rows = (list ?? []).map((r) => ({ ...r, ...this.round(r) }));
        this.original = new Map(rows.map((r) => [r.classId, this.key(r)]));
        this.rates.set(rows); this.saving.set(false);
        this.toast.success(`Saved ${changed.length} class${changed.length === 1 ? '' : 'es'}. New amounts apply to fees created from now on.`);
      },
      error: (err) => { this.saving.set(false); this.error.set(apiError(err, 'Could not save the fee structure.')); },
    });
  }

  loadRoutes(): void {
    this.routesLoading.set(true);
    this.transport.listRoutes().subscribe({
      next: (list) => { this.routes.set((list ?? []).map((r) => this.toRow(r))); this.routesLoading.set(false); },
      error: (err) => { this.error.set(apiError(err, 'Failed to load routes.')); this.routesLoading.set(false); },
    });
  }

  private toRow(r: TransportRoute): RouteRow {
    return { ...r, draft: { name: r.name, startPoint: r.startPoint ?? '', endPoint: r.endPoint ?? '', monthlyFee: Math.round(Number(r.monthlyFee ?? 0) * 100) / 100, isActive: r.isActive !== false } };
  }

  routeDirty(r: RouteRow): boolean {
    const d = r.draft;
    return d.name !== r.name || d.startPoint !== (r.startPoint ?? '') || d.endPoint !== (r.endPoint ?? '')
      || Number(d.monthlyFee) !== Math.round(Number(r.monthlyFee ?? 0) * 100) / 100 || d.isActive !== (r.isActive !== false);
  }

  saveRoute(r: RouteRow): void {
    const d = r.draft;
    if (!d.name.trim()) { this.error.set('A route needs a name.'); return; }
    if (d.monthlyFee === null || Number(d.monthlyFee) < 0) { this.error.set(`The monthly charge for ${d.name} must be ₹0 or more.`); return; }
    r.saving = true; this.error.set('');
    this.transport.updateRoute(r.id, { name: d.name.trim(), startPoint: d.startPoint.trim() || null, endPoint: d.endPoint.trim() || null, monthlyFee: Number(d.monthlyFee), isActive: d.isActive }).subscribe({
      next: (saved) => {
        this.routes.update((rows) => rows.map((x) => (x.id === r.id ? this.toRow(saved) : x)));
        this.toast.success(`${saved.name} saved.${Number(saved.monthlyFee) !== Number(r.monthlyFee) ? ' The new charge applies from the next transport fee.' : ''}`);
      },
      error: (err) => { r.saving = false; this.error.set(apiError(err, 'Could not save the route.')); },
    });
  }

  addRoute(): void {
    const n = this.newRoute;
    if (!n.name.trim() || n.monthlyFee === null || Number(n.monthlyFee) < 0) { this.error.set('A new route needs a name and a monthly charge of ₹0 or more.'); return; }
    this.addingRoute.set(true); this.error.set('');
    this.transport.createRoute({ name: n.name.trim(), startPoint: n.startPoint.trim() || null, endPoint: n.endPoint.trim() || null, monthlyFee: Number(n.monthlyFee) }).subscribe({
      next: (created) => {
        this.addingRoute.set(false);
        this.routes.update((rows) => [...rows, this.toRow(created)]);
        this.newRoute = { name: '', startPoint: '', endPoint: '', monthlyFee: 0 };
        this.toast.success(`${created.name} added.`);
      },
      error: (err) => { this.addingRoute.set(false); this.error.set(apiError(err, 'Could not add the route.')); },
    });
  }

  saveSchedule(): void {
    const s = this.schedule();
    if (!s) return;
    this.saving.set(true); this.error.set('');
    this.fees.saveSchedule({ ...s, quarterlyExamDueDay: Number(s.quarterlyExamDueDay), halfYearlyExamDueDay: Number(s.halfYearlyExamDueDay), annualExamDueDay: Number(s.annualExamDueDay) }).subscribe({
      next: (saved) => { this.schedule.set(saved); this.saving.set(false); this.toast.success('Due dates saved.'); },
      error: (err) => { this.saving.set(false); this.error.set(apiError(err, 'Could not save the due dates.')); },
    });
  }
}
