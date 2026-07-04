import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';
import { PagedResult } from '../../core/models/api-response';

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

@Injectable({ providedIn: 'root' })
export class LibraryService {
  private api = inject(ApiService);

  listBooks(query: {
    keyword?: string;
    category?: string;
    page?: number;
    pageSize?: number;
  } = {}): Observable<PagedResult<Book>> {
    return this.api.get('/api/books', { page: 1, pageSize: 20, ...query });
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

  issueBook(body: {
    bookId: string;
    studentId: string;
    dueDateUtc?: string;
  }): Observable<unknown> {
    return this.api.post('/api/book-issues', body);
  }

  returnBook(body: { bookIssueId: string }): Observable<unknown> {
    return this.api.post('/api/book-issues/return', body);
  }
}
