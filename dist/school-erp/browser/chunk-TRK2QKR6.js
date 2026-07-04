import {
  ReportsService
} from "./chunk-OCX3DFFD.js";
import {
  TeachersService
} from "./chunk-2L3XRX7U.js";
import {
  AuthService
} from "./chunk-MWX4V2YL.js";
import {
  FeesService
} from "./chunk-LRGA3DNB.js";
import "./chunk-35DAK2ZT.js";
import {
  RouterLink
} from "./chunk-QXXS42YF.js";
import "./chunk-JJL4A5HX.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/dashboard/pages/dashboard/dashboard.component.ts
function DashboardComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div")(2, "p", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 32);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "a", 33);
    \u0275\u0275text(8, " View fees \u2192 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.feePending() > 0 ? "bg-error-50 border-error-200" : "bg-success-50 border-success-200");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.feePending() > 0 ? "text-error-700" : "text-success-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.feePending() > 0 ? "Amount to pay" : "Fee status", " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.feePending() > 0 ? "text-error-700" : "text-success-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.feePending() > 0 ? "\u20B9" + \u0275\u0275pipeBind2(6, 10, ctx_r0.feePendingShown(), "1.0-0") : "All paid \u2713", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.feePending() > 0 ? "text-error-700 hover:text-error-800" : "text-success-700 hover:text-success-800");
  }
}
function DashboardComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div")(2, "p", 31);
    \u0275\u0275text(3, "Pending salary this month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 32);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "a", 34);
    \u0275\u0275text(8, " View portal \u2192 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.salaryPending() > 0 ? "bg-error-50 border-error-200" : "bg-success-50 border-success-200");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.salaryPending() > 0 ? "text-error-700" : "text-success-700");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.salaryPending() > 0 ? "text-error-700" : "text-success-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.salaryKnown() ? "\u20B9" + \u0275\u0275pipeBind2(6, 9, ctx_r0.salaryPendingShown(), "1.0-0") : "Not set yet", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.salaryPending() > 0 ? "text-error-700 hover:text-error-800" : "text-success-700 hover:text-success-800");
  }
}
function DashboardComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "div", 37)(3, "h3", 38);
    \u0275\u0275text(4, "Total Students");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 39);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 40);
    \u0275\u0275element(7, "path", 41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "p", 42);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 43);
    \u0275\u0275text(12, "from Reporting.API");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 44)(14, "div", 37)(15, "h3", 38);
    \u0275\u0275text(16, "Total Teachers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 45);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 46);
    \u0275\u0275element(19, "path", 47);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(20, "p", 42);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 43);
    \u0275\u0275text(24, "from Staff.API");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 48)(26, "div", 37)(27, "h3", 38);
    \u0275\u0275text(28, "Attendance Rate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(30, "svg", 50);
    \u0275\u0275element(31, "path", 51);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(32, "p", 42);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 43);
    \u0275\u0275text(36, "Up from 92%");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 52)(38, "div", 37)(39, "h3", 38);
    \u0275\u0275text(40, "Fee Collection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(42, "svg", 54);
    \u0275\u0275element(43, "path", 55);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(44, "p", 42);
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "p", 43);
    \u0275\u0275text(48, "last 30 days");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r0.totalStudents() !== null ? \u0275\u0275pipeBind2(10, 4, ctx_r0.studentsShown(), "1.0-0") : "\u2014", " ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" ", ctx_r0.totalTeachers() !== null ? \u0275\u0275pipeBind2(22, 7, ctx_r0.teachersShown(), "1.0-0") : "\u2014", " ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(34, 10, ctx_r0.attendanceShown(), "1.1-1"), "%");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" ", ctx_r0.feeCollected() !== null ? "\u20B9" + \u0275\u0275pipeBind2(46, 13, ctx_r0.feeShown(), "1.0-0") : "\u2014", " ");
  }
}
function DashboardComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 56);
  }
  if (rf & 2) {
    const h_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    \u0275\u0275styleProp("--h", h_r2 + "%")("--d", i_r3 * 0.07 + "s");
  }
}
function DashboardComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "h2", 57);
    \u0275\u0275text(2, "Quick Actions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 58)(4, "button", 59);
    \u0275\u0275text(5, " Mark Attendance ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 60);
    \u0275\u0275text(7, " Create Announcement ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 60);
    \u0275\u0275text(9, " Add Student ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 60);
    \u0275\u0275text(11, " View Reports ");
    \u0275\u0275elementEnd()()();
  }
}
var _DashboardComponent = class _DashboardComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.reports = inject(ReportsService);
    this.teachers = inject(TeachersService);
    this.fees = inject(FeesService);
    this.totalStudents = signal(null, ...ngDevMode ? [{ debugName: "totalStudents" }] : []);
    this.totalTeachers = signal(null, ...ngDevMode ? [{ debugName: "totalTeachers" }] : []);
    this.feeCollected = signal(null, ...ngDevMode ? [{ debugName: "feeCollected" }] : []);
    this.feePending = signal(0, ...ngDevMode ? [{ debugName: "feePending" }] : []);
    this.salaryPending = signal(0, ...ngDevMode ? [{ debugName: "salaryPending" }] : []);
    this.salaryKnown = signal(false, ...ngDevMode ? [{ debugName: "salaryKnown" }] : []);
    this.studentsShown = signal(0, ...ngDevMode ? [{ debugName: "studentsShown" }] : []);
    this.teachersShown = signal(0, ...ngDevMode ? [{ debugName: "teachersShown" }] : []);
    this.feeShown = signal(0, ...ngDevMode ? [{ debugName: "feeShown" }] : []);
    this.attendanceShown = signal(0, ...ngDevMode ? [{ debugName: "attendanceShown" }] : []);
    this.feePendingShown = signal(0, ...ngDevMode ? [{ debugName: "feePendingShown" }] : []);
    this.salaryPendingShown = signal(0, ...ngDevMode ? [{ debugName: "salaryPendingShown" }] : []);
    this.chartBars = [42, 68, 55, 80, 62, 90, 74, 58, 85, 66, 78, 70];
  }
  firstName() {
    return this.auth.currentUser()?.fullName?.split(" ")[0] ?? "there";
  }
  // Management roles that can see school-wide stats & quick actions.
  isStaff() {
    return this.auth.hasRole("SuperAdmin", "Principal", "Admin", "Accountant");
  }
  isStudent() {
    return this.auth.hasRole("Student");
  }
  isTeacherRole() {
    return this.auth.hasRole("Teacher");
  }
  ngOnInit() {
    if (this.isStudent()) {
      const studentId = this.auth.studentId();
      if (studentId) {
        this.fees.myPayments(studentId).subscribe({
          next: (list) => {
            const pending = (list ?? []).reduce((sum, f) => {
              const total = Number(f["totalAmount"] ?? f["amount"] ?? 0);
              const paid = Number(f["paidAmount"] ?? 0);
              const waiver = Number(f["waiverAmount"] ?? 0);
              return sum + Math.max(0, total - paid - waiver);
            }, 0);
            this.feePending.set(pending);
            this.countUp(pending, this.feePendingShown);
          },
          error: () => {
          }
        });
      }
      return;
    }
    if (this.isTeacherRole()) {
      this.teachers.myPendingSalary().subscribe({
        next: (p) => {
          this.salaryPending.set(p.pendingSalary);
          this.salaryKnown.set(p.monthlySalary != null);
          this.countUp(p.pendingSalary ?? 0, this.salaryPendingShown);
        },
        error: () => {
        }
      });
      return;
    }
    if (!this.isStaff())
      return;
    this.countUp(94.5, this.attendanceShown, 1);
    this.reports.enrollment().subscribe({
      next: (r) => {
        const v = r?.totalStudents ?? null;
        this.totalStudents.set(v);
        if (v !== null)
          this.countUp(v, this.studentsShown);
      },
      error: () => {
      }
    });
    this.teachers.list({ pageSize: 1 }).subscribe({
      next: (p) => {
        const v = p?.totalCount ?? null;
        this.totalTeachers.set(v);
        if (v !== null)
          this.countUp(v, this.teachersShown);
      },
      error: () => {
      }
    });
    const from = new Date(Date.now() - 30 * 864e5).toISOString();
    const to = (/* @__PURE__ */ new Date()).toISOString();
    this.fees.collectionTotals(from, to).subscribe({
      next: (t) => {
        const v = t?.total ?? null;
        this.feeCollected.set(v);
        if (v !== null)
          this.countUp(v, this.feeShown);
      },
      error: () => {
      }
    });
  }
  /** Animate a display signal from 0 to `target` with an ease-out curve. */
  countUp(target, out, decimals = 0) {
    if (typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) {
      out.set(target);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    const factor = Math.pow(10, decimals);
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      out.set(Math.round(target * eased * factor) / factor);
      if (t < 1)
        requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
};
_DashboardComponent.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardComponent)();
};
_DashboardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 56, vars: 6, consts: [[1, "p-6", "space-y-6"], [1, "banner", "relative", "overflow-hidden", "rounded-2xl", "p-8", "text-white", "shadow-lg"], [1, "banner-bg", "absolute", "inset-0"], [1, "banner-orb", "banner-orb-1"], [1, "banner-orb", "banner-orb-2"], [1, "banner-orb", "banner-orb-3"], [1, "relative", "z-10"], [1, "text-3xl", "font-bold", "mb-2"], [1, "wave", "inline-block"], [1, "text-primary-100"], ["class", "rounded-xl p-6 shadow-sm border flex items-center justify-between", 3, "class", 4, "ngIf"], ["class", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", 4, "ngIf"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-6"], [1, "lg:col-span-2", "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-6"], [1, "relative", "h-64", "bg-gradient-to-b", "from-neutral-50", "to-neutral-100", "rounded-lg", "overflow-hidden", "flex", "items-end", "justify-around", "px-4"], ["class", "chart-bar", 3, "--h", "--d", 4, "ngFor", "ngForOf"], [1, "absolute", "inset-0", "flex", "items-center", "justify-center", "text-neutral-500", "pointer-events-none"], ["class", "bg-white rounded-xl p-6 shadow-sm border border-neutral-200", 4, "ngIf"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "space-y-4"], [1, "activity-item", "flex", "items-start", "gap-4", "pb-4", "border-b", "border-neutral-200"], [1, "activity-dot", "w-3", "h-3", "rounded-full", "bg-primary-500", "mt-2"], [1, "flex-1"], [1, "text-neutral-900", "font-medium"], [1, "text-neutral-600", "text-sm"], [1, "text-neutral-500", "text-xs"], [1, "activity-dot", "w-3", "h-3", "rounded-full", "bg-success-500", "mt-2"], [1, "activity-item", "flex", "items-start", "gap-4"], [1, "activity-dot", "w-3", "h-3", "rounded-full", "bg-warning-500", "mt-2"], [1, "rounded-xl", "p-6", "shadow-sm", "border", "flex", "items-center", "justify-between"], [1, "text-sm"], [1, "text-3xl", "font-bold"], ["routerLink", "/fees", 1, "text-sm", "font-medium"], ["routerLink", "/my-portal", 1, "text-sm", "font-medium"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-6"], [1, "stat-card", "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200", 2, "--accent-from", "#38bdf8", "--accent-to", "#0284c7"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-neutral-600", "text-sm", "font-medium"], [1, "stat-icon", "w-10", "h-10", "bg-primary-100", "rounded-lg", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-primary-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"], [1, "text-3xl", "font-bold", "text-neutral-900"], [1, "text-xs", "text-neutral-500", "mt-2"], [1, "stat-card", "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200", 2, "--accent-from", "#fbbf24", "--accent-to", "#d97706"], [1, "stat-icon", "w-10", "h-10", "bg-warning-100", "rounded-lg", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-warning-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"], [1, "stat-card", "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200", 2, "--accent-from", "#34d399", "--accent-to", "#059669"], [1, "stat-icon", "w-10", "h-10", "bg-success-100", "rounded-lg", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-success-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "stat-card", "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200", 2, "--accent-from", "#f87171", "--accent-to", "#dc2626"], [1, "stat-icon", "w-10", "h-10", "bg-error-100", "rounded-lg", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-error-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "chart-bar"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-4"], [1, "space-y-3"], [1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-primary-200", "bg-primary-50", "text-primary-700", "hover:bg-primary-100", "font-medium", "text-sm", "transition-colors", "text-left"], [1, "w-full", "px-4", "py-3", "rounded-lg", "border", "border-neutral-200", "bg-white", "text-neutral-700", "hover:bg-neutral-50", "font-medium", "text-sm", "transition-colors", "text-left"]], template: function DashboardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
    \u0275\u0275elementStart(6, "div", 6)(7, "h1", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 8);
    \u0275\u0275text(10, "\u{1F44B}");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 9);
    \u0275\u0275text(12, "Here's your school's performance overview for today.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(13, DashboardComponent_div_13_Template, 9, 13, "div", 10)(14, DashboardComponent_div_14_Template, 9, 12, "div", 10)(15, DashboardComponent_div_15_Template, 49, 16, "div", 11);
    \u0275\u0275elementStart(16, "div", 12)(17, "div", 13)(18, "h2", 14);
    \u0275\u0275text(19, "Attendance Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 15);
    \u0275\u0275template(21, DashboardComponent_div_21_Template, 1, 4, "div", 16);
    \u0275\u0275elementStart(22, "p", 17);
    \u0275\u0275text(23, " Chart will be displayed here ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(24, DashboardComponent_div_24_Template, 12, 0, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 19)(26, "h2", 14);
    \u0275\u0275text(27, "Recent Activities");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 20)(29, "div", 21);
    \u0275\u0275element(30, "div", 22);
    \u0275\u0275elementStart(31, "div", 23)(32, "p", 24);
    \u0275\u0275text(33, "New student admission");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p", 25);
    \u0275\u0275text(35, "Aarav Kumar admitted to class 10-A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p", 26);
    \u0275\u0275text(37, "2 hours ago");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 21);
    \u0275\u0275element(39, "div", 27);
    \u0275\u0275elementStart(40, "div", 23)(41, "p", 24);
    \u0275\u0275text(42, "Exam scheduled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p", 25);
    \u0275\u0275text(44, "Mathematics final exam scheduled for March 15");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "p", 26);
    \u0275\u0275text(46, "5 hours ago");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 28);
    \u0275\u0275element(48, "div", 29);
    \u0275\u0275elementStart(49, "div", 23)(50, "p", 24);
    \u0275\u0275text(51, "Fee reminder sent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "p", 25);
    \u0275\u0275text(53, "Reminder sent to 45 parents for pending fees");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 26);
    \u0275\u0275text(55, "1 day ago");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" Welcome Back, ", ctx.firstName(), "! ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.isStudent());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isTeacherRole());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isStaff());
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx.chartBars);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.isStaff());
  }
}, dependencies: [CommonModule, NgForOf, NgIf, RouterLink, DecimalPipe], styles: ['\n\n.banner-bg[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      #0284c7,\n      #0369a1,\n      #0ea5e9,\n      #075985,\n      #0284c7);\n  background-size: 300% 300%;\n  animation: _ngcontent-%COMP%_banner-drift 14s ease infinite;\n}\n@keyframes _ngcontent-%COMP%_banner-drift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n.banner-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 9999px;\n  background: rgba(255, 255, 255, 0.1);\n  pointer-events: none;\n}\n.banner-orb-1[_ngcontent-%COMP%] {\n  width: 16rem;\n  height: 16rem;\n  top: -7rem;\n  right: -4rem;\n  animation: _ngcontent-%COMP%_orb-drift-1 9s ease-in-out infinite;\n}\n.banner-orb-2[_ngcontent-%COMP%] {\n  width: 9rem;\n  height: 9rem;\n  bottom: -4rem;\n  right: 22%;\n  background: rgba(255, 255, 255, 0.08);\n  animation: _ngcontent-%COMP%_orb-drift-2 12s ease-in-out infinite;\n}\n.banner-orb-3[_ngcontent-%COMP%] {\n  width: 5rem;\n  height: 5rem;\n  top: 15%;\n  right: 38%;\n  background: rgba(255, 255, 255, 0.09);\n  animation: _ngcontent-%COMP%_orb-drift-1 7s ease-in-out infinite reverse;\n}\n@keyframes _ngcontent-%COMP%_orb-drift-1 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(-1.5rem, 1rem) scale(1.12);\n  }\n}\n@keyframes _ngcontent-%COMP%_orb-drift-2 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(1.5rem, -1rem) scale(0.92);\n  }\n}\n.wave[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_wave 2.4s ease-in-out infinite;\n  transform-origin: 70% 70%;\n}\n@keyframes _ngcontent-%COMP%_wave {\n  0%, 60%, 100% {\n    transform: rotate(0deg);\n  }\n  10% {\n    transform: rotate(16deg);\n  }\n  20% {\n    transform: rotate(-8deg);\n  }\n  30% {\n    transform: rotate(14deg);\n  }\n  40% {\n    transform: rotate(-4deg);\n  }\n  50% {\n    transform: rotate(10deg);\n  }\n}\n.stat-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n}\n.stat-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent-from),\n      var(--accent-to));\n  transform: scaleX(0);\n  transform-origin: left;\n  transition: transform 0.45s cubic-bezier(0.22, 0.9, 0.35, 1);\n}\n.stat-card[_ngcontent-%COMP%]:hover::before {\n  transform: scaleX(1);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover   .stat-icon[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_icon-bob 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes _ngcontent-%COMP%_icon-bob {\n  0%, 100% {\n    transform: scale(1) rotate(0deg);\n  }\n  40% {\n    transform: scale(1.18) rotate(-8deg);\n  }\n  70% {\n    transform: scale(1.06) rotate(5deg);\n  }\n}\n.chart-bar[_ngcontent-%COMP%] {\n  width: 5.5%;\n  height: var(--h);\n  border-radius: 6px 6px 0 0;\n  background:\n    linear-gradient(\n      180deg,\n      #38bdf8,\n      #0284c7);\n  opacity: 0.3;\n  transform-origin: bottom;\n  animation: _ngcontent-%COMP%_bar-grow 0.8s cubic-bezier(0.22, 0.9, 0.35, 1) var(--d) backwards, _ngcontent-%COMP%_bar-breathe 4s ease-in-out calc(var(--d) + 0.8s) infinite;\n  transition: opacity 0.25s ease;\n}\n.chart-bar[_ngcontent-%COMP%]:hover {\n  opacity: 0.65;\n}\n@keyframes _ngcontent-%COMP%_bar-grow {\n  from {\n    transform: scaleY(0);\n  }\n  to {\n    transform: scaleY(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_bar-breathe {\n  0%, 100% {\n    transform: scaleY(1);\n  }\n  50% {\n    transform: scaleY(0.9);\n  }\n}\n.activity-item[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_activity-in 0.45s ease backwards;\n  transition: transform 0.25s ease, background 0.25s ease;\n  border-radius: 0.5rem;\n}\n.activity-item[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.15s;\n}\n.activity-item[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.28s;\n}\n.activity-item[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.41s;\n}\n.activity-item[_ngcontent-%COMP%]:hover {\n  transform: translateX(6px);\n}\n@keyframes _ngcontent-%COMP%_activity-in {\n  from {\n    opacity: 0;\n    transform: translateX(-14px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.activity-dot[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_dot-breathe 2.4s ease-in-out infinite;\n}\n.activity-item[_ngcontent-%COMP%]:nth-child(2)   .activity-dot[_ngcontent-%COMP%] {\n  animation-delay: 0.4s;\n}\n.activity-item[_ngcontent-%COMP%]:nth-child(3)   .activity-dot[_ngcontent-%COMP%] {\n  animation-delay: 0.8s;\n}\n@keyframes _ngcontent-%COMP%_dot-breathe {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(1.45);\n    opacity: 0.7;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
var DashboardComponent = _DashboardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [CommonModule, RouterLink], template: `
    <div class="p-6 space-y-6">
      <!-- Welcome Banner -->
      <div class="banner relative overflow-hidden rounded-2xl p-8 text-white shadow-lg">
        <div class="banner-bg absolute inset-0"></div>
        <div class="banner-orb banner-orb-1"></div>
        <div class="banner-orb banner-orb-2"></div>
        <div class="banner-orb banner-orb-3"></div>
        <div class="relative z-10">
          <h1 class="text-3xl font-bold mb-2">
            Welcome Back, {{ firstName() }}! <span class="wave inline-block">\u{1F44B}</span>
          </h1>
          <p class="text-primary-100">Here's your school's performance overview for today.</p>
        </div>
      </div>

      <!-- Student: amount to pay -->
      <div *ngIf="isStudent()" class="rounded-xl p-6 shadow-sm border flex items-center justify-between"
        [class]="feePending() > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
        <div>
          <p class="text-sm" [class]="feePending() > 0 ? 'text-error-700' : 'text-success-700'">
            {{ feePending() > 0 ? 'Amount to pay' : 'Fee status' }}
          </p>
          <p class="text-3xl font-bold" [class]="feePending() > 0 ? 'text-error-700' : 'text-success-700'">
            {{ feePending() > 0 ? '\u20B9' + (feePendingShown() | number : '1.0-0') : 'All paid \u2713' }}
          </p>
        </div>
        <a routerLink="/fees" class="text-sm font-medium" [class]="feePending() > 0 ? 'text-error-700 hover:text-error-800' : 'text-success-700 hover:text-success-800'">
          View fees \u2192
        </a>
      </div>

      <!-- Teacher: pending salary -->
      <div *ngIf="isTeacherRole()" class="rounded-xl p-6 shadow-sm border flex items-center justify-between"
        [class]="salaryPending() > 0 ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'">
        <div>
          <p class="text-sm" [class]="salaryPending() > 0 ? 'text-error-700' : 'text-success-700'">Pending salary this month</p>
          <p class="text-3xl font-bold" [class]="salaryPending() > 0 ? 'text-error-700' : 'text-success-700'">
            {{ salaryKnown() ? '\u20B9' + (salaryPendingShown() | number : '1.0-0') : 'Not set yet' }}
          </p>
        </div>
        <a routerLink="/my-portal" class="text-sm font-medium" [class]="salaryPending() > 0 ? 'text-error-700 hover:text-error-800' : 'text-success-700 hover:text-success-800'">
          View portal \u2192
        </a>
      </div>

      <!-- Stats Grid (management roles only) -->
      <div *ngIf="isStaff()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Student Count -->
        <div class="stat-card bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          style="--accent-from: #38bdf8; --accent-to: #0284c7">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-neutral-600 text-sm font-medium">Total Students</h3>
            <div class="stat-icon w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-neutral-900">
            {{ totalStudents() !== null ? (studentsShown() | number : '1.0-0') : '\u2014' }}
          </p>
          <p class="text-xs text-neutral-500 mt-2">from Reporting.API</p>
        </div>

        <!-- Teacher Count -->
        <div class="stat-card bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          style="--accent-from: #fbbf24; --accent-to: #d97706">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-neutral-600 text-sm font-medium">Total Teachers</h3>
            <div class="stat-icon w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-neutral-900">
            {{ totalTeachers() !== null ? (teachersShown() | number : '1.0-0') : '\u2014' }}
          </p>
          <p class="text-xs text-neutral-500 mt-2">from Staff.API</p>
        </div>

        <!-- Attendance Rate -->
        <div class="stat-card bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          style="--accent-from: #34d399; --accent-to: #059669">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-neutral-600 text-sm font-medium">Attendance Rate</h3>
            <div class="stat-icon w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-neutral-900">{{ attendanceShown() | number : '1.1-1' }}%</p>
          <p class="text-xs text-neutral-500 mt-2">Up from 92%</p>
        </div>

        <!-- Fee Collection -->
        <div class="stat-card bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          style="--accent-from: #f87171; --accent-to: #dc2626">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-neutral-600 text-sm font-medium">Fee Collection</h3>
            <div class="stat-icon w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-neutral-900">
            {{ feeCollected() !== null ? '\u20B9' + (feeShown() | number : '1.0-0') : '\u2014' }}
          </p>
          <p class="text-xs text-neutral-500 mt-2">last 30 days</p>
        </div>
      </div>

      <!-- Charts and Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Chart Placeholder (decorative animated bars) -->
        <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-6">Attendance Trend</h2>
          <div class="relative h-64 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-lg overflow-hidden flex items-end justify-around px-4">
            <div
              *ngFor="let h of chartBars; let i = index"
              class="chart-bar"
              [style.--h]="h + '%'"
              [style.--d]="i * 0.07 + 's'"
            ></div>
            <p class="absolute inset-0 flex items-center justify-center text-neutral-500 pointer-events-none">
              Chart will be displayed here
            </p>
          </div>
        </div>

        <!-- Quick Actions (management roles only) -->
        <div *ngIf="isStaff()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <button class="w-full px-4 py-3 rounded-lg border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium text-sm transition-colors text-left">
              Mark Attendance
            </button>
            <button class="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 font-medium text-sm transition-colors text-left">
              Create Announcement
            </button>
            <button class="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 font-medium text-sm transition-colors text-left">
              Add Student
            </button>
            <button class="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 font-medium text-sm transition-colors text-left">
              View Reports
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-6">Recent Activities</h2>
        <div class="space-y-4">
          <div class="activity-item flex items-start gap-4 pb-4 border-b border-neutral-200">
            <div class="activity-dot w-3 h-3 rounded-full bg-primary-500 mt-2"></div>
            <div class="flex-1">
              <p class="text-neutral-900 font-medium">New student admission</p>
              <p class="text-neutral-600 text-sm">Aarav Kumar admitted to class 10-A</p>
              <p class="text-neutral-500 text-xs">2 hours ago</p>
            </div>
          </div>
          <div class="activity-item flex items-start gap-4 pb-4 border-b border-neutral-200">
            <div class="activity-dot w-3 h-3 rounded-full bg-success-500 mt-2"></div>
            <div class="flex-1">
              <p class="text-neutral-900 font-medium">Exam scheduled</p>
              <p class="text-neutral-600 text-sm">Mathematics final exam scheduled for March 15</p>
              <p class="text-neutral-500 text-xs">5 hours ago</p>
            </div>
          </div>
          <div class="activity-item flex items-start gap-4">
            <div class="activity-dot w-3 h-3 rounded-full bg-warning-500 mt-2"></div>
            <div class="flex-1">
              <p class="text-neutral-900 font-medium">Fee reminder sent</p>
              <p class="text-neutral-600 text-sm">Reminder sent to 45 parents for pending fees</p>
              <p class="text-neutral-500 text-xs">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:scss;15fcc892dcde5d9f80a4912289ab8ff0b344f90a3dd49ff8dc3831ea1feb4021;/Users/ojastiwari/Downloads/GKMPS-Frntend/src/app/features/dashboard/pages/dashboard/dashboard.component.ts */\n.banner-bg {\n  background:\n    linear-gradient(\n      120deg,\n      #0284c7,\n      #0369a1,\n      #0ea5e9,\n      #075985,\n      #0284c7);\n  background-size: 300% 300%;\n  animation: banner-drift 14s ease infinite;\n}\n@keyframes banner-drift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n.banner-orb {\n  position: absolute;\n  border-radius: 9999px;\n  background: rgba(255, 255, 255, 0.1);\n  pointer-events: none;\n}\n.banner-orb-1 {\n  width: 16rem;\n  height: 16rem;\n  top: -7rem;\n  right: -4rem;\n  animation: orb-drift-1 9s ease-in-out infinite;\n}\n.banner-orb-2 {\n  width: 9rem;\n  height: 9rem;\n  bottom: -4rem;\n  right: 22%;\n  background: rgba(255, 255, 255, 0.08);\n  animation: orb-drift-2 12s ease-in-out infinite;\n}\n.banner-orb-3 {\n  width: 5rem;\n  height: 5rem;\n  top: 15%;\n  right: 38%;\n  background: rgba(255, 255, 255, 0.09);\n  animation: orb-drift-1 7s ease-in-out infinite reverse;\n}\n@keyframes orb-drift-1 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(-1.5rem, 1rem) scale(1.12);\n  }\n}\n@keyframes orb-drift-2 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(1.5rem, -1rem) scale(0.92);\n  }\n}\n.wave {\n  animation: wave 2.4s ease-in-out infinite;\n  transform-origin: 70% 70%;\n}\n@keyframes wave {\n  0%, 60%, 100% {\n    transform: rotate(0deg);\n  }\n  10% {\n    transform: rotate(16deg);\n  }\n  20% {\n    transform: rotate(-8deg);\n  }\n  30% {\n    transform: rotate(14deg);\n  }\n  40% {\n    transform: rotate(-4deg);\n  }\n  50% {\n    transform: rotate(10deg);\n  }\n}\n.stat-card {\n  position: relative;\n  overflow: hidden;\n}\n.stat-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent-from),\n      var(--accent-to));\n  transform: scaleX(0);\n  transform-origin: left;\n  transition: transform 0.45s cubic-bezier(0.22, 0.9, 0.35, 1);\n}\n.stat-card:hover::before {\n  transform: scaleX(1);\n}\n.stat-icon {\n  transition: transform 0.3s ease;\n}\n.stat-card:hover .stat-icon {\n  animation: icon-bob 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes icon-bob {\n  0%, 100% {\n    transform: scale(1) rotate(0deg);\n  }\n  40% {\n    transform: scale(1.18) rotate(-8deg);\n  }\n  70% {\n    transform: scale(1.06) rotate(5deg);\n  }\n}\n.chart-bar {\n  width: 5.5%;\n  height: var(--h);\n  border-radius: 6px 6px 0 0;\n  background:\n    linear-gradient(\n      180deg,\n      #38bdf8,\n      #0284c7);\n  opacity: 0.3;\n  transform-origin: bottom;\n  animation: bar-grow 0.8s cubic-bezier(0.22, 0.9, 0.35, 1) var(--d) backwards, bar-breathe 4s ease-in-out calc(var(--d) + 0.8s) infinite;\n  transition: opacity 0.25s ease;\n}\n.chart-bar:hover {\n  opacity: 0.65;\n}\n@keyframes bar-grow {\n  from {\n    transform: scaleY(0);\n  }\n  to {\n    transform: scaleY(1);\n  }\n}\n@keyframes bar-breathe {\n  0%, 100% {\n    transform: scaleY(1);\n  }\n  50% {\n    transform: scaleY(0.9);\n  }\n}\n.activity-item {\n  animation: activity-in 0.45s ease backwards;\n  transition: transform 0.25s ease, background 0.25s ease;\n  border-radius: 0.5rem;\n}\n.activity-item:nth-child(1) {\n  animation-delay: 0.15s;\n}\n.activity-item:nth-child(2) {\n  animation-delay: 0.28s;\n}\n.activity-item:nth-child(3) {\n  animation-delay: 0.41s;\n}\n.activity-item:hover {\n  transform: translateX(6px);\n}\n@keyframes activity-in {\n  from {\n    opacity: 0;\n    transform: translateX(-14px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.activity-dot {\n  animation: dot-breathe 2.4s ease-in-out infinite;\n}\n.activity-item:nth-child(2) .activity-dot {\n  animation-delay: 0.4s;\n}\n.activity-item:nth-child(3) .activity-dot {\n  animation-delay: 0.8s;\n}\n@keyframes dot-breathe {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(1.45);\n    opacity: 0.7;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/pages/dashboard/dashboard.component.ts", lineNumber: 338 });
})();

// src/app/features/dashboard/dashboard.routes.ts
var DASHBOARD_ROUTES = [
  {
    path: "",
    component: DashboardComponent
  }
];
export {
  DASHBOARD_ROUTES
};
//# sourceMappingURL=chunk-TRK2QKR6.js.map
