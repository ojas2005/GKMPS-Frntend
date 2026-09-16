import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';
import { ReportsService } from '../../../reports/reports.service';
import { TeachersService } from '../../../teachers/teachers.service';
import { FeesService } from '../../../fees/fees.service';
import { CommunicationService, Announcement } from '../../../communication/communication.service';
import { classNameById, SCHOOL_CLASSES } from '../../../../core/constants/classes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <!-- Welcome Banner -->
      <div class="banner relative overflow-hidden rounded-2xl p-8 text-white shadow-lg">
        <div class="banner-bg absolute inset-0"></div>
        <div class="banner-orb banner-orb-1"></div>
        <div class="banner-orb banner-orb-2"></div>
        <div class="banner-orb banner-orb-3"></div>
        <div class="relative z-10">
          <h1 class="text-3xl font-bold mb-2">
            Welcome Back, {{ firstName() }}! <span class="wave inline-block">👋</span>
          </h1>
          <p class="text-primary-100">{{ isStaff() ? "Here's your school at a glance." : "Here's what's new for you today." }}</p>
        </div>
      </div>

      <!-- Student / parent: amount to pay (only once the ledger has loaded) -->
      <div *ngIf="isSelfService() && feeLoaded()" class="rounded-xl p-6 shadow-sm border flex items-center justify-between"
        [class]="feePending() > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
        <div>
          <p class="text-sm" [class]="feePending() > 0 ? 'text-error-700' : 'text-success-700'">
            {{ feePending() > 0 ? 'Amount to pay' : 'Fee status' }}
          </p>
          <p class="text-3xl font-bold" [class]="feePending() > 0 ? 'text-error-700' : 'text-success-700'">
            {{ feePending() > 0 ? '₹' + (feePendingShown() | number : '1.0-0') : 'All paid ✓' }}
          </p>
        </div>
        <a routerLink="/fees" class="text-sm font-medium" [class]="feePending() > 0 ? 'text-error-700 hover:text-error-800' : 'text-success-700 hover:text-success-800'">
          View fees →
        </a>
      </div>

      <!-- Teacher: pending salary -->
      <div *ngIf="isTeacherRole()" class="rounded-xl p-6 shadow-sm border flex items-center justify-between"
        [class]="salaryPending() > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
        <div>
          <p class="text-sm" [class]="salaryPending() > 0 ? 'text-error-700' : 'text-success-700'">Pending salary this month</p>
          <p class="text-3xl font-bold" [class]="salaryPending() > 0 ? 'text-error-700' : 'text-success-700'">
            {{ salaryKnown() ? '₹' + (salaryPendingShown() | number : '1.0-0') : 'Not set yet' }}
          </p>
        </div>
        <a routerLink="/my-portal" class="text-sm font-medium" [class]="salaryPending() > 0 ? 'text-error-700 hover:text-error-800' : 'text-success-700 hover:text-success-800'">
          View portal →
        </a>
      </div>

      <!-- Stats Grid (management roles only) -->
      <div *ngIf="isStaff()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Student Count -->
        <div class="stat-card bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          style="--accent-from: #38bdf8; --accent-to: #0284c7">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-neutral-600 text-sm font-medium">Total Students</h3>
            <div class="stat-icon w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-neutral-900">
            {{ totalStudents() !== null ? (studentsShown() | number : '1.0-0') : '—' }}
          </p>
          <p class="text-xs text-neutral-500 mt-2">currently enrolled</p>
        </div>

        <!-- Teacher Count -->
        <div class="stat-card bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          style="--accent-from: #fbbf24; --accent-to: #d97706">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-neutral-600 text-sm font-medium">Total Staff</h3>
            <div class="stat-icon w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-neutral-900">
            {{ totalTeachers() !== null ? (teachersShown() | number : '1.0-0') : '—' }}
          </p>
          <p class="text-xs text-neutral-500 mt-2">on the staff roll</p>
        </div>

        <!-- Attendance Rate -->
        <div class="stat-card bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          style="--accent-from: #34d399; --accent-to: #059669">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-neutral-600 text-sm font-medium">Active Classes</h3>
            <div class="stat-icon w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-neutral-900">
            {{ classBars().length || totalStudents() !== null ? (classesShown() | number : '1.0-0') : '—' }}
          </p>
          <p class="text-xs text-neutral-500 mt-2">with enrolled students</p>
        </div>

        <!-- Fee Collection -->
        <div class="stat-card bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          style="--accent-from: #f87171; --accent-to: #dc2626">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-neutral-600 text-sm font-medium">Fee Collection</h3>
            <div class="stat-icon w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-neutral-900">
            {{ feeCollected() !== null ? '₹' + (feeShown() | number : '1.0-0') : '—' }}
          </p>
          <p class="text-xs text-neutral-500 mt-2">last 30 days</p>
        </div>
      </div>

      <!-- Enrollment chart + quick actions (management roles) -->
      <div *ngIf="isStaff()" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-1">Students by class</h2>
          <p class="text-xs text-neutral-500 mb-6">Active enrolment per class</p>
          <div *ngIf="classBars().length === 0" class="h-56 flex items-center justify-center text-sm text-neutral-500">
            {{ totalStudents() === null ? 'Loading…' : 'No students enrolled yet.' }}
          </div>
          <div *ngIf="classBars().length > 0" class="overflow-x-auto">
            <div class="h-56 flex items-end gap-3 min-w-max px-1">
              <div *ngFor="let b of classBars(); let i = index" class="flex flex-col items-center justify-end h-full w-12">
                <span class="text-xs font-medium text-neutral-700 mb-1">{{ b.count }}</span>
                <div class="chart-bar w-full" [style.--h]="b.pct + '%'" [style.--d]="i * 0.06 + 's'" [attr.title]="b.name + ': ' + b.count"></div>
                <span class="text-[11px] text-neutral-500 mt-2 whitespace-nowrap">{{ b.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <a *ngFor="let a of quickActions(); let first = first" [routerLink]="a.route"
              class="block w-full px-4 py-3 rounded-lg border font-medium text-sm transition-colors text-left"
              [class]="first ? 'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100' : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'">
              {{ a.label }}
            </a>
          </div>
        </div>
      </div>

      <!-- Latest announcements (server-scoped to what this user may see) -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-6">Latest announcements</h2>
        <p *ngIf="announcements().length === 0" class="text-sm text-neutral-500">
          {{ announcementsLoaded() ? 'No announcements right now.' : 'Loading…' }}
        </p>
        <div class="space-y-4">
          <div *ngFor="let a of announcements(); let last = last" class="activity-item flex items-start gap-4"
            [class.pb-4]="!last" [class.border-b]="!last" [class.border-neutral-200]="!last">
            <div class="activity-dot w-3 h-3 rounded-full bg-primary-500 mt-2"></div>
            <div class="flex-1 min-w-0">
              <p class="text-neutral-900 font-medium">{{ a.title }}</p>
              <p *ngIf="a.body" class="text-neutral-600 text-sm whitespace-pre-line">{{ a.body }}</p>
              <p class="text-neutral-500 text-xs">{{ a.publishedAtUtc | date: 'medium' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* ---------- Welcome banner ---------- */
      .banner-bg {
        background: linear-gradient(120deg, #0284c7, #0369a1, #0ea5e9, #075985, #0284c7);
        background-size: 300% 300%;
        animation: banner-drift 14s ease infinite;
      }
      @keyframes banner-drift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      .banner-orb {
        position: absolute;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.1);
        pointer-events: none;
      }
      .banner-orb-1 {
        width: 16rem; height: 16rem;
        top: -7rem; right: -4rem;
        animation: orb-drift-1 9s ease-in-out infinite;
      }
      .banner-orb-2 {
        width: 9rem; height: 9rem;
        bottom: -4rem; right: 22%;
        background: rgba(255, 255, 255, 0.08);
        animation: orb-drift-2 12s ease-in-out infinite;
      }
      .banner-orb-3 {
        width: 5rem; height: 5rem;
        top: 15%; right: 38%;
        background: rgba(255, 255, 255, 0.09);
        animation: orb-drift-1 7s ease-in-out infinite reverse;
      }
      @keyframes orb-drift-1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-1.5rem, 1rem) scale(1.12); }
      }
      @keyframes orb-drift-2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(1.5rem, -1rem) scale(0.92); }
      }

      .wave {
        animation: wave 2.4s ease-in-out infinite;
        transform-origin: 70% 70%;
      }
      @keyframes wave {
        0%, 60%, 100% { transform: rotate(0deg); }
        10% { transform: rotate(16deg); }
        20% { transform: rotate(-8deg); }
        30% { transform: rotate(14deg); }
        40% { transform: rotate(-4deg); }
        50% { transform: rotate(10deg); }
      }

      /* ---------- Stat cards ---------- */
      .stat-card {
        position: relative;
        overflow: hidden;
      }
      /* colored accent bar that sweeps across the top on hover */
      .stat-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-from), var(--accent-to));
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.45s cubic-bezier(0.22, 0.9, 0.35, 1);
      }
      .stat-card:hover::before { transform: scaleX(1); }

      .stat-icon {
        transition: transform 0.3s ease;
      }
      .stat-card:hover .stat-icon {
        animation: icon-bob 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes icon-bob {
        0%, 100% { transform: scale(1) rotate(0deg); }
        40% { transform: scale(1.18) rotate(-8deg); }
        70% { transform: scale(1.06) rotate(5deg); }
      }

      /* ---------- Decorative chart bars ---------- */
      .chart-bar {
        width: 5.5%;
        height: var(--h);
        border-radius: 6px 6px 0 0;
        background: linear-gradient(180deg, #38bdf8, #0284c7);
        opacity: 0.85;
        transform-origin: bottom;
        animation:
          bar-grow 0.8s cubic-bezier(0.22, 0.9, 0.35, 1) var(--d) backwards,
          bar-breathe 4s ease-in-out calc(var(--d) + 0.8s) infinite;
        transition: opacity 0.25s ease;
      }
      .chart-bar:hover { opacity: 1; }
      @keyframes bar-grow {
        from { transform: scaleY(0); }
        to { transform: scaleY(1); }
      }
      @keyframes bar-breathe {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(0.9); }
      }

      /* ---------- Activity feed ---------- */
      .activity-item {
        animation: activity-in 0.45s ease backwards;
        transition: transform 0.25s ease, background 0.25s ease;
        border-radius: 0.5rem;
      }
      .activity-item:nth-child(2) { animation-delay: 0.1s; }
      .activity-item:nth-child(3) { animation-delay: 0.2s; }
      .activity-item:nth-child(4) { animation-delay: 0.3s; }
      .activity-item:nth-child(5) { animation-delay: 0.4s; }
      .activity-item:hover {
        transform: translateX(6px);
      }
      @keyframes activity-in {
        from { opacity: 0; transform: translateX(-14px); }
        to { opacity: 1; transform: translateX(0); }
      }

      .activity-dot {
        animation: dot-breathe 2.4s ease-in-out infinite;
      }
      .activity-item:nth-child(2) .activity-dot { animation-delay: 0.4s; }
      .activity-item:nth-child(3) .activity-dot { animation-delay: 0.8s; }
      @keyframes dot-breathe {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.45); opacity: 0.7; }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private reports = inject(ReportsService);
  private teachers = inject(TeachersService);
  private fees = inject(FeesService);
  private communication = inject(CommunicationService);

  totalStudents = signal<number | null>(null);
  totalTeachers = signal<number | null>(null);
  feeCollected = signal<number | null>(null);
  feePending = signal(0);
  salaryPending = signal(0);
  salaryKnown = signal(false);

  // Animated display values (count up from 0 when the real value arrives).
  studentsShown = signal(0);
  teachersShown = signal(0);
  feeShown = signal(0);
  classesShown = signal(0);
  feePendingShown = signal(0);
  salaryPendingShown = signal(0);

  feeLoaded = signal(false);
  classBars = signal<Array<{ name: string; count: number; pct: number }>>([]);
  announcements = signal<Announcement[]>([]);
  announcementsLoaded = signal(false);

  firstName(): string {
    return this.auth.currentUser()?.fullName?.split(' ')[0] ?? 'there';
  }

  // Management roles that can see school-wide stats & quick actions.
  isStaff(): boolean {
    return this.auth.hasRole('SuperAdmin', 'Principal', 'Admin', 'Accountant');
  }

  isSelfService(): boolean {
    return this.auth.isSelfService();
  }

  quickActions(): Array<{ label: string; route: string }> {
    if (this.auth.hasRole('Accountant')) {
      return [{ label: 'Record a Fee Payment', route: '/fees' }, { label: 'View Reports', route: '/reports' }];
    }
    return [
      { label: 'Mark Attendance', route: '/attendance' },
      { label: 'Create Announcement', route: '/communication' },
      { label: 'Admit Student', route: '/students' },
      { label: 'View Reports', route: '/reports' },
    ];
  }

  isTeacherRole(): boolean {
    return this.auth.hasRole('Teacher');
  }

  ngOnInit(): void {
    this.communication.listAnnouncements({ pageSize: 5 }).subscribe({
      next: (list) => { this.announcements.set((list ?? []).slice(0, 5)); this.announcementsLoaded.set(true); },
      error: () => this.announcementsLoaded.set(true),
    });

    if (this.isSelfService()) {
      const studentId = this.auth.studentId();
      if (studentId) {
        this.fees.myPayments(studentId).subscribe({
          next: (list) => {
            const pending = (list ?? []).reduce((sum, f) => {
              const total = Number(f['totalAmount'] ?? f['amount'] ?? 0);
              const paid = Number(f['paidAmount'] ?? 0);
              const waiver = Number(f['waiverAmount'] ?? 0);
              return sum + Math.max(0, total - paid - waiver);
            }, 0);
            this.feePending.set(pending);
            this.feeLoaded.set(true);
            this.countUp(pending, this.feePendingShown);
          },
          error: () => {},
        });
      }
      return;
    }

    if (this.isTeacherRole()) {
      this.teachers.myPendingSalary().subscribe({
        next: (p) => {
          this.salaryPending.set(p.pendingSalary);
          this.salaryKnown.set(p.monthlySalary != null);
          this.countUp(p.pendingSalary ?? 0, this.salaryPendingShown);
        },
        error: () => {},
      });
      return;
    }

    if (!this.isStaff()) return; // other self-service roles (Parent) don't load admin stats (would 403)

    // Each call fails soft — a card just shows "—" if its service is unreachable.
    this.reports.enrollment().subscribe({
      next: (r) => {
        const v = r?.totalStudents ?? null;
        this.totalStudents.set(v);
        if (v !== null) this.countUp(v, this.studentsShown);

        // Bars in the school's own class order (PG ... Class 10), scaled to the largest class.
        const counts = r?.activeCountByClass ?? {};
        const order = (id: string) => { const i = SCHOOL_CLASSES.findIndex((c) => c.id === id); return i < 0 ? 999 : i; };
        const entries = Object.entries(counts).filter(([, n]) => n > 0).sort(([a], [b]) => order(a) - order(b));
        const max = Math.max(1, ...entries.map(([, n]) => n));
        this.classBars.set(entries.map(([id, n]) => ({ name: classNameById(id), count: n, pct: Math.max(4, Math.round((n / max) * 100)) })));
        this.countUp(entries.length, this.classesShown);
      },
      error: () => {},
    });
    this.teachers.list({ pageSize: 1 }).subscribe({
      next: (p) => {
        const v = p?.totalCount ?? null;
        this.totalTeachers.set(v);
        if (v !== null) this.countUp(v, this.teachersShown);
      },
      error: () => {},
    });
    const from = new Date(Date.now() - 30 * 864e5).toISOString();
    const to = new Date().toISOString();
    this.fees.collectionTotals(from, to).subscribe({
      next: (t) => {
        const v = t?.totalCollected ?? null;
        this.feeCollected.set(v);
        if (v !== null) this.countUp(v, this.feeShown);
      },
      error: () => {},
    });
  }

  /** Animate a display signal from 0 to `target` with an ease-out curve. */
  private countUp(target: number, out: WritableSignal<number>, decimals = 0): void {
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      out.set(target);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    const factor = Math.pow(10, decimals);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      out.set(Math.round(target * eased * factor) / factor);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
