import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExaminationService, Exam, StudentResult } from '../../examination.service';
import { AcademicsService, Subject } from '../../../academics/academics.service';
import { SCHOOL_CLASSES, DEFAULT_CLASS } from '../../../../core/constants/classes';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-examination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">{{ selfService ? 'My Results' : 'Examinations' }}</h1>
          <p class="text-neutral-600 text-sm">{{ selfService ? 'Your published exam results and report cards.' : 'Exams from Examination.API.' }}</p>
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
            <label class="block text-xs text-neutral-500 mb-1">Exam name *</label>
            <input [(ngModel)]="form.name" placeholder="Unit Test 1" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Class *</label>
            <select [(ngModel)]="form.classId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Subject *</label>
            <select [(ngModel)]="form.subjectId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Select subject</option>
              <option *ngFor="let s of subjects()" [value]="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Exam date *</label>
            <input [(ngModel)]="form.examDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Max marks *</label>
            <input [(ngModel)]="form.maxMarks" type="number" placeholder="100" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Passing marks *</label>
            <input [(ngModel)]="form.passingMarks" type="number" placeholder="35" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Create' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
        <p *ngIf="subjects().length === 0" class="text-xs text-warning-600 mt-2">No subjects yet — add one on the Academics page first (exams need a subject).</p>
      </div>

      <div *ngIf="!selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No exams.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Name</th><th class="px-6 py-3 font-medium">Max</th><th class="px-6 py-3 font-medium">Status</th><th class="px-6 py-3 font-medium"></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of rows()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ e.name }}</td>
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

  fillSample(): void {
    this.form = {
      name: 'Unit Test 1',
      classId: DEFAULT_CLASS.id,
      subjectId: this.subjects()[0]?.id ?? '',
      examDate: new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10),
      maxMarks: 100,
      passingMarks: 35,
    };
  }

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
      next: (link: any) => { if (link?.downloadUrl) window.open(link.downloadUrl, '_blank'); },
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
    if (err?.status === 0) return 'Cannot reach the gateway on localhost:5100. Is the backend running?';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
