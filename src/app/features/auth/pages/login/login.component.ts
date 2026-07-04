import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-page min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <!-- Animated gradient backdrop -->
      <div class="bg-animated absolute inset-0"></div>

      <!-- Drifting glow orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>

      <!-- Floating particles -->
      <div class="particles absolute inset-0" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

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

          <!-- Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Login ID Input -->
            <div class="stagger" style="--i: 1">
              <label class="block text-sm font-medium text-neutral-900 mb-2">
                Login ID
              </label>
              <input
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
                Signing in...
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
      /* ---------- Animated background ---------- */
      .bg-animated {
        background: linear-gradient(-45deg, #0c3d66, #0369a1, #0ea5e9, #075985, #0c3d66);
        background-size: 400% 400%;
        animation: gradient-drift 18s ease infinite;
      }

      @keyframes gradient-drift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* ---------- Glow orbs ---------- */
      .orb {
        position: absolute;
        border-radius: 9999px;
        filter: blur(60px);
        opacity: 0.55;
        pointer-events: none;
      }
      .orb-1 {
        width: 28rem; height: 28rem;
        top: -8rem; left: -8rem;
        background: radial-gradient(circle, #38bdf8, transparent 70%);
        animation: orb-float-1 14s ease-in-out infinite;
      }
      .orb-2 {
        width: 24rem; height: 24rem;
        bottom: -6rem; right: -6rem;
        background: radial-gradient(circle, #7dd3fc, transparent 70%);
        animation: orb-float-2 18s ease-in-out infinite;
      }
      .orb-3 {
        width: 16rem; height: 16rem;
        top: 55%; left: 12%;
        background: radial-gradient(circle, #bae6ff, transparent 70%);
        animation: orb-float-3 11s ease-in-out infinite;
      }

      @keyframes orb-float-1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(4rem, 3rem) scale(1.15); }
      }
      @keyframes orb-float-2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-4rem, -3rem) scale(1.1); }
      }
      @keyframes orb-float-3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(3rem, -4rem) scale(1.2); }
        66% { transform: translate(-2rem, 2rem) scale(0.95); }
      }

      /* ---------- Floating particles ---------- */
      .particles { pointer-events: none; }
      .particles span {
        position: absolute;
        bottom: -1rem;
        width: 6px; height: 6px;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.5);
        animation: particle-rise linear infinite;
      }
      .particles span:nth-child(1)  { left: 8%;  animation-duration: 12s; animation-delay: 0s;   width: 5px; height: 5px; }
      .particles span:nth-child(2)  { left: 18%; animation-duration: 16s; animation-delay: 2s;   width: 8px; height: 8px; }
      .particles span:nth-child(3)  { left: 28%; animation-duration: 10s; animation-delay: 5s; }
      .particles span:nth-child(4)  { left: 38%; animation-duration: 14s; animation-delay: 1s;   width: 4px; height: 4px; }
      .particles span:nth-child(5)  { left: 50%; animation-duration: 18s; animation-delay: 7s;   width: 9px; height: 9px; }
      .particles span:nth-child(6)  { left: 60%; animation-duration: 11s; animation-delay: 3s; }
      .particles span:nth-child(7)  { left: 70%; animation-duration: 15s; animation-delay: 8s;   width: 5px; height: 5px; }
      .particles span:nth-child(8)  { left: 80%; animation-duration: 13s; animation-delay: 4s;   width: 7px; height: 7px; }
      .particles span:nth-child(9)  { left: 90%; animation-duration: 17s; animation-delay: 6s; }
      .particles span:nth-child(10) { left: 45%; animation-duration: 12s; animation-delay: 9s;   width: 4px; height: 4px; }

      @keyframes particle-rise {
        0%   { transform: translateY(0) scale(1); opacity: 0; }
        10%  { opacity: 0.7; }
        90%  { opacity: 0.7; }
        100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
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
        .bg-animated, .orb, .particles span, .login-card, .stagger,
        .logo-badge, .login-card::before, .error-box, .submit-btn::after {
          animation: none !important;
        }
        .stagger, .login-card { opacity: 1; transform: none; }
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal('');

  toggleShowPassword(): void {
    this.showPassword.update((v) => !v);
  }

  private auth = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
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

    const { loginId, password } = this.loginForm.value;
    this.auth.login({ loginId: (loginId ?? '').trim(), password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg =
          err?.error?.errors?.[0] ||
          err?.error?.message ||
          (err?.status === 0
            ? 'Cannot reach the server. Is the backend gateway running on localhost:5100?'
            : 'Invalid login ID or password.');
        this.errorMessage.set(msg);
      },
    });
  }
}
