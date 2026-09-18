import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { retry, throwError, timer } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { SignOutReason, idleTimeoutMinutes, takeSignOutReason } from '../../../../core/auth/session-activity';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="login-page min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <!-- Deep gradient base -->
      <div class="bg-base absolute inset-0" aria-hidden="true"></div>

      <!-- Aurora light bloom (screen-blended over the base) -->
      <div class="bg-aurora absolute inset-0" aria-hidden="true">
        <span class="aurora aurora-1"></span>
        <span class="aurora aurora-2"></span>
        <span class="aurora aurora-3"></span>
        <span class="aurora aurora-4"></span>
      </div>

      <!-- Perspective grid, masked to fade out toward the edges -->
      <div class="bg-grid absolute inset-0" aria-hidden="true"></div>

      <!-- Floating particles -->
      <div class="particles absolute inset-0" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span>
      </div>

      <!-- Vignette: darkens the corners so the card reads as the focal point -->
      <div class="bg-vignette absolute inset-0" aria-hidden="true"></div>

      <div class="w-full max-w-md relative z-10">
        <!-- Card -->
        <div class="login-card rounded-2xl p-8">
          <!-- Header -->
          <div class="text-center mb-8 stagger" style="--i: 0">
            <div class="logo-badge w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              G
            </div>
            <h1 class="text-2xl font-bold text-neutral-900 mb-2">GKMPS School Portal</h1>
            <p class="text-neutral-600 text-sm">Sign in with the ID given to you by the school</p>
          </div>

          <!-- Why the user was signed out, when it wasn't their choice -->
          <div *ngIf="signedOutMessage()" role="status" class="mb-4 p-3 rounded-lg border border-primary-200 bg-primary-50">
            <p class="text-primary-800 text-sm">{{ signedOutMessage() }}</p>
          </div>

          <!-- Step 2: the code from the authenticator app -->
          <form *ngIf="challenge()" (ngSubmit)="submitCode()" class="space-y-4">
            <div>
              <label for="two-factor-code" class="block text-sm font-medium text-neutral-900 mb-2">Code from your authenticator app</label>
              <input id="two-factor-code" name="code" [(ngModel)]="code" autocomplete="one-time-code" inputmode="numeric"
                     placeholder="123 456" class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 text-center tracking-widest text-lg">
              <p class="text-xs text-neutral-500 mt-2">Lost your phone? Enter one of your recovery codes instead.</p>
            </div>
            <button type="submit" [disabled]="isLoading() || !code.trim()" class="submit-btn w-full text-white font-medium py-2.5 rounded-lg">
              {{ isLoading() ? 'Checking...' : 'Verify' }}
            </button>
            <button type="button" (click)="startOver()" class="w-full text-sm text-neutral-600 hover:underline">Use a different account</button>
          </form>

          <!-- Step 1: login ID and password -->
          <form *ngIf="!challenge()" [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Login ID Input -->
            <div class="stagger" style="--i: 1">
              <label class="block text-sm font-medium text-neutral-900 mb-2" for="login-f1">
                Login ID
              </label>
              <input id="login-f1"
                type="text"
                formControlName="loginId"
                placeholder="Your login ID (or email)"
                autocomplete="username"
                class="fancy-input w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none placeholder-neutral-400 bg-white/70"
              >
              <p *ngIf="isFieldInvalid('loginId')" class="error-hint text-error-500 text-xs mt-1">
                Login ID is required
              </p>
            </div>

            <!-- Password Input -->
            <div class="stagger" style="--i: 2">
              <label class="block text-sm font-medium text-neutral-900 mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  class="fancy-input w-full px-4 py-2.5 pr-11 border border-neutral-300 rounded-lg focus:outline-none placeholder-neutral-400 bg-white/70"
                >
                <button
                  type="button"
                  (click)="toggleShowPassword()"
                  class="eye-toggle absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-primary-600"
                  aria-label="Toggle Password"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    <circle class="eye-pupil" [class.peek]="showPassword()" cx="12" cy="12" r="3"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                    <line class="eye-slash" [class.visible]="showPassword()"
                      x1="4" y1="4" x2="20" y2="20"
                      stroke-linecap="round" stroke-width="2"></line>
                  </svg>
                </button>
              </div>
              <p *ngIf="isFieldInvalid('password')" class="error-hint text-error-500 text-xs mt-1">
                Password is required
              </p>
            </div>

            <!-- Shared school computers: stay signed in only when asked to -->
            <label class="stagger flex items-start gap-2 text-sm text-neutral-700" style="--i: 3">
              <input type="checkbox" formControlName="rememberMe" class="mt-0.5 h-4 w-4 rounded border-neutral-300">
              <span>Keep me signed in on this device
                <span class="block text-xs text-neutral-500">Only on your own phone or computer -- not on a shared or school computer.</span>
              </span>
            </label>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="isLoading() || loginForm.invalid"
              class="submit-btn stagger w-full text-white font-medium py-2.5 rounded-lg mt-6"
              style="--i: 3"
            >
              <span *ngIf="!isLoading()">Sign In</span>
              <span *ngIf="isLoading()" class="flex items-center justify-center gap-2">
                <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ wakingServer() ? 'Waking up the server...' : 'Signing in...' }}
              </span>
            </button>
          </form>

          <!-- Error Message -->
          <div *ngIf="errorMessage()" class="error-box mt-4 p-3 bg-error-50 border border-error-200 rounded-lg">
            <p class="text-error-700 text-sm">{{ errorMessage() }}</p>
          </div>

          <!-- No self-registration -->
          <p class="stagger text-center text-neutral-500 text-xs mt-6" style="--i: 4">
            Accounts are issued by the school office. Forgot your password or don't have an
            ID? Contact the school office.
          </p>
        </div>

        <!-- Footer -->
        <p class="stagger text-center text-white/70 text-sm mt-6" style="--i: 5">
          &copy; 2026 GKMPS School Portal
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      /* ---------- Deep gradient base ----------
         Dark navy -> teal so the white card reads as the brightest thing on
         screen; the slow drift keeps it alive without pulling focus. */
      .bg-base {
        background: linear-gradient(150deg, #020617 0%, #041f3d 28%, #075985 58%, #0b4a5c 82%, #041124 100%);
        background-size: 200% 200%;
        animation: base-drift 24s ease-in-out infinite;
      }
      @keyframes base-drift {
        0%, 100% { background-position: 0% 50%; }
        50%      { background-position: 100% 50%; }
      }

      /* ---------- Aurora bloom ----------
         Screen blending over the dark base makes overlapping blobs add light
         instead of muddying, which is what sells the "aurora" look. */
      .bg-aurora { pointer-events: none; }
      .aurora {
        position: absolute;
        display: block;
        border-radius: 9999px;
        filter: blur(90px);
        mix-blend-mode: screen;
        will-change: transform;
      }
      .aurora-1 {
        width: 40rem; height: 40rem;
        top: -14rem; left: -10rem;
        background: radial-gradient(circle, rgba(56, 189, 248, 0.75), transparent 68%);
        animation: aurora-1 22s ease-in-out infinite;
      }
      .aurora-2 {
        width: 34rem; height: 34rem;
        bottom: -12rem; right: -8rem;
        background: radial-gradient(circle, rgba(45, 212, 191, 0.6), transparent 68%);
        animation: aurora-2 26s ease-in-out infinite;
      }
      .aurora-3 {
        width: 26rem; height: 26rem;
        top: 8%; right: 14%;
        background: radial-gradient(circle, rgba(129, 140, 248, 0.55), transparent 70%);
        animation: aurora-3 19s ease-in-out infinite;
      }
      .aurora-4 {
        width: 30rem; height: 30rem;
        bottom: 4%; left: 10%;
        background: radial-gradient(circle, rgba(14, 165, 233, 0.5), transparent 70%);
        animation: aurora-4 30s ease-in-out infinite;
      }

      @keyframes aurora-1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%      { transform: translate(7rem, 5rem) scale(1.18); }
      }
      @keyframes aurora-2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%      { transform: translate(-6rem, -4rem) scale(1.12); }
      }
      @keyframes aurora-3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33%      { transform: translate(-4rem, 5rem) scale(1.22); }
        66%      { transform: translate(3rem, -3rem) scale(0.92); }
      }
      @keyframes aurora-4 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%      { transform: translate(5rem, -6rem) scale(1.15); }
      }

      /* ---------- Grid ----------
         Masked with a radial fade so the lines never reach the edges (a hard
         cut-off is what makes overlay grids look cheap). */
      .bg-grid {
        pointer-events: none;
        background-image:
          linear-gradient(rgba(186, 230, 253, 0.12) 1px, transparent 1px),
          linear-gradient(90deg, rgba(186, 230, 253, 0.12) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 45%, #000 25%, transparent 78%);
        mask-image: radial-gradient(ellipse 75% 65% at 50% 45%, #000 25%, transparent 78%);
        animation: grid-pan 40s linear infinite;
      }
      @keyframes grid-pan {
        from { background-position: 0 0, 0 0; }
        to   { background-position: 56px 56px, 56px 56px; }
      }

      /* ---------- Vignette ---------- */
      .bg-vignette {
        pointer-events: none;
        background: radial-gradient(ellipse 80% 70% at 50% 45%, transparent 35%, rgba(2, 6, 23, 0.55) 100%);
      }

      /* ---------- Floating particles ---------- */
      .particles { pointer-events: none; }
      .particles span {
        position: absolute;
        bottom: -1rem;
        width: 6px; height: 6px;
        border-radius: 9999px;
        background: rgba(224, 242, 254, 0.85);
        box-shadow: 0 0 8px 1px rgba(125, 211, 252, 0.7);
        animation: particle-rise linear infinite;
      }
      .particles span:nth-child(1)  { left: 8%;  animation-duration: 15s; animation-delay: 0s;  width: 4px; height: 4px; }
      .particles span:nth-child(2)  { left: 18%; animation-duration: 19s; animation-delay: 2s;  width: 6px; height: 6px; }
      .particles span:nth-child(3)  { left: 26%; animation-duration: 13s; animation-delay: 5s;  width: 3px; height: 3px; }
      .particles span:nth-child(4)  { left: 38%; animation-duration: 17s; animation-delay: 1s;  width: 5px; height: 5px; }
      .particles span:nth-child(5)  { left: 47%; animation-duration: 21s; animation-delay: 7s;  width: 3px; height: 3px; }
      .particles span:nth-child(6)  { left: 56%; animation-duration: 14s; animation-delay: 3s;  width: 6px; height: 6px; }
      .particles span:nth-child(7)  { left: 64%; animation-duration: 18s; animation-delay: 8s;  width: 4px; height: 4px; }
      .particles span:nth-child(8)  { left: 73%; animation-duration: 16s; animation-delay: 4s;  width: 5px; height: 5px; }
      .particles span:nth-child(9)  { left: 82%; animation-duration: 20s; animation-delay: 6s;  width: 3px; height: 3px; }
      .particles span:nth-child(10) { left: 91%; animation-duration: 15s; animation-delay: 9s;  width: 4px; height: 4px; }
      .particles span:nth-child(11) { left: 33%; animation-duration: 23s; animation-delay: 11s; width: 3px; height: 3px; }
      .particles span:nth-child(12) { left: 68%; animation-duration: 12s; animation-delay: 13s; width: 4px; height: 4px; }

      @keyframes particle-rise {
        0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10%  { opacity: 0.8; }
        50%  { transform: translateY(-50vh) translateX(1.5rem) scale(0.8); }
        90%  { opacity: 0.55; }
        100% { transform: translateY(-100vh) translateX(-1rem) scale(0.35); opacity: 0; }
      }

      /* ---------- Card ---------- */
      .login-card {
        position: relative;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 25px 60px -15px rgba(3, 105, 161, 0.45);
        animation: card-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        transition: transform 0.4s ease, box-shadow 0.4s ease;
      }
      .login-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 32px 70px -15px rgba(3, 105, 161, 0.55);
      }
      /* animated glowing rim */
      .login-card::before {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 1.35rem;
        background: conic-gradient(from var(--rim-angle, 0deg), #38bdf8, #bae6ff, #0284c7, #7dd3fc, #38bdf8);
        z-index: -1;
        animation: rim-spin 6s linear infinite;
        opacity: 0.8;
      }
      @property --rim-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }
      @keyframes rim-spin {
        to { --rim-angle: 360deg; }
      }

      @keyframes card-enter {
        from { opacity: 0; transform: translateY(28px) scale(0.96); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      /* staggered children entrance */
      .stagger {
        animation: fade-up 0.6s ease both;
        animation-delay: calc(0.15s + var(--i, 0) * 0.1s);
      }
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* ---------- Logo ---------- */
      .logo-badge {
        background: linear-gradient(135deg, #38bdf8, #0284c7, #075985);
        background-size: 200% 200%;
        animation: logo-float 4s ease-in-out infinite, gradient-drift 6s ease infinite;
        box-shadow: 0 8px 20px -6px rgba(2, 132, 199, 0.6);
      }
      @keyframes logo-float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-6px) rotate(3deg); }
      }

      /* ---------- Inputs ---------- */
      .fancy-input {
        transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
      }
      .fancy-input:focus {
        border-color: #0ea5e9;
        box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.18), 0 4px 14px -4px rgba(14, 165, 233, 0.35);
        transform: translateY(-1px);
      }

      /* ---------- Password eye ---------- */
      .eye-toggle {
        transition: color 0.2s ease, transform 0.15s ease;
      }
      .eye-toggle:active { transform: translateY(-50%) scale(0.8); }
      .eye-toggle { transform: translateY(-50%); }
      .eye-slash {
        stroke-dasharray: 26;
        stroke-dashoffset: 26;
        transition: stroke-dashoffset 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .eye-slash.visible { stroke-dashoffset: 0; }
      .eye-pupil {
        transform-origin: 12px 12px;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .eye-pupil.peek { transform: scale(0.55); }

      /* ---------- Submit button ---------- */
      .submit-btn {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, #0ea5e9, #0284c7);
        transition: transform 0.2s ease, box-shadow 0.3s ease, filter 0.3s ease;
      }
      .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px -8px rgba(2, 132, 199, 0.7);
        filter: brightness(1.05);
      }
      .submit-btn:active:not(:disabled) { transform: translateY(0) scale(0.98); }
      .submit-btn:disabled {
        background: #d4d4d8;
        cursor: not-allowed;
      }
      /* shine sweep */
      .submit-btn::after {
        content: '';
        position: absolute;
        top: 0; left: -75%;
        width: 50%; height: 100%;
        background: linear-gradient(115deg, transparent, rgba(255, 255, 255, 0.45), transparent);
        transform: skewX(-20deg);
      }
      .submit-btn:hover:not(:disabled)::after {
        animation: shine 0.9s ease;
      }
      @keyframes shine {
        to { left: 125%; }
      }

      /* ---------- Errors ---------- */
      .error-box {
        animation: shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }
      .error-hint {
        animation: fade-up 0.25s ease both;
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-7px); }
        40% { transform: translateX(6px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(3px); }
      }

      /* ---------- Accessibility ---------- */
      @media (prefers-reduced-motion: reduce) {
        .bg-base, .aurora, .bg-grid, .particles span, .login-card, .stagger,
        .logo-badge, .login-card::before, .error-box, .submit-btn::after {
          animation: none !important;
        }
        .stagger, .login-card { opacity: 1; transform: none; }
        /* Drifting specks with no motion are just noise -- drop them entirely. */
        .particles { display: none; }
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal('');
  signedOutMessage = signal(this.describeSignOut(takeSignOutReason()));
  wakingServer = signal(false);

  toggleShowPassword(): void {
    this.showPassword.update((v) => !v);
  }

  private auth = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  private describeSignOut(reason: SignOutReason | null): string {
    if (reason === 'idle') return `You were signed out after ${idleTimeoutMinutes()} minutes of inactivity. Please sign in again.`;
    if (reason === 'expired') return 'Your session has ended. Please sign in again.';
    return '';
  }

  // Two-step sign-in: set once the password is accepted and a code is needed.
  challenge = signal<string | null>(null);
  code = '';

  submitCode(): void {
    const challenge = this.challenge();
    if (!challenge || !this.code.trim()) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.auth.completeTwoFactor(challenge, this.code.trim()).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.afterSignIn(user.pendingAction);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.code = '';
        const msg = err?.error?.message || 'That code is not right.';
        // The server ends the challenge after too many wrong codes or when it expires.
        if (/password again/i.test(msg)) this.challenge.set(null);
        this.errorMessage.set(msg);
      },
    });
  }

  startOver(): void {
    this.challenge.set(null);
    this.code = '';
    this.errorMessage.set('');
  }

  // A required step (new password, two-step setup) comes before anything else.
  private afterSignIn(pending: string | null | undefined): void {
    this.router.navigate([pending ? '/account' : '/dashboard']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { loginId, password, rememberMe } = this.loginForm.value;
    this.wakingServer.set(false);
    this.auth
      .login({ loginId: (loginId ?? '').trim(), password, rememberMe: !!rememberMe })
      .pipe(
        // The API scales to zero when idle; the first request after a quiet spell can fail
        // with no response (or a gateway 502-504) while it starts, so retry those for ~40s.
        retry({
          count: 6,
          delay: (err, attempt) => {
            if (![0, 502, 503, 504].includes(err?.status)) return throwError(() => err);
            this.wakingServer.set(true);
            return timer(Math.min(2000 * attempt, 10000));
          },
        }),
      )
      .subscribe({
      next: (outcome) => {
        this.isLoading.set(false);
        if (outcome.kind === 'two-factor') {
          this.challenge.set(outcome.challenge);
          return;
        }
        this.afterSignIn(outcome.user.pendingAction);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg =
          err?.error?.errors?.[0] ||
          err?.error?.message ||
          (err?.status === 0
            ? 'Cannot reach the server. Check your connection and try again.'
            : 'Invalid login ID or password.');
        this.errorMessage.set(msg);
      },
      });
  }
}
