import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

/**
 * The single toast stack, mounted once at the app root. Reads the ToastService
 * signal and renders each toast with a colour accent per kind; the slide
 * in/out is driven by the `.toast-item` / `.toast-leaving` classes in styles.scss.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[22rem] max-w-[calc(100vw-2rem)] pointer-events-none">
      <div
        *ngFor="let t of toast.toasts()"
        class="toast-item pointer-events-auto flex items-start gap-3 bg-white rounded-xl shadow-lg border border-neutral-200 pl-4 pr-3 py-3"
        [class.toast-leaving]="t.leaving"
        [class.border-l-4]="true"
        [ngClass]="{
          'border-l-success-500': t.kind === 'success',
          'border-l-error-500': t.kind === 'error',
          'border-l-primary-500': t.kind === 'info'
        }"
        role="status"
      >
        <!-- Kind icon -->
        <svg class="w-5 h-5 flex-shrink-0 mt-0.5"
          [ngClass]="{
            'text-success-600': t.kind === 'success',
            'text-error-600': t.kind === 'error',
            'text-primary-600': t.kind === 'info'
          }"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path *ngIf="t.kind === 'success'" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          <path *ngIf="t.kind === 'error'" stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <path *ngIf="t.kind === 'info'" stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <p class="flex-1 text-sm text-neutral-800 leading-snug">{{ t.text }}</p>

        <button (click)="toast.dismiss(t.id)" type="button"
          class="flex-shrink-0 text-neutral-400 hover:text-neutral-700 -mt-0.5" aria-label="Dismiss">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class ToastComponent {
  toast = inject(ToastService);
}
