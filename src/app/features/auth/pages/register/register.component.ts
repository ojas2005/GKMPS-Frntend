import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { RoleNames } from '../../../../core/constants/roles';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <div class="text-center mb-8">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              S
            </div>
            <h1 class="text-2xl font-bold text-neutral-900 mb-2">Create an account</h1>
            <p class="text-neutral-600 text-sm">The backend ships with no seed data — register the first user here.</p>
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Full Name</label>
              <input type="text" formControlName="fullName" placeholder="Jane Principal"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-400">
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Email Address</label>
              <input type="email" formControlName="email" placeholder="you@school.com"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-400">
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Password</label>
              <input type="password" formControlName="password" placeholder="At least 6 characters"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-neutral-400">
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-900 mb-2">Role</label>
              <select formControlName="role"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                <option *ngFor="let r of roles" [value]="r">{{ r }}</option>
              </select>
            </div>

            <button type="submit" [disabled]="isLoading() || form.invalid"
              class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white font-medium py-2.5 rounded-lg transition-colors mt-2">
              <span *ngIf="!isLoading()">Create account</span>
              <span *ngIf="isLoading()">Creating...</span>
            </button>
          </form>

          <div *ngIf="errorMessage()" class="mt-4 p-3 bg-error-50 border border-error-200 rounded-lg">
            <p class="text-error-700 text-sm">{{ errorMessage() }}</p>
          </div>

          <p class="text-center text-neutral-600 text-sm mt-6">
            Already have an account?
            <a routerLink="/auth/login" class="text-primary-600 hover:text-primary-700 font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class RegisterComponent {
  form: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  roles = Object.values(RoleNames);

  private auth = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [RoleNames.SuperAdmin, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err?.error?.errors?.[0] ||
            err?.error?.message ||
            (err?.status === 0
              ? 'Cannot reach the server. Is the backend gateway running on localhost:5100?'
              : 'Registration failed.'),
        );
      },
    });
  }
}
