import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../http/api.service';
import { PagedResult } from '../models/api-response';

export interface NotificationItem {
  id: string;
  recipientReference: string;
  channel?: string;
  subject?: string;
  body?: string;
  status?: string;
  sentAtUtc?: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private api = inject(ApiService);

  list(recipientReference?: string, page = 1, pageSize = 20): Observable<PagedResult<NotificationItem>> {
    return this.api.get('/api/notifications', { recipientReference, page, pageSize });
  }
}
