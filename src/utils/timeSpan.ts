/**
 * Utility class for converting time units to milliseconds.
 *
 * Provides static methods to easily convert seconds, minutes, hours, and days to milliseconds.
 *
 * Example usage:
 *   TimeSpan.fromSeconds(5); // 5000
 *   TimeSpan.fromMinutes(2); // 120000
 *   TimeSpan.fromHours(1);   // 3600000
 *   TimeSpan.fromDays(1);    // 86400000
 */
export class TimeSpan {
  private static _msPerSeconds = 1000;
  private static _msPerMinute = 60_000;
  private static _msPerHour = 3_600_000;
  private static _msPerDay = 86_400_000;

  /**
   * Converts seconds to milliseconds.
   * @param value Number of seconds.
   * @returns Milliseconds.
   */
  static fromSeconds = (value: number) => value * TimeSpan._msPerSeconds;

  /**
   * Converts minutes to milliseconds.
   * @param value Number of minutes.
   * @returns Milliseconds.
   */
  static fromMinutes = (value: number) => value * TimeSpan._msPerMinute;

  /**
   * Converts hours to milliseconds.
   * @param value Number of hours.
   * @returns Milliseconds.
   */
  static fromHours = (value: number) => value * TimeSpan._msPerHour;

  /**
   * Converts days to milliseconds.
   * @param value Number of days.
   * @returns Milliseconds.
   */
  static fromDays = (value: number) => value * TimeSpan._msPerDay;
}
