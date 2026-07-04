import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";

// src/app/features/attendance/attendance.service.ts
var _AttendanceService = class _AttendanceService {
  constructor() {
    this.api = inject(ApiService);
  }
  mark(body) {
    return this.api.post("/api/attendance", body);
  }
  getClass(classId, sectionId, date) {
    return this.api.get("/api/attendance/class", { classId, sectionId, date });
  }
  studentPercentage(studentId, from, to) {
    return this.api.get(`/api/attendance/students/${studentId}/percentage`, { from, to });
  }
  // Day-by-day log for one student (a student may only fetch their own).
  studentRecords(studentId, from, to) {
    return this.api.get(`/api/attendance/students/${studentId}/records`, { from, to });
  }
};
_AttendanceService.\u0275fac = function AttendanceService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AttendanceService)();
};
_AttendanceService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AttendanceService, factory: _AttendanceService.\u0275fac, providedIn: "root" });
var AttendanceService = _AttendanceService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttendanceService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AttendanceService
};
//# sourceMappingURL=chunk-ARTF4EA6.js.map
