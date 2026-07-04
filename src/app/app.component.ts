import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorComponent } from './shared/components/cursor/cursor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CursorComponent],
  template: `
    <router-outlet></router-outlet>
    <app-cursor></app-cursor>
  `,
  styles: [],
})
export class AppComponent {}
