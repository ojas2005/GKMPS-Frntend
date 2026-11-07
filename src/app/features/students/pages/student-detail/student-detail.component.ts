import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService, Student, studentStatusLabel } from '../../students.service';
import { AttendanceService } from '../../../attendance/attendance.service';
import { StudentFeesComponent } from '../../../fees/components/student-fees.component';
import { ExaminationService, StudentResult } from '../../../examination/examination.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { UsersService } from '../../../../core/services/users.service';
import { ToastService } from '../../../../core/services/toast.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, classNameById, sectionNameById } from '../../../../core/constants/classes';
import { THEMED_FIELDS } from '../../../../shared/forms';

/**
 * Owner/staff view: everything about one student in one place — profile, attendance
 * percentage, the fee account (statement, payments, discounts, transport), and exam
 * results. Each panel loads independently so one failing service doesn't blank the page.
 */
@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, StudentFeesComponent, ...THEMED_FIELDS],
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
                &nbsp;·&nbsp; {{ statusLabel(s.status) }}
              </p>
              <p *ngIf="s.status === 'Removed'" class="text-sm text-neutral-500 mt-1">
                Removed{{ s.removedAtUtc ? ' on ' + (s.removedAtUtc | date:'mediumDate') : '' }}{{ s.removalReason ? ' — ' + s.removalReason : '' }}
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
            <div><span class="text-neutral-500 block text-xs">Address</span>{{ s.address || '—' }}</div>
            <div></div>
            <ng-container *ngIf="s.fatherName || s.motherName; else legacyGuardian">
              <div><span class="text-neutral-500 block text-xs">Father</span>{{ s.fatherName || '—' }}</div>
              <div><span class="text-neutral-500 block text-xs">Father's mobile</span>{{ s.fatherPhone || '—' }}
                <span *ngIf="s.fatherEmail" class="block text-xs text-neutral-500">{{ s.fatherEmail }}</span></div>
              <div><span class="text-neutral-500 block text-xs">Mother</span>{{ s.motherName || '—' }}</div>
              <div><span class="text-neutral-500 block text-xs">Mother's mobile</span>{{ s.motherPhone || '—' }}
                <span *ngIf="s.motherEmail" class="block text-xs text-neutral-500">{{ s.motherEmail }}</span></div>
            </ng-container>
            <ng-template #legacyGuardian>
              <div><span class="text-neutral-500 block text-xs">Guardian</span>{{ s.parentName || '—' }}</div>
              <div><span class="text-neutral-500 block text-xs">Guardian phone</span>{{ s.parentPhone || '—' }}</div>
              <p *ngIf="canManageAccount()" class="col-span-2 text-xs text-warning-700">Father's and mother's details are missing — add them with "Edit details".</p>
            </ng-template>
          </div>

          <!-- Edit details (Admin/Principal/SuperAdmin only) -->
          <div *ngIf="canManageAccount()" class="mt-4 pt-4 border-t border-neutral-200">
            <button *ngIf="!showEditForm()" (click)="startEdit(s)" type="button"
              class="text-primary-600 hover:text-primary-700 text-sm font-medium">Edit details</button>
            <div *ngIf="showEditForm()" class="reveal-panel">
              <h3 class="text-sm font-semibold text-neutral-900 mb-1">Edit student details</h3>
              <p class="text-xs text-neutral-500 mb-3">Everything collected at admission. The parent login is managed below.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f1">Full name *</label>
                  <input id="student-detail-f1" [(ngModel)]="editForm.fullName" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f2">Admission number *</label>
                  <input id="student-detail-f2" [(ngModel)]="editForm.admissionNumber" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f3">Date of birth *</label>
                  <input id="student-detail-f3" [(ngModel)]="editForm.dateOfBirth" type="date" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f4">Gender *</label>
                  <select id="student-detail-f4" [(ngModel)]="editForm.gender" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f5">Class *</label>
                  <select id="student-detail-f5" [(ngModel)]="editForm.classId" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f6">Section *</label>
                  <select id="student-detail-f6" [(ngModel)]="editForm.sectionId" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option *ngFor="let sec of sections" [value]="sec.id">Section {{ sec.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f7">Father's name *</label>
                  <input id="student-detail-f7" [(ngModel)]="editForm.fatherName" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f8">Father's mobile number *</label>
                  <input id="student-detail-f8" [(ngModel)]="editForm.fatherPhone" type="tel" inputmode="numeric" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f9">Father's email</label>
                  <input id="student-detail-f9" [(ngModel)]="editForm.fatherEmail" type="email" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f11">Mother's name *</label>
                  <input id="student-detail-f11" [(ngModel)]="editForm.motherName" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f15">Mother's mobile number *</label>
                  <input id="student-detail-f15" [(ngModel)]="editForm.motherPhone" type="tel" inputmode="numeric" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f16">Mother's email</label>
                  <input id="student-detail-f16" [(ngModel)]="editForm.motherEmail" type="email" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f10">Address</label>
                  <input id="student-detail-f10" [(ngModel)]="editForm.address" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
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

            </div>
          </div>

          <!-- Parent login (Admin/Principal/SuperAdmin only) -->
          <div *ngIf="canManageAccount()" class="mt-4 pt-4 border-t border-neutral-200">
            <h3 class="text-sm font-semibold text-neutral-900 mb-1">Parent login</h3>
            <ng-container *ngIf="s.parentUserId; else noParent">
              <p class="text-sm text-neutral-700">
                Login ID: <span class="font-mono">{{ parentLoginId() || '…' }}</span>
                <span class="text-xs text-neutral-500"> — the parent sees this student's attendance, results and fees.</span>
              </p>
              <div *ngIf="parentCredentials() as pc" class="mt-3 bg-success-50 border border-success-500 rounded-xl p-3 text-sm text-success-800">
                Hand these to the parent — Login ID: <span class="font-mono font-bold">{{ pc.username }}</span>
                &nbsp;·&nbsp; Password: <span class="font-mono font-bold">{{ pc.password }}</span>
              </div>
              <div class="mt-2 flex flex-wrap items-end gap-3">
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f12">New parent password</label>
                  <input id="student-detail-f12" [(ngModel)]="parentNewPassword" type="text" class="w-56 px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <button (click)="resetParentPassword(s)" [disabled]="parentBusy()"
                  class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50 disabled:text-neutral-400">Reset password</button>
                <button (click)="unlinkParent(s)" [disabled]="parentBusy()"
                  class="px-4 py-2 text-error-600 hover:text-error-700 text-sm disabled:text-neutral-400">Unlink</button>
              </div>
            </ng-container>
            <ng-template #noParent>
              <p class="text-xs text-neutral-500 mb-2">No parent login yet. Create one so the parent can follow attendance, results and fees.</p>
              <div class="flex flex-wrap items-end gap-3">
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f13">Parent login ID *</label>
                  <input id="student-detail-f13" [(ngModel)]="parentForm.username" class="w-56 px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1" for="student-detail-f14">Password (min 10 chars) *</label>
                  <input id="student-detail-f14" [(ngModel)]="parentForm.password" type="text" class="w-56 px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <button (click)="createParentLogin(s)" [disabled]="parentBusy()"
                  class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                  {{ parentBusy() ? 'Saving...' : 'Create parent login' }}
                </button>
              </div>
            </ng-template>
            <p *ngIf="parentMsg()" class="mt-2 text-sm text-error-600">{{ parentMsg() }}</p>
          </div>
        </div>

        <!-- Fees: statement, payments, discounts, transport, history -->
        <app-student-fees [student]="s" />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        </div>

        <!-- Remove from the rolls / bring back (office) -->
        <div *ngIf="canManageAccount() && s.status === 'Active'" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900">Remove student</h2>
          <p class="text-sm text-neutral-600 mt-1">
            Takes {{ s.fullName }} off the rolls: they leave class lists, attendance registers and fee
            lists, and the parent login stops working (unless a brother or sister still uses it).
            Their records are kept and you can bring them back later. To give a transfer
            certificate instead, use the Transfer certificate section.
          </p>
          <button *ngIf="!showRemove()" type="button" (click)="showRemove.set(true)"
            class="mt-4 px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50">
            Remove student…
          </button>
          <div *ngIf="showRemove()" class="reveal-panel mt-4">
            <label for="remove-reason" class="block text-xs text-neutral-500 mb-1">Reason (optional)</label>
            <input id="remove-reason" [(ngModel)]="removeReason" maxlength="500" placeholder="e.g. Left the school, fees unpaid since April"
              class="w-full max-w-lg px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            <div class="flex gap-2 mt-3">
              <button type="button" (click)="removeStudent(s)" [disabled]="rosterBusy()"
                class="px-4 py-2 rounded-lg bg-error-600 text-white text-sm font-medium hover:bg-error-700 disabled:opacity-50">
                {{ rosterBusy() ? 'Removing…' : 'Remove ' + s.fullName }}
              </button>
              <button type="button" (click)="showRemove.set(false); removeReason = ''"
                class="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 text-sm">Cancel</button>
            </div>
          </div>
          <p *ngIf="rosterMsg()" class="text-sm text-error-600 mt-2" role="alert">{{ rosterMsg() }}</p>
        </div>
        <div *ngIf="canManageAccount() && s.status === 'Removed'" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-neutral-600">{{ s.fullName }} has been removed. Bring them back to put them on the rolls again and switch the parent login back on.</p>
          <button type="button" (click)="restoreStudent(s)" [disabled]="rosterBusy()"
            class="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
            {{ rosterBusy() ? 'Restoring…' : 'Restore student' }}
          </button>
          <p *ngIf="rosterMsg()" class="w-full text-sm text-error-600" role="alert">{{ rosterMsg() }}</p>
        </div>

        <!-- Right to erasure: only once the student has left -->
        <div *ngIf="canErase() && (s.status === 'TransferredOut' || s.status === 'Removed')" class="bg-white rounded-xl shadow-sm border border-error-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900">Erase personal data</h2>
          <p class="text-sm text-neutral-600 mt-1">
            {{ s.fullName }} has left the school. If the family asks, you can erase their personal
            details. This removes the name, date of birth, gender, address and both parents'
            details, and closes the parent login unless a brother or sister still uses it. Transfer certificates and report cards are deleted. Marks, attendance and fee
            records stay, under the admission number only. <strong>This can't be undone.</strong>
          </p>
          <ng-container *ngIf="!showErase(); else eraseForm">
            <button type="button" (click)="showErase.set(true)"
              class="mt-4 px-4 py-2 rounded-lg border border-error-300 text-error-700 text-sm font-medium hover:bg-error-50">
              Erase personal data…
            </button>
          </ng-container>
          <ng-template #eraseForm>
            <label for="erase-confirm" class="block text-sm text-neutral-700 mt-4">
              Type the admission number <span class="font-mono font-semibold">{{ s.admissionNumber }}</span> to confirm
            </label>
            <input id="erase-confirm" [(ngModel)]="eraseConfirm" autocomplete="off"
              class="mt-1 w-full max-w-xs px-3 py-2 border border-neutral-300 rounded-lg text-sm font-mono">
            <div class="flex gap-2 mt-3">
              <button type="button" (click)="erase(s)" [disabled]="erasing() || !eraseMatches(s)"
                class="px-4 py-2 rounded-lg bg-error-600 text-white text-sm font-medium hover:bg-error-700 disabled:opacity-50">
                {{ erasing() ? 'Erasing…' : 'Erase permanently' }}
              </button>
              <button type="button" (click)="showErase.set(false); eraseConfirm = ''"
                class="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 text-sm">Cancel</button>
            </div>
            <p *ngIf="eraseMsg()" class="text-sm text-error-600 mt-2" role="alert">{{ eraseMsg() }}</p>
          </ng-template>
        </div>
        <p *ngIf="s.status === 'Erased'" class="text-sm text-neutral-500">
          This former student's personal data has been erased.
        </p>
      </ng-container>
    </div>
  `,
})
export class StudentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private studentsService = inject(StudentsService);
  private attendanceService = inject(AttendanceService);
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
  results = signal<StudentResult[]>([]);
  resultsError = signal('');

  canManageAccount = (): boolean => this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');
  canErase = (): boolean => this.auth.hasRole('SuperAdmin', 'Principal');
  showErase = signal(false);
  eraseConfirm = '';
  erasing = signal(false);
  eraseMsg = signal('');

  // The login ID is fine to display (it's an identifier, not a secret) and is fetched
  // once from Identity.API. The password is the opposite: never retrievable once set
  // (one-way hashed), so this only ever holds a password the owner just typed THIS
  // session, immediately after a successful reset -- never anything read from storage.

  parentLoginId = signal<string | null>(null);
  parentCredentials = signal<{ username: string; password: string } | null>(null);
  parentForm = { username: '', password: '' };
  parentNewPassword = '';
  parentBusy = signal(false);
  parentMsg = signal('');

  showRemove = signal(false);
  removeReason = '';
  rosterBusy = signal(false);
  rosterMsg = signal('');
  statusLabel = studentStatusLabel;

  showEditForm = signal(false);
  editForm = {
    admissionNumber: '', fullName: '', dateOfBirth: '', gender: '', classId: '', sectionId: '',
    fatherName: '', fatherPhone: '', fatherEmail: '', motherName: '', motherPhone: '', motherEmail: '', address: '',
  };
  savingEdit = signal(false);
  editMsg = signal('');
  editOk = signal(false);

  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;

  dob = (s: Student): string | null => (s['dateOfBirthUtc'] as string) || (s['dateOfBirth'] as string) || null;
  pctClass = (): string => {
    const p = this.attendancePct();
    return p === null ? 'text-neutral-500' : p >= 75 ? 'text-success-600' : 'text-error-600';
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
        this.loadParentLogin(s);
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
    this.examsService.studentResults(id).subscribe({
      next: (list) => this.results.set(list ?? []),
      error: (err) => this.resultsError.set(this.msg(err, 'Failed to load results.')),
    });
  }

  startEdit(s: Student): void {
    this.editForm = {
      admissionNumber: s.admissionNumber ?? '',
      fullName: s.fullName ?? '',
      dateOfBirth: (this.dob(s) ?? '').slice(0, 10),
      gender: (s['gender'] as string) ?? '',
      classId: s.classId ?? '',
      sectionId: s.sectionId ?? '',
      // Older records kept one guardian; offer it as the father's details to start from.
      fatherName: s.fatherName ?? s.parentName ?? '',
      fatherPhone: s.fatherPhone ?? s.parentPhone ?? '',
      fatherEmail: s.fatherEmail ?? s.parentEmail ?? '',
      motherName: s.motherName ?? '',
      motherPhone: s.motherPhone ?? '',
      motherEmail: s.motherEmail ?? '',
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
    if (!f.fatherName.trim() || !f.fatherPhone.trim() || !f.motherName.trim() || !f.motherPhone.trim()) {
      this.editOk.set(false); this.editMsg.set("Father's and mother's name and mobile number are required.");
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
      fatherName: f.fatherName.trim(),
      fatherPhone: f.fatherPhone.trim(),
      fatherEmail: f.fatherEmail.trim() || undefined,
      motherName: f.motherName.trim(),
      motherPhone: f.motherPhone.trim(),
      motherEmail: f.motherEmail.trim() || undefined,
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

  removeStudent(s: Student): void {
    this.rosterBusy.set(true); this.rosterMsg.set('');
    this.studentsService.remove(s.id, this.removeReason).subscribe({
      next: (updated) => {
        this.rosterBusy.set(false); this.showRemove.set(false); this.removeReason = '';
        this.student.set(updated);
        this.toast.success(`${s.fullName} removed.`);
      },
      error: (err) => { this.rosterBusy.set(false); this.rosterMsg.set(this.msg(err, 'Could not remove the student.')); },
    });
  }

  restoreStudent(s: Student): void {
    this.rosterBusy.set(true); this.rosterMsg.set('');
    this.studentsService.restore(s.id).subscribe({
      next: (updated) => {
        this.rosterBusy.set(false);
        this.student.set(updated);
        this.toast.success(`${s.fullName} is back on the rolls.`);
      },
      error: (err) => { this.rosterBusy.set(false); this.rosterMsg.set(this.msg(err, 'Could not restore the student.')); },
    });
  }

  private loadParentLogin(s: Student): void {
    this.parentLoginId.set(null);
    if (!s.parentUserId || !this.canManageAccount()) return;
    this.usersService.get(s.parentUserId).subscribe({
      next: (u) => this.parentLoginId.set((u['username'] as string) || u.email),
      error: () => this.parentLoginId.set('(account not found)'),
    });
  }

  createParentLogin(s: Student): void {
    const username = this.parentForm.username.trim();
    const password = this.parentForm.password;
    if (!username || password.length < 10) {
      this.parentMsg.set('Enter a login ID and a password of at least 10 characters.'); return;
    }
    this.parentBusy.set(true); this.parentMsg.set('');
    this.studentsService.createParentLogin(s, username, password).subscribe({
      next: (updated) => {
        this.parentBusy.set(false);
        this.student.set({ ...s, parentUserId: updated.parentUserId });
        this.parentCredentials.set({ username, password });
        this.parentForm = { username: '', password: '' };
        this.loadParentLogin({ ...s, parentUserId: updated.parentUserId });
        this.toast.success('Parent login created.');
      },
      error: (err) => { this.parentBusy.set(false); this.parentMsg.set(this.msg(err, 'Could not create the parent login.')); },
    });
  }

  resetParentPassword(s: Student): void {
    if (!s.parentUserId) return;
    const password = this.parentNewPassword;
    if (password.length < 10) { this.parentMsg.set('Password must be at least 10 characters.'); return; }
    this.parentBusy.set(true); this.parentMsg.set('');
    this.usersService.setPassword(s.parentUserId, password).subscribe({
      next: () => {
        this.parentBusy.set(false);
        this.parentCredentials.set({ username: this.parentLoginId() ?? '', password });
        this.parentNewPassword = '';
        this.toast.success('Parent password reset.');
      },
      error: (err) => { this.parentBusy.set(false); this.parentMsg.set(this.msg(err, 'Could not reset the parent password.')); },
    });
  }

  unlinkParent(s: Student): void {
    this.parentBusy.set(true); this.parentMsg.set('');
    this.studentsService.linkParent(s.id, null).subscribe({
      next: () => {
        this.parentBusy.set(false);
        this.student.set({ ...s, parentUserId: null });
        this.parentCredentials.set(null);
        this.toast.success('Parent login unlinked. Deactivate the account from Settings if it is no longer needed.');
      },
      error: (err) => { this.parentBusy.set(false); this.parentMsg.set(this.msg(err, 'Could not unlink the parent login.')); },
    });
  }

  eraseMatches(s: Student): boolean {
    return !!s.admissionNumber && this.eraseConfirm.trim().toLowerCase() === s.admissionNumber.toLowerCase();
  }

  erase(s: Student): void {
    if (!this.eraseMatches(s)) return;
    this.erasing.set(true); this.eraseMsg.set('');
    this.studentsService.erasePersonalData(this.id, this.eraseConfirm.trim()).subscribe({
      next: () => {
        this.erasing.set(false); this.showErase.set(false); this.eraseConfirm = '';
        this.toast.success('Personal data erased.');
        this.studentsService.get(this.id).subscribe({ next: (st) => this.student.set(st) });
      },
      error: (err) => {
        this.erasing.set(false);
        this.eraseMsg.set(this.msg(err, 'Could not erase the personal data.'));
      },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
