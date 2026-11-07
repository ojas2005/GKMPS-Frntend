import { FEE_CATEGORY_LABELS, FEE_STATUS_LABELS, FeeCategory } from './fees.service';

/** Pill colours for a fee's payment status (works in light and dark themes). */
export function feeStatusClass(status: string | undefined, isOverdue = false): string {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ';
  if (status === 'Paid') return base + 'bg-success-50 text-success-700';
  if (status === 'PartiallyPaid') return base + 'bg-warning-50 text-warning-700';
  return base + (isOverdue ? 'bg-error-50 text-error-700' : 'bg-neutral-100 text-neutral-700');
}

export function feeStatusLabel(status: string | undefined, isOverdue = false, isDue = true): string {
  if (status !== 'Paid' && !isDue) return 'Upcoming';
  const label = FEE_STATUS_LABELS[status ?? ''] ?? status ?? '—';
  return isOverdue && status !== 'Paid' ? `${label} · overdue` : label;
}

export function feeCategoryLabel(category: string | undefined): string {
  return FEE_CATEGORY_LABELS[category as FeeCategory] ?? category ?? '—';
}

export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** The session's months, April to March, as yyyy-MM with labels. */
export function sessionMonths(academicYear: string): Array<{ value: string; label: string }> {
  const start = Number(academicYear.slice(0, 4));
  return Array.from({ length: 12 }, (_, i) => {
    const m = (3 + i) % 12;
    const y = i < 9 ? start : start + 1;
    return { value: `${y}-${String(m + 1).padStart(2, '0')}`, label: `${MONTH_NAMES[m]} ${y}` };
  });
}

/** Today in the browser's calendar, as yyyy-mm-dd (not UTC, which is a day behind before 05:30 IST). */
export function localIsoDate(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function apiError(err: any, fallback: string): string {
  if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
  return err?.error?.errors?.[0] || err?.error?.message || fallback;
}
