import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";

// src/app/features/reports/reports.service.ts
var _ReportsService = class _ReportsService {
  constructor() {
    this.api = inject(ApiService);
  }
  enrollment() {
    return this.api.get("/api/reports/enrollment");
  }
  enrollmentPdf() {
    return this.api.getBlob("/api/reports/enrollment/pdf");
  }
  feeCollection(fromUtc, toUtc) {
    return this.api.get("/api/reports/fee-collection", { fromUtc, toUtc });
  }
};
_ReportsService.\u0275fac = function ReportsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReportsService)();
};
_ReportsService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportsService, factory: _ReportsService.\u0275fac, providedIn: "root" });
var ReportsService = _ReportsService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ReportsService
};
//# sourceMappingURL=chunk-OCX3DFFD.js.map
