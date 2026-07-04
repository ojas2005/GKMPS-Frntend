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

The backend ships with **no seed data**, so start by creating a user:

1. Open http://localhost:4200 → you'll land on the login page.
2. Click **Create one** → register (pick role **SuperAdmin** for full access).
3. You're taken straight to the dashboard, authenticated.

## What was connected

**Gateway base URL** — `src/environments/environment.ts` (`apiBaseUrl: http://localhost:5100`).
Change this one line to point at a deployed gateway later.

**Core layer** (`src/app/core/`)
- `http/api.service.ts` — wraps `HttpClient`, prefixes the gateway URL, unwraps the
  `{ success, data, errors }` envelope down to `data`.
- `models/api-response.ts` — `ApiResponse<T>`, `PagedResult<T>`, `DownloadLink`.
- `constants/roles.ts` — the 8 exact role strings.
- `auth/` — `AuthService` (login/register/refresh/logout; access token in memory,
  refresh token + user in localStorage), `authInterceptor` (attaches
  `Authorization: Bearer`, refreshes once on a 401 and retries), and `authGuard` /
  `roleGuard` route guards.

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

**Wired pages** — login, register, dashboard (live student/teacher/fee stats), students,
teachers, attendance, academics, examination, fees, communication, library, transport,
reports. Each has loading / empty / error states and create forms posting to the API.

**Routing/auth** — auth pages render without the sidebar shell; every other route sits
behind `authGuard`. The topbar shows the logged-in user and has a working logout.

## Notes & gotchas

- **IDs are GUIDs.** Forms that need a class/section/student reference ask for a GUID
  string — enter real IDs returned by the backend, not numbers.
- **File downloads** (receipts, report cards, TCs) return a short-lived SAS URL, not a
  file — the services expose the `{ downloadUrl }` for you to open.
- **If a page shows "Cannot reach the gateway on localhost:5100"**, the backend isn't up.
- Per the backend's own notes, only Identity/Student/Fee APIs are build-verified; other
  services may 500 until their backend is fixed — that's a backend issue, not the wiring.
- To deploy the frontend publicly later, change `apiBaseUrl` to the public gateway URL
  and add that site's origin to the backend `Cors:AllowedOrigins`.
