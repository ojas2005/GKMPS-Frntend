import {
  TeachersService
} from "./chunk-2L3XRX7U.js";
import {
  AuthService
} from "./chunk-MWX4V2YL.js";
import {
  classNameById,
  sectionNameById
} from "./chunk-WTXCDO4J.js";
import {
  FormsModule
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
  ɵɵtextInterpolate2
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/my-portal/pages/my-portal/my-portal.component.ts
function MyPortalComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1, "Loading your profile...");
    \u0275\u0275elementEnd();
  }
}
function MyPortalComponent_div_7_Template(rf, ctx) {
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
function MyPortalComponent_ng_container_8_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Class teacher \xB7 ", ctx_r0.className(s_r3.classTeacherOfClassId), "", s_r3.classTeacherOfSectionId ? " - " + ctx_r0.sectionName(s_r3.classTeacherOfSectionId) : "", " ");
  }
}
function MyPortalComponent_ng_container_8_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "a", 28);
    \u0275\u0275text(2, " \u2192 Mark today's attendance for your class ");
    \u0275\u0275elementEnd()();
  }
}
function MyPortalComponent_ng_container_8_div_10_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275classMap(p_r4.pendingSalary > 0 ? "text-error-600" : "text-success-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u20B9", p_r4.paidThisMonth, " paid of \u20B9", p_r4.monthlySalary, " this month ");
  }
}
function MyPortalComponent_ng_container_8_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "p", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MyPortalComponent_ng_container_8_div_10_p_5_Template, 2, 4, "p", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = ctx.ngIf;
    \u0275\u0275classMap(p_r4.pendingSalary > 0 ? "bg-error-50 border-error-200" : "bg-success-50 border-success-200");
    \u0275\u0275advance();
    \u0275\u0275classMap(p_r4.pendingSalary > 0 ? "text-error-700" : "text-success-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Pending salary \xB7 ", p_r4.periodLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(p_r4.pendingSalary > 0 ? "text-error-700" : "text-success-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r4.monthlySalary == null ? "Not set yet" : "\u20B9" + p_r4.pendingSalary, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r4.monthlySalary != null);
  }
}
function MyPortalComponent_ng_container_8_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.payoutsError());
  }
}
function MyPortalComponent_ng_container_8_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 35);
    \u0275\u0275text(1, "No payouts recorded yet.");
    \u0275\u0275elementEnd();
  }
}
function MyPortalComponent_ng_container_8_table_17_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 40)(1, "td", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 43);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 43);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.periodLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u20B9", p_r5.amount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.method || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 4, p_r5.paidOnUtc, "mediumDate"));
  }
}
function MyPortalComponent_ng_container_8_table_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 36)(1, "thead", 37)(2, "tr")(3, "th", 38);
    \u0275\u0275text(4, "Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 38);
    \u0275\u0275text(6, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 38);
    \u0275\u0275text(8, "Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 38);
    \u0275\u0275text(10, "Paid on");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, MyPortalComponent_ng_container_8_table_17_tr_12_Template, 10, 7, "tr", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r0.payouts());
  }
}
function MyPortalComponent_ng_container_8_p_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.markOk() ? "text-success-600" : "text-error-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.markMsg());
  }
}
function MyPortalComponent_ng_container_8_p_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 35);
    \u0275\u0275text(1, "No attendance records in this window.");
    \u0275\u0275elementEnd();
  }
}
function MyPortalComponent_ng_container_8_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r6 = ctx.$implicit;
    \u0275\u0275classMap(a_r6.status === "Present" ? "bg-success-50 text-success-700" : a_r6.status === "Late" ? "bg-warning-50 text-warning-700" : "bg-error-50 text-error-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", a_r6.date, " \xB7 ", a_r6.status, " ");
  }
}
function MyPortalComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9)(3, "div")(4, "h2", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 11);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, MyPortalComponent_ng_container_8_span_8_Template, 2, 2, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, MyPortalComponent_ng_container_8_div_9_Template, 3, 0, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, MyPortalComponent_ng_container_8_div_10_Template, 6, 9, "div", 14);
    \u0275\u0275elementStart(11, "div", 15)(12, "div", 8)(13, "h2", 16);
    \u0275\u0275text(14, "My payouts");
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, MyPortalComponent_ng_container_8_p_15_Template, 2, 1, "p", 17)(16, MyPortalComponent_ng_container_8_p_16_Template, 2, 0, "p", 18)(17, MyPortalComponent_ng_container_8_table_17_Template, 13, 1, "table", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 8)(19, "div", 20)(20, "h2", 21);
    \u0275\u0275text(21, "My attendance (last 30 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 22);
    \u0275\u0275listener("click", function MyPortalComponent_ng_container_8_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.markToday());
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(24, MyPortalComponent_ng_container_8_p_24_Template, 2, 3, "p", 23)(25, MyPortalComponent_ng_container_8_p_25_Template, 2, 0, "p", 18);
    \u0275\u0275elementStart(26, "div", 24);
    \u0275\u0275template(27, MyPortalComponent_ng_container_8_span_27_Template, 2, 4, "span", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r3.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", s_r3.designation, " \xA0\xB7\xA0 ", s_r3.employeeCode);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", s_r3.classTeacherOfClassId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", s_r3.classTeacherOfClassId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.pending());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r0.payoutsError());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.payoutsError() && ctx_r0.payouts().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.payouts().length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.marking());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.marking() ? "Saving..." : "I'm present today", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.markMsg());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.attendance().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.attendance());
  }
}
var _MyPortalComponent = class _MyPortalComponent {
  constructor() {
    this.service = inject(TeachersService);
    this.auth = inject(AuthService);
    this.me = signal(null, ...ngDevMode ? [{ debugName: "me" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.payouts = signal([], ...ngDevMode ? [{ debugName: "payouts" }] : []);
    this.payoutsError = signal("", ...ngDevMode ? [{ debugName: "payoutsError" }] : []);
    this.attendance = signal([], ...ngDevMode ? [{ debugName: "attendance" }] : []);
    this.marking = signal(false, ...ngDevMode ? [{ debugName: "marking" }] : []);
    this.markMsg = signal("", ...ngDevMode ? [{ debugName: "markMsg" }] : []);
    this.markOk = signal(false, ...ngDevMode ? [{ debugName: "markOk" }] : []);
    this.pending = signal(null, ...ngDevMode ? [{ debugName: "pending" }] : []);
    this.className = classNameById;
    this.sectionName = sectionNameById;
  }
  ngOnInit() {
    this.loading.set(true);
    this.service.me().subscribe({
      next: (s) => {
        this.me.set(s);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.status === 404 ? "Your account has no staff profile yet \u2014 ask the school owner to onboard you on the Teachers page." : this.msg(err, "Failed to load your profile."));
      }
    });
    this.service.myPayouts().subscribe({
      next: (list) => this.payouts.set(list ?? []),
      error: (err) => this.payoutsError.set(this.msg(err, "Failed to load payouts."))
    });
    this.service.myPendingSalary().subscribe({
      next: (p) => this.pending.set(p),
      error: () => {
      }
    });
    this.loadAttendance();
  }
  loadAttendance() {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const days30 = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    this.service.myAttendance(days30, today).subscribe({
      next: (list) => this.attendance.set(list ?? []),
      error: () => {
      }
    });
  }
  markToday() {
    const staffId = this.auth.staffId() ?? this.me()?.id;
    if (!staffId) {
      this.markOk.set(false);
      this.markMsg.set("No staff profile linked to your account.");
      return;
    }
    this.marking.set(true);
    this.markMsg.set("");
    this.service.markStaffAttendance({
      staffId,
      date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      status: "Present"
    }).subscribe({
      next: () => {
        this.marking.set(false);
        this.markOk.set(true);
        this.markMsg.set("Marked present for today.");
        this.loadAttendance();
      },
      error: (err) => {
        this.marking.set(false);
        this.markOk.set(false);
        this.markMsg.set(this.msg(err, "Could not mark."));
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_MyPortalComponent.\u0275fac = function MyPortalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MyPortalComponent)();
};
_MyPortalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyPortalComponent, selectors: [["app-my-portal"]], decls: 9, vars: 3, consts: [[1, "p-6", "space-y-6"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm", 4, "ngIf"], [4, "ngIf"], [1, "p-8", "text-center", "text-neutral-500"], [1, "bg-warning-50", "border", "border-warning-200", "rounded-xl", "p-4", "text-warning-800", "text-sm"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "flex", "items-start", "justify-between"], [1, "text-xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm", "mt-1"], ["class", "px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium", 4, "ngIf"], ["class", "mt-4", 4, "ngIf"], ["class", "rounded-xl p-6 shadow-sm border", 3, "class", 4, "ngIf"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-6"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-4"], ["class", "text-error-600 text-sm", 4, "ngIf"], ["class", "text-neutral-500 text-sm", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-lg", "font-semibold", "text-neutral-900"], [1, "px-4", "py-2", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["class", "text-sm mb-2", 3, "class", 4, "ngIf"], [1, "flex", "flex-wrap", "gap-2"], ["class", "px-2.5 py-1 rounded-lg text-xs font-medium", 3, "class", 4, "ngFor", "ngForOf"], [1, "px-3", "py-1.5", "bg-primary-50", "text-primary-700", "rounded-full", "text-sm", "font-medium"], [1, "mt-4"], ["routerLink", "/attendance", 1, "text-primary-600", "hover:text-primary-700", "text-sm", "font-medium"], [1, "rounded-xl", "p-6", "shadow-sm", "border"], [1, "text-sm"], [1, "text-3xl", "font-bold"], ["class", "text-xs mt-1", 3, "class", 4, "ngIf"], [1, "text-xs", "mt-1"], [1, "text-error-600", "text-sm"], [1, "text-neutral-500", "text-sm"], [1, "w-full", "text-sm"], [1, "text-neutral-500", "text-left", "text-xs"], [1, "py-2"], ["class", "border-t border-neutral-100", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-100"], [1, "py-2", "text-neutral-900"], [1, "py-2", "font-medium", "text-neutral-900"], [1, "py-2", "text-neutral-600"], [1, "text-sm", "mb-2"], [1, "px-2.5", "py-1", "rounded-lg", "text-xs", "font-medium"]], template: function MyPortalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 1);
    \u0275\u0275text(3, "My Portal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 2);
    \u0275\u0275text(5, "Your profile, payouts and attendance.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, MyPortalComponent_div_6_Template, 2, 0, "div", 3)(7, MyPortalComponent_div_7_Template, 2, 1, "div", 4)(8, MyPortalComponent_ng_container_8_Template, 28, 14, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.me());
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, RouterLink, DatePipe], encapsulation: 2 });
var MyPortalComponent = _MyPortalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MyPortalComponent, [{
    type: Component,
    args: [{
      selector: "app-my-portal",
      standalone: true,
      imports: [CommonModule, FormsModule, RouterLink],
      template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">My Portal</h1>
        <p class="text-neutral-600 text-sm">Your profile, payouts and attendance.</p>
      </div>

      <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading your profile...</div>
      <div *ngIf="error()" class="bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm">{{ error() }}</div>

      <ng-container *ngIf="me() as s">
        <!-- Profile -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-xl font-bold text-neutral-900">{{ s.fullName }}</h2>
              <p class="text-neutral-600 text-sm mt-1">{{ s.designation }} &nbsp;\xB7&nbsp; {{ s.employeeCode }}</p>
            </div>
            <span *ngIf="s.classTeacherOfClassId" class="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
              Class teacher \xB7 {{ className(s.classTeacherOfClassId!) }}{{ s.classTeacherOfSectionId ? ' - ' + sectionName(s.classTeacherOfSectionId!) : '' }}
            </span>
          </div>
          <div *ngIf="s.classTeacherOfClassId" class="mt-4">
            <a routerLink="/attendance" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
              \u2192 Mark today's attendance for your class
            </a>
          </div>
        </div>

        <!-- Pending salary -->
        <div *ngIf="pending() as p" class="rounded-xl p-6 shadow-sm border"
          [class]="p.pendingSalary > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
          <p class="text-sm" [class]="p.pendingSalary > 0 ? 'text-error-700' : 'text-success-700'">
            Pending salary \xB7 {{ p.periodLabel }}
          </p>
          <p class="text-3xl font-bold" [class]="p.pendingSalary > 0 ? 'text-error-700' : 'text-success-700'">
            {{ p.monthlySalary == null ? 'Not set yet' : ('\u20B9' + p.pendingSalary) }}
          </p>
          <p *ngIf="p.monthlySalary != null" class="text-xs mt-1" [class]="p.pendingSalary > 0 ? 'text-error-600' : 'text-success-600'">
            \u20B9{{ p.paidThisMonth }} paid of \u20B9{{ p.monthlySalary }} this month
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- My payouts -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">My payouts</h2>
            <p *ngIf="payoutsError()" class="text-error-600 text-sm">{{ payoutsError() }}</p>
            <p *ngIf="!payoutsError() && payouts().length === 0" class="text-neutral-500 text-sm">No payouts recorded yet.</p>
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

          <!-- My attendance -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-neutral-900">My attendance (last 30 days)</h2>
              <button (click)="markToday()" [disabled]="marking()"
                class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
                {{ marking() ? 'Saving...' : "I'm present today" }}
              </button>
            </div>
            <p *ngIf="markMsg()" class="text-sm mb-2" [class]="markOk() ? 'text-success-600' : 'text-error-600'">{{ markMsg() }}</p>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyPortalComponent, { className: "MyPortalComponent", filePath: "src/app/features/my-portal/pages/my-portal/my-portal.component.ts", lineNumber: 106 });
})();
export {
  MyPortalComponent
};
//# sourceMappingURL=chunk-MDZYSOJV.js.map
