import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-JJL4A5HX.js";
import {
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-4DDQFLM3.js";

// src/app/core/http/api.service.ts
var _ApiService = class _ApiService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiBaseUrl;
  }
  toParams(query) {
    if (!query)
      return void 0;
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== void 0 && value !== null && value !== "") {
        params = params.set(key, String(value));
      }
    });
    return params;
  }
  get(path, query) {
    return this.http.get(`${this.base}${path}`, { params: this.toParams(query) }).pipe(map((r) => r.data));
  }
  post(path, body) {
    return this.http.post(`${this.base}${path}`, body ?? {}).pipe(map((r) => r.data));
  }
  put(path, body) {
    return this.http.put(`${this.base}${path}`, body ?? {}).pipe(map((r) => r.data));
  }
  patch(path, body) {
    return this.http.patch(`${this.base}${path}`, body ?? {}).pipe(map((r) => r.data));
  }
  // Raw binary (PDF report endpoints).
  getBlob(path, query) {
    return this.http.get(`${this.base}${path}`, {
      params: this.toParams(query),
      responseType: "blob"
    });
  }
};
_ApiService.\u0275fac = function ApiService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ApiService)();
};
_ApiService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
var ApiService = _ApiService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ApiService
};
//# sourceMappingURL=chunk-35DAK2ZT.js.map
