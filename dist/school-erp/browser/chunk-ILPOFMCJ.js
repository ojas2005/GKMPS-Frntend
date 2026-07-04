import {
  ReportsService
} from "./chunk-OCX3DFFD.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
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
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/reports/pages/reports/reports.component.ts
function ReportsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function ReportsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function ReportsComponent_div_14_table_5_tr_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 24)(1, "td", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.className || c_r2.classId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r2.count);
  }
}
function ReportsComponent_div_14_table_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 20)(1, "thead", 21)(2, "tr")(3, "th", 22);
    \u0275\u0275text(4, "Class");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 22);
    \u0275\u0275text(6, "Count");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "tbody");
    \u0275\u0275template(8, ReportsComponent_div_14_table_5_tr_8_Template, 5, 2, "tr", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r3 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", e_r3.byClass);
  }
}
function ReportsComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "p", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "students");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, ReportsComponent_div_14_table_5_Template, 9, 1, "table", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r3 = ctx.ngIf;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", e_r3.totalStudents ?? 0, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", e_r3.byClass == null ? null : e_r3.byClass.length);
  }
}
var _ReportsComponent = class _ReportsComponent {
  constructor() {
    this.service = inject(ReportsService);
    this.enrollment = signal(null, ...ngDevMode ? [{ debugName: "enrollment" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.feeTotal = signal(null, ...ngDevMode ? [{ debugName: "feeTotal" }] : []);
    this.fromDate = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    this.toDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  }
  ngOnInit() {
    this.loadEnrollment();
  }
  loadEnrollment() {
    this.loading.set(true);
    this.error.set("");
    this.service.enrollment().subscribe({
      next: (r) => {
        this.enrollment.set(r ?? null);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load enrollment."));
        this.loading.set(false);
      }
    });
  }
  loadFees() {
    this.service.feeCollection(this.fromDate + "T00:00:00Z", this.toDate + "T23:59:59Z").subscribe({
      next: (r) => this.feeTotal.set(r?.total ?? 0),
      error: () => this.feeTotal.set(null)
    });
  }
  downloadPdf() {
    this.service.enrollmentPdf().subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "enrollment-report.pdf";
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => this.error.set(this.msg(err, "PDF download failed."))
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_ReportsComponent.\u0275fac = function ReportsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReportsComponent)();
};
_ReportsComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsComponent, selectors: [["app-reports"]], decls: 25, vars: 6, consts: [[1, "p-6", "space-y-6"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-lg", "font-semibold", "text-neutral-900"], [1, "px-4", "py-2", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "text-neutral-500 text-sm", 4, "ngIf"], ["class", "text-error-600 text-sm", 4, "ngIf"], ["class", "space-y-3", 4, "ngIf"], [1, "text-lg", "font-semibold", "text-neutral-900", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-4", "items-center"], ["type", "date", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], [1, "text-neutral-500", "text-sm"], [1, "text-error-600", "text-sm"], [1, "space-y-3"], [1, "text-3xl", "font-bold", "text-neutral-900"], [1, "text-sm", "font-normal", "text-neutral-500"], ["class", "w-full text-sm", 4, "ngIf"], [1, "w-full", "text-sm"], [1, "text-neutral-600", "text-left"], [1, "py-2", "font-medium"], ["class", "border-t border-neutral-200", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-200"], [1, "py-2", "text-neutral-900"], [1, "py-2", "text-neutral-600"]], template: function ReportsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 1);
    \u0275\u0275text(3, "Reports");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 2);
    \u0275\u0275text(5, "Enrollment & fee-collection reports from Reporting.API.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 3)(7, "div", 4)(8, "h2", 5);
    \u0275\u0275text(9, "Enrollment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 6);
    \u0275\u0275listener("click", function ReportsComponent_Template_button_click_10_listener() {
      return ctx.downloadPdf();
    });
    \u0275\u0275text(11, "Download PDF");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, ReportsComponent_div_12_Template, 2, 0, "div", 7)(13, ReportsComponent_div_13_Template, 2, 1, "div", 8)(14, ReportsComponent_div_14_Template, 6, 2, "div", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 3)(16, "h2", 10);
    \u0275\u0275text(17, "Fee collection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 11)(19, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function ReportsComponent_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.fromDate, $event) || (ctx.fromDate = $event);
      return $event;
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function ReportsComponent_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.toDate, $event) || (ctx.toDate = $event);
      return $event;
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 13);
    \u0275\u0275listener("click", function ReportsComponent_Template_button_click_21_listener() {
      return ctx.loadFees();
    });
    \u0275\u0275text(22, "Run");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 1);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(12);
    \u0275\u0275property("ngIf", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.enrollment());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx.fromDate);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.toDate);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.feeTotal() !== null ? "\u20B9" + ctx.feeTotal() : "\u2014");
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
var ReportsComponent = _ReportsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportsComponent, [{
    type: Component,
    args: [{
      selector: "app-reports",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Reports</h1>
        <p class="text-neutral-600 text-sm">Enrollment &amp; fee-collection reports from Reporting.API.</p>
      </div>

      <!-- Enrollment -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-neutral-900">Enrollment</h2>
          <button (click)="downloadPdf()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Download PDF</button>
        </div>
        <div *ngIf="loading()" class="text-neutral-500 text-sm">Loading...</div>
        <div *ngIf="error()" class="text-error-600 text-sm">{{ error() }}</div>
        <div *ngIf="enrollment() as e" class="space-y-3">
          <p class="text-3xl font-bold text-neutral-900">{{ e.totalStudents ?? 0 }} <span class="text-sm font-normal text-neutral-500">students</span></p>
          <table *ngIf="e.byClass?.length" class="w-full text-sm">
            <thead class="text-neutral-600 text-left"><tr><th class="py-2 font-medium">Class</th><th class="py-2 font-medium">Count</th></tr></thead>
            <tbody>
              <tr *ngFor="let c of e.byClass" class="border-t border-neutral-200">
                <td class="py-2 text-neutral-900">{{ c.className || c.classId }}</td>
                <td class="py-2 text-neutral-600">{{ c.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Fee collection -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Fee collection</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <input [(ngModel)]="fromDate" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <input [(ngModel)]="toDate" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <button (click)="loadFees()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Run</button>
          <div class="text-2xl font-bold text-neutral-900">{{ feeTotal() !== null ? ('\u20B9' + feeTotal()) : '\u2014' }}</div>
        </div>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsComponent, { className: "ReportsComponent", filePath: "src/app/features/reports/pages/reports/reports.component.ts", lineNumber: 52 });
})();
export {
  ReportsComponent
};
//# sourceMappingURL=chunk-ILPOFMCJ.js.map
