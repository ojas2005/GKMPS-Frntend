import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService, UserSummary } from '../../../../core/services/users.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { RoleNames } from '../../../../core/constants/roles';

// Mirrors RoleNames.Rank/CanManageRole on the backend, so the UI only offers actions
// the API will accept: the owner manages everyone, others only roles below their own.
const RANK: Record<string, number> = { SuperAdmin: 3, Principal: 2, Admin: 1 };
const rank = (role?: string | null) => (role ? RANK[role] ?? 0 : 0);

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold text-neutral-900">Users &amp; access</h1>
          <p class="text-neutral-600 text-sm">Every login in the school: activate or deactivate accounts and reset passwords.</p>
        </div>
        <a routerLink="/account" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Change my password</a>
      </div>

      <div class="flex flex-wrap gap-3">
        <select [(ngModel)]="role" (change)="search()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white">
          <option value="">All roles</option>
          <option *ngFor="let r of roles" [value]="r">{{ r }}</option>
        </select>
        <input [(ngModel)]="keyword" (keyup.enter)="search()" placeholder="Search name or email..." class="flex-1 min-w-[12rem] px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
        <button (click)="search()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">Search</button>
      </div>

      <div *ngIf="justReset() as r" class="bg-success-50 border border-success-500 rounded-xl p-4 text-sm text-success-800 flex items-start justify-between gap-3">
        <span>Password reset — hand these to {{ r.name }}: Login ID <span class="font-mono font-bold">{{ r.login }}</span>
          · Password <span class="font-mono font-bold">{{ r.password }}</span></span>
        <button (click)="justReset.set(null)" class="text-success-700">✕</button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-x-auto">
        <div *ngIf="loading()" class="p-5 space-y-3"><div *ngFor="let i of [1,2,3,4,5]" class="skeleton h-11"></div></div>
        <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>
        <div *ngIf="!loading() && !error() && users().length === 0" class="p-8 text-center text-neutral-500">No users found.</div>
        <table *ngIf="!loading() && !error() && users().length > 0" class="w-full text-sm">
          <thead class="bg-neutral-50 text-neutral-600 text-left">
            <tr>
              <th class="px-6 py-3 font-medium">Name</th><th class="px-6 py-3 font-medium">Login ID</th>
              <th class="px-6 py-3 font-medium">Role</th><th class="px-6 py-3 font-medium">Last login</th>
              <th class="px-6 py-3 font-medium">Status</th><th class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <ng-container *ngFor="let u of users()">
              <tr class="border-t border-neutral-200">
                <td class="px-6 py-3 text-neutral-900">{{ u.fullName }} <span *ngIf="isMe(u)" class="text-xs text-neutral-500">(you)</span></td>
                <td class="px-6 py-3 text-neutral-600 font-mono">{{ u.username || u.email }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ u.role }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ u.lastLoginAtUtc ? (u.lastLoginAtUtc | date: 'medium') : 'Never' }}</td>
                <td class="px-6 py-3">
                  <span class="text-xs font-medium px-2 py-1 rounded-full"
                    [class]="u.isActive ? 'bg-success-50 text-success-700' : 'bg-neutral-100 text-neutral-600'">
                    {{ u.isActive ? 'Active' : 'Deactivated' }}
                  </span>
                </td>
                <td class="px-6 py-3 text-right whitespace-nowrap">
                  <ng-container *ngIf="canManage(u)">
                    <button (click)="toggleReset(u)" class="text-primary-600 hover:underline text-sm mr-4">Reset password</button>
                    <button *ngIf="!isMe(u)" (click)="resetTwoFactor(u)" [disabled]="busyId() === u.id"
                      class="text-primary-600 hover:underline text-sm mr-4 disabled:text-neutral-400">Reset two-step</button>
                    <button *ngIf="!isMe(u)" (click)="setActive(u, !u.isActive)" [disabled]="busyId() === u.id"
                      class="text-sm hover:underline disabled:text-neutral-400"
                      [class]="u.isActive ? 'text-error-600' : 'text-success-600'">
                      {{ u.isActive ? 'Deactivate' : 'Activate' }}
                    </button>
                  </ng-container>
                </td>
              </tr>
              <tr *ngIf="resetFor() === u.id" class="bg-neutral-50">
                <td colspan="6" class="px-6 py-3">
                  <div class="flex flex-wrap items-center gap-3">
                    <input [(ngModel)]="newPassword" type="text" placeholder="New password (min 8 characters)" class="w-64 px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                    <button (click)="resetPassword(u)" [disabled]="busyId() === u.id" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-sm">Set password</button>
                    <span class="text-xs text-neutral-500">Signs them out everywhere.</span>
                  </div>
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>

      <div *ngIf="totalPages() > 1" class="flex items-center justify-end gap-3 text-sm">
        <button (click)="go(page - 1)" [disabled]="page <= 1" class="px-3 py-1.5 border border-neutral-300 rounded-lg disabled:text-neutral-400">Previous</button>
        <span class="text-neutral-600">Page {{ page }} of {{ totalPages() }}</span>
        <button (click)="go(page + 1)" [disabled]="page >= totalPages()" class="px-3 py-1.5 border border-neutral-300 rounded-lg disabled:text-neutral-400">Next</button>
      </div>
    </div>
  `,
})
export class SettingsComponent implements OnInit {
  private usersService = inject(UsersService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  roles = Object.values(RoleNames);
  role = '';
  keyword = '';
  page = 1;
  readonly pageSize = 25;

  users = signal<UserSummary[]>([]);
  totalPages = signal(1);
  loading = signal(false);
  error = signal('');
  busyId = signal<string | null>(null);
  resetFor = signal<string | null>(null);
  newPassword = '';
  justReset = signal<{ name: string; login: string; password: string } | null>(null);

  ngOnInit(): void { this.load(); }

  search(): void { this.page = 1; this.load(); }

  go(page: number): void { this.page = page; this.load(); }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.usersService.list({ role: this.role || undefined, keyword: this.keyword.trim() || undefined, page: this.page, pageSize: this.pageSize }).subscribe({
      next: (p) => {
        this.users.set(p?.items ?? []);
        this.totalPages.set(Math.max(1, p?.totalPages ?? Math.ceil((p?.totalCount ?? 0) / this.pageSize)));
        this.loading.set(false);
      },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load users.')); this.loading.set(false); },
    });
  }

  isMe(u: UserSummary): boolean {
    return u.id === this.auth.currentUser()?.userId;
  }

  canManage(u: UserSummary): boolean {
    const mine = this.auth.currentUser()?.role;
    return mine === 'SuperAdmin' || (rank(mine) > 0 && rank(mine) > rank(u.role));
  }

  toggleReset(u: UserSummary): void {
    this.newPassword = '';
    this.resetFor.set(this.resetFor() === u.id ? null : u.id);
  }

  resetPassword(u: UserSummary): void {
    if (this.newPassword.length < 10) { this.toast.error('The password must be at least 10 characters.'); return; }
    const password = this.newPassword;
    this.busyId.set(u.id);
    this.usersService.setPassword(u.id, password).subscribe({
      next: () => {
        this.busyId.set(null); this.resetFor.set(null); this.newPassword = '';
        this.justReset.set({ name: u.fullName, login: u.username || u.email, password });
      },
      error: (err) => { this.busyId.set(null); this.toast.error(this.msg(err, 'Could not reset the password.')); },
    });
  }

  resetTwoFactor(u: UserSummary): void {
    if (!confirm(`Reset two-step sign-in for ${u.fullName}? They'll be signed out everywhere and set it up again at next sign-in.`)) return;
    this.busyId.set(u.id);
    this.usersService.resetTwoFactor(u.id).subscribe({
      next: () => { this.busyId.set(null); this.toast.success(`Two-step sign-in reset for ${u.fullName}.`); },
      error: (err) => { this.busyId.set(null); this.toast.error(this.msg(err, 'Could not reset two-step sign-in.')); },
    });
  }

  setActive(u: UserSummary, isActive: boolean): void {
    this.busyId.set(u.id);
    this.usersService.setStatus(u.id, isActive).subscribe({
      next: () => {
        this.busyId.set(null);
        this.users.update((list) => list.map((x) => (x.id === u.id ? { ...x, isActive } : x)));
        this.toast.success(`${u.fullName} ${isActive ? 'activated' : 'deactivated'}.`);
      },
      error: (err) => { this.busyId.set(null); this.toast.error(this.msg(err, 'Could not update the account.')); },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
