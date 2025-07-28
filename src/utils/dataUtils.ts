export function getShortFormattedDate(
  date: Date,
  locales: 'en-US' | 'es-ES' = 'en-US'
): string {
  return new Intl.DateTimeFormat(locales, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
