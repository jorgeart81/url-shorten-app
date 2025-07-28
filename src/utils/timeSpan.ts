export class TimeSpan {
  private static _msPerSeconds = 1000;
  private static _msPerMinute = 60_000;
  private static _msPerHour = 3_600_000;
  private static _msPerDay = 86_400_000;

  static fromSeconds = (value: number) => value * TimeSpan._msPerSeconds;
  static fromMinutes = (value: number) => value * TimeSpan._msPerMinute;
  static fromHours = (value: number) => value * TimeSpan._msPerHour;
  static fromDays = (value: number) => value * TimeSpan._msPerDay;
}
