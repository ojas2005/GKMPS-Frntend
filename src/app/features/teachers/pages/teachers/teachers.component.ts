import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TeachersService, Staff, OnboardStaffForm } from '../../teachers.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, classNameById, sectionNameById } from '../../../../core/constants/classes';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Teachers &amp; Staff</h1>
          <p class="text-neutral-600 text-sm">Search by name or employee code, click a row for details, payouts &amp; attendance.</p>
        </div>
        <button (click)="showForm.set(!showForm())"
          class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Onboard Staff' }}
        </button>
      </div>

      <!-- Credentials banner shown after a successful onboarding -->
      <div *ngIf="lastCredentials()" class="bg-success-50 border border-success-200 rounded-xl p-4 flex items-start justify-between">
        <div class="text-sm text-success-800">
          <p class="font-semibold mb-1">Staff onboarded — hand these credentials to them:</p>
          <p>Login ID: <span class="font-mono font-bold">{{ lastCredentials()!.username }}</span>
             &nbsp;·&nbsp; Password: <span class="font-mono font-bold">{{ lastCredentials()!.password }}</span></p>
        </div>
        <button (click)="lastCredentials.set(null)" class="text-success-700 hover:text-success-900 text-sm">✕</button>
      </div>

      <!-- Search -->
      <div class="flex gap-3">
        <input [(ngModel)]="keyword" (keyup.enter)="load()" placeholder="Search by name or employee code..."
          class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
        <button (click)="load()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
      </div>

      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <p class="text-xs text-neutral-500 mb-4">You set the login ID &amp; password and give them to the teacher. Fields marked * are required.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Full name *</label>
            <input [(ngModel)]="form.fullName" placeholder="Meera Nair" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Designation *</label>
            <input [(ngModel)]="form.designation" placeholder="Teacher" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Login role *</label>
            <select [(ngModel)]="form.role" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="Teacher">Teacher</option>
              <option value="Accountant">Accountant</option>
              <option value="Librarian">Librarian</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Employee code</label>
            <input [(ngModel)]="form.employeeCode" placeholder="auto-generated if blank" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Login ID * (give this to the teacher)</label>
            <input [(ngModel)]="form.username" placeholder="e.g. meera.t" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Password * (min 8 characters)</label>
            <input [(ngModel)]="form.password" placeholder="e.g. Teacher@123" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Subjects taught (CSV)</label>
            <input [(ngModel)]="form.subjectsTaughtCsv" placeholder="Mathematics,Science" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Phone</label>
            <input [(ngModel)]="form.phone" placeholder="Optional" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Class teacher (head teacher) of</label>
            <select [(ngModel)]="form.classTeacherOfClassId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Not a class teacher</option>
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Section (if class teacher)</label>
            <select [(ngModel)]="form.classTeacherOfSectionId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">—</option>
              <option *ngFor="let s of sections" [value]="s.id">Section {{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Monthly salary (₹)</label>
            <input [(ngModel)]="form.monthlySalary" type="number" min="0" placeholder="e.g. 35000" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <p class="text-xs text-neutral-400 mt-1">Drives their pending-salary readout each month; editable later on their detail page.</p>
          </div>
        </div>
        <p class="text-xs text-neutral-500 mt-2">Only the class teacher of a class can upload that class's attendance and view its students.</p>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()"
            class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Onboard' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-5 space-y-3">
          <div *ngFor="let i of [1,2,3,4,5,6]" class="skeleton h-11"></div>
        </div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No staff yet.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr>
              <th class="px-6 py-3 font-medium">Name</th>
              <th class="px-6 py-3 font-medium">Designation</th>
              <th class="px-6 py-3 font-medium">Class teacher of</th>
              <th class="px-6 py-3 font-medium">Email</th>
              <th class="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of rows()" [routerLink]="['/teachers', s.id]"
                class="border-t border-neutral-200 hover:bg-neutral-50 cursor-pointer">
              <td class="px-6 py-3 font-medium text-neutral-900">{{ s.fullName }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ s.designation || '—' }}</td>
              <td class="px-6 py-3">
                <span *ngIf="s.classTeacherOfClassId" class="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                  {{ className(s.classTeacherOfClassId!) }}{{ s.classTeacherOfSectionId ? ' - ' + sectionName(s.classTeacherOfSectionId!) : '' }}
                </span>
                <span *ngIf="!s.classTeacherOfClassId" class="text-neutral-400">—</span>
              </td>
              <td class="px-6 py-3 text-neutral-600">{{ s.email || '—' }}</td>
              <td class="px-6 py-3 text-primary-600 text-right text-xs font-medium">View details →</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TeachersComponent implements OnInit {
  private service = inject(TeachersService);
  rows = signal<Staff[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  lastCredentials = signal<{ username: string; password: string } | null>(null);
  keyword = '';
  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;

  private blankForm(): OnboardStaffForm {
    return { fullName: '', designation: 'Teacher', role: 'Teacher', username: '', password: '',
      email: '', phone: '', employeeCode: '', subjectsTaughtCsv: '', classTeacherOfClassId: '', classTeacherOfSectionId: '',
      monthlySalary: 0 };
  }

  form: OnboardStaffForm = this.blankForm();

  fillSample(): void {
    const suffix = Date.now().toString(36).slice(-4);
    this.form = { fullName: 'Meera Nair', designation: 'Teacher', role: 'Teacher',
      username: `meera${suffix}`, password: 'Teacher@123',
      email: '', phone: '9876500011', employeeCode: '', subjectsTaughtCsv: 'Mathematics,Science',
      classTeacherOfClassId: '', classTeacherOfSectionId: '', monthlySalary: 35000 };
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.service.list({ keyword: this.keyword }).subscribe({
      next: (p) => { this.rows.set(p?.items ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load staff.')); this.loading.set(false); },
    });
  }

  save(): void {
    if (!this.form.fullName || !this.form.designation) { this.formError.set('Name and designation are required.'); return; }
    if (!this.form.username.trim() || (this.form.password ?? '').length < 8) {
      this.formError.set('A login ID and a password of at least 8 characters are required.'); return;
    }
    if (!!this.form.classTeacherOfClassId !== !!this.form.classTeacherOfSectionId) {
      this.formError.set('Pick both class AND section for a class teacher (or neither).'); return;
    }
    this.saving.set(true); this.formError.set('');
    this.service.onboardWithAccount(this.form).subscribe({
      next: (res) => {
        this.saving.set(false); this.showForm.set(false);
        this.lastCredentials.set(res.credentials);
        this.form = this.blankForm(); this.load();
      },
      error: (err) => { this.saving.set(false); this.formError.set(this.msg(err, 'Could not onboard.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the gateway on localhost:5100. Is the backend running?';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
