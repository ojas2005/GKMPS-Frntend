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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4DDQFLM3.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// src/app/features/library/library.service.ts
var _LibraryService = class _LibraryService {
  constructor() {
    this.api = inject(ApiService);
  }
  listBooks(query = {}) {
    return this.api.get("/api/books", __spreadValues({ page: 1, pageSize: 20 }, query));
  }
  createBook(body) {
    return this.api.post("/api/books", body);
  }
  issueBook(body) {
    return this.api.post("/api/book-issues", body);
  }
  returnBook(body) {
    return this.api.post("/api/book-issues/return", body);
  }
};
_LibraryService.\u0275fac = function LibraryService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LibraryService)();
};
_LibraryService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LibraryService, factory: _LibraryService.\u0275fac, providedIn: "root" });
var LibraryService = _LibraryService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LibraryService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/library/pages/library/library.component.ts
function LibraryComponent_div_13_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function LibraryComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "p", 14);
    \u0275\u0275text(2, "All fields required by the backend.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 15)(4, "div")(5, "label", 16);
    \u0275\u0275text(6, "ISBN *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function LibraryComponent_div_13_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.isbn, $event) || (ctx_r1.form.isbn = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "label", 16);
    \u0275\u0275text(10, "Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function LibraryComponent_div_13_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.title, $event) || (ctx_r1.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 16);
    \u0275\u0275text(14, "Author *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function LibraryComponent_div_13_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.author, $event) || (ctx_r1.form.author = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "label", 16);
    \u0275\u0275text(18, "Category *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function LibraryComponent_div_13_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.category, $event) || (ctx_r1.form.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div")(21, "label", 16);
    \u0275\u0275text(22, "Total copies *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function LibraryComponent_div_13_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.totalCopies, $event) || (ctx_r1.form.totalCopies = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 22)(25, "button", 23);
    \u0275\u0275listener("click", function LibraryComponent_div_13_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 24);
    \u0275\u0275listener("click", function LibraryComponent_div_13_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fillSample());
    });
    \u0275\u0275text(28, "Fill sample");
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, LibraryComponent_div_13_span_29_Template, 2, 1, "span", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.isbn);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.author);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.category);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.totalCopies);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Add", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.formError());
  }
}
function LibraryComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function LibraryComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function LibraryComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1, "No books.");
    \u0275\u0275elementEnd();
  }
}
function LibraryComponent_table_18_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 33)(1, "td", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 35);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 35);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r3.author || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r3.category || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r3.availableCopies ?? "\u2014");
  }
}
function LibraryComponent_table_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 29)(1, "thead", 30)(2, "tr")(3, "th", 31);
    \u0275\u0275text(4, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 31);
    \u0275\u0275text(6, "Author");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 31);
    \u0275\u0275text(8, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 31);
    \u0275\u0275text(10, "Available");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275template(12, LibraryComponent_table_18_tr_12_Template, 9, 4, "tr", 32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r1.rows());
  }
}
var _LibraryComponent = class _LibraryComponent {
  constructor() {
    this.service = inject(LibraryService);
    this.rows = signal([], ...ngDevMode ? [{ debugName: "rows" }] : []);
    this.loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
    this.error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
    this.saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
    this.formError = signal("", ...ngDevMode ? [{ debugName: "formError" }] : []);
    this.showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : []);
    this.keyword = "";
    this.form = { isbn: "", title: "", author: "", category: "", totalCopies: 1 };
  }
  fillSample() {
    this.form = { isbn: "9780140328721", title: "Matilda", author: "Roald Dahl", category: "Fiction", totalCopies: 5 };
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set("");
    this.service.listBooks({ keyword: this.keyword }).subscribe({
      next: (p) => {
        this.rows.set(p?.items ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.msg(err, "Failed to load books."));
        this.loading.set(false);
      }
    });
  }
  save() {
    if (!this.form.isbn || !this.form.title || !this.form.author || !this.form.category || !this.form.totalCopies) {
      this.formError.set("ISBN, title, author, category and copies are all required.");
      return;
    }
    this.saving.set(true);
    this.formError.set("");
    this.service.createBook(this.form).subscribe({
      next: () => {
        this.saving.set(false);
        this.showForm.set(false);
        this.form = { isbn: "", title: "", author: "", category: "", totalCopies: 1 };
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(this.msg(err, "Could not add book."));
      }
    });
  }
  msg(err, fb) {
    if (err?.status === 0)
      return "Cannot reach the gateway on localhost:5100. Is the backend running?";
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
};
_LibraryComponent.\u0275fac = function LibraryComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LibraryComponent)();
};
_LibraryComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LibraryComponent, selectors: [["app-library"]], decls: 19, vars: 7, consts: [[1, "p-6", "space-y-6"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "text-sm"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click"], [1, "flex", "gap-3"], ["placeholder", "Search title / author...", 1, "flex-1", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "bg-white rounded-xl p-6 shadow-sm border border-neutral-200", 4, "ngIf"], [1, "bg-white", "rounded-xl", "shadow-sm", "border", "border-neutral-200", "overflow-hidden"], ["class", "p-8 text-center text-neutral-500", 4, "ngIf"], ["class", "p-8 text-center text-error-600", 4, "ngIf"], ["class", "w-full text-sm", 4, "ngIf"], [1, "bg-white", "rounded-xl", "p-6", "shadow-sm", "border", "border-neutral-200"], [1, "text-xs", "text-neutral-500", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-xs", "text-neutral-500", "mb-1"], ["placeholder", "9780140328721", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Matilda", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Roald Dahl", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Fiction", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "5", 1, "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", 3, "ngModelChange", "ngModel"], [1, "mt-4", "flex", "items-center", "gap-3"], [1, "px-4", "py-2.5", "bg-primary-600", "hover:bg-primary-700", "disabled:bg-neutral-300", "text-white", "rounded-lg", "text-sm", "font-medium", 3, "click", "disabled"], ["type", "button", 1, "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "text-sm", "hover:bg-neutral-50", 3, "click"], ["class", "text-error-600 text-sm", 4, "ngIf"], [1, "text-error-600", "text-sm"], [1, "p-8", "text-center", "text-neutral-500"], [1, "p-8", "text-center", "text-error-600"], [1, "w-full", "text-sm"], [1, "bg-neutral-50", "text-neutral-600", "text-left"], [1, "px-6", "py-3", "font-medium"], ["class", "border-t border-neutral-200", 4, "ngFor", "ngForOf"], [1, "border-t", "border-neutral-200"], [1, "px-6", "py-3", "text-neutral-900"], [1, "px-6", "py-3", "text-neutral-600"]], template: function LibraryComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
    \u0275\u0275text(4, "Library");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6, "Catalogue from Library.API.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 4);
    \u0275\u0275listener("click", function LibraryComponent_Template_button_click_7_listener() {
      return ctx.showForm.set(!ctx.showForm());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 5)(10, "input", 6);
    \u0275\u0275twoWayListener("ngModelChange", function LibraryComponent_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.keyword, $event) || (ctx.keyword = $event);
      return $event;
    });
    \u0275\u0275listener("keyup.enter", function LibraryComponent_Template_input_keyup_enter_10_listener() {
      return ctx.load();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 7);
    \u0275\u0275listener("click", function LibraryComponent_Template_button_click_11_listener() {
      return ctx.load();
    });
    \u0275\u0275text(12, "Search");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, LibraryComponent_div_13_Template, 30, 8, "div", 8);
    \u0275\u0275elementStart(14, "div", 9);
    \u0275\u0275template(15, LibraryComponent_div_15_Template, 2, 0, "div", 10)(16, LibraryComponent_div_16_Template, 2, 1, "div", 11)(17, LibraryComponent_div_17_Template, 2, 0, "div", 10)(18, LibraryComponent_table_18_Template, 13, 1, "table", 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", ctx.showForm() ? "Close" : "+ Add Book", " ");
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
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
var LibraryComponent = _LibraryComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LibraryComponent, [{
    type: Component,
    args: [{
      selector: "app-library",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Library</h1>
          <p class="text-neutral-600 text-sm">Catalogue from Library.API.</p>
        </div>
        <button (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Add Book' }}
        </button>
      </div>

      <div class="flex gap-3">
        <input [(ngModel)]="keyword" (keyup.enter)="load()" placeholder="Search title / author..." class="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        <button (click)="load()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
      </div>

      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <p class="text-xs text-neutral-500 mb-4">All fields required by the backend.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">ISBN *</label>
            <input [(ngModel)]="form.isbn" placeholder="9780140328721" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Title *</label>
            <input [(ngModel)]="form.title" placeholder="Matilda" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Author *</label>
            <input [(ngModel)]="form.author" placeholder="Roald Dahl" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Category *</label>
            <input [(ngModel)]="form.category" placeholder="Fiction" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Total copies *</label>
            <input [(ngModel)]="form.totalCopies" type="number" placeholder="5" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
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
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No books.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Title</th><th class="px-6 py-3 font-medium">Author</th><th class="px-6 py-3 font-medium">Category</th><th class="px-6 py-3 font-medium">Available</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let b of rows()" class="border-t border-neutral-200">
              <td class="px-6 py-3 text-neutral-900">{{ b.title }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ b.author || '\u2014' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ b.category || '\u2014' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ b.availableCopies ?? '\u2014' }}</td>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LibraryComponent, { className: "LibraryComponent", filePath: "src/app/features/library/pages/library/library.component.ts", lineNumber: 81 });
})();
export {
  LibraryComponent
};
//# sourceMappingURL=chunk-7VMWURQN.js.map
