import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorComponent } from './shared/components/cursor/cursor.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CursorComponent, ToastComponent],
  template: `
    <router-outlet></router-outlet>
    <app-toast></app-toast>
    <app-cursor></app-cursor>
  `,
  styles: [],
})
export class AppComponent {}
