import { RoleNames } from './roles';

export interface NavItem {
  label: string;
  route: string;
  roles: string[]; // roles allowed to see this item / access the route
}

// Handy groupings
const ALL = Object.values(RoleNames);
const STAFF = [RoleNames.SuperAdmin, RoleNames.Principal, RoleNames.Admin];
const SELF_SERVICE = [RoleNames.Student, RoleNames.Parent]; // see their own data only

// Single source of truth for both the sidebar AND the route guards.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',     route: '/dashboard',     roles: ALL },
  { label: 'My Portal',     route: '/my-portal',     roles: [RoleNames.Teacher, RoleNames.Accountant, RoleNames.Librarian] },
  { label: 'Students',      route: '/students',      roles: [...STAFF, RoleNames.Teacher] },
  { label: 'Teachers',      route: '/teachers',      roles: STAFF },
  { label: 'Attendance',    route: '/attendance',    roles: [...STAFF, RoleNames.Teacher, ...SELF_SERVICE] },
  { label: 'Academics',     route: '/academics',     roles: [...STAFF, RoleNames.Teacher, ...SELF_SERVICE] },
  { label: 'Examination',   route: '/examination',   roles: [...STAFF, RoleNames.Teacher, ...SELF_SERVICE] },
  { label: 'Fees',          route: '/fees',          roles: [...STAFF, RoleNames.Accountant, ...SELF_SERVICE] },
  // Composer, not a feed — students/parents get announcements via the bell icon instead.
  { label: 'Communication', route: '/communication', roles: [...STAFF, RoleNames.Teacher] },
  { label: 'Library',       route: '/library',       roles: [...STAFF, RoleNames.Librarian, RoleNames.Teacher] },
  { label: 'Transport',     route: '/transport',     roles: STAFF },
  { label: 'Reports',       route: '/reports',       roles: [...STAFF, RoleNames.Accountant] },
  { label: 'Settings',      route: '/settings',      roles: STAFF },
];

// Roles allowed for a given route path (used by the route guard).
export function rolesFor(route: string): string[] {
  return NAV_ITEMS.find((i) => i.route === route)?.roles ?? ALL;
}
