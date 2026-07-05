import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService, Student } from '../../students.service';
import { AttendanceService } from '../../../attendance/attendance.service';
import { FeesService, FeePayment, PaymentTransactionSummary } from '../../../fees/fees.service';
import { ExaminationService, StudentResult } from '../../../examination/examination.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { UsersService } from '../../../../core/services/users.service';
import { ToastService } from '../../../../core/services/toast.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, classNameById, sectionNameById } from '../../../../core/constants/classes';

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
            <div *ngIf="canManageAccount()">
              <span class="text-neutral-500 block text-xs">Login ID</span>
              <span class="font-mono">{{ loginId() || '—' }}</span>
            </div>
          </div>

          <!-- New credentials just set (password reset or first look). Password is only ever
               shown here, right after being typed/set -- never retrieved from storage. -->
          <div *ngIf="justSetPassword()" class="mt-4 bg-success-50 border border-success-500 rounded-xl p-4 text-sm text-success-800">
            <p class="font-semibold mb-1">Password updated — hand these to the student:</p>
            <p>Login ID: <span class="font-mono font-bold">{{ loginId() }}</span>
               &nbsp;·&nbsp; Password: <span class="font-mono font-bold">{{ justSetPassword() }}</span></p>
          </div>

          <!-- Edit details (Admin/Principal/SuperAdmin only) -->
          <div *ngIf="canManageAccount()" class="mt-4 pt-4 border-t border-neutral-200">
            <button *ngIf="!showEditForm()" (click)="startEdit(s)" type="button"
              class="text-primary-600 hover:text-primary-700 text-sm font-medium">Edit details</button>
            <div *ngIf="showEditForm()" class="reveal-panel">
              <h3 class="text-sm font-semibold text-neutral-900 mb-1">Edit student details</h3>
              <p class="text-xs text-neutral-500 mb-3">Everything collected at admission. Login ID and password aren't changed here — use "Reset login password" below for that.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Full name *</label>
                  <input [(ngModel)]="editForm.fullName" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Admission number *</label>
                  <input [(ngModel)]="editForm.admissionNumber" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Date of birth *</label>
                  <input [(ngModel)]="editForm.dateOfBirth" type="date" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Gender *</label>
                  <select [(ngModel)]="editForm.gender" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Class *</label>
                  <select [(ngModel)]="editForm.classId" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Section *</label>
                  <select [(ngModel)]="editForm.sectionId" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option *ngFor="let sec of sections" [value]="sec.id">Section {{ sec.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Guardian name</label>
                  <input [(ngModel)]="editForm.parentName" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Guardian phone</label>
                  <input [(ngModel)]="editForm.parentPhone" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Guardian email</label>
                  <input [(ngModel)]="editForm.parentEmail" type="email" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Address</label>
                  <input [(ngModel)]="editForm.address" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
              </div>
              <div class="mt-3 flex items-center gap-3">
                <button (click)="saveEdit()" [disabled]="savingEdit()"
                  class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                  {{ savingEdit() ? 'Saving...' : 'Save details' }}
                </button>
                <button (click)="showEditForm.set(false); editMsg.set('')" type="button" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Cancel</button>
                <span *ngIf="editMsg()" class="text-sm" [class]="editOk() ? 'text-success-600' : 'text-error-600'">{{ editMsg() }}</span>
              </div>

              <!-- Password reset stays available -- it's a distinct, Identity.API-owned
                   action (login credentials), not part of this admission-details record. -->
              <div class="mt-4 pt-4 border-t border-neutral-100">
                <button *ngIf="!showPasswordForm()" (click)="showPasswordForm.set(true)" type="button"
                  class="text-primary-600 hover:text-primary-700 text-xs font-medium">Reset login password</button>
                <div *ngIf="showPasswordForm()" class="reveal-panel">
                  <h4 class="text-xs font-semibold text-neutral-900 mb-1">Reset login password</h4>
                  <p class="text-xs text-neutral-500 mb-3">An existing password can never be shown again once set (it's stored one-way hashed, same as everywhere else) — set a new one here and it'll be displayed once, right above, so you can hand it over. This signs the student out everywhere.</p>
                  <div class="flex flex-wrap items-end gap-3">
                    <div>
                      <label class="block text-xs text-neutral-500 mb-1">New password (min 8 chars) *</label>
                      <input [(ngModel)]="newPassword" type="text" placeholder="e.g. Student@456" class="w-56 px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                    </div>
                    <button (click)="resetPassword(s)" [disabled]="settingPassword()"
                      class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                      {{ settingPassword() ? 'Saving...' : 'Set password' }}
                    </button>
                    <button (click)="showPasswordForm.set(false); newPassword = ''; passwordMsg.set('')" type="button" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Cancel</button>
                    <span *ngIf="passwordMsg() && !passwordOk()" class="text-sm text-error-600">{{ passwordMsg() }}</span>
                  </div>
                </div>
              </div>
            </div>
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

            <!-- One payment form. The "What is this payment for?" selector is the whole
                 point: choosing an outstanding due routes to pay() and REDUCES its pending;
                 "Other / new charge" routes to submitPayment() and logs a fresh fee. It
                 defaults to the outstanding due, so the common case moves pending as
                 expected -- no separate "log a fee" path to reach for by mistake. -->
            <div *ngIf="canSubmitFees()" class="mt-5 pt-4 border-t border-neutral-200">
              <h3 class="text-sm font-semibold text-neutral-900 mb-3">Record a payment</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="md:col-span-2">
                  <label class="block text-xs text-neutral-500 mb-1">What is this payment for? *</label>
                  <select [(ngModel)]="payForm.target" (ngModelChange)="onTargetChange()" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option *ngFor="let d of outstandingDues()" [ngValue]="d.id">
                      {{ d['feeStructureName'] || d['description'] || 'Fee' }} — ₹{{ pending(d) }} pending
                    </option>
                    <option [ngValue]="'new'">Other / a new charge not listed above</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Amount (₹) *</label>
                  <input [(ngModel)]="payForm.amount" type="number" min="0.01" [max]="selectedDuePending()" placeholder="5000" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                  <p *ngIf="payForm.target !== 'new' && selectedDuePending() !== null" class="text-xs text-neutral-400 mt-1">Up to ₹{{ selectedDuePending() }} outstanding on this fee.</p>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Payment method</label>
                  <select [(ngModel)]="payForm.paymentMethod" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option>Cash</option><option>Card</option><option>UPI</option><option>BankTransfer</option>
                  </select>
                </div>

                <!-- A new charge needs its own description + period; paying an existing due does not. -->
                <ng-container *ngIf="payForm.target === 'new'">
                  <div class="md:col-span-2">
                    <label class="block text-xs text-neutral-500 mb-1">Description *</label>
                    <input [(ngModel)]="payForm.description" placeholder="e.g. Tuition fee, exam fee" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-xs text-neutral-500 mb-1">Fee duration *</label>
                    <div class="flex items-center gap-1.5">
                      <select [(ngModel)]="payForm.startMonth" class="px-2 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                        <option *ngFor="let m of months" [ngValue]="m.value">{{ m.label }}</option>
                      </select>
                      <select [(ngModel)]="payForm.startYear" class="px-2 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                        <option *ngFor="let y of years" [ngValue]="y">{{ y }}</option>
                      </select>
                      <span class="text-neutral-400 text-xs">to</span>
                      <select [(ngModel)]="payForm.endMonth" class="px-2 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                        <option *ngFor="let m of months" [ngValue]="m.value">{{ m.label }}</option>
                      </select>
                      <select [(ngModel)]="payForm.endYear" class="px-2 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                        <option *ngFor="let y of years" [ngValue]="y">{{ y }}</option>
                      </select>
                    </div>
                  </div>
                </ng-container>
              </div>
              <div class="mt-3 flex items-center gap-3">
                <button (click)="recordPayment()" [disabled]="paying()"
                  class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                  {{ paying() ? 'Saving...' : 'Record payment' }}
                </button>
                <span *ngIf="payMsg()" class="text-sm" [class]="payOk() ? 'text-success-600' : 'text-error-600'">{{ payMsg() }}</span>
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
  private usersService = inject(UsersService);
  private toast = inject(ToastService);

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
  months = [
    { value: 1, label: 'Jan' }, { value: 2, label: 'Feb' }, { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' }, { value: 5, label: 'May' }, { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' }, { value: 8, label: 'Aug' }, { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' }, { value: 11, label: 'Nov' }, { value: 12, label: 'Dec' },
  ];
  years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 1 + i);

  // One form for every payment. `target` is either a FeePayment.id (pay down that due) or
  // 'new' (log a brand-new charge). Defaults to the outstanding due in syncPaymentTarget().
  payForm = {
    target: '' as string,
    amount: 0,
    description: '',
    startMonth: new Date().getMonth() + 1, startYear: new Date().getFullYear(),
    endMonth: new Date().getMonth() + 1, endYear: new Date().getFullYear(),
    paymentMethod: 'Cash',
  };
  paying = signal(false);
  payMsg = signal('');
  payOk = signal(false);

  canSubmitFees = (): boolean => this.auth.hasRole('SuperAdmin', 'Principal', 'Admin', 'Accountant');
  canManageAccount = (): boolean => this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');

  // The login ID is fine to display (it's an identifier, not a secret) and is fetched
  // once from Identity.API. The password is the opposite: never retrievable once set
  // (one-way hashed), so this only ever holds a password the owner just typed THIS
  // session, immediately after a successful reset -- never anything read from storage.
  loginId = signal<string | null>(null);
  justSetPassword = signal<string | null>(null);

  showPasswordForm = signal(false);
  newPassword = '';
  settingPassword = signal(false);
  passwordMsg = signal('');
  passwordOk = signal(false);

  showEditForm = signal(false);
  editForm = {
    admissionNumber: '', fullName: '', dateOfBirth: '', gender: '', classId: '', sectionId: '',
    parentName: '', parentEmail: '', parentPhone: '', address: '',
  };
  savingEdit = signal(false);
  editMsg = signal('');
  editOk = signal(false);

  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;

  dob = (s: Student): string | null => (s['dateOfBirthUtc'] as string) || (s['dateOfBirth'] as string) || null;
  total = (f: FeePayment): number => Number(f['totalAmount'] ?? f['amount'] ?? 0);
  paid = (f: FeePayment): number => Number(f['paidAmount'] ?? 0);
  pending = (f: FeePayment): number =>
    Math.max(0, this.total(f) - this.paid(f) - Number(f['waiverAmount'] ?? 0));
  pendingTotal = (): number => this.fees().reduce((sum, f) => sum + this.pending(f), 0);
  outstandingDues = (): FeePayment[] => this.fees().filter((f) => this.pending(f) > 0);
  selectedDue = (): FeePayment | null => this.fees().find((f) => f.id === this.payForm.target) ?? null;
  selectedDuePending = (): number | null => { const d = this.selectedDue(); return d ? this.pending(d) : null; };
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
      next: (s) => {
        this.student.set(s);
        this.loading.set(false);
        if (s.linkedUserId && this.canManageAccount()) {
          this.usersService.get(s.linkedUserId).subscribe({
            next: (u) => this.loginId.set((u['username'] as string) || u.email),
            error: () => {},
          });
        }
      },
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
      next: (list) => { this.fees.set(list ?? []); this.syncPaymentTarget(); },
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

  private monthLabel(month: number, year: number): string {
    return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  private periodLabel(): string {
    const start = this.monthLabel(this.payForm.startMonth, this.payForm.startYear);
    if (this.payForm.startMonth === this.payForm.endMonth && this.payForm.startYear === this.payForm.endYear) {
      return start;
    }
    return `${start} - ${this.monthLabel(this.payForm.endMonth, this.payForm.endYear)}`;
  }

  // Point the form at the first outstanding due (or "new" if everything is settled) and
  // prefill the amount. Called on load and after every payment so the default is always
  // "pay down what's owed".
  private syncPaymentTarget(): void {
    const dues = this.outstandingDues();
    this.payForm.target = dues.length > 0 ? dues[0].id : 'new';
    this.onTargetChange();
  }

  // Selecting a due prefills its full pending amount; "new" clears it for manual entry.
  onTargetChange(): void {
    const d = this.selectedDue();
    this.payForm.amount = d ? this.pending(d) : 0;
    this.payMsg.set('');
  }

  recordPayment(): void {
    const s = this.student();
    if (!s?.classId) { this.payOk.set(false); this.payMsg.set('Student has no class on record.'); return; }
    if (!this.payForm.amount || this.payForm.amount <= 0) {
      this.payOk.set(false); this.payMsg.set('Enter a positive amount.');
      return;
    }

    if (this.payForm.target === 'new') {
      if (!this.payForm.description.trim()) {
        this.payOk.set(false); this.payMsg.set('Add a description for the new charge.');
        return;
      }
      this.paying.set(true); this.payMsg.set('');
      this.feesService.submitPayment(this.id, {
        classId: s.classId,
        amount: this.payForm.amount,
        periodLabel: this.periodLabel(),
        description: this.payForm.description.trim(),
        paymentMethod: this.payForm.paymentMethod,
      }).subscribe({
        next: () => this.afterPayment('New charge recorded and receipt generated.'),
        error: (err) => this.paymentError(err),
      });
      return;
    }

    const due = this.selectedDue();
    if (!due) { this.payOk.set(false); this.payMsg.set('Choose what this payment is for.'); return; }
    const maxPending = this.pending(due);
    if (this.payForm.amount > maxPending) {
      this.payOk.set(false); this.payMsg.set(`That's more than the ₹${maxPending} outstanding on this fee.`);
      return;
    }
    this.paying.set(true); this.payMsg.set('');
    this.feesService.pay({
      studentId: this.id,
      feePaymentId: due.id,
      amount: this.payForm.amount,
      paymentMethod: this.payForm.paymentMethod,
    }).subscribe({
      next: () => this.afterPayment('Payment recorded.'),
      error: (err) => this.paymentError(err),
    });
  }

  private afterPayment(message: string): void {
    this.paying.set(false); this.payOk.set(true); this.payMsg.set(message);
    this.payForm.description = '';
    this.feesService.myPayments(this.id).subscribe({
      next: (list) => { this.fees.set(list ?? []); this.syncPaymentTarget(); },
      error: () => {},
    });
    this.loadTransactions();
  }

  private paymentError(err: any): void {
    this.paying.set(false); this.payOk.set(false); this.payMsg.set(this.msg(err, 'Could not record the payment.'));
  }

  startEdit(s: Student): void {
    this.editForm = {
      admissionNumber: s.admissionNumber ?? '',
      fullName: s.fullName ?? '',
      dateOfBirth: (this.dob(s) ?? '').slice(0, 10),
      gender: (s['gender'] as string) ?? '',
      classId: s.classId ?? '',
      sectionId: s.sectionId ?? '',
      parentName: s['parentName'] as string ?? s.guardianName ?? '',
      parentEmail: s['parentEmail'] as string ?? '',
      parentPhone: s['parentPhone'] as string ?? s.guardianPhone ?? '',
      address: s['address'] as string ?? '',
    };
    this.showEditForm.set(true);
    this.editMsg.set('');
  }

  saveEdit(): void {
    const f = this.editForm;
    if (!f.admissionNumber.trim() || !f.fullName.trim() || !f.dateOfBirth || !f.gender || !f.classId || !f.sectionId) {
      this.editOk.set(false); this.editMsg.set('Admission number, full name, date of birth, gender, class and section are required.');
      return;
    }
    this.savingEdit.set(true); this.editMsg.set('');
    this.studentsService.update(this.id, {
      admissionNumber: f.admissionNumber.trim(),
      fullName: f.fullName.trim(),
      dateOfBirth: f.dateOfBirth,
      gender: f.gender,
      classId: f.classId,
      sectionId: f.sectionId,
      parentName: f.parentName.trim() || undefined,
      parentEmail: f.parentEmail.trim() || undefined,
      parentPhone: f.parentPhone.trim() || undefined,
      address: f.address.trim() || undefined,
    }).subscribe({
      next: (updated) => {
        // The panel closes on success, so surface confirmation as a toast (an
        // inline message here would vanish with the form).
        this.savingEdit.set(false); this.editOk.set(true); this.editMsg.set('');
        this.student.set(updated);
        this.showEditForm.set(false);
        this.toast.success('Student details updated.');
      },
      error: (err) => {
        this.savingEdit.set(false); this.editOk.set(false);
        this.editMsg.set(this.msg(err, 'Could not save details.'));
        this.toast.error('Could not save student details.');
      },
    });
  }

  resetPassword(s: Student): void {
    const linkedUserId = s.linkedUserId;
    if (!linkedUserId) { this.passwordOk.set(false); this.passwordMsg.set('This student has no linked login account.'); return; }
    if (!this.newPassword || this.newPassword.length < 8) {
      this.passwordOk.set(false); this.passwordMsg.set('Password must be at least 8 characters.');
      return;
    }
    this.settingPassword.set(true); this.passwordMsg.set('');
    const justSet = this.newPassword;
    this.usersService.setPassword(linkedUserId, justSet).subscribe({
      next: () => {
        this.settingPassword.set(false); this.passwordOk.set(true);
        this.justSetPassword.set(justSet); // shown in the credentials banner above -- this run only
        this.newPassword = '';
        this.showPasswordForm.set(false);
        this.toast.success('Login password reset. New credentials shown above.');
      },
      error: (err) => { this.settingPassword.set(false); this.passwordOk.set(false); this.passwordMsg.set(this.msg(err, 'Could not update password.')); },
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
