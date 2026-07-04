import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademicsService, Subject, Homework, TimetableSlot } from '../../academics.service';
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
        <p class="text-neutral-600 text-sm">{{ selfService ? 'Your subjects, syllabus, timetable and homework.' : 'Subjects, syllabus, timetable & homework from Academic.API.' }}</p>
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
      <p *ngIf="selfService" class="text-sm text-neutral-600 -mt-3">
        Class: <span class="font-medium">{{ className(viewClassId) }} - {{ sectionName(viewSectionId) }}</span>
      </p>

      <!-- Timetable -->
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Timetable</h2>
        <p *ngIf="ttError()" class="text-neutral-500 text-sm mb-2">{{ ttError() }}</p>
        <table *ngIf="slots().length > 0" class="w-full text-sm">
          <thead class="text-neutral-500 text-left text-xs">
            <tr><th class="py-2">Day</th><th class="py-2">Period</th><th class="py-2">Subject</th><th class="py-2">Time</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let sl of slots()" class="border-t border-neutral-100">
              <td class="py-2 text-neutral-900">{{ sl.day }}</td>
              <td class="py-2 text-neutral-600">{{ sl.period }}</td>
              <td class="py-2 text-neutral-900 font-medium">{{ subjectName(sl.subjectId) }}</td>
              <td class="py-2 text-neutral-600">{{ sl.startTime || '—' }}<ng-container *ngIf="sl.endTime"> – {{ sl.endTime }}</ng-container></td>
            </tr>
          </tbody>
        </table>

        <!-- Staff: add a slot -->
        <div *ngIf="!selfService" class="mt-4 border-t border-neutral-100 pt-4">
          <p class="text-xs text-neutral-500 mb-2">Add a period, then Save timetable (replaces the whole timetable for this class/section).</p>
          <div class="grid grid-cols-2 md:grid-cols-6 gap-2">
            <select [(ngModel)]="newSlot.day" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let d of days" [value]="d">{{ d }}</option>
            </select>
            <input [(ngModel)]="newSlot.period" type="number" min="1" placeholder="Period" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            <select [(ngModel)]="newSlot.subjectId" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white col-span-2 md:col-span-1">
              <option value="">Subject...</option>
              <option *ngFor="let s of subjects()" [value]="s.id">{{ s.name }}</option>
            </select>
            <input [(ngModel)]="newSlot.startTime" type="time" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            <input [(ngModel)]="newSlot.endTime" type="time" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            <button (click)="addSlot()" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">+ Add</button>
          </div>
          <div class="mt-3 flex items-center gap-3">
            <button (click)="saveTimetable()" [disabled]="ttSaving()"
              class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ ttSaving() ? 'Saving...' : 'Save timetable' }}
            </button>
            <span *ngIf="ttMsg()" class="text-sm" [class]="ttOk() ? 'text-success-600' : 'text-error-600'">{{ ttMsg() }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Subjects & syllabus -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Subjects &amp; syllabus</h2>
          <div *ngIf="!selfService" class="space-y-2 mb-4">
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
              <div *ngIf="editingSyllabus === s.id" class="mt-2 space-y-2">
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

  selfService = this.auth.isSelfService();
  subjects = signal<Subject[]>([]);
  homework = signal<Homework[]>([]);
  slots = signal<TimetableSlot[]>([]);
  subjError = signal('');
  hwError = signal('');
  ttError = signal('');
  ttSaving = signal(false);
  ttMsg = signal('');
  ttOk = signal(false);

  classes = SCHOOL_CLASSES;
  sections = SCHOOL_SECTIONS;
  className = classNameById;
  sectionName = sectionNameById;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Students are locked to their own class; staff pick any.
  viewClassId = this.selfService ? (this.auth.classId() ?? DEFAULT_CLASS.id) : DEFAULT_CLASS.id;
  viewSectionId = this.selfService ? (this.auth.sectionId() ?? DEFAULT_SECTION.id) : DEFAULT_SECTION.id;

  subjectName_ = '';
  subjectCode = '';
  editingSyllabus: string | null = null;
  syllabusDraft = '';
  hw = { title: '', subjectId: '', dueDate: '' };
  newSlot: TimetableSlot = { day: 'Monday', period: 1, subjectId: '', startTime: '', endTime: '' };

  ngOnInit(): void { this.reload(); }

  reload(): void {
    this.loadSubjects();
    this.loadHomework();
    this.loadTimetable();
  }

  subjectName(id: string): string {
    return this.subjects().find((s) => s.id === id)?.name ?? id;
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

  loadTimetable(): void {
    this.ttError.set('');
    this.slots.set([]);
    this.service.getTimetable(this.viewClassId, this.viewSectionId).subscribe({
      next: (tt: any) => this.slots.set(tt?.slots ?? []),
      error: (err) => this.ttError.set(err?.status === 404 ? 'No timetable set for this class/section yet.' : this.msg(err, 'Failed to load timetable.')),
    });
  }

  addSlot(): void {
    if (!this.newSlot.subjectId || !this.newSlot.period) { this.ttOk.set(false); this.ttMsg.set('Pick a subject and period.'); return; }
    this.ttMsg.set('');
    this.slots.set([...this.slots(), { ...this.newSlot }]);
    this.newSlot = { day: this.newSlot.day, period: Number(this.newSlot.period) + 1, subjectId: '', startTime: '', endTime: '' };
  }

  saveTimetable(): void {
    this.ttSaving.set(true); this.ttMsg.set('');
    this.service.saveTimetable({
      classId: this.viewClassId,
      sectionId: this.viewSectionId,
      slots: this.slots().map((s) => ({ ...s, period: Number(s.period), startTime: s.startTime || '00:00', endTime: s.endTime || '00:00' })),
    }).subscribe({
      next: () => { this.ttSaving.set(false); this.ttOk.set(true); this.ttMsg.set('Timetable saved.'); this.loadTimetable(); },
      error: (err) => { this.ttSaving.set(false); this.ttOk.set(false); this.ttMsg.set(this.msg(err, 'Could not save timetable.')); },
    });
  }

  addSubject(): void {
    if (!this.subjectName_ || !this.subjectCode) { this.subjError.set('Name and code are required.'); return; }
    this.subjError.set('');
    this.service.createSubject({ name: this.subjectName_, code: this.subjectCode, classId: this.viewClassId }).subscribe({
      next: () => { this.subjectName_ = ''; this.subjectCode = ''; this.loadSubjects(); },
      error: (err) => this.subjError.set(this.msg(err, 'Could not add subject.')),
    });
  }

  saveSyllabus(s: Subject): void {
    this.service.updateSyllabus(s.id, this.syllabusDraft || null).subscribe({
      next: () => { this.editingSyllabus = null; this.loadSubjects(); },
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
      next: () => { this.hw = { title: '', subjectId: '', dueDate: '' }; this.loadHomework(); },
      error: (err) => this.hwError.set(this.msg(err, 'Could not assign homework.')),
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the gateway on localhost:5100. Is the backend running?';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
