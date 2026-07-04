import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
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
            <h1 class="text-2xl font-bold text-neutral-900 mb-2">Reset Password</h1>
            <p class="text-neutral-600 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          <!-- Form -->
          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Email Input -->
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">
                Email Address
              </label>
              <input 
                type="email"
                formControlName="email"
                placeholder="Enter your email"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-400"
              >
              <p *ngIf="isFieldInvalid('email')" class="text-error-500 text-xs mt-1">
                {{ getErrorMessage('email') }}
              </p>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              [disabled]="isLoading() || forgotPasswordForm.invalid"
              class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
            >
              <span *ngIf="!isLoading()">Send Reset Link</span>
              <span *ngIf="isLoading()" class="flex items-center justify-center gap-2">
                <span class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Sending...
              </span>
            </button>
          </form>

          <!-- Success Message -->
          <div *ngIf="successMessage()" class="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
            <p class="text-success-700 text-sm">{{ successMessage() }}</p>
            <p class="text-success-600 text-xs mt-1">Check your email for the reset link.</p>
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
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.forgotPasswordForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Email is required';
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('Password reset link sent successfully!');
    }, 1500);
  }
}
