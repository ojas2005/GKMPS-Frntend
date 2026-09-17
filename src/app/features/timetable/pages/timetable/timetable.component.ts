import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  TimetableService, ScheduleConfig, TeacherAssignment, PrePrimaryAssignment,
  TimetableSlot, TeacherSlot,
} from '../../timetable.service';
import { TeachersService, Staff } from '../../../teachers/teachers.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, classNameById, sectionNameById } from '../../../../core/constants/classes';

/**
 * One page, three faces:
 *  - Owner/admin: configure the two teacher groups (Junior 1-5, Senior 6-10) and the
 *    pre-primary class teachers, then auto-generate every class's timetable.
 *  - Student/parent: read-only grid of their own class (server-scoped).
 *  - Teacher: read-only grid of their own periods across all classes.
 * The schedule is identical Mon-Sat (8x40-min periods, 40-min lunch after P4, 8:00-14:00),
 * so grids render one day-column and note the repeat.
 */
@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">{{ isAdmin ? 'Timetable' : (parentView ? "My Child's Timetable" : 'My Timetable') }}</h1>
        <p class="text-neutral-600 text-sm">
          {{ isAdmin ? 'Configure teacher groups and auto-generate every class\\'s weekly schedule.'
                     : 'Same schedule every day, Monday to Saturday · 8:00 AM - 2:00 PM · lunch 10:40-11:20.' }}
        </p>
      </div>

      <!-- ============ OWNER / ADMIN ============ -->
      <ng-container *ngIf="isAdmin">
        <div *ngIf="loadingConfig()" class="p-8 text-center text-neutral-500">Loading configuration...</div>

        <ng-container *ngIf="!loadingConfig()">
          <!-- Pre-primary -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h2 class="text-lg font-semibold text-neutral-900 mb-1">Pre-primary — class teacher takes all periods</h2>
            <p class="text-xs text-neutral-500 mb-4">PG, Nursery, LKG and UKG are covered for the whole day by their own class teacher.</p>
            <table class="w-full text-sm">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2">Class</th><th class="py-2">Class teacher</th><th class="py-2">Label (e.g. General)</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let pp of prePrimary" class="border-t border-neutral-100">
                  <td class="py-2 font-medium text-neutral-900 w-40">{{ className(pp.classId) }}</td>
                  <td class="py-2 pr-3">
                    <select [(ngModel)]="pp.classTeacherStaffId" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                      <option value="">— pick a teacher —</option>
                      <option *ngFor="let t of teachers()" [value]="t.id">{{ t.fullName }}</option>
                    </select>
                  </td>
                  <td class="py-2">
                    <input [(ngModel)]="pp.subjectName" placeholder="General" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Junior + Senior groups -->
          <div *ngFor="let group of groups" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div class="flex items-center justify-between mb-1">
              <h2 class="text-lg font-semibold text-neutral-900">{{ group.label }}</h2>
              <button (click)="addRow(group.key)" class="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">+ Add teacher</button>
            </div>
            <p class="text-xs text-neutral-500 mb-4">Each teacher: their subject, max periods they can teach per day, and the classes they take.</p>

            <p *ngIf="rows(group.key).length === 0" class="text-neutral-500 text-sm">No teachers in this group yet.</p>

            <div *ngFor="let row of rows(group.key); let i = index" class="border-t border-neutral-100 py-3">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                <div class="md:col-span-3">
                  <label class="block text-xs text-neutral-500 mb-1">Teacher *</label>
                  <select [(ngModel)]="row.staffId" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option value="">— pick —</option>
                    <option *ngFor="let t of teachers()" [value]="t.id">{{ t.fullName }}</option>
                  </select>
                </div>
                <div class="md:col-span-3">
                  <label class="block text-xs text-neutral-500 mb-1">Subject *</label>
                  <input [(ngModel)]="row.subjectName" placeholder="e.g. Mathematics" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs text-neutral-500 mb-1">Max periods/day *</label>
                  <input [(ngModel)]="row.maxPeriodsPerDay" type="number" min="1" max="8" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div class="md:col-span-3">
                  <label class="block text-xs text-neutral-500 mb-1">Classes taught</label>
                  <div class="flex flex-wrap gap-1.5">
                    <button *ngFor="let c of group.classes" type="button" (click)="toggleClass(row, c.id)"
                      class="px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors"
                      [class]="row.classIds.includes(c.id)
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50'">
                      {{ c.name }}
                    </button>
                  </div>
                </div>
                <div class="md:col-span-1 md:pt-6">
                  <button (click)="removeRow(group.key, i)" class="text-error-600 hover:text-error-700 text-xs font-medium">Remove</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div class="flex flex-wrap items-center gap-3">
              <button (click)="saveConfig()" [disabled]="saving()"
                class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-50 disabled:opacity-50">
                {{ saving() ? 'Saving...' : 'Save configuration' }}
              </button>
              <button (click)="generate()" [disabled]="generating()"
                class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                {{ generating() ? 'Generating...' : 'Save & generate timetables' }}
              </button>
              <span *ngIf="actionMsg()" class="text-sm" [class]="actionOk() ? 'text-success-600' : 'text-error-600'">{{ actionMsg() }}</span>
            </div>
            <div *ngIf="warnings().length > 0" class="mt-4 p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <p class="text-sm font-semibold text-warning-800 mb-2">Could not cover every class — nothing was saved for these groups. Fix and regenerate:</p>
              <ul class="text-sm text-warning-800 list-disc pl-5 space-y-1">
                <li *ngFor="let w of dedupedWarnings()">{{ w }}</li>
              </ul>
            </div>
          </div>

          <!-- Result preview: one class at a time -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div class="flex items-center gap-3 mb-4">
              <h2 class="text-lg font-semibold text-neutral-900">Preview a class</h2>
              <select [(ngModel)]="previewClassId" (ngModelChange)="loadPreview()" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                <option *ngFor="let c of allClasses" [value]="c.id">{{ c.name }}</option>
              </select>
              <span class="text-xs text-neutral-500">Section {{ sectionName(defaultSectionId) }} · repeats Mon-Sat</span>
            </div>
            <p *ngIf="previewError()" class="text-neutral-500 text-sm">{{ previewError() }}</p>
            <table *ngIf="previewDay().length > 0" class="w-full text-sm">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2">Period</th><th class="py-2">Time</th><th class="py-2">Subject</th><th class="py-2">Teacher</th></tr>
              </thead>
              <tbody>
                <ng-container *ngFor="let s of previewDay()">
                  <tr class="border-t border-neutral-100">
                    <td class="py-2 font-medium text-neutral-900">P{{ s.period }}</td>
                    <td class="py-2 text-neutral-600">{{ s.startTime }} - {{ s.endTime }}</td>
                    <td class="py-2 text-neutral-900">{{ s.subjectName || '—' }}</td>
                    <td class="py-2 text-neutral-600">{{ teacherName(s.teacherStaffId) }}</td>
                  </tr>
                  <tr *ngIf="s.period === 4" class="border-t border-neutral-100 bg-warning-50">
                    <td class="py-2 font-medium text-warning-700" colspan="4">Lunch · 10:40 - 11:20</td>
                  </tr>
                </ng-container>
              </tbody>
            </table>
          </div>
        </ng-container>
      </ng-container>

      <!-- ============ STUDENT / PARENT ============ -->
      <ng-container *ngIf="isStudent">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-1">
            {{ className(myClassId) }} - {{ sectionName(mySectionId) }}
          </h2>
          <p class="text-xs text-neutral-500 mb-4">Same schedule every day, Monday to Saturday.</p>
          <p *ngIf="viewError()" class="text-neutral-500 text-sm">{{ viewError() }}</p>
          <table *ngIf="classDay().length > 0" class="w-full text-sm">
            <thead class="text-neutral-500 text-left text-xs">
              <tr><th class="py-2">Period</th><th class="py-2">Time</th><th class="py-2">Subject</th><th class="py-2">Teacher</th></tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let s of classDay()">
                <tr class="border-t border-neutral-100">
                  <td class="py-2 font-medium text-neutral-900">P{{ s.period }}</td>
                  <td class="py-2 text-neutral-600">{{ s.startTime }} - {{ s.endTime }}</td>
                  <td class="py-2 text-neutral-900">{{ s.subjectName || '—' }}</td>
                  <td class="py-2 text-neutral-600">{{ teacherName(s.teacherStaffId) }}</td>
                </tr>
                <tr *ngIf="s.period === 4" class="border-t border-neutral-100 bg-warning-50">
                  <td class="py-2 font-medium text-warning-700" colspan="4">Lunch · 10:40 - 11:20</td>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ============ TEACHER ============ -->
      <ng-container *ngIf="isTeacher">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-1">Your teaching schedule</h2>
          <p class="text-xs text-neutral-500 mb-4">Same schedule every day, Monday to Saturday. Free periods are shown as —.</p>
          <p *ngIf="viewError()" class="text-neutral-500 text-sm">{{ viewError() }}</p>
          <table *ngIf="teacherDay().length > 0" class="w-full text-sm">
            <thead class="text-neutral-500 text-left text-xs">
              <tr><th class="py-2">Period</th><th class="py-2">Time</th><th class="py-2">Class</th><th class="py-2">Subject</th></tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let s of teacherDay()">
                <tr class="border-t border-neutral-100">
                  <td class="py-2 font-medium text-neutral-900">P{{ s.period }}</td>
                  <td class="py-2 text-neutral-600">{{ s.startTime }} - {{ s.endTime }}</td>
                  <td class="py-2" [class]="s.classId ? 'text-neutral-900 font-medium' : 'text-neutral-400'">
                    {{ s.classId ? className(s.classId) + ' - ' + sectionName(s.sectionId) : '— free —' }}
                  </td>
                  <td class="py-2 text-neutral-600">{{ s.subjectName || '—' }}</td>
                </tr>
                <tr *ngIf="s.period === 4" class="border-t border-neutral-100 bg-warning-50">
                  <td class="py-2 font-medium text-warning-700" colspan="4">Lunch · 10:40 - 11:20</td>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>
      </ng-container>
    </div>
  `,
})
export class TimetableComponent implements OnInit {
  private service = inject(TimetableService);
  private teachersService = inject(TeachersService);
  private auth = inject(AuthService);

  isAdmin = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');

  parentView = this.auth.isParentView();
  isStudent = this.auth.isSelfService();
  isTeacher = this.auth.hasRole('Teacher');

  // Fixed bell schedule (mirrors the backend constants) so views can render free
  // periods and the lunch row even when a slot is missing.
  periods = [
    { period: 1, startTime: '08:00', endTime: '08:40' },
    { period: 2, startTime: '08:40', endTime: '09:20' },
    { period: 3, startTime: '09:20', endTime: '10:00' },
    { period: 4, startTime: '10:00', endTime: '10:40' },
    { period: 5, startTime: '11:20', endTime: '12:00' },
    { period: 6, startTime: '12:00', endTime: '12:40' },
    { period: 7, startTime: '12:40', endTime: '13:20' },
    { period: 8, startTime: '13:20', endTime: '14:00' },
  ];

  className = classNameById;
  sectionName = sectionNameById;
  defaultSectionId = SCHOOL_SECTIONS[0].id; // Section A — the generator's v1 target
  allClasses = SCHOOL_CLASSES;

  // Class ranges (indices in SCHOOL_CLASSES: 0-3 pre-primary, 4-8 = 1-5, 9-13 = 6-10).
  prePrimaryClasses = SCHOOL_CLASSES.slice(0, 4);
  juniorClasses = SCHOOL_CLASSES.slice(4, 9);
  seniorClasses = SCHOOL_CLASSES.slice(9, 14);

  groups = [
    { key: 'junior' as const, label: 'Junior group — Classes 1 to 5', classes: this.juniorClasses },
    { key: 'senior' as const, label: 'Senior group — Classes 6 to 10', classes: this.seniorClasses },
  ];

  // ---- Admin state ----
  teachers = signal<Staff[]>([]);
  loadingConfig = signal(true);
  junior: TeacherAssignment[] = [];
  senior: TeacherAssignment[] = [];
  prePrimary: PrePrimaryAssignment[] = this.prePrimaryClasses.map((c) => ({
    classId: c.id, classTeacherStaffId: '', subjectName: 'General',
  }));
  saving = signal(false);
  generating = signal(false);
  actionMsg = signal('');
  actionOk = signal(false);
  warnings = signal<string[]>([]);
  previewClassId = SCHOOL_CLASSES[4].id; // Class 1
  previewDay = signal<TimetableSlot[]>([]);
  previewError = signal('');

  // ---- Student / teacher state ----
  myClassId = this.auth.classId() ?? '';
  mySectionId = this.auth.sectionId() ?? this.defaultSectionId;
  classDay = signal<TimetableSlot[]>([]);
  teacherDay = signal<Array<TeacherSlot | { period: number; startTime: string; endTime: string; classId: null; sectionId: null; subjectName: null }>>([]);
  viewError = signal('');

  rows(key: 'junior' | 'senior'): TeacherAssignment[] {
    return key === 'junior' ? this.junior : this.senior;
  }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.teachersService.list({ pageSize: 200 }).subscribe({
        next: (page) => {
          this.teachers.set(page?.items ?? []);
          this.prefillPrePrimaryTeachers();
        },
        error: () => {},
      });
      this.service.getConfig().subscribe({
        next: (cfg) => { this.applyConfig(cfg); this.loadingConfig.set(false); },
        error: () => this.loadingConfig.set(false),
      });
      this.loadPreview();
      return;
    }

    if (this.isStudent) {
      if (!this.myClassId) { this.viewError.set('Your account is not linked to a class yet.'); return; }
      this.service.getForClass(this.myClassId, this.mySectionId).subscribe({
        next: (tt) => {
          const day = this.oneDay(tt?.slots ?? []);
          this.classDay.set(day);
          this.resolveTeacherNames(day);
        },
        error: (err) => this.viewError.set(err?.status === 404
          ? 'No timetable has been published for your class yet.'
          : 'Could not load your timetable.'),
      });
      return;
    }

    if (this.isTeacher) {
      this.service.getForTeacher().subscribe({
        next: (tt) => {
          const monday = (tt?.slots ?? []).filter((s) => s.day === 'Monday');
          const byPeriod = new Map(monday.map((s) => [s.period, s]));
          this.teacherDay.set(this.periods.map((p) =>
            byPeriod.get(p.period) ??
            { period: p.period, startTime: p.startTime, endTime: p.endTime, classId: null, sectionId: null, subjectName: null }));
          if (monday.length === 0) this.viewError.set('No periods assigned to you yet — the timetable may not be generated.');
        },
        error: () => this.viewError.set('Could not load your schedule.'),
      });
    }
  }

  // The schedule repeats daily, so every view renders Monday only.
  private oneDay(slots: TimetableSlot[]): TimetableSlot[] {
    return slots.filter((s) => s.day === 'Monday').sort((a, b) => a.period - b.period);
  }

  // Student/parent view: slots only carry teacherStaffId, so look up each distinct
  // teacher by id (GET /api/staff/{id} is allowed for any signed-in user) and feed the
  // shared teachers() signal that teacherName() reads.
  private resolveTeacherNames(slots: TimetableSlot[]): void {
    const ids = [...new Set(slots.map((s) => s.teacherStaffId).filter((x): x is string => !!x))];
    if (ids.length === 0) return;
    forkJoin(ids.map((id) => this.teachersService.get(id).pipe(catchError(() => of(null))))).subscribe(
      (list) => this.teachers.set(list.filter((s): s is Staff => !!s)),
    );
  }

  private applyConfig(cfg: ScheduleConfig): void {
    this.junior = cfg?.junior ?? [];
    this.senior = cfg?.senior ?? [];
    if (cfg?.prePrimary?.length) {
      // Merge saved picks onto the fixed 4-class scaffold.
      for (const pp of this.prePrimary) {
        const saved = cfg.prePrimary.find((x) => x.classId === pp.classId);
        if (saved) { pp.classTeacherStaffId = saved.classTeacherStaffId; pp.subjectName = saved.subjectName ?? 'General'; }
      }
    }
  }

  // If a teacher is already the class teacher of a pre-primary class, prefill them.
  private prefillPrePrimaryTeachers(): void {
    for (const pp of this.prePrimary) {
      if (pp.classTeacherStaffId) continue;
      const match = this.teachers().find((t) => t.classTeacherOfClassId === pp.classId);
      if (match) pp.classTeacherStaffId = match.id;
    }
  }

  teacherName(staffId?: string | null): string {
    if (!staffId) return '—';
    return this.teachers().find((t) => t.id === staffId)?.fullName ?? staffId.slice(0, 8);
  }

  addRow(key: 'junior' | 'senior'): void {
    this.rows(key).push({ staffId: '', subjectName: '', maxPeriodsPerDay: 6, classIds: [] });
  }

  removeRow(key: 'junior' | 'senior', index: number): void {
    this.rows(key).splice(index, 1);
  }

  toggleClass(row: TeacherAssignment, classId: string): void {
    const i = row.classIds.indexOf(classId);
    if (i >= 0) row.classIds.splice(i, 1); else row.classIds.push(classId);
  }

  dedupedWarnings(): string[] {
    // Backend emits one warning per class+period; class name once each is enough here.
    const seen = new Set<string>();
    const out: string[] = [];
    for (const w of this.warnings()) {
      const friendly = w.replace(/Class ([0-9a-f-]{36})/i, (_, id) => classNameById(id));
      const key = friendly.split('·')[0].trim();
      if (!seen.has(key)) { seen.add(key); out.push(friendly); }
    }
    return out;
  }

  private buildConfig(): ScheduleConfig {
    const clean = (rows: TeacherAssignment[]) =>
      rows.filter((r) => r.staffId && r.subjectName.trim() && r.classIds.length > 0)
          .map((r) => ({ ...r, subjectName: r.subjectName.trim(), maxPeriodsPerDay: Number(r.maxPeriodsPerDay) || 1 }));
    return {
      junior: clean(this.junior),
      senior: clean(this.senior),
      prePrimary: this.prePrimary
        .filter((p) => p.classTeacherStaffId)
        .map((p) => ({ ...p, subjectName: p.subjectName?.trim() || 'General' })),
    };
  }

  saveConfig(onSaved?: () => void): void {
    this.saving.set(true); this.actionMsg.set('');
    this.service.saveConfig(this.buildConfig()).subscribe({
      next: () => {
        this.saving.set(false);
        if (onSaved) { onSaved(); return; }
        this.actionOk.set(true); this.actionMsg.set('Configuration saved.');
      },
      error: (err) => { this.saving.set(false); this.actionOk.set(false); this.actionMsg.set(this.msg(err, 'Could not save configuration.')); },
    });
  }

  generate(): void {
    // Always save first so the generator runs on exactly what's on screen.
    this.generating.set(true); this.warnings.set([]); this.actionMsg.set('');
    this.saveConfig(() => {
      this.service.generate().subscribe({
        next: (res) => {
          this.generating.set(false);
          this.warnings.set(res?.warnings ?? []);
          const n = res?.generatedClassIds?.length ?? 0;
          this.actionOk.set((res?.warnings?.length ?? 0) === 0 && n > 0);
          this.actionMsg.set(n > 0 ? `Timetable generated for ${n} class(es).` : 'Nothing generated — see warnings.');
          this.loadPreview();
        },
        error: (err) => { this.generating.set(false); this.actionOk.set(false); this.actionMsg.set(this.msg(err, 'Generation failed.')); },
      });
    });
  }

  loadPreview(): void {
    if (!this.isAdmin) return;
    this.previewError.set(''); this.previewDay.set([]);
    this.service.getForClass(this.previewClassId, this.defaultSectionId).subscribe({
      next: (tt) => this.previewDay.set(this.oneDay(tt?.slots ?? [])),
      error: (err) => this.previewError.set(err?.status === 404
        ? 'No timetable generated for this class yet.'
        : 'Could not load this class\'s timetable.'),
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
