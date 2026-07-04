import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      const prefersDark =
        stored === 'dark' ||
        (stored === null &&
          window.matchMedia?.('(prefers-color-scheme: dark)').matches);
      this.setDark(prefersDark);
    }
  }

  toggle(): void {
    this.setDark(!this.isDark());
  }

  setDark(dark: boolean): void {
    this.isDark.set(dark);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    }
  }
}
