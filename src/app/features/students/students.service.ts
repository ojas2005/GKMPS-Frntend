import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsersService } from '../../core/services/users.service';
import { ApiService } from '../../core/http/api.service';
import { DownloadLink, PagedResult } from '../../core/models/api-response';
import { FeesService } from '../fees/fees.service';
import { CURRENT_ACADEMIC_YEAR } from '../../core/constants/classes';

export interface Student {
  id: string;
  linkedUserId?: string;
  admissionNumber?: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  classId?: string;
  sectionId?: string;
  rollNumber?: string;
  guardianName?: string;
  guardianPhone?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  address?: string;
  status?: string;
  parentUserId?: string | null;
  [key: string]: unknown;
}

// Everything editable on the student detail page's "Edit details" form -- the same set
// collected at admission, minus login credentials (Identity.API-owned, handled by the
// separate password-reset action).
export interface UpdateStudentDetails {
  admissionNumber: string;
  fullName: string;
  dateOfBirth: string; // "yyyy-mm-dd"
  gender: string;
  classId: string;
  sectionId: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  address?: string;
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
  parentEmail?: string;
  parentPhone?: string;
  // Optional Parent login -- lets the guardian see this student's attendance, results and fees.
  parentUsername?: string;
  parentPassword?: string;
  pendingFee?: number; // fee already pending/owed at admission, e.g. from a previous school
}

export interface Credentials {
  username: string;
  password: string;
}

export interface AdmittedStudent {
  student: Student;
  credentials: Credentials;
  parentCredentials?: Credentials;
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
  private users = inject(UsersService);

  list(query: StudentQuery = {}): Observable<PagedResult<Student>> {
    return this.api.get('/api/students', { page: 1, pageSize: 20, ...query });
  }

  get(id: string): Observable<Student> {
    return this.api.get(`/api/students/${id}`);
  }

  // Admitting a student needs a linked user account (and optionally a Parent login).
  // Registration is admin-only on the backend, so this runs under the owner's session: it
  // registers the account(s) with the owner-chosen login IDs + passwords (tokens in the
  // responses are discarded), posts the student with the returned user ids, then assesses
  // their fee dues. If creating the student record fails, the just-created logins are
  // deleted again so a retry with the same login IDs works. Fee assessment is
  // best-effort -- a Fee.API hiccup doesn't undo the admission.
  admitWithAccount(form: AdmitStudentForm): Observable<AdmittedStudent> {
    const suffix = Date.now().toString(36);
    const username = form.username.trim();
    const parentUsername = form.parentUsername?.trim() || '';
    const created: string[] = [];

    const register$ = (login: string, password: string, fullName: string, role: 'Student' | 'Parent', email?: string) =>
      this.api
        .post<{ userId: string }>('/api/auth/register', {
          email: email?.trim() || `${login.toLowerCase()}@gkmps.local`,
          username: login,
          password,
          fullName,
          role,
        })
        .pipe(map((res) => { created.push(res.userId); return res.userId; }));

    return register$(username, form.password, form.fullName, 'Student', form.email)
      .pipe(
        switchMap((studentUserId) => {
          const parent$: Observable<string | null> = parentUsername
            ? register$(parentUsername, form.parentPassword ?? '', form.parentName?.trim() || `Parent of ${form.fullName}`, 'Parent', form.parentEmail)
            : of(null);
          return parent$.pipe(map((parentUserId) => ({ studentUserId, parentUserId })));
        }),
        switchMap(({ studentUserId, parentUserId }) =>
          this.api.post<Student>('/api/students', {
            linkedUserId: studentUserId,
            parentUserId: parentUserId ?? undefined,
            admissionNumber: form.admissionNumber?.trim() || `ADM-${suffix}`,
            fullName: form.fullName,
            dateOfBirth: form.dateOfBirth ? `${form.dateOfBirth}T00:00:00Z` : undefined,
            gender: form.gender,
            classId: form.classId,
            sectionId: form.sectionId,
            parentName: form.parentName || undefined,
            parentEmail: form.parentEmail || undefined,
            parentPhone: form.parentPhone || undefined,
          }),
        ),
        catchError((err) => this.rollbackLogins(created).pipe(switchMap(() => throwError(() => err)))),
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
        map((student) => ({
          student,
          credentials: { username, password: form.password },
          parentCredentials: parentUsername ? { username: parentUsername, password: form.parentPassword ?? '' } : undefined,
        })),
      );
  }

  // Creates a Parent login for an existing student and links it; rolls the login back if
  // linking fails.
  createParentLogin(student: Student, username: string, password: string): Observable<Student> {
    const login = username.trim();
    return this.api
      .post<{ userId: string }>('/api/auth/register', {
        email: student.parentEmail?.trim() || `${login.toLowerCase()}@gkmps.local`,
        username: login,
        password,
        fullName: student.parentName?.trim() || `Parent of ${student.fullName}`,
        role: 'Parent',
      })
      .pipe(
        switchMap((res) =>
          this.linkParent(student.id, res.userId).pipe(
            catchError((err) => this.rollbackLogins([res.userId]).pipe(switchMap(() => throwError(() => err)))),
          ),
        ),
      );
  }

  linkParent(studentId: string, parentUserId: string | null): Observable<Student> {
    return this.api.patch(`/api/students/${studentId}/parent-account`, { parentUserId });
  }

  private rollbackLogins(userIds: string[]): Observable<unknown> {
    if (userIds.length === 0) return of(null);
    return forkJoin(userIds.map((id) => this.users.deleteUnused(id).pipe(catchError(() => of(null)))));
  }

  changeClass(id: string, classId: string, sectionId: string): Observable<Student> {
    return this.api.patch(`/api/students/${id}/class`, { classId, sectionId });
  }

  // Full edit of everything collected at admission (name, DOB, gender, class/section,
  // admission number, guardian details) in one shot.
  update(id: string, details: UpdateStudentDetails): Observable<Student> {
    return this.api.put(`/api/students/${id}`, {
      ...details,
      dateOfBirth: `${details.dateOfBirth}T00:00:00Z`,
    });
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

  /** Erases a former student's personal data (right to erasure). Needs the admission number to confirm. */
  erasePersonalData(id: string, confirmAdmissionNumber: string): Observable<unknown> {
    return this.api.post(`/api/students/${id}/erase-personal-data`, { confirmAdmissionNumber });
  }
}
