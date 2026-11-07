import { Injectable, NgZone, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiBaseUrl } from '../config/runtime-config';
import { AuthService } from './auth.service';
import {
  idleTimeoutMinutes, lastActivity, msSinceServerContact, noteServerContact, recordActivity,
} from './session-activity';

const WARN_BEFORE_MS = 60_000;          // show the "still there?" warning a minute before
const CHECK_EVERY_MS = 5_000;
const HEARTBEAT_AFTER_MS = 2 * 60_000;  // tell the server we're active if it hasn't heard from us
const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'wheel', 'scroll', 'touchstart'] as const;

/**
 * Signs the user out after a stretch of no activity, and keeps the session alive while they
 * are active. Activity means the person using the page (mouse, keyboard, touch, scrolling) --
 * nothing the app does on its own counts.
 *
 * The server enforces the same timeout (plus a few minutes' grace), so closing the laptop or
 * the tab doesn't keep a session open; this side exists to warn first and to sign out cleanly.
 */
@Injectable({ providedIn: 'root' })
export class IdleService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private zone = inject(NgZone);

  /** Seconds until sign-out while the warning is showing, otherwise null. */
  readonly secondsLeft = signal<number | null>(null);

  private timer: ReturnType<typeof setInterval> | null = null;
  private lastEventHandled = 0;
  private heartbeatInFlight = false;

  private readonly onActivity = () => {
    // Once the warning is up, only its buttons answer it. Otherwise the mouse press on
    // "Sign out" would count as activity and close the dialog before the click landed.
    if (this.secondsLeft() !== null) return;
    const now = Date.now();
    if (now - this.lastEventHandled < 1_000) return; // mousemove fires constantly
    this.lastEventHandled = now;
    recordActivity(now);
    this.heartbeatIfQuiet();
  };

  private readonly onVisible = () => {
    if (document.visibilityState === 'visible') this.check();
  };

  start(): void {
    if (this.timer || typeof window === 'undefined') return;
    recordActivity();
    // Outside Angular: these fire constantly and shouldn't trigger change detection.
    this.zone.runOutsideAngular(() => {
      ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, this.onActivity, { passive: true }));
      document.addEventListener('visibilitychange', this.onVisible);
      this.timer = setInterval(() => this.check(), CHECK_EVERY_MS);
    });
  }

  stop(): void {
    if (typeof window === 'undefined') return;
    ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, this.onActivity));
    document.removeEventListener('visibilitychange', this.onVisible);
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.secondsLeft.set(null);
  }

  /** "Stay signed in" on the warning. */
  stayActive(): void {
    recordActivity();
    this.secondsLeft.set(null);
    this.heartbeatIfQuiet(true);
  }

  signOutNow(): void {
    this.stop();
    this.auth.logout('manual');
    this.router.navigate(['/auth/login']);
  }

  private check(): void {
    if (!this.auth.isLoggedIn()) return;
    // Measured from timestamps, not by counting timer ticks, so a laptop waking from sleep
    // (when timers were paused) is still signed out if it was away too long.
    const left = idleTimeoutMinutes() * 60_000 - (Date.now() - lastActivity());
    this.zone.run(() => {
      if (left <= 0) {
        this.stop();
        this.auth.logout('idle');
        this.router.navigate(['/auth/login']);
      } else if (left <= WARN_BEFORE_MS) {
        this.secondsLeft.set(Math.ceil(left / 1000));
      } else if (this.secondsLeft() !== null) {
        this.secondsLeft.set(null); // activity in another tab
      }
    });
  }

  private heartbeatIfQuiet(force = false): void {
    if (this.heartbeatInFlight || (!force && msSinceServerContact() < HEARTBEAT_AFTER_MS)) return;
    this.heartbeatInFlight = true;
    noteServerContact();
    this.zone.run(() =>
      this.http.post(`${apiBaseUrl()}/api/sessions/heartbeat`, {}).subscribe({
        next: () => (this.heartbeatInFlight = false),
        error: () => (this.heartbeatInFlight = false), // a 401 is handled by the interceptor
      }),
    );
  }
}
