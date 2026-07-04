import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-VTNFS7A5.js";
import {
  ApiService
} from "./chunk-35DAK2ZT.js";
import "./chunk-JJL4A5HX.js";
import {
  CommonModule,
  Component,
  Injectable,
  NgForOf,
  NgIf,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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

// src/app/features/transport/transport.service.ts
var _TransportService = class _TransportService {
  constructor() {
    this.api = inject(ApiService);
  }
  listRoutes() {
    return this.api.get("/api/routes");
  }
  createRoute(body) {
    return this.api.post("/api/routes", body);
  }
  createVehicle(body) {
    return this.api.post("/api/vehicles", body);
  }
  mapStudentToRoute(body) {
    return this.api.post("/api/student-route-mappings", body);
  }
};
_TransportService.\u0275fac = function TransportService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TransportService)();
};
_TransportService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TransportService, factory: _TransportService.\u0275fac, providedIn: "root" });
var TransportService = _TransportService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransportService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/transport/pages/transport/transport.component.ts
function TransportComponent_div_9_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function TransportComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11)(2, "div")(3, "label", 12);
    \u0275\u0275text(4, "Route name *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function TransportComponent_div_9_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 12);
    \u0275\u0275text(8, "Monthly fee *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function TransportComponent_div_9_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.monthlyFee, $event) || (ctx_r1.form.monthlyFee = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "label", 12);
    \u0275\u0275text(12, "Start point *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function TransportComponent_div_9_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.startPoint, $event) || (ctx_r1.form.startPoint = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "label", 12);
    \u0275\u0275text(16, "End point *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function TransportComponent_div_9_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.endPoint, $event) || (ctx_r1.form.endPoint = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 17)(19, "button", 18);
    \u0275\u0275listener("click", function TransportComponent_div_9_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 19);
    \u0275\u0275listener("click", function TransportComponent_div_9_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fillSample());
    });
    \u0275\u0275text(22, "Fill sample");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, TransportComponent_div_9_span_23_Template, 2, 1, "span", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.monthlyFee);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.startPoint);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.endPoint);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Add", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.formError());
  }
}
function TransportComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function TransportComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function TransportComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1, "No routes.");
    \u0275\u0275elementEnd();
  }
}
function TransportComponent_table_14_tr_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 28)(1, "td", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", r_r3.startPoint || "\u2014", " \u2192 ", r_r3.endPoint || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r3.monthlyFee != null ? "\u20B9" + r_r3.monthlyFee : "\u2014");
  }
}
function TransportComponent_table_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 24)(1, "thead", 25)(2, "tr")(3, "th", 26);
    \u0275\u0275text(4, "Route");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 26);
    \u0275\u0275text(6, "From \u2192 To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 26);
    \u0275\u0275text(8, "Monthly fee");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275template(10, TransportComponent_table_14_tr_10_Template, 7, 4, "tr", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.rows());
  }
}
var _TransportComponent = class _TransportComponent {
  constructor() {
    this.service = inject(TransportService);
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
    this.formError = signal("", ...ngDevMode ? [{ debugName: "formError" }] : []);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.form = { name: "", startPoint: "", endPoint: "", monthlyFee: 0 };
  }
  fillSample() {
    this.form = { name: "Route 1 \u2014 North", startPoint: "Depot", endPoint: "Sector 15", monthlyFee: 1500 };
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set("");
    this.service.listRoutes().subscribe({
      next: (list) => {
        this.rows.set(list ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load routes."));
        this.loading.set(false);
      }
    });
  }
  save() {
    if (!this.form.name || !this.form.startPoint || !this.form.endPoint) {
      this.formError.set("Name, start and end points are required.");
      return;
    }
    this.saving.set(true);
    this.formError.set("");
    this.service.createRoute(this.form).subscribe({
      next: () => {
        this.saving.set(false);
        this.showForm.set(false);
        this.form = { name: "", startPoint: "", endPoint: "", monthlyFee: 0 };
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, "Could not add route."));
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_TransportComponent.\u0275fac = function TransportComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TransportComponent)();
};
_TransportComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TransportComponent, selectors: [["app-transport"]], decls: 15, vars: 6, consts: [[1, "p-6", "space-y-6"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], ["class", "bg-white rounded-xl p-6 shadow-sm border border-neutral-200", 4, "ngIf"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "overflow-hidden"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "p-8 text-center text-error-600", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["placeholder", "Route 1 \u2014 North", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "1500", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Depot", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Sector 15", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "mt-4", "flex", "items-center", "gap-3"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["type", "button", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "text-error-600 text-sm", 4, "ngIf"], [1, "text-error-600", "text-sm"], [1, "p-8", "text-center", "text-neutral-500"], [1, "p-8", "text-center", "text-error-600"], [1, "w-full", "text-sm"], [1, "bg-neutral-50", "text-neutral-600", "text-left"], [1, "px-6", "py-3", "font-medium"], ["class", "border-t border-neutral-200", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-200"], [1, "px-6", "py-3", "text-neutral-900"], [1, "px-6", "py-3", "text-neutral-600"]], template: function TransportComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
    \u0275\u0275text(4, "Transport");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6, "Routes from Transport.API.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 4);
    \u0275\u0275listener("click", function TransportComponent_Template_button_click_7_listener() {
      return ctx.showForm.set(!ctx.showForm());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, TransportComponent_div_9_Template, 24, 7, "div", 5);
    \u0275\u0275elementStart(10, "div", 6);
    \u0275\u0275template(11, TransportComponent_div_11_Template, 2, 0, "div", 7)(12, TransportComponent_div_12_Template, 2, 1, "div", 8)(13, TransportComponent_div_13_Template, 2, 0, "div", 7)(14, TransportComponent_table_14_Template, 11, 1, "table", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx.showForm() ? "Close" : "+ Add Route", " ");
    \u0275\u0275advance();
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
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
var TransportComponent = _TransportComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransportComponent, [{
    type: Component,
    args: [{
      selector: "app-transport",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Transport</h1>
          <p class="text-neutral-600 text-sm">Routes from Transport.API.</p>
        </div>
        <button (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Add Route' }}
        </button>
      </div>

      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Route name *</label>
            <input [(ngModel)]="form.name" placeholder="Route 1 \u2014 North" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Monthly fee *</label>
            <input [(ngModel)]="form.monthlyFee" type="number" placeholder="1500" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Start point *</label>
            <input [(ngModel)]="form.startPoint" placeholder="Depot" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">End point *</label>
            <input [(ngModel)]="form.endPoint" placeholder="Sector 15" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Add' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No routes.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Route</th><th class="px-6 py-3 font-medium">From \u2192 To</th><th class="px-6 py-3 font-medium">Monthly fee</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of rows()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ r.name }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ r.startPoint || '\u2014' }} \u2192 {{ r.endPoint || '\u2014' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ r.monthlyFee != null ? ('\u20B9' + r.monthlyFee) : '\u2014' }}</td>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TransportComponent, { className: "TransportComponent", filePath: "src/app/features/transport/pages/transport/transport.component.ts", lineNumber: 70 });
})();
export {
  TransportComponent
};
//# sourceMappingURL=chunk-BEKRN7BQ.js.map
