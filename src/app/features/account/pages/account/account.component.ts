import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

// Every signed-in user can change their own password here (the owner's first-boot
// password in particular should be changed straight away).
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6 max-w-xl">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">My account</h1>
        <p class="text-neutral-600 text-sm">Signed in as <span class="font-medium">{{ user()?.fullName }}</span>
          <span *ngIf="user()?.username"> · login ID <span class="font-mono">{{ user()?.username }}</span></span>
          · {{ user()?.role }}</p>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
        <h2 class="text-lg font-semibold text-neutral-900">Change password</h2>
        <p class="text-xs text-neutral-500">This signs you out on every other device.</p>
        <div>
          <label class="block text-xs text-neutral-500 mb-1">Current password *</label>
          <input [(ngModel)]="current" type="password" autocomplete="current-password" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        </div>
        <div>
          <label class="block text-xs text-neutral-500 mb-1">New password * (min 8 characters)</label>
          <input [(ngModel)]="next" type="password" autocomplete="new-password" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        </div>
        <div>
          <label class="block text-xs text-neutral-500 mb-1">Confirm new password *</label>
          <input [(ngModel)]="confirm" type="password" autocomplete="new-password" (keyup.enter)="save()" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        </div>
        <div class="flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Change password' }}
          </button>
          <span *ngIf="error()" class="text-error-600 text-sm">{{ error() }}</span>
        </div>
      </div>
    </div>
  `,
})
export class AccountComponent {
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  user = this.auth.currentUser;
  current = '';
  next = '';
  confirm = '';
  saving = signal(false);
  error = signal('');

  save(): void {
    if (!this.current || !this.next) { this.error.set('Enter your current and new password.'); return; }
    if (this.next.length < 8) { this.error.set('The new password must be at least 8 characters.'); return; }
    if (this.next !== this.confirm) { this.error.set('The new passwords do not match.'); return; }

    this.saving.set(true); this.error.set('');
    this.auth.changePassword(this.current, this.next).subscribe({
      next: () => {
        this.saving.set(false);
        this.current = this.next = this.confirm = '';
        this.toast.success('Password changed.');
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err?.status === 0
          ? 'Cannot reach the server. Check your connection and try again.'
          : err?.error?.errors?.[0] || err?.error?.message || 'Could not change the password.');
      },
    });
  }
}
