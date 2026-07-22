import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TransportService, TransportRoute } from '../../transport.service';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Transport</h1>
          <p class="text-neutral-600 text-sm">Routes from Transport.API.</p>
        </div>
        <button (click)="showForm.set(!showForm())" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium">
          {{ showForm() ? 'Close' : '+ Add Route' }}
        </button>
      </div>

      <div *ngIf="showForm()" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Route name *</label>
            <input [(ngModel)]="form.name" placeholder="Route 1 — North" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Monthly fee *</label>
            <input [(ngModel)]="form.monthlyFee" type="number" placeholder="1500" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Start point *</label>
            <input [(ngModel)]="form.startPoint" placeholder="Depot" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">End point *</label>
            <input [(ngModel)]="form.endPoint" placeholder="Sector 15" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          </div>
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Add' }}
          </button>
          <button (click)="fillSample()" type="button" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Fill sample</button>
          <span *ngIf="formError()" class="text-error-600 text-sm">{{ formError() }}</span>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading...</div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && rows().length === 0" class="p-8 text-center text-neutral-500">No routes.</div>
        <table *ngIf="!loading() && !error() && rows().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr><th class="px-6 py-3 font-medium">Route</th><th class="px-6 py-3 font-medium">From → To</th><th class="px-6 py-3 font-medium">Monthly fee</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of rows()" [routerLink]="['/transport', r.id]" class="border-t border-neutral-200 cursor-pointer hover:bg-neutral-50">
              <td class="px-6 py-3 text-neutral-900">{{ r.name }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ r.startPoint || '—' }} → {{ r.endPoint || '—' }}</td>
              <td class="px-6 py-3 text-neutral-600">{{ r.monthlyFee != null ? ('₹' + r.monthlyFee) : '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TransportComponent implements OnInit {
  private service = inject(TransportService);
  rows = signal<TransportRoute[]>([]);
  loading = signal(false);
  error = signal('');
  saving = signal(false);
  formError = signal('');
  showForm = signal(false);
  form = { name: '', startPoint: '', endPoint: '', monthlyFee: 0 };

  fillSample(): void {
    this.form = { name: 'Route 1 — North', startPoint: 'Depot', endPoint: 'Sector 15', monthlyFee: 1500 };
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.service.listRoutes().subscribe({
      next: (list) => { this.rows.set(list ?? []); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load routes.')); this.loading.set(false); },
    });
  }

  save(): void {
    if (!this.form.name || !this.form.startPoint || !this.form.endPoint) { this.formError.set('Name, start and end points are required.'); return; }
    this.saving.set(true); this.formError.set('');
    this.service.createRoute(this.form).subscribe({
      next: () => { this.saving.set(false); this.showForm.set(false); this.form = { name: '', startPoint: '', endPoint: '', monthlyFee: 0 }; this.load(); },
      error: (err) => { this.saving.set(false); this.formError.set(this.msg(err, 'Could not add route.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the gateway on localhost:5100. Is the backend running?';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
