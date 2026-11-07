import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { IdleWarningComponent } from '../idle-warning/idle-warning.component';
import { IdleService } from '../../../core/auth/idle.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent, IdleWarningComponent],
  template: `
    <div class="flex h-screen bg-neutral-50">
      <!-- Sidebar -->
      <app-sidebar
        *ngIf="sidebarOpen()"
        [isOpen]="sidebarOpen()"
        (onClose)="sidebarOpen.set(false)"
      ></app-sidebar>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Topbar -->
        <app-topbar (onToggleSidebar)="toggleSidebar()"></app-topbar>

        <!-- Page Content -->
        <main class="flex-1 overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
    <app-idle-warning></app-idle-warning>
  `,
  styles: [],
})
export class LayoutComponent implements OnInit, OnDestroy {
  // Every signed-in page renders inside this layout, so it owns the inactivity timer.
  private idle = inject(IdleService);

  ngOnInit(): void {
    this.idle.start();
  }

  ngOnDestroy(): void {
    this.idle.stop();
  }

  // Open by default on desktop; on phones it starts closed and opens from the menu button.
  sidebarOpen = signal(typeof window === 'undefined' || window.innerWidth >= 768);

  toggleSidebar() {
    this.sidebarOpen.update((val) => !val);
  }
}
