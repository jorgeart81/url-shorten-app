export type Locales = 'en-US' | 'es-ES';

export function getShortFormattedDate(
  date: Date,
  locales: Locales = 'en-US'
): string {
  return new Intl.DateTimeFormat(locales, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
