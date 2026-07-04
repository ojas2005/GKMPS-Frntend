export const environment = {
  production: false,
  // Empty base = same-origin requests to `/api/...`, which the Angular dev server
  // proxies to the gateway at http://localhost:5100 (see proxy.conf.json).
  // This sidesteps CORS entirely, no matter which port `ng serve` picks.
  apiBaseUrl: '',
};
