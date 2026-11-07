import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsersService } from '../../core/services/users.service';
import { ApiService } from '../../core/http/api.service';
import { DownloadLink, PagedResult } from '../../core/models/api-response';

export interface Student {
  id: string;
  /** Only on students admitted when they still had a login of their own. */
  linkedUserId?: string | null;
  admissionNumber?: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  classId?: string;
  sectionId?: string;
  rollNumber?: string;
  fatherName?: string | null;
  fatherPhone?: string | null;
  fatherEmail?: string | null;
  motherName?: string | null;
  motherPhone?: string | null;
  motherEmail?: string | null;
  /** The single guardian contact recorded before father and mother were kept separately. */
  parentName?: string | null;
  parentEmail?: string | null;
  parentPhone?: string | null;
  address?: string;
  /** Active, Removed, TransferredOut (left with a TC) or Erased. */
  status?: string;
  parentUserId?: string | null;
  removedAtUtc?: string | null;
  removalReason?: string | null;
  [key: string]: unknown;
}

/** Father's and mother's details: name and mobile number are required for both. */
export interface ParentDetails {
  fatherName: string;
  fatherPhone: string;
  fatherEmail?: string;
  motherName: string;
  motherPhone: string;
  motherEmail?: string;
}

// Everything editable on the student detail page's "Edit details" form -- the same set
// collected at admission, minus the parent's login (handled by the password-reset action).
export interface UpdateStudentDetails extends ParentDetails {
  admissionNumber: string;
  fullName: string;
  dateOfBirth: string; // "yyyy-mm-dd"
  gender: string;
  classId: string;
  sectionId: string;
  address?: string;
}

// What the admit form collects. Students have no login: the office creates the parent's
// login (the parent sees attendance, marks and fees). The class's fee structure is put on
// the student's account by the server; previousDues is anything owed from before.
export interface AdmitStudentForm extends ParentDetails {
  fullName: string;
  dateOfBirth: string; // "yyyy-mm-dd" from a date input
  gender: string;
  classId: string;
  sectionId: string;
  admissionNumber?: string; // auto-generated if blank
  address?: string;
  parentUsername: string; // login ID the office gives the parents
  parentPassword: string;
  previousDues?: number;
}

export interface Credentials {
  username: string;
  password: string;
}

/** What admission put on the student's fee account. */
export interface AdmissionFees {
  academicYear: string;
  classFees: Array<{ name: string; amount: number }>;
  previousDues: number;
  totalPending: number;
  warning?: string | null;
}

export interface AdmittedStudent {
  student: Student;
  fees: AdmissionFees;
  parentCredentials: Credentials;
}

/** Which students a list shows: still at school, removed/left, or everyone. */
export type RosterStatus = 'current' | 'removed' | 'all';

export interface StudentQuery {
  classId?: string;
  sectionId?: string;
  keyword?: string;
  status?: RosterStatus;
  page?: number;
  pageSize?: number;
}

/** Father's name (or the older single guardian name) for lists. */
export function guardianOf(s: Student): string {
  return s.fatherName || s.motherName || s.parentName || '—';
}

/** Plain-language status. */
export function studentStatusLabel(status?: string): string {
  switch (status) {
    case 'Removed': return 'Removed';
    case 'TransferredOut': return 'Left (TC issued)';
    case 'Erased': return 'Left (data erased)';
    default: return 'Current';
  }
}

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private api = inject(ApiService);
  private users = inject(UsersService);

  list(query: StudentQuery = {}): Observable<PagedResult<Student>> {
    return this.api.get('/api/students', { page: 1, pageSize: 20, ...query });
  }

  get(id: string): Observable<Student> {
    return this.api.get(`/api/students/${id}`);
  }

  // Admission runs under the office's session: it creates the parent's login with the
  // office-chosen login ID + password, then the student record linked to it. The server puts
  // the class's fee structure (plus any previous dues) on the student's account and says what
  // it added. If the student record can't be created, the new login is deleted again so a
  // retry with the same login ID works.
  admitWithAccount(form: AdmitStudentForm): Observable<AdmittedStudent> {
    const suffix = Date.now().toString(36);
    const parentUsername = form.parentUsername.trim();
    const contactEmail = form.fatherEmail?.trim() || form.motherEmail?.trim();
    let parentUserId: string | null = null;

    return this.api
      .post<{ userId: string }>('/api/auth/register', {
        email: contactEmail || `${parentUsername.toLowerCase()}@gkmps.local`,
        username: parentUsername,
        password: form.parentPassword,
        fullName: `${form.fatherName.trim()} & ${form.motherName.trim()}`,
        role: 'Parent',
      })
      .pipe(
        switchMap((res) => {
          parentUserId = res.userId;
          return this.api.post<{ student: Student; fees: AdmissionFees }>('/api/students', {
            parentUserId,
            admissionNumber: form.admissionNumber?.trim() || `ADM-${suffix}`,
            fullName: form.fullName.trim(),
            dateOfBirth: `${form.dateOfBirth}T00:00:00Z`,
            gender: form.gender,
            classId: form.classId,
            sectionId: form.sectionId,
            fatherName: form.fatherName.trim(),
            fatherPhone: form.fatherPhone.trim(),
            fatherEmail: form.fatherEmail?.trim() || undefined,
            motherName: form.motherName.trim(),
            motherPhone: form.motherPhone.trim(),
            motherEmail: form.motherEmail?.trim() || undefined,
            address: form.address?.trim() || undefined,
            previousDues: form.previousDues || undefined,
          });
        }),
        catchError((err) =>
          this.rollbackLogins(parentUserId ? [parentUserId] : []).pipe(switchMap(() => throwError(() => err)))),
        map((res) => ({ ...res, parentCredentials: { username: parentUsername, password: form.parentPassword } })),
      );
  }

  /** Takes a current student off the rolls. Their parent's login is switched off unless a sibling uses it. */
  remove(id: string, reason?: string): Observable<Student> {
    return this.api.post(`/api/students/${id}/remove`, { reason: reason?.trim() || null });
  }

  /** Brings a removed student back, with their parent's login. */
  restore(id: string): Observable<Student> {
    return this.api.post(`/api/students/${id}/restore`, {});
  }

  // Creates a Parent login for an existing student and links it; rolls the login back if
  // linking fails.
  createParentLogin(student: Student, username: string, password: string): Observable<Student> {
    const login = username.trim();
    return this.api
      .post<{ userId: string }>('/api/auth/register', {
        email: (student.fatherEmail || student.motherEmail || student.parentEmail)?.trim() || `${login.toLowerCase()}@gkmps.local`,
        username: login,
        password,
        fullName: student.fatherName && student.motherName
          ? `${student.fatherName} & ${student.motherName}`
          : student.parentName?.trim() || `Parent of ${student.fullName}`,
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
