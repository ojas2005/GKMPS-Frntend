import { RoleName } from '../constants/roles';

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAtUtc: string;
  userId: string;
  email: string;
  fullName: string;
  role: RoleName;
  username?: string | null;
  // Present only for student/parent accounts linked to a student record.
  studentId?: string | null;
  classId?: string | null;
  sectionId?: string | null;
  // Present only for staff accounts linked to a staff record.
  staffId?: string | null;
  classTeacherOfClassId?: string | null;
  classTeacherOfSectionId?: string | null;
  // Minutes of inactivity before the app signs the user out.
  sessionIdleTimeoutMinutes?: number | null;
  // Password was right but an authenticator code is still needed (no tokens yet).
  twoFactorRequired?: boolean;
  twoFactorChallenge?: string | null;
  // A step the user must finish before using the app.
  pendingAction?: PendingAction | null;
}

export type PendingAction = 'change-password' | 'setup-two-factor';

/** What signing in with a password led to. */
export type LoginOutcome =
  | { kind: 'signed-in'; user: CurrentUser }
  | { kind: 'two-factor'; challenge: string };

export interface LoginRequest {
  loginId: string; // username (e.g. "ownerishim") or email
  password: string;
}

export interface RefreshRequest {
  accessToken?: string;
  refreshToken: string;
}

export interface CurrentUser {
  userId: string;
  email: string;
  fullName: string;
  role: RoleName;
  username?: string | null;
  studentId?: string | null;
  classId?: string | null;
  sectionId?: string | null;
  staffId?: string | null;
  classTeacherOfClassId?: string | null;
  classTeacherOfSectionId?: string | null;
  pendingAction?: PendingAction | null;
}
