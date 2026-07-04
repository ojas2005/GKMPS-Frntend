import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// Custom validator to match passwords
function passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <!-- Card -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              S
            </div>
            <h1 class="text-2xl font-bold text-neutral-900 mb-2">Create New Password</h1>
            <p class="text-neutral-600 text-sm">Enter a strong password to secure your account.</p>
          </div>

          <!-- Form -->
          <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Password Input -->
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">
                New Password
              </label>
              <div class="relative">
                <input 
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="Enter new password"
                  class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-400"
                >
                <button
                  type="button"
                  (click)="toggleShowPassword()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-900"
                  aria-label="Toggle Password"
                >
                  <svg *ngIf="!showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <svg *ngIf="showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </button>
              </div>
              <p *ngIf="isFieldInvalid('password')" class="text-error-500 text-xs mt-1">
                {{ getErrorMessage('password') }}
              </p>
            </div>

            <!-- Confirm Password Input -->
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">
                Confirm Password
              </label>
              <input 
                type="password"
                formControlName="confirmPassword"
                placeholder="Re-enter password"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-400"
              >
              <p *ngIf="isFieldInvalid('confirmPassword')" class="text-error-500 text-xs mt-1">
                {{ getErrorMessage('confirmPassword') }}
              </p>
            </div>

            <!-- Form-level error -->
            <div *ngIf="resetPasswordForm.hasError('passwordMismatch') && resetPasswordForm.get('confirmPassword')?.touched" class="text-error-500 text-xs">
              Passwords do not match
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              [disabled]="isLoading() || resetPasswordForm.invalid"
              class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
            >
              <span *ngIf="!isLoading()">Reset Password</span>
              <span *ngIf="isLoading()" class="flex items-center justify-center gap-2">
                <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Resetting...
              </span>
            </button>
          </form>

          <!-- Success Message -->
          <div *ngIf="successMessage()" class="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
            <p class="text-success-700 text-sm font-medium">{{ successMessage() }}</p>
            <p class="text-success-600 text-xs mt-1">Redirecting to login...</p>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage()" class="mt-4 p-3 bg-error-50 border border-error-200 rounded-lg">
            <p class="text-error-700 text-sm">{{ errorMessage() }}</p>
          </div>

          <!-- Back to Login -->
          <div class="mt-6 text-center">
            <a [routerLink]="['/auth/login']" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Back to Sign In
            </a>
          </div>
        </div>

        <!-- Footer -->
        <p class="text-center text-neutral-600 text-sm mt-6">
          v1.0.0 &copy; 2024 School Management ERP
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isLoading = signal(false);
  showPassword = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  token: string | null = null;

  toggleShowPassword(): void {
    this.showPassword.update((v) => !v);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );

    this.token = this.route.snapshot.paramMap.get('token');
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.resetPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.resetPasswordForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName === 'password' ? 'Password' : 'Confirm Password'} is required`;
    }
    if (field?.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('Password reset successfully!');
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    }, 1500);
  }
}
