// Exact role strings from the JWT `role` claim (case-sensitive).
export const RoleNames = {
  SuperAdmin: 'SuperAdmin',
  Principal: 'Principal',
  Admin: 'Admin',
  Teacher: 'Teacher',
  Student: 'Student',
  Parent: 'Parent',
  Accountant: 'Accountant',
  Librarian: 'Librarian',
} as const;

export type RoleName = (typeof RoleNames)[keyof typeof RoleNames];
