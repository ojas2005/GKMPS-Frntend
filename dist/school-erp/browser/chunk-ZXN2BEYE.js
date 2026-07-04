import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// src/app/features/communication/communication.service.ts
var _CommunicationService = class _CommunicationService {
  constructor() {
    this.api = inject(ApiService);
  }
  // role/classId scope the feed to what's relevant to the caller (the server does no
  // access-control filtering here — announcements are broadcasts, not private data —
  // so pass the caller's own role/classId to see what they'd actually be shown).
  // Note: unlike most list endpoints, this one returns a bare array, not a PagedResult.
  listAnnouncements(query = {}) {
    return this.api.get("/api/announcements", __spreadValues({ page: 1, pageSize: 20 }, query));
  }
  // targetRolesCsv/targetClassId select the audience (e.g. "Teacher", "Student", or
  // blank for everyone; targetClassId narrows to one class). A Teacher caller's values
  // are overridden server-side to their own class's students regardless of what's sent.
  createAnnouncement(body) {
    return this.api.post("/api/announcements", body);
  }
  sendParentMessage(body) {
    return this.api.post("/api/parent-messages", body);
  }
  parentMessageThread(studentId) {
    return this.api.get(`/api/parent-messages/students/${studentId}`);
  }
  markMessageRead(messageId) {
    return this.api.post(`/api/parent-messages/${messageId}/read`);
  }
};
_CommunicationService.\u0275fac = function CommunicationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CommunicationService)();
};
_CommunicationService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CommunicationService, factory: _CommunicationService.\u0275fac, providedIn: "root" });
var CommunicationService = _CommunicationService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CommunicationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  CommunicationService
};
//# sourceMappingURL=chunk-ZXN2BEYE.js.map
