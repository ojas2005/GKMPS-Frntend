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
  RouterLink
} from "./chunk-QXXS42YF.js";
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
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
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
import "./chunk-WDMUDEB6.js";

// src/app/features/teachers/pages/teachers/teachers.component.ts
var _c0 = (a0) => ["/teachers", a0];
function TeachersComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "p", 16);
    \u0275\u0275text(3, "Staff onboarded \u2014 hand these credentials to them:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Login ID: ");
    \u0275\u0275elementStart(6, "span", 17);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " \xA0\xB7\xA0 Password: ");
    \u0275\u0275elementStart(9, "span", 17);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "button", 18);
    \u0275\u0275listener("click", function TeachersComponent_div_9_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.lastCredentials.set(null));
    });
    \u0275\u0275text(12, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.lastCredentials().username);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.lastCredentials().password);
  }
}
function TeachersComponent_div_14_option_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 44);
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
function TeachersComponent_div_14_option_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    \u0275\u0275property("value", s_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Section ", s_r5.name);
  }
}
function TeachersComponent_div_14_span_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function TeachersComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "p", 20);
    \u0275\u0275text(2, "You set the login ID & password and give them to the teacher. Fields marked * are required.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21)(4, "div")(5, "label", 22);
    \u0275\u0275text(6, "Full name *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.fullName, $event) || (ctx_r1.form.fullName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "label", 22);
    \u0275\u0275text(10, "Designation *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.designation, $event) || (ctx_r1.form.designation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 22);
    \u0275\u0275text(14, "Login role *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 25);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.role, $event) || (ctx_r1.form.role = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "option", 26);
    \u0275\u0275text(17, "Teacher");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 27);
    \u0275\u0275text(19, "Accountant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 28);
    \u0275\u0275text(21, "Librarian");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 29);
    \u0275\u0275text(23, "Admin");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div")(25, "label", 22);
    \u0275\u0275text(26, "Employee code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.employeeCode, $event) || (ctx_r1.form.employeeCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div")(29, "label", 22);
    \u0275\u0275text(30, "Login ID * (give this to the teacher)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.username, $event) || (ctx_r1.form.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div")(33, "label", 22);
    \u0275\u0275text(34, "Password * (min 8 characters)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.password, $event) || (ctx_r1.form.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div")(37, "label", 22);
    \u0275\u0275text(38, "Subjects taught (CSV)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.subjectsTaughtCsv, $event) || (ctx_r1.form.subjectsTaughtCsv = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div")(41, "label", 22);
    \u0275\u0275text(42, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.phone, $event) || (ctx_r1.form.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div")(45, "label", 22);
    \u0275\u0275text(46, "Class teacher (head teacher) of");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "select", 25);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_select_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.classTeacherOfClassId, $event) || (ctx_r1.form.classTeacherOfClassId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(48, "option", 35);
    \u0275\u0275text(49, "Not a class teacher");
    \u0275\u0275elementEnd();
    \u0275\u0275template(50, TeachersComponent_div_14_option_50_Template, 2, 2, "option", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div")(52, "label", 22);
    \u0275\u0275text(53, "Section (if class teacher)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "select", 25);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_select_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.classTeacherOfSectionId, $event) || (ctx_r1.form.classTeacherOfSectionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(55, "option", 35);
    \u0275\u0275text(56, "\u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275template(57, TeachersComponent_div_14_option_57_Template, 2, 2, "option", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div")(59, "label", 22);
    \u0275\u0275text(60, "Monthly salary (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_div_14_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.monthlySalary, $event) || (ctx_r1.form.monthlySalary = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "p", 38);
    \u0275\u0275text(63, "Drives their pending-salary readout each month; editable later on their detail page.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "p", 39);
    \u0275\u0275text(65, "Only the class teacher of a class can upload that class's attendance and view its students.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 40)(67, "button", 41);
    \u0275\u0275listener("click", function TeachersComponent_div_14_Template_button_click_67_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "button", 42);
    \u0275\u0275listener("click", function TeachersComponent_div_14_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fillSample());
    });
    \u0275\u0275text(70, "Fill sample");
    \u0275\u0275elementEnd();
    \u0275\u0275template(71, TeachersComponent_div_14_span_71_Template, 2, 1, "span", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.designation);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.role);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.employeeCode);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.username);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.password);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.subjectsTaughtCsv);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.phone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.classTeacherOfClassId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.classes);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.classTeacherOfSectionId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.sections);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.monthlySalary);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Onboard", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.formError());
  }
}
function TeachersComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function TeachersComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function TeachersComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1, "No staff yet.");
    \u0275\u0275elementEnd();
  }
}
function TeachersComponent_table_19_tr_13_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.className(s_r6.classTeacherOfClassId), "", s_r6.classTeacherOfSectionId ? " - " + ctx_r1.sectionName(s_r6.classTeacherOfSectionId) : "", " ");
  }
}
function TeachersComponent_table_19_tr_13_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function TeachersComponent_table_19_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 52)(1, "td", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 55);
    \u0275\u0275template(6, TeachersComponent_table_19_tr_13_span_6_Template, 2, 2, "span", 56)(7, TeachersComponent_table_19_tr_13_span_7_Template, 2, 0, "span", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 54);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 58);
    \u0275\u0275text(11, "View details \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, s_r6.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.designation || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", s_r6.classTeacherOfClassId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !s_r6.classTeacherOfClassId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.email || "\u2014");
  }
}
function TeachersComponent_table_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 48)(1, "thead", 49)(2, "tr")(3, "th", 50);
    \u0275\u0275text(4, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 50);
    \u0275\u0275text(6, "Designation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 50);
    \u0275\u0275text(8, "Class teacher of");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 50);
    \u0275\u0275text(10, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, TeachersComponent_table_19_tr_13_Template, 12, 8, "tr", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.rows());
  }
}
var _TeachersComponent = class _TeachersComponent {
  constructor() {
    this.service = inject(TeachersService);
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
    this.formError = signal("", ...ngDevMode ? [{ debugName: "formError" }] : []);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.lastCredentials = signal(null, ...ngDevMode ? [{ debugName: "lastCredentials" }] : []);
    this.keyword = "";
    this.classes = SCHOOL_CLASSES;
    this.sections = SCHOOL_SECTIONS;
    this.className = classNameById;
    this.sectionName = sectionNameById;
    this.form = this.blankForm();
  }
  blankForm() {
    return {
      fullName: "",
      designation: "Teacher",
      role: "Teacher",
      username: "",
      password: "",
      email: "",
      phone: "",
      employeeCode: "",
      subjectsTaughtCsv: "",
      classTeacherOfClassId: "",
      classTeacherOfSectionId: "",
      monthlySalary: 0
    };
  }
  fillSample() {
    const suffix = Date.now().toString(36).slice(-4);
    this.form = {
      fullName: "Meera Nair",
      designation: "Teacher",
      role: "Teacher",
      username: `meera${suffix}`,
      password: "Teacher@123",
      email: "",
      phone: "9876500011",
      employeeCode: "",
      subjectsTaughtCsv: "Mathematics,Science",
      classTeacherOfClassId: "",
      classTeacherOfSectionId: "",
      monthlySalary: 35e3
    };
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set("");
    this.service.list({ keyword: this.keyword }).subscribe({
      next: (p) => {
        this.rows.set(p?.items ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load staff."));
        this.loading.set(false);
      }
    });
  }
  save() {
    if (!this.form.fullName || !this.form.designation) {
      this.formError.set("Name and designation are required.");
      return;
    }
    if (!this.form.username.trim() || (this.form.password ?? "").length < 8) {
      this.formError.set("A login ID and a password of at least 8 characters are required.");
      return;
    }
    if (!!this.form.classTeacherOfClassId !== !!this.form.classTeacherOfSectionId) {
      this.formError.set("Pick both class AND section for a class teacher (or neither).");
      return;
    }
    this.saving.set(true);
    this.formError.set("");
    this.service.onboardWithAccount(this.form).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.showForm.set(false);
        this.lastCredentials.set(res.credentials);
        this.form = this.blankForm();
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, "Could not onboard."));
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_TeachersComponent.\u0275fac = function TeachersComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TeachersComponent)();
};
_TeachersComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeachersComponent, selectors: [["app-teachers"]], decls: 20, vars: 8, consts: [[1, "p-6", "space-y-6"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], ["class", "bg-success-50 border border-success-200 rounded-xl p-4 flex items-start justify-between", 4, "ngIf"], [1, "flex", "gap-3"], ["placeholder", "Search by name or employee code...", 1, "flex-1", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary-500", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "bg-white rounded-xl p-6 shadow-sm border border-neutral-200", 4, "ngIf"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "overflow-hidden"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "p-8 text-center text-error-600", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [1, "bg-success-50", "border", "border-success-200", "rounded-xl", "p-4", "flex", "items-start", "justify-between"], [1, "text-sm", "text-success-800"], [1, "font-semibold", "mb-1"], [1, "font-mono", "font-bold"], [1, "text-success-700", "hover:text-success-900", "text-sm", 3, "click"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "text-xs", "text-neutral-500", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["placeholder", "Meera Nair", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Teacher", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["value", "Teacher"], ["value", "Accountant"], ["value", "Librarian"], ["value", "Admin"], ["placeholder", "auto-generated if blank", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "e.g. meera.t", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "e.g. Teacher@123", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Mathematics,Science", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Optional", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", "min", "0", "placeholder", "e.g. 35000", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "text-xs", "text-neutral-400", "mt-1"], [1, "text-xs", "text-neutral-500", "mt-2"], [1, "mt-4", "flex", "items-center", "gap-3"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["type", "button", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "text-error-600 text-sm", 4, "ngIf"], [3, "value"], [1, "text-error-600", "text-sm"], [1, "p-8", "text-center", "text-neutral-500"], [1, "p-8", "text-center", "text-error-600"], [1, "w-full", "text-sm"], [1, "bg-neutral-50", "text-neutral-600", "text-left"], [1, "px-6", "py-3", "font-medium"], ["class", "border-t border-neutral-200 hover:bg-neutral-50 cursor-pointer", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-200", "hover:bg-neutral-50", "cursor-pointer", 3, "routerLink"], [1, "px-6", "py-3", "font-medium", "text-neutral-900"], [1, "px-6", "py-3", "text-neutral-600"], [1, "px-6", "py-3"], ["class", "px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium", 4, "ngIf"], ["class", "text-neutral-400", 4, "ngIf"], [1, "px-6", "py-3", "text-primary-600", "text-right", "text-xs", "font-medium"], [1, "px-2", "py-1", "bg-primary-50", "text-primary-700", "rounded-full", "text-xs", "font-medium"], [1, "text-neutral-400"]], template: function TeachersComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
    \u0275\u0275text(4, "Teachers & Staff");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6, "Search by name or employee code, click a row for details, payouts & attendance.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 4);
    \u0275\u0275listener("click", function TeachersComponent_Template_button_click_7_listener() {
      return ctx.showForm.set(!ctx.showForm());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, TeachersComponent_div_9_Template, 13, 2, "div", 5);
    \u0275\u0275elementStart(10, "div", 6)(11, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function TeachersComponent_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.keyword, $event) || (ctx.keyword = $event);
      return $event;
    });
    \u0275\u0275listener("keyup.enter", function TeachersComponent_Template_input_keyup_enter_11_listener() {
      return ctx.load();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 8);
    \u0275\u0275listener("click", function TeachersComponent_Template_button_click_12_listener() {
      return ctx.load();
    });
    \u0275\u0275text(13, "Search");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, TeachersComponent_div_14_Template, 72, 16, "div", 9);
    \u0275\u0275elementStart(15, "div", 10);
    \u0275\u0275template(16, TeachersComponent_div_16_Template, 2, 0, "div", 11)(17, TeachersComponent_div_17_Template, 2, 1, "div", 12)(18, TeachersComponent_div_18_Template, 2, 0, "div", 11)(19, TeachersComponent_table_19_Template, 14, 1, "table", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx.showForm() ? "Close" : "+ Onboard Staff", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.lastCredentials());
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx.keyword);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.showForm());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading() && !ctx.error() && ctx.rows().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading() && !ctx.error() && ctx.rows().length > 0);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink], encapsulation: 2 });
var TeachersComponent = _TeachersComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeachersComponent, [{
    type: Component,
    args: [{
      selector: "app-teachers",
      standalone: true,
      imports: [CommonModule, FormsModule, RouterLink],
      template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Teachers &amp; Staff</h1>
          <p class="text-neutral-600 text-sm">Search by name or employee code, click a row for details, payouts &amp; attendance.</p>
        </div>
        <button (click)="showForm.set(!showForm())"
          class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Onboard Staff' }}
        </button>
      </div>

      <!-- Credentials banner shown after a successful onboarding -->
      <div *ngIf="lastCredentials()" class="bg-success-50 border border-success-200 rounded-xl p-4 flex items-start justify-between">
        <div class="text-sm text-success-800">
          <p class="font-semibold mb-1">Staff onboarded \u2014 hand these credentials to them:</p>
          <p>Login ID: <span class="font-mono font-bold">{{ lastCredentials()!.username }}</span>
             &nbsp;\xB7&nbsp; Password: <span class="font-mono font-bold">{{ lastCredentials()!.password }}</span></p>
        </div>
        <button (click)="lastCredentials.set(null)" class="text-success-700 hover:text-success-900 text-sm">\u2715</button>
      </div>

      <!-- Search -->
      <div class="flex gap-3">
        <input [(ngModel)]="keyword" (keyup.enter)="load()" placeholder="Search by name or employee code..."
          class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
        <button (click)="load()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
      </div>

      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <p class="text-xs text-neutral-500 mb-4">You set the login ID &amp; password and give them to the teacher. Fields marked * are required.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Full name *</label>
            <input [(ngModel)]="form.fullName" placeholder="Meera Nair" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Designation *</label>
            <input [(ngModel)]="form.designation" placeholder="Teacher" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Login role *</label>
            <select [(ngModel)]="form.role" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="Teacher">Teacher</option>
              <option value="Accountant">Accountant</option>
              <option value="Librarian">Librarian</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Employee code</label>
            <input [(ngModel)]="form.employeeCode" placeholder="auto-generated if blank" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Login ID * (give this to the teacher)</label>
            <input [(ngModel)]="form.username" placeholder="e.g. meera.t" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Password * (min 8 characters)</label>
            <input [(ngModel)]="form.password" placeholder="e.g. Teacher@123" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Subjects taught (CSV)</label>
            <input [(ngModel)]="form.subjectsTaughtCsv" placeholder="Mathematics,Science" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Phone</label>
            <input [(ngModel)]="form.phone" placeholder="Optional" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Class teacher (head teacher) of</label>
            <select [(ngModel)]="form.classTeacherOfClassId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Not a class teacher</option>
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Section (if class teacher)</label>
            <select [(ngModel)]="form.classTeacherOfSectionId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">\u2014</option>
              <option *ngFor="let s of sections" [value]="s.id">Section {{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Monthly salary (\u20B9)</label>
            <input [(ngModel)]="form.monthlySalary" type="number" min="0" placeholder="e.g. 35000" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <p class="text-xs text-neutral-400 mt-1">Drives their pending-salary readout each month; editable later on their detail page.</p>
          </div>
        </div>
        <p class="text-xs text-neutral-500 mt-2">Only the class teacher of a class can upload that class's attendance and view its students.</p>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()"
            class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Onboard' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No staff yet.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr>
              <th class="px-6 py-3 font-medium">Name</th>
              <th class="px-6 py-3 font-medium">Designation</th>
              <th class="px-6 py-3 font-medium">Class teacher of</th>
              <th class="px-6 py-3 font-medium">Email</th>
              <th class="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of rows()" [routerLink]="['/teachers', s.id]"
                class="border-t border-neutral-200 hover:bg-neutral-50 cursor-pointer">
              <td class="px-6 py-3 font-medium text-neutral-900">{{ s.fullName }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ s.designation || '\u2014' }}</td>
              <td class="px-6 py-3">
                <span *ngIf="s.classTeacherOfClassId" class="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                  {{ className(s.classTeacherOfClassId!) }}{{ s.classTeacherOfSectionId ? ' - ' + sectionName(s.classTeacherOfSectionId!) : '' }}
                </span>
                <span *ngIf="!s.classTeacherOfClassId" class="text-neutral-400">\u2014</span>
              </td>
              <td class="px-6 py-3 text-neutral-600">{{ s.email || '\u2014' }}</td>
              <td class="px-6 py-3 text-primary-600 text-right text-xs font-medium">View details \u2192</td>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeachersComponent, { className: "TeachersComponent", filePath: "src/app/features/teachers/pages/teachers/teachers.component.ts", lineNumber: 147 });
})();
export {
  TeachersComponent
};
//# sourceMappingURL=chunk-2YATPO5E.js.map
