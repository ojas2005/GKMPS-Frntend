import { ThemedDateDirective } from './themed-date.directive';
import { ThemedSelectDirective } from './themed-select.directive';

export { ThemedDateDirective, ThemedSelectDirective };

/**
 * Add to a page's `imports` and its <select> and <input type="date"> fields use the themed
 * dropdown and calendar instead of the browser's own boxes.
 */
export const THEMED_FIELDS = [ThemedSelectDirective, ThemedDateDirective] as const;
