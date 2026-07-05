import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  kind: ToastKind;
  text: string;
  leaving?: boolean;
}

/**
 * App-wide, signal-based toasts. Any component can inject this and call
 * success()/error()/info(); the single <app-toast> mounted at the root renders
 * the stack. Toasts auto-dismiss, and dismiss() first flags `leaving` so the
 * container can play the slide-out before the item is removed.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private seq = 0;

  private show(text: string, kind: ToastKind, durationMs: number): void {
    const id = ++this.seq;
    this.toasts.update((list) => [...list, { id, kind, text }]);
    setTimeout(() => this.dismiss(id), durationMs);
  }

  success(text: string, durationMs = 4000): void { this.show(text, 'success', durationMs); }
  error(text: string, durationMs = 6000): void { this.show(text, 'error', durationMs); }
  info(text: string, durationMs = 4000): void { this.show(text, 'info', durationMs); }

  dismiss(id: number): void {
    // Flag for the exit animation, then drop it once the slide-out has run.
    this.toasts.update((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => this.toasts.update((list) => list.filter((t) => t.id !== id)), 240);
  }
}
