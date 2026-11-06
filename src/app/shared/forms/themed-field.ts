import { Directive, DoCheck, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

let nextId = 0;

const BELOW: ConnectedPosition = { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 6 };
const ABOVE: ConnectedPosition = { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -6 };
const BELOW_END: ConnectedPosition = { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 6 };
const ABOVE_END: ConnectedPosition = { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -6 };

/**
 * Shared plumbing for the themed form controls. The native element stays in the page (hidden)
 * and keeps every binding -- ngModel, (change), [disabled] -- working unchanged. A button styled
 * like the field takes its place; its popup writes the choice back to the native element and
 * fires the same events the browser would.
 */
@Directive()
export abstract class ThemedField<T extends HTMLSelectElement | HTMLInputElement> implements OnInit, DoCheck, OnDestroy {
  protected readonly host: T = inject<ElementRef<T>>(ElementRef).nativeElement;
  protected readonly overlay = inject(Overlay);
  protected readonly uid = `themed-${++nextId}`;
  protected trigger!: HTMLButtonElement;
  protected valueEl!: HTMLSpanElement;
  protected overlayRef: OverlayRef | null = null;
  private outside?: Subscription;
  private lastClass = '';
  private isPlaceholder = false;

  /** Class put on the button next to the field's own classes (draws the icon). */
  protected abstract readonly triggerClass: string;
  protected abstract readonly popupRole: 'listbox' | 'dialog';
  /** Refreshes the button from the native element: text, disabled state, width. */
  protected abstract render(): void;
  protected abstract open(): void;
  protected abstract onKeydown(event: KeyboardEvent): void;

  ngOnInit(): void {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-haspopup', this.popupRole);
    b.setAttribute('aria-expanded', 'false');
    // The button takes over the field's identity so <label for="..."> and aria labels still point at it.
    if (this.host.id) {
      b.id = this.host.id;
      this.host.removeAttribute('id');
    }
    for (const attr of ['aria-label', 'aria-labelledby', 'aria-describedby', 'title']) {
      const value = this.host.getAttribute(attr);
      if (value !== null) b.setAttribute(attr, value);
    }
    this.valueEl = document.createElement('span');
    this.valueEl.className = 'themed-trigger-value';
    b.append(this.valueEl);
    b.addEventListener('click', () => (this.overlayRef ? this.close(true) : this.open()));
    b.addEventListener('keydown', (e) => this.onKeydown(e));

    this.host.insertAdjacentElement('afterend', b);
    this.host.classList.add('themed-native');
    this.host.setAttribute('aria-hidden', 'true');
    this.host.tabIndex = -1;
    this.trigger = b;
    this.ngDoCheck();
  }

  ngDoCheck(): void {
    if (!this.trigger) return;
    // The field's styling classes, without Angular's form-state ones (ng-pristine, ng-touched...).
    const cls = this.host.className.split(/\s+/).filter((c) => c && c !== 'themed-native' && !c.startsWith('ng-')).join(' ');
    if (cls !== this.lastClass) {
      this.lastClass = cls;
      this.trigger.className = `${cls} themed-trigger ${this.triggerClass}${this.isPlaceholder ? ' is-placeholder' : ''}`;
    }
    if (this.trigger.disabled !== this.host.disabled) {
      this.trigger.disabled = this.host.disabled;
      if (this.host.disabled) this.close(false);
    }
    this.render();
  }

  ngOnDestroy(): void {
    this.close(false);
    this.trigger?.remove();
  }

  protected createOverlay(alignEnd = false): OverlayRef {
    const ref = this.overlay.create({
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(this.trigger)
        .withPositions(alignEnd ? [BELOW_END, ABOVE_END, BELOW, ABOVE] : [BELOW, ABOVE, BELOW_END, ABOVE_END])
        .withViewportMargin(8)
        .withPush(false),
      scrollStrategy: this.overlay.scrollStrategies.reposition({ autoClose: true }),
      panelClass: 'themed-overlay',
    });
    this.outside = ref.outsidePointerEvents().subscribe((e) => {
      if (!this.trigger.contains(e.target as Node)) this.close(false);
    });
    // Also covers the overlay closing itself (the field scrolled out of view).
    ref.detachments().subscribe(() => {
      if (this.overlayRef === ref) {
        this.overlayRef = null;
        ref.dispose();
      }
      this.afterClose();
    });
    this.overlayRef = ref;
    this.trigger.setAttribute('aria-expanded', 'true');
    this.trigger.setAttribute('aria-controls', `${this.uid}-popup`);
    return ref;
  }

  close(refocus: boolean): void {
    if (!this.overlayRef) return;
    const ref = this.overlayRef;
    this.overlayRef = null;
    ref.dispose();
    this.afterClose();
    if (refocus) this.trigger.focus();
  }

  private afterClose(): void {
    if (this.trigger.getAttribute('aria-expanded') === 'false') return;
    this.outside?.unsubscribe();
    this.outside = undefined;
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.removeAttribute('aria-controls');
    this.trigger.removeAttribute('aria-activedescendant');
    this.host.dispatchEvent(new Event('blur')); // marks the control as touched
  }

  /** Greys the text out while nothing (or a "Select..." prompt) is chosen. */
  protected setPlaceholder(on: boolean): void {
    this.isPlaceholder = on;
    this.trigger.classList.toggle('is-placeholder', on);
  }

  /** Fires the events the browser sends after a user change, so ngModel and (change) see it. */
  protected notifyChanged(): void {
    this.host.dispatchEvent(new Event('input', { bubbles: true }));
    this.host.dispatchEvent(new Event('change', { bubbles: true }));
    this.render();
  }
}
