import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NAV_ITEMS, NavItem } from '../../../core/constants/nav';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  ClipboardList, 
  BarChart3, 
  Zap, 
  MessageSquare, 
  Library, 
  Truck, 
  FileText, 
  Settings,
  X,
  GraduationCap,
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="w-64 bg-white border-r border-neutral-200 flex flex-col h-screen shadow-sm">
      <!-- Logo -->
      <div class="p-6 border-b border-neutral-200">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <div>
            <h1 class="font-bold text-lg text-neutral-900">School ERP</h1>
            <p class="text-xs text-neutral-500">Management System</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        <ng-container *ngFor="let item of navItems">
          <a 
            [routerLink]="item.route"
            routerLinkActive="bg-primary-50 text-primary-600"
            [routerLinkActiveOptions]="{ exact: false }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors group"
          >
            <span class="text-sm font-medium">{{ item.label }}</span>
          </a>
        </ng-container>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-neutral-200 bg-neutral-50">
        <p class="text-xs text-neutral-500 text-center">v1.0.0</p>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div 
      *ngIf="isOpen && isMobile()"
      class="fixed inset-0 bg-black/50 z-40"
      (click)="onClose.emit()"
    ></div>
  `,
  styles: [],
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() onClose = new EventEmitter<void>();

  private auth = inject(AuthService);

  // Only the items the current role is allowed to see.
  get navItems(): NavItem[] {
    return NAV_ITEMS.filter((item) => this.auth.hasRole(...item.roles));
  }

  isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }
}
