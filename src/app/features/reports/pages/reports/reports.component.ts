import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService, EnrollmentReport } from '../../reports.service';
import { SCHOOL_CLASSES, classNameById } from '../../../../core/constants/classes';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Reports</h1>
        <p class="text-neutral-600 text-sm">Enrollment &amp; fee-collection reports.</p>
      </div>

      <!-- Enrollment -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-neutral-900">Enrollment</h2>
          <button (click)="downloadPdf()" class="px-4 py-2 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Download PDF</button>
        </div>
        <div *ngIf="loading()" class="text-neutral-500 text-sm">Loading...</div>
        <div *ngIf="error()" class="text-error-600 text-sm">{{ error() }}</div>
        <div *ngIf="enrollment() as e" class="space-y-3">
          <p class="text-3xl font-bold text-neutral-900">{{ e.totalStudents ?? 0 }} <span class="text-sm font-normal text-neutral-500">students</span></p>
          <table *ngIf="byClass(e).length" class="w-full text-sm">
            <thead class="text-neutral-600 text-left"><tr><th class="py-2 font-medium">Class</th><th class="py-2 font-medium">Active students</th></tr></thead>
            <tbody>
              <tr *ngFor="let c of byClass(e)" class="border-t border-neutral-200">
                <td class="py-2 text-neutral-900">{{ c.name }}</td>
                <td class="py-2 text-neutral-600">{{ c.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Fee collection -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Fee collection</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <input [(ngModel)]="fromDate" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <input [(ngModel)]="toDate" type="date" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <button (click)="loadFees()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">Run</button>
          <div class="text-2xl font-bold text-neutral-900">{{ feeTotal() !== null ? ('₹' + feeTotal()) : '—' }}</div>
        </div>
      </div>
    </div>
  `,
})
export class ReportsComponent implements OnInit {
  // activeCountByClass is keyed by class id; show it in the school's own class order.
  byClass(e: EnrollmentReport): Array<{ name: string; count: number }> {
    const order = (id: string) => { const i = SCHOOL_CLASSES.findIndex((c) => c.id === id); return i < 0 ? 999 : i; };
    return Object.entries(e.activeCountByClass ?? {})
      .sort(([a], [b]) => order(a) - order(b))
      .map(([id, count]) => ({ name: classNameById(id), count }));
  }

  private service = inject(ReportsService);
  enrollment = signal<EnrollmentReport | null>(null);
  loading = signal(false);
  error = signal('');
  feeTotal = signal<number | null>(null);
  fromDate = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  toDate = new Date().toISOString().slice(0, 10);

  ngOnInit(): void { this.loadEnrollment(); }

  loadEnrollment(): void {
    this.loading.set(true); this.error.set('');
    this.service.enrollment().subscribe({
      next: (r) => { this.enrollment.set(r ?? null); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load enrollment.')); this.loading.set(false); },
    });
  }

  loadFees(): void {
    this.service.feeCollection(this.fromDate + 'T00:00:00Z', this.toDate + 'T23:59:59Z').subscribe({
      next: (r) => this.feeTotal.set(r?.total ?? 0),
      error: () => this.feeTotal.set(null),
    });
  }

  downloadPdf(): void {
    this.service.enrollmentPdf().subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'enrollment-report.pdf'; a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => this.error.set(this.msg(err, 'PDF download failed.')),
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
