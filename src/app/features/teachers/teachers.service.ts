import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsersService } from '../../core/services/users.service';
import { ApiService } from '../../core/http/api.service';
import { PagedResult } from '../../core/models/api-response';

// Staff.API — "Teachers" in the UI maps to staff with a Teacher designation.
export interface Staff {
  id: string;
  linkedUserId?: string;
  fullName: string;
  employeeCode?: string;
  designation?: string;
  subjectsTaughtCsv?: string;
  email?: string;
  phone?: string;
  status?: string;
  classTeacherOfClassId?: string | null;
  classTeacherOfSectionId?: string | null;
  monthlySalary?: number | null;
  [key: string]: unknown;
}

export interface PendingSalary {
  staffId: string;
  monthlySalary: number | null;
  paidThisMonth: number;
  pendingSalary: number;
  periodLabel: string;
}

export interface Payout {
  id: string;
  staffId: string;
  amount: number;
  periodLabel: string;
  paidOnUtc: string;
  method?: string;
  reference?: string;
  notes?: string;
}

export interface StaffAttendanceRecord {
  id: string;
  staffId: string;
  date: string;
  status: string;
  markedAtUtc?: string;
}

// What the onboard form collects. The owner sets the teacher's login ID + password.
export interface OnboardStaffForm {
  fullName: string;
  designation: string;
  role: string; // login role for the account (Teacher, Accountant, Librarian, ...)
  username: string; // login ID the owner gives the teacher
  password: string; // password the owner gives the teacher
  email?: string; // optional; synthesized from the login ID if blank
  phone?: string;
  employeeCode?: string; // auto-generated if blank
  subjectsTaughtCsv?: string;
  // Set when this teacher should be the class teacher (head teacher) of a class/section.
  classTeacherOfClassId?: string;
  classTeacherOfSectionId?: string;
  // The owner defines this now or later (editable on the teacher's detail page).
  monthlySalary?: number;
}

export interface OnboardedStaff {
  staff: Staff;
  credentials: { username: string; password: string };
}

export interface StaffQuery {
  designation?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class TeachersService {
  private api = inject(ApiService);
  private users = inject(UsersService);

  list(query: StaffQuery = {}): Observable<PagedResult<Staff>> {
    return this.api.get('/api/staff', { page: 1, pageSize: 20, ...query });
  }

  get(id: string): Observable<Staff> {
    return this.api.get(`/api/staff/${id}`);
  }

  // The logged-in staff member's own profile (teacher portal).
  me(): Observable<Staff> {
    return this.api.get('/api/staff/me');
  }

  // Onboarding needs a linked user account. Registers it with the owner-chosen login
  // ID + password (admin-only endpoint; tokens discarded), then posts the staff record.
  // If the staff record can't be created, the new login is deleted again so the same
  // login ID can be retried.
  onboardWithAccount(form: OnboardStaffForm): Observable<OnboardedStaff> {
    const suffix = Date.now().toString(36);
    const username = form.username.trim();
    const email = form.email?.trim() || `${username.toLowerCase()}@gkmps.local`;
    return this.api
      .post<{ userId: string }>('/api/auth/register', {
        email,
        username,
        password: form.password,
        fullName: form.fullName,
        role: form.role || 'Teacher',
      })
      .pipe(
        switchMap((res) =>
          this.api.post<Staff>('/api/staff', {
            linkedUserId: res.userId,
            employeeCode: form.employeeCode?.trim() || `EMP-${suffix}`,
            fullName: form.fullName,
            designation: form.designation,
            subjectsTaughtCsv: form.subjectsTaughtCsv || undefined,
            phone: form.phone || undefined,
            email,
            classTeacherOfClassId: form.classTeacherOfClassId || undefined,
            classTeacherOfSectionId: form.classTeacherOfSectionId || undefined,
            monthlySalary: form.monthlySalary || undefined,
          }).pipe(
            catchError((err) =>
              this.users.deleteUnused(res.userId).pipe(catchError(() => of(null)), switchMap(() => throwError(() => err))),
            ),
          ),
        ),
        map((staff) => ({ staff, credentials: { username, password: form.password } })),
      );
  }

  // Make/unmake a teacher the class teacher (head teacher) of a class/section.
  assignClassTeacher(staffId: string, classId: string | null, sectionId: string | null): Observable<Staff> {
    return this.api.patch(`/api/staff/${staffId}/class-teacher`, { classId, sectionId });
  }

  // Owner defines/updates a teacher's monthly salary.
  setSalary(staffId: string, monthlySalary: number): Observable<Staff> {
    return this.api.patch(`/api/staff/${staffId}/salary`, { monthlySalary });
  }

  // ---- Pending salary (MonthlySalary minus payouts recorded this calendar month) ----
  pendingSalaryForStaff(staffId: string): Observable<PendingSalary> {
    return this.api.get(`/api/payouts/staff/${staffId}/pending`);
  }

  myPendingSalary(): Observable<PendingSalary> {
    return this.api.get('/api/payouts/me/pending');
  }

  // ---- Payouts ----
  recordPayout(body: {
    staffId: string;
    amount: number;
    periodLabel: string;
    method?: string;
    reference?: string;
    notes?: string;
  }): Observable<Payout> {
    return this.api.post('/api/payouts', body);
  }

  payoutsForStaff(staffId: string): Observable<Payout[]> {
    return this.api.get(`/api/payouts/staff/${staffId}`);
  }

  myPayouts(): Observable<Payout[]> {
    return this.api.get('/api/payouts/me');
  }

  // ---- Staff attendance ----
  markStaffAttendance(body: { staffId: string; date: string; status: string }): Observable<StaffAttendanceRecord> {
    return this.api.post('/api/staff-attendance', body);
  }

  staffAttendance(staffId: string, from: string, to: string): Observable<StaffAttendanceRecord[]> {
    return this.api.get(`/api/staff-attendance/staff/${staffId}`, { from, to });
  }

  myAttendance(from: string, to: string): Observable<StaffAttendanceRecord[]> {
    return this.api.get('/api/staff-attendance/me', { from, to });
  }

  requestLeave(
    staffId: string,
    body: { leaveType: string; fromDateUtc: string; toDateUtc: string; reason: string },
  ): Observable<unknown> {
    return this.api.post(`/api/staff/${staffId}/leave-requests`, body);
  }

  decideLeave(
    staffId: string,
    leaveRequestId: string,
    approve: boolean,
    note?: string,
  ): Observable<unknown> {
    return this.api.post(
      `/api/staff/${staffId}/leave-requests/${leaveRequestId}/decision`,
      { approve, note },
    );
  }
}
