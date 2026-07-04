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
}

export interface LoginRequest {
  loginId: string; // username (e.g. "ownerishim") or email
  password: string;
}

export interface RegisterRequest {
  email: string;
  username?: string;
  password: string;
  fullName: string;
  role: RoleName;
}

export interface RefreshRequest {
  accessToken: string;
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
}
