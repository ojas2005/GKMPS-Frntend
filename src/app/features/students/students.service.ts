import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ApiService } from '../../core/http/api.service';
import { DownloadLink, PagedResult } from '../../core/models/api-response';
import { FeesService } from '../fees/fees.service';
import { CURRENT_ACADEMIC_YEAR } from '../../core/constants/classes';

export interface Student {
  id: string;
  admissionNumber?: string;
  fullName: string;
  classId?: string;
  sectionId?: string;
  rollNumber?: string;
  guardianName?: string;
  guardianPhone?: string;
  status?: string;
  [key: string]: unknown;
}

// What the admit form collects. The owner sets the student's login ID + password and
// hands them over; admitWithAccount() creates the linked account with them. pendingFee,
// if set, becomes a one-time "opening balance" due on top of the class's fee structures
// (which are auto-assessed for every admission, no form field needed for those).
export interface AdmitStudentForm {
  fullName: string;
  dateOfBirth: string; // "yyyy-mm-dd" from a date input
  gender: string;
  classId: string;
  sectionId: string;
  username: string; // login ID the owner gives the student
  password: string; // password the owner gives the student
  admissionNumber?: string; // auto-generated if blank
  email?: string; // optional; synthesized from the login ID if blank
  parentName?: string;
  parentPhone?: string;
  pendingFee?: number; // fee already pending/owed at admission, e.g. from a previous school
}

export interface AdmittedStudent {
  student: Student;
  credentials: { username: string; password: string };
}

export interface StudentQuery {
  classId?: string;
  sectionId?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private api = inject(ApiService);
  private fees = inject(FeesService);

  list(query: StudentQuery = {}): Observable<PagedResult<Student>> {
    return this.api.get('/api/students', { page: 1, pageSize: 20, ...query });
  }

  get(id: string): Observable<Student> {
    return this.api.get(`/api/students/${id}`);
  }

  // Admitting a student needs a linked user account. Registration is admin-only on the
  // backend, so this runs under the owner's session: it registers the account with the
  // owner-chosen login ID + password (tokens in the response are discarded), posts the
  // student with the returned userId, then assesses their fee dues for the class (plus
  // an opening balance if the owner entered a pending amount). Fee assessment is
  // best-effort — a Fee.API hiccup doesn't undo the admission, it's just retried the
  // next time dues are viewed/assessed for this student.
  admitWithAccount(form: AdmitStudentForm): Observable<AdmittedStudent> {
    const suffix = Date.now().toString(36);
    const username = form.username.trim();
    const email = form.email?.trim() || `${username.toLowerCase()}@gkmps.local`;
    return this.api
      .post<{ userId: string }>('/api/auth/register', {
        email,
        username,
        password: form.password,
        fullName: form.fullName,
        role: 'Student',
      })
      .pipe(
        switchMap((res) =>
          this.api.post<Student>('/api/students', {
            linkedUserId: res.userId,
            admissionNumber: form.admissionNumber?.trim() || `ADM-${suffix}`,
            fullName: form.fullName,
            dateOfBirth: form.dateOfBirth ? `${form.dateOfBirth}T00:00:00Z` : undefined,
            gender: form.gender,
            classId: form.classId,
            sectionId: form.sectionId,
            parentName: form.parentName || undefined,
            parentPhone: form.parentPhone || undefined,
          }),
        ),
        switchMap((student) =>
          this.fees
            .assessDues(student.id, {
              classId: form.classId,
              academicYear: CURRENT_ACADEMIC_YEAR,
              openingBalance: form.pendingFee || undefined,
              openingBalanceDescription: form.pendingFee ? 'Pending fee at admission' : undefined,
            })
            .pipe(
              catchError(() => of(null)), // best-effort; don't undo the admission
              map(() => student),
            ),
        ),
        map((student) => ({ student, credentials: { username, password: form.password } })),
      );
  }

  changeClass(id: string, classId: string, sectionId: string): Observable<Student> {
    return this.api.patch(`/api/students/${id}/class`, { classId, sectionId });
  }

  activeByClass(): Observable<Array<{ classId: string; count: number }>> {
    return this.api.get('/api/students/stats/active-by-class');
  }

  requestTransferCertificate(
    studentId: string,
    reason: string,
    requestedLeavingDateUtc: string,
  ): Observable<unknown> {
    return this.api.post(`/api/transfer-certificates/students/${studentId}/request`, {
      reason,
      requestedLeavingDateUtc,
    });
  }

  approveTransferCertificate(id: string): Observable<unknown> {
    return this.api.post(`/api/transfer-certificates/${id}/approve`);
  }

  downloadTransferCertificate(id: string): Observable<DownloadLink> {
    return this.api.get(`/api/transfer-certificates/${id}/download`);
  }
}
