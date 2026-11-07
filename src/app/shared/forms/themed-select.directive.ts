import { ComponentRef, Directive } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { PanelOption, SelectPanelComponent } from './select-panel.component';
import { ThemedField } from './themed-field';

/**
 * Replaces the browser's boxed option menu of every single-choice <select> with a themed list
 * (light and dark). Keyboard works as on a native select: arrows, Home/End, Enter/Space,
 * Escape, and typing letters to jump. Add `nativeSelect` to a <select> to opt out.
 */
@Directive({
  selector: 'select:not([multiple]):not([nativeSelect])',
  standalone: true,
})
export class ThemedSelectDirective extends ThemedField<HTMLSelectElement> {
  protected readonly triggerClass = 'themed-select';
  protected readonly popupRole = 'listbox' as const;
  private panel: ComponentRef<SelectPanelComponent> | null = null;
  private active = -1;
  private lastText: string | null = null;
  private lastShape = '';
  private panelSig = '';
  private typed = '';
  private typedAt = 0;

  override ngOnInit(): void {
    super.ngOnInit();
    this.trigger.setAttribute('role', 'combobox');
  }

  protected render(): void {
    const option = this.host.selectedOptions[0];
    const text = option?.text ?? '';
    if (text !== this.lastText) {
      this.lastText = text;
      this.valueEl.textContent = text || 'Select…';
      this.setPlaceholder(!option || option.value === '' || option.disabled);
    }
    // Native selects are as wide as their longest option; keep that so the field
    // doesn't change width when the choice changes.
    const options = this.host.options;
    const shape = `${options.length}:${options[options.length - 1]?.text ?? ''}`;
    if (shape !== this.lastShape) {
      this.lastShape = shape;
      this.trigger.style.minWidth = `min(${this.widestOption()}px, 100%)`;
    }
    if (this.panel) this.refreshPanel();
  }

  /** Passes the options to the open list, only when they changed (this runs on every check). */
  private refreshPanel(): void {
    const options = this.readOptions();
    const sig = `${this.host.selectedIndex}|${options.map((o) => `${o.disabled ? 0 : 1}${o.text}`).join('\u0001')}`;
    if (sig === this.panelSig || !this.panel) return;
    this.panelSig = sig;
    this.panel.setInput('options', options);
    this.panel.setInput('selectedIndex', this.host.selectedIndex);
  }

  protected open(): void {
    if (this.overlayRef || this.host.disabled) return;
    const ref = this.createOverlay();
    ref.updateSize({ minWidth: this.trigger.getBoundingClientRect().width });
    this.panel = ref.attach(new ComponentPortal(SelectPanelComponent));
    this.panel.setInput('listboxId', `${this.uid}-popup`);
    this.panelSig = '';
    this.refreshPanel();
    this.panel.instance.picked.subscribe((i) => this.choose(i));
    this.panel.instance.hovered.subscribe((i) => this.setActive(i));
    ref.detachments().subscribe(() => (this.panel = null));
    this.setActive(this.host.selectedIndex >= 0 ? this.host.selectedIndex : this.step(-1, 1));
  }

  protected onKeydown(e: KeyboardEvent): void {
    const open = !!this.overlayRef;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        e.preventDefault();
        if (!open) return this.open();
        if (e.altKey) return this.choose(this.active);
        return this.setActive(this.step(this.active, e.key === 'ArrowDown' ? 1 : -1));
      }
      case 'Home':
      case 'End':
        if (!open) return;
        e.preventDefault();
        return this.setActive(e.key === 'Home' ? this.step(-1, 1) : this.step(this.host.options.length, -1));
      case 'PageDown':
      case 'PageUp': {
        if (!open) return;
        e.preventDefault();
        const dir = e.key === 'PageDown' ? 1 : -1;
        let i = this.active;
        for (let n = 0; n < 8; n++) i = this.step(i, dir);
        return this.setActive(i);
      }
      case 'Enter':
      case ' ':
        if (e.key === ' ' && this.typed && Date.now() - this.typedAt < 700) break; // a space inside typed text
        e.preventDefault();
        return open ? this.choose(this.active) : this.open();
      case 'F4':
        e.preventDefault();
        return open ? this.close(true) : this.open();
      case 'Escape':
        if (open) {
          e.preventDefault();
          this.close(true);
        }
        return;
      case 'Tab':
        if (open) this.close(false);
        return;
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) this.typeahead(e.key, open);
  }

  /** Typing letters jumps to the matching option, like a native select. */
  private typeahead(key: string, open: boolean): void {
    const now = Date.now();
    this.typed = now - this.typedAt > 700 ? key : this.typed + key;
    this.typedAt = now;
    const needle = this.typed.toLowerCase();
    const options = Array.from(this.host.options);
    const from = open ? this.active : this.host.selectedIndex;
    const order = [...options.keys()].map((k) => (k + (this.typed.length === 1 ? from + 1 : Math.max(from, 0))) % options.length);
    const match = order.find((i) => !options[i].disabled && options[i].text.trim().toLowerCase().startsWith(needle));
    if (match === undefined) return;
    if (open) this.setActive(match);
    else this.choose(match);
  }

  private choose(i: number): void {
    const option = this.host.options[i];
    if (!option || option.disabled) return;
    const changed = this.host.selectedIndex !== i;
    this.host.selectedIndex = i;
    this.close(true);
    if (changed) this.notifyChanged();
  }

  private setActive(i: number): void {
    if (!this.panel || i < 0 || i >= this.host.options.length) return;
    this.active = i;
    this.panel.setInput('activeIndex', i);
    this.trigger.setAttribute('aria-activedescendant', `${this.uid}-popup-opt-${i}`);
  }

  /** The next enabled option from `from` in direction `dir`, or `from` itself at the ends. */
  private step(from: number, dir: 1 | -1): number {
    const options = this.host.options;
    for (let i = from + dir; i >= 0 && i < options.length; i += dir) if (!options[i].disabled) return i;
    return from;
  }

  private readOptions(): PanelOption[] {
    return Array.from(this.host.options, (o) => ({ text: o.text, disabled: o.disabled, placeholder: o.value === '' }));
  }

  private widestOption(): number {
    const style = getComputedStyle(this.trigger);
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return 0;
    ctx.font = style.font;
    let widest = ctx.measureText('Select…').width;
    for (const o of Array.from(this.host.options)) widest = Math.max(widest, ctx.measureText(o.text).width);
    const box = ['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth']
      .reduce((sum, p) => sum + (parseFloat(style[p as keyof CSSStyleDeclaration] as string) || 0), 0);
    return Math.ceil(widest + box + 2);
  }
}
