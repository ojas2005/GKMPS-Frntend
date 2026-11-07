import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService, Student, AdmitStudentForm, AdmittedStudent, RosterStatus, guardianOf, studentStatusLabel } from '../../students.service';
import { FeesService, FeeBreakdown } from '../../../fees/fees.service';
import { TransportService, TransportRoute } from '../../../transport/transport.service';
import { feeCategoryLabel } from '../../../fees/fee-ui';
import { AuthService } from '../../../../core/auth/auth.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, DEFAULT_CLASS, DEFAULT_SECTION, classNameById, sectionNameById } from '../../../../core/constants/classes';
import { THEMED_FIELDS } from '../../../../shared/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ...THEMED_FIELDS],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Students</h1>
          <p class="text-neutral-600 text-sm">Search by name or admission number, click a row for full details &amp; analytics.</p>
        </div>
        <button *ngIf="canAdmit" (click)="toggleForm()"
          class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Admit Student' }}
        </button>
      </div>

      <!-- Shown after a successful admission: the parent's login and the fees put on the account -->
      <div *ngIf="lastAdmission() as a" class="bg-success-50 border border-success-500 rounded-xl p-4 flex items-start justify-between gap-4" role="status">
        <div class="text-sm text-success-700 space-y-1">
          <p class="font-semibold">{{ a.student.fullName }} admitted. Give the parents their login:</p>
          <p>Login ID: <span class="font-mono font-bold">{{ a.parentCredentials.username }}</span>
             &nbsp;·&nbsp; Password: <span class="font-mono font-bold">{{ a.parentCredentials.password }}</span></p>
          <p class="text-xs">They sign in at this site and choose their own password the first time.</p>
          <p class="pt-1">
            <span class="font-semibold">Fee account opened for {{ a.fees.academicYear }}:</span>
            payable now <span class="font-semibold">{{ a.fees.initialPending | currency:'INR':'symbol':'1.0-0' }}</span>
            <ng-container *ngIf="a.fees.upcomingTotal"> · {{ a.fees.upcomingTotal | currency:'INR':'symbol':'1.0-0' }} due later this session</ng-container>
            · {{ a.fees.monthlyTotal | currency:'INR':'symbol':'1.0-0' }} a month{{ a.fees.transport ? ' (incl. ' + a.fees.transport.routeName + ')' : '' }}.
            <a [routerLink]="['/students', a.student.id]" class="underline font-medium">Open the fee statement</a>
          </p>
          <p *ngIf="a.fees.warning" class="text-warning-700 font-medium">{{ a.fees.warning }}</p>
        </div>
        <button (click)="lastAdmission.set(null)" aria-label="Dismiss" class="text-success-700 hover:text-success-900 text-sm">✕</button>
      </div>

      <!-- Search -->
      <div class="flex flex-wrap gap-3">
        <select [(ngModel)]="roster" (ngModelChange)="load()" aria-label="Which students to show"
          class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
          <option value="current">Current students</option>
          <option value="removed">Removed students</option>
          <option value="all">All students (current + removed)</option>
        </select>
        <input [(ngModel)]="keyword" (keyup.enter)="load()" placeholder="Search by name or admission number..." aria-label="Search students"
          class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
        <button (click)="load()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
      </div>

      <!-- Admit form -->
      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-1">Admit New Student</h2>
        <p class="text-xs text-neutral-500 mb-4">Students don't get a login; the parents do, and see attendance, marks and fees. Fields marked * are required.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f1">Student's full name *</label>
            <input id="students-f1" [(ngModel)]="form.fullName" placeholder="Aarav Sharma" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f2">Date of birth *</label>
            <input id="students-f2" [(ngModel)]="form.dateOfBirth" type="date" [max]="today" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f3">Gender *</label>
            <select id="students-f3" [(ngModel)]="form.gender" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f4">Admission number</label>
            <input id="students-f4" [(ngModel)]="form.admissionNumber" placeholder="auto-generated if blank" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f5">Class *</label>
            <select id="students-f5" [(ngModel)]="form.classId" (ngModelChange)="refreshPreview()" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f6">Section *</label>
            <select id="students-f6" [(ngModel)]="form.sectionId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let s of sections" [value]="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs text-neutral-500 mb-1" for="students-f7">Address</label>
            <input id="students-f7" [(ngModel)]="form.address" placeholder="House, street, town" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>

          <div class="md:col-span-2 border-t border-neutral-200 pt-4">
            <p class="text-sm font-medium text-neutral-900">Father's details *</p>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f8">Father's name *</label>
            <input id="students-f8" [(ngModel)]="form.fatherName" autocomplete="off" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f9">Father's mobile number *</label>
            <input id="students-f9" [(ngModel)]="form.fatherPhone" type="tel" inputmode="numeric" placeholder="10-digit mobile" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs text-neutral-500 mb-1" for="students-f10">Father's email</label>
            <input id="students-f10" [(ngModel)]="form.fatherEmail" type="email" placeholder="Optional — admission confirmation is sent here" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>

          <div class="md:col-span-2 border-t border-neutral-200 pt-4">
            <p class="text-sm font-medium text-neutral-900">Mother's details *</p>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f11">Mother's name *</label>
            <input id="students-f11" [(ngModel)]="form.motherName" autocomplete="off" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f12">Mother's mobile number *</label>
            <input id="students-f12" [(ngModel)]="form.motherPhone" type="tel" inputmode="numeric" placeholder="10-digit mobile" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs text-neutral-500 mb-1" for="students-f13">Mother's email</label>
            <input id="students-f13" [(ngModel)]="form.motherEmail" type="email" placeholder="Optional — admission confirmation is sent here" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>

          <div class="md:col-span-2 border-t border-neutral-200 pt-4">
            <p class="text-sm font-medium text-neutral-900">Parent login *</p>
            <p class="text-xs text-neutral-500">One login for the parents to see this student's attendance, results and fees. You choose it here and hand it over; they set their own password at first sign-in.</p>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f14">Parent login ID *</label>
            <input id="students-f14" [(ngModel)]="form.parentUsername" autocomplete="off" placeholder="e.g. aarav2026.parent" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f15">Parent password * (min 10 characters)</label>
            <input id="students-f15" [(ngModel)]="form.parentPassword" autocomplete="new-password" placeholder="e.g. mango river lantern" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>

          <!-- Fee & Transportation Details -->
          <div class="md:col-span-2 border-t border-neutral-200 pt-4">
            <p class="text-sm font-medium text-neutral-900">Fee &amp; Transportation Details</p>
            <p class="text-xs text-neutral-500">Fees come from the fee structure for {{ className(form.classId) }}. Admission opens the student's fee account with the fees below.</p>
          </div>
          <div class="md:col-span-2">
            <span class="block text-xs text-neutral-500 mb-2" id="transport-q">Does this student require transportation? *</span>
            <div class="flex gap-3" role="radiogroup" aria-labelledby="transport-q">
              <label class="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm cursor-pointer"
                [class]="form.needsTransport ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-neutral-300 text-neutral-700'">
                <input type="radio" name="needsTransport" [value]="true" aria-label="Yes, needs transportation" [(ngModel)]="form.needsTransport" (ngModelChange)="onTransportChange()"> Yes
              </label>
              <label class="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm cursor-pointer"
                [class]="!form.needsTransport ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-neutral-300 text-neutral-700'">
                <input type="radio" name="needsTransport" [value]="false" aria-label="No transportation" [(ngModel)]="form.needsTransport" (ngModelChange)="onTransportChange()"> No
              </label>
            </div>
          </div>
          <ng-container *ngIf="form.needsTransport">
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="students-route">Route *</label>
              <select id="students-route" [(ngModel)]="form.routeId" (ngModelChange)="refreshPreview()" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
                <option value="" disabled>Select a route</option>
                <option *ngFor="let r of activeRoutes()" [value]="r.id">{{ r.name }} — {{ (r.monthlyFee ?? 0) | currency:'INR':'symbol':'1.0-0' }}/month</option>
              </select>
              <p *ngIf="!activeRoutes().length" class="text-xs text-warning-700 mt-1">No active routes. Add one under Fees → Fee structure → Transportation.</p>
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="students-pickup">Pickup point</label>
              <input id="students-pickup" [(ngModel)]="form.pickupPoint" maxlength="200" placeholder="e.g. Gandhi Chowk" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
          </ng-container>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="students-f16">Previous dues (₹)</label>
            <input id="students-f16" [(ngModel)]="form.previousDues" (ngModelChange)="refreshPreview()" type="number" min="0" placeholder="0 if none" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <p class="text-xs text-neutral-500 mt-1">Anything already owed, e.g. from an earlier school or year.</p>
          </div>

          <!-- Live fee calculation -->
          <div class="md:col-span-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4" aria-live="polite">
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm font-semibold text-neutral-900">Fee summary — {{ className(form.classId) }}{{ preview()?.academicYear ? ', ' + preview()!.academicYear : '' }}</p>
              <span *ngIf="previewLoading()" class="text-xs text-neutral-500">Calculating…</span>
            </div>
            <p *ngIf="previewError()" class="text-sm text-error-600">{{ previewError() }}</p>
            <ng-container *ngIf="preview() as p">
              <table class="w-full text-sm">
                <thead class="text-left text-xs text-neutral-500">
                  <tr><th class="py-1.5 font-medium">Fee type</th><th class="py-1.5 font-medium">When</th><th class="py-1.5 font-medium text-right">Amount</th></tr>
                </thead>
                <tbody>
                  <tr class="border-t border-neutral-200">
                    <td class="py-1.5 text-neutral-900">Admission fee</td><td class="py-1.5 text-neutral-600">Once, at admission</td>
                    <td class="py-1.5 text-right">{{ p.admissionFee ? (p.admissionFee | currency:'INR':'symbol':'1.0-0') : 'Not charged' }}</td>
                  </tr>
                  <tr class="border-t border-neutral-200">
                    <td class="py-1.5 text-neutral-900">Monthly tuition fee</td><td class="py-1.5 text-neutral-600">Every month</td>
                    <td class="py-1.5 text-right">{{ p.monthlyTuition | currency:'INR':'symbol':'1.0-0' }}</td>
                  </tr>
                  <tr *ngFor="let e of p.exams" class="border-t border-neutral-200" [class.text-neutral-400]="!e.charged">
                    <td class="py-1.5" [class.text-neutral-900]="e.charged">{{ e.label }}</td>
                    <td class="py-1.5 text-neutral-600">{{ e.charged ? 'Due ' + (e.dueDate | date:'d MMM yyyy') : 'Already held — not charged' }}</td>
                    <td class="py-1.5 text-right">{{ e.amount | currency:'INR':'symbol':'1.0-0' }}</td>
                  </tr>
                  <tr class="border-t border-neutral-200">
                    <td class="py-1.5 text-neutral-900">Transportation fee</td>
                    <td class="py-1.5 text-neutral-600">{{ p.transport ? p.transport.routeName + ', every month' : (form.needsTransport ? 'Choose a route' : 'Not using transport') }}</td>
                    <td class="py-1.5 text-right">{{ p.transport ? (p.transport.monthlyFee | currency:'INR':'symbol':'1.0-0') : '—' }}</td>
                  </tr>
                  <tr *ngIf="p.previousDues" class="border-t border-neutral-200">
                    <td class="py-1.5 text-neutral-900">Previous dues</td><td class="py-1.5 text-neutral-600">At admission</td>
                    <td class="py-1.5 text-right">{{ p.previousDues | currency:'INR':'symbol':'1.0-0' }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <div class="rounded-lg bg-white border border-neutral-200 p-3">
                  <p class="text-xs text-neutral-500">Payable at admission</p>
                  <p class="text-lg font-bold text-neutral-900">{{ p.initialPending | currency:'INR':'symbol':'1.0-0' }}</p>
                  <p class="text-[11px] text-neutral-500">{{ initialBreakdown(p) }}</p>
                </div>
                <div class="rounded-lg bg-white border border-neutral-200 p-3">
                  <p class="text-xs text-neutral-500">Exam fees this session</p>
                  <p class="text-lg font-bold text-neutral-900">{{ p.examTotal | currency:'INR':'symbol':'1.0-0' }}</p>
                  <p class="text-[11px] text-neutral-500">Each due on its own date, not now</p>
                </div>
                <div class="rounded-lg bg-white border border-neutral-200 p-3">
                  <p class="text-xs text-neutral-500">Every month after this</p>
                  <p class="text-lg font-bold text-neutral-900">{{ p.monthlyTotal | currency:'INR':'symbol':'1.0-0' }}</p>
                  <p class="text-[11px] text-neutral-500">Tuition{{ p.transport ? ' + transport' : '' }}, billed monthly</p>
                </div>
              </div>
              <p *ngIf="p.warning" class="text-xs text-warning-700 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2 mt-3">{{ p.warning }}</p>
            </ng-container>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="admit()" [disabled]="saving()"
            class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Admit' }}
          </button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <!-- List -->
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-5 space-y-3">
          <div *ngFor="let i of [1,2,3,4,5,6]" class="skeleton h-11"></div>
        </div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && students().length === 0" class="p-8 text-center text-neutral-500">
          {{ roster === 'removed' ? 'No removed students.' : canAdmit ? 'No students found. Admit one to get started.' : 'No students found.' }}
        </div>
        <table *ngIf="!loading() && !error() && students().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr>
              <th class="px-6 py-3 font-medium">Name</th>
              <th class="px-6 py-3 font-medium">Class</th>
              <th class="px-6 py-3 font-medium">Admission #</th>
              <th class="px-6 py-3 font-medium">Father</th>
              <th class="px-6 py-3 font-medium">Status</th>
              <th class="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of students()" [routerLink]="['/students', s.id]"
                class="border-t border-neutral-200 hover:bg-neutral-50 cursor-pointer">
              <td class="px-6 py-3 font-medium text-neutral-900">{{ s.fullName }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ className(s.classId) }}{{ s.sectionId ? ' - ' + sectionName(s.sectionId) : '' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ s.admissionNumber || '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ guardian(s) }}</td>
              <td class="px-6 py-3">
                <span class="px-2 py-0.5 rounded-full text-xs font-medium"
                  [class]="s.status === 'Active' || !s.status ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-600'">
                  {{ statusLabel(s.status) }}
                </span>
              </td>
              <td class="px-6 py-3 text-primary-600 text-right text-xs font-medium">View details →</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class StudentsComponent implements OnInit, OnDestroy {
  private service = inject(StudentsService);
  private feesService = inject(FeesService);
  private transport = inject(TransportService);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);

  // Admission is an office action (the API rejects teachers).
  readonly canAdmit = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');

  students = signal<Student[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  lastAdmission = signal<AdmittedStudent | null>(null);
  keyword = '';
  roster: RosterStatus = 'current';

  readonly today = localIsoDate(new Date());
  preview = signal<FeeBreakdown | null>(null);
  previewLoading = signal(false);
  previewError = signal('');
  activeRoutes = signal<TransportRoute[]>([]);
  private previewTimer: ReturnType<typeof setTimeout> | null = null;
  private previewSeq = 0;
  guardian = guardianOf;
  statusLabel = studentStatusLabel;

  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;

  private blankForm(): AdmitStudentForm {
    return { fullName: '', dateOfBirth: '', gender: 'Male', classId: DEFAULT_CLASS.id, sectionId: DEFAULT_SECTION.id,
      admissionNumber: '', address: '',
      fatherName: '', fatherPhone: '', fatherEmail: '', motherName: '', motherPhone: '', motherEmail: '',
      parentUsername: '', parentPassword: '', previousDues: 0, needsTransport: false, routeId: '', pickupPoint: '' };
  }

  form: AdmitStudentForm = this.blankForm();

  ngOnInit(): void {
    // ?q= comes from the top bar's search box; re-running on every change means a second
    // search from the top bar refreshes this list instead of doing nothing.
    this.route.queryParamMap.subscribe((params) => {
      this.keyword = params.get('q') ?? '';
      this.load();
    });
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.service.list({ keyword: this.keyword, status: this.roster }).subscribe({
      next: (page) => {
        this.students.set(page?.items ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, 'Failed to load students.'));
        this.loading.set(false);
      },
    });
  }

  ngOnDestroy(): void { if (this.previewTimer) clearTimeout(this.previewTimer); }

  /** Recalculates the fee summary for the chosen class, route and previous dues (debounced). */
  refreshPreview(): void {
    this.formError.set(''); // a stale "choose a route" etc. shouldn't outlive the change that fixed it
    if (this.previewTimer) clearTimeout(this.previewTimer);
    this.previewTimer = setTimeout(() => this.loadPreview(), 250);
  }

  private loadPreview(): void {
    const seq = ++this.previewSeq;
    const routeId = this.form.needsTransport ? this.form.routeId || null : null;
    this.previewLoading.set(true); this.previewError.set('');
    this.feesService.preview(this.form.classId, routeId, Number(this.form.previousDues) || null).subscribe({
      next: (p) => { if (seq !== this.previewSeq) return; this.preview.set(p); this.previewLoading.set(false); },
      error: (err) => {
        if (seq !== this.previewSeq) return;
        this.preview.set(null); this.previewLoading.set(false);
        this.previewError.set(this.msg(err, "Couldn't work out the fees for this class."));
      },
    });
  }

  onTransportChange(): void {
    if (!this.form.needsTransport) { this.form.routeId = ''; this.form.pickupPoint = ''; }
    this.refreshPreview();
  }

  /** "Admission ₹2,000 + November ₹600 + transport ₹700" for the payable-now box. */
  initialBreakdown(p: FeeBreakdown): string {
    const parts = p.lines.filter((l) => l.dueNow).map((l) => `${feeCategoryLabel(l.category)} ₹${Math.round(l.amount).toLocaleString('en-IN')}`);
    return parts.length ? parts.join(' + ') : 'Nothing due now';
  }

  private loadRoutes(): void {
    this.transport.listRoutes().subscribe({
      next: (list) => this.activeRoutes.set((list ?? []).filter((r) => r.isActive !== false)),
      error: () => this.activeRoutes.set([]),
    });
  }

  toggleForm(): void {
    this.showForm.set(!this.showForm());
    if (this.showForm()) { this.loadRoutes(); this.refreshPreview(); }
  }

  admit(): void {
    const f = this.form;
    const missing = [
      [f.fullName, "student's name"], [f.dateOfBirth, 'date of birth'], [f.classId, 'class'], [f.sectionId, 'section'],
      [f.fatherName, "father's name"], [f.fatherPhone, "father's mobile number"],
      [f.motherName, "mother's name"], [f.motherPhone, "mother's mobile number"],
      [f.parentUsername, 'parent login ID'],
    ].filter(([v]) => !String(v ?? '').trim()).map(([, label]) => label);
    if (missing.length) {
      this.formError.set(`Please fill in: ${missing.join(', ')}.`);
      return;
    }
    const badPhone = [[f.fatherPhone, "Father's"], [f.motherPhone, "Mother's"]].find(([p]) => !isMobile(p));
    if (badPhone) {
      this.formError.set(`${badPhone[1]} mobile number must be 10 digits.`);
      return;
    }
    if (f.needsTransport && !f.routeId) {
      this.formError.set('Choose the transport route, or answer "No" to transportation.');
      return;
    }
    if ((f.parentPassword ?? '').length < 10) {
      this.formError.set('The parent login needs a password of at least 10 characters.');
      return;
    }
    this.saving.set(true);
    this.formError.set('');
    this.service.admitWithAccount(this.form).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.showForm.set(false);
        this.lastAdmission.set(res);
        this.form = this.blankForm();
        this.preview.set(null);
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, 'Could not admit student.'));
      },
    });
  }

  private msg(err: any, fallback: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fallback;
  }
}

/** A 10-digit Indian mobile number, allowing spaces, dashes and +91 / 0 in front. */
function isMobile(value: string | undefined): boolean {
  let digits = (value ?? '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits);
}

function localIsoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
