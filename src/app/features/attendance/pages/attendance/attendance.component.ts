import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService, AttendanceRecord } from '../../attendance.service';
import { StudentsService, Student } from '../../../students/students.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, DEFAULT_CLASS, DEFAULT_SECTION, classNameById, sectionNameById } from '../../../../core/constants/classes';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">{{ selfService ? (parentView ? "My Child's Attendance" : 'My Attendance') : 'Attendance' }}</h1>
        <p class="text-neutral-600 text-sm">
          {{ selfService ? (parentView ? "Your child's attendance percentage and daily log." : 'Your attendance percentage and daily log.') :
             (isTeacher ? 'Mark attendance for your class (class teachers only).' : 'View a class register or mark students.') }}
        </p>
      </div>

      <!-- Self-service: my attendance -->
      <ng-container *ngIf="selfService">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-xs text-neutral-500 mb-1">From</label>
              <input [(ngModel)]="fromDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1">To</label>
              <input [(ngModel)]="toDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <button (click)="loadMine()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Refresh</button>
            <div class="text-3xl font-bold text-neutral-900">{{ myPct() !== null ? (myPct() + '%') : '—' }}</div>
          </div>
          <p *ngIf="error()" class="text-error-600 text-sm mt-2">{{ error() }}</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Daily log</h2>
          <p *ngIf="myRecords().length === 0" class="text-neutral-500 text-sm">No attendance records in this window.</p>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let r of myRecords()"
              class="px-2.5 py-1 rounded-lg text-xs font-medium"
              [class]="r.status === 'Present' ? 'bg-success-50 text-success-700' : (r.status === 'Late' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
              {{ r.date }} · {{ r.status }}
            </span>
          </div>
        </div>
      </ng-container>

      <!-- Staff/teacher -->
      <ng-container *ngIf="!selfService">

      <!-- Teacher without a class-teacher assignment -->
      <div *ngIf="isTeacher && !classTeacherClassId" class="bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm">
        You are not a class teacher (head teacher) of any class, so you cannot upload attendance.
        Ask the school owner to assign you a class on the Teachers page. If you were just assigned, log out and back in.
      </div>

      <ng-container *ngIf="!isTeacher || classTeacherClassId">
      <!-- Filters -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select [(ngModel)]="classId" [disabled]="isTeacher" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white disabled:bg-neutral-100">
          <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
        </select>
        <select [(ngModel)]="sectionId" [disabled]="isTeacher" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white disabled:bg-neutral-100">
          <option *ngFor="let s of sections" [value]="s.id">Section {{ s.name }}</option>
        </select>
        <input [(ngModel)]="date" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        <button (click)="load(); loadRoster()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Load register</button>
      </div>
      <p *ngIf="isTeacher" class="text-xs text-neutral-500 -mt-3">
        Locked to your class: <span class="font-medium">{{ className(classId) }} - {{ sectionName(sectionId) }}</span>
      </p>

      <!-- Mark by roster: one row per student, one tap to mark -->
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div class="p-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-neutral-900">Mark today's attendance</h2>
          <span *ngIf="okMsg()" class="text-success-600 text-sm">{{ okMsg() }}</span>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
        <div *ngIf="rosterLoading()" class="p-8 text-center text-neutral-500">Loading students...</div>
        <div *ngIf="!rosterLoading() && roster().length === 0" class="p-8 text-center text-neutral-500">No students in this class/section.</div>
        <table *ngIf="!rosterLoading() && roster().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Student</th><th class="px-6 py-3 font-medium">Admission #</th><th class="px-6 py-3 font-medium">Today</th><th class="px-6 py-3 font-medium text-right">Mark</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let st of roster()" class="border-t border-neutral-200">
              <td class="px-6 py-3 font-medium text-neutral-900">{{ st.fullName }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ st.admissionNumber || '—' }}</td>
              <td class="px-6 py-3">
                <span *ngIf="statusFor(st.id) as status"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  [class]="status === 'Present' ? 'bg-success-50 text-success-700' : (status === 'Late' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
                  {{ status }}
                </span>
                <span *ngIf="!statusFor(st.id)" class="text-neutral-400 text-xs">not marked</span>
              </td>
              <td class="px-6 py-3 text-right space-x-1">
                <button (click)="markStudent(st.id, 'Present')" [disabled]="!!statusFor(st.id) || saving()"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium bg-success-50 text-success-700 hover:bg-success-100 disabled:opacity-40">P</button>
                <button (click)="markStudent(st.id, 'Absent')" [disabled]="!!statusFor(st.id) || saving()"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium bg-error-50 text-error-700 hover:bg-error-100 disabled:opacity-40">A</button>
                <button (click)="markStudent(st.id, 'Late')" [disabled]="!!statusFor(st.id) || saving()"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium bg-warning-50 text-warning-700 hover:bg-warning-100 disabled:opacity-40">L</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </ng-container>
      </ng-container>
    </div>
  `,
})
export class AttendanceComponent implements OnInit {
  private service = inject(AttendanceService);
  private studentsService = inject(StudentsService);
  private auth = inject(AuthService);

  selfService = this.auth.isSelfService();

  parentView = this.auth.isParentView();
  isTeacher = this.auth.hasRole('Teacher');
  classTeacherClassId = this.auth.classTeacherClassId();

  myPct = signal<number | null>(null);
  myRecords = signal<AttendanceRecord[]>([]);
  fromDate = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  toDate = new Date().toISOString().slice(0, 10);

  rows = signal<AttendanceRecord[]>([]);
  roster = signal<Student[]>([]);
  rosterLoading = signal(false);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  okMsg = signal('');
  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;

  // Teachers are locked to the class/section they are the class teacher of.
  classId = this.isTeacher ? (this.auth.classTeacherClassId() ?? DEFAULT_CLASS.id) : DEFAULT_CLASS.id;
  sectionId = this.isTeacher ? (this.auth.classTeacherSectionId() ?? DEFAULT_SECTION.id) : DEFAULT_SECTION.id;
  date = new Date().toISOString().slice(0, 10);

  ngOnInit(): void {
    if (this.selfService) {
      this.loadMine();
    } else if (!this.isTeacher || this.classTeacherClassId) {
      this.load();
      this.loadRoster();
    }
  }

  loadMine(): void {
    const id = this.auth.studentId();
    if (!id) { this.error.set('Your account is not linked to a student record yet.'); return; }
    this.error.set('');
    this.service.studentPercentage(id, this.fromDate, this.toDate).subscribe({
      next: (r: any) => this.myPct.set(Math.round((r?.percentage ?? 0) * 10) / 10),
      error: (err) => this.error.set(this.msg(err, 'Failed to load your attendance.')),
    });
    this.service.studentRecords(id, this.fromDate, this.toDate).subscribe({
      next: (list) => this.myRecords.set(list ?? []),
      error: () => {},
    });
  }

  load(): void {
    if (!this.classId || !this.sectionId) { this.error.set('Class and section are required.'); return; }
    this.loading.set(true); this.error.set('');
    this.service.getClass(this.classId, this.sectionId, this.date).subscribe({
      next: (list) => { this.rows.set(list ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load register.')); this.loading.set(false); },
    });
  }

  loadRoster(): void {
    this.rosterLoading.set(true);
    this.studentsService.list({ classId: this.classId, sectionId: this.sectionId, pageSize: 100 }).subscribe({
      next: (page) => { this.roster.set(page?.items ?? []); this.rosterLoading.set(false); },
      error: () => this.rosterLoading.set(false),
    });
  }

  // Today's status for a student, from the loaded register.
  statusFor(studentId: string): string | null {
    return (this.rows().find((r) => r.studentId === studentId)?.status as string) ?? null;
  }

  markStudent(studentId: string, status: string): void {
    this.saving.set(true); this.formError.set(''); this.okMsg.set('');
    this.service.mark({
      studentId,
      classId: this.classId,
      sectionId: this.sectionId,
      date: this.date,
      status,
    }).subscribe({
      next: () => { this.saving.set(false); this.okMsg.set('Marked.'); this.load(); },
      error: (err) => { this.saving.set(false); this.formError.set(this.msg(err, 'Could not mark.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
