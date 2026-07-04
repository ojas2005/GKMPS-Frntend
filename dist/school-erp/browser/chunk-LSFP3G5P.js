import {
  CommunicationService
} from "./chunk-ZXN2BEYE.js";
import {
  AuthService
} from "./chunk-MWX4V2YL.js";
import {
  SCHOOL_CLASSES,
  classNameById
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
  DatePipe,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/communication/pages/communication/communication.component.ts
function CommunicationComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function CommunicationComponent_button_7_Template_button_click_0_listener() {
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
    \u0275\u0275textInterpolate1(" ", ctx_r1.showForm() ? "Close" : "+ New Announcement", " ");
  }
}
function CommunicationComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, " You aren't a class teacher (head teacher) of any class, so you can't send announcements. Ask the school owner to assign you to a class. ");
    \u0275\u0275elementEnd();
  }
}
function CommunicationComponent_div_9_div_3_div_11_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
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
function CommunicationComponent_div_9_div_3_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 22);
    \u0275\u0275text(2, "Limit to one class (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function CommunicationComponent_div_9_div_3_div_11_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.audienceClassId, $event) || (ctx_r1.audienceClassId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 24);
    \u0275\u0275text(5, "All classes");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CommunicationComponent_div_9_div_3_div_11_option_6_Template, 2, 2, "option", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.audienceClassId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.classes);
  }
}
function CommunicationComponent_div_9_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div")(2, "label", 22);
    \u0275\u0275text(3, "Send to");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function CommunicationComponent_div_9_div_3_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.audience, $event) || (ctx_r1.audience = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 24);
    \u0275\u0275text(6, "Everyone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 25);
    \u0275\u0275text(8, "Teachers only");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 26);
    \u0275\u0275text(10, "Students only");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(11, CommunicationComponent_div_9_div_3_div_11_Template, 7, 2, "div", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.audience);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.audience === "Student");
  }
}
function CommunicationComponent_div_9_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, " This will be sent to the students of ");
    \u0275\u0275elementStart(2, "span", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " only. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.myClassName());
  }
}
function CommunicationComponent_div_9_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function CommunicationComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function CommunicationComponent_div_9_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.title, $event) || (ctx_r1.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "textarea", 15);
    \u0275\u0275twoWayListener("ngModelChange", function CommunicationComponent_div_9_Template_textarea_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.body, $event) || (ctx_r1.form.body = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CommunicationComponent_div_9_div_3_Template, 12, 2, "div", 16)(4, CommunicationComponent_div_9_p_4_Template, 5, 1, "p", 17);
    \u0275\u0275elementStart(5, "div", 18)(6, "button", 19);
    \u0275\u0275listener("click", function CommunicationComponent_div_9_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, CommunicationComponent_div_9_span_8_Template, 2, 1, "span", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.title);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.body);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isOwner());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isOwner() && ctx_r1.isClassTeacher());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Publishing..." : "Publish", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.formError());
  }
}
function CommunicationComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function CommunicationComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function CommunicationComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1, "No announcements yet.");
    \u0275\u0275elementEnd();
  }
}
function CommunicationComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 1)(2, "h3", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 37);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 38);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r7.publishedAtUtc ? \u0275\u0275pipeBind2(6, 4, a_r7.publishedAtUtc, "medium") : "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.body);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.audienceLabel(a_r7), " ");
  }
}
var _CommunicationComponent = class _CommunicationComponent {
  constructor() {
    this.service = inject(CommunicationService);
    this.auth = inject(AuthService);
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
    this.formError = signal("", ...ngDevMode ? [{ debugName: "formError" }] : []);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.form = { title: "", body: "" };
    this.audience = "";
    this.audienceClassId = "";
    this.classes = SCHOOL_CLASSES;
    this.className = classNameById;
    this.isOwner = () => this.auth.hasRole("SuperAdmin", "Principal", "Admin");
    this.isClassTeacher = () => this.auth.isClassTeacher();
    this.myClassName = () => this.className(this.auth.classTeacherClassId() ?? void 0);
    this.canCompose = () => this.isOwner() || this.isClassTeacher();
  }
  audienceLabel(a) {
    const role = a.targetRolesCsv ? a.targetRolesCsv : "Everyone";
    const cls = a.targetClassId ? ` \xB7 ${this.className(a.targetClassId)}` : "";
    return `To: ${role}${cls}`;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set("");
    this.service.listAnnouncements({ pageSize: 100 }).subscribe({
      next: (list) => {
        this.rows.set(list ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load announcements."));
        this.loading.set(false);
      }
    });
  }
  save() {
    if (!this.form.title || !this.form.body) {
      this.formError.set("Title and message are required.");
      return;
    }
    this.saving.set(true);
    this.formError.set("");
    this.service.createAnnouncement({
      title: this.form.title,
      body: this.form.body,
      // Ignored server-side for a Teacher caller — their own class is forced instead.
      targetRolesCsv: this.isOwner() ? this.audience || void 0 : void 0,
      targetClassId: this.isOwner() && this.audience === "Student" ? this.audienceClassId || void 0 : void 0
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.showForm.set(false);
        this.form = { title: "", body: "" };
        this.audience = "";
        this.audienceClassId = "";
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, "Could not publish."));
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_CommunicationComponent.\u0275fac = function CommunicationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CommunicationComponent)();
};
_CommunicationComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommunicationComponent, selectors: [["app-communication"]], decls: 15, vars: 7, consts: [[1, "p-6", "space-y-6"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], ["class", "px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium", 3, "click", 4, "ngIf"], ["class", "bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm", 4, "ngIf"], ["class", "bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4", 4, "ngIf"], [1, "space-y-3"], ["class", "p-8 text-center text-neutral-500 bg-white rounded-xl border border-neutral-200", 4, "ngIf"], ["class", "p-8 text-center text-error-600 bg-white rounded-xl border border-neutral-200", 4, "ngIf"], ["class", "bg-white rounded-xl p-5 shadow-sm border border-neutral-200", 4, "ngFor", "ngForOf"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], [1, "bg-warning-50", "border", "border-warning-200", "rounded-xl", "p-4", "text-warning-800", "text-sm"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200", "space-y-4"], ["placeholder", "Title *", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Message *", "rows", "4", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["class", "grid grid-cols-1 md:grid-cols-2 gap-4", 4, "ngIf"], ["class", "text-xs text-neutral-500", 4, "ngIf"], [1, "flex", "items-center", "gap-3"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["class", "text-error-600 text-sm", 4, "ngIf"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], [1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "bg-white", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "Teacher"], ["value", "Student"], [4, "ngIf"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "text-xs", "text-neutral-500"], [1, "font-medium", "text-neutral-700"], [1, "text-error-600", "text-sm"], [1, "p-8", "text-center", "text-neutral-500", "bg-white", "rounded-xl", "border", "border-neutral-200"], [1, "p-8", "text-center", "text-error-600", "bg-white", "rounded-xl", "border", "border-neutral-200"], [1, "bg-white", "rounded-xl", "p-5", "shadow-sm", "border", "border-neutral-200"], [1, "font-semibold", "text-neutral-900"], [1, "text-neutral-600", "text-sm", "mt-2"], [1, "text-xs", "text-neutral-400", "mt-2"]], template: function CommunicationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
    \u0275\u0275text(4, "Communication");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6, "Send announcements to teachers and/or students.");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, CommunicationComponent_button_7_Template, 2, 1, "button", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, CommunicationComponent_div_8_Template, 2, 0, "div", 5)(9, CommunicationComponent_div_9_Template, 9, 7, "div", 6);
    \u0275\u0275elementStart(10, "div", 7);
    \u0275\u0275template(11, CommunicationComponent_div_11_Template, 2, 0, "div", 8)(12, CommunicationComponent_div_12_Template, 2, 1, "div", 9)(13, CommunicationComponent_div_13_Template, 2, 0, "div", 8)(14, CommunicationComponent_div_14_Template, 11, 7, "div", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx.canCompose());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.canCompose());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.showForm());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.error());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loading() && !ctx.error() && ctx.rows().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.rows());
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], encapsulation: 2 });
var CommunicationComponent = _CommunicationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CommunicationComponent, [{
    type: Component,
    args: [{
      selector: "app-communication",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Communication</h1>
          <p class="text-neutral-600 text-sm">Send announcements to teachers and/or students.</p>
        </div>
        <button *ngIf="canCompose()" (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ New Announcement' }}
        </button>
      </div>

      <div *ngIf="!canCompose()" class="bg-warning-50 border border-warning-200 rounded-xl p-4 text-warning-800 text-sm">
        You aren't a class teacher (head teacher) of any class, so you can't send announcements. Ask the school owner to assign you to a class.
      </div>

      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
        <input [(ngModel)]="form.title" placeholder="Title *" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        <textarea [(ngModel)]="form.body" placeholder="Message *" rows="4" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm"></textarea>

        <!-- Owner: audience picker -->
        <div *ngIf="isOwner()" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Send to</label>
            <select [(ngModel)]="audience" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">Everyone</option>
              <option value="Teacher">Teachers only</option>
              <option value="Student">Students only</option>
            </select>
          </div>
          <div *ngIf="audience === 'Student'">
            <label class="block text-xs text-neutral-500 mb-1">Limit to one class (optional)</label>
            <select [(ngModel)]="audienceClassId" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
              <option value="">All classes</option>
              <option *ngFor="let c of classes" [value]="c.id">{{ c.name }}</option>
            </select>
          </div>
        </div>

        <!-- Teacher: forced scope, no picker -->
        <p *ngIf="!isOwner() && isClassTeacher()" class="text-xs text-neutral-500">
          This will be sent to the students of <span class="font-medium text-neutral-700">{{ myClassName() }}</span> only.
        </p>

        <div class="flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Publishing...' : 'Publish' }}
          </button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <div class="space-y-3">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500 bg-white rounded-xl border border-neutral-200">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600 bg-white rounded-xl border border-neutral-200">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500 bg-white rounded-xl border border-neutral-200">No announcements yet.</div>
        <div *ngFor="let a of rows()" class="bg-white rounded-xl p-5 shadow-sm border border-neutral-200">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-neutral-900">{{ a.title }}</h3>
            <span class="text-xs text-neutral-500">{{ a.publishedAtUtc ? (a.publishedAtUtc | date:'medium') : '' }}</span>
          </div>
          <p class="text-neutral-600 text-sm mt-2">{{ a.body }}</p>
          <p class="text-xs text-neutral-400 mt-2">
            {{ audienceLabel(a) }}
          </p>
        </div>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommunicationComponent, { className: "CommunicationComponent", filePath: "src/app/features/communication/pages/communication/communication.component.ts", lineNumber: 89 });
})();
export {
  CommunicationComponent
};
//# sourceMappingURL=chunk-LSFP3G5P.js.map
