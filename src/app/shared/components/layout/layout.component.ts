import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent],
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
  `,
  styles: [],
})
export class LayoutComponent {
  sidebarOpen = signal(true);

  toggleSidebar() {
    this.sidebarOpen.update((val) => !val);
  }
}
