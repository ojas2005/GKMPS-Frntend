import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";

// src/app/features/fees/fees.service.ts
var _FeesService = class _FeesService {
  constructor() {
    this.api = inject(ApiService);
  }
  listStructures(classId, academicYear) {
    return this.api.get("/api/fee-structures", { classId, academicYear });
  }
  createStructure(body) {
    return this.api.post("/api/fee-structures", body);
  }
  // Called right after admitting a student (class + fee structures already known):
  // creates one due per unassessed structure for their class/year, plus an optional
  // one-time opening balance for fee that was already pending at admission.
  assessDues(studentId, body) {
    return this.api.post(`/api/fee-payments/students/${studentId}/assess`, body);
  }
  // Pay a due — either a class-structure due (feeStructureId; creates the row on first
  // payment if needed) or a specific due row directly (feePaymentId; the only way to pay
  // an ad-hoc due like an opening balance, which has no FeeStructure to key off).
  pay(body) {
    return this.api.post("/api/fee-payments", body);
  }
  // A student's own fee ledger (scoped server-side to the caller).
  myPayments(studentId) {
    return this.api.get(`/api/fee-payments/students/${studentId}`);
  }
  // Owner view: every student with a due in this class, with their pending total.
  pendingSummaryByClass(classId) {
    return this.api.get("/api/fee-payments/pending-summary", { classId });
  }
  // Owner logs a fee submission directly on a student's page: amount + a custom period
  // (e.g. "May 2026 - Jun 2026") + description — no FeeStructure needs to exist first.
  // Immediately fully paid; produces a receipt right away.
  submitPayment(studentId, body) {
    return this.api.post(`/api/fee-payments/students/${studentId}/submit`, body);
  }
  // Every receipt across a student's dues (scoped server-side to the caller).
  transactionsForStudent(studentId) {
    return this.api.get(`/api/fee-payments/students/${studentId}/transactions`);
  }
  receipt(transactionId) {
    return this.api.get(`/api/fee-payments/transactions/${transactionId}/receipt`);
  }
  requestWaiver(body) {
    return this.api.post("/api/fee-payments/waivers/request", body);
  }
  approveWaiver(feePaymentId) {
    return this.api.post(`/api/fee-payments/${feePaymentId}/waivers/approve`);
  }
  collectionTotals(fromUtc, toUtc) {
    return this.api.get("/api/fee-payments/collection-totals", { fromUtc, toUtc });
  }
};
_FeesService.\u0275fac = function FeesService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FeesService)();
};
_FeesService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FeesService, factory: _FeesService.\u0275fac, providedIn: "root" });
var FeesService = _FeesService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FeesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  FeesService
};
//# sourceMappingURL=chunk-LRGA3DNB.js.map
