import {
  AuthService
} from "./chunk-MWX4V2YL.js";
import {
  StudentsService
} from "./chunk-6PRATOSZ.js";
import {
  FeesService
} from "./chunk-LRGA3DNB.js";
import {
  DEFAULT_CLASS,
  SCHOOL_CLASSES,
  classNameById,
  sectionNameById
} from "./chunk-WTXCDO4J.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-VTNFS7A5.js";
import "./chunk-35DAK2ZT.js";
import {
  RouterLink
} from "./chunk-QXXS42YF.js";
import "./chunk-JJL4A5HX.js";
import {
  CommonModule,
  Component,
  DatePipe,
  NgForOf,
  NgIf,
  catchError,
  forkJoin,
  inject,
  map,
  of,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4DDQFLM3.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// src/app/features/fees/pages/fees/fees.component.ts
var _c0 = (a0) => ["/students", a0];
function FeesComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function FeesComponent_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(!ctx_r1.showForm()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.showForm() ? "Close" : "+ Fee Structure", " ");
  }
}
function FeesComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "p", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.pendingTotal() > 0 ? "bg-error-50 border-error-200" : "bg-success-50 border-success-200");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.pendingTotal() > 0 ? "text-error-700" : "text-success-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.pendingTotal() > 0 ? "Amount to pay" : "Fee status", " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.pendingTotal() > 0 ? "text-error-700" : "text-success-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.pendingTotal() > 0 ? "\u20B9" + ctx_r1.pendingTotal() : "All paid \u2713", " ");
  }
}
function FeesComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "Loading your fees...");
    \u0275\u0275elementEnd();
  }
}
function FeesComponent_div_9_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function FeesComponent_div_9_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "No fee records yet.");
    \u0275\u0275elementEnd();
  }
}
function FeesComponent_div_9_table_4_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 23)(1, "td", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 21);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 26)(12, "span", 27);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const f_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r3.feeStructureName || f_r3.description || "Fee");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", f_r3["totalAmount"] ?? f_r3["amount"] ?? 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", f_r3["paidAmount"] ?? 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", f_r3["waiverAmount"] ?? 0);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.pending(f_r3) > 0 ? "text-error-600" : "text-success-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u20B9", ctx_r1.pending(f_r3));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(f_r3["status"] === "Paid" ? "bg-success-50 text-success-700" : f_r3["status"] === "PartiallyPaid" ? "bg-warning-50 text-warning-700" : "bg-error-50 text-error-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r3["status"] || "\u2014", " ");
  }
}
function FeesComponent_div_9_table_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 19)(1, "thead", 20)(2, "tr")(3, "th", 21);
    \u0275\u0275text(4, "Fee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 21);
    \u0275\u0275text(6, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 21);
    \u0275\u0275text(8, "Paid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 21);
    \u0275\u0275text(10, "Waiver");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 21);
    \u0275\u0275text(12, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 21);
    \u0275\u0275text(14, "Status");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, FeesComponent_div_9_table_4_tr_16_Template, 14, 10, "tr", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.myFees());
  }
}
function FeesComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275template(1, FeesComponent_div_9_div_1_Template, 2, 0, "div", 14)(2, FeesComponent_div_9_div_2_Template, 2, 1, "div", 15)(3, FeesComponent_div_9_div_3_Template, 2, 0, "div", 14)(4, FeesComponent_div_9_table_4_Template, 17, 1, "table", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading() && !ctx_r1.error() && ctx_r1.myFees().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading() && !ctx_r1.error() && ctx_r1.myFees().length > 0);
  }
}
function FeesComponent_div_10_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "No payments recorded yet.");
    \u0275\u0275elementEnd();
  }
}
function FeesComponent_div_10_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div")(2, "span", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 35);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 36);
    \u0275\u0275listener("click", function FeesComponent_div_10_div_4_Template_button_click_7_listener() {
      const t_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.downloadReceipt(t_r5.id));
    });
    \u0275\u0275text(8, "Download \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r5.periodLabel || t_r5.feeStructureName || t_r5.description || "Fee");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" \xB7 \u20B9", t_r5.amount, " \xB7 ", \u0275\u0275pipeBind2(6, 3, t_r5.paidAtUtc, "mediumDate"));
  }
}
function FeesComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "h2", 29);
    \u0275\u0275text(2, "Receipts");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, FeesComponent_div_10_p_3_Template, 2, 0, "p", 30)(4, FeesComponent_div_10_div_4_Template, 9, 6, "div", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.myTransactions().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.myTransactions());
  }
}
function FeesComponent_div_11_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r7 = ctx.$implicit;
    \u0275\u0275property("value", c_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r7.name);
  }
}
function FeesComponent_div_11_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1, " Total pending: ");
    \u0275\u0275elementStart(2, "span", 48);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r1.pendingClassTotal());
  }
}
function FeesComponent_div_11_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.pendingError());
  }
}
function FeesComponent_div_11_p_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "No dues for this class yet.");
    \u0275\u0275elementEnd();
  }
}
function FeesComponent_div_11_table_13_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 53)(1, "td", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 55);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 56);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 57);
    \u0275\u0275text(10, "View \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r8 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, r_r8.studentId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((r_r8.student == null ? null : r_r8.student.fullName) || r_r8.studentId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", r_r8.totalDue);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", r_r8.totalPaid);
    \u0275\u0275advance();
    \u0275\u0275classMap(r_r8.pending > 0 ? "text-error-600" : "text-success-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u20B9", r_r8.pending);
  }
}
function FeesComponent_div_11_table_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 19)(1, "thead", 50)(2, "tr")(3, "th", 51);
    \u0275\u0275text(4, "Student");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 51);
    \u0275\u0275text(6, "Total due");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 51);
    \u0275\u0275text(8, "Paid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 51);
    \u0275\u0275text(10, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, FeesComponent_div_11_table_13_tr_13_Template, 11, 9, "tr", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.pendingRows());
  }
}
function FeesComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "h2", 38);
    \u0275\u0275text(2, "Pending fees \u2014 by class");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 39);
    \u0275\u0275text(4, "Every student with a due in this class, most-pending first.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 40)(6, "select", 41);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_11_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.pendingClassId, $event) || (ctx_r1.pendingClassId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(7, FeesComponent_div_11_option_7_Template, 2, 2, "option", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 43);
    \u0275\u0275listener("click", function FeesComponent_div_11_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadPendingByClass());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, FeesComponent_div_11_span_10_Template, 4, 1, "span", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, FeesComponent_div_11_p_11_Template, 2, 1, "p", 45)(12, FeesComponent_div_11_p_12_Template, 2, 0, "p", 30)(13, FeesComponent_div_11_table_13_Template, 14, 1, "table", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pendingClassId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.classes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.pendingLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.pendingLoading() ? "Loading..." : "Load", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.pendingRows().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.pendingError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.pendingError() && ctx_r1.pendingLoaded() && ctx_r1.pendingRows().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.pendingRows().length > 0);
  }
}
function FeesComponent_div_12_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.searchError());
  }
}
function FeesComponent_div_12_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "No students matched.");
    \u0275\u0275elementEnd();
  }
}
function FeesComponent_div_12_table_11_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 53)(1, "td", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 55);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 56);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 57);
    \u0275\u0275text(8, "View \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, r_r10.student.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r10.student.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.className(r_r10.student.classId), "", r_r10.student.sectionId ? " - " + ctx_r1.sectionName(r_r10.student.sectionId) : "");
    \u0275\u0275advance();
    \u0275\u0275classMap(r_r10.pending > 0 ? "text-error-600" : "text-success-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r10.error ? "\u2014" : "\u20B9" + r_r10.pending, " ");
  }
}
function FeesComponent_div_12_table_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 19)(1, "thead", 50)(2, "tr")(3, "th", 51);
    \u0275\u0275text(4, "Student");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 51);
    \u0275\u0275text(6, "Class");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 51);
    \u0275\u0275text(8, "Pending fee");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "th", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275template(11, FeesComponent_div_12_table_11_tr_11_Template, 9, 9, "tr", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", ctx_r1.searchResults());
  }
}
function FeesComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "h2", 38);
    \u0275\u0275text(2, "Pending fees \u2014 search a student");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 39);
    \u0275\u0275text(4, "Search by name or admission number.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 58)(6, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_12_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.searchKeyword, $event) || (ctx_r1.searchKeyword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function FeesComponent_div_12_Template_input_keyup_enter_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.searchStudents());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 60);
    \u0275\u0275listener("click", function FeesComponent_div_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.searchStudents());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, FeesComponent_div_12_p_9_Template, 2, 1, "p", 45)(10, FeesComponent_div_12_p_10_Template, 2, 0, "p", 30)(11, FeesComponent_div_12_table_11_Template, 12, 1, "table", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.searchKeyword);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.searching());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.searching() ? "Searching..." : "Search", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.searchError() && ctx_r1.searched() && ctx_r1.searchResults().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchResults().length > 0);
  }
}
function FeesComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "h2", 29);
    \u0275\u0275text(2, "Collection totals");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 61)(4, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_13_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fromDate, $event) || (ctx_r1.fromDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_13_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.toDate, $event) || (ctx_r1.toDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 9);
    \u0275\u0275listener("click", function FeesComponent_div_13_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadTotals());
    });
    \u0275\u0275text(7, "Get total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 2);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fromDate);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.toDate);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.total() !== null ? "\u20B9" + ctx_r1.total() : "\u2014");
  }
}
function FeesComponent_div_14_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r13 = ctx.$implicit;
    \u0275\u0275property("value", c_r13.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r13.name);
  }
}
function FeesComponent_div_14_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function FeesComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 63)(2, "div")(3, "label", 64);
    \u0275\u0275text(4, "Name *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_14_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 64);
    \u0275\u0275text(8, "Class *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 66);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_14_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.classId, $event) || (ctx_r1.form.classId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(10, FeesComponent_div_14_option_10_Template, 2, 2, "option", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "label", 64);
    \u0275\u0275text(13, "Academic year *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 67);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_14_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.academicYear, $event) || (ctx_r1.form.academicYear = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "label", 64);
    \u0275\u0275text(17, "Amount *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_14_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.amount, $event) || (ctx_r1.form.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "label", 64);
    \u0275\u0275text(21, "Due date *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_14_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.dueDate, $event) || (ctx_r1.form.dueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "p", 70);
    \u0275\u0275text(24, " New structures apply to students admitted afterwards automatically. To backfill this due for already-admitted students in the class, re-open each student's page \u2014 dues sync there. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 71)(26, "button", 43);
    \u0275\u0275listener("click", function FeesComponent_div_14_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 72);
    \u0275\u0275listener("click", function FeesComponent_div_14_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fillSample());
    });
    \u0275\u0275text(29, "Fill sample");
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, FeesComponent_div_14_span_30_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.classId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.classes);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.academicYear);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.amount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.dueDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Create", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.formError());
  }
}
function FeesComponent_div_15_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r15 = ctx.$implicit;
    \u0275\u0275property("value", c_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r15.name);
  }
}
function FeesComponent_div_15_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function FeesComponent_div_15_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function FeesComponent_div_15_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, "No fee structures.");
    \u0275\u0275elementEnd();
  }
}
function FeesComponent_div_15_table_11_tr_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 23)(1, "td", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r16 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r16.name || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r16.academicYear || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r16.amount != null ? "\u20B9" + f_r16.amount : "\u2014");
  }
}
function FeesComponent_div_15_table_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 19)(1, "thead", 20)(2, "tr")(3, "th", 21);
    \u0275\u0275text(4, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 21);
    \u0275\u0275text(6, "Year");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 21);
    \u0275\u0275text(8, "Amount");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275template(10, FeesComponent_div_15_table_11_tr_10_Template, 7, 3, "tr", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.rows());
  }
}
function FeesComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 73)(2, "select", 74);
    \u0275\u0275twoWayListener("ngModelChange", function FeesComponent_div_15_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.filterClassId, $event) || (ctx_r1.filterClassId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(3, "option", 75);
    \u0275\u0275text(4, "All classes");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, FeesComponent_div_15_option_5_Template, 2, 2, "option", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 76);
    \u0275\u0275listener("click", function FeesComponent_div_15_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275text(7, "Load");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, FeesComponent_div_15_div_8_Template, 2, 0, "div", 14)(9, FeesComponent_div_15_div_9_Template, 2, 1, "div", 15)(10, FeesComponent_div_15_div_10_Template, 2, 0, "div", 14)(11, FeesComponent_div_15_table_11_Template, 11, 1, "table", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.filterClassId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.classes);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading() && !ctx_r1.error() && ctx_r1.rows().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading() && !ctx_r1.error() && ctx_r1.rows().length > 0);
  }
}
var _FeesComponent = class _FeesComponent {
  constructor() {
    this.service = inject(FeesService);
    this.studentsService = inject(StudentsService);
    this.auth = inject(AuthService);
    this.selfService = this.auth.isSelfService();
    this.myFees = signal([], ...ngDevMode ? [{ debugName: "myFees" }] : []);
    this.myTransactions = signal([], ...ngDevMode ? [{ debugName: "myTransactions" }] : []);
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
    this.formError = signal("", ...ngDevMode ? [{ debugName: "formError" }] : []);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.total = signal(null, ...ngDevMode ? [{ debugName: "total" }] : []);
    this.filterClassId = "";
    this.fromDate = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    this.toDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    this.classes = SCHOOL_CLASSES;
    this.className = classNameById;
    this.sectionName = sectionNameById;
    this.form = { name: "", classId: DEFAULT_CLASS.id, academicYear: "", amount: 0, dueDate: "" };
    this.pendingClassId = DEFAULT_CLASS.id;
    this.pendingRows = signal([], ...ngDevMode ? [{ debugName: "pendingRows" }] : []);
    this.pendingLoading = signal(false, ...ngDevMode ? [{ debugName: "pendingLoading" }] : []);
    this.pendingLoaded = signal(false, ...ngDevMode ? [{ debugName: "pendingLoaded" }] : []);
    this.pendingError = signal("", ...ngDevMode ? [{ debugName: "pendingError" }] : []);
    this.searchKeyword = "";
    this.searching = signal(false, ...ngDevMode ? [{ debugName: "searching" }] : []);
    this.searched = signal(false, ...ngDevMode ? [{ debugName: "searched" }] : []);
    this.searchError = signal("", ...ngDevMode ? [{ debugName: "searchError" }] : []);
    this.searchResults = signal([], ...ngDevMode ? [{ debugName: "searchResults" }] : []);
  }
  fillSample() {
    this.form = {
      name: "Tuition Term 1",
      classId: DEFAULT_CLASS.id,
      academicYear: "2026-27",
      amount: 25e3,
      dueDate: "2026-08-31"
    };
  }
  pending(f) {
    const total = Number(f["totalAmount"] ?? f["amount"] ?? 0);
    return Math.max(0, total - Number(f["paidAmount"] ?? 0) - Number(f["waiverAmount"] ?? 0));
  }
  pendingTotal() {
    return this.myFees().reduce((sum, f) => sum + this.pending(f), 0);
  }
  pendingClassTotal() {
    return this.pendingRows().reduce((sum, r) => sum + r.pending, 0);
  }
  ngOnInit() {
    if (this.selfService) {
      this.loadMine();
    } else {
      this.load();
      this.loadPendingByClass();
    }
  }
  loadMine() {
    const id = this.auth.studentId();
    if (!id) {
      this.error.set("Your account is not linked to a student record yet.");
      return;
    }
    this.loading.set(true);
    this.error.set("");
    this.service.myPayments(id).subscribe({
      next: (list) => {
        this.myFees.set(list ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load your fees."));
        this.loading.set(false);
      }
    });
    this.service.transactionsForStudent(id).subscribe({
      next: (list) => this.myTransactions.set(list ?? []),
      error: () => {
      }
    });
  }
  downloadReceipt(transactionId) {
    this.service.receipt(transactionId).subscribe({
      next: (link) => {
        if (link?.downloadUrl)
          window.open(link.downloadUrl, "_blank");
      },
      error: () => {
      }
    });
  }
  load() {
    this.loading.set(true);
    this.error.set("");
    this.service.listStructures(this.filterClassId || void 0).subscribe({
      next: (list) => {
        this.rows.set(list ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load fee structures."));
        this.loading.set(false);
      }
    });
  }
  loadPendingByClass() {
    this.pendingLoading.set(true);
    this.pendingError.set("");
    this.pendingLoaded.set(false);
    this.service.pendingSummaryByClass(this.pendingClassId).subscribe({
      next: (summary) => {
        const students = summary?.students ?? [];
        if (students.length === 0) {
          this.pendingRows.set([]);
          this.pendingLoading.set(false);
          this.pendingLoaded.set(true);
          return;
        }
        this.studentsService.list({ classId: this.pendingClassId, pageSize: 200 }).subscribe({
          next: (page) => {
            const byId = new Map((page?.items ?? []).map((s) => [s.id, s]));
            this.pendingRows.set(students.map((s) => __spreadProps(__spreadValues({}, s), { student: byId.get(s.studentId) })));
            this.pendingLoading.set(false);
            this.pendingLoaded.set(true);
          },
          error: () => {
            this.pendingRows.set(students.map((s) => __spreadValues({}, s)));
            this.pendingLoading.set(false);
            this.pendingLoaded.set(true);
          }
        });
      },
      error: (err) => {
        this.pendingError.set(this.msg(err, "Failed to load pending fees."));
        this.pendingLoading.set(false);
      }
    });
  }
  searchStudents() {
    if (!this.searchKeyword.trim())
      return;
    this.searching.set(true);
    this.searchError.set("");
    this.searched.set(false);
    this.studentsService.list({ keyword: this.searchKeyword, pageSize: 20 }).subscribe({
      next: (page) => {
        const students = page?.items ?? [];
        if (students.length === 0) {
          this.searchResults.set([]);
          this.searching.set(false);
          this.searched.set(true);
          return;
        }
        forkJoin(students.map((student) => this.service.myPayments(student.id).pipe(map((fees) => ({ student, pending: (fees ?? []).reduce((sum, f) => sum + this.pending(f), 0) })), catchError(() => of({ student, pending: 0, error: "Could not load fees" }))))).subscribe((results) => {
          this.searchResults.set(results.sort((a, b) => b.pending - a.pending));
          this.searching.set(false);
          this.searched.set(true);
        });
      },
      error: (err) => {
        this.searchError.set(this.msg(err, "Search failed."));
        this.searching.set(false);
      }
    });
  }
  loadTotals() {
    this.service.collectionTotals(this.fromDate + "T00:00:00Z", this.toDate + "T23:59:59Z").subscribe({
      next: (t) => this.total.set(t?.total ?? 0),
      error: () => this.total.set(null)
    });
  }
  save() {
    if (!this.form.name || !this.form.classId || !this.form.academicYear || !this.form.amount || !this.form.dueDate) {
      this.formError.set("Name, class, year, amount and due date are required.");
      return;
    }
    this.saving.set(true);
    this.formError.set("");
    this.service.createStructure({
      name: this.form.name,
      classId: this.form.classId,
      academicYear: this.form.academicYear,
      amount: this.form.amount,
      dueDateUtc: `${this.form.dueDate}T00:00:00Z`
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.showForm.set(false);
        this.form = { name: "", classId: "", academicYear: "", amount: 0, dueDate: "" };
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, "Could not create."));
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_FeesComponent.\u0275fac = function FeesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FeesComponent)();
};
_FeesComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FeesComponent, selectors: [["app-fees"]], decls: 16, vars: 11, consts: [[1, "p-6", "space-y-6"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], ["class", "px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium", 3, "click", 4, "ngIf"], ["class", "rounded-xl p-6 shadow-sm border", 3, "class", 4, "ngIf"], ["class", "bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden", 4, "ngIf"], ["class", "bg-white rounded-xl shadow-sm border border-neutral-200 p-6", 4, "ngIf"], ["class", "bg-white rounded-xl p-6 shadow-sm border border-neutral-200", 4, "ngIf"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], [1, "rounded-xl", "p-6", "shadow-sm", "border"], [1, "text-sm"], [1, "text-3xl", "font-bold"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "overflow-hidden"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "p-8 text-center text-error-600", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [1, "p-8", "text-center", "text-neutral-500"], [1, "p-8", "text-center", "text-error-600"], [1, "w-full", "text-sm"], [1, "bg-neutral-50", "text-neutral-600", "text-left"], [1, "px-6", "py-3", "font-medium"], ["class", "border-t border-neutral-200", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-200"], [1, "px-6", "py-3", "text-neutral-900"], [1, "px-6", "py-3", "text-neutral-600"], [1, "px-6", "py-3"], [1, "px-2", "py-1", "rounded-full", "text-xs"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "p-6"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-4"], ["class", "text-neutral-500 text-sm", 4, "ngIf"], ["class", "flex items-center justify-between py-2 text-sm border-t border-neutral-100 first:border-t-0", 4, "ngFor", "ngForOf"], [1, "text-neutral-500", "text-sm"], [1, "flex", "items-center", "justify-between", "py-2", "text-sm", "border-t", "border-neutral-100", "first:border-t-0"], [1, "text-neutral-900"], [1, "text-neutral-500"], [1, "text-primary-600", "hover:text-primary-700", "text-xs", "font-medium", 3, "click"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-1"], [1, "text-xs", "text-neutral-500", "mb-4"], [1, "flex", "items-center", "gap-3", "mb-4"], [1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["class", "text-sm text-neutral-600 ml-auto", 4, "ngIf"], ["class", "text-error-600 text-sm", 4, "ngIf"], [3, "value"], [1, "text-sm", "text-neutral-600", "ml-auto"], [1, "font-semibold", "text-error-600"], [1, "text-error-600", "text-sm"], [1, "text-neutral-500", "text-left", "text-xs"], [1, "py-2"], ["class", "border-t border-neutral-100 cursor-pointer hover:bg-neutral-50", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-100", "cursor-pointer", "hover:bg-neutral-50", 3, "routerLink"], [1, "py-2", "font-medium", "text-neutral-900"], [1, "py-2", "text-neutral-600"], [1, "py-2", "font-medium"], [1, "py-2", "text-primary-600", "text-right", "text-xs"], [1, "flex", "gap-3", "mb-4"], ["placeholder", "e.g. Aarav or ADM-1023", 1, "flex-1", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click", "disabled"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-4", "items-center"], ["type", "date", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["placeholder", "Tuition Term 1", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["placeholder", "2026-27", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "25000", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "text-xs", "text-neutral-500", "mt-3"], [1, "mt-4", "flex", "items-center", "gap-3"], ["type", "button", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], [1, "flex", "items-center", "gap-3", "p-4", "border-b", "border-neutral-200"], [1, "flex-1", "px-4", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["value", ""], [1, "px-4", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"]], template: function FeesComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, FeesComponent_button_7_Template, 2, 1, "button", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, FeesComponent_div_8_Template, 5, 8, "div", 5)(9, FeesComponent_div_9_Template, 5, 4, "div", 6)(10, FeesComponent_div_10_Template, 5, 2, "div", 7)(11, FeesComponent_div_11_Template, 14, 8, "div", 8)(12, FeesComponent_div_12_Template, 12, 6, "div", 8)(13, FeesComponent_div_13_Template, 10, 3, "div", 8)(14, FeesComponent_div_14_Template, 31, 9, "div", 8)(15, FeesComponent_div_15_Template, 12, 6, "div", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.selfService ? "My Fees" : "Fees");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.selfService ? "Your fee payments and dues." : "Fee structures, pending dues & collection totals from Fee.API.");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.showForm());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink, DatePipe], encapsulation: 2 });
var FeesComponent = _FeesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FeesComponent, [{
    type: Component,
    args: [{
      selector: "app-fees",
      standalone: true,
      imports: [CommonModule, FormsModule, RouterLink],
      template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">{{ selfService ? 'My Fees' : 'Fees' }}</h1>
          <p class="text-neutral-600 text-sm">{{ selfService ? 'Your fee payments and dues.' : 'Fee structures, pending dues & collection totals from Fee.API.' }}</p>
        </div>
        <button *ngIf="!selfService" (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Fee Structure' }}
        </button>
      </div>

      <!-- Self-service: pending summary + my fee ledger -->
      <div *ngIf="selfService" class="rounded-xl p-6 shadow-sm border"
        [class]="pendingTotal() > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
        <p class="text-sm" [class]="pendingTotal() > 0 ? 'text-error-700' : 'text-success-700'">
          {{ pendingTotal() > 0 ? 'Amount to pay' : 'Fee status' }}
        </p>
        <p class="text-3xl font-bold" [class]="pendingTotal() > 0 ? 'text-error-700' : 'text-success-700'">
          {{ pendingTotal() > 0 ? ('\u20B9' + pendingTotal()) : 'All paid \u2713' }}
        </p>
      </div>
      <div *ngIf="selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading your fees...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && myFees().length === 0" class="p-8 text-center text-neutral-500">No fee records yet.</div>
        <table *ngIf="!loading() && !error() && myFees().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Fee</th><th class="px-6 py-3 font-medium">Total</th><th class="px-6 py-3 font-medium">Paid</th><th class="px-6 py-3 font-medium">Waiver</th><th class="px-6 py-3 font-medium">Pending</th><th class="px-6 py-3 font-medium">Status</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let f of myFees()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ f.feeStructureName || f.description || 'Fee' }}</td>
              <td class="px-6 py-3 text-neutral-600">\u20B9{{ f['totalAmount'] ?? f['amount'] ?? 0 }}</td>
              <td class="px-6 py-3 text-neutral-600">\u20B9{{ f['paidAmount'] ?? 0 }}</td>
              <td class="px-6 py-3 text-neutral-600">\u20B9{{ f['waiverAmount'] ?? 0 }}</td>
              <td class="px-6 py-3 font-medium" [class]="pending(f) > 0 ? 'text-error-600' : 'text-success-600'">\u20B9{{ pending(f) }}</td>
              <td class="px-6 py-3">
                <span class="px-2 py-1 rounded-full text-xs"
                  [class]="(f['status'] === 'Paid') ? 'bg-success-50 text-success-700' : (f['status'] === 'PartiallyPaid' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
                  {{ f['status'] || '\u2014' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Self-service: receipts -->
      <div *ngIf="selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Receipts</h2>
        <p *ngIf="myTransactions().length === 0" class="text-neutral-500 text-sm">No payments recorded yet.</p>
        <div *ngFor="let t of myTransactions()" class="flex items-center justify-between py-2 text-sm border-t border-neutral-100 first:border-t-0">
          <div>
            <span class="text-neutral-900">{{ t.periodLabel || t.feeStructureName || t.description || 'Fee' }}</span>
            <span class="text-neutral-500"> \xB7 \u20B9{{ t.amount }} \xB7 {{ t.paidAtUtc | date:'mediumDate' }}</span>
          </div>
          <button (click)="downloadReceipt(t.id)" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Download \u2192</button>
        </div>
      </div>

      <!-- Owner/staff: pending fees by class -->
      <div *ngIf="!selfService" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-1">Pending fees \u2014 by class</h2>
        <p class="text-xs text-neutral-500 mb-4">Every student with a due in this class, most-pending first.</p>
        <div class="flex items-center gap-3 mb-4">
          <select [(ngModel)]="pendingClassId" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
            <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
          </select>
          <button (click)="loadPendingByClass()" [disabled]="pendingLoading()"
            class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ pendingLoading() ? 'Loading...' : 'Load' }}
          </button>
          <span *ngIf="pendingRows().length > 0" class="text-sm text-neutral-600 ml-auto">
            Total pending: <span class="font-semibold text-error-600">\u20B9{{ pendingClassTotal() }}</span>
          </span>
        </div>
        <p *ngIf="pendingError()" class="text-error-600 text-sm">{{ pendingError() }}</p>
        <p *ngIf="!pendingError() && pendingLoaded() && pendingRows().length === 0" class="text-neutral-500 text-sm">No dues for this class yet.</p>
        <table *ngIf="pendingRows().length > 0" class="w-full text-sm">
          <thead class="text-neutral-500 text-left text-xs">
            <tr><th class="py-2">Student</th><th class="py-2">Total due</th><th class="py-2">Paid</th><th class="py-2">Pending</th><th class="py-2"></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of pendingRows()" [routerLink]="['/students', r.studentId]" class="border-t border-neutral-100 cursor-pointer hover:bg-neutral-50">
              <td class="py-2 font-medium text-neutral-900">{{ r.student?.fullName || r.studentId }}</td>
              <td class="py-2 text-neutral-600">\u20B9{{ r.totalDue }}</td>
              <td class="py-2 text-neutral-600">\u20B9{{ r.totalPaid }}</td>
              <td class="py-2 font-medium" [class]="r.pending > 0 ? 'text-error-600' : 'text-success-600'">\u20B9{{ r.pending }}</td>
              <td class="py-2 text-primary-600 text-right text-xs">View \u2192</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Owner/staff: search a specific student's pending fee by name/ID -->
      <div *ngIf="!selfService" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-1">Pending fees \u2014 search a student</h2>
        <p class="text-xs text-neutral-500 mb-4">Search by name or admission number.</p>
        <div class="flex gap-3 mb-4">
          <input [(ngModel)]="searchKeyword" (keyup.enter)="searchStudents()" placeholder="e.g. Aarav or ADM-1023"
            class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <button (click)="searchStudents()" [disabled]="searching()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">
            {{ searching() ? 'Searching...' : 'Search' }}
          </button>
        </div>
        <p *ngIf="searchError()" class="text-error-600 text-sm">{{ searchError() }}</p>
        <p *ngIf="!searchError() && searched() && searchResults().length === 0" class="text-neutral-500 text-sm">No students matched.</p>
        <table *ngIf="searchResults().length > 0" class="w-full text-sm">
          <thead class="text-neutral-500 text-left text-xs">
            <tr><th class="py-2">Student</th><th class="py-2">Class</th><th class="py-2">Pending fee</th><th class="py-2"></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of searchResults()" [routerLink]="['/students', r.student.id]" class="border-t border-neutral-100 cursor-pointer hover:bg-neutral-50">
              <td class="py-2 font-medium text-neutral-900">{{ r.student.fullName }}</td>
              <td class="py-2 text-neutral-600">{{ className(r.student.classId) }}{{ r.student.sectionId ? ' - ' + sectionName(r.student.sectionId) : '' }}</td>
              <td class="py-2 font-medium" [class]="r.pending > 0 ? 'text-error-600' : 'text-success-600'">
                {{ r.error ? '\u2014' : ('\u20B9' + r.pending) }}
              </td>
              <td class="py-2 text-primary-600 text-right text-xs">View \u2192</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Collection totals (staff only) -->
      <div *ngIf="!selfService" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Collection totals</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <input [(ngModel)]="fromDate" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <input [(ngModel)]="toDate" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <button (click)="loadTotals()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Get total</button>
          <div class="text-2xl font-bold text-neutral-900">{{ total() !== null ? ('\u20B9' + total()) : '\u2014' }}</div>
        </div>
      </div>

      <!-- Create structure -->
      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Name *</label>
            <input [(ngModel)]="form.name" placeholder="Tuition Term 1" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Class *</label>
            <select [(ngModel)]="form.classId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Academic year *</label>
            <input [(ngModel)]="form.academicYear" placeholder="2026-27" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Amount *</label>
            <input [(ngModel)]="form.amount" type="number" placeholder="25000" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Due date *</label>
            <input [(ngModel)]="form.dueDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
        </div>
        <p class="text-xs text-neutral-500 mt-3">
          New structures apply to students admitted afterwards automatically. To backfill this due for already-admitted students in the class, re-open each student's page \u2014 dues sync there.
        </p>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Create' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <!-- Structures list (staff only) -->
      <div *ngIf="!selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div class="flex items-center gap-3 p-4 border-b border-neutral-200">
          <select [(ngModel)]="filterClassId" class="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
            <option value="">All classes</option>
            <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
          </select>
          <button (click)="load()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Load</button>
        </div>
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No fee structures.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Name</th><th class="px-6 py-3 font-medium">Year</th><th class="px-6 py-3 font-medium">Amount</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let f of rows()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ f.name || '\u2014' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ f.academicYear || '\u2014' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ f.amount != null ? ('\u20B9' + f.amount) : '\u2014' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FeesComponent, { className: "FeesComponent", filePath: "src/app/features/fees/pages/fees/fees.component.ts", lineNumber: 228 });
})();
export {
  FeesComponent
};
//# sourceMappingURL=chunk-P7DTNVLZ.js.map
