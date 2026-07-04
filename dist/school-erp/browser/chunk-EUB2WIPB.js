import {
  AttendanceService
} from "./chunk-ARTF4EA6.js";
import {
  ExaminationService
} from "./chunk-OKWQRUT6.js";
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
  classNameById,
  sectionNameById
} from "./chunk-WTXCDO4J.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-VTNFS7A5.js";
import "./chunk-35DAK2ZT.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-QXXS42YF.js";
import "./chunk-JJL4A5HX.js";
import {
  CommonModule,
  Component,
  DatePipe,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/students/pages/student-detail/student-detail.component.ts
function StudentDetailComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1, "Loading student...");
    \u0275\u0275elementEnd();
  }
}
function StudentDetailComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function StudentDetailComponent_ng_container_6_p_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.feesError());
  }
}
function StudentDetailComponent_ng_container_6_p_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "No fee records.");
    \u0275\u0275elementEnd();
  }
}
function StudentDetailComponent_ng_container_6_table_39_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 37)(1, "td", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 39);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 40);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 39);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r2["feeStructureName"] || f_r2["description"] || "Fee");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r0.total(f_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", ctx_r0.paid(f_r2));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.pending(f_r2) > 0 ? "text-error-600" : "text-success-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u20B9", ctx_r0.pending(f_r2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r2["status"] || "\u2014");
  }
}
function StudentDetailComponent_ng_container_6_table_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 33)(1, "thead", 34)(2, "tr")(3, "th", 35);
    \u0275\u0275text(4, "Fee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 35);
    \u0275\u0275text(6, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 35);
    \u0275\u0275text(8, "Paid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 35);
    \u0275\u0275text(10, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 35);
    \u0275\u0275text(12, "Status");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275template(14, StudentDetailComponent_ng_container_6_table_39_tr_14_Template, 11, 7, "tr", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r0.fees());
  }
}
function StudentDetailComponent_ng_container_6_div_40_span_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r0.submitFeeOk() ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.submitFeeMsg());
  }
}
function StudentDetailComponent_ng_container_6_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "h3", 41);
    \u0275\u0275text(2, "Submit fee payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 42);
    \u0275\u0275text(4, "Records the amount as fully paid for the period given and produces a receipt immediately.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 43)(6, "div")(7, "label", 44);
    \u0275\u0275text(8, "Amount (\u20B9) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function StudentDetailComponent_ng_container_6_div_40_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.submitForm.amount, $event) || (ctx_r0.submitForm.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "label", 44);
    \u0275\u0275text(12, "Fee duration *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function StudentDetailComponent_ng_container_6_div_40_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.submitForm.periodLabel, $event) || (ctx_r0.submitForm.periodLabel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 47)(15, "label", 44);
    \u0275\u0275text(16, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function StudentDetailComponent_ng_container_6_div_40_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.submitForm.description, $event) || (ctx_r0.submitForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "label", 44);
    \u0275\u0275text(20, "Payment method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 49);
    \u0275\u0275twoWayListener("ngModelChange", function StudentDetailComponent_ng_container_6_div_40_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.submitForm.paymentMethod, $event) || (ctx_r0.submitForm.paymentMethod = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(22, "option");
    \u0275\u0275text(23, "Cash");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option");
    \u0275\u0275text(25, "Card");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option");
    \u0275\u0275text(27, "UPI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option");
    \u0275\u0275text(29, "BankTransfer");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(30, "div", 50)(31, "button", 51);
    \u0275\u0275listener("click", function StudentDetailComponent_ng_container_6_div_40_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.submitFee());
    });
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, StudentDetailComponent_ng_container_6_div_40_span_33_Template, 2, 3, "span", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.submitForm.amount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.submitForm.periodLabel);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.submitForm.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.submitForm.paymentMethod);
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", ctx_r0.submittingFee());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.submittingFee() ? "Submitting..." : "Submit payment", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.submitFeeMsg());
  }
}
function StudentDetailComponent_ng_container_6_p_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "No payments recorded yet.");
    \u0275\u0275elementEnd();
  }
}
function StudentDetailComponent_ng_container_6_div_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "div")(2, "span", 55);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 56);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 57);
    \u0275\u0275listener("click", function StudentDetailComponent_ng_container_6_div_45_Template_button_click_7_listener() {
      const t_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.downloadReceipt(t_r5.id));
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
function StudentDetailComponent_ng_container_6_p_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.resultsError());
  }
}
function StudentDetailComponent_ng_container_6_p_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "No marks entered yet.");
    \u0275\u0275elementEnd();
  }
}
function StudentDetailComponent_ng_container_6_table_51_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 37)(1, "td", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 40);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 39);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.examName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", r_r6.marksObtained, " / ", r_r6.maxMarks);
    \u0275\u0275advance();
    \u0275\u0275classMap(r_r6.marksObtained >= r_r6.passingMarks ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", r_r6.marksObtained >= r_r6.passingMarks ? "Pass" : "Fail", "", r_r6.grade ? " (" + r_r6.grade + ")" : "", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.isResultPublished ? "Yes" : "Draft");
  }
}
function StudentDetailComponent_ng_container_6_table_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 33)(1, "thead", 34)(2, "tr")(3, "th", 35);
    \u0275\u0275text(4, "Exam");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 35);
    \u0275\u0275text(6, "Marks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 35);
    \u0275\u0275text(8, "Result");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 35);
    \u0275\u0275text(10, "Published");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, StudentDetailComponent_ng_container_6_table_51_tr_12_Template, 9, 8, "tr", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r0.results());
  }
}
function StudentDetailComponent_ng_container_6_p_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.attError());
  }
}
function StudentDetailComponent_ng_container_6_p_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, "No attendance records in this window.");
    \u0275\u0275elementEnd();
  }
}
function StudentDetailComponent_ng_container_6_span_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    \u0275\u0275classMap(a_r7["status"] === "Present" ? "bg-success-50 text-success-700" : a_r7["status"] === "Late" ? "bg-warning-50 text-warning-700" : "bg-error-50 text-error-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", a_r7["date"], " \xB7 ", a_r7["status"], " ");
  }
}
function StudentDetailComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9)(3, "div")(4, "h1", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 11);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 12);
    \u0275\u0275text(9);
    \u0275\u0275elementStart(10, "div", 13);
    \u0275\u0275text(11, "attendance (90 days)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 14)(13, "div")(14, "span", 15);
    \u0275\u0275text(15, "Gender");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div")(18, "span", 15);
    \u0275\u0275text(19, "Date of birth");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div")(23, "span", 15);
    \u0275\u0275text(24, "Guardian");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div")(27, "span", 15);
    \u0275\u0275text(28, "Guardian phone");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 16)(31, "div", 17)(32, "div", 18)(33, "h2", 19);
    \u0275\u0275text(34, "Fees");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 20);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(37, StudentDetailComponent_ng_container_6_p_37_Template, 2, 1, "p", 21)(38, StudentDetailComponent_ng_container_6_p_38_Template, 2, 0, "p", 22)(39, StudentDetailComponent_ng_container_6_table_39_Template, 15, 1, "table", 23)(40, StudentDetailComponent_ng_container_6_div_40_Template, 34, 7, "div", 24);
    \u0275\u0275elementStart(41, "div", 25)(42, "h3", 26);
    \u0275\u0275text(43, "Receipts");
    \u0275\u0275elementEnd();
    \u0275\u0275template(44, StudentDetailComponent_ng_container_6_p_44_Template, 2, 0, "p", 22)(45, StudentDetailComponent_ng_container_6_div_45_Template, 9, 6, "div", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 17)(47, "h2", 28);
    \u0275\u0275text(48, "Exam results");
    \u0275\u0275elementEnd();
    \u0275\u0275template(49, StudentDetailComponent_ng_container_6_p_49_Template, 2, 1, "p", 21)(50, StudentDetailComponent_ng_container_6_p_50_Template, 2, 0, "p", 22)(51, StudentDetailComponent_ng_container_6_table_51_Template, 13, 1, "table", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 17)(53, "h2", 28);
    \u0275\u0275text(54, "Recent attendance (last 30 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(55, StudentDetailComponent_ng_container_6_p_55_Template, 2, 1, "p", 21)(56, StudentDetailComponent_ng_container_6_p_56_Template, 2, 0, "p", 22);
    \u0275\u0275elementStart(57, "div", 29);
    \u0275\u0275template(58, StudentDetailComponent_ng_container_6_span_58_Template, 2, 4, "span", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const s_r8 = ctx.ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r8.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4(" ", ctx_r0.className(s_r8.classId), " - ", ctx_r0.sectionName(s_r8.sectionId), " \xA0\xB7\xA0 Admission # ", s_r8.admissionNumber || "\u2014", " \xA0\xB7\xA0 ", s_r8.status || "Active", " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.pctClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.attendancePct() !== null ? ctx_r0.attendancePct() + "%" : "\u2014", " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(s_r8["gender"] || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.dob(s_r8) ? \u0275\u0275pipeBind2(21, 27, ctx_r0.dob(s_r8), "mediumDate") : "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r8["parentName"] || s_r8.guardianName || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r8["parentPhone"] || s_r8.guardianPhone || "\u2014");
    \u0275\u0275advance(6);
    \u0275\u0275classMap(ctx_r0.pendingTotal() > 0 ? "text-error-600" : "text-success-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.pendingTotal() > 0 ? "Pending \u20B9" + ctx_r0.pendingTotal() : "No dues", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.feesError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.feesError() && ctx_r0.fees().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.fees().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.canSubmitFees());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.transactions().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.transactions());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.resultsError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.resultsError() && ctx_r0.results().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.results().length > 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.attError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.attError() && ctx_r0.attendance().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.attendance());
  }
}
var _StudentDetailComponent = class _StudentDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.studentsService = inject(StudentsService);
    this.attendanceService = inject(AttendanceService);
    this.feesService = inject(FeesService);
    this.examsService = inject(ExaminationService);
    this.auth = inject(AuthService);
    this.student = signal(null, ...ngDevMode ? [{ debugName: "student" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.attendancePct = signal(null, ...ngDevMode ? [{ debugName: "attendancePct" }] : []);
    this.attendance = signal([], ...ngDevMode ? [{ debugName: "attendance" }] : []);
    this.attError = signal("", ...ngDevMode ? [{ debugName: "attError" }] : []);
    this.fees = signal([], ...ngDevMode ? [{ debugName: "fees" }] : []);
    this.feesError = signal("", ...ngDevMode ? [{ debugName: "feesError" }] : []);
    this.results = signal([], ...ngDevMode ? [{ debugName: "results" }] : []);
    this.resultsError = signal("", ...ngDevMode ? [{ debugName: "resultsError" }] : []);
    this.transactions = signal([], ...ngDevMode ? [{ debugName: "transactions" }] : []);
    this.submitForm = { amount: 0, periodLabel: "", description: "", paymentMethod: "Cash" };
    this.submittingFee = signal(false, ...ngDevMode ? [{ debugName: "submittingFee" }] : []);
    this.submitFeeMsg = signal("", ...ngDevMode ? [{ debugName: "submitFeeMsg" }] : []);
    this.submitFeeOk = signal(false, ...ngDevMode ? [{ debugName: "submitFeeOk" }] : []);
    this.canSubmitFees = () => this.auth.hasRole("SuperAdmin", "Principal", "Admin", "Accountant");
    this.className = classNameById;
    this.sectionName = sectionNameById;
    this.dob = (s) => s["dateOfBirthUtc"] || s["dateOfBirth"] || null;
    this.total = (f) => Number(f["totalAmount"] ?? f["amount"] ?? 0);
    this.paid = (f) => Number(f["paidAmount"] ?? 0);
    this.pending = (f) => Math.max(0, this.total(f) - this.paid(f) - Number(f["waiverAmount"] ?? 0));
    this.pendingTotal = () => this.fees().reduce((sum, f) => sum + this.pending(f), 0);
    this.pctClass = () => {
      const p = this.attendancePct();
      return p === null ? "text-neutral-400" : p >= 75 ? "text-success-600" : "text-error-600";
    };
    this.id = "";
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.error.set("No student id in the URL.");
      return;
    }
    this.id = id;
    this.loading.set(true);
    this.studentsService.get(id).subscribe({
      next: (s) => {
        this.student.set(s);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load the student."));
        this.loading.set(false);
      }
    });
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const days30 = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    const days90 = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);
    this.attendanceService.studentPercentage(id, days90, today).subscribe({
      next: (r) => this.attendancePct.set(Math.round((r?.percentage ?? 0) * 10) / 10),
      error: () => {
      }
    });
    this.attendanceService.studentRecords(id, days30, today).subscribe({
      next: (list) => this.attendance.set(list ?? []),
      error: (err) => this.attError.set(this.msg(err, "Failed to load attendance."))
    });
    this.feesService.myPayments(id).subscribe({
      next: (list) => this.fees.set(list ?? []),
      error: (err) => this.feesError.set(this.msg(err, "Failed to load fees."))
    });
    this.examsService.studentResults(id).subscribe({
      next: (list) => this.results.set(list ?? []),
      error: (err) => this.resultsError.set(this.msg(err, "Failed to load results."))
    });
    this.loadTransactions();
  }
  loadTransactions() {
    this.feesService.transactionsForStudent(this.id).subscribe({
      next: (list) => this.transactions.set(list ?? []),
      error: () => {
      }
    });
  }
  submitFee() {
    const s = this.student();
    if (!s?.classId) {
      this.submitFeeOk.set(false);
      this.submitFeeMsg.set("Student has no class on record.");
      return;
    }
    if (!this.submitForm.amount || this.submitForm.amount <= 0 || !this.submitForm.periodLabel.trim()) {
      this.submitFeeOk.set(false);
      this.submitFeeMsg.set("Amount and fee duration are required.");
      return;
    }
    this.submittingFee.set(true);
    this.submitFeeMsg.set("");
    this.feesService.submitPayment(this.id, {
      classId: s.classId,
      amount: this.submitForm.amount,
      periodLabel: this.submitForm.periodLabel.trim(),
      description: this.submitForm.description.trim() || void 0,
      paymentMethod: this.submitForm.paymentMethod
    }).subscribe({
      next: () => {
        this.submittingFee.set(false);
        this.submitFeeOk.set(true);
        this.submitFeeMsg.set("Payment submitted and receipt generated.");
        this.submitForm = { amount: 0, periodLabel: "", description: "", paymentMethod: "Cash" };
        this.feesService.myPayments(this.id).subscribe({ next: (list) => this.fees.set(list ?? []), error: () => {
        } });
        this.loadTransactions();
      },
      error: (err) => {
        this.submittingFee.set(false);
        this.submitFeeOk.set(false);
        this.submitFeeMsg.set(this.msg(err, "Could not submit payment."));
      }
    });
  }
  downloadReceipt(transactionId) {
    this.feesService.receipt(transactionId).subscribe({
      next: (link) => {
        if (link?.downloadUrl)
          window.open(link.downloadUrl, "_blank");
      },
      error: () => {
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_StudentDetailComponent.\u0275fac = function StudentDetailComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StudentDetailComponent)();
};
_StudentDetailComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentDetailComponent, selectors: [["app-student-detail"]], decls: 7, vars: 3, consts: [[1, "p-6", "space-y-6"], [1, "flex", "items-center", "gap-3"], ["routerLink", "/students", 1, "text-primary-600", "hover:text-primary-700", "text-sm"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "p-8 text-center text-error-600", 4, "ngIf"], [4, "ngIf"], [1, "p-8", "text-center", "text-neutral-500"], [1, "p-8", "text-center", "text-error-600"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "flex", "items-start", "justify-between"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm", "mt-1"], [1, "text-right", "text-3xl", "font-bold"], [1, "text-xs", "font-normal", "text-neutral-500"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "mt-4", "text-sm"], [1, "text-neutral-500", "block", "text-xs"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-6"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "p-6"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-lg", "font-semibold", "text-neutral-900"], [1, "text-sm", "font-semibold"], ["class", "text-error-600 text-sm", 4, "ngIf"], ["class", "text-neutral-500 text-sm", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], ["class", "mt-5 pt-4 border-t border-neutral-200", 4, "ngIf"], [1, "mt-5", "pt-4", "border-t", "border-neutral-200"], [1, "text-sm", "font-semibold", "text-neutral-900", "mb-2"], ["class", "flex items-center justify-between py-1.5 text-sm border-t border-neutral-100 first:border-t-0", 4, "ngFor", "ngForOf"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-4"], [1, "flex", "flex-wrap", "gap-2"], ["class", "px-2.5 py-1 rounded-lg text-xs font-medium", 3, "class", 4, "ngFor", "ngForOf"], [1, "text-error-600", "text-sm"], [1, "text-neutral-500", "text-sm"], [1, "w-full", "text-sm"], [1, "text-neutral-500", "text-left", "text-xs"], [1, "py-2"], ["class", "border-t border-neutral-100", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-100"], [1, "py-2", "text-neutral-900"], [1, "py-2", "text-neutral-600"], [1, "py-2", "font-medium"], [1, "text-sm", "font-semibold", "text-neutral-900", "mb-1"], [1, "text-xs", "text-neutral-500", "mb-3"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-3"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["type", "number", "min", "0.01", "placeholder", "5000", 1, "w-full", "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "e.g. May 2026 - Jun 2026", 1, "w-full", "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "md:col-span-2"], ["placeholder", "e.g. Tuition fee, cash", 1, "w-full", "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], [1, "mt-3", "flex", "items-center", "gap-3"], [1, "px-4", "py-2", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["class", "text-sm", 3, "class", 4, "ngIf"], [1, "text-sm"], [1, "flex", "items-center", "justify-between", "py-1.5", "text-sm", "border-t", "border-neutral-100", "first:border-t-0"], [1, "text-neutral-900"], [1, "text-neutral-500"], [1, "text-primary-600", "hover:text-primary-700", "text-xs", "font-medium", 3, "click"], [1, "px-2.5", "py-1", "rounded-lg", "text-xs", "font-medium"]], template: function StudentDetailComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
    \u0275\u0275text(3, "\u2190 Students");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, StudentDetailComponent_div_4_Template, 2, 0, "div", 3)(5, StudentDetailComponent_div_5_Template, 2, 1, "div", 4)(6, StudentDetailComponent_ng_container_6_Template, 59, 30, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.student());
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink, DatePipe], encapsulation: 2 });
var StudentDetailComponent = _StudentDetailComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentDetailComponent, [{
    type: Component,
    args: [{
      selector: "app-student-detail",
      standalone: true,
      imports: [CommonModule, FormsModule, RouterLink],
      template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center gap-3">
        <a routerLink="/students" class="text-primary-600 hover:text-primary-700 text-sm">\u2190 Students</a>
      </div>

      <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading student...</div>
      <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>

      <ng-container *ngIf="student() as s">
        <!-- Profile -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold text-neutral-900">{{ s.fullName }}</h1>
              <p class="text-neutral-600 text-sm mt-1">
                {{ className(s.classId) }} - {{ sectionName(s.sectionId) }}
                &nbsp;\xB7&nbsp; Admission # {{ s.admissionNumber || '\u2014' }}
                &nbsp;\xB7&nbsp; {{ s.status || 'Active' }}
              </p>
            </div>
            <div class="text-right text-3xl font-bold" [class]="pctClass()">
              {{ attendancePct() !== null ? attendancePct() + '%' : '\u2014' }}
              <div class="text-xs font-normal text-neutral-500">attendance (90 days)</div>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <div><span class="text-neutral-500 block text-xs">Gender</span>{{ s['gender'] || '\u2014' }}</div>
            <div><span class="text-neutral-500 block text-xs">Date of birth</span>{{ dob(s) ? (dob(s) | date:'mediumDate') : '\u2014' }}</div>
            <div><span class="text-neutral-500 block text-xs">Guardian</span>{{ s['parentName'] || s.guardianName || '\u2014' }}</div>
            <div><span class="text-neutral-500 block text-xs">Guardian phone</span>{{ s['parentPhone'] || s.guardianPhone || '\u2014' }}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Fees -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-neutral-900">Fees</h2>
              <span class="text-sm font-semibold" [class]="pendingTotal() > 0 ? 'text-error-600' : 'text-success-600'">
                {{ pendingTotal() > 0 ? ('Pending \u20B9' + pendingTotal()) : 'No dues' }}
              </span>
            </div>
            <p *ngIf="feesError()" class="text-error-600 text-sm">{{ feesError() }}</p>
            <p *ngIf="!feesError() && fees().length === 0" class="text-neutral-500 text-sm">No fee records.</p>
            <table *ngIf="fees().length > 0" class="w-full text-sm">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2">Fee</th><th class="py-2">Total</th><th class="py-2">Paid</th><th class="py-2">Pending</th><th class="py-2">Status</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let f of fees()" class="border-t border-neutral-100">
                  <td class="py-2 text-neutral-900">{{ f['feeStructureName'] || f['description'] || 'Fee' }}</td>
                  <td class="py-2 text-neutral-600">\u20B9{{ total(f) }}</td>
                  <td class="py-2 text-neutral-600">\u20B9{{ paid(f) }}</td>
                  <td class="py-2 font-medium" [class]="pending(f) > 0 ? 'text-error-600' : 'text-success-600'">\u20B9{{ pending(f) }}</td>
                  <td class="py-2 text-neutral-600">{{ f['status'] || '\u2014' }}</td>
                </tr>
              </tbody>
            </table>

            <!-- Submit a fee payment (Admin/Principal/SuperAdmin/Accountant only) -->
            <div *ngIf="canSubmitFees()" class="mt-5 pt-4 border-t border-neutral-200">
              <h3 class="text-sm font-semibold text-neutral-900 mb-1">Submit fee payment</h3>
              <p class="text-xs text-neutral-500 mb-3">Records the amount as fully paid for the period given and produces a receipt immediately.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Amount (\u20B9) *</label>
                  <input [(ngModel)]="submitForm.amount" type="number" min="0.01" placeholder="5000" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Fee duration *</label>
                  <input [(ngModel)]="submitForm.periodLabel" placeholder="e.g. May 2026 - Jun 2026" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs text-neutral-500 mb-1">Description</label>
                  <input [(ngModel)]="submitForm.description" placeholder="e.g. Tuition fee, cash" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 mb-1">Payment method</label>
                  <select [(ngModel)]="submitForm.paymentMethod" class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                    <option>Cash</option><option>Card</option><option>UPI</option><option>BankTransfer</option>
                  </select>
                </div>
              </div>
              <div class="mt-3 flex items-center gap-3">
                <button (click)="submitFee()" [disabled]="submittingFee()"
                  class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                  {{ submittingFee() ? 'Submitting...' : 'Submit payment' }}
                </button>
                <span *ngIf="submitFeeMsg()" class="text-sm" [class]="submitFeeOk() ? 'text-success-600' : 'text-error-600'">{{ submitFeeMsg() }}</span>
              </div>
            </div>

            <!-- Receipts -->
            <div class="mt-5 pt-4 border-t border-neutral-200">
              <h3 class="text-sm font-semibold text-neutral-900 mb-2">Receipts</h3>
              <p *ngIf="transactions().length === 0" class="text-neutral-500 text-sm">No payments recorded yet.</p>
              <div *ngFor="let t of transactions()" class="flex items-center justify-between py-1.5 text-sm border-t border-neutral-100 first:border-t-0">
                <div>
                  <span class="text-neutral-900">{{ t.periodLabel || t.feeStructureName || t.description || 'Fee' }}</span>
                  <span class="text-neutral-500"> \xB7 \u20B9{{ t.amount }} \xB7 {{ t.paidAtUtc | date:'mediumDate' }}</span>
                </div>
                <button (click)="downloadReceipt(t.id)" class="text-primary-600 hover:text-primary-700 text-xs font-medium">Download \u2192</button>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Exam results</h2>
            <p *ngIf="resultsError()" class="text-error-600 text-sm">{{ resultsError() }}</p>
            <p *ngIf="!resultsError() && results().length === 0" class="text-neutral-500 text-sm">No marks entered yet.</p>
            <table *ngIf="results().length > 0" class="w-full text-sm">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2">Exam</th><th class="py-2">Marks</th><th class="py-2">Result</th><th class="py-2">Published</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of results()" class="border-t border-neutral-100">
                  <td class="py-2 text-neutral-900">{{ r.examName }}</td>
                  <td class="py-2 text-neutral-600">{{ r.marksObtained }} / {{ r.maxMarks }}</td>
                  <td class="py-2 font-medium" [class]="r.marksObtained >= r.passingMarks ? 'text-success-600' : 'text-error-600'">
                    {{ r.marksObtained >= r.passingMarks ? 'Pass' : 'Fail' }}{{ r.grade ? ' (' + r.grade + ')' : '' }}
                  </td>
                  <td class="py-2 text-neutral-600">{{ r.isResultPublished ? 'Yes' : 'Draft' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent attendance -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Recent attendance (last 30 days)</h2>
          <p *ngIf="attError()" class="text-error-600 text-sm">{{ attError() }}</p>
          <p *ngIf="!attError() && attendance().length === 0" class="text-neutral-500 text-sm">No attendance records in this window.</p>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let a of attendance()"
              class="px-2.5 py-1 rounded-lg text-xs font-medium"
              [class]="a['status'] === 'Present' ? 'bg-success-50 text-success-700' : (a['status'] === 'Late' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
              {{ a['date'] }} \xB7 {{ a['status'] }}
            </span>
          </div>
        </div>
      </ng-container>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentDetailComponent, { className: "StudentDetailComponent", filePath: "src/app/features/students/pages/student-detail/student-detail.component.ts", lineNumber: 168 });
})();
export {
  StudentDetailComponent
};
//# sourceMappingURL=chunk-EUB2WIPB.js.map
