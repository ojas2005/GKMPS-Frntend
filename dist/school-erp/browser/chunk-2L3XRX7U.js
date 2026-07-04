import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import {
  Injectable,
  inject,
  map,
  setClassMetadata,
  switchMap,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// src/app/features/teachers/teachers.service.ts
var _TeachersService = class _TeachersService {
  constructor() {
    this.api = inject(ApiService);
  }
  list(query = {}) {
    return this.api.get("/api/staff", __spreadValues({ page: 1, pageSize: 20 }, query));
  }
  get(id) {
    return this.api.get(`/api/staff/${id}`);
  }
  // The logged-in staff member's own profile (teacher portal).
  me() {
    return this.api.get("/api/staff/me");
  }
  // Onboarding needs a linked user account. Registers it with the owner-chosen login
  // ID + password (admin-only endpoint; tokens discarded), then posts the staff record.
  onboardWithAccount(form) {
    const suffix = Date.now().toString(36);
    const username = form.username.trim();
    const email = form.email?.trim() || `${username.toLowerCase()}@gkmps.local`;
    return this.api.post("/api/auth/register", {
      email,
      username,
      password: form.password,
      fullName: form.fullName,
      role: form.role || "Teacher"
    }).pipe(switchMap((res) => this.api.post("/api/staff", {
      linkedUserId: res.userId,
      employeeCode: form.employeeCode?.trim() || `EMP-${suffix}`,
      fullName: form.fullName,
      designation: form.designation,
      subjectsTaughtCsv: form.subjectsTaughtCsv || void 0,
      phone: form.phone || void 0,
      email,
      classTeacherOfClassId: form.classTeacherOfClassId || void 0,
      classTeacherOfSectionId: form.classTeacherOfSectionId || void 0,
      monthlySalary: form.monthlySalary || void 0
    })), map((staff) => ({ staff, credentials: { username, password: form.password } })));
  }
  // Make/unmake a teacher the class teacher (head teacher) of a class/section.
  assignClassTeacher(staffId, classId, sectionId) {
    return this.api.patch(`/api/staff/${staffId}/class-teacher`, { classId, sectionId });
  }
  // Owner defines/updates a teacher's monthly salary.
  setSalary(staffId, monthlySalary) {
    return this.api.patch(`/api/staff/${staffId}/salary`, { monthlySalary });
  }
  // ---- Pending salary (MonthlySalary minus payouts recorded this calendar month) ----
  pendingSalaryForStaff(staffId) {
    return this.api.get(`/api/payouts/staff/${staffId}/pending`);
  }
  myPendingSalary() {
    return this.api.get("/api/payouts/me/pending");
  }
  // ---- Payouts ----
  recordPayout(body) {
    return this.api.post("/api/payouts", body);
  }
  payoutsForStaff(staffId) {
    return this.api.get(`/api/payouts/staff/${staffId}`);
  }
  myPayouts() {
    return this.api.get("/api/payouts/me");
  }
  // ---- Staff attendance ----
  markStaffAttendance(body) {
    return this.api.post("/api/staff-attendance", body);
  }
  staffAttendance(staffId, from, to) {
    return this.api.get(`/api/staff-attendance/staff/${staffId}`, { from, to });
  }
  myAttendance(from, to) {
    return this.api.get("/api/staff-attendance/me", { from, to });
  }
  requestLeave(staffId, body) {
    return this.api.post(`/api/staff/${staffId}/leave-requests`, body);
  }
  decideLeave(staffId, leaveRequestId, approve, note) {
    return this.api.post(`/api/staff/${staffId}/leave-requests/${leaveRequestId}/decision`, { approve, note });
  }
};
_TeachersService.\u0275fac = function TeachersService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TeachersService)();
};
_TeachersService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeachersService, factory: _TeachersService.\u0275fac, providedIn: "root" });
var TeachersService = _TeachersService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeachersService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  TeachersService
};
//# sourceMappingURL=chunk-2L3XRX7U.js.map
