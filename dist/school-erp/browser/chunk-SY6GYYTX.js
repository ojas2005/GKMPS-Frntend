import {
  AuthService
} from "./chunk-MWX4V2YL.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-VTNFS7A5.js";
import {
  Router
} from "./chunk-QXXS42YF.js";
import "./chunk-JJL4A5HX.js";
import {
  CommonModule,
  Component,
  NgIf,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-4DDQFLM3.js";
import "./chunk-WDMUDEB6.js";

// src/app/features/auth/pages/login/login.component.ts
function LoginComponent_p_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, " Login ID is required ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_p_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, " Password is required ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sign In");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275element(1, "span", 33);
    \u0275\u0275text(2, " Signing in... ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "p", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
var _LoginComponent = class _LoginComponent {
  toggleShowPassword() {
    this.showPassword.update((v) => !v);
  }
  constructor(fb, router) {
    this.fb = fb;
    this.router = router;
    this.isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
    this.showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
    this.errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
    this.auth = inject(AuthService);
    this.loginForm = this.fb.group({
      loginId: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
  isFieldInvalid(fieldName) {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set("");
    const { loginId, password } = this.loginForm.value;
    this.auth.login({ loginId: (loginId ?? "").trim(), password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err?.error?.errors?.[0] || err?.error?.message || (err?.status === 0 ? "Cannot reach the server. Is the backend gateway running on localhost:5100?" : "Invalid login ID or password.");
        this.errorMessage.set(msg);
      }
    });
  }
};
_LoginComponent.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router));
};
_LoginComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 50, vars: 12, consts: [[1, "login-page", "min-h-screen", "relative", "overflow-hidden", "flex", "items-center", "justify-center", "px-4"], [1, "bg-animated", "absolute", "inset-0"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], ["aria-hidden", "true", 1, "particles", "absolute", "inset-0"], [1, "w-full", "max-w-md", "relative", "z-10"], [1, "login-card", "rounded-2xl", "p-8"], [1, "text-center", "mb-8", "stagger", 2, "--i", "0"], [1, "logo-badge", "w-14", "h-14", "rounded-xl", "flex", "items-center", "justify-center", "text-white", "font-bold", "text-2xl", "mx-auto", "mb-4"], [1, "text-2xl", "font-bold", "text-neutral-900", "mb-2"], [1, "text-neutral-600", "text-sm"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "stagger", 2, "--i", "1"], [1, "block", "text-sm", "font-medium", "text-neutral-900", "mb-2"], ["type", "text", "formControlName", "loginId", "placeholder", "Your login ID (or email)", "autocomplete", "username", 1, "fancy-input", "w-full", "px-4", "py-2.5", "border", "border-neutral-300", "rounded-lg", "focus:outline-none", "placeholder-neutral-400", "bg-white/70"], ["class", "error-hint text-error-500 text-xs mt-1", 4, "ngIf"], [1, "stagger", 2, "--i", "2"], [1, "relative"], ["formControlName", "password", "placeholder", "Enter your password", "autocomplete", "current-password", 1, "fancy-input", "w-full", "px-4", "py-2.5", "pr-11", "border", "border-neutral-300", "rounded-lg", "focus:outline-none", "placeholder-neutral-400", "bg-white/70", 3, "type"], ["type", "button", "aria-label", "Toggle Password", 1, "eye-toggle", "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-neutral-600", "hover:text-primary-600", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["cx", "12", "cy", "12", "r", "3", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", 1, "eye-pupil"], ["x1", "4", "y1", "4", "x2", "20", "y2", "20", "stroke-linecap", "round", "stroke-width", "2", 1, "eye-slash"], ["type", "submit", 1, "submit-btn", "stagger", "w-full", "text-white", "font-medium", "py-2.5", "rounded-lg", "mt-6", 2, "--i", "3", 3, "disabled"], [4, "ngIf"], ["class", "flex items-center justify-center gap-2", 4, "ngIf"], ["class", "error-box mt-4 p-3 bg-error-50 border border-error-200 rounded-lg", 4, "ngIf"], [1, "stagger", "text-center", "text-neutral-500", "text-xs", "mt-6", 2, "--i", "4"], [1, "stagger", "text-center", "text-white/70", "text-sm", "mt-6", 2, "--i", "5"], [1, "error-hint", "text-error-500", "text-xs", "mt-1"], [1, "flex", "items-center", "justify-center", "gap-2"], [1, "inline-block", "w-4", "h-4", "border-2", "border-white/30", "border-t-white", "rounded-full", "animate-spin"], [1, "error-box", "mt-4", "p-3", "bg-error-50", "border", "border-error-200", "rounded-lg"], [1, "text-error-700", "text-sm"]], template: function LoginComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
    \u0275\u0275elementStart(5, "div", 5);
    \u0275\u0275element(6, "span")(7, "span")(8, "span")(9, "span")(10, "span")(11, "span")(12, "span")(13, "span")(14, "span")(15, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 6)(17, "div", 7)(18, "div", 8)(19, "div", 9);
    \u0275\u0275text(20, " G ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "h1", 10);
    \u0275\u0275text(22, "GKMPS School Portal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 11);
    \u0275\u0275text(24, "Sign in with the ID given to you by the school");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "form", 12);
    \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_25_listener() {
      return ctx.onSubmit();
    });
    \u0275\u0275elementStart(26, "div", 13)(27, "label", 14);
    \u0275\u0275text(28, " Login ID ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 15);
    \u0275\u0275template(30, LoginComponent_p_30_Template, 2, 0, "p", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 17)(32, "label", 14);
    \u0275\u0275text(33, " Password ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 18);
    \u0275\u0275element(35, "input", 19);
    \u0275\u0275elementStart(36, "button", 20);
    \u0275\u0275listener("click", function LoginComponent_Template_button_click_36_listener() {
      return ctx.toggleShowPassword();
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 21);
    \u0275\u0275element(38, "path", 22)(39, "circle", 23)(40, "line", 24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(41, LoginComponent_p_41_Template, 2, 0, "p", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(42, "button", 25);
    \u0275\u0275template(43, LoginComponent_span_43_Template, 2, 0, "span", 26)(44, LoginComponent_span_44_Template, 3, 0, "span", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(45, LoginComponent_div_45_Template, 3, 1, "div", 28);
    \u0275\u0275elementStart(46, "p", 29);
    \u0275\u0275text(47, " Accounts are issued by the school office. Forgot your password or don't have an ID? Contact the school office. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "p", 30);
    \u0275\u0275text(49, " \xA9 2026 GKMPS School Portal ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(25);
    \u0275\u0275property("formGroup", ctx.loginForm);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx.isFieldInvalid("loginId"));
    \u0275\u0275advance(5);
    \u0275\u0275property("type", ctx.showPassword() ? "text" : "password");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("peek", ctx.showPassword());
    \u0275\u0275advance();
    \u0275\u0275classProp("visible", ctx.showPassword());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isFieldInvalid("password"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.isLoading() || ctx.loginForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isLoading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isLoading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.errorMessage());
  }
}, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['\n\n.bg-animated[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      -45deg,\n      #0c3d66,\n      #0369a1,\n      #0ea5e9,\n      #075985,\n      #0c3d66);\n  background-size: 400% 400%;\n  animation: _ngcontent-%COMP%_gradient-drift 18s ease infinite;\n}\n@keyframes _ngcontent-%COMP%_gradient-drift {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 9999px;\n  filter: blur(60px);\n  opacity: 0.55;\n  pointer-events: none;\n}\n.orb-1[_ngcontent-%COMP%] {\n  width: 28rem;\n  height: 28rem;\n  top: -8rem;\n  left: -8rem;\n  background:\n    radial-gradient(\n      circle,\n      #38bdf8,\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orb-float-1 14s ease-in-out infinite;\n}\n.orb-2[_ngcontent-%COMP%] {\n  width: 24rem;\n  height: 24rem;\n  bottom: -6rem;\n  right: -6rem;\n  background:\n    radial-gradient(\n      circle,\n      #7dd3fc,\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orb-float-2 18s ease-in-out infinite;\n}\n.orb-3[_ngcontent-%COMP%] {\n  width: 16rem;\n  height: 16rem;\n  top: 55%;\n  left: 12%;\n  background:\n    radial-gradient(\n      circle,\n      #bae6ff,\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orb-float-3 11s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_orb-float-1 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(4rem, 3rem) scale(1.15);\n  }\n}\n@keyframes _ngcontent-%COMP%_orb-float-2 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(-4rem, -3rem) scale(1.1);\n  }\n}\n@keyframes _ngcontent-%COMP%_orb-float-3 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(3rem, -4rem) scale(1.2);\n  }\n  66% {\n    transform: translate(-2rem, 2rem) scale(0.95);\n  }\n}\n.particles[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -1rem;\n  width: 6px;\n  height: 6px;\n  border-radius: 9999px;\n  background: rgba(255, 255, 255, 0.5);\n  animation: _ngcontent-%COMP%_particle-rise linear infinite;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n  left: 8%;\n  animation-duration: 12s;\n  animation-delay: 0s;\n  width: 5px;\n  height: 5px;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  left: 18%;\n  animation-duration: 16s;\n  animation-delay: 2s;\n  width: 8px;\n  height: 8px;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  left: 28%;\n  animation-duration: 10s;\n  animation-delay: 5s;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(4) {\n  left: 38%;\n  animation-duration: 14s;\n  animation-delay: 1s;\n  width: 4px;\n  height: 4px;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(5) {\n  left: 50%;\n  animation-duration: 18s;\n  animation-delay: 7s;\n  width: 9px;\n  height: 9px;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(6) {\n  left: 60%;\n  animation-duration: 11s;\n  animation-delay: 3s;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(7) {\n  left: 70%;\n  animation-duration: 15s;\n  animation-delay: 8s;\n  width: 5px;\n  height: 5px;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(8) {\n  left: 80%;\n  animation-duration: 13s;\n  animation-delay: 4s;\n  width: 7px;\n  height: 7px;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(9) {\n  left: 90%;\n  animation-duration: 17s;\n  animation-delay: 6s;\n}\n.particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(10) {\n  left: 45%;\n  animation-duration: 12s;\n  animation-delay: 9s;\n  width: 4px;\n  height: 4px;\n}\n@keyframes _ngcontent-%COMP%_particle-rise {\n  0% {\n    transform: translateY(0) scale(1);\n    opacity: 0;\n  }\n  10% {\n    opacity: 0.7;\n  }\n  90% {\n    opacity: 0.7;\n  }\n  100% {\n    transform: translateY(-100vh) scale(0.4);\n    opacity: 0;\n  }\n}\n.login-card[_ngcontent-%COMP%] {\n  position: relative;\n  background: rgba(255, 255, 255, 0.92);\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  box-shadow: 0 25px 60px -15px rgba(3, 105, 161, 0.45);\n  animation: _ngcontent-%COMP%_card-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n}\n.login-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 32px 70px -15px rgba(3, 105, 161, 0.55);\n}\n.login-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: -2px;\n  border-radius: 1.35rem;\n  background:\n    conic-gradient(\n      from var(--rim-angle, 0deg),\n      #38bdf8,\n      #bae6ff,\n      #0284c7,\n      #7dd3fc,\n      #38bdf8);\n  z-index: -1;\n  animation: _ngcontent-%COMP%_rim-spin 6s linear infinite;\n  opacity: 0.8;\n}\n@property --rim-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }\n@keyframes _ngcontent-%COMP%_rim-spin {\n  to {\n    --rim-angle: 360deg;\n  }\n}\n@keyframes _ngcontent-%COMP%_card-enter {\n  from {\n    opacity: 0;\n    transform: translateY(28px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.stagger[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fade-up 0.6s ease both;\n  animation-delay: calc(0.15s + var(--i, 0) * 0.1s);\n}\n@keyframes _ngcontent-%COMP%_fade-up {\n  from {\n    opacity: 0;\n    transform: translateY(14px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.logo-badge[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #38bdf8,\n      #0284c7,\n      #075985);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_logo-float 4s ease-in-out infinite, _ngcontent-%COMP%_gradient-drift 6s ease infinite;\n  box-shadow: 0 8px 20px -6px rgba(2, 132, 199, 0.6);\n}\n@keyframes _ngcontent-%COMP%_logo-float {\n  0%, 100% {\n    transform: translateY(0) rotate(0deg);\n  }\n  50% {\n    transform: translateY(-6px) rotate(3deg);\n  }\n}\n.fancy-input[_ngcontent-%COMP%] {\n  transition:\n    border-color 0.3s ease,\n    box-shadow 0.3s ease,\n    transform 0.3s ease;\n}\n.fancy-input[_ngcontent-%COMP%]:focus {\n  border-color: #0ea5e9;\n  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.18), 0 4px 14px -4px rgba(14, 165, 233, 0.35);\n  transform: translateY(-1px);\n}\n.eye-toggle[_ngcontent-%COMP%] {\n  transition: color 0.2s ease, transform 0.15s ease;\n}\n.eye-toggle[_ngcontent-%COMP%]:active {\n  transform: translateY(-50%) scale(0.8);\n}\n.eye-toggle[_ngcontent-%COMP%] {\n  transform: translateY(-50%);\n}\n.eye-slash[_ngcontent-%COMP%] {\n  stroke-dasharray: 26;\n  stroke-dashoffset: 26;\n  transition: stroke-dashoffset 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.eye-slash.visible[_ngcontent-%COMP%] {\n  stroke-dashoffset: 0;\n}\n.eye-pupil[_ngcontent-%COMP%] {\n  transform-origin: 12px 12px;\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.eye-pupil.peek[_ngcontent-%COMP%] {\n  transform: scale(0.55);\n}\n.submit-btn[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      135deg,\n      #0ea5e9,\n      #0284c7);\n  transition:\n    transform 0.2s ease,\n    box-shadow 0.3s ease,\n    filter 0.3s ease;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 24px -8px rgba(2, 132, 199, 0.7);\n  filter: brightness(1.05);\n}\n.submit-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0) scale(0.98);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  background: #d4d4d8;\n  cursor: not-allowed;\n}\n.submit-btn[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -75%;\n  width: 50%;\n  height: 100%;\n  background:\n    linear-gradient(\n      115deg,\n      transparent,\n      rgba(255, 255, 255, 0.45),\n      transparent);\n  transform: skewX(-20deg);\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled)::after {\n  animation: _ngcontent-%COMP%_shine 0.9s ease;\n}\n@keyframes _ngcontent-%COMP%_shine {\n  to {\n    left: 125%;\n  }\n}\n.error-box[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n}\n.error-hint[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fade-up 0.25s ease both;\n}\n@keyframes _ngcontent-%COMP%_shake {\n  0%, 100% {\n    transform: translateX(0);\n  }\n  20% {\n    transform: translateX(-7px);\n  }\n  40% {\n    transform: translateX(6px);\n  }\n  60% {\n    transform: translateX(-4px);\n  }\n  80% {\n    transform: translateX(3px);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .bg-animated[_ngcontent-%COMP%], \n   .orb[_ngcontent-%COMP%], \n   .particles[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .login-card[_ngcontent-%COMP%], \n   .stagger[_ngcontent-%COMP%], \n   .logo-badge[_ngcontent-%COMP%], \n   .login-card[_ngcontent-%COMP%]::before, \n   .error-box[_ngcontent-%COMP%], \n   .submit-btn[_ngcontent-%COMP%]::after {\n    animation: none !important;\n  }\n  .stagger[_ngcontent-%COMP%], \n   .login-card[_ngcontent-%COMP%] {\n    opacity: 1;\n    transform: none;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
var LoginComponent = _LoginComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `
    <div class="login-page min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <!-- Animated gradient backdrop -->
      <div class="bg-animated absolute inset-0"></div>

      <!-- Drifting glow orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>

      <!-- Floating particles -->
      <div class="particles absolute inset-0" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div class="w-full max-w-md relative z-10">
        <!-- Card -->
        <div class="login-card rounded-2xl p-8">
          <!-- Header -->
          <div class="text-center mb-8 stagger" style="--i: 0">
            <div class="logo-badge w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              G
            </div>
            <h1 class="text-2xl font-bold text-neutral-900 mb-2">GKMPS School Portal</h1>
            <p class="text-neutral-600 text-sm">Sign in with the ID given to you by the school</p>
          </div>

          <!-- Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Login ID Input -->
            <div class="stagger" style="--i: 1">
              <label class="block text-sm font-medium text-neutral-900 mb-2">
                Login ID
              </label>
              <input
                type="text"
                formControlName="loginId"
                placeholder="Your login ID (or email)"
                autocomplete="username"
                class="fancy-input w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none placeholder-neutral-400 bg-white/70"
              >
              <p *ngIf="isFieldInvalid('loginId')" class="error-hint text-error-500 text-xs mt-1">
                Login ID is required
              </p>
            </div>

            <!-- Password Input -->
            <div class="stagger" style="--i: 2">
              <label class="block text-sm font-medium text-neutral-900 mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  class="fancy-input w-full px-4 py-2.5 pr-11 border border-neutral-300 rounded-lg focus:outline-none placeholder-neutral-400 bg-white/70"
                >
                <button
                  type="button"
                  (click)="toggleShowPassword()"
                  class="eye-toggle absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-primary-600"
                  aria-label="Toggle Password"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    <circle class="eye-pupil" [class.peek]="showPassword()" cx="12" cy="12" r="3"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                    <line class="eye-slash" [class.visible]="showPassword()"
                      x1="4" y1="4" x2="20" y2="20"
                      stroke-linecap="round" stroke-width="2"></line>
                  </svg>
                </button>
              </div>
              <p *ngIf="isFieldInvalid('password')" class="error-hint text-error-500 text-xs mt-1">
                Password is required
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="isLoading() || loginForm.invalid"
              class="submit-btn stagger w-full text-white font-medium py-2.5 rounded-lg mt-6"
              style="--i: 3"
            >
              <span *ngIf="!isLoading()">Sign In</span>
              <span *ngIf="isLoading()" class="flex items-center justify-center gap-2">
                <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing in...
              </span>
            </button>
          </form>

          <!-- Error Message -->
          <div *ngIf="errorMessage()" class="error-box mt-4 p-3 bg-error-50 border border-error-200 rounded-lg">
            <p class="text-error-700 text-sm">{{ errorMessage() }}</p>
          </div>

          <!-- No self-registration -->
          <p class="stagger text-center text-neutral-500 text-xs mt-6" style="--i: 4">
            Accounts are issued by the school office. Forgot your password or don't have an
            ID? Contact the school office.
          </p>
        </div>

        <!-- Footer -->
        <p class="stagger text-center text-white/70 text-sm mt-6" style="--i: 5">
          &copy; 2026 GKMPS School Portal
        </p>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:scss;d367f1fe51958b49a2d8014c251b0bff79d0e2d445f7798ea02e07f932bf8328;/Users/ojastiwari/Downloads/GKMPS-Frntend/src/app/features/auth/pages/login/login.component.ts */\n.bg-animated {\n  background:\n    linear-gradient(\n      -45deg,\n      #0c3d66,\n      #0369a1,\n      #0ea5e9,\n      #075985,\n      #0c3d66);\n  background-size: 400% 400%;\n  animation: gradient-drift 18s ease infinite;\n}\n@keyframes gradient-drift {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.orb {\n  position: absolute;\n  border-radius: 9999px;\n  filter: blur(60px);\n  opacity: 0.55;\n  pointer-events: none;\n}\n.orb-1 {\n  width: 28rem;\n  height: 28rem;\n  top: -8rem;\n  left: -8rem;\n  background:\n    radial-gradient(\n      circle,\n      #38bdf8,\n      transparent 70%);\n  animation: orb-float-1 14s ease-in-out infinite;\n}\n.orb-2 {\n  width: 24rem;\n  height: 24rem;\n  bottom: -6rem;\n  right: -6rem;\n  background:\n    radial-gradient(\n      circle,\n      #7dd3fc,\n      transparent 70%);\n  animation: orb-float-2 18s ease-in-out infinite;\n}\n.orb-3 {\n  width: 16rem;\n  height: 16rem;\n  top: 55%;\n  left: 12%;\n  background:\n    radial-gradient(\n      circle,\n      #bae6ff,\n      transparent 70%);\n  animation: orb-float-3 11s ease-in-out infinite;\n}\n@keyframes orb-float-1 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(4rem, 3rem) scale(1.15);\n  }\n}\n@keyframes orb-float-2 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(-4rem, -3rem) scale(1.1);\n  }\n}\n@keyframes orb-float-3 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(3rem, -4rem) scale(1.2);\n  }\n  66% {\n    transform: translate(-2rem, 2rem) scale(0.95);\n  }\n}\n.particles {\n  pointer-events: none;\n}\n.particles span {\n  position: absolute;\n  bottom: -1rem;\n  width: 6px;\n  height: 6px;\n  border-radius: 9999px;\n  background: rgba(255, 255, 255, 0.5);\n  animation: particle-rise linear infinite;\n}\n.particles span:nth-child(1) {\n  left: 8%;\n  animation-duration: 12s;\n  animation-delay: 0s;\n  width: 5px;\n  height: 5px;\n}\n.particles span:nth-child(2) {\n  left: 18%;\n  animation-duration: 16s;\n  animation-delay: 2s;\n  width: 8px;\n  height: 8px;\n}\n.particles span:nth-child(3) {\n  left: 28%;\n  animation-duration: 10s;\n  animation-delay: 5s;\n}\n.particles span:nth-child(4) {\n  left: 38%;\n  animation-duration: 14s;\n  animation-delay: 1s;\n  width: 4px;\n  height: 4px;\n}\n.particles span:nth-child(5) {\n  left: 50%;\n  animation-duration: 18s;\n  animation-delay: 7s;\n  width: 9px;\n  height: 9px;\n}\n.particles span:nth-child(6) {\n  left: 60%;\n  animation-duration: 11s;\n  animation-delay: 3s;\n}\n.particles span:nth-child(7) {\n  left: 70%;\n  animation-duration: 15s;\n  animation-delay: 8s;\n  width: 5px;\n  height: 5px;\n}\n.particles span:nth-child(8) {\n  left: 80%;\n  animation-duration: 13s;\n  animation-delay: 4s;\n  width: 7px;\n  height: 7px;\n}\n.particles span:nth-child(9) {\n  left: 90%;\n  animation-duration: 17s;\n  animation-delay: 6s;\n}\n.particles span:nth-child(10) {\n  left: 45%;\n  animation-duration: 12s;\n  animation-delay: 9s;\n  width: 4px;\n  height: 4px;\n}\n@keyframes particle-rise {\n  0% {\n    transform: translateY(0) scale(1);\n    opacity: 0;\n  }\n  10% {\n    opacity: 0.7;\n  }\n  90% {\n    opacity: 0.7;\n  }\n  100% {\n    transform: translateY(-100vh) scale(0.4);\n    opacity: 0;\n  }\n}\n.login-card {\n  position: relative;\n  background: rgba(255, 255, 255, 0.92);\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  box-shadow: 0 25px 60px -15px rgba(3, 105, 161, 0.45);\n  animation: card-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n}\n.login-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 32px 70px -15px rgba(3, 105, 161, 0.55);\n}\n.login-card::before {\n  content: "";\n  position: absolute;\n  inset: -2px;\n  border-radius: 1.35rem;\n  background:\n    conic-gradient(\n      from var(--rim-angle, 0deg),\n      #38bdf8,\n      #bae6ff,\n      #0284c7,\n      #7dd3fc,\n      #38bdf8);\n  z-index: -1;\n  animation: rim-spin 6s linear infinite;\n  opacity: 0.8;\n}\n@property --rim-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }\n@keyframes rim-spin {\n  to {\n    --rim-angle: 360deg;\n  }\n}\n@keyframes card-enter {\n  from {\n    opacity: 0;\n    transform: translateY(28px) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.stagger {\n  animation: fade-up 0.6s ease both;\n  animation-delay: calc(0.15s + var(--i, 0) * 0.1s);\n}\n@keyframes fade-up {\n  from {\n    opacity: 0;\n    transform: translateY(14px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.logo-badge {\n  background:\n    linear-gradient(\n      135deg,\n      #38bdf8,\n      #0284c7,\n      #075985);\n  background-size: 200% 200%;\n  animation: logo-float 4s ease-in-out infinite, gradient-drift 6s ease infinite;\n  box-shadow: 0 8px 20px -6px rgba(2, 132, 199, 0.6);\n}\n@keyframes logo-float {\n  0%, 100% {\n    transform: translateY(0) rotate(0deg);\n  }\n  50% {\n    transform: translateY(-6px) rotate(3deg);\n  }\n}\n.fancy-input {\n  transition:\n    border-color 0.3s ease,\n    box-shadow 0.3s ease,\n    transform 0.3s ease;\n}\n.fancy-input:focus {\n  border-color: #0ea5e9;\n  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.18), 0 4px 14px -4px rgba(14, 165, 233, 0.35);\n  transform: translateY(-1px);\n}\n.eye-toggle {\n  transition: color 0.2s ease, transform 0.15s ease;\n}\n.eye-toggle:active {\n  transform: translateY(-50%) scale(0.8);\n}\n.eye-toggle {\n  transform: translateY(-50%);\n}\n.eye-slash {\n  stroke-dasharray: 26;\n  stroke-dashoffset: 26;\n  transition: stroke-dashoffset 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.eye-slash.visible {\n  stroke-dashoffset: 0;\n}\n.eye-pupil {\n  transform-origin: 12px 12px;\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.eye-pupil.peek {\n  transform: scale(0.55);\n}\n.submit-btn {\n  position: relative;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      135deg,\n      #0ea5e9,\n      #0284c7);\n  transition:\n    transform 0.2s ease,\n    box-shadow 0.3s ease,\n    filter 0.3s ease;\n}\n.submit-btn:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 24px -8px rgba(2, 132, 199, 0.7);\n  filter: brightness(1.05);\n}\n.submit-btn:active:not(:disabled) {\n  transform: translateY(0) scale(0.98);\n}\n.submit-btn:disabled {\n  background: #d4d4d8;\n  cursor: not-allowed;\n}\n.submit-btn::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -75%;\n  width: 50%;\n  height: 100%;\n  background:\n    linear-gradient(\n      115deg,\n      transparent,\n      rgba(255, 255, 255, 0.45),\n      transparent);\n  transform: skewX(-20deg);\n}\n.submit-btn:hover:not(:disabled)::after {\n  animation: shine 0.9s ease;\n}\n@keyframes shine {\n  to {\n    left: 125%;\n  }\n}\n.error-box {\n  animation: shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n}\n.error-hint {\n  animation: fade-up 0.25s ease both;\n}\n@keyframes shake {\n  0%, 100% {\n    transform: translateX(0);\n  }\n  20% {\n    transform: translateX(-7px);\n  }\n  40% {\n    transform: translateX(6px);\n  }\n  60% {\n    transform: translateX(-4px);\n  }\n  80% {\n    transform: translateX(3px);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .bg-animated,\n  .orb,\n  .particles span,\n  .login-card,\n  .stagger,\n  .logo-badge,\n  .login-card::before,\n  .error-box,\n  .submit-btn::after {\n    animation: none !important;\n  }\n  .stagger,\n  .login-card {\n    opacity: 1;\n    transform: none;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/pages/login/login.component.ts", lineNumber: 359 });
})();

// src/app/features/auth/auth.routes.ts
var AUTH_ROUTES = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "login"
  }
];
export {
  AUTH_ROUTES
};
//# sourceMappingURL=chunk-SY6GYYTX.js.map
