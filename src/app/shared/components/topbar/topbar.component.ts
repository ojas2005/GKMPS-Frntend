import { Component, OnInit, Output, EventEmitter, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../../core/auth/auth.service';
import { CommunicationService, Announcement } from '../../../features/communication/communication.service';
import { classNameById } from '../../../core/constants/classes';
import {
  Menu,
  Bell,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-angular';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 shadow-sm">
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <button 
          (click)="onToggleSidebar.emit()"
          class="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- Search -->
        <div class="hidden md:flex items-center gap-2 bg-neutral-100 rounded-lg px-3 py-2 max-w-xs">
          <svg class="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search..." 
            class="bg-transparent outline-none text-sm w-32 placeholder-neutral-400"
          >
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Notifications: announcements relevant to me -->
        <div class="relative">
          <button (click)="toggleAnnouncements()" class="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 relative transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span *ngIf="announcements().length > 0" class="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
          </button>

          <div *ngIf="showAnnouncements()" class="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-neutral-200 w-80 max-h-96 overflow-y-auto py-2 z-50">
            <p class="px-4 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Announcements</p>
            <p *ngIf="announcements().length === 0" class="px-4 py-3 text-sm text-neutral-500">Nothing new right now.</p>
            <div *ngFor="let a of announcements()" class="px-4 py-2.5 border-t border-neutral-100 first:border-t-0 hover:bg-neutral-50">
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-medium text-neutral-900">{{ a.title }}</p>
                <span *ngIf="a.targetClassId" class="text-xs text-primary-600 whitespace-nowrap">{{ className(a.targetClassId) }}</span>
              </div>
              <p class="text-xs text-neutral-600 mt-0.5 line-clamp-2">{{ a.body }}</p>
              <p class="text-xs text-neutral-400 mt-1">{{ a.publishedAtUtc | date:'medium' }}</p>
            </div>
          </div>
        </div>

        <!-- Theme Toggle -->
        <button 
          (click)="toggleTheme()"
          class="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
          aria-label="Toggle Theme"
        >
          <svg *ngIf="!isDark()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <svg *ngIf="isDark()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>

        <!-- User Menu -->
        <div class="flex items-center gap-3 pl-4 border-l border-neutral-200">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-neutral-900">{{ userName() }}</p>
            <p class="text-xs text-neutral-500">{{ userRole() }}</p>
          </div>
          <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {{ userInitials() }}
          </div>
          <button 
            (click)="toggleUserMenu()"
            class="p-1 rounded hover:bg-neutral-100 transition-colors"
          >
            <svg class="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>

          <!-- User Dropdown -->
          <div 
            *ngIf="showUserMenu()"
            class="absolute top-16 right-6 bg-white rounded-lg shadow-lg border border-neutral-200 w-48 py-2 z-50"
          >
            <button class="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Settings
            </button>
            <button (click)="logout()" class="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TopbarComponent implements OnInit {
  @Output() onToggleSidebar = new EventEmitter<void>();

  private themeService = inject(ThemeService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private communication = inject(CommunicationService);

  isDark = this.themeService.isDark;
  showUserMenu = signal(false);
  showAnnouncements = signal(false);
  announcements = signal<Announcement[]>([]);
  className = classNameById;

  userName = computed(() => this.auth.currentUser()?.fullName ?? 'Guest');
  userRole = computed(() => this.auth.currentUser()?.role ?? '');
  userInitials = computed(() => {
    const name = this.auth.currentUser()?.fullName ?? 'G';
    return name
      .split(' ')
      .map((p) => p.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  });

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    const role = this.auth.currentUser()?.role;
    // Self-service roles are scoped to their own class too; staff/teacher see
    // everything relevant to their role across all classes.
    const classId = this.auth.isSelfService() ? (this.auth.classId() ?? undefined) : undefined;
    this.communication.listAnnouncements({ role, classId, pageSize: 10 }).subscribe({
      next: (list) => this.announcements.set(list ?? []),
      error: () => {},
    });
  }

  toggleAnnouncements(): void {
    this.showAnnouncements.update((v) => !v);
    this.showUserMenu.set(false);
    if (this.showAnnouncements()) this.loadAnnouncements();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleUserMenu(): void {
    this.showUserMenu.update((v) => !v);
    this.showAnnouncements.set(false);
  }

  logout(): void {
    this.auth.logout();
    this.showUserMenu.set(false);
    this.router.navigate(['/auth/login']);
  }
}
