import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';

export interface Announcement {
  id: string;
  title: string;
  body?: string;
  targetRolesCsv?: string | null;
  targetClassId?: string | null;
  publishedAtUtc?: string;
  [key: string]: unknown;
}

export interface ParentMessage {
  id: string;
  studentId: string;
  recipientUserId: string;
  body: string;
  isRead?: boolean;
  sentAtUtc?: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  private api = inject(ApiService);

  // role/classId only matter for owner/principal/admin callers (to browse a given
  // audience); for everyone else the server scopes the feed to their own role and class
  // from the token and ignores these.
  // Note: unlike most list endpoints, this one returns a bare array, not a PagedResult.
  listAnnouncements(query: {
    role?: string;
    classId?: string;
    page?: number;
    pageSize?: number;
  } = {}): Observable<Announcement[]> {
    return this.api.get('/api/announcements', { page: 1, pageSize: 20, ...query });
  }

  // targetRolesCsv/targetClassId select the audience (e.g. "Teacher", "Student", or
  // blank for everyone; targetClassId narrows to one class). A Teacher caller's values
  // are overridden server-side to their own class's students regardless of what's sent.
  createAnnouncement(body: {
    title: string;
    body: string;
    targetRolesCsv?: string;
    targetClassId?: string;
    expiresAtUtc?: string;
  }): Observable<Announcement> {
    return this.api.post('/api/announcements', body);
  }

  sendParentMessage(body: {
    studentId: string;
    recipientUserId: string;
    body: string;
  }): Observable<ParentMessage> {
    return this.api.post('/api/parent-messages', body);
  }

  parentMessageThread(studentId: string): Observable<ParentMessage[]> {
    return this.api.get(`/api/parent-messages/students/${studentId}`);
  }

  markMessageRead(messageId: string): Observable<unknown> {
    return this.api.post(`/api/parent-messages/${messageId}/read`);
  }
}
