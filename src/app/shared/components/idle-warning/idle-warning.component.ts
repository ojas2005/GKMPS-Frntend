import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleService } from '../../../core/auth/idle.service';

/** The "Are you still there?" prompt shown a minute before an inactivity sign-out. */
@Component({
  selector: 'app-idle-warning',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="idle.secondsLeft() as seconds"
         class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
         role="alertdialog" aria-modal="true" aria-labelledby="idle-title" aria-describedby="idle-desc">
      <div class="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h2 id="idle-title" class="text-lg font-semibold text-neutral-900">Are you still there?</h2>
        <p id="idle-desc" class="mt-2 text-sm text-neutral-600">
          You haven't done anything for a while. For your security you'll be signed out in
          <span class="font-semibold text-neutral-900" aria-live="polite">{{ seconds }} second{{ seconds === 1 ? '' : 's' }}</span>.
        </p>
        <div class="mt-5 flex justify-end gap-3">
          <button type="button" (click)="idle.signOutNow()"
                  class="rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            Sign out
          </button>
          <button type="button" (click)="idle.stayActive()"
                  class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
            Stay signed in
          </button>
        </div>
      </div>
    </div>
  `,
})
export class IdleWarningComponent {
  idle = inject(IdleService);
}
