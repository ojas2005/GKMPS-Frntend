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

// src/app/features/students/pages/students/students.component.ts
var _c0 = (a0) => ["/students", a0];
function StudentsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "p", 16);
    \u0275\u0275text(3, "Student admitted \u2014 hand these credentials to them:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Login ID: ");
    \u0275\u0275elementStart(6, "span", 17);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " \xA0\xB7\xA0 Password: ");
    \u0275\u0275elementStart(9, "span", 17);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 18);
    \u0275\u0275text(12, "They sign in at this site with these \u2014 no registration needed.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 19);
    \u0275\u0275listener("click", function StudentsComponent_div_9_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.lastCredentials.set(null));
    });
    \u0275\u0275text(14, "\u2715");
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
function StudentsComponent_div_14_option_32_Template(rf, ctx) {
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
function StudentsComponent_div_14_option_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    \u0275\u0275property("value", s_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r5.name);
  }
}
function StudentsComponent_div_14_span_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function StudentsComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "h2", 21);
    \u0275\u0275text(2, "Admit New Student");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 22);
    \u0275\u0275text(4, "You set the login ID & password and give them to the student. Fields marked * are required.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 23)(6, "div")(7, "label", 24);
    \u0275\u0275text(8, "Full name *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.fullName, $event) || (ctx_r1.form.fullName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "label", 24);
    \u0275\u0275text(12, "Date of birth *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.dateOfBirth, $event) || (ctx_r1.form.dateOfBirth = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "label", 24);
    \u0275\u0275text(16, "Gender *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.gender, $event) || (ctx_r1.form.gender = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 28);
    \u0275\u0275text(19, "Male");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 29);
    \u0275\u0275text(21, "Female");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 30);
    \u0275\u0275text(23, "Other");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div")(25, "label", 24);
    \u0275\u0275text(26, "Admission number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.admissionNumber, $event) || (ctx_r1.form.admissionNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div")(29, "label", 24);
    \u0275\u0275text(30, "Class *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_select_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.classId, $event) || (ctx_r1.form.classId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(32, StudentsComponent_div_14_option_32_Template, 2, 2, "option", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div")(34, "label", 24);
    \u0275\u0275text(35, "Section *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_select_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sectionId, $event) || (ctx_r1.form.sectionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(37, StudentsComponent_div_14_option_37_Template, 2, 2, "option", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div")(39, "label", 24);
    \u0275\u0275text(40, "Login ID * (give this to the student)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.username, $event) || (ctx_r1.form.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div")(43, "label", 24);
    \u0275\u0275text(44, "Password * (min 8 characters)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.password, $event) || (ctx_r1.form.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div")(47, "label", 24);
    \u0275\u0275text(48, "Parent name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_input_ngModelChange_49_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.parentName, $event) || (ctx_r1.form.parentName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div")(51, "label", 24);
    \u0275\u0275text(52, "Parent phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_input_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.parentPhone, $event) || (ctx_r1.form.parentPhone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div")(55, "label", 24);
    \u0275\u0275text(56, "Pending fee at admission (\u20B9)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_div_14_Template_input_ngModelChange_57_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.pendingFee, $event) || (ctx_r1.form.pendingFee = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "p", 37);
    \u0275\u0275text(59, "Added on top of the class's fee structure. Their upcoming class fees are assessed automatically.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(60, "div", 38)(61, "button", 39);
    \u0275\u0275listener("click", function StudentsComponent_div_14_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.admit());
    });
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "button", 40);
    \u0275\u0275listener("click", function StudentsComponent_div_14_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fillSample());
    });
    \u0275\u0275text(64, "Fill sample");
    \u0275\u0275elementEnd();
    \u0275\u0275template(65, StudentsComponent_div_14_span_65_Template, 2, 1, "span", 41);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.dateOfBirth);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.gender);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.admissionNumber);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.classId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.classes);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sectionId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.sections);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.username);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.password);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.parentName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.parentPhone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.pendingFee);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Admit", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.formError());
  }
}
function StudentsComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, "Loading students...");
    \u0275\u0275elementEnd();
  }
}
function StudentsComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function StudentsComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275text(1, " No students found. Admit one to get started. ");
    \u0275\u0275elementEnd();
  }
}
function StudentsComponent_table_19_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 50)(1, "td", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 52);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 52);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 52);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 53);
    \u0275\u0275text(12, "View details \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, s_r6.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.className(s_r6.classId), "", s_r6.sectionId ? " - " + ctx_r1.sectionName(s_r6.sectionId) : "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.admissionNumber || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.guardianName || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r6.status || "Active");
  }
}
function StudentsComponent_table_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 46)(1, "thead", 47)(2, "tr")(3, "th", 48);
    \u0275\u0275text(4, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 48);
    \u0275\u0275text(6, "Class");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 48);
    \u0275\u0275text(8, "Admission #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 48);
    \u0275\u0275text(10, "Guardian");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 48);
    \u0275\u0275text(12, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "th", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, StudentsComponent_table_19_tr_15_Template, 13, 9, "tr", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r1.students());
  }
}
var _StudentsComponent = class _StudentsComponent {
  constructor() {
    this.service = inject(StudentsService);
    this.students = signal([], ...ngDevMode ? [{ debugName: "students" }] : []);
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
      dateOfBirth: "",
      gender: "Male",
      classId: DEFAULT_CLASS.id,
      sectionId: DEFAULT_SECTION.id,
      username: "",
      password: "",
      admissionNumber: "",
      email: "",
      parentName: "",
      parentPhone: "",
      pendingFee: 0
    };
  }
  fillSample() {
    const suffix = Date.now().toString(36).slice(-4);
    this.form = {
      fullName: "Aarav Sharma",
      dateOfBirth: "2012-05-14",
      gender: "Male",
      classId: DEFAULT_CLASS.id,
      sectionId: DEFAULT_SECTION.id,
      username: `aarav${suffix}`,
      password: "Student@123",
      admissionNumber: "",
      email: "",
      parentName: "Rohit Sharma",
      parentPhone: "9988776655",
      pendingFee: 0
    };
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set("");
    this.service.list({ keyword: this.keyword }).subscribe({
      next: (page) => {
        this.students.set(page?.items ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load students."));
        this.loading.set(false);
      }
    });
  }
  admit() {
    if (!this.form.fullName || !this.form.dateOfBirth || !this.form.gender || !this.form.classId || !this.form.sectionId) {
      this.formError.set("Full name, date of birth, gender, class and section are required.");
      return;
    }
    if (!this.form.username.trim() || (this.form.password ?? "").length < 8) {
      this.formError.set("A login ID and a password of at least 8 characters are required.");
      return;
    }
    this.saving.set(true);
    this.formError.set("");
    this.service.admitWithAccount(this.form).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.showForm.set(false);
        this.lastCredentials.set(res.credentials);
        this.form = this.blankForm();
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, "Could not admit student."));
      }
    });
  }
  msg(err, fallback) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fallback;
  }
};
_StudentsComponent.\u0275fac = function StudentsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StudentsComponent)();
};
_StudentsComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentsComponent, selectors: [["app-students"]], decls: 20, vars: 8, consts: [[1, "p-6", "space-y-6"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], ["class", "bg-success-50 border border-success-200 rounded-xl p-4 flex items-start justify-between", 4, "ngIf"], [1, "flex", "gap-3"], ["placeholder", "Search by name or admission number...", 1, "flex-1", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary-500", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "bg-white rounded-xl p-6 shadow-sm border border-neutral-200", 4, "ngIf"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "overflow-hidden"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "p-8 text-center text-error-600", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [1, "bg-success-50", "border", "border-success-200", "rounded-xl", "p-4", "flex", "items-start", "justify-between"], [1, "text-sm", "text-success-800"], [1, "font-semibold", "mb-1"], [1, "font-mono", "font-bold"], [1, "text-xs", "mt-1", "text-success-700"], [1, "text-success-700", "hover:text-success-900", "text-sm", 3, "click"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-1"], [1, "text-xs", "text-neutral-500", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["placeholder", "Aarav Sharma", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["value", "Male"], ["value", "Female"], ["value", "Other"], ["placeholder", "auto-generated if blank", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["placeholder", "e.g. aarav2026", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "e.g. Student@123", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Optional", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "placeholder", "0 if none", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "text-xs", "text-neutral-400", "mt-1"], [1, "mt-4", "flex", "items-center", "gap-3"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["type", "button", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "text-error-600 text-sm", 4, "ngIf"], [3, "value"], [1, "text-error-600", "text-sm"], [1, "p-8", "text-center", "text-neutral-500"], [1, "p-8", "text-center", "text-error-600"], [1, "w-full", "text-sm"], [1, "bg-neutral-50", "text-neutral-600", "text-left"], [1, "px-6", "py-3", "font-medium"], ["class", "border-t border-neutral-200 hover:bg-neutral-50 cursor-pointer", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-200", "hover:bg-neutral-50", "cursor-pointer", 3, "routerLink"], [1, "px-6", "py-3", "font-medium", "text-neutral-900"], [1, "px-6", "py-3", "text-neutral-600"], [1, "px-6", "py-3", "text-primary-600", "text-right", "text-xs", "font-medium"]], template: function StudentsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
    \u0275\u0275text(4, "Students");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6, "Search by name or admission number, click a row for full details & analytics.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 4);
    \u0275\u0275listener("click", function StudentsComponent_Template_button_click_7_listener() {
      return ctx.showForm.set(!ctx.showForm());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, StudentsComponent_div_9_Template, 15, 2, "div", 5);
    \u0275\u0275elementStart(10, "div", 6)(11, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function StudentsComponent_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.keyword, $event) || (ctx.keyword = $event);
      return $event;
    });
    \u0275\u0275listener("keyup.enter", function StudentsComponent_Template_input_keyup_enter_11_listener() {
      return ctx.load();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 8);
    \u0275\u0275listener("click", function StudentsComponent_Template_button_click_12_listener() {
      return ctx.load();
    });
    \u0275\u0275text(13, "Search");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, StudentsComponent_div_14_Template, 66, 16, "div", 9);
    \u0275\u0275elementStart(15, "div", 10);
    \u0275\u0275template(16, StudentsComponent_div_16_Template, 2, 0, "div", 11)(17, StudentsComponent_div_17_Template, 2, 1, "div", 12)(18, StudentsComponent_div_18_Template, 2, 0, "div", 11)(19, StudentsComponent_table_19_Template, 16, 1, "table", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx.showForm() ? "Close" : "+ Admit Student", " ");
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
    \u0275\u0275property("ngIf", !ctx.loading() && !ctx.error() && ctx.students().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading() && !ctx.error() && ctx.students().length > 0);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink], encapsulation: 2 });
var StudentsComponent = _StudentsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StudentsComponent, [{
    type: Component,
    args: [{
      selector: "app-students",
      standalone: true,
      imports: [CommonModule, FormsModule, RouterLink],
      template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Students</h1>
          <p class="text-neutral-600 text-sm">Search by name or admission number, click a row for full details &amp; analytics.</p>
        </div>
        <button (click)="showForm.set(!showForm())"
          class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Admit Student' }}
        </button>
      </div>

      <!-- Credentials banner shown after a successful admission -->
      <div *ngIf="lastCredentials()" class="bg-success-50 border border-success-200 rounded-xl p-4 flex items-start justify-between">
        <div class="text-sm text-success-800">
          <p class="font-semibold mb-1">Student admitted \u2014 hand these credentials to them:</p>
          <p>Login ID: <span class="font-mono font-bold">{{ lastCredentials()!.username }}</span>
             &nbsp;\xB7&nbsp; Password: <span class="font-mono font-bold">{{ lastCredentials()!.password }}</span></p>
          <p class="text-xs mt-1 text-success-700">They sign in at this site with these \u2014 no registration needed.</p>
        </div>
        <button (click)="lastCredentials.set(null)" class="text-success-700 hover:text-success-900 text-sm">\u2715</button>
      </div>

      <!-- Search -->
      <div class="flex gap-3">
        <input [(ngModel)]="keyword" (keyup.enter)="load()" placeholder="Search by name or admission number..."
          class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
        <button (click)="load()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
      </div>

      <!-- Admit form -->
      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-1">Admit New Student</h2>
        <p class="text-xs text-neutral-500 mb-4">You set the login ID &amp; password and give them to the student. Fields marked * are required.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Full name *</label>
            <input [(ngModel)]="form.fullName" placeholder="Aarav Sharma" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Date of birth *</label>
            <input [(ngModel)]="form.dateOfBirth" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Gender *</label>
            <select [(ngModel)]="form.gender" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Admission number</label>
            <input [(ngModel)]="form.admissionNumber" placeholder="auto-generated if blank" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Class *</label>
            <select [(ngModel)]="form.classId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Section *</label>
            <select [(ngModel)]="form.sectionId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let s of sections" [value]="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Login ID * (give this to the student)</label>
            <input [(ngModel)]="form.username" placeholder="e.g. aarav2026" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Password * (min 8 characters)</label>
            <input [(ngModel)]="form.password" placeholder="e.g. Student@123" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Parent name</label>
            <input [(ngModel)]="form.parentName" placeholder="Optional" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Parent phone</label>
            <input [(ngModel)]="form.parentPhone" placeholder="Optional" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Pending fee at admission (\u20B9)</label>
            <input [(ngModel)]="form.pendingFee" type="number" min="0" placeholder="0 if none" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <p class="text-xs text-neutral-400 mt-1">Added on top of the class's fee structure. Their upcoming class fees are assessed automatically.</p>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="admit()" [disabled]="saving()"
            class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Admit' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <!-- List -->
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading students...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && students().length === 0" class="p-8 text-center text-neutral-500">
          No students found. Admit one to get started.
        </div>
        <table *ngIf="!loading() && !error() && students().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr>
              <th class="px-6 py-3 font-medium">Name</th>
              <th class="px-6 py-3 font-medium">Class</th>
              <th class="px-6 py-3 font-medium">Admission #</th>
              <th class="px-6 py-3 font-medium">Guardian</th>
              <th class="px-6 py-3 font-medium">Status</th>
              <th class="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of students()" [routerLink]="['/students', s.id]"
                class="border-t border-neutral-200 hover:bg-neutral-50 cursor-pointer">
              <td class="px-6 py-3 font-medium text-neutral-900">{{ s.fullName }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ className(s.classId) }}{{ s.sectionId ? ' - ' + sectionName(s.sectionId) : '' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ s.admissionNumber || '\u2014' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ s.guardianName || '\u2014' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ s.status || 'Active' }}</td>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentsComponent, { className: "StudentsComponent", filePath: "src/app/features/students/pages/students/students.component.ts", lineNumber: 146 });
})();
export {
  StudentsComponent
};
//# sourceMappingURL=chunk-I7YWNUBP.js.map
