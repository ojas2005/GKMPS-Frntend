// The backend has no class/section registry — classId/sectionId are free GUID
// strings. To keep the UI friendly and data consistent, the frontend owns this
// canonical catalog. These GUIDs are STABLE: the same class always uses the same
// id, so students/fees/exams/attendance all group correctly. The seed script
// (seed.mjs) uses the same ids for Class 10 / Class 9 and sections A/B.

export interface ClassOption {
  id: string;
  name: string;
}

export const SCHOOL_CLASSES: ClassOption[] = [
  { id: 'c1a55001-0000-4000-8000-000000000001', name: 'PG' },
  { id: 'c1a55002-0000-4000-8000-000000000002', name: 'Nursery' },
  { id: 'c1a55003-0000-4000-8000-000000000003', name: 'LKG' },
  { id: 'c1a55004-0000-4000-8000-000000000004', name: 'UKG' },
  { id: 'c1a55005-0000-4000-8000-000000000005', name: 'Class 1' },
  { id: 'c1a55006-0000-4000-8000-000000000006', name: 'Class 2' },
  { id: 'c1a55007-0000-4000-8000-000000000007', name: 'Class 3' },
  { id: 'c1a55008-0000-4000-8000-000000000008', name: 'Class 4' },
  { id: 'c1a55009-0000-4000-8000-000000000009', name: 'Class 5' },
  { id: 'c1a55010-0000-4000-8000-000000000010', name: 'Class 6' },
  { id: 'c1a55011-0000-4000-8000-000000000011', name: 'Class 7' },
  { id: 'c1a55012-0000-4000-8000-000000000012', name: 'Class 8' },
  { id: 'c1a55013-0000-4000-8000-000000000013', name: 'Class 9' },
  { id: 'c1a55014-0000-4000-8000-000000000014', name: 'Class 10' },
];

export const SCHOOL_SECTIONS: ClassOption[] = [
  { id: '5ec00000-0000-4000-8000-00000000000a', name: 'A' },
  { id: '5ec00000-0000-4000-8000-00000000000b', name: 'B' },
  { id: '5ec00000-0000-4000-8000-00000000000c', name: 'C' },
];

// Convenient defaults for form prefill.
export const DEFAULT_CLASS = SCHOOL_CLASSES[SCHOOL_CLASSES.length - 1]; // Class 10
export const DEFAULT_SECTION = SCHOOL_SECTIONS[0]; // A

// Single source of truth for the academic year used when assessing/creating fee
// dues, so admissions and fee-structure forms always line up.
export const CURRENT_ACADEMIC_YEAR = '2026-27';

export const classNameById = (id?: string) =>
  SCHOOL_CLASSES.find((c) => c.id === id)?.name ?? id ?? '—';
export const sectionNameById = (id?: string) =>
  SCHOOL_SECTIONS.find((s) => s.id === id)?.name ?? id ?? '—';
