import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <div class="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
        <h1 class="text-3xl font-bold text-neutral-900">Settings</h1>
        <p class="text-neutral-600 mt-2">School branding, users, permissions, and system settings coming soon...</p>
      </div>
    </div>
  `,
})
export class SettingsComponent {}
