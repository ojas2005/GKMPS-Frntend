import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentsService, Student, AdmitStudentForm, Credentials } from '../../students.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, DEFAULT_CLASS, DEFAULT_SECTION, classNameById, sectionNameById } from '../../../../core/constants/classes';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Students</h1>
          <p class="text-neutral-600 text-sm">Search by name or admission number, click a row for full details &amp; analytics.</p>
        </div>
        <button *ngIf="canAdmit" (click)="showForm.set(!showForm())"
          class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Admit Student' }}
        </button>
      </div>

      <!-- Credentials banner shown after a successful admission -->
      <div *ngIf="lastCredentials()" class="bg-success-50 border border-success-500 rounded-xl p-4 flex items-start justify-between">
        <div class="text-sm text-success-700">
          <p class="font-semibold mb-1">Student admitted — hand these credentials to them:</p>
          <p>Login ID: <span class="font-mono font-bold">{{ lastCredentials()!.username }}</span>
             &nbsp;·&nbsp; Password: <span class="font-mono font-bold">{{ lastCredentials()!.password }}</span></p>
          <p *ngIf="lastCredentials()!.parent as p" class="mt-1">Parent login ID: <span class="font-mono font-bold">{{ p.username }}</span>
             &nbsp;·&nbsp; Password: <span class="font-mono font-bold">{{ p.password }}</span></p>
          <p class="text-xs mt-1 text-success-700">They sign in at this site with these — no registration needed.</p>
        </div>
        <button (click)="lastCredentials.set(null)" class="text-success-700 hover:text-success-900 text-sm">✕</button>
      </div>

      <!-- Search -->
      <div class="flex gap-3">
        <input [(ngModel)]="keyword" (keyup.enter)="load()" placeholder="Search by name or admission number..."
          class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
        <button (click)="load()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
      </div>

      <!-- Admit form -->
      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-1">Admit New Student</h2>
        <p class="text-xs text-neutral-500 mb-4">You set the login ID &amp; password and give them to the student. Fields marked * are required.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Full name *</label>
            <input [(ngModel)]="form.fullName" placeholder="Aarav Sharma" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Date of birth *</label>
            <input [(ngModel)]="form.dateOfBirth" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Gender *</label>
            <select [(ngModel)]="form.gender" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Admission number</label>
            <input [(ngModel)]="form.admissionNumber" placeholder="auto-generated if blank" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Class *</label>
            <select [(ngModel)]="form.classId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Section *</label>
            <select [(ngModel)]="form.sectionId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let s of sections" [value]="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Login ID * (give this to the student)</label>
            <input [(ngModel)]="form.username" placeholder="e.g. aarav2026" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Password * (min 8 characters)</label>
            <input [(ngModel)]="form.password" placeholder="e.g. Student@123" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Parent name</label>
            <input [(ngModel)]="form.parentName" placeholder="Optional" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Parent phone</label>
            <input [(ngModel)]="form.parentPhone" placeholder="Optional" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Parent email</label>
            <input [(ngModel)]="form.parentEmail" type="email" placeholder="Optional — admission confirmation is sent here" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div class="md:col-span-2 border-t border-neutral-200 pt-4">
            <p class="text-sm font-medium text-neutral-900">Parent login <span class="font-normal text-neutral-500">(optional)</span></p>
            <p class="text-xs text-neutral-500">Lets the parent see this student's attendance, results and fees. Leave blank to skip; you can add it later from the student's page.</p>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Parent login ID</label>
            <input [(ngModel)]="form.parentUsername" placeholder="e.g. aarav2026.parent" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Parent password (min 8 characters)</label>
            <input [(ngModel)]="form.parentPassword" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Pending fee at admission (₹)</label>
            <input [(ngModel)]="form.pendingFee" type="number" min="0" placeholder="0 if none" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <p class="text-xs text-neutral-400 mt-1">Added on top of the class's fee structure. Their upcoming class fees are assessed automatically.</p>
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
          {{ canAdmit ? 'No students found. Admit one to get started.' : 'No students found.' }}
        </div>
        <table *ngIf="!loading() && !error() && students().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr>
              <th class="px-6 py-3 font-medium">Name</th>
              <th class="px-6 py-3 font-medium">Class</th>
              <th class="px-6 py-3 font-medium">Admission #</th>
              <th class="px-6 py-3 font-medium">Guardian</th>
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
              <td class="px-6 py-3 text-neutral-600">{{ s.parentName || '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ s.status || 'Active' }}</td>
              <td class="px-6 py-3 text-primary-600 text-right text-xs font-medium">View details →</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class StudentsComponent implements OnInit {
  private service = inject(StudentsService);
  private auth = inject(AuthService);

  // Admission is an office action (the API rejects teachers).
  readonly canAdmit = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');

  students = signal<Student[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  lastCredentials = signal<(Credentials & { parent?: Credentials }) | null>(null);
  keyword = '';

  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;

  private blankForm(): AdmitStudentForm {
    return { fullName: '', dateOfBirth: '', gender: 'Male', classId: DEFAULT_CLASS.id, sectionId: DEFAULT_SECTION.id,
      username: '', password: '', admissionNumber: '', email: '', parentName: '', parentEmail: '', parentPhone: '',
      parentUsername: '', parentPassword: '', pendingFee: 0 };
  }

  form: AdmitStudentForm = this.blankForm();

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.service.list({ keyword: this.keyword }).subscribe({
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

  admit(): void {
    if (!this.form.fullName || !this.form.dateOfBirth || !this.form.gender || !this.form.classId || !this.form.sectionId) {
      this.formError.set('Full name, date of birth, gender, class and section are required.');
      return;
    }
    if (!this.form.username.trim() || (this.form.password ?? '').length < 8) {
      this.formError.set('A login ID and a password of at least 8 characters are required.');
      return;
    }
    if (this.form.parentUsername?.trim() && (this.form.parentPassword ?? '').length < 8) {
      this.formError.set('The parent login needs a password of at least 8 characters.');
      return;
    }
    this.saving.set(true);
    this.formError.set('');
    this.service.admitWithAccount(this.form).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.showForm.set(false);
        this.lastCredentials.set({ ...res.credentials, parent: res.parentCredentials });
        this.form = this.blankForm();
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
