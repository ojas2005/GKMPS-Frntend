import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunicationService, Announcement } from '../../communication.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { SCHOOL_CLASSES, classNameById } from '../../../../core/constants/classes';

/**
 * Announcement composer. Owner (SuperAdmin/Principal/Admin) picks an audience —
 * everyone, teachers only, or students (optionally narrowed to one class). A Teacher
 * gets no picker at all: if they're a class teacher, every send goes to their own
 * class's students only (enforced server-side, not just hidden here); if they aren't
 * a class teacher, the form doesn't render since the backend would reject it anyway.
 */
@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Communication</h1>
          <p class="text-neutral-600 text-sm">Send announcements to teachers and/or students.</p>
        </div>
        <button *ngIf="canCompose()" (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ New Announcement' }}
        </button>
      </div>

      <div *ngIf="!canCompose()" class="bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm">
        You aren't a class teacher (head teacher) of any class, so you can't send announcements. Ask the school owner to assign you to a class.
      </div>

      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
        <input [(ngModel)]="form.title" placeholder="Title *" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        <textarea [(ngModel)]="form.body" placeholder="Message *" rows="4" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm"></textarea>

        <!-- Owner: audience picker -->
        <div *ngIf="isOwner()" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Send to</label>
            <select [(ngModel)]="audience" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Everyone</option>
              <option value="Teacher">Teachers only</option>
              <option value="Student">Students only</option>
            </select>
          </div>
          <div *ngIf="audience === 'Student'">
            <label class="block text-xs text-neutral-500 mb-1">Limit to one class (optional)</label>
            <select [(ngModel)]="audienceClassId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">All classes</option>
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
        </div>

        <!-- Teacher: forced scope, no picker -->
        <p *ngIf="!isOwner() && isClassTeacher()" class="text-xs text-neutral-500">
          This will be sent to the students of <span class="font-medium text-neutral-700">{{ myClassName() }}</span> only.
        </p>

        <div class="flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Publishing...' : 'Publish' }}
          </button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <div class="space-y-3">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500 bg-white rounded-xl border border-neutral-200">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600 bg-white rounded-xl border border-neutral-200">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500 bg-white rounded-xl border border-neutral-200">No announcements yet.</div>
        <div *ngFor="let a of rows()" class="bg-white rounded-xl p-5 shadow-sm border border-neutral-200">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-neutral-900">{{ a.title }}</h3>
            <span class="text-xs text-neutral-500">{{ a.publishedAtUtc ? (a.publishedAtUtc | date:'medium') : '' }}</span>
          </div>
          <p class="text-neutral-600 text-sm mt-2">{{ a.body }}</p>
          <p class="text-xs text-neutral-400 mt-2">
            {{ audienceLabel(a) }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class CommunicationComponent implements OnInit {
  private service = inject(CommunicationService);
  private auth = inject(AuthService);

  rows = signal<Announcement[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  form = { title: '', body: '' };
  audience = ''; // '' = everyone, 'Teacher', 'Student' (owner only)
  audienceClassId = '';

  classes = SCHOOL_CLASSES;
  className = classNameById;

  isOwner = (): boolean => this.auth.hasRole('SuperAdmin', 'Principal', 'Admin');
  isClassTeacher = (): boolean => this.auth.isClassTeacher();
  myClassName = (): string => this.className(this.auth.classTeacherClassId() ?? undefined);

  // Anyone allowed to see this page can compose, EXCEPT a Teacher who isn't a class teacher.
  canCompose = (): boolean => this.isOwner() || this.isClassTeacher();

  audienceLabel(a: Announcement): string {
    const role = a.targetRolesCsv ? a.targetRolesCsv : 'Everyone';
    const cls = a.targetClassId ? ` · ${this.className(a.targetClassId)}` : '';
    return `To: ${role}${cls}`;
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.service.listAnnouncements({ pageSize: 100 }).subscribe({
      next: (list) => { this.rows.set(list ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load announcements.')); this.loading.set(false); },
    });
  }

  save(): void {
    if (!this.form.title || !this.form.body) { this.formError.set('Title and message are required.'); return; }
    this.saving.set(true); this.formError.set('');
    this.service.createAnnouncement({
      title: this.form.title,
      body: this.form.body,
      // Ignored server-side for a Teacher caller — their own class is forced instead.
      targetRolesCsv: this.isOwner() ? (this.audience || undefined) : undefined,
      targetClassId: this.isOwner() && this.audience === 'Student' ? (this.audienceClassId || undefined) : undefined,
    }).subscribe({
      next: () => {
        this.saving.set(false); this.showForm.set(false);
        this.form = { title: '', body: '' }; this.audience = ''; this.audienceClassId = '';
        this.load();
      },
      error: (err) => { this.saving.set(false); this.formError.set(this.msg(err, 'Could not publish.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
