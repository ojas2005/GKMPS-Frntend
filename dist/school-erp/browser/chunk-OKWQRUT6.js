import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";

// src/app/features/examination/examination.service.ts
var _ExaminationService = class _ExaminationService {
  constructor() {
    this.api = inject(ApiService);
  }
  list(classId) {
    return this.api.get("/api/exams", { classId });
  }
  create(body) {
    return this.api.post("/api/exams", body);
  }
  publish(examId) {
    return this.api.post(`/api/exams/${examId}/publish`);
  }
  stats(examId) {
    return this.api.get(`/api/exams/${examId}/stats`);
  }
  reportCard(examId, studentId) {
    return this.api.get(`/api/exams/${examId}/students/${studentId}/report-card`);
  }
  // All results for one student (a student sees only their own published results).
  studentResults(studentId) {
    return this.api.get(`/api/exams/students/${studentId}/results`);
  }
  addMarks(examId, body) {
    return this.api.post(`/api/exams/${examId}/marks`, body);
  }
  correctMarks(examId, marksEntryId, marks) {
    return this.api.patch(`/api/exams/${examId}/marks/${marksEntryId}`, { marks });
  }
};
_ExaminationService.\u0275fac = function ExaminationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExaminationService)();
};
_ExaminationService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExaminationService, factory: _ExaminationService.\u0275fac, providedIn: "root" });
var ExaminationService = _ExaminationService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExaminationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ExaminationService
};
//# sourceMappingURL=chunk-OKWQRUT6.js.map
