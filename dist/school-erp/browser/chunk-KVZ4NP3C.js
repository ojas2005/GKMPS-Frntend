import {
  AttendanceService
} from "./chunk-ARTF4EA6.js";
import {
  AuthService
} from "./chunk-MWX4V2YL.js";
import {
  StudentsService
} from "./chunk-6PRATOSZ.js";
import "./chunk-LRGA3DNB.js";
import {
  DEFAULT_CLASS,
  DEFAULT_SECTION,
  SCHOOL_CLASSES,
  SCHOOL_SECTIONS,
  classNameById,
  sectionNameById
} from "./chunk-WTXCDO4J.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-VTNFS7A5.js";
import "./chunk-35DAK2ZT.js";
import "./chunk-JJL4A5HX.js";
import {
  CommonModule,
  Component,
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
  ɵɵproperty,
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
import "./chunk-WDMUDEB6.js";

// src/app/features/attendance/pages/attendance/attendance.component.ts
function AttendanceComponent_ng_container_6_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function AttendanceComponent_ng_container_6_p_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "No attendance records in this window.");
    \u0275\u0275elementEnd();
  }
}
function AttendanceComponent_ng_container_6_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r3 = ctx.$implicit;
    \u0275\u0275classMap(r_r3.status === "Present" ? "bg-success-50 text-success-700" : r_r3.status === "Late" ? "bg-warning-50 text-warning-700" : "bg-error-50 text-error-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", r_r3.date, " \xB7 ", r_r3.status, " ");
  }
}
function AttendanceComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 4)(2, "div", 5)(3, "div")(4, "label", 6);
    \u0275\u0275text(5, "From");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function AttendanceComponent_ng_container_6_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.fromDate, $event) || (ctx_r1.fromDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "label", 6);
    \u0275\u0275text(9, "To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function AttendanceComponent_ng_container_6_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.toDate, $event) || (ctx_r1.toDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 8);
    \u0275\u0275listener("click", function AttendanceComponent_ng_container_6_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadMine());
    });
    \u0275\u0275text(12, "Refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 9);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, AttendanceComponent_ng_container_6_p_15_Template, 2, 1, "p", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 4)(17, "h2", 11);
    \u0275\u0275text(18, "Daily log");
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, AttendanceComponent_ng_container_6_p_19_Template, 2, 0, "p", 12);
    \u0275\u0275elementStart(20, "div", 13);
    \u0275\u0275template(21, AttendanceComponent_ng_container_6_span_21_Template, 2, 4, "span", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.fromDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.toDate);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.myPct() !== null ? ctx_r1.myPct() + "%" : "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.myRecords().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.myRecords());
  }
}
function AttendanceComponent_ng_container_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1, " You are not a class teacher (head teacher) of any class, so you cannot upload attendance. Ask the school owner to assign you a class on the Teachers page. If you were just assigned, log out and back in. ");
    \u0275\u0275elementEnd();
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_option_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("value", c_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.name);
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    \u0275\u0275property("value", s_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Section ", s_r6.name);
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1, " Locked to your class: ");
    \u0275\u0275elementStart(2, "span", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.className(ctx_r1.classId), " - ", ctx_r1.sectionName(ctx_r1.sectionId));
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.okMsg());
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275text(1, "Loading students...");
    \u0275\u0275elementEnd();
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275text(1, "No students in this class/section.");
    \u0275\u0275elementEnd();
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r8 = ctx.ngIf;
    \u0275\u0275classMap(status_r8 === "Present" ? "bg-success-50 text-success-700" : status_r8 === "Late" ? "bg-warning-50 text-warning-700" : "bg-error-50 text-error-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", status_r8, " ");
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, "not marked");
    \u0275\u0275elementEnd();
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 43)(1, "td", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 46);
    \u0275\u0275template(6, AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_span_6_Template, 2, 3, "span", 47)(7, AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_span_7_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 49)(9, "button", 50);
    \u0275\u0275listener("click", function AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_Template_button_click_9_listener() {
      const st_r9 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.markStudent(st_r9.id, "Present"));
    });
    \u0275\u0275text(10, "P");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 51);
    \u0275\u0275listener("click", function AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_Template_button_click_11_listener() {
      const st_r9 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.markStudent(st_r9.id, "Absent"));
    });
    \u0275\u0275text(12, "A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 52);
    \u0275\u0275listener("click", function AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_Template_button_click_13_listener() {
      const st_r9 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.markStudent(st_r9.id, "Late"));
    });
    \u0275\u0275text(14, "L");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const st_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(st_r9.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(st_r9.admissionNumber || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.statusFor(st_r9.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.statusFor(st_r9.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !!ctx_r1.statusFor(st_r9.id) || ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !!ctx_r1.statusFor(st_r9.id) || ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !!ctx_r1.statusFor(st_r9.id) || ctx_r1.saving());
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_table_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 38)(1, "thead", 39)(2, "tr")(3, "th", 40);
    \u0275\u0275text(4, "Student");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 40);
    \u0275\u0275text(6, "Admission #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 40);
    \u0275\u0275text(8, "Today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 41);
    \u0275\u0275text(10, "Mark");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, AttendanceComponent_ng_container_7_ng_container_2_table_18_tr_12_Template, 15, 7, "tr", 42);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.roster());
  }
}
function AttendanceComponent_ng_container_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 20)(2, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function AttendanceComponent_ng_container_7_ng_container_2_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.classId, $event) || (ctx_r1.classId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(3, AttendanceComponent_ng_container_7_ng_container_2_option_3_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function AttendanceComponent_ng_container_7_ng_container_2_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.sectionId, $event) || (ctx_r1.sectionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(5, AttendanceComponent_ng_container_7_ng_container_2_option_5_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function AttendanceComponent_ng_container_7_ng_container_2_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.date, $event) || (ctx_r1.date = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 8);
    \u0275\u0275listener("click", function AttendanceComponent_ng_container_7_ng_container_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.load();
      return \u0275\u0275resetView(ctx_r1.loadRoster());
    });
    \u0275\u0275text(8, "Load register");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, AttendanceComponent_ng_container_7_ng_container_2_p_9_Template, 4, 2, "p", 24);
    \u0275\u0275elementStart(10, "div", 25)(11, "div", 26)(12, "h2", 27);
    \u0275\u0275text(13, "Mark today's attendance");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, AttendanceComponent_ng_container_7_ng_container_2_span_14_Template, 2, 1, "span", 28)(15, AttendanceComponent_ng_container_7_ng_container_2_span_15_Template, 2, 1, "span", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, AttendanceComponent_ng_container_7_ng_container_2_div_16_Template, 2, 0, "div", 30)(17, AttendanceComponent_ng_container_7_ng_container_2_div_17_Template, 2, 0, "div", 30)(18, AttendanceComponent_ng_container_7_ng_container_2_table_18_Template, 13, 1, "table", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.classId);
    \u0275\u0275property("disabled", ctx_r1.isTeacher);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.classes);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sectionId);
    \u0275\u0275property("disabled", ctx_r1.isTeacher);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.sections);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.date);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.isTeacher);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.okMsg());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.rosterLoading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.rosterLoading() && ctx_r1.roster().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.rosterLoading() && ctx_r1.roster().length > 0);
  }
}
function AttendanceComponent_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, AttendanceComponent_ng_container_7_div_1_Template, 2, 0, "div", 18)(2, AttendanceComponent_ng_container_7_ng_container_2_Template, 19, 13, "ng-container", 3);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isTeacher && !ctx_r1.classTeacherClassId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isTeacher || ctx_r1.classTeacherClassId);
  }
}
var _AttendanceComponent = class _AttendanceComponent {
  constructor() {
    this.service = inject(AttendanceService);
    this.studentsService = inject(StudentsService);
    this.auth = inject(AuthService);
    this.selfService = this.auth.isSelfService();
    this.isTeacher = this.auth.hasRole("Teacher");
    this.classTeacherClassId = this.auth.classTeacherClassId();
    this.myPct = signal(null, ...ngDevMode ? [{ debugName: "myPct" }] : []);
    this.myRecords = signal([], ...ngDevMode ? [{ debugName: "myRecords" }] : []);
    this.fromDate = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    this.toDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.roster = signal([], ...ngDevMode ? [{ debugName: "roster" }] : []);
    this.rosterLoading = signal(false, ...ngDevMode ? [{ debugName: "rosterLoading" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
    this.formError = signal("", ...ngDevMode ? [{ debugName: "formError" }] : []);
    this.okMsg = signal("", ...ngDevMode ? [{ debugName: "okMsg" }] : []);
    this.classes = SCHOOL_CLASSES;
    this.sections = SCHOOL_SECTIONS;
    this.className = classNameById;
    this.sectionName = sectionNameById;
    this.classId = this.isTeacher ? this.auth.classTeacherClassId() ?? DEFAULT_CLASS.id : DEFAULT_CLASS.id;
    this.sectionId = this.isTeacher ? this.auth.classTeacherSectionId() ?? DEFAULT_SECTION.id : DEFAULT_SECTION.id;
    this.date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  }
  ngOnInit() {
    if (this.selfService) {
      this.loadMine();
    } else if (!this.isTeacher || this.classTeacherClassId) {
      this.load();
      this.loadRoster();
    }
  }
  loadMine() {
    const id = this.auth.studentId();
    if (!id) {
      this.error.set("Your account is not linked to a student record yet.");
      return;
    }
    this.error.set("");
    this.service.studentPercentage(id, this.fromDate, this.toDate).subscribe({
      next: (r) => this.myPct.set(Math.round((r?.percentage ?? 0) * 10) / 10),
      error: (err) => this.error.set(this.msg(err, "Failed to load your attendance."))
    });
    this.service.studentRecords(id, this.fromDate, this.toDate).subscribe({
      next: (list) => this.myRecords.set(list ?? []),
      error: () => {
      }
    });
  }
  load() {
    if (!this.classId || !this.sectionId) {
      this.error.set("Class and section are required.");
      return;
    }
    this.loading.set(true);
    this.error.set("");
    this.service.getClass(this.classId, this.sectionId, this.date).subscribe({
      next: (list) => {
        this.rows.set(list ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load register."));
        this.loading.set(false);
      }
    });
  }
  loadRoster() {
    this.rosterLoading.set(true);
    this.studentsService.list({ classId: this.classId, sectionId: this.sectionId, pageSize: 100 }).subscribe({
      next: (page) => {
        this.roster.set(page?.items ?? []);
        this.rosterLoading.set(false);
      },
      error: () => this.rosterLoading.set(false)
    });
  }
  // Today's status for a student, from the loaded register.
  statusFor(studentId) {
    return this.rows().find((r) => r.studentId === studentId)?.status ?? null;
  }
  markStudent(studentId, status) {
    this.saving.set(true);
    this.formError.set("");
    this.okMsg.set("");
    this.service.mark({
      studentId,
      classId: this.classId,
      sectionId: this.sectionId,
      date: this.date,
      status
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.okMsg.set("Marked.");
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, "Could not mark."));
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_AttendanceComponent.\u0275fac = function AttendanceComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AttendanceComponent)();
};
_AttendanceComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttendanceComponent, selectors: [["app-attendance"]], decls: 8, vars: 4, consts: [[1, "p-6", "space-y-6"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], [4, "ngIf"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-4", "items-end"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["type", "date", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], [1, "text-3xl", "font-bold", "text-neutral-900"], ["class", "text-error-600 text-sm mt-2", 4, "ngIf"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-4"], ["class", "text-neutral-500 text-sm", 4, "ngIf"], [1, "flex", "flex-wrap", "gap-2"], ["class", "px-2.5 py-1 rounded-lg text-xs font-medium", 3, "class", 4, "ngFor", "ngForOf"], [1, "text-error-600", "text-sm", "mt-2"], [1, "text-neutral-500", "text-sm"], [1, "px-2.5", "py-1", "rounded-lg", "text-xs", "font-medium"], ["class", "bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm", 4, "ngIf"], [1, "bg-warning-50", "border", "border-warning-200", "rounded-xl", "p-4", "text-warning-800", "text-sm"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200", "grid", "grid-cols-1", "md:grid-cols-4", "gap-4"], [1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", "disabled:bg-neutral-100", 3, "ngModelChange", "ngModel", "disabled"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "date", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["class", "text-xs text-neutral-500 -mt-3", 4, "ngIf"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "overflow-hidden"], [1, "p-4", "border-b", "border-neutral-200", "flex", "items-center", "justify-between"], [1, "text-lg", "font-semibold", "text-neutral-900"], ["class", "text-success-600 text-sm", 4, "ngIf"], ["class", "text-error-600 text-sm", 4, "ngIf"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [3, "value"], [1, "text-xs", "text-neutral-500", "-mt-3"], [1, "font-medium"], [1, "text-success-600", "text-sm"], [1, "text-error-600", "text-sm"], [1, "p-8", "text-center", "text-neutral-500"], [1, "w-full", "text-sm"], [1, "bg-neutral-50", "text-neutral-600", "text-left"], [1, "px-6", "py-3", "font-medium"], [1, "px-6", "py-3", "font-medium", "text-right"], ["class", "border-t border-neutral-200", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-200"], [1, "px-6", "py-3", "font-medium", "text-neutral-900"], [1, "px-6", "py-3", "text-neutral-600"], [1, "px-6", "py-3"], ["class", "px-2 py-1 rounded-full text-xs font-medium", 3, "class", 4, "ngIf"], ["class", "text-neutral-400 text-xs", 4, "ngIf"], [1, "px-6", "py-3", "text-right", "space-x-1"], [1, "px-2.5", "py-1", "rounded-lg", "text-xs", "font-medium", "bg-success-50", "text-success-700", "hover:bg-success-100", "disabled:opacity-40", 3, "click", "disabled"], [1, "px-2.5", "py-1", "rounded-lg", "text-xs", "font-medium", "bg-error-50", "text-error-700", "hover:bg-error-100", "disabled:opacity-40", 3, "click", "disabled"], [1, "px-2.5", "py-1", "rounded-lg", "text-xs", "font-medium", "bg-warning-50", "text-warning-700", "hover:bg-warning-100", "disabled:opacity-40", 3, "click", "disabled"], [1, "px-2", "py-1", "rounded-full", "text-xs", "font-medium"], [1, "text-neutral-400", "text-xs"]], template: function AttendanceComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 1);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 2);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, AttendanceComponent_ng_container_6_Template, 22, 6, "ng-container", 3)(7, AttendanceComponent_ng_container_7_Template, 3, 2, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.selfService ? "My Attendance" : "Attendance");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.selfService ? "Your attendance percentage and daily log." : ctx.isTeacher ? "Mark attendance for your class (class teachers only)." : "View a class register or mark students.", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
var AttendanceComponent = _AttendanceComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttendanceComponent, [{
    type: Component,
    args: [{
      selector: "app-attendance",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">{{ selfService ? 'My Attendance' : 'Attendance' }}</h1>
        <p class="text-neutral-600 text-sm">
          {{ selfService ? 'Your attendance percentage and daily log.' :
             (isTeacher ? 'Mark attendance for your class (class teachers only).' : 'View a class register or mark students.') }}
        </p>
      </div>

      <!-- Self-service: my attendance -->
      <ng-container *ngIf="selfService">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label class="block text-xs text-neutral-500 mb-1">From</label>
              <input [(ngModel)]="fromDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1">To</label>
              <input [(ngModel)]="toDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            </div>
            <button (click)="loadMine()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Refresh</button>
            <div class="text-3xl font-bold text-neutral-900">{{ myPct() !== null ? (myPct() + '%') : '\u2014' }}</div>
          </div>
          <p *ngIf="error()" class="text-error-600 text-sm mt-2">{{ error() }}</p>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Daily log</h2>
          <p *ngIf="myRecords().length === 0" class="text-neutral-500 text-sm">No attendance records in this window.</p>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let r of myRecords()"
              class="px-2.5 py-1 rounded-lg text-xs font-medium"
              [class]="r.status === 'Present' ? 'bg-success-50 text-success-700' : (r.status === 'Late' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
              {{ r.date }} \xB7 {{ r.status }}
            </span>
          </div>
        </div>
      </ng-container>

      <!-- Staff/teacher -->
      <ng-container *ngIf="!selfService">

      <!-- Teacher without a class-teacher assignment -->
      <div *ngIf="isTeacher && !classTeacherClassId" class="bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm">
        You are not a class teacher (head teacher) of any class, so you cannot upload attendance.
        Ask the school owner to assign you a class on the Teachers page. If you were just assigned, log out and back in.
      </div>

      <ng-container *ngIf="!isTeacher || classTeacherClassId">
      <!-- Filters -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select [(ngModel)]="classId" [disabled]="isTeacher" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white disabled:bg-neutral-100">
          <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
        </select>
        <select [(ngModel)]="sectionId" [disabled]="isTeacher" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white disabled:bg-neutral-100">
          <option *ngFor="let s of sections" [value]="s.id">Section {{ s.name }}</option>
        </select>
        <input [(ngModel)]="date" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        <button (click)="load(); loadRoster()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Load register</button>
      </div>
      <p *ngIf="isTeacher" class="text-xs text-neutral-500 -mt-3">
        Locked to your class: <span class="font-medium">{{ className(classId) }} - {{ sectionName(sectionId) }}</span>
      </p>

      <!-- Mark by roster: one row per student, one tap to mark -->
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div class="p-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-neutral-900">Mark today's attendance</h2>
          <span *ngIf="okMsg()" class="text-success-600 text-sm">{{ okMsg() }}</span>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
        <div *ngIf="rosterLoading()" class="p-8 text-center text-neutral-500">Loading students...</div>
        <div *ngIf="!rosterLoading() && roster().length === 0" class="p-8 text-center text-neutral-500">No students in this class/section.</div>
        <table *ngIf="!rosterLoading() && roster().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Student</th><th class="px-6 py-3 font-medium">Admission #</th><th class="px-6 py-3 font-medium">Today</th><th class="px-6 py-3 font-medium text-right">Mark</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let st of roster()" class="border-t border-neutral-200">
              <td class="px-6 py-3 font-medium text-neutral-900">{{ st.fullName }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ st.admissionNumber || '\u2014' }}</td>
              <td class="px-6 py-3">
                <span *ngIf="statusFor(st.id) as status"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  [class]="status === 'Present' ? 'bg-success-50 text-success-700' : (status === 'Late' ? 'bg-warning-50 text-warning-700' : 'bg-error-50 text-error-700')">
                  {{ status }}
                </span>
                <span *ngIf="!statusFor(st.id)" class="text-neutral-400 text-xs">not marked</span>
              </td>
              <td class="px-6 py-3 text-right space-x-1">
                <button (click)="markStudent(st.id, 'Present')" [disabled]="!!statusFor(st.id) || saving()"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium bg-success-50 text-success-700 hover:bg-success-100 disabled:opacity-40">P</button>
                <button (click)="markStudent(st.id, 'Absent')" [disabled]="!!statusFor(st.id) || saving()"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium bg-error-50 text-error-700 hover:bg-error-100 disabled:opacity-40">A</button>
                <button (click)="markStudent(st.id, 'Late')" [disabled]="!!statusFor(st.id) || saving()"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium bg-warning-50 text-warning-700 hover:bg-warning-100 disabled:opacity-40">L</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </ng-container>
      </ng-container>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttendanceComponent, { className: "AttendanceComponent", filePath: "src/app/features/attendance/pages/attendance/attendance.component.ts", lineNumber: 120 });
})();
export {
  AttendanceComponent
};
//# sourceMappingURL=chunk-KVZ4NP3C.js.map
