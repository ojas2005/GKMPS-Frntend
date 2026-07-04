import {
  AcademicsService
} from "./chunk-5X2BGOXA.js";
import {
  ExaminationService
} from "./chunk-OKWQRUT6.js";
import {
  AuthService
} from "./chunk-MWX4V2YL.js";
import {
  DEFAULT_CLASS,
  SCHOOL_CLASSES
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
  ɵɵelement,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/examination/pages/examination/examination.component.ts
function ExaminationComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function ExaminationComponent_button_7_Template_button_click_0_listener() {
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
    \u0275\u0275textInterpolate1(" ", ctx_r1.showForm() ? "Close" : "+ New Exam", " ");
  }
}
function ExaminationComponent_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.resultsError());
  }
}
function ExaminationComponent_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, " No published results yet \u2014 check back after your school publishes them. ");
    \u0275\u0275elementEnd();
  }
}
function ExaminationComponent_div_8_table_3_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 18)(1, "td", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 20);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 21);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 22)(11, "button", 23);
    \u0275\u0275listener("click", function ExaminationComponent_div_8_table_3_tr_13_Template_button_click_11_listener() {
      const r_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.downloadReportCard(r_r4));
    });
    \u0275\u0275text(12, "Report card");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.examName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 8, r_r4.examDateUtc, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", r_r4.marksObtained, " / ", r_r4.maxMarks);
    \u0275\u0275advance();
    \u0275\u0275classMap(r_r4.marksObtained >= r_r4.passingMarks ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", r_r4.marksObtained >= r_r4.passingMarks ? "Pass" : "Fail", "", r_r4.grade ? " (" + r_r4.grade + ")" : "", " ");
  }
}
function ExaminationComponent_div_8_table_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 14)(1, "thead", 15)(2, "tr")(3, "th", 16);
    \u0275\u0275text(4, "Exam");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 16);
    \u0275\u0275text(6, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 16);
    \u0275\u0275text(8, "Marks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 16);
    \u0275\u0275text(10, "Result");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, ExaminationComponent_div_8_table_3_tr_13_Template, 13, 11, "tr", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.myResults());
  }
}
function ExaminationComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275template(1, ExaminationComponent_div_8_div_1_Template, 2, 1, "div", 9)(2, ExaminationComponent_div_8_div_2_Template, 2, 0, "div", 10)(3, ExaminationComponent_div_8_table_3_Template, 14, 1, "table", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.resultsError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.resultsError() && ctx_r1.myResults().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.myResults().length > 0);
  }
}
function ExaminationComponent_div_9_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275property("value", c_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r6.name);
  }
}
function ExaminationComponent_div_9_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    \u0275\u0275property("value", s_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.name);
  }
}
function ExaminationComponent_div_9_span_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function ExaminationComponent_div_9_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275text(1, "No subjects yet \u2014 add one on the Academics page first (exams need a subject).");
    \u0275\u0275elementEnd();
  }
}
function ExaminationComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "div")(3, "label", 26);
    \u0275\u0275text(4, "Exam name *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function ExaminationComponent_div_9_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 26);
    \u0275\u0275text(8, "Class *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 28);
    \u0275\u0275twoWayListener("ngModelChange", function ExaminationComponent_div_9_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.classId, $event) || (ctx_r1.form.classId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(10, ExaminationComponent_div_9_option_10_Template, 2, 2, "option", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "label", 26);
    \u0275\u0275text(13, "Subject *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "select", 28);
    \u0275\u0275twoWayListener("ngModelChange", function ExaminationComponent_div_9_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.subjectId, $event) || (ctx_r1.form.subjectId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 30);
    \u0275\u0275text(16, "Select subject");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, ExaminationComponent_div_9_option_17_Template, 2, 2, "option", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "label", 26);
    \u0275\u0275text(20, "Exam date *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function ExaminationComponent_div_9_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.examDate, $event) || (ctx_r1.form.examDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "label", 26);
    \u0275\u0275text(24, "Max marks *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function ExaminationComponent_div_9_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.maxMarks, $event) || (ctx_r1.form.maxMarks = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "label", 26);
    \u0275\u0275text(28, "Passing marks *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ExaminationComponent_div_9_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.passingMarks, $event) || (ctx_r1.form.passingMarks = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 34)(31, "button", 35);
    \u0275\u0275listener("click", function ExaminationComponent_div_9_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 36);
    \u0275\u0275listener("click", function ExaminationComponent_div_9_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fillSample());
    });
    \u0275\u0275text(34, "Fill sample");
    \u0275\u0275elementEnd();
    \u0275\u0275template(35, ExaminationComponent_div_9_span_35_Template, 2, 1, "span", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275template(36, ExaminationComponent_div_9_p_36_Template, 2, 0, "p", 38);
    \u0275\u0275elementEnd();
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
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.subjectId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.subjects());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.examDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.maxMarks);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.passingMarks);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Create", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.formError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.subjects().length === 0);
  }
}
function ExaminationComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function ExaminationComponent_div_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function ExaminationComponent_div_10_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "No exams.");
    \u0275\u0275elementEnd();
  }
}
function ExaminationComponent_div_10_table_4_tr_11_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function ExaminationComponent_div_10_table_4_tr_11_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const e_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.publish(e_r9));
    });
    \u0275\u0275text(1, "Publish");
    \u0275\u0275elementEnd();
  }
}
function ExaminationComponent_div_10_table_4_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 18)(1, "td", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 22);
    \u0275\u0275template(8, ExaminationComponent_div_10_table_4_tr_11_button_8_Template, 2, 0, "button", 42);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r9.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r9.maxMarks ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r9.isPublished ? "Published" : "Draft");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !e_r9.isPublished);
  }
}
function ExaminationComponent_div_10_table_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 14)(1, "thead", 15)(2, "tr")(3, "th", 16);
    \u0275\u0275text(4, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 16);
    \u0275\u0275text(6, "Max");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 16);
    \u0275\u0275text(8, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "th", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275template(11, ExaminationComponent_div_10_table_4_tr_11_Template, 9, 4, "tr", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", ctx_r1.rows());
  }
}
function ExaminationComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275template(1, ExaminationComponent_div_10_div_1_Template, 2, 0, "div", 10)(2, ExaminationComponent_div_10_div_2_Template, 2, 1, "div", 9)(3, ExaminationComponent_div_10_div_3_Template, 2, 0, "div", 10)(4, ExaminationComponent_div_10_table_4_Template, 12, 1, "table", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading() && !ctx_r1.error() && ctx_r1.rows().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading() && !ctx_r1.error() && ctx_r1.rows().length > 0);
  }
}
var _ExaminationComponent = class _ExaminationComponent {
  constructor() {
    this.service = inject(ExaminationService);
    this.academics = inject(AcademicsService);
    this.auth = inject(AuthService);
    this.selfService = this.auth.isSelfService();
    this.myResults = signal([], ...ngDevMode ? [{ debugName: "myResults" }] : []);
    this.resultsError = signal("", ...ngDevMode ? [{ debugName: "resultsError" }] : []);
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.subjects = signal([], ...ngDevMode ? [{ debugName: "subjects" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
    this.formError = signal("", ...ngDevMode ? [{ debugName: "formError" }] : []);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.classes = SCHOOL_CLASSES;
    this.form = { name: "", classId: DEFAULT_CLASS.id, subjectId: "", examDate: "", maxMarks: 100, passingMarks: 35 };
  }
  fillSample() {
    this.form = {
      name: "Unit Test 1",
      classId: DEFAULT_CLASS.id,
      subjectId: this.subjects()[0]?.id ?? "",
      examDate: new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10),
      maxMarks: 100,
      passingMarks: 35
    };
  }
  ngOnInit() {
    if (this.selfService) {
      this.loadMyResults();
      return;
    }
    this.load();
    this.academics.listSubjects().subscribe({ next: (s) => this.subjects.set(s ?? []), error: () => {
    } });
  }
  loadMyResults() {
    const id = this.auth.studentId();
    if (!id) {
      this.resultsError.set("Your account is not linked to a student record yet.");
      return;
    }
    this.service.studentResults(id).subscribe({
      next: (list) => this.myResults.set(list ?? []),
      error: (err) => this.resultsError.set(this.msg(err, "Failed to load your results."))
    });
  }
  downloadReportCard(r) {
    const id = this.auth.studentId();
    if (!id)
      return;
    this.service.reportCard(r.examId, id).subscribe({
      next: (link) => {
        if (link?.downloadUrl)
          window.open(link.downloadUrl, "_blank");
      },
      error: (err) => this.resultsError.set(this.msg(err, "Could not generate the report card."))
    });
  }
  load() {
    this.loading.set(true);
    this.error.set("");
    this.service.list().subscribe({
      next: (list) => {
        this.rows.set(list ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load exams."));
        this.loading.set(false);
      }
    });
  }
  save() {
    if (!this.form.name || !this.form.classId || !this.form.subjectId || !this.form.examDate) {
      this.formError.set("Name, class, subject and exam date are required.");
      return;
    }
    this.saving.set(true);
    this.formError.set("");
    this.service.create({
      name: this.form.name,
      classId: this.form.classId,
      subjectId: this.form.subjectId,
      examDateUtc: `${this.form.examDate}T09:00:00Z`,
      maxMarks: this.form.maxMarks,
      passingMarks: this.form.passingMarks
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.showForm.set(false);
        this.form = { name: "", classId: "", subjectId: "", examDate: "", maxMarks: 100, passingMarks: 35 };
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, "Could not create exam."));
      }
    });
  }
  publish(e) {
    this.service.publish(e.id).subscribe({ next: () => this.load(), error: (err) => this.error.set(this.msg(err, "Publish failed.")) });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_ExaminationComponent.\u0275fac = function ExaminationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExaminationComponent)();
};
_ExaminationComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExaminationComponent, selectors: [["app-examination"]], decls: 11, vars: 6, consts: [[1, "p-6", "space-y-6"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], ["class", "px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium", 3, "click", 4, "ngIf"], ["class", "bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden", 4, "ngIf"], ["class", "bg-white rounded-xl p-6 shadow-sm border border-neutral-200", 4, "ngIf"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "overflow-hidden"], ["class", "p-8 text-center text-error-600", 4, "ngIf"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [1, "p-8", "text-center", "text-error-600"], [1, "p-8", "text-center", "text-neutral-500"], [1, "w-full", "text-sm"], [1, "bg-neutral-50", "text-neutral-600", "text-left"], [1, "px-6", "py-3", "font-medium"], ["class", "border-t border-neutral-200", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-200"], [1, "px-6", "py-3", "font-medium", "text-neutral-900"], [1, "px-6", "py-3", "text-neutral-600"], [1, "px-6", "py-3", "text-neutral-900"], [1, "px-6", "py-3", "text-right"], [1, "text-primary-600", "hover:text-primary-700", "text-sm", "font-medium", 3, "click"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["placeholder", "Unit Test 1", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["value", ""], ["type", "date", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "100", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "35", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "mt-4", "flex", "items-center", "gap-3"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["type", "button", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "text-error-600 text-sm", 4, "ngIf"], ["class", "text-xs text-warning-600 mt-2", 4, "ngIf"], [3, "value"], [1, "text-error-600", "text-sm"], [1, "text-xs", "text-warning-600", "mt-2"], ["class", "text-primary-600 hover:text-primary-700 text-sm font-medium", 3, "click", 4, "ngIf"]], template: function ExaminationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, ExaminationComponent_button_7_Template, 2, 1, "button", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, ExaminationComponent_div_8_Template, 4, 3, "div", 5)(9, ExaminationComponent_div_9_Template, 37, 12, "div", 6)(10, ExaminationComponent_div_10_Template, 5, 4, "div", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.selfService ? "My Results" : "Examinations");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.selfService ? "Your published exam results and report cards." : "Exams from Examination.API.");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService && ctx.showForm());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], encapsulation: 2 });
var ExaminationComponent = _ExaminationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExaminationComponent, [{
    type: Component,
    args: [{
      selector: "app-examination",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">{{ selfService ? 'My Results' : 'Examinations' }}</h1>
          <p class="text-neutral-600 text-sm">{{ selfService ? 'Your published exam results and report cards.' : 'Exams from Examination.API.' }}</p>
        </div>
        <button *ngIf="!selfService" (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ New Exam' }}
        </button>
      </div>

      <!-- Student: my results -->
      <div *ngIf="selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="resultsError()" class="p-8 text-center text-error-600">{{ resultsError() }}</div>
        <div *ngIf="!resultsError() && myResults().length === 0" class="p-8 text-center text-neutral-500">
          No published results yet \u2014 check back after your school publishes them.
        </div>
        <table *ngIf="myResults().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr>
              <th class="px-6 py-3 font-medium">Exam</th>
              <th class="px-6 py-3 font-medium">Date</th>
              <th class="px-6 py-3 font-medium">Marks</th>
              <th class="px-6 py-3 font-medium">Result</th>
              <th class="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of myResults()" class="border-t border-neutral-200">
              <td class="px-6 py-3 font-medium text-neutral-900">{{ r.examName }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ r.examDateUtc | date:'mediumDate' }}</td>
              <td class="px-6 py-3 text-neutral-900">{{ r.marksObtained }} / {{ r.maxMarks }}</td>
              <td class="px-6 py-3 font-medium" [class]="r.marksObtained >= r.passingMarks ? 'text-success-600' : 'text-error-600'">
                {{ r.marksObtained >= r.passingMarks ? 'Pass' : 'Fail' }}{{ r.grade ? ' (' + r.grade + ')' : '' }}
              </td>
              <td class="px-6 py-3 text-right">
                <button (click)="downloadReportCard(r)" class="text-primary-600 hover:text-primary-700 text-sm font-medium">Report card</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="!selfService && showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Exam name *</label>
            <input [(ngModel)]="form.name" placeholder="Unit Test 1" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Class *</label>
            <select [(ngModel)]="form.classId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Subject *</label>
            <select [(ngModel)]="form.subjectId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Select subject</option>
              <option *ngFor="let s of subjects()" [value]="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Exam date *</label>
            <input [(ngModel)]="form.examDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Max marks *</label>
            <input [(ngModel)]="form.maxMarks" type="number" placeholder="100" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Passing marks *</label>
            <input [(ngModel)]="form.passingMarks" type="number" placeholder="35" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Create' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
        <p *ngIf="subjects().length === 0" class="text-xs text-warning-600 mt-2">No subjects yet \u2014 add one on the Academics page first (exams need a subject).</p>
      </div>

      <div *ngIf="!selfService" class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No exams.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Name</th><th class="px-6 py-3 font-medium">Max</th><th class="px-6 py-3 font-medium">Status</th><th class="px-6 py-3 font-medium"></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of rows()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ e.name }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ e.maxMarks ?? '\u2014' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ e.isPublished ? 'Published' : 'Draft' }}</td>
              <td class="px-6 py-3 text-right">
                <button *ngIf="!e.isPublished" (click)="publish(e)" class="text-primary-600 hover:text-primary-700 text-sm font-medium">Publish</button>
              </td>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExaminationComponent, { className: "ExaminationComponent", filePath: "src/app/features/examination/pages/examination/examination.component.ts", lineNumber: 122 });
})();
export {
  ExaminationComponent
};
//# sourceMappingURL=chunk-A5P5EK7P.js.map
