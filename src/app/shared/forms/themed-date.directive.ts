import { ComponentRef, Directive } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { CalendarPanelComponent, parseIso } from './calendar-panel.component';
import { ThemedField } from './themed-field';

const DISPLAY = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

/**
 * Replaces the browser's calendar of every <input type="date"> with a themed one (light and
 * dark): month and year jumps for dates far away such as a date of birth, Today and Clear, and
 * full keyboard use (arrows, Page Up/Down for months, Shift+Page for years, Enter, Escape).
 * The field still holds "yyyy-mm-dd", so bindings and min/max work as before. Add `nativeDate`
 * to opt out.
 */
@Directive({
  selector: 'input[type=date]:not([nativeDate])',
  standalone: true,
})
export class ThemedDateDirective extends ThemedField<HTMLInputElement> {
  protected readonly triggerClass = 'themed-date';
  protected readonly popupRole = 'dialog' as const;
  private panel: ComponentRef<CalendarPanelComponent> | null = null;
  private lastValue: string | null = null;

  protected render(): void {
    const value = this.host.value;
    if (value === this.lastValue) return;
    this.lastValue = value;
    const date = parseIso(value);
    this.valueEl.textContent = date ? DISPLAY.format(date) : 'dd mmm yyyy';
    this.setPlaceholder(!date);
    const label = this.host.getAttribute('aria-label');
    // Read the chosen date out with the field's name, e.g. "From date, 07 Nov 2026".
    if (label) this.trigger.setAttribute('aria-label', date ? `${label}, ${DISPLAY.format(date)}` : label);
  }

  protected open(): void {
    if (this.overlayRef || this.host.disabled || this.host.readOnly) return;
    const ref = this.createOverlay();
    this.panel = ref.attach(new ComponentPortal(CalendarPanelComponent));
    this.panel.setInput('value', this.host.value);
    this.panel.setInput('min', this.host.min);
    this.panel.setInput('max', this.host.max);
    this.panel.setInput('required', this.host.required);
    this.panel.setInput('panelId', `${this.uid}-popup`);
    this.panel.instance.picked.subscribe((iso) => this.set(iso));
    this.panel.instance.cleared.subscribe(() => this.set(''));
    this.panel.instance.closed.subscribe(() => this.close(true));
    ref.detachments().subscribe(() => (this.panel = null));
    this.panel.changeDetectorRef.detectChanges();
    this.panel.instance.start();
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.open();
    } else if ((e.key === 'Delete' || e.key === 'Backspace') && this.host.value && !this.host.required) {
      e.preventDefault();
      this.set('');
    }
  }

  private set(iso: string): void {
    const changed = this.host.value !== iso;
    this.host.value = iso;
    this.close(true);
    if (changed) this.notifyChanged();
  }
}
