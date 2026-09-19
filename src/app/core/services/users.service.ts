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
  username?: string | null;
  lastLoginAtUtc?: string | null;
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

  // For someone who lost the phone with their authenticator app: they set it up again at next sign-in.
  resetTwoFactor(id: string): Observable<unknown> {
    return this.api.post(`/api/users/${id}/two-factor/reset`, {});
  }

  setStatus(id: string, isActive: boolean): Observable<unknown> {
    return this.api.patch(`/api/users/${id}/status?isActive=${isActive}`);
  }

  // Admin-initiated reset -- passwords are one-way hashed server-side, so there is no
  // "view" equivalent, only setting a new one (which the admin then hands to the person).
  setPassword(id: string, newPassword: string): Observable<unknown> {
    return this.api.patch(`/api/users/${id}/password`, { newPassword });
  }

  // Removes a login that has never been used -- only for rolling back an onboarding whose
  // second step (creating the student/staff profile) failed.
  deleteUnused(id: string): Observable<unknown> {
    return this.api.delete(`/api/users/${id}`);
  }
}
