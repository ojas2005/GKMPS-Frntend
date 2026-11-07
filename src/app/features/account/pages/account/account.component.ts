import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { toDataURL } from 'qrcode';
import { AuthService } from '../../../../core/auth/auth.service';
import { ApiService } from '../../../../core/http/api.service';
import { ToastService } from '../../../../core/services/toast.service';

interface TwoFactorStatus { enabled: boolean; required: boolean; recoveryCodesLeft: number; }
interface TwoFactorSetup { secretKey: string; setupUri: string; }

// Every signed-in user manages their own password and two-step sign-in here. It's also where
// a required step (choose your own password, set up two-step sign-in) is completed -- until
// then this is the only page the app will show.
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

      <div *ngIf="pending() === 'change-password'" role="alert" class="rounded-xl border border-warning-300 bg-warning-50 p-4 text-sm text-warning-900">
        <p class="font-semibold">Choose your own password to continue</p>
        <p class="mt-1">Your password was set by someone else. Pick a new one that only you know.</p>
      </div>
      <div *ngIf="pending() === 'setup-two-factor'" role="alert" class="rounded-xl border border-warning-300 bg-warning-50 p-4 text-sm text-warning-900">
        <p class="font-semibold">Set up two-step sign-in to continue</p>
        <p class="mt-1">Your account can see and change everyone's records, so it needs a code from your phone as well as your password.</p>
      </div>

      <!-- Password -->
      <section class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4" aria-labelledby="pw-heading">
        <h2 id="pw-heading" class="text-lg font-semibold text-neutral-900">Change password</h2>
        <p class="text-xs text-neutral-500">This signs you out on every other device.</p>
        <div>
          <label for="pw-current" class="block text-xs text-neutral-500 mb-1">Current password *</label>
          <input id="pw-current" [(ngModel)]="current" type="password" autocomplete="current-password" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        </div>
        <div>
          <label for="pw-new" class="block text-xs text-neutral-500 mb-1">New password *</label>
          <input id="pw-new" [(ngModel)]="next" type="password" autocomplete="new-password" aria-describedby="pw-rules" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <p id="pw-rules" class="text-xs text-neutral-500 mt-1">At least 10 characters. A few unrelated words make a strong, memorable password. Common or guessable passwords are refused.</p>
        </div>
        <div>
          <label for="pw-confirm" class="block text-xs text-neutral-500 mb-1">Confirm new password *</label>
          <input id="pw-confirm" [(ngModel)]="confirm" type="password" autocomplete="new-password" (keyup.enter)="save()" class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        </div>
        <div class="flex items-center gap-3">
          <button (click)="save()" [disabled]="saving()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            {{ saving() ? 'Saving...' : 'Change password' }}
          </button>
          <span *ngIf="error()" role="alert" class="text-error-600 text-sm">{{ error() }}</span>
        </div>
      </section>

      <!-- Two-step sign-in -->
      <section *ngIf="pending() !== 'change-password'" class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4" aria-labelledby="tf-heading">
        <div class="flex items-center justify-between gap-3">
          <h2 id="tf-heading" class="text-lg font-semibold text-neutral-900">Two-step sign-in</h2>
          <span *ngIf="status()" class="text-xs font-medium px-2 py-1 rounded-full"
                [class]="status()!.enabled ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-700'">
            {{ status()!.enabled ? 'On' : 'Off' }}
          </span>
        </div>
        <p class="text-sm text-neutral-600">
          After your password, you also enter a six-digit code from an authenticator app on your phone
          (Google Authenticator, Microsoft Authenticator, Authy…). Someone who learns your password still can't get in.
        </p>

        <!-- Recovery codes, shown once right after turning it on -->
        <div *ngIf="recoveryCodes().length" class="rounded-lg border border-primary-200 bg-primary-50 p-4 space-y-3">
          <p class="text-sm font-semibold text-primary-900">Save these recovery codes now</p>
          <p class="text-sm text-primary-900">If you lose your phone, each code gets you in once. They won't be shown again.</p>
          <ul class="grid grid-cols-2 gap-2 font-mono text-sm" aria-label="Recovery codes">
            <li *ngFor="let c of recoveryCodes()" class="bg-white rounded px-2 py-1 border border-primary-100">{{ c }}</li>
          </ul>
          <div class="flex gap-3">
            <button (click)="copyCodes()" class="px-3 py-2 border border-primary-300 rounded-lg text-sm text-primary-800 hover:bg-white">Copy</button>
            <button (click)="doneWithCodes()" class="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm">I've saved them</button>
          </div>
        </div>

        <!-- Off: set it up -->
        <ng-container *ngIf="status() && !status()!.enabled && !recoveryCodes().length">
          <button *ngIf="!setup()" (click)="beginSetup()" [disabled]="busy()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">
            Set up two-step sign-in
          </button>
          <div *ngIf="setup()" class="space-y-4">
            <ol class="list-decimal pl-5 text-sm text-neutral-700 space-y-1">
              <li>Open your authenticator app and add an account.</li>
              <li>Scan this code, or type the key below it.</li>
              <li>Enter the six-digit code the app shows.</li>
            </ol>
            <img *ngIf="qr()" [src]="qr()" width="200" height="200" alt="QR code for your authenticator app" class="border border-neutral-200 rounded-lg">
            <p class="text-sm text-neutral-700">Key: <span class="font-mono font-semibold text-neutral-900 select-all">{{ setup()!.secretKey }}</span></p>
            <div class="flex items-end gap-3">
              <div>
                <label for="tf-code" class="block text-xs text-neutral-500 mb-1">Code from the app</label>
                <input id="tf-code" [(ngModel)]="code" inputmode="numeric" autocomplete="one-time-code" (keyup.enter)="enable()"
                       class="w-40 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm tracking-widest">
              </div>
              <button (click)="enable()" [disabled]="busy() || !code.trim()" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm font-medium">Turn on</button>
            </div>
          </div>
        </ng-container>

        <!-- On: turn it off (not allowed where it's required) -->
        <ng-container *ngIf="status()?.enabled && !recoveryCodes().length">
          <p class="text-sm text-neutral-600">Recovery codes left: <span class="font-medium">{{ status()!.recoveryCodesLeft }}</span></p>
          <p *ngIf="status()!.required" class="text-sm text-neutral-600">Your role requires two-step sign-in, so it can't be turned off. If you change phones, ask the school owner to reset it.</p>
          <div *ngIf="!status()!.required" class="space-y-3">
            <p class="text-sm text-neutral-600">To turn it off, confirm with your password and a code.</p>
            <div class="flex flex-wrap items-end gap-3">
              <div>
                <label for="tf-off-pw" class="block text-xs text-neutral-500 mb-1">Password</label>
                <input id="tf-off-pw" [(ngModel)]="offPassword" type="password" autocomplete="current-password" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
              </div>
              <div>
                <label for="tf-off-code" class="block text-xs text-neutral-500 mb-1">Code</label>
                <input id="tf-off-code" [(ngModel)]="offCode" inputmode="numeric" autocomplete="one-time-code" class="w-32 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
              </div>
              <button (click)="disable()" [disabled]="busy()" class="px-4 py-2.5 border border-error-300 text-error-700 hover:bg-error-50 rounded-lg text-sm">Turn off</button>
            </div>
          </div>
        </ng-container>

        <p *ngIf="tfError()" role="alert" class="text-error-600 text-sm">{{ tfError() }}</p>
      </section>
    </div>
  `,
})
export class AccountComponent implements OnInit {
  private auth = inject(AuthService);
  private api = inject(ApiService);
  private toast = inject(ToastService);
  private router = inject(Router);

  user = this.auth.currentUser;
  pending = () => this.auth.pendingAction();

  current = '';
  next = '';
  confirm = '';
  saving = signal(false);
  error = signal('');

  status = signal<TwoFactorStatus | null>(null);
  setup = signal<TwoFactorSetup | null>(null);
  qr = signal<string | null>(null);
  recoveryCodes = signal<string[]>([]);
  busy = signal(false);
  tfError = signal('');
  code = '';
  offPassword = '';
  offCode = '';

  ngOnInit(): void {
    if (this.pending() !== 'change-password') this.loadStatus();
  }

  save(): void {
    if (!this.current || !this.next) { this.error.set('Enter your current and new password.'); return; }
    if (this.next.length < 10) { this.error.set('The new password must be at least 10 characters.'); return; }
    if (this.next !== this.confirm) { this.error.set('The new passwords do not match.'); return; }

    this.saving.set(true); this.error.set('');
    this.auth.changePassword(this.current, this.next).subscribe({
      next: (user) => {
        this.saving.set(false);
        this.current = this.next = this.confirm = '';
        this.toast.success('Password changed.');
        // The next required step (if any) is two-step setup, shown on this same page.
        if (user.pendingAction === 'setup-two-factor') this.loadStatus();
        else if (!user.pendingAction) this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err?.status === 0
          ? 'Cannot reach the server. Check your connection and try again.'
          : err?.error?.errors?.[0] || err?.error?.message || 'Could not change the password.');
      },
    });
  }

  private loadStatus(): void {
    this.api.get<TwoFactorStatus>('/api/account/two-factor').subscribe({
      next: (s) => this.status.set(s),
      error: () => this.tfError.set('Could not load two-step sign-in settings.'),
    });
  }

  beginSetup(): void {
    this.busy.set(true); this.tfError.set('');
    this.api.post<TwoFactorSetup>('/api/account/two-factor/setup', {}).subscribe({
      next: async (s) => {
        this.setup.set(s);
        this.qr.set(await toDataURL(s.setupUri, { width: 200, margin: 1 }));
        this.busy.set(false);
      },
      error: (err) => { this.busy.set(false); this.tfError.set(err?.error?.message || 'Could not start the setup.'); },
    });
  }

  enable(): void {
    this.busy.set(true); this.tfError.set('');
    this.api.post<{ recoveryCodes: string[] }>('/api/account/two-factor/enable', { code: this.code.trim() }).subscribe({
      next: (r) => {
        this.busy.set(false);
        this.code = '';
        this.setup.set(null);
        this.qr.set(null);
        this.recoveryCodes.set(r.recoveryCodes);
      },
      error: (err) => { this.busy.set(false); this.tfError.set(err?.error?.message || 'That code is not right.'); },
    });
  }

  copyCodes(): void {
    navigator.clipboard?.writeText(this.recoveryCodes().join('\n')).then(
      () => this.toast.success('Recovery codes copied.'),
      () => this.toast.error('Could not copy -- write them down instead.'),
    );
  }

  // Codes saved: fetch a fresh sign-in (the setup step is now done) and carry on.
  doneWithCodes(): void {
    this.recoveryCodes.set([]);
    this.auth.refresh().subscribe({
      next: () => {
        this.loadStatus();
        if (!this.auth.pendingAction()) this.router.navigate(['/dashboard']);
      },
      error: () => this.router.navigate(['/auth/login']),
    });
  }

  disable(): void {
    this.busy.set(true); this.tfError.set('');
    this.api.post('/api/account/two-factor/disable', { password: this.offPassword, code: this.offCode.trim() }).subscribe({
      next: () => { this.busy.set(false); this.offPassword = this.offCode = ''; this.toast.success('Two-step sign-in is off.'); this.loadStatus(); },
      error: (err) => { this.busy.set(false); this.tfError.set(err?.error?.message || 'Could not turn it off.'); },
    });
  }
}
