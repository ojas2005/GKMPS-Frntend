import {
  AcademicsService
} from "./chunk-5X2BGOXA.js";
import {
  AuthService
} from "./chunk-MWX4V2YL.js";
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4DDQFLM3.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// src/app/features/academics/pages/academics/academics.component.ts
function AcademicsComponent_div_6_option_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    \u0275\u0275property("value", c_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r3.name);
  }
}
function AcademicsComponent_div_6_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    \u0275\u0275property("value", s_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Section ", s_r4.name);
  }
}
function AcademicsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 18);
    \u0275\u0275text(2, "Viewing:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_6_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.viewClassId, $event) || (ctx_r1.viewClassId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AcademicsComponent_div_6_Template_select_change_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reload());
    });
    \u0275\u0275template(4, AcademicsComponent_div_6_option_4_Template, 2, 2, "option", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_6_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.viewSectionId, $event) || (ctx_r1.viewSectionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AcademicsComponent_div_6_Template_select_change_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reload());
    });
    \u0275\u0275template(6, AcademicsComponent_div_6_option_6_Template, 2, 2, "option", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.viewClassId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.classes);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.viewSectionId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.sections);
  }
}
function AcademicsComponent_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " Class: ");
    \u0275\u0275elementStart(2, "span", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.className(ctx_r1.viewClassId), " - ", ctx_r1.sectionName(ctx_r1.viewSectionId));
  }
}
function AcademicsComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.ttError());
  }
}
function AcademicsComponent_table_12_tr_12_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const sl_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2013 ", sl_r5.endTime);
  }
}
function AcademicsComponent_table_12_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 29)(1, "td", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 31);
    \u0275\u0275text(8);
    \u0275\u0275template(9, AcademicsComponent_table_12_tr_12_ng_container_9_Template, 2, 1, "ng-container", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sl_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sl_r5.day);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sl_r5.period);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.subjectName(sl_r5.subjectId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sl_r5.startTime || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", sl_r5.endTime);
  }
}
function AcademicsComponent_table_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 25)(1, "thead", 26)(2, "tr")(3, "th", 27);
    \u0275\u0275text(4, "Day");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 27);
    \u0275\u0275text(6, "Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 27);
    \u0275\u0275text(8, "Subject");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 27);
    \u0275\u0275text(10, "Time");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, AcademicsComponent_table_12_tr_12_Template, 10, 5, "tr", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.slots());
  }
}
function AcademicsComponent_div_13_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r7 = ctx.$implicit;
    \u0275\u0275property("value", d_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r7);
  }
}
function AcademicsComponent_div_13_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r8 = ctx.$implicit;
    \u0275\u0275property("value", s_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r8.name);
  }
}
function AcademicsComponent_div_13_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.ttOk() ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.ttMsg());
  }
}
function AcademicsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "p", 35);
    \u0275\u0275text(2, "Add a period, then Save timetable (replaces the whole timetable for this class/section).");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 36)(4, "select", 37);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_13_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newSlot.day, $event) || (ctx_r1.newSlot.day = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(5, AcademicsComponent_div_13_option_5_Template, 2, 2, "option", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_13_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newSlot.period, $event) || (ctx_r1.newSlot.period = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_13_Template_select_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newSlot.subjectId, $event) || (ctx_r1.newSlot.subjectId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(8, "option", 40);
    \u0275\u0275text(9, "Subject...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AcademicsComponent_div_13_option_10_Template, 2, 2, "option", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_13_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newSlot.startTime, $event) || (ctx_r1.newSlot.startTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_13_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newSlot.endTime, $event) || (ctx_r1.newSlot.endTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 42);
    \u0275\u0275listener("click", function AcademicsComponent_div_13_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addSlot());
    });
    \u0275\u0275text(14, "+ Add");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 43)(16, "button", 44);
    \u0275\u0275listener("click", function AcademicsComponent_div_13_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveTimetable());
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, AcademicsComponent_div_13_span_18_Template, 2, 3, "span", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newSlot.day);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.days);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newSlot.period);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newSlot.subjectId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.subjects());
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newSlot.startTime);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newSlot.endTime);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.ttSaving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.ttSaving() ? "Saving..." : "Save timetable", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ttMsg());
  }
}
function AcademicsComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_18_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.subjectName_, $event) || (ctx_r1.subjectName_ = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 49)(3, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_18_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.subjectCode, $event) || (ctx_r1.subjectCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 51);
    \u0275\u0275listener("click", function AcademicsComponent_div_18_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addSubject());
    });
    \u0275\u0275text(5, "Add");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.subjectName_);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.subjectCode);
  }
}
function AcademicsComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.subjError());
  }
}
function AcademicsComponent_li_21_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", function AcademicsComponent_li_21_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const s_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.editingSyllabus = ctx_r1.editingSyllabus === s_r11.id ? null : s_r11.id;
      return \u0275\u0275resetView(ctx_r1.syllabusDraft = s_r11.syllabusOutline || "");
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingSyllabus === s_r11.id ? "Cancel" : "Edit syllabus", " ");
  }
}
function AcademicsComponent_li_21_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r11.syllabusOutline);
  }
}
function AcademicsComponent_li_21_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 64);
    \u0275\u0275text(1, "No syllabus added yet.");
    \u0275\u0275elementEnd();
  }
}
function AcademicsComponent_li_21_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65)(1, "textarea", 66);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_li_21_div_10_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.syllabusDraft, $event) || (ctx_r1.syllabusDraft = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 67);
    \u0275\u0275listener("click", function AcademicsComponent_li_21_div_10_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r12);
      const s_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveSyllabus(s_r11));
    });
    \u0275\u0275text(3, "Save syllabus");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.syllabusDraft);
  }
}
function AcademicsComponent_li_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 53)(1, "div", 54)(2, "span", 55);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 56)(5, "span", 57);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AcademicsComponent_li_21_button_7_Template, 2, 1, "button", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, AcademicsComponent_li_21_p_8_Template, 2, 1, "p", 59)(9, AcademicsComponent_li_21_p_9_Template, 2, 0, "p", 60)(10, AcademicsComponent_li_21_div_10_Template, 4, 1, "div", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r11.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r11.code || "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", s_r11.syllabusOutline && ctx_r1.editingSyllabus !== s_r11.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !s_r11.syllabusOutline && ctx_r1.editingSyllabus !== s_r11.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingSyllabus === s_r11.id);
  }
}
function AcademicsComponent_li_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 68);
    \u0275\u0275text(1, "No subjects.");
    \u0275\u0275elementEnd();
  }
}
function AcademicsComponent_div_26_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r14 = ctx.$implicit;
    \u0275\u0275property("value", s_r14.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r14.name);
  }
}
function AcademicsComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_26_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.hw.title, $event) || (ctx_r1.hw.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "select", 70);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_26_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.hw.subjectId, $event) || (ctx_r1.hw.subjectId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(3, "option", 40);
    \u0275\u0275text(4, "Select subject *");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AcademicsComponent_div_26_option_5_Template, 2, 2, "option", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function AcademicsComponent_div_26_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.hw.dueDate, $event) || (ctx_r1.hw.dueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 51);
    \u0275\u0275listener("click", function AcademicsComponent_div_26_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addHomework());
    });
    \u0275\u0275text(8, "Assign");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.hw.title);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.hw.subjectId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.subjects());
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.hw.dueDate);
  }
}
function AcademicsComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.hwError());
  }
}
function AcademicsComponent_li_29_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("due ", \u0275\u0275pipeBind2(2, 1, h_r15.dueDateUtc, "mediumDate"));
  }
}
function AcademicsComponent_li_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 72)(1, "span", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AcademicsComponent_li_29_span_3_Template, 3, 4, "span", 74);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r15 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(h_r15.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", h_r15.dueDateUtc);
  }
}
function AcademicsComponent_li_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 68);
    \u0275\u0275text(1, "No homework.");
    \u0275\u0275elementEnd();
  }
}
var _AcademicsComponent = class _AcademicsComponent {
  constructor() {
    this.service = inject(AcademicsService);
    this.auth = inject(AuthService);
    this.selfService = this.auth.isSelfService();
    this.subjects = signal([], ...ngDevMode ? [{ debugName: "subjects" }] : []);
    this.homework = signal([], ...ngDevMode ? [{ debugName: "homework" }] : []);
    this.slots = signal([], ...ngDevMode ? [{ debugName: "slots" }] : []);
    this.subjError = signal("", ...ngDevMode ? [{ debugName: "subjError" }] : []);
    this.hwError = signal("", ...ngDevMode ? [{ debugName: "hwError" }] : []);
    this.ttError = signal("", ...ngDevMode ? [{ debugName: "ttError" }] : []);
    this.ttSaving = signal(false, ...ngDevMode ? [{ debugName: "ttSaving" }] : []);
    this.ttMsg = signal("", ...ngDevMode ? [{ debugName: "ttMsg" }] : []);
    this.ttOk = signal(false, ...ngDevMode ? [{ debugName: "ttOk" }] : []);
    this.classes = SCHOOL_CLASSES;
    this.sections = SCHOOL_SECTIONS;
    this.className = classNameById;
    this.sectionName = sectionNameById;
    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.viewClassId = this.selfService ? this.auth.classId() ?? DEFAULT_CLASS.id : DEFAULT_CLASS.id;
    this.viewSectionId = this.selfService ? this.auth.sectionId() ?? DEFAULT_SECTION.id : DEFAULT_SECTION.id;
    this.subjectName_ = "";
    this.subjectCode = "";
    this.editingSyllabus = null;
    this.syllabusDraft = "";
    this.hw = { title: "", subjectId: "", dueDate: "" };
    this.newSlot = { day: "Monday", period: 1, subjectId: "", startTime: "", endTime: "" };
  }
  ngOnInit() {
    this.reload();
  }
  reload() {
    this.loadSubjects();
    this.loadHomework();
    this.loadTimetable();
  }
  subjectName(id) {
    return this.subjects().find((s) => s.id === id)?.name ?? id;
  }
  loadSubjects() {
    this.service.listSubjects(this.viewClassId).subscribe({
      next: (list) => this.subjects.set(list ?? []),
      error: (err) => this.subjError.set(this.msg(err, "Failed to load subjects."))
    });
  }
  loadHomework() {
    this.service.listHomework(this.viewClassId, this.viewSectionId).subscribe({
      next: (list) => this.homework.set(list ?? []),
      error: (err) => this.hwError.set(this.msg(err, "Failed to load homework."))
    });
  }
  loadTimetable() {
    this.ttError.set("");
    this.slots.set([]);
    this.service.getTimetable(this.viewClassId, this.viewSectionId).subscribe({
      next: (tt) => this.slots.set(tt?.slots ?? []),
      error: (err) => this.ttError.set(err?.status === 404 ? "No timetable set for this class/section yet." : this.msg(err, "Failed to load timetable."))
    });
  }
  addSlot() {
    if (!this.newSlot.subjectId || !this.newSlot.period) {
      this.ttOk.set(false);
      this.ttMsg.set("Pick a subject and period.");
      return;
    }
    this.ttMsg.set("");
    this.slots.set([...this.slots(), __spreadValues({}, this.newSlot)]);
    this.newSlot = { day: this.newSlot.day, period: Number(this.newSlot.period) + 1, subjectId: "", startTime: "", endTime: "" };
  }
  saveTimetable() {
    this.ttSaving.set(true);
    this.ttMsg.set("");
    this.service.saveTimetable({
      classId: this.viewClassId,
      sectionId: this.viewSectionId,
      slots: this.slots().map((s) => __spreadProps(__spreadValues({}, s), { period: Number(s.period), startTime: s.startTime || "00:00", endTime: s.endTime || "00:00" }))
    }).subscribe({
      next: () => {
        this.ttSaving.set(false);
        this.ttOk.set(true);
        this.ttMsg.set("Timetable saved.");
        this.loadTimetable();
      },
      error: (err) => {
        this.ttSaving.set(false);
        this.ttOk.set(false);
        this.ttMsg.set(this.msg(err, "Could not save timetable."));
      }
    });
  }
  addSubject() {
    if (!this.subjectName_ || !this.subjectCode) {
      this.subjError.set("Name and code are required.");
      return;
    }
    this.subjError.set("");
    this.service.createSubject({ name: this.subjectName_, code: this.subjectCode, classId: this.viewClassId }).subscribe({
      next: () => {
        this.subjectName_ = "";
        this.subjectCode = "";
        this.loadSubjects();
      },
      error: (err) => this.subjError.set(this.msg(err, "Could not add subject."))
    });
  }
  saveSyllabus(s) {
    this.service.updateSyllabus(s.id, this.syllabusDraft || null).subscribe({
      next: () => {
        this.editingSyllabus = null;
        this.loadSubjects();
      },
      error: (err) => this.subjError.set(this.msg(err, "Could not save syllabus."))
    });
  }
  addHomework() {
    if (!this.hw.title || !this.hw.subjectId || !this.hw.dueDate) {
      this.hwError.set("Title, subject and due date are required.");
      return;
    }
    this.hwError.set("");
    this.service.createHomework({
      title: this.hw.title,
      subjectId: this.hw.subjectId,
      classId: this.viewClassId,
      sectionId: this.viewSectionId,
      dueDateUtc: `${this.hw.dueDate}T00:00:00Z`
    }).subscribe({
      next: () => {
        this.hw = { title: "", subjectId: "", dueDate: "" };
        this.loadHomework();
      },
      error: (err) => this.hwError.set(this.msg(err, "Could not assign homework."))
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_AcademicsComponent.\u0275fac = function AcademicsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AcademicsComponent)();
};
_AcademicsComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AcademicsComponent, selectors: [["app-academics"]], decls: 31, vars: 14, consts: [[1, "p-6", "space-y-6"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], ["class", "bg-white rounded-xl p-4 shadow-sm border border-neutral-200 flex flex-wrap gap-3 items-center", 4, "ngIf"], ["class", "text-sm text-neutral-600 -mt-3", 4, "ngIf"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "p-6"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-4"], ["class", "text-neutral-500 text-sm mb-2", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], ["class", "mt-4 border-t border-neutral-100 pt-4", 4, "ngIf"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-6"], ["class", "space-y-2 mb-4", 4, "ngIf"], ["class", "text-error-600 text-sm mb-2", 4, "ngIf"], [1, "divide-y", "divide-neutral-200"], ["class", "py-3", 4, "ngFor", "ngForOf"], ["class", "py-2.5 text-neutral-500 text-sm", 4, "ngIf"], ["class", "py-2.5 text-sm", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-xl", "p-4", "shadow-sm", "border", "border-neutral-200", "flex", "flex-wrap", "gap-3", "items-center"], [1, "text-sm", "text-neutral-600"], [1, "px-4", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "text-sm", "text-neutral-600", "-mt-3"], [1, "font-medium"], [1, "text-neutral-500", "text-sm", "mb-2"], [1, "w-full", "text-sm"], [1, "text-neutral-500", "text-left", "text-xs"], [1, "py-2"], ["class", "border-t border-neutral-100", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-100"], [1, "py-2", "text-neutral-900"], [1, "py-2", "text-neutral-600"], [1, "py-2", "text-neutral-900", "font-medium"], [4, "ngIf"], [1, "mt-4", "border-t", "border-neutral-100", "pt-4"], [1, "text-xs", "text-neutral-500", "mb-2"], [1, "grid", "grid-cols-2", "md:grid-cols-6", "gap-2"], [1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "placeholder", "Period", 1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", "col-span-2", "md:col-span-1", 3, "ngModelChange", "ngModel"], ["value", ""], ["type", "time", 1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], [1, "mt-3", "flex", "items-center", "gap-3"], [1, "px-4", "py-2", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["class", "text-sm", 3, "class", 4, "ngIf"], [1, "text-sm"], [1, "space-y-2", "mb-4"], ["placeholder", "Subject name (e.g. Mathematics)", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-2"], ["placeholder", "Code (e.g. MATH10)", 1, "w-40", "px-3", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", 3, "click"], [1, "text-error-600", "text-sm", "mb-2"], [1, "py-3"], [1, "flex", "justify-between", "text-sm"], [1, "text-neutral-900", "font-medium"], [1, "flex", "items-center", "gap-3"], [1, "text-neutral-500"], ["class", "text-primary-600 hover:text-primary-700 text-xs font-medium", 3, "click", 4, "ngIf"], ["class", "text-xs text-neutral-600 mt-1 whitespace-pre-line", 4, "ngIf"], ["class", "text-xs text-neutral-400 mt-1", 4, "ngIf"], ["class", "mt-2 space-y-2", 4, "ngIf"], [1, "text-primary-600", "hover:text-primary-700", "text-xs", "font-medium", 3, "click"], [1, "text-xs", "text-neutral-600", "mt-1", "whitespace-pre-line"], [1, "text-xs", "text-neutral-400", "mt-1"], [1, "mt-2", "space-y-2"], ["rows", "4", "placeholder", "Chapters / topics / marking scheme...", 1, "w-full", "px-3", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "px-3", "py-1.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-xs", "font-medium", 3, "click"], [1, "py-2.5", "text-neutral-500", "text-sm"], ["placeholder", "Title", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "py-2.5", "text-sm"], [1, "text-neutral-900"], ["class", "text-neutral-500 text-xs ml-2", 4, "ngIf"], [1, "text-neutral-500", "text-xs", "ml-2"]], template: function AcademicsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 1);
    \u0275\u0275text(3, "Academics");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 2);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, AcademicsComponent_div_6_Template, 7, 4, "div", 3)(7, AcademicsComponent_p_7_Template, 4, 2, "p", 4);
    \u0275\u0275elementStart(8, "div", 5)(9, "h2", 6);
    \u0275\u0275text(10, "Timetable");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AcademicsComponent_p_11_Template, 2, 1, "p", 7)(12, AcademicsComponent_table_12_Template, 13, 1, "table", 8)(13, AcademicsComponent_div_13_Template, 19, 10, "div", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 10)(15, "div", 5)(16, "h2", 6);
    \u0275\u0275text(17, "Subjects & syllabus");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, AcademicsComponent_div_18_Template, 6, 2, "div", 11)(19, AcademicsComponent_div_19_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(20, "ul", 13);
    \u0275\u0275template(21, AcademicsComponent_li_21_Template, 11, 6, "li", 14)(22, AcademicsComponent_li_22_Template, 2, 0, "li", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 5)(24, "h2", 6);
    \u0275\u0275text(25, "Homework");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, AcademicsComponent_div_26_Template, 9, 4, "div", 11)(27, AcademicsComponent_div_27_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(28, "ul", 13);
    \u0275\u0275template(29, AcademicsComponent_li_29_Template, 4, 2, "li", 16)(30, AcademicsComponent_li_30_Template, 2, 0, "li", 15);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.selfService ? "Your subjects, syllabus, timetable and homework." : "Subjects, syllabus, timetable & homework from Academic.API.");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.selfService);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.ttError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.slots().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.subjError());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.subjects());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.subjects().length === 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx.selfService);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.hwError());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.homework());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.homework().length === 0);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, DatePipe], encapsulation: 2 });
var AcademicsComponent = _AcademicsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AcademicsComponent, [{
    type: Component,
    args: [{
      selector: "app-academics",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Academics</h1>
        <p class="text-neutral-600 text-sm">{{ selfService ? 'Your subjects, syllabus, timetable and homework.' : 'Subjects, syllabus, timetable & homework from Academic.API.' }}</p>
      </div>

      <!-- Class picker (staff only; students are locked to their own class) -->
      <div *ngIf="!selfService" class="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 flex flex-wrap gap-3 items-center">
        <span class="text-sm text-neutral-600">Viewing:</span>
        <select [(ngModel)]="viewClassId" (change)="reload()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
        </select>
        <select [(ngModel)]="viewSectionId" (change)="reload()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option *ngFor="let s of sections" [value]="s.id">Section {{ s.name }}</option>
        </select>
      </div>
      <p *ngIf="selfService" class="text-sm text-neutral-600 -mt-3">
        Class: <span class="font-medium">{{ className(viewClassId) }} - {{ sectionName(viewSectionId) }}</span>
      </p>

      <!-- Timetable -->
      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Timetable</h2>
        <p *ngIf="ttError()" class="text-neutral-500 text-sm mb-2">{{ ttError() }}</p>
        <table *ngIf="slots().length > 0" class="w-full text-sm">
          <thead class="text-neutral-500 text-left text-xs">
            <tr><th class="py-2">Day</th><th class="py-2">Period</th><th class="py-2">Subject</th><th class="py-2">Time</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let sl of slots()" class="border-t border-neutral-100">
              <td class="py-2 text-neutral-900">{{ sl.day }}</td>
              <td class="py-2 text-neutral-600">{{ sl.period }}</td>
              <td class="py-2 text-neutral-900 font-medium">{{ subjectName(sl.subjectId) }}</td>
              <td class="py-2 text-neutral-600">{{ sl.startTime || '\u2014' }}<ng-container *ngIf="sl.endTime"> \u2013 {{ sl.endTime }}</ng-container></td>
            </tr>
          </tbody>
        </table>

        <!-- Staff: add a slot -->
        <div *ngIf="!selfService" class="mt-4 border-t border-neutral-100 pt-4">
          <p class="text-xs text-neutral-500 mb-2">Add a period, then Save timetable (replaces the whole timetable for this class/section).</p>
          <div class="grid grid-cols-2 md:grid-cols-6 gap-2">
            <select [(ngModel)]="newSlot.day" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
              <option *ngFor="let d of days" [value]="d">{{ d }}</option>
            </select>
            <input [(ngModel)]="newSlot.period" type="number" min="1" placeholder="Period" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            <select [(ngModel)]="newSlot.subjectId" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white col-span-2 md:col-span-1">
              <option value="">Subject...</option>
              <option *ngFor="let s of subjects()" [value]="s.id">{{ s.name }}</option>
            </select>
            <input [(ngModel)]="newSlot.startTime" type="time" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            <input [(ngModel)]="newSlot.endTime" type="time" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
            <button (click)="addSlot()" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">+ Add</button>
          </div>
          <div class="mt-3 flex items-center gap-3">
            <button (click)="saveTimetable()" [disabled]="ttSaving()"
              class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
              {{ ttSaving() ? 'Saving...' : 'Save timetable' }}
            </button>
            <span *ngIf="ttMsg()" class="text-sm" [class]="ttOk() ? 'text-success-600' : 'text-error-600'">{{ ttMsg() }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Subjects & syllabus -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Subjects &amp; syllabus</h2>
          <div *ngIf="!selfService" class="space-y-2 mb-4">
            <input [(ngModel)]="subjectName_" placeholder="Subject name (e.g. Mathematics)" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <div class="flex gap-2">
              <input [(ngModel)]="subjectCode" placeholder="Code (e.g. MATH10)" class="w-40 px-3 py-2.5 border border-neutral-300 rounded-lg text-sm">
              <button (click)="addSubject()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm">Add</button>
            </div>
          </div>
          <div *ngIf="subjError()" class="text-error-600 text-sm mb-2">{{ subjError() }}</div>
          <ul class="divide-y divide-neutral-200">
            <li *ngFor="let s of subjects()" class="py-3">
              <div class="flex justify-between text-sm">
                <span class="text-neutral-900 font-medium">{{ s.name }}</span>
                <span class="flex items-center gap-3">
                  <span class="text-neutral-500">{{ s.code || '' }}</span>
                  <button *ngIf="!selfService" (click)="editingSyllabus = editingSyllabus === s.id ? null : s.id; syllabusDraft = s.syllabusOutline || ''"
                    class="text-primary-600 hover:text-primary-700 text-xs font-medium">
                    {{ editingSyllabus === s.id ? 'Cancel' : 'Edit syllabus' }}
                  </button>
                </span>
              </div>
              <p *ngIf="s.syllabusOutline && editingSyllabus !== s.id" class="text-xs text-neutral-600 mt-1 whitespace-pre-line">{{ s.syllabusOutline }}</p>
              <p *ngIf="!s.syllabusOutline && editingSyllabus !== s.id" class="text-xs text-neutral-400 mt-1">No syllabus added yet.</p>
              <div *ngIf="editingSyllabus === s.id" class="mt-2 space-y-2">
                <textarea [(ngModel)]="syllabusDraft" rows="4" placeholder="Chapters / topics / marking scheme..."
                  class="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"></textarea>
                <button (click)="saveSyllabus(s)" class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-medium">Save syllabus</button>
              </div>
            </li>
            <li *ngIf="subjects().length === 0" class="py-2.5 text-neutral-500 text-sm">No subjects.</li>
          </ul>
        </div>

        <!-- Homework -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Homework</h2>
          <div *ngIf="!selfService" class="space-y-2 mb-4">
            <input [(ngModel)]="hw.title" placeholder="Title" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <select [(ngModel)]="hw.subjectId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Select subject *</option>
              <option *ngFor="let s of subjects()" [value]="s.id">{{ s.name }}</option>
            </select>
            <input [(ngModel)]="hw.dueDate" type="date" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <button (click)="addHomework()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm">Assign</button>
          </div>
          <div *ngIf="hwError()" class="text-error-600 text-sm mb-2">{{ hwError() }}</div>
          <ul class="divide-y divide-neutral-200">
            <li *ngFor="let h of homework()" class="py-2.5 text-sm">
              <span class="text-neutral-900">{{ h.title }}</span>
              <span *ngIf="h.dueDateUtc" class="text-neutral-500 text-xs ml-2">due {{ h.dueDateUtc | date:'mediumDate' }}</span>
            </li>
            <li *ngIf="homework().length === 0" class="py-2.5 text-neutral-500 text-sm">No homework.</li>
          </ul>
        </div>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AcademicsComponent, { className: "AcademicsComponent", filePath: "src/app/features/academics/pages/academics/academics.component.ts", lineNumber: 138 });
})();
export {
  AcademicsComponent
};
//# sourceMappingURL=chunk-Q5XR3KBR.js.map
