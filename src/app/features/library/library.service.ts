import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';

export interface Book {
  id: string;
  title: string;
  author?: string;
  category?: string;
  isbn?: string;
  totalCopies?: number;
  availableCopies?: number;
  [key: string]: unknown;
}

export interface BookIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  issuedAtUtc: string;
  dueDateUtc: string;
  returnedAtUtc?: string | null;
  fineAmount: number;
  isOverdue: boolean;
}

@Injectable({ providedIn: 'root' })
export class LibraryService {
  private api = inject(ApiService);

  listBooks(query: {
    keyword?: string;
    category?: string;
    page?: number;
    pageSize?: number;
  } = {}): Observable<Book[]> {
    // The catalogue endpoint returns a plain array (not a PagedResult).
    return this.api.get('/api/books', { page: 1, pageSize: 100, ...query });
  }

  createBook(body: {
    isbn: string;
    title: string;
    author: string;
    category: string;
    totalCopies: number;
  }): Observable<Book> {
    return this.api.post('/api/books', body);
  }

  listIssues(activeOnly = true): Observable<BookIssue[]> {
    return this.api.get('/api/book-issues', { activeOnly });
  }

  issueBook(body: { bookId: string; studentId: string; dueDateUtc: string }): Observable<BookIssue> {
    return this.api.post('/api/book-issues', body);
  }

  returnBook(issueId: string): Observable<{ fineAmount: number }> {
    return this.api.post('/api/book-issues/return', { issueId });
  }
}
