import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../http/api.service';
import { PagedResult } from '../models/api-response';

export interface UserSummary {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private api = inject(ApiService);

  get(id: string): Observable<UserSummary> {
    return this.api.get(`/api/users/${id}`);
  }

  list(query: {
    role?: string;
    keyword?: string;
    page?: number;
    pageSize?: number;
  } = {}): Observable<PagedResult<UserSummary>> {
    return this.api.get('/api/users', { page: 1, pageSize: 20, ...query });
  }

  setStatus(id: string, isActive: boolean): Observable<unknown> {
    return this.api.patch(`/api/users/${id}/status?isActive=${isActive}`);
  }
}
