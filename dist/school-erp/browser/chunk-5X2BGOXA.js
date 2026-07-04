import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";

// src/app/features/academics/academics.service.ts
var _AcademicsService = class _AcademicsService {
  constructor() {
    this.api = inject(ApiService);
  }
  listSubjects(classId) {
    return this.api.get("/api/subjects", { classId });
  }
  createSubject(body) {
    return this.api.post("/api/subjects", body);
  }
  updateSyllabus(subjectId, syllabusOutline) {
    return this.api.patch(`/api/subjects/${subjectId}/syllabus`, { syllabusOutline });
  }
  getTimetable(classId, sectionId) {
    return this.api.get("/api/timetables", { classId, sectionId });
  }
  saveTimetable(body) {
    return this.api.put("/api/timetables", body);
  }
  listHomework(classId, sectionId) {
    return this.api.get("/api/homework", { classId, sectionId });
  }
  createHomework(body) {
    return this.api.post("/api/homework", body);
  }
};
_AcademicsService.\u0275fac = function AcademicsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AcademicsService)();
};
_AcademicsService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AcademicsService, factory: _AcademicsService.\u0275fac, providedIn: "root" });
var AcademicsService = _AcademicsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AcademicsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AcademicsService
};
//# sourceMappingURL=chunk-5X2BGOXA.js.map
