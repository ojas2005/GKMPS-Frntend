import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, output, signal } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

type View = 'days' | 'months' | 'years';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const YEARS_PER_PAGE = 12;

/** "yyyy-mm-dd" (what a date input holds) to a local date, or null. */
export function parseIso(value: string | null | undefined): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return isNaN(d.getTime()) ? null : d;
}

export function toIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** Moves by whole months, keeping the day where the month allows (31 Jan + 1 month = 28/29 Feb). */
function addMonths(d: Date, n: number): Date {
  const first = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return new Date(first.getFullYear(), first.getMonth(), Math.min(d.getDate(), last));
}

interface Day { date: Date; iso: string; inMonth: boolean; disabled: boolean; label: string }

/** The themed calendar shown for a date field (see ThemedDateDirective). */
@Component({
  selector: 'app-calendar-panel',
  standalone: true,
  imports: [A11yModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="themed-panel themed-calendar" role="dialog" aria-modal="true" [id]="panelId()"
         [attr.aria-label]="'Choose a date'" cdkTrapFocus (keydown)="onKeydown($event)">
      <div class="cal-head">
        <button type="button" class="cal-nav" (click)="page(-1)" [attr.aria-label]="prevLabel()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button type="button" class="cal-title" (click)="zoomOut()" [attr.aria-label]="titleHint()">
          {{ title() }}
          @if (view() !== 'years') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>
          }
        </button>
        <button type="button" class="cal-nav" (click)="page(1)" [attr.aria-label]="nextLabel()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>

      @switch (view()) {
        @case ('days') {
          <div class="cal-grid cal-weekdays" aria-hidden="true">
            @for (w of weekdays; track w) { <span>{{ w }}</span> }
          </div>
          <div class="cal-grid" role="grid" [attr.aria-label]="title()">
            @for (d of days(); track d.iso) {
              <button type="button" class="cal-day" role="gridcell"
                [attr.data-iso]="d.iso"
                [attr.aria-label]="d.label"
                [attr.aria-selected]="d.iso === value()"
                [attr.aria-current]="d.iso === todayIso ? 'date' : null"
                [tabindex]="d.iso === cursorIso() ? 0 : -1"
                [disabled]="d.disabled"
                [class.is-outside]="!d.inMonth"
                [class.is-today]="d.iso === todayIso"
                [class.is-selected]="d.iso === value()"
                (click)="pick(d.date)">{{ d.date.getDate() }}</button>
            }
          </div>
        }
        @case ('months') {
          <div class="cal-grid cal-grid-3">
            @for (m of monthNames; track m; let i = $index) {
              <button type="button" class="cal-cell"
                [attr.data-month]="i"
                [tabindex]="i === cursor().getMonth() ? 0 : -1"
                [class.is-selected]="isSelectedMonth(i)"
                [class.is-today]="i === today.getMonth() && cursor().getFullYear() === today.getFullYear()"
                (click)="pickMonth(i)">{{ m.slice(0, 3) }}</button>
            }
          </div>
        }
        @case ('years') {
          <div class="cal-grid cal-grid-3">
            @for (y of years(); track y) {
              <button type="button" class="cal-cell"
                [attr.data-year]="y"
                [tabindex]="y === cursor().getFullYear() ? 0 : -1"
                [class.is-selected]="y === selected()?.getFullYear()"
                [class.is-today]="y === today.getFullYear()"
                (click)="pickYear(y)">{{ y }}</button>
            }
          </div>
        }
      }

      <div class="cal-foot">
        <button type="button" class="cal-link" (click)="pick(today)" [disabled]="isDisabled(today)">Today</button>
        @if (value() && !required()) {
          <button type="button" class="cal-link cal-link-muted" (click)="cleared.emit()">Clear</button>
        }
      </div>
    </div>
  `,
})
export class CalendarPanelComponent {
  readonly value = input('');
  readonly min = input('');
  readonly max = input('');
  readonly required = input(false);
  readonly panelId = input('');
  readonly picked = output<string>();
  readonly cleared = output<void>();
  readonly closed = output<void>();

  readonly weekdays = WEEKDAYS;
  readonly monthNames = MONTHS;
  readonly today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  readonly todayIso = toIso(this.today);

  readonly view = signal<View>('days');
  readonly cursor = signal<Date>(this.today);
  readonly selected = computed(() => parseIso(this.value()));
  readonly cursorIso = computed(() => toIso(this.cursor()));
  private readonly minDate = computed(() => parseIso(this.min()));
  private readonly maxDate = computed(() => parseIso(this.max()));
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly days = computed<Day[]>(() => {
    const c = this.cursor();
    const first = new Date(c.getFullYear(), c.getMonth(), 1);
    const start = addDays(first, -first.getDay());
    const fmt = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return Array.from({ length: 42 }, (_, i) => {
      const date = addDays(start, i);
      return { date, iso: toIso(date), inMonth: date.getMonth() === c.getMonth(), disabled: this.isDisabled(date), label: fmt.format(date) };
    });
  });

  readonly years = computed(() => {
    const y = this.cursor().getFullYear();
    const start = y - (((y % YEARS_PER_PAGE) + YEARS_PER_PAGE) % YEARS_PER_PAGE);
    return Array.from({ length: YEARS_PER_PAGE }, (_, i) => start + i);
  });

  readonly title = computed(() => {
    const c = this.cursor();
    switch (this.view()) {
      case 'days': return `${MONTHS[c.getMonth()]} ${c.getFullYear()}`;
      case 'months': return `${c.getFullYear()}`;
      case 'years': { const ys = this.years(); return `${ys[0]} – ${ys[ys.length - 1]}`; }
    }
  });
  readonly titleHint = computed(() =>
    this.view() === 'days' ? `${this.title()}, choose another month or year` : this.view() === 'months' ? `${this.title()}, choose another year` : this.title());
  readonly prevLabel = computed(() => ({ days: 'Previous month', months: 'Previous year', years: 'Earlier years' })[this.view()]);
  readonly nextLabel = computed(() => ({ days: 'Next month', months: 'Next year', years: 'Later years' })[this.view()]);

  /** Called by the directive once inputs are set: start on the chosen date (or today) and focus it. */
  start(): void {
    const d = this.selected() ?? this.clamp(this.today);
    this.cursor.set(d);
    this.focusCursor();
  }

  isDisabled(d: Date): boolean {
    const min = this.minDate(), max = this.maxDate();
    return (!!min && d < min) || (!!max && d > max);
  }

  isSelectedMonth(m: number): boolean {
    const s = this.selected();
    return !!s && s.getMonth() === m && s.getFullYear() === this.cursor().getFullYear();
  }

  pick(d: Date): void {
    if (!this.isDisabled(d)) this.picked.emit(toIso(d));
  }

  pickMonth(m: number): void {
    this.cursor.set(this.clamp(addMonths(this.cursor(), m - this.cursor().getMonth())));
    this.view.set('days');
    this.focusCursor();
  }

  pickYear(y: number): void {
    this.cursor.set(addMonths(this.cursor(), (y - this.cursor().getFullYear()) * 12));
    this.view.set('months');
    this.focusCursor();
  }

  zoomOut(): void {
    if (this.view() === 'days') this.view.set('months');
    else if (this.view() === 'months') this.view.set('years');
    this.focusCursor();
  }

  page(dir: 1 | -1): void {
    const step = { days: 1, months: 12, years: 12 * YEARS_PER_PAGE }[this.view()];
    this.cursor.set(addMonths(this.cursor(), dir * step));
    this.focusCursor(false);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (this.view() !== 'days') { this.view.set(this.view() === 'years' ? 'months' : 'days'); this.focusCursor(); }
      else this.closed.emit();
      return;
    }
    const target = e.target as HTMLElement;
    if (!target.matches('.cal-day, .cal-cell')) return;
    const view = this.view();
    const c = this.cursor();
    const down = view === 'days' ? 7 : 3; // rows hold 7 days, or 3 months / years
    let next: Date | null = null;
    const move = (n: number) =>
      view === 'days' ? addDays(c, n) : view === 'months' ? addMonths(c, n) : addMonths(c, n * 12);
    switch (e.key) {
      case 'ArrowLeft': next = move(-1); break;
      case 'ArrowRight': next = move(1); break;
      case 'ArrowUp': next = move(-down); break;
      case 'ArrowDown': next = move(down); break;
      case 'Home': next = view === 'days' ? addDays(c, -c.getDay()) : null; break;
      case 'End': next = view === 'days' ? addDays(c, 6 - c.getDay()) : null; break;
      case 'PageUp': next = addMonths(c, e.shiftKey ? -12 : -1); break;
      case 'PageDown': next = addMonths(c, e.shiftKey ? 12 : 1); break;
      default: return;
    }
    e.preventDefault();
    if (next) {
      this.cursor.set(next);
      this.focusCursor();
    }
  }

  private clamp(d: Date): Date {
    const min = this.minDate(), max = this.maxDate();
    if (min && d < min) return min;
    if (max && d > max) return max;
    return d;
  }

  /** Moves keyboard focus to the cell under the cursor once the view has re-rendered. */
  private focusCursor(focus = true): void {
    if (!focus) return;
    setTimeout(() => {
      const root = this.host.nativeElement;
      const c = this.cursor();
      const selector = { days: `[data-iso="${toIso(c)}"]`, months: `[data-month="${c.getMonth()}"]`, years: `[data-year="${c.getFullYear()}"]` }[this.view()];
      root.querySelector<HTMLElement>(selector)?.focus();
    });
  }
}
