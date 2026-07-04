import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TeachersService, Staff, Payout, StaffAttendanceRecord, PendingSalary } from '../../../teachers/teachers.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { classNameById, sectionNameById } from '../../../../core/constants/classes';

/**
 * The teacher/staff self-service portal: own profile, payout (salary) log and own
 * attendance with a one-tap "mark me present today". Class teachers also get a
 * shortcut to their class's attendance register.
 */
@Component({
  selector: 'app-my-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">My Portal</h1>
        <p class="text-neutral-600 text-sm">Your profile, payouts and attendance.</p>
      </div>

      <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading your profile...</div>
      <div *ngIf="error()" class="bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm">{{ error() }}</div>

      <ng-container *ngIf="me() as s">
        <!-- Profile -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-xl font-bold text-neutral-900">{{ s.fullName }}</h2>
              <p class="text-neutral-600 text-sm mt-1">{{ s.designation }} &nbsp;·&nbsp; {{ s.employeeCode }}</p>
            </div>
            <span *ngIf="s.classTeacherOfClassId" class="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
              Class teacher · {{ className(s.classTeacherOfClassId!) }}{{ s.classTeacherOfSectionId ? ' - ' + sectionName(s.classTeacherOfSectionId!) : '' }}
            </span>
          </div>
          <div *ngIf="s.classTeacherOfClassId" class="mt-4">
            <a routerLink="/attendance" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
              → Mark today's attendance for your class
            </a>
          </div>
        </div>

        <!-- Pending salary -->
        <div *ngIf="pending() as p" class="rounded-xl p-6 shadow-sm border"
          [class]="p.pendingSalary > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
          <p class="text-sm" [class]="p.pendingSalary > 0 ? 'text-error-700' : 'text-success-700'">
            Pending salary · {{ p.periodLabel }}
          </p>
          <p class="text-3xl font-bold" [class]="p.pendingSalary > 0 ? 'text-error-700' : 'text-success-700'">
            {{ p.monthlySalary == null ? 'Not set yet' : ('₹' + p.pendingSalary) }}
          </p>
          <p *ngIf="p.monthlySalary != null" class="text-xs mt-1" [class]="p.pendingSalary > 0 ? 'text-error-600' : 'text-success-600'">
            ₹{{ p.paidThisMonth }} paid of ₹{{ p.monthlySalary }} this month
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- My payouts -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">My payouts</h2>
            <p *ngIf="payoutsError()" class="text-error-600 text-sm">{{ payoutsError() }}</p>
            <p *ngIf="!payoutsError() && payouts().length === 0" class="text-neutral-500 text-sm">No payouts recorded yet.</p>
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

          <!-- My attendance -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-neutral-900">My attendance (last 30 days)</h2>
              <button (click)="markToday()" [disabled]="marking()"
                class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                {{ marking() ? 'Saving...' : "I'm present today" }}
              </button>
            </div>
            <p *ngIf="markMsg()" class="text-sm mb-2" [class]="markOk() ? 'text-success-600' : 'text-error-600'">{{ markMsg() }}</p>
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
export class MyPortalComponent implements OnInit {
  private service = inject(TeachersService);
  private auth = inject(AuthService);

  me = signal<Staff | null>(null);
  loading = signal(false);
  error = signal('');
  payouts = signal<Payout[]>([]);
  payoutsError = signal('');
  attendance = signal<StaffAttendanceRecord[]>([]);
  marking = signal(false);
  markMsg = signal('');
  markOk = signal(false);
  pending = signal<PendingSalary | null>(null);

  className = classNameById;
  sectionName = sectionNameById;

  ngOnInit(): void {
    this.loading.set(true);
    this.service.me().subscribe({
      next: (s) => { this.me.set(s); this.loading.set(false); },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.status === 404
          ? 'Your account has no staff profile yet — ask the school owner to onboard you on the Teachers page.'
          : this.msg(err, 'Failed to load your profile.'));
      },
    });
    this.service.myPayouts().subscribe({
      next: (list) => this.payouts.set(list ?? []),
      error: (err) => this.payoutsError.set(this.msg(err, 'Failed to load payouts.')),
    });
    this.service.myPendingSalary().subscribe({
      next: (p) => this.pending.set(p),
      error: () => {},
    });
    this.loadAttendance();
  }

  loadAttendance(): void {
    const today = new Date().toISOString().slice(0, 10);
    const days30 = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    this.service.myAttendance(days30, today).subscribe({
      next: (list) => this.attendance.set(list ?? []),
      error: () => {},
    });
  }

  markToday(): void {
    const staffId = this.auth.staffId() ?? this.me()?.id;
    if (!staffId) { this.markOk.set(false); this.markMsg.set('No staff profile linked to your account.'); return; }
    this.marking.set(true); this.markMsg.set('');
    this.service.markStaffAttendance({
      staffId,
      date: new Date().toISOString().slice(0, 10),
      status: 'Present',
    }).subscribe({
      next: () => { this.marking.set(false); this.markOk.set(true); this.markMsg.set('Marked present for today.'); this.loadAttendance(); },
      error: (err) => { this.marking.set(false); this.markOk.set(false); this.markMsg.set(this.msg(err, 'Could not mark.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the gateway on localhost:5100. Is the backend running?';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
