import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademicsService, Subject, Homework } from '../../academics.service';
import { ToastService } from '../../../../core/services/toast.service';
import { SCHOOL_CLASSES, SCHOOL_SECTIONS, DEFAULT_CLASS, DEFAULT_SECTION, classNameById, sectionNameById } from '../../../../core/constants/classes';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Academics</h1>
        <p class="text-neutral-600 text-sm">{{ selfService ? 'Your subjects, syllabus and homework.' : 'Subjects, syllabus & homework from Academic.API.' }}</p>
      </div>

      <!-- Class picker (staff only; students are locked to their own class) -->
      <div *ngIf="!selfService" class="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 flex flex-wrap gap-3 items-center">
        <span class="text-sm text-neutral-600">Viewing:</span>
        <select [(ngModel)]="viewClassId" (change)="reload()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
        </select>
        <select [(ngModel)]="viewSectionId" (change)="reload()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option *ngFor="let s of sections" [value]="s.id">Section {{ s.name }}</option>
        </select>
      </div>
      <p *ngIf="selfService && linkedToClass" class="text-sm text-neutral-600 -mt-3">
        Class: <span class="font-medium">{{ className(viewClassId) }} - {{ sectionName(viewSectionId) }}</span>
      </p>
      <p *ngIf="selfService && !linkedToClass" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 text-sm text-error-600">
        Your account is not linked to a student record yet. Ask the school office to link it.
      </p>

      <div *ngIf="!selfService || linkedToClass" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Subjects & syllabus -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Subjects &amp; syllabus</h2>
          <div *ngIf="canAddSubject" class="space-y-2 mb-4">
            <input [(ngModel)]="subjectName_" placeholder="Subject name (e.g. Mathematics)" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <div class="flex gap-2">
              <input [(ngModel)]="subjectCode" placeholder="Code (e.g. MATH10)" class="w-40 px-3 py-2.5 border border-neutral-300 rounded-lg text-sm">
              <button (click)="addSubject()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm">Add</button>
            </div>
          </div>
          <div *ngIf="subjError()" class="text-error-600 text-sm mb-2">{{ subjError() }}</div>
          <ul class="divide-y divide-neutral-200">
            <li *ngFor="let s of subjects()" class="py-3">
              <div class="flex justify-between text-sm">
                <span class="text-neutral-900 font-medium">{{ s.name }}</span>
                <span class="flex items-center gap-3">
                  <span class="text-neutral-500">{{ s.code || '' }}</span>
                  <button *ngIf="!selfService" (click)="editingSyllabus = editingSyllabus === s.id ? null : s.id; syllabusDraft = s.syllabusOutline || ''"
                    class="text-primary-600 hover:text-primary-700 text-xs font-medium">
                    {{ editingSyllabus === s.id ? 'Cancel' : 'Edit syllabus' }}
                  </button>
                </span>
              </div>
              <p *ngIf="s.syllabusOutline && editingSyllabus !== s.id" class="text-xs text-neutral-600 mt-1 whitespace-pre-line">{{ s.syllabusOutline }}</p>
              <p *ngIf="!s.syllabusOutline && editingSyllabus !== s.id" class="text-xs text-neutral-400 mt-1">No syllabus added yet.</p>
              <div *ngIf="editingSyllabus === s.id" class="mt-2 space-y-2 reveal-panel">
                <textarea [(ngModel)]="syllabusDraft" rows="4" placeholder="Chapters / topics / marking scheme..."
                  class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"></textarea>
                <button (click)="saveSyllabus(s)" class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-medium">Save syllabus</button>
              </div>
            </li>
            <li *ngIf="subjects().length === 0" class="py-2.5 text-neutral-500 text-sm">No subjects.</li>
          </ul>
        </div>

        <!-- Homework -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Homework</h2>
          <div *ngIf="!selfService" class="space-y-2 mb-4">
            <input [(ngModel)]="hw.title" placeholder="Title" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <select [(ngModel)]="hw.subjectId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Select subject *</option>
              <option *ngFor="let s of subjects()" [value]="s.id">{{ s.name }}</option>
            </select>
            <input [(ngModel)]="hw.dueDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <button (click)="addHomework()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm">Assign</button>
          </div>
          <div *ngIf="hwError()" class="text-error-600 text-sm mb-2">{{ hwError() }}</div>
          <ul class="divide-y divide-neutral-200">
            <li *ngFor="let h of homework()" class="py-2.5 text-sm">
              <span class="text-neutral-900">{{ h.title }}</span>
              <span *ngIf="h.dueDateUtc" class="text-neutral-500 text-xs ml-2">due {{ h.dueDateUtc | date:'mediumDate' }}</span>
            </li>
            <li *ngIf="homework().length === 0" class="py-2.5 text-neutral-500 text-sm">No homework.</li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class AcademicsComponent implements OnInit {
  private service = inject(AcademicsService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  selfService = this.auth.isSelfService();
  // Creating subjects is an office action; teachers may still edit syllabus and set homework.
  readonly canAddSubject = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');
  readonly linkedToClass = !!this.auth.classId();
  subjects = signal<Subject[]>([]);
  homework = signal<Homework[]>([]);
  subjError = signal('');
  hwError = signal('');

  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;

  // Students are locked to their own class; staff pick any.
  viewClassId = this.selfService ? (this.auth.classId() ?? DEFAULT_CLASS.id) : DEFAULT_CLASS.id;
  viewSectionId = this.selfService ? (this.auth.sectionId() ?? DEFAULT_SECTION.id) : DEFAULT_SECTION.id;

  subjectName_ = '';
  subjectCode = '';
  editingSyllabus: string | null = null;
  syllabusDraft = '';
  hw = { title: '', subjectId: '', dueDate: '' };

  ngOnInit(): void {
    if (this.selfService && !this.linkedToClass) return; // nothing to load for an unlinked account
    this.reload();
  }

  reload(): void {
    this.loadSubjects();
    this.loadHomework();
  }

  loadSubjects(): void {
    this.service.listSubjects(this.viewClassId).subscribe({
      next: (list) => this.subjects.set(list ?? []),
      error: (err) => this.subjError.set(this.msg(err, 'Failed to load subjects.')),
    });
  }

  loadHomework(): void {
    this.service.listHomework(this.viewClassId, this.viewSectionId).subscribe({
      next: (list) => this.homework.set(list ?? []),
      error: (err) => this.hwError.set(this.msg(err, 'Failed to load homework.')),
    });
  }

  addSubject(): void {
    if (!this.subjectName_ || !this.subjectCode) { this.subjError.set('Name and code are required.'); return; }
    this.subjError.set('');
    this.service.createSubject({ name: this.subjectName_, code: this.subjectCode, classId: this.viewClassId }).subscribe({
      next: () => { this.subjectName_ = ''; this.subjectCode = ''; this.loadSubjects(); this.toast.success('Subject added.'); },
      error: (err) => this.subjError.set(this.msg(err, 'Could not add subject.')),
    });
  }

  saveSyllabus(s: Subject): void {
    this.service.updateSyllabus(s.id, this.syllabusDraft || null).subscribe({
      next: () => { this.editingSyllabus = null; this.loadSubjects(); this.toast.success('Syllabus saved.'); },
      error: (err) => this.subjError.set(this.msg(err, 'Could not save syllabus.')),
    });
  }

  addHomework(): void {
    if (!this.hw.title || !this.hw.subjectId || !this.hw.dueDate) {
      this.hwError.set('Title, subject and due date are required.'); return;
    }
    this.hwError.set('');
    this.service.createHomework({
      title: this.hw.title, subjectId: this.hw.subjectId, classId: this.viewClassId,
      sectionId: this.viewSectionId, dueDateUtc: `${this.hw.dueDate}T00:00:00Z`,
    }).subscribe({
      next: () => { this.hw = { title: '', subjectId: '', dueDate: '' }; this.loadHomework(); this.toast.success('Homework assigned.'); },
      error: (err) => this.hwError.set(this.msg(err, 'Could not assign homework.')),
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
