import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryService, Book } from '../../library.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Library</h1>
          <p class="text-neutral-600 text-sm">Catalogue from Library.API.</p>
        </div>
        <button (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Add Book' }}
        </button>
      </div>

      <div class="flex gap-3">
        <input [(ngModel)]="keyword" (keyup.enter)="load()" placeholder="Search title / author..." class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        <button (click)="load()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
      </div>

      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <p class="text-xs text-neutral-500 mb-4">All fields required by the backend.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">ISBN *</label>
            <input [(ngModel)]="form.isbn" placeholder="9780140328721" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Title *</label>
            <input [(ngModel)]="form.title" placeholder="Matilda" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Author *</label>
            <input [(ngModel)]="form.author" placeholder="Roald Dahl" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Category *</label>
            <input [(ngModel)]="form.category" placeholder="Fiction" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Total copies *</label>
            <input [(ngModel)]="form.totalCopies" type="number" placeholder="5" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Add' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No books.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Title</th><th class="px-6 py-3 font-medium">Author</th><th class="px-6 py-3 font-medium">Category</th><th class="px-6 py-3 font-medium">Available</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let b of rows()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ b.title }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ b.author || '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ b.category || '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ b.availableCopies ?? '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class LibraryComponent implements OnInit {
  private service = inject(LibraryService);
  rows = signal<Book[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  keyword = '';
  form = { isbn: '', title: '', author: '', category: '', totalCopies: 1 };

  fillSample(): void {
    this.form = { isbn: '9780140328721', title: 'Matilda', author: 'Roald Dahl', category: 'Fiction', totalCopies: 5 };
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.service.listBooks({ keyword: this.keyword }).subscribe({
      next: (p) => { this.rows.set(p?.items ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load books.')); this.loading.set(false); },
    });
  }

  save(): void {
    if (!this.form.isbn || !this.form.title || !this.form.author || !this.form.category || !this.form.totalCopies) {
      this.formError.set('ISBN, title, author, category and copies are all required.'); return;
    }
    this.saving.set(true); this.formError.set('');
    this.service.createBook(this.form).subscribe({
      next: () => { this.saving.set(false); this.showForm.set(false); this.form = { isbn: '', title: '', author: '', category: '', totalCopies: 1 }; this.load(); },
      error: (err) => { this.saving.set(false); this.formError.set(this.msg(err, 'Could not add book.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the gateway on localhost:5100. Is the backend running?';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
