import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeachersService, Staff, Payout, StaffAttendanceRecord, PendingSalary } from '../../teachers.service';
import { UsersService } from '../../../../core/services/users.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, classNameById, sectionNameById } from '../../../../core/constants/classes';

/**
 * Owner/admin view of one staff member: profile, class-teacher assignment,
 * payout ledger (with a record form) and staff attendance (with a mark form).
 */
@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <a routerLink="/teachers" class="text-primary-600 hover:text-primary-700 text-sm">← Teachers &amp; Staff</a>

      <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
      <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>

      <ng-container *ngIf="staff() as s">
        <!-- Profile -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h1 class="text-2xl font-bold text-neutral-900">{{ s.fullName }}</h1>
          <p class="text-neutral-600 text-sm mt-1">
            {{ s.designation }} &nbsp;·&nbsp; {{ s.employeeCode }} &nbsp;·&nbsp; {{ s.status || 'Active' }}
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <div><span class="text-neutral-500 block text-xs">Email</span>{{ s.email || '—' }}</div>
            <div><span class="text-neutral-500 block text-xs">Phone</span>{{ s.phone || '—' }}</div>
            <div><span class="text-neutral-500 block text-xs">Subjects</span>{{ s.subjectsTaughtCsv || '—' }}</div>
            <div>
              <span class="text-neutral-500 block text-xs">Class teacher of</span>
              <span *ngIf="s.classTeacherOfClassId" class="font-medium text-primary-700">
                {{ className(s.classTeacherOfClassId!) }}{{ s.classTeacherOfSectionId ? ' - ' + sectionName(s.classTeacherOfSectionId!) : '' }}
              </span>
              <span *ngIf="!s.classTeacherOfClassId">Not a class teacher</span>
            </div>
          </div>

          <!-- Account / password -->
          <div class="mt-4 pt-4 border-t border-neutral-200">
            <button *ngIf="!showPasswordForm()" (click)="showPasswordForm.set(true)" type="button"
              class="text-primary-600 hover:text-primary-700 text-sm font-medium">Reset login password</button>
            <div *ngIf="showPasswordForm()">
              <h3 class="text-sm font-semibold text-neutral-900 mb-1">Reset login password</h3>
              <p class="text-xs text-neutral-500 mb-3">Passwords are stored hashed and cannot be viewed — set a new one and hand it to the teacher. This signs them out everywhere.</p>
              <div class="flex flex-wrap items-end gap-3">
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">New password (min 10 chars) *</label>
                  <input [(ngModel)]="newPassword" type="text" placeholder="e.g. mango river lantern" class="w-56 px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <button (click)="resetPassword(s)" [disabled]="settingPassword()"
                  class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                  {{ settingPassword() ? 'Saving...' : 'Set password' }}
                </button>
                <button (click)="showPasswordForm.set(false); newPassword = ''; passwordMsg.set('')" type="button" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Cancel</button>
                <span *ngIf="passwordMsg()" class="text-sm" [class]="passwordOk() ? 'text-success-600' : 'text-error-600'">{{ passwordMsg() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Class-teacher assignment -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-1">Class-teacher (head teacher) assignment</h2>
          <p class="text-xs text-neutral-500 mb-4">Grants attendance-upload and student-enquiry rights for one class. The teacher must log in again to pick up a change.</p>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <select [(ngModel)]="assignClassId" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Not a class teacher</option>
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
            <select [(ngModel)]="assignSectionId" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">—</option>
              <option *ngFor="let sec of sections" [value]="sec.id">Section {{ sec.name }}</option>
            </select>
            <button (click)="assign()" [disabled]="assigning()"
              class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ assigning() ? 'Saving...' : 'Update assignment' }}
            </button>
            <span *ngIf="assignMsg()" class="text-sm" [class]="assignOk() ? 'text-success-600' : 'text-error-600'">{{ assignMsg() }}</span>
          </div>
        </div>

        <!-- Salary -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-1">Salary</h2>
          <p class="text-xs text-neutral-500 mb-4">Pending resets to the full monthly salary at the start of each month, minus whatever's paid out below.</p>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-xs text-neutral-500 mb-1">Monthly salary (₹)</label>
              <input [(ngModel)]="salaryInput" type="number" min="0" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <button (click)="saveSalary()" [disabled]="savingSalary()"
              class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ savingSalary() ? 'Saving...' : 'Update salary' }}
            </button>
            <div *ngIf="pending()" class="md:col-span-2">
              <span class="text-neutral-500 block text-xs">Pending this month ({{ pending()!.periodLabel }})</span>
              <span class="text-2xl font-bold" [class]="pending()!.pendingSalary > 0 ? 'text-error-600' : 'text-success-600'">
                ₹{{ pending()!.pendingSalary }}
              </span>
              <span class="text-neutral-500 text-xs"> &nbsp;(₹{{ pending()!.paidThisMonth }} paid of ₹{{ pending()!.monthlySalary ?? 0 }})</span>
            </div>
            <span *ngIf="salaryMsg()" class="text-sm md:col-span-4" [class]="salaryOk() ? 'text-success-600' : 'text-error-600'">{{ salaryMsg() }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Payouts -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Payouts (salary log)</h2>
            <div class="grid grid-cols-2 gap-2 mb-2">
              <input [(ngModel)]="payout.periodLabel" placeholder="Period (e.g. July 2026)" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
              <input [(ngModel)]="payout.amount" type="number" placeholder="Amount ₹" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
              <select [(ngModel)]="payout.method" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                <option>BankTransfer</option><option>Cash</option><option>Cheque</option><option>UPI</option>
              </select>
              <input [(ngModel)]="payout.reference" placeholder="Reference (optional)" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            </div>
            <button (click)="recordPayout()" [disabled]="savingPayout()"
              class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium mb-3">
              {{ savingPayout() ? 'Saving...' : 'Record payout' }}
            </button>
            <p *ngIf="payoutMsg()" class="text-sm mb-2" [class]="payoutOk() ? 'text-success-600' : 'text-error-600'">{{ payoutMsg() }}</p>
            <p *ngIf="payouts().length === 0" class="text-neutral-500 text-sm">No payouts recorded yet.</p>
            <table *ngIf="payouts().length > 0" class="w-full text-sm">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2">Period</th><th class="py-2">Amount</th><th class="py-2">Method</th><th class="py-2">Paid on</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let p of payouts()" class="border-t border-neutral-100">
                  <td class="py-2 text-neutral-900">{{ p.periodLabel }}</td>
                  <td class="py-2 font-medium text-neutral-900">₹{{ p.amount }}</td>
                  <td class="py-2 text-neutral-600">{{ p.method || '—' }}</td>
                  <td class="py-2 text-neutral-600">{{ p.paidOnUtc | date:'mediumDate' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Staff attendance -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Attendance (last 30 days)</h2>
            <div class="flex gap-2 mb-3">
              <select [(ngModel)]="attStatus" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                <option>Present</option><option>Absent</option><option>Late</option><option>HalfDay</option><option>OnLeave</option>
              </select>
              <button (click)="markAttendance()" [disabled]="savingAtt()"
                class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                {{ savingAtt() ? 'Saving...' : 'Mark today' }}
              </button>
              <span *ngIf="attMsg()" class="text-sm self-center" [class]="attOk() ? 'text-success-600' : 'text-error-600'">{{ attMsg() }}</span>
            </div>
            <p *ngIf="attendance().length === 0" class="text-neutral-500 text-sm">No attendance records in this window.</p>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let a of attendance()"
                class="px-2.5 py-1 rounded-lg text-xs font-medium"
                [class]="a.status === 'Present' ? 'bg-success-50 text-success-700' : (a.status === 'Late' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
                {{ a.date }} · {{ a.status }}
              </span>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class TeacherDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(TeachersService);
  private usersService = inject(UsersService);

  staff = signal<Staff | null>(null);
  loading = signal(false);
  error = signal('');
  payouts = signal<Payout[]>([]);
  attendance = signal<StaffAttendanceRecord[]>([]);

  assigning = signal(false);
  assignMsg = signal('');
  assignOk = signal(false);
  assignClassId = '';
  assignSectionId = '';

  savingPayout = signal(false);
  payoutMsg = signal('');
  payoutOk = signal(false);
  payout = { periodLabel: '', amount: 0, method: 'BankTransfer', reference: '' };

  pending = signal<PendingSalary | null>(null);
  salaryInput = 0;
  savingSalary = signal(false);
  salaryMsg = signal('');
  salaryOk = signal(false);

  savingAtt = signal(false);
  attMsg = signal('');
  attOk = signal(false);
  attStatus = 'Present';

  showPasswordForm = signal(false);
  newPassword = '';
  settingPassword = signal(false);
  passwordMsg = signal('');
  passwordOk = signal(false);

  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;

  private id = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.id) { this.error.set('No staff id in the URL.'); return; }
    this.loading.set(true);
    this.service.get(this.id).subscribe({
      next: (s) => {
        this.staff.set(s);
        this.assignClassId = s.classTeacherOfClassId ?? '';
        this.assignSectionId = s.classTeacherOfSectionId ?? '';
        this.salaryInput = s.monthlySalary ?? 0;
        this.loading.set(false);
      },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load the staff member.')); this.loading.set(false); },
    });
    this.loadPayouts();
    this.loadAttendance();
    this.loadPending();
  }

  loadPayouts(): void {
    this.service.payoutsForStaff(this.id).subscribe({
      next: (list) => this.payouts.set(list ?? []),
      error: () => {},
    });
  }

  loadPending(): void {
    this.service.pendingSalaryForStaff(this.id).subscribe({
      next: (p) => this.pending.set(p),
      error: () => {},
    });
  }

  loadAttendance(): void {
    const today = new Date().toISOString().slice(0, 10);
    const days30 = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    this.service.staffAttendance(this.id, days30, today).subscribe({
      next: (list) => this.attendance.set(list ?? []),
      error: () => {},
    });
  }

  assign(): void {
    if (!!this.assignClassId !== !!this.assignSectionId) {
      this.assignOk.set(false); this.assignMsg.set('Pick both class and section (or neither to unassign).');
      return;
    }
    this.assigning.set(true); this.assignMsg.set('');
    this.service.assignClassTeacher(this.id, this.assignClassId || null, this.assignSectionId || null).subscribe({
      next: (s) => {
        this.assigning.set(false); this.assignOk.set(true);
        this.assignMsg.set('Saved. The teacher must log in again to use the new rights.');
        this.staff.set(s);
      },
      error: (err) => { this.assigning.set(false); this.assignOk.set(false); this.assignMsg.set(this.msg(err, 'Could not update.')); },
    });
  }

  recordPayout(): void {
    if (!this.payout.periodLabel || !this.payout.amount || this.payout.amount <= 0) {
      this.payoutOk.set(false); this.payoutMsg.set('Period and a positive amount are required.');
      return;
    }
    this.savingPayout.set(true); this.payoutMsg.set('');
    this.service.recordPayout({
      staffId: this.id,
      amount: this.payout.amount,
      periodLabel: this.payout.periodLabel,
      method: this.payout.method,
      reference: this.payout.reference || undefined,
    }).subscribe({
      next: () => {
        this.savingPayout.set(false); this.payoutOk.set(true); this.payoutMsg.set('Payout recorded.');
        this.payout = { periodLabel: '', amount: 0, method: 'BankTransfer', reference: '' };
        this.loadPayouts();
        this.loadPending();
      },
      error: (err) => { this.savingPayout.set(false); this.payoutOk.set(false); this.payoutMsg.set(this.msg(err, 'Could not record.')); },
    });
  }

  saveSalary(): void {
    if (this.salaryInput < 0) { this.salaryOk.set(false); this.salaryMsg.set('Salary cannot be negative.'); return; }
    this.savingSalary.set(true); this.salaryMsg.set('');
    this.service.setSalary(this.id, this.salaryInput).subscribe({
      next: (s) => {
        this.savingSalary.set(false); this.salaryOk.set(true); this.salaryMsg.set('Salary updated.');
        this.staff.set(s);
        this.loadPending();
      },
      error: (err) => { this.savingSalary.set(false); this.salaryOk.set(false); this.salaryMsg.set(this.msg(err, 'Could not update salary.')); },
    });
  }

  markAttendance(): void {
    this.savingAtt.set(true); this.attMsg.set('');
    this.service.markStaffAttendance({
      staffId: this.id,
      date: new Date().toISOString().slice(0, 10),
      status: this.attStatus,
    }).subscribe({
      next: () => { this.savingAtt.set(false); this.attOk.set(true); this.attMsg.set('Marked.'); this.loadAttendance(); },
      error: (err) => { this.savingAtt.set(false); this.attOk.set(false); this.attMsg.set(this.msg(err, 'Could not mark.')); },
    });
  }

  resetPassword(s: Staff): void {
    if (!s.linkedUserId) { this.passwordOk.set(false); this.passwordMsg.set('This staff member has no linked login account.'); return; }
    if (!this.newPassword || this.newPassword.length < 10) {
      this.passwordOk.set(false); this.passwordMsg.set('Password must be at least 10 characters.');
      return;
    }
    this.settingPassword.set(true); this.passwordMsg.set('');
    this.usersService.setPassword(s.linkedUserId, this.newPassword).subscribe({
      next: () => {
        this.settingPassword.set(false); this.passwordOk.set(true);
        this.passwordMsg.set('Password updated — hand the new password to the teacher.');
        this.newPassword = '';
      },
      error: (err) => { this.settingPassword.set(false); this.passwordOk.set(false); this.passwordMsg.set(this.msg(err, 'Could not update password.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
