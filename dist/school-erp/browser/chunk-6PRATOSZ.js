import {
  FeesService
} from "./chunk-LRGA3DNB.js";
import {
  CURRENT_ACADEMIC_YEAR
} from "./chunk-WTXCDO4J.js";
import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import {
  Injectable,
  catchError,
  inject,
  map,
  of,
  setClassMetadata,
  switchMap,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// src/app/features/students/students.service.ts
var _StudentsService = class _StudentsService {
  constructor() {
    this.api = inject(ApiService);
    this.fees = inject(FeesService);
  }
  list(query = {}) {
    return this.api.get("/api/students", __spreadValues({ page: 1, pageSize: 20 }, query));
  }
  get(id) {
    return this.api.get(`/api/students/${id}`);
  }
  // Admitting a student needs a linked user account. Registration is admin-only on the
  // backend, so this runs under the owner's session: it registers the account with the
  // owner-chosen login ID + password (tokens in the response are discarded), posts the
  // student with the returned userId, then assesses their fee dues for the class (plus
  // an opening balance if the owner entered a pending amount). Fee assessment is
  // best-effort — a Fee.API hiccup doesn't undo the admission, it's just retried the
  // next time dues are viewed/assessed for this student.
  admitWithAccount(form) {
    const suffix = Date.now().toString(36);
    const username = form.username.trim();
    const email = form.email?.trim() || `${username.toLowerCase()}@gkmps.local`;
    return this.api.post("/api/auth/register", {
      email,
      username,
      password: form.password,
      fullName: form.fullName,
      role: "Student"
    }).pipe(switchMap((res) => this.api.post("/api/students", {
      linkedUserId: res.userId,
      admissionNumber: form.admissionNumber?.trim() || `ADM-${suffix}`,
      fullName: form.fullName,
      dateOfBirth: form.dateOfBirth ? `${form.dateOfBirth}T00:00:00Z` : void 0,
      gender: form.gender,
      classId: form.classId,
      sectionId: form.sectionId,
      parentName: form.parentName || void 0,
      parentPhone: form.parentPhone || void 0
    })), switchMap((student) => this.fees.assessDues(student.id, {
      classId: form.classId,
      academicYear: CURRENT_ACADEMIC_YEAR,
      openingBalance: form.pendingFee || void 0,
      openingBalanceDescription: form.pendingFee ? "Pending fee at admission" : void 0
    }).pipe(
      catchError(() => of(null)),
      // best-effort; don't undo the admission
      map(() => student)
    )), map((student) => ({ student, credentials: { username, password: form.password } })));
  }
  changeClass(id, classId, sectionId) {
    return this.api.patch(`/api/students/${id}/class`, { classId, sectionId });
  }
  activeByClass() {
    return this.api.get("/api/students/stats/active-by-class");
  }
  requestTransferCertificate(studentId, reason, requestedLeavingDateUtc) {
    return this.api.post(`/api/transfer-certificates/students/${studentId}/request`, {
      reason,
      requestedLeavingDateUtc
    });
  }
  approveTransferCertificate(id) {
    return this.api.post(`/api/transfer-certificates/${id}/approve`);
  }
  downloadTransferCertificate(id) {
    return this.api.get(`/api/transfer-certificates/${id}/download`);
  }
};
_StudentsService.\u0275fac = function StudentsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StudentsService)();
};
_StudentsService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StudentsService, factory: _StudentsService.\u0275fac, providedIn: "root" });
var StudentsService = _StudentsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  StudentsService
};
//# sourceMappingURL=chunk-6PRATOSZ.js.map
