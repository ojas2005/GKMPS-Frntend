import {
  HttpClient,
  environment
} from "./chunk-JJL4A5HX.js";
import {
  Injectable,
  computed,
  inject,
  map,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";

// src/app/core/auth/auth.service.ts
var REFRESH_KEY = "gkmps.refreshToken";
var USER_KEY = "gkmps.user";
var _AuthService = class _AuthService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiBaseUrl;
    this.accessToken = signal(null, ...ngDevMode ? [{ debugName: "accessToken" }] : []);
    this.currentUser = signal(this.readStoredUser(), ...ngDevMode ? [{ debugName: "currentUser" }] : []);
    this.isLoggedIn = computed(() => !!this.currentUser(), ...ngDevMode ? [{ debugName: "isLoggedIn" }] : []);
  }
  getAccessToken() {
    return this.accessToken();
  }
  getRefreshToken() {
    return typeof localStorage !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null;
  }
  hasRole(...roles) {
    const role = this.currentUser()?.role;
    return !!role && roles.includes(role);
  }
  // Roles that only ever see their own data.
  isSelfService() {
    return this.hasRole("Student", "Parent");
  }
  // The logged-in student's own studentId (null for staff).
  studentId() {
    return this.currentUser()?.studentId ?? null;
  }
  classId() {
    return this.currentUser()?.classId ?? null;
  }
  sectionId() {
    return this.currentUser()?.sectionId ?? null;
  }
  // The logged-in staff member's own staffId (null for students/unlinked accounts).
  staffId() {
    return this.currentUser()?.staffId ?? null;
  }
  // True when this teacher is the class teacher (head teacher) of some class.
  isClassTeacher() {
    return !!this.currentUser()?.classTeacherOfClassId;
  }
  classTeacherClassId() {
    return this.currentUser()?.classTeacherOfClassId ?? null;
  }
  classTeacherSectionId() {
    return this.currentUser()?.classTeacherOfSectionId ?? null;
  }
  login(body) {
    return this.http.post(`${this.base}/api/auth/login`, body).pipe(map((r) => this.applyAuth(r.data)));
  }
  register(body) {
    return this.http.post(`${this.base}/api/auth/register`, body).pipe(map((r) => this.applyAuth(r.data)));
  }
  loginWithGoogle(idToken) {
    return this.http.post(`${this.base}/api/auth/login/google`, { idToken }).pipe(map((r) => this.applyAuth(r.data)));
  }
  // Called by the interceptor on a 401.
  refresh() {
    const body = {
      accessToken: this.accessToken() ?? "",
      refreshToken: this.getRefreshToken() ?? ""
    };
    return this.http.post(`${this.base}/api/auth/refresh`, body).pipe(map((r) => r.data), tap((result) => this.applyAuth(result)), map((result) => result.accessToken));
  }
  logout() {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      this.http.post(`${this.base}/api/auth/logout`, { refreshToken }).subscribe({ error: () => {
      } });
    }
    this.clear();
  }
  applyAuth(result) {
    this.accessToken.set(result.accessToken);
    const user = {
      userId: result.userId,
      email: result.email,
      fullName: result.fullName,
      role: result.role,
      username: result.username ?? null,
      studentId: result.studentId ?? null,
      classId: result.classId ?? null,
      sectionId: result.sectionId ?? null,
      staffId: result.staffId ?? null,
      classTeacherOfClassId: result.classTeacherOfClassId ?? null,
      classTeacherOfSectionId: result.classTeacherOfSectionId ?? null
    };
    this.currentUser.set(user);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(REFRESH_KEY, result.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    return user;
  }
  clear() {
    this.accessToken.set(null);
    this.currentUser.set(null);
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }
  readStoredUser() {
    if (typeof localStorage === "undefined")
      return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw)
      return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
};
_AuthService.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthService)();
};
_AuthService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
var AuthService = _AuthService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-MWX4V2YL.js.map
