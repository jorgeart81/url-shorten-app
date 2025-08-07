/**
 * Creates a debounced function that delays invoking the original function
 * until after the specified delay has elapsed since the last time it was called.
 *
 * Useful for limiting the rate at which a function is executed, such as in input, scroll, or resize events.
 *
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay.
 * @returns A new debounced function.
 *
 * @example
 * const debouncedLog = debounceTimeout(console.log, 300);
 * debouncedLog('hello'); // Will log 'hello' after 300ms if not called again before.
 */
export function debounceTimeout<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
