import {
  TeachersService
} from "./chunk-2L3XRX7U.js";
import {
  SCHOOL_CLASSES,
  SCHOOL_SECTIONS,
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
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/teachers/pages/teacher-detail/teacher-detail.component.ts
function TeacherDetailComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function TeacherDetailComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function TeacherDetailComponent_ng_container_5_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.className(s_r3.classTeacherOfClassId), "", s_r3.classTeacherOfSectionId ? " - " + ctx_r0.sectionName(s_r3.classTeacherOfSectionId) : "", " ");
  }
}
function TeacherDetailComponent_ng_container_5_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Not a class teacher");
    \u0275\u0275elementEnd();
  }
}
function TeacherDetailComponent_ng_container_5_option_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    \u0275\u0275property("value", c_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.name);
  }
}
function TeacherDetailComponent_ng_container_5_option_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sec_r5 = ctx.$implicit;
    \u0275\u0275property("value", sec_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Section ", sec_r5.name);
  }
}
function TeacherDetailComponent_ng_container_5_span_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.assignOk() ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.assignMsg());
  }
}
function TeacherDetailComponent_ng_container_5_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Pending this month (", ctx_r0.pending().periodLabel, ")");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.pending().pendingSalary > 0 ? "text-error-600" : "text-success-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u20B9", ctx_r0.pending().pendingSalary, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" \xA0(\u20B9", ctx_r0.pending().paidThisMonth, " paid of \u20B9", ctx_r0.pending().monthlySalary ?? 0, ")");
  }
}
function TeacherDetailComponent_ng_container_5_span_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.salaryOk() ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.salaryMsg());
  }
}
function TeacherDetailComponent_ng_container_5_p_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.payoutOk() ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.payoutMsg());
  }
}
function TeacherDetailComponent_ng_container_5_p_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 49);
    \u0275\u0275text(1, "No payouts recorded yet.");
    \u0275\u0275elementEnd();
  }
}
function TeacherDetailComponent_ng_container_5_table_76_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 54)(1, "td", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 56);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 57);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 57);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.periodLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", p_r6.amount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.method || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 4, p_r6.paidOnUtc, "mediumDate"));
  }
}
function TeacherDetailComponent_ng_container_5_table_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 50)(1, "thead", 51)(2, "tr")(3, "th", 52);
    \u0275\u0275text(4, "Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 52);
    \u0275\u0275text(6, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 52);
    \u0275\u0275text(8, "Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 52);
    \u0275\u0275text(10, "Paid on");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, TeacherDetailComponent_ng_container_5_table_76_tr_12_Template, 10, 7, "tr", 53);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r0.payouts());
  }
}
function TeacherDetailComponent_ng_container_5_span_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.attOk() ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.attMsg());
  }
}
function TeacherDetailComponent_ng_container_5_p_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 49);
    \u0275\u0275text(1, "No attendance records in this window.");
    \u0275\u0275elementEnd();
  }
}
function TeacherDetailComponent_ng_container_5_span_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    \u0275\u0275classMap(a_r7.status === "Present" ? "bg-success-50 text-success-700" : a_r7.status === "Late" ? "bg-warning-50 text-warning-700" : "bg-error-50 text-error-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", a_r7.date, " \xB7 ", a_r7.status, " ");
  }
}
function TeacherDetailComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 7)(2, "h1", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 10)(7, "div")(8, "span", 11);
    \u0275\u0275text(9, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "span", 11);
    \u0275\u0275text(13, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div")(16, "span", 11);
    \u0275\u0275text(17, "Subjects");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div")(20, "span", 11);
    \u0275\u0275text(21, "Class teacher of");
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, TeacherDetailComponent_ng_container_5_span_22_Template, 2, 2, "span", 12)(23, TeacherDetailComponent_ng_container_5_span_23_Template, 2, 0, "span", 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 7)(25, "h2", 13);
    \u0275\u0275text(26, "Class-teacher (head teacher) assignment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "p", 14);
    \u0275\u0275text(28, "Grants attendance-upload and student-enquiry rights for one class. The teacher must log in again to pick up a change.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 15)(30, "select", 16);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherDetailComponent_ng_container_5_Template_select_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.assignClassId, $event) || (ctx_r0.assignClassId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(31, "option", 17);
    \u0275\u0275text(32, "Not a class teacher");
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, TeacherDetailComponent_ng_container_5_option_33_Template, 2, 2, "option", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "select", 16);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherDetailComponent_ng_container_5_Template_select_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.assignSectionId, $event) || (ctx_r0.assignSectionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(35, "option", 17);
    \u0275\u0275text(36, "\u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, TeacherDetailComponent_ng_container_5_option_37_Template, 2, 2, "option", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 19);
    \u0275\u0275listener("click", function TeacherDetailComponent_ng_container_5_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.assign());
    });
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275template(40, TeacherDetailComponent_ng_container_5_span_40_Template, 2, 3, "span", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 7)(42, "h2", 13);
    \u0275\u0275text(43, "Salary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "p", 14);
    \u0275\u0275text(45, "Pending resets to the full monthly salary at the start of each month, minus whatever's paid out below.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 15)(47, "div")(48, "label", 21);
    \u0275\u0275text(49, "Monthly salary (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherDetailComponent_ng_container_5_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.salaryInput, $event) || (ctx_r0.salaryInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "button", 19);
    \u0275\u0275listener("click", function TeacherDetailComponent_ng_container_5_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveSalary());
    });
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275template(53, TeacherDetailComponent_ng_container_5_div_53_Template, 7, 6, "div", 23)(54, TeacherDetailComponent_ng_container_5_span_54_Template, 2, 3, "span", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 25)(56, "div", 7)(57, "h2", 26);
    \u0275\u0275text(58, "Payouts (salary log)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 27)(60, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherDetailComponent_ng_container_5_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.payout.periodLabel, $event) || (ctx_r0.payout.periodLabel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherDetailComponent_ng_container_5_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.payout.amount, $event) || (ctx_r0.payout.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherDetailComponent_ng_container_5_Template_select_ngModelChange_62_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.payout.method, $event) || (ctx_r0.payout.method = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(63, "option");
    \u0275\u0275text(64, "BankTransfer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "option");
    \u0275\u0275text(66, "Cash");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "option");
    \u0275\u0275text(68, "Cheque");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "option");
    \u0275\u0275text(70, "UPI");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherDetailComponent_ng_container_5_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.payout.reference, $event) || (ctx_r0.payout.reference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "button", 32);
    \u0275\u0275listener("click", function TeacherDetailComponent_ng_container_5_Template_button_click_72_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.recordPayout());
    });
    \u0275\u0275text(73);
    \u0275\u0275elementEnd();
    \u0275\u0275template(74, TeacherDetailComponent_ng_container_5_p_74_Template, 2, 3, "p", 33)(75, TeacherDetailComponent_ng_container_5_p_75_Template, 2, 0, "p", 34)(76, TeacherDetailComponent_ng_container_5_table_76_Template, 13, 1, "table", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "div", 7)(78, "h2", 26);
    \u0275\u0275text(79, "Attendance (last 30 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div", 36)(81, "select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function TeacherDetailComponent_ng_container_5_Template_select_ngModelChange_81_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.attStatus, $event) || (ctx_r0.attStatus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(82, "option");
    \u0275\u0275text(83, "Present");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "option");
    \u0275\u0275text(85, "Absent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "option");
    \u0275\u0275text(87, "Late");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "option");
    \u0275\u0275text(89, "HalfDay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "option");
    \u0275\u0275text(91, "OnLeave");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "button", 37);
    \u0275\u0275listener("click", function TeacherDetailComponent_ng_container_5_Template_button_click_92_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.markAttendance());
    });
    \u0275\u0275text(93);
    \u0275\u0275elementEnd();
    \u0275\u0275template(94, TeacherDetailComponent_ng_container_5_span_94_Template, 2, 3, "span", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275template(95, TeacherDetailComponent_ng_container_5_p_95_Template, 2, 0, "p", 34);
    \u0275\u0275elementStart(96, "div", 39);
    \u0275\u0275template(97, TeacherDetailComponent_ng_container_5_span_97_Template, 2, 4, "span", 40);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r3.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", s_r3.designation, " \xA0\xB7\xA0 ", s_r3.employeeCode, " \xA0\xB7\xA0 ", s_r3.status || "Active", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r3.email || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r3.phone || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r3.subjectsTaughtCsv || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", s_r3.classTeacherOfClassId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !s_r3.classTeacherOfClassId);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.assignClassId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.classes);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.assignSectionId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.sections);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.assigning());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.assigning() ? "Saving..." : "Update assignment", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.assignMsg());
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.salaryInput);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.savingSalary());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.savingSalary() ? "Saving..." : "Update salary", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.pending());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.salaryMsg());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.payout.periodLabel);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.payout.amount);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.payout.method);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.payout.reference);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.savingPayout());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.savingPayout() ? "Saving..." : "Record payout", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.payoutMsg());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.payouts().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.payouts().length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.attStatus);
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r0.savingAtt());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.savingAtt() ? "Saving..." : "Mark today", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.attMsg());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.attendance().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.attendance());
  }
}
var _TeacherDetailComponent = class _TeacherDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.service = inject(TeachersService);
    this.staff = signal(null, ...ngDevMode ? [{ debugName: "staff" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.payouts = signal([], ...ngDevMode ? [{ debugName: "payouts" }] : []);
    this.attendance = signal([], ...ngDevMode ? [{ debugName: "attendance" }] : []);
    this.assigning = signal(false, ...ngDevMode ? [{ debugName: "assigning" }] : []);
    this.assignMsg = signal("", ...ngDevMode ? [{ debugName: "assignMsg" }] : []);
    this.assignOk = signal(false, ...ngDevMode ? [{ debugName: "assignOk" }] : []);
    this.assignClassId = "";
    this.assignSectionId = "";
    this.savingPayout = signal(false, ...ngDevMode ? [{ debugName: "savingPayout" }] : []);
    this.payoutMsg = signal("", ...ngDevMode ? [{ debugName: "payoutMsg" }] : []);
    this.payoutOk = signal(false, ...ngDevMode ? [{ debugName: "payoutOk" }] : []);
    this.payout = { periodLabel: "", amount: 0, method: "BankTransfer", reference: "" };
    this.pending = signal(null, ...ngDevMode ? [{ debugName: "pending" }] : []);
    this.salaryInput = 0;
    this.savingSalary = signal(false, ...ngDevMode ? [{ debugName: "savingSalary" }] : []);
    this.salaryMsg = signal("", ...ngDevMode ? [{ debugName: "salaryMsg" }] : []);
    this.salaryOk = signal(false, ...ngDevMode ? [{ debugName: "salaryOk" }] : []);
    this.savingAtt = signal(false, ...ngDevMode ? [{ debugName: "savingAtt" }] : []);
    this.attMsg = signal("", ...ngDevMode ? [{ debugName: "attMsg" }] : []);
    this.attOk = signal(false, ...ngDevMode ? [{ debugName: "attOk" }] : []);
    this.attStatus = "Present";
    this.classes = SCHOOL_CLASSES;
    this.sections = SCHOOL_SECTIONS;
    this.className = classNameById;
    this.sectionName = sectionNameById;
    this.id = "";
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") ?? "";
    if (!this.id) {
      this.error.set("No staff id in the URL.");
      return;
    }
    this.loading.set(true);
    this.service.get(this.id).subscribe({
      next: (s) => {
        this.staff.set(s);
        this.assignClassId = s.classTeacherOfClassId ?? "";
        this.assignSectionId = s.classTeacherOfSectionId ?? "";
        this.salaryInput = s.monthlySalary ?? 0;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load the staff member."));
        this.loading.set(false);
      }
    });
    this.loadPayouts();
    this.loadAttendance();
    this.loadPending();
  }
  loadPayouts() {
    this.service.payoutsForStaff(this.id).subscribe({
      next: (list) => this.payouts.set(list ?? []),
      error: () => {
      }
    });
  }
  loadPending() {
    this.service.pendingSalaryForStaff(this.id).subscribe({
      next: (p) => this.pending.set(p),
      error: () => {
      }
    });
  }
  loadAttendance() {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const days30 = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    this.service.staffAttendance(this.id, days30, today).subscribe({
      next: (list) => this.attendance.set(list ?? []),
      error: () => {
      }
    });
  }
  assign() {
    if (!!this.assignClassId !== !!this.assignSectionId) {
      this.assignOk.set(false);
      this.assignMsg.set("Pick both class and section (or neither to unassign).");
      return;
    }
    this.assigning.set(true);
    this.assignMsg.set("");
    this.service.assignClassTeacher(this.id, this.assignClassId || null, this.assignSectionId || null).subscribe({
      next: (s) => {
        this.assigning.set(false);
        this.assignOk.set(true);
        this.assignMsg.set("Saved. The teacher must log in again to use the new rights.");
        this.staff.set(s);
      },
      error: (err) => {
        this.assigning.set(false);
        this.assignOk.set(false);
        this.assignMsg.set(this.msg(err, "Could not update."));
      }
    });
  }
  recordPayout() {
    if (!this.payout.periodLabel || !this.payout.amount || this.payout.amount <= 0) {
      this.payoutOk.set(false);
      this.payoutMsg.set("Period and a positive amount are required.");
      return;
    }
    this.savingPayout.set(true);
    this.payoutMsg.set("");
    this.service.recordPayout({
      staffId: this.id,
      amount: this.payout.amount,
      periodLabel: this.payout.periodLabel,
      method: this.payout.method,
      reference: this.payout.reference || void 0
    }).subscribe({
      next: () => {
        this.savingPayout.set(false);
        this.payoutOk.set(true);
        this.payoutMsg.set("Payout recorded.");
        this.payout = { periodLabel: "", amount: 0, method: "BankTransfer", reference: "" };
        this.loadPayouts();
        this.loadPending();
      },
      error: (err) => {
        this.savingPayout.set(false);
        this.payoutOk.set(false);
        this.payoutMsg.set(this.msg(err, "Could not record."));
      }
    });
  }
  saveSalary() {
    if (this.salaryInput < 0) {
      this.salaryOk.set(false);
      this.salaryMsg.set("Salary cannot be negative.");
      return;
    }
    this.savingSalary.set(true);
    this.salaryMsg.set("");
    this.service.setSalary(this.id, this.salaryInput).subscribe({
      next: (s) => {
        this.savingSalary.set(false);
        this.salaryOk.set(true);
        this.salaryMsg.set("Salary updated.");
        this.staff.set(s);
        this.loadPending();
      },
      error: (err) => {
        this.savingSalary.set(false);
        this.salaryOk.set(false);
        this.salaryMsg.set(this.msg(err, "Could not update salary."));
      }
    });
  }
  markAttendance() {
    this.savingAtt.set(true);
    this.attMsg.set("");
    this.service.markStaffAttendance({
      staffId: this.id,
      date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      status: this.attStatus
    }).subscribe({
      next: () => {
        this.savingAtt.set(false);
        this.attOk.set(true);
        this.attMsg.set("Marked.");
        this.loadAttendance();
      },
      error: (err) => {
        this.savingAtt.set(false);
        this.attOk.set(false);
        this.attMsg.set(this.msg(err, "Could not mark."));
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_TeacherDetailComponent.\u0275fac = function TeacherDetailComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TeacherDetailComponent)();
};
_TeacherDetailComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeacherDetailComponent, selectors: [["app-teacher-detail"]], decls: 6, vars: 3, consts: [[1, "p-6", "space-y-6"], ["routerLink", "/teachers", 1, "text-primary-600", "hover:text-primary-700", "text-sm"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "p-8 text-center text-error-600", 4, "ngIf"], [4, "ngIf"], [1, "p-8", "text-center", "text-neutral-500"], [1, "p-8", "text-center", "text-error-600"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm", "mt-1"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "mt-4", "text-sm"], [1, "text-neutral-500", "block", "text-xs"], ["class", "font-medium text-primary-700", 4, "ngIf"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-1"], [1, "text-xs", "text-neutral-500", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-4", "items-end"], [1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["class", "text-sm", 3, "class", 4, "ngIf"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["type", "number", "min", "0", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["class", "md:col-span-2", 4, "ngIf"], ["class", "text-sm md:col-span-4", 3, "class", 4, "ngIf"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-6"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-4"], [1, "grid", "grid-cols-2", "gap-2", "mb-2"], ["placeholder", "Period (e.g. July 2026)", 1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "Amount \u20B9", 1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["placeholder", "Reference (optional)", 1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "px-4", "py-2", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", "mb-3", 3, "click", "disabled"], ["class", "text-sm mb-2", 3, "class", 4, "ngIf"], ["class", "text-neutral-500 text-sm", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [1, "flex", "gap-2", "mb-3"], [1, "px-4", "py-2", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["class", "text-sm self-center", 3, "class", 4, "ngIf"], [1, "flex", "flex-wrap", "gap-2"], ["class", "px-2.5 py-1 rounded-lg text-xs font-medium", 3, "class", 4, "ngFor", "ngForOf"], [1, "font-medium", "text-primary-700"], [3, "value"], [1, "text-sm"], [1, "md:col-span-2"], [1, "text-2xl", "font-bold"], [1, "text-neutral-500", "text-xs"], [1, "text-sm", "md:col-span-4"], [1, "text-sm", "mb-2"], [1, "text-neutral-500", "text-sm"], [1, "w-full", "text-sm"], [1, "text-neutral-500", "text-left", "text-xs"], [1, "py-2"], ["class", "border-t border-neutral-100", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-100"], [1, "py-2", "text-neutral-900"], [1, "py-2", "font-medium", "text-neutral-900"], [1, "py-2", "text-neutral-600"], [1, "text-sm", "self-center"], [1, "px-2.5", "py-1", "rounded-lg", "text-xs", "font-medium"]], template: function TeacherDetailComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
    \u0275\u0275text(2, "\u2190 Teachers & Staff");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, TeacherDetailComponent_div_3_Template, 2, 0, "div", 2)(4, TeacherDetailComponent_div_4_Template, 2, 1, "div", 3)(5, TeacherDetailComponent_ng_container_5_Template, 98, 36, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.staff());
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink, DatePipe], encapsulation: 2 });
var TeacherDetailComponent = _TeacherDetailComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeacherDetailComponent, [{
    type: Component,
    args: [{
      selector: "app-teacher-detail",
      standalone: true,
      imports: [CommonModule, FormsModule, RouterLink],
      template: `
    <div class="p-6 space-y-6">
      <a routerLink="/teachers" class="text-primary-600 hover:text-primary-700 text-sm">\u2190 Teachers &amp; Staff</a>

      <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
      <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>

      <ng-container *ngIf="staff() as s">
        <!-- Profile -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h1 class="text-2xl font-bold text-neutral-900">{{ s.fullName }}</h1>
          <p class="text-neutral-600 text-sm mt-1">
            {{ s.designation }} &nbsp;\xB7&nbsp; {{ s.employeeCode }} &nbsp;\xB7&nbsp; {{ s.status || 'Active' }}
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <div><span class="text-neutral-500 block text-xs">Email</span>{{ s.email || '\u2014' }}</div>
            <div><span class="text-neutral-500 block text-xs">Phone</span>{{ s.phone || '\u2014' }}</div>
            <div><span class="text-neutral-500 block text-xs">Subjects</span>{{ s.subjectsTaughtCsv || '\u2014' }}</div>
            <div>
              <span class="text-neutral-500 block text-xs">Class teacher of</span>
              <span *ngIf="s.classTeacherOfClassId" class="font-medium text-primary-700">
                {{ className(s.classTeacherOfClassId!) }}{{ s.classTeacherOfSectionId ? ' - ' + sectionName(s.classTeacherOfSectionId!) : '' }}
              </span>
              <span *ngIf="!s.classTeacherOfClassId">Not a class teacher</span>
            </div>
          </div>
        </div>

        <!-- Class-teacher assignment -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-1">Class-teacher (head teacher) assignment</h2>
          <p class="text-xs text-neutral-500 mb-4">Grants attendance-upload and student-enquiry rights for one class. The teacher must log in again to pick up a change.</p>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <select [(ngModel)]="assignClassId" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Not a class teacher</option>
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
            <select [(ngModel)]="assignSectionId" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">\u2014</option>
              <option *ngFor="let sec of sections" [value]="sec.id">Section {{ sec.name }}</option>
            </select>
            <button (click)="assign()" [disabled]="assigning()"
              class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ assigning() ? 'Saving...' : 'Update assignment' }}
            </button>
            <span *ngIf="assignMsg()" class="text-sm" [class]="assignOk() ? 'text-success-600' : 'text-error-600'">{{ assignMsg() }}</span>
          </div>
        </div>

        <!-- Salary -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-1">Salary</h2>
          <p class="text-xs text-neutral-500 mb-4">Pending resets to the full monthly salary at the start of each month, minus whatever's paid out below.</p>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-xs text-neutral-500 mb-1">Monthly salary (\u20B9)</label>
              <input [(ngModel)]="salaryInput" type="number" min="0" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <button (click)="saveSalary()" [disabled]="savingSalary()"
              class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ savingSalary() ? 'Saving...' : 'Update salary' }}
            </button>
            <div *ngIf="pending()" class="md:col-span-2">
              <span class="text-neutral-500 block text-xs">Pending this month ({{ pending()!.periodLabel }})</span>
              <span class="text-2xl font-bold" [class]="pending()!.pendingSalary > 0 ? 'text-error-600' : 'text-success-600'">
                \u20B9{{ pending()!.pendingSalary }}
              </span>
              <span class="text-neutral-500 text-xs"> &nbsp;(\u20B9{{ pending()!.paidThisMonth }} paid of \u20B9{{ pending()!.monthlySalary ?? 0 }})</span>
            </div>
            <span *ngIf="salaryMsg()" class="text-sm md:col-span-4" [class]="salaryOk() ? 'text-success-600' : 'text-error-600'">{{ salaryMsg() }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Payouts -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Payouts (salary log)</h2>
            <div class="grid grid-cols-2 gap-2 mb-2">
              <input [(ngModel)]="payout.periodLabel" placeholder="Period (e.g. July 2026)" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
              <input [(ngModel)]="payout.amount" type="number" placeholder="Amount \u20B9" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
              <select [(ngModel)]="payout.method" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                <option>BankTransfer</option><option>Cash</option><option>Cheque</option><option>UPI</option>
              </select>
              <input [(ngModel)]="payout.reference" placeholder="Reference (optional)" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            </div>
            <button (click)="recordPayout()" [disabled]="savingPayout()"
              class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium mb-3">
              {{ savingPayout() ? 'Saving...' : 'Record payout' }}
            </button>
            <p *ngIf="payoutMsg()" class="text-sm mb-2" [class]="payoutOk() ? 'text-success-600' : 'text-error-600'">{{ payoutMsg() }}</p>
            <p *ngIf="payouts().length === 0" class="text-neutral-500 text-sm">No payouts recorded yet.</p>
            <table *ngIf="payouts().length > 0" class="w-full text-sm">
              <thead class="text-neutral-500 text-left text-xs">
                <tr><th class="py-2">Period</th><th class="py-2">Amount</th><th class="py-2">Method</th><th class="py-2">Paid on</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let p of payouts()" class="border-t border-neutral-100">
                  <td class="py-2 text-neutral-900">{{ p.periodLabel }}</td>
                  <td class="py-2 font-medium text-neutral-900">\u20B9{{ p.amount }}</td>
                  <td class="py-2 text-neutral-600">{{ p.method || '\u2014' }}</td>
                  <td class="py-2 text-neutral-600">{{ p.paidOnUtc | date:'mediumDate' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Staff attendance -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Attendance (last 30 days)</h2>
            <div class="flex gap-2 mb-3">
              <select [(ngModel)]="attStatus" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                <option>Present</option><option>Absent</option><option>Late</option><option>HalfDay</option><option>OnLeave</option>
              </select>
              <button (click)="markAttendance()" [disabled]="savingAtt()"
                class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                {{ savingAtt() ? 'Saving...' : 'Mark today' }}
              </button>
              <span *ngIf="attMsg()" class="text-sm self-center" [class]="attOk() ? 'text-success-600' : 'text-error-600'">{{ attMsg() }}</span>
            </div>
            <p *ngIf="attendance().length === 0" class="text-neutral-500 text-sm">No attendance records in this window.</p>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let a of attendance()"
                class="px-2.5 py-1 rounded-lg text-xs font-medium"
                [class]="a.status === 'Present' ? 'bg-success-50 text-success-700' : (a.status === 'Late' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
                {{ a.date }} \xB7 {{ a.status }}
              </span>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeacherDetailComponent, { className: "TeacherDetailComponent", filePath: "src/app/features/teachers/pages/teacher-detail/teacher-detail.component.ts", lineNumber: 149 });
})();
export {
  TeacherDetailComponent
};
//# sourceMappingURL=chunk-DE2LE55H.js.map
