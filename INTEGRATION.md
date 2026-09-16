# Frontend ⇄ Backend Integration Guide

This Angular app is now wired to the **GKMPS School Portal** .NET backend through its
API Gateway. Below is what was connected and how to run the whole thing locally.

## How to run it (get a working link)

You need **two things running**: the backend stack and the Angular dev server.

### 1. Start the backend (Docker required)

```bash
cd "GKMPS School portal"
docker compose up --build
```

This brings up all 12 services + the gateway. The gateway is exposed at
**http://localhost:5100** — that is the only URL the frontend talks to.

> The backend's CORS allow-list already includes `http://localhost:4200` (the default
> `ng serve` origin), so no extra config is needed. If you change the frontend port,
> set `FRONTEND_URL` in the backend `.env` before `docker compose up`.

### 2. Start the frontend

```bash
cd GKMPS-Frntend
npm install      # first time only
npm run dev      # = ng serve --open
```

Your working link: **http://localhost:4200**

### 3. First login

There is no public sign-up. Sign in as the school owner (`ownerishim`) that the backend
seeds on first boot — with `OWNER_PASSWORD` from the backend `.env`, or the generated
password printed in the identity-api logs — then change it under **My account** (user
menu). Create every other account from Students (admission, optionally with a parent
login) or Teachers & Staff (onboarding).

## What was connected

**Gateway base URL** — read at startup from `public/config.json` (`apiBaseUrl`, see
`core/config/runtime-config.ts`). Empty means same origin: `ng serve` proxies `/api` to
`http://localhost:5100` (`proxy.conf.json`), and in production the frontend can sit on the
same domain as the gateway. To use a gateway on another domain, set `apiBaseUrl` in the
deployed `config.json` — no rebuild needed.

**Core layer** (`src/app/core/`)
- `http/api.service.ts` — wraps `HttpClient`, prefixes the gateway URL, unwraps the
  `{ success, data, errors }` envelope down to `data`.
- `models/api-response.ts` — `ApiResponse<T>`, `PagedResult<T>`, `DownloadLink`.
- `constants/roles.ts` — the 8 exact role strings.
- `auth/` — `AuthService` (login/refresh/logout/change-password; access token in memory,
  refresh token + user in localStorage, so a page reload refreshes silently),
  `authInterceptor` (attaches `Authorization: Bearer`, refreshes once on a 401 and
  retries), and `authGuard` / `roleGuard` route guards.

**One service class per backend service**, each method mapping a documented endpoint:

| UI module | Service file | Backend |
|---|---|---|
| Students | `features/students/students.service.ts` | Student.API |
| Teachers | `features/teachers/teachers.service.ts` | Staff.API |
| Attendance | `features/attendance/attendance.service.ts` | Attendance.API |
| Academics | `features/academics/academics.service.ts` | Academic.API |
| Examination | `features/examination/examination.service.ts` | Examination.API |
| Fees | `features/fees/fees.service.ts` | Fee.API |
| Communication | `features/communication/communication.service.ts` | Communication.API |
| Library | `features/library/library.service.ts` | Library.API |
| Transport | `features/transport/transport.service.ts` | Transport.API |
| Reports | `features/reports/reports.service.ts` | Reporting.API |
| (dashboard/user mgmt) | `core/services/users.service.ts`, `notifications.service.ts` | Identity.API, Notification.API |

**Wired pages** — login, dashboard (live enrollment/staff/fee stats and announcements),
students (with parent logins), teachers, attendance, academics, timetable, examination,
fees, communication, library (catalogue + issue/return), transport, reports, users &
access (settings) and my account. Each has loading / empty / error states and create forms posting to the API.

**Routing/auth** — auth pages render without the sidebar shell; every other route sits
behind `authGuard`. The topbar shows the logged-in user and has a working logout.

## Notes & gotchas

- **IDs are GUIDs.** Classes and sections use the fixed ids in
  `core/constants/classes.ts`; students, staff and everything else use ids returned by the API.
- **File downloads** (receipts, report cards, TCs) return a short-lived SAS URL, not a
  file — the services expose the `{ downloadUrl }` for you to open.
- **If pages show "Cannot reach the server"**, the backend gateway isn't up.
- To deploy on a different domain from the gateway, set `apiBaseUrl` in `config.json`
  and add the frontend's origin to the backend's `FRONTEND_URL` (CORS).
