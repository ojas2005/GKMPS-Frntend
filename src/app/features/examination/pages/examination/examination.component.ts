import { Component, OnInit, inject, signal } from '@angular/core';
import { openDownload } from '../../../../core/config/runtime-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExaminationService, Exam, StudentResult } from '../../examination.service';
import { AcademicsService, Subject } from '../../../academics/academics.service';
import { SCHOOL_CLASSES, DEFAULT_CLASS, classNameById } from '../../../../core/constants/classes';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-examination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">{{ selfService ? (parentView ? "My Child's Results" : 'My Results') : 'Examinations' }}</h1>
          <p class="text-neutral-600 text-sm">{{ selfService ? (parentView ? "Your child's published exam results and report cards." : 'Your published exam results and report cards.') : 'Exams, marks and report cards.' }}</p>
        </div>
        <button *ngIf="!selfService" (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ New Exam' }}
        </button>
      </div>

      <!-- Student: my results -->
      <div *ngIf="selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="resultsError()" class="p-8 text-center text-error-600">{{ resultsError() }}</div>
        <div *ngIf="!resultsError() && myResults().length === 0" class="p-8 text-center text-neutral-500">
          No published results yet — check back after your school publishes them.
        </div>
        <table *ngIf="myResults().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr>
              <th class="px-6 py-3 font-medium">Exam</th>
              <th class="px-6 py-3 font-medium">Date</th>
              <th class="px-6 py-3 font-medium">Marks</th>
              <th class="px-6 py-3 font-medium">Result</th>
              <th class="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of myResults()" class="border-t border-neutral-200">
              <td class="px-6 py-3 font-medium text-neutral-900">{{ r.examName }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ r.examDateUtc | date:'mediumDate' }}</td>
              <td class="px-6 py-3 text-neutral-900">{{ r.marksObtained }} / {{ r.maxMarks }}</td>
              <td class="px-6 py-3 font-medium" [class]="r.marksObtained >= r.passingMarks ? 'text-success-600' : 'text-error-600'">
                {{ r.marksObtained >= r.passingMarks ? 'Pass' : 'Fail' }}{{ r.grade ? ' (' + r.grade + ')' : '' }}
              </td>
              <td class="px-6 py-3 text-right">
                <button (click)="downloadReportCard(r)" class="text-primary-600 hover:text-primary-700 text-sm font-medium">Report card</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="!selfService && showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="examination-f1">Exam name *</label>
            <input id="examination-f1" [(ngModel)]="form.name" placeholder="Unit Test 1" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="examination-f2">Class *</label>
            <select id="examination-f2" [(ngModel)]="form.classId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="examination-f3">Subject *</label>
            <select id="examination-f3" [(ngModel)]="form.subjectId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Select subject</option>
              <option *ngFor="let s of subjectsForClass()" [value]="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="examination-f4">Exam date *</label>
            <input id="examination-f4" [(ngModel)]="form.examDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="examination-f5">Max marks *</label>
            <input id="examination-f5" [(ngModel)]="form.maxMarks" type="number" placeholder="100" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1" for="examination-f6">Passing marks *</label>
            <input id="examination-f6" [(ngModel)]="form.passingMarks" type="number" placeholder="35" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Create' }}
          </button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
        <p *ngIf="subjectsForClass().length === 0" class="text-xs text-warning-600 mt-2">This class has no subjects yet — add one on the Academics page first (exams need a subject).</p>
      </div>

      <div *ngIf="!selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No exams.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Name</th><th class="px-6 py-3 font-medium">Class</th><th class="px-6 py-3 font-medium">Date</th><th class="px-6 py-3 font-medium">Max</th><th class="px-6 py-3 font-medium">Status</th><th class="px-6 py-3 font-medium"></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of rows()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ e.name }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ examClass(e.classId) }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ e.examDateUtc ? (e.examDateUtc | date: 'mediumDate') : '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ e.maxMarks ?? '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ e.isPublished ? 'Published' : 'Draft' }}</td>
              <td class="px-6 py-3 text-right">
                <button *ngIf="!e.isPublished" (click)="publish(e)" class="text-primary-600 hover:text-primary-700 text-sm font-medium">Publish</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ExaminationComponent implements OnInit {
  private service = inject(ExaminationService);
  private academics = inject(AcademicsService);
  private auth = inject(AuthService);
  selfService = this.auth.isSelfService();
  parentView = this.auth.isParentView();
  myResults = signal<StudentResult[]>([]);
  resultsError = signal('');
  rows = signal<Exam[]>([]);
  subjects = signal<Subject[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  classes = SCHOOL_CLASSES;
  form = { name: '', classId: DEFAULT_CLASS.id, subjectId: '', examDate: '', maxMarks: 100, passingMarks: 35 };

  examClass = (id?: string | null) => classNameById(id ?? undefined);

  // The subject list holds every class's subjects; only offer the chosen class's ones.
  subjectsForClass = () => this.subjects().filter((s) => !s.classId || s.classId === this.form.classId);

  ngOnInit(): void {
    if (this.selfService) {
      this.loadMyResults();
      return;
    }
    this.load();
    this.academics.listSubjects().subscribe({ next: (s) => this.subjects.set(s ?? []), error: () => {} });
  }

  loadMyResults(): void {
    const id = this.auth.studentId();
    if (!id) { this.resultsError.set('Your account is not linked to a student record yet.'); return; }
    this.service.studentResults(id).subscribe({
      next: (list) => this.myResults.set(list ?? []),
      error: (err) => this.resultsError.set(this.msg(err, 'Failed to load your results.')),
    });
  }

  downloadReportCard(r: StudentResult): void {
    const id = this.auth.studentId();
    if (!id) return;
    this.service.reportCard(r.examId, id).subscribe({
      next: (link: any) => openDownload(link?.downloadUrl),
      error: (err) => this.resultsError.set(this.msg(err, 'Could not generate the report card.')),
    });
  }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.service.list().subscribe({
      next: (list) => { this.rows.set(list ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load exams.')); this.loading.set(false); },
    });
  }

  save(): void {
    if (!this.form.name || !this.form.classId || !this.form.subjectId || !this.form.examDate) {
      this.formError.set('Name, class, subject and exam date are required.'); return;
    }
    this.saving.set(true); this.formError.set('');
    this.service.create({
      name: this.form.name, classId: this.form.classId, subjectId: this.form.subjectId,
      examDateUtc: `${this.form.examDate}T09:00:00Z`, maxMarks: this.form.maxMarks, passingMarks: this.form.passingMarks,
    }).subscribe({
      next: () => { this.saving.set(false); this.showForm.set(false); this.form = { name: '', classId: '', subjectId: '', examDate: '', maxMarks: 100, passingMarks: 35 }; this.load(); },
      error: (err) => { this.saving.set(false); this.formError.set(this.msg(err, 'Could not create exam.')); },
    });
  }

  publish(e: Exam): void {
    this.service.publish(e.id).subscribe({ next: () => this.load(), error: (err) => this.error.set(this.msg(err, 'Publish failed.')) });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
