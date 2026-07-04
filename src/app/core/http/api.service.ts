import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response';

/**
 * Thin wrapper over HttpClient that:
 *  - prefixes every call with the gateway base URL
 *  - unwraps the { success, data, ... } envelope down to `data`
 * Feature services inject this and call get/post/put/patch.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  private toParams(query?: Record<string, unknown>): HttpParams | undefined {
    if (!query) return undefined;
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return params;
  }

  get<T>(path: string, query?: Record<string, unknown>): Observable<T> {
    return this.http
      .get<ApiResponse<T>>(`${this.base}${path}`, { params: this.toParams(query) })
      .pipe(map((r) => r.data as T));
  }

  post<T>(path: string, body?: unknown): Observable<T> {
    return this.http
      .post<ApiResponse<T>>(`${this.base}${path}`, body ?? {})
      .pipe(map((r) => r.data as T));
  }

  put<T>(path: string, body?: unknown): Observable<T> {
    return this.http
      .put<ApiResponse<T>>(`${this.base}${path}`, body ?? {})
      .pipe(map((r) => r.data as T));
  }

  patch<T>(path: string, body?: unknown): Observable<T> {
    return this.http
      .patch<ApiResponse<T>>(`${this.base}${path}`, body ?? {})
      .pipe(map((r) => r.data as T));
  }

  // Raw binary (PDF report endpoints).
  getBlob(path: string, query?: Record<string, unknown>): Observable<Blob> {
    return this.http.get(`${this.base}${path}`, {
      params: this.toParams(query),
      responseType: 'blob',
    });
  }
}
