import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/settings/pages/settings/settings.component.ts
var _SettingsComponent = class _SettingsComponent {
};
_SettingsComponent.\u0275fac = function SettingsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SettingsComponent)();
};
_SettingsComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["app-settings"]], decls: 6, vars: 0, consts: [[1, "p-6"], [1, "bg-white", "rounded-xl", "p-8", "shadow-sm", "border", "border-neutral-200"], [1, "text-3xl", "font-bold", "text-neutral-900"], [1, "text-neutral-600", "mt-2"]], template: function SettingsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
    \u0275\u0275text(3, "Settings");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p", 3);
    \u0275\u0275text(5, "School branding, users, permissions, and system settings coming soon...");
    \u0275\u0275domElementEnd()()();
  }
}, dependencies: [CommonModule], encapsulation: 2 });
var SettingsComponent = _SettingsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsComponent, [{
    type: Component,
    args: [{
      selector: "app-settings",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="p-6">
      <div class="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
        <h1 class="text-3xl font-bold text-neutral-900">Settings</h1>
        <p class="text-neutral-600 mt-2">School branding, users, permissions, and system settings coming soon...</p>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/features/settings/pages/settings/settings.component.ts", lineNumber: 17 });
})();
export {
  SettingsComponent
};
//# sourceMappingURL=chunk-7XPHQQEF.js.map
