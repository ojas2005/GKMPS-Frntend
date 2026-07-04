import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';

/**
 * Custom glowing cursor: a precise dot that tracks the pointer 1:1 plus a soft
 * translucent glow ring that trails it with easing. The ring swells over
 * interactive elements and contracts on press. Runs entirely outside Angular's
 * zone (rAF + direct style writes) so it never triggers change detection.
 * Hidden automatically on touch devices via the (pointer: fine) media query.
 */
@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <div #ring class="cursor-ring" aria-hidden="true"></div>
    <div #dot class="cursor-dot" aria-hidden="true"></div>
  `,
  styles: [`
    .cursor-dot,
    .cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 99999;
      opacity: 0;
      will-change: transform;
    }

    .cursor-dot {
      width: 7px;
      height: 7px;
      margin: -3.5px 0 0 -3.5px;
      border-radius: 9999px;
      background: #0ea5e9;
      box-shadow: 0 0 8px 1px rgba(14, 165, 233, 0.8);
      transition: opacity 0.25s ease;
    }

    .cursor-ring {
      width: 42px;
      height: 42px;
      margin: -21px 0 0 -21px;
      border-radius: 9999px;
      border: 1.5px solid rgba(14, 165, 233, 0.55);
      background: radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, rgba(14, 165, 233, 0.05) 55%, transparent 72%);
      box-shadow:
        0 0 18px 2px rgba(14, 165, 233, 0.28),
        inset 0 0 12px rgba(14, 165, 233, 0.18);
      transition: opacity 0.25s ease;
    }

    /* Only exists on precise pointers — never rendered for touch. */
    @media (pointer: coarse) {
      .cursor-dot,
      .cursor-ring {
        display: none;
      }
    }
  `],
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dot') dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('ring') ringRef!: ElementRef<HTMLDivElement>;

  private zone = inject(NgZone);
  private rafId = 0;
  private mouseX = -100;
  private mouseY = -100;
  private ringX = -100;
  private ringY = -100;
  private ringScale = 1;
  private targetScale = 1;
  private visible = false;
  private pressed = false;
  private cleanupFns: Array<() => void> = [];

  private static readonly INTERACTIVE =
    'a, button, input, select, textarea, label, [role="button"], tr.cursor-pointer, summary';

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const dot = this.dotRef.nativeElement;
    const ring = this.ringRef.nativeElement;

    this.zone.runOutsideAngular(() => {
      const on = <K extends keyof DocumentEventMap>(type: K, fn: (e: DocumentEventMap[K]) => void) => {
        document.addEventListener(type, fn, { passive: true });
        this.cleanupFns.push(() => document.removeEventListener(type, fn));
      };

      on('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        if (!this.visible) {
          this.visible = true;
          dot.style.opacity = '1';
          ring.style.opacity = '1';
        }
        const target = e.target as Element | null;
        const interactive = !!target?.closest?.(CursorComponent.INTERACTIVE);
        this.targetScale = this.pressed ? 0.75 : interactive ? 1.7 : 1;
        ring.style.borderColor = interactive ? 'rgba(14,165,233,0.85)' : 'rgba(14,165,233,0.55)';
      });

      on('mousedown', () => { this.pressed = true; this.targetScale = 0.75; });
      on('mouseup', () => { this.pressed = false; });

      const hide = () => {
        this.visible = false;
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      };
      document.documentElement.addEventListener('mouseleave', hide);
      this.cleanupFns.push(() => document.documentElement.removeEventListener('mouseleave', hide));

      const loop = () => {
        // Dot snaps to the pointer; the glow ring eases toward it.
        dot.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
        this.ringX += (this.mouseX - this.ringX) * 0.16;
        this.ringY += (this.mouseY - this.ringY) * 0.16;
        this.ringScale += (this.targetScale - this.ringScale) * 0.18;
        ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) scale(${this.ringScale})`;
        this.rafId = requestAnimationFrame(loop);
      };
      this.rafId = requestAnimationFrame(loop);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.cleanupFns.forEach((fn) => fn());
  }
}
