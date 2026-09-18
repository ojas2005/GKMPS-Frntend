import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LibraryService, Book, BookIssue } from '../../library.service';
import { StudentsService, Student } from '../../../students/students.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { classNameById, sectionNameById } from '../../../../core/constants/classes';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Library</h1>
          <p class="text-neutral-600 text-sm">{{ canManage ? 'Catalogue, issues and returns.' : 'Browse the school library catalogue.' }}</p>
        </div>
        <button *ngIf="canManage && tab() === 'catalogue'" (click)="showForm.set(!showForm())"
          class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Add Book' }}
        </button>
      </div>

      <div *ngIf="canManage" class="flex gap-2 border-b border-neutral-200">
        <button (click)="tab.set('catalogue')" [class]="tabClass('catalogue')">Catalogue</button>
        <button (click)="openIssues()" [class]="tabClass('issues')">Issued books</button>
      </div>

      <!-- ================= Catalogue ================= -->
      <ng-container *ngIf="tab() === 'catalogue'">
        <div class="flex gap-3">
          <input [(ngModel)]="keyword" (keyup.enter)="load()" placeholder="Search title / author..." class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <button (click)="load()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
        </div>

        <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="library-f1">ISBN *</label>
              <input id="library-f1" [(ngModel)]="form.isbn" placeholder="9780140328721" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="library-f2">Title *</label>
              <input id="library-f2" [(ngModel)]="form.title" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="library-f3">Author *</label>
              <input id="library-f3" [(ngModel)]="form.author" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="library-f4">Category *</label>
              <input id="library-f4" [(ngModel)]="form.category" placeholder="Fiction" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="library-f5">Total copies *</label>
              <input id="library-f5" [(ngModel)]="form.totalCopies" type="number" min="1" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
          </div>
          <div class="mt-4 flex items-center gap-3">
            <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ saving() ? 'Saving...' : 'Add' }}
            </button>
            <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-x-auto">
          <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
          <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
          <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No books found.</div>
          <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
            <thead class="bg-neutral-50 text-neutral-600 text-left">
              <tr>
                <th class="px-6 py-3 font-medium">Title</th><th class="px-6 py-3 font-medium">Author</th>
                <th class="px-6 py-3 font-medium">Category</th><th class="px-6 py-3 font-medium">Available</th>
                <th *ngIf="canManage" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let b of rows()" class="border-t border-neutral-200">
                <td class="px-6 py-3 text-neutral-900">{{ b.title }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ b.author || '—' }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ b.category || '—' }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ b.availableCopies ?? '—' }} / {{ b.totalCopies ?? '—' }}</td>
                <td *ngIf="canManage" class="px-6 py-3 text-right">
                  <button (click)="startIssue(b)" [disabled]="!b.availableCopies"
                    class="text-primary-600 hover:underline disabled:text-neutral-400 disabled:no-underline text-sm">Issue →</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ================= Issues ================= -->
      <ng-container *ngIf="tab() === 'issues'">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
          <h2 class="font-semibold text-neutral-900">Issue a book</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs text-neutral-500 mb-1" for="library-f6">Book *</label>
              <select id="library-f6" [(ngModel)]="issue.bookId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
                <option value="">Select a book</option>
                <option *ngFor="let b of rows()" [value]="b.id" [disabled]="!b.availableCopies">
                  {{ b.title }} ({{ b.availableCopies }} available)
                </option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1">Student *</label>
              <div class="flex gap-2">
                <input [(ngModel)]="studentKeyword" (keyup.enter)="searchStudents()" placeholder="Name or admission #" class="flex-1 min-w-0 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
                <button (click)="searchStudents()" class="px-3 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Find</button>
              </div>
              <select *ngIf="studentMatches().length > 0" [(ngModel)]="issue.studentId" class="mt-2 w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
                <option value="">Select a student</option>
                <option *ngFor="let s of studentMatches()" [value]="s.id">{{ describe(s) }}</option>
              </select>
              <p *ngIf="studentSearched() && studentMatches().length === 0" class="mt-1 text-xs text-neutral-500">No matching students.</p>
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1">Due date *</label>
              <input type="date" [(ngModel)]="issue.dueDate" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button (click)="issueBook()" [disabled]="issuing()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ issuing() ? 'Issuing...' : 'Issue book' }}
            </button>
            <span *ngIf="issueError()" class="text-error-600 text-sm">{{ issueError() }}</span>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-x-auto">
          <div *ngIf="issuesLoading()" class="p-8 text-center text-neutral-500">Loading...</div>
          <div *ngIf="issuesError()" class="p-8 text-center text-error-600">{{ issuesError() }}</div>
          <div *ngIf="!issuesLoading() && !issuesError() && issues().length === 0" class="p-8 text-center text-neutral-500">No books are currently issued.</div>
          <table *ngIf="!issuesLoading() && !issuesError() && issues().length > 0" class="w-full text-sm">
            <thead class="bg-neutral-50 text-neutral-600 text-left">
              <tr>
                <th class="px-6 py-3 font-medium">Book</th><th class="px-6 py-3 font-medium">Student</th>
                <th class="px-6 py-3 font-medium">Issued</th><th class="px-6 py-3 font-medium">Due</th><th class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let i of issues()" class="border-t border-neutral-200">
                <td class="px-6 py-3 text-neutral-900">{{ i.bookTitle }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ studentNames()[i.studentId] || 'Loading…' }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ i.issuedAtUtc | date: 'mediumDate' }}</td>
                <td class="px-6 py-3" [class.text-error-600]="i.isOverdue" [class.text-neutral-600]="!i.isOverdue">
                  {{ i.dueDateUtc | date: 'mediumDate' }} <span *ngIf="i.isOverdue" class="text-xs font-medium">(overdue)</span>
                </td>
                <td class="px-6 py-3 text-right">
                  <button (click)="returnBook(i)" [disabled]="returningId() === i.id" class="text-primary-600 hover:underline disabled:text-neutral-400 text-sm">
                    {{ returningId() === i.id ? 'Returning…' : 'Mark returned' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>
    </div>
  `,
})
export class LibraryComponent implements OnInit {
  private service = inject(LibraryService);
  private students = inject(StudentsService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  // Adding books, issuing and returning are librarian/admin actions (the API rejects
  // everyone else); teachers only browse the catalogue.
  readonly canManage = this.auth.hasRole('SuperAdmin', 'Principal', 'Admin', 'Librarian');

  tab = signal<'catalogue' | 'issues'>('catalogue');
  rows = signal<Book[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  keyword = '';
  form = { isbn: '', title: '', author: '', category: '', totalCopies: 1 };

  issues = signal<BookIssue[]>([]);
  issuesLoading = signal(false);
  issuesError = signal('');
  studentNames = signal<Record<string, string>>({});
  returningId = signal<string | null>(null);

  issue = { bookId: '', studentId: '', dueDate: this.defaultDueDate() };
  studentKeyword = '';
  studentMatches = signal<Student[]>([]);
  studentSearched = signal(false);
  issuing = signal(false);
  issueError = signal('');

  ngOnInit(): void { this.load(); }

  tabClass(t: 'catalogue' | 'issues'): string {
    const base = 'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ';
    return base + (this.tab() === t ? 'border-primary-600 text-primary-700' : 'border-transparent text-neutral-500 hover:text-neutral-800');
  }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.service.listBooks({ keyword: this.keyword }).subscribe({
      next: (books) => { this.rows.set(books ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load books.')); this.loading.set(false); },
    });
  }

  save(): void {
    if (!this.form.isbn || !this.form.title || !this.form.author || !this.form.category || !this.form.totalCopies) {
      this.formError.set('ISBN, title, author, category and copies are all required.'); return;
    }
    this.saving.set(true); this.formError.set('');
    this.service.createBook(this.form).subscribe({
      next: () => {
        this.saving.set(false); this.showForm.set(false);
        this.toast.success(`"${this.form.title}" added to the catalogue.`);
        this.form = { isbn: '', title: '', author: '', category: '', totalCopies: 1 };
        this.load();
      },
      error: (err) => { this.saving.set(false); this.formError.set(this.msg(err, 'Could not add book.')); },
    });
  }

  startIssue(book: Book): void {
    this.issue = { bookId: book.id, studentId: '', dueDate: this.defaultDueDate() };
    this.openIssues();
  }

  openIssues(): void {
    this.tab.set('issues');
    this.loadIssues();
  }

  loadIssues(): void {
    this.issuesLoading.set(true); this.issuesError.set('');
    this.service.listIssues(true).subscribe({
      next: (list) => { this.issues.set(list ?? []); this.issuesLoading.set(false); this.resolveStudentNames(list ?? []); },
      error: (err) => { this.issuesError.set(this.msg(err, 'Failed to load issued books.')); this.issuesLoading.set(false); },
    });
  }

  searchStudents(): void {
    const keyword = this.studentKeyword.trim();
    if (!keyword) return;
    this.students.list({ keyword, pageSize: 20 }).subscribe({
      next: (p) => {
        const items = p?.items ?? [];
        this.studentMatches.set(items);
        this.studentSearched.set(true);
        this.issue.studentId = items.length === 1 ? items[0].id : '';
      },
      error: (err) => this.issueError.set(this.msg(err, 'Could not search students.')),
    });
  }

  issueBook(): void {
    if (!this.issue.bookId || !this.issue.studentId || !this.issue.dueDate) {
      this.issueError.set('Pick a book, a student and a due date.'); return;
    }
    this.issuing.set(true); this.issueError.set('');
    this.service.issueBook({
      bookId: this.issue.bookId,
      studentId: this.issue.studentId,
      dueDateUtc: `${this.issue.dueDate}T23:59:59Z`,
    }).subscribe({
      next: () => {
        this.issuing.set(false);
        this.toast.success('Book issued.');
        this.issue = { bookId: '', studentId: '', dueDate: this.defaultDueDate() };
        this.studentMatches.set([]); this.studentSearched.set(false); this.studentKeyword = '';
        this.load(); this.loadIssues();
      },
      error: (err) => { this.issuing.set(false); this.issueError.set(this.msg(err, 'Could not issue the book.')); },
    });
  }

  returnBook(issue: BookIssue): void {
    this.returningId.set(issue.id);
    this.service.returnBook(issue.id).subscribe({
      next: (res) => {
        this.returningId.set(null);
        const fine = res?.fineAmount ?? 0;
        this.toast.success(fine > 0 ? `Returned. Late fine: ₹${fine}.` : 'Book returned.');
        this.load(); this.loadIssues();
      },
      error: (err) => { this.returningId.set(null); this.toast.error(this.msg(err, 'Could not return the book.')); },
    });
  }

  describe(s: Student): string {
    return `${s.fullName} · ${classNameById(s.classId)}-${sectionNameById(s.sectionId)} · ${s.admissionNumber ?? ''}`;
  }

  private resolveStudentNames(list: BookIssue[]): void {
    const known = this.studentNames();
    const missing = [...new Set(list.map((i) => i.studentId))].filter((id) => !known[id]);
    if (missing.length === 0) return;
    forkJoin(missing.map((id) =>
      this.students.get(id).pipe(map((s) => [id, this.describe(s)] as const), catchError(() => of([id, 'Unknown student'] as const))),
    )).subscribe((pairs) => this.studentNames.update((m) => ({ ...m, ...Object.fromEntries(pairs) })));
  }

  private defaultDueDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().slice(0, 10);
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
