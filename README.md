<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:6366F1,100:22D3EE&height=200&section=header&text=GKMPS%20School%20Portal&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Angular%20Frontend%20for%20a%20Full%20School%20Management%20System&descAlignY=55&descSize=16" />

<a href="https://github.com/ojas2005/GKMPS-Frntend/commits/main">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=20&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Role-based+dashboards+for+8+user+types;Students+%C2%B7+Teachers+%C2%B7+Attendance+%C2%B7+Fees+%C2%B7+Exams;Built+with+Angular+20+%2B+Tailwind+CSS;Talks+to+the+GKMPS+.NET+microservices+gateway" alt="Typing SVG" />
</a>

<br/>

![Angular](https://img.shields.io/badge/Angular-20.3-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![CI](https://img.shields.io/github/actions/workflow/status/ojas2005/GKMPS-Frntend/frontend-ci.yml?style=for-the-badge&label=CI&logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/license-Unlicensed-lightgrey?style=for-the-badge)

</div>

## About

**GKMPS School Portal** is the Angular frontend for a school management system, talking to a
.NET microservices backend through a single API gateway. It covers everything a school runs on
day to day: students, staff, attendance, academics, timetable, examinations, fees, communication,
library, and transport — each gated by role.

<div align="center">
<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=14&pause=1500&color=94A3B8&center=true&vCenter=true&width=700&lines=npm+install+%26%26+npm+run+dev;Open+http%3A%2F%2Flocalhost%3A4200" alt="quickstart typing" />
</div>

## Modules

| Module | Route | Who sees it |
|---|---|---|
| Dashboard | `/dashboard` | Everyone |
| My Portal | `/my-portal` | Teacher, Accountant, Librarian |
| Students | `/students` | SuperAdmin, Principal, Admin, Teacher |
| Teachers | `/teachers` | SuperAdmin, Principal, Admin |
| Attendance | `/attendance` | Staff, Teacher, Student, Parent |
| Academics | `/academics` | Staff, Teacher, Student, Parent |
| Timetable | `/timetable` | Staff, Teacher, Student, Parent |
| Examination | `/examination` | Staff, Teacher, Student, Parent |
| Fees | `/fees` | Staff, Accountant, Student, Parent |
| Communication | `/communication` | Staff, Teacher |
| Library | `/library` | Staff, Librarian, Teacher |
| Transport | `/transport` | Staff |
| Reports | `/reports` | Staff, Accountant |
| Settings | `/settings` | Staff |

Access is enforced both in navigation and via route guards (`authGuard` / `roleGuard`), driven
by a single source of truth in `src/app/core/constants/nav.ts`.

## Tech stack

- **Framework** — Angular 20 (standalone components, lazy-loaded feature routes)
- **Styling** — Tailwind CSS + shadcn-style UI primitives (`components.json`)
- **State/HTTP** — RxJS, a thin `ApiService` wrapper that unwraps the backend's
  `{ success, data, errors }` envelope
- **Auth** — JWT access token in memory, refresh token in `localStorage`, auto-refresh
  interceptor on 401
- **Icons** — lucide-angular

## Getting started

This app expects the GKMPS backend gateway to be running at `http://localhost:5100`
(see [`INTEGRATION.md`](./INTEGRATION.md) for the full backend setup).

```bash
# install dependencies
npm install

# start the dev server (proxies to the backend gateway)
npm run dev
```

Then open **http://localhost:4200** and sign in — there's no public sign-up, only a
school-office-issued login ID. For local development, use the backend's seeded owner
account (see the [backend README](https://github.com/ojas2005/GKMPS-School-portal) for
how that password is generated on first boot).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | `ng serve --open --port 4200` with the API proxy |
| `npm run start` | Same as `dev`, without auto-opening the browser |
| `npm run build` | Production build |
| `npm run lint` | Lint the codebase |

## Project layout

```
src/app/
├── core/            # http client, auth, route guards, shared constants
├── features/        # one folder per module (students, fees, attendance, ...)
└── shared/          # layout, sidebar, topbar, toast, reusable components
```

Each feature folder has its own `*.routes.ts`, `*.service.ts` mapping to a backend API, and a
`pages/` directory — loading, empty, and error states are handled per page.

---

<div align="center">
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:22D3EE,100:6366F1&height=100&section=footer" />
</div>
