import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, input, output } from '@angular/core';

export interface PanelOption {
  text: string;
  disabled: boolean;
  /** An empty-value prompt such as "Select class". */
  placeholder: boolean;
}

/** The themed option list shown under a select (see ThemedSelectDirective). */
@Component({
  selector: 'app-select-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="themed-panel themed-listbox" role="listbox" [id]="listboxId()">
      @for (o of options(); track $index) {
        <li role="option"
            [id]="listboxId() + '-opt-' + $index"
            [attr.aria-selected]="$index === selectedIndex()"
            [attr.aria-disabled]="o.disabled || null"
            [class.is-active]="$index === activeIndex()"
            [class.is-selected]="$index === selectedIndex()"
            [class.is-disabled]="o.disabled"
            [class.is-placeholder]="o.placeholder"
            (mousedown)="$event.preventDefault()"
            (mouseenter)="hovered.emit($index)"
            (click)="!o.disabled && picked.emit($index)">
          <span class="themed-option-text">{{ o.text || '—' }}</span>
          @if ($index === selectedIndex()) {
            <svg class="themed-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          }
        </li>
      } @empty {
        <li class="themed-option-empty" role="presentation">No options</li>
      }
    </ul>
  `,
})
export class SelectPanelComponent {
  readonly options = input<PanelOption[]>([]);
  readonly selectedIndex = input(-1);
  readonly activeIndex = input(-1);
  readonly listboxId = input('');
  readonly picked = output<number>();
  readonly hovered = output<number>();

  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Keep the highlighted option in view while moving through a long list with the keyboard.
    effect(() => {
      const i = this.activeIndex();
      queueMicrotask(() =>
        this.host.nativeElement.querySelector<HTMLElement>(`[id$="-opt-${i}"]`)?.scrollIntoView({ block: 'nearest' }));
    });
  }
}
