import { CookieHandler } from './cookies';

interface StartTimeOptions {
  elapsedTime?: (time: number) => void;
  regressiveTime?: (time: number) => void;
  reload?: boolean;
}

/**
 * ElapsedCounter is a singleton timer utility for tracking elapsed and regressive time,
 * typically used for countdowns or cooldowns (e.g., resend email codes).
 *
 * - Uses cookies to persist timer state across reloads.
 * - Provides methods to start, reset, and cancel the timer.
 * - Ensures only one instance per key (singleton pattern).
 *
 * Usage:
 *   const counter = ElapsedCounter.getInstance('myKey', 60);
 *   counter.startTimer({
 *     elapsedTime: (t) => setElapsed(t),
 *     regressiveTime: (t) => setRegressive(t),
 *   });
 *   counter.resetTimer();
 *   counter.cancelTimer();
 */
export class ElapsedCounter {
  private _elapsedCounter: number = -1;
  private _timerInterval: NodeJS.Timeout | undefined;

  private readonly _key: string;
  private readonly _maxSeconds: number;
  private _resendTime: number | null;

  private static elapsedCounterRegistry: Record<string, ElapsedCounter> = {};

  /**
   * Private constructor to enforce singleton usage.
   * Use ElapsedCounter.getInstance(key, maxSeconds) to get an instance.
   */
  private constructor(key: string, maxSeconds: number) {
    this._key = key;
    this._maxSeconds = maxSeconds;
    this._resendTime = this.getValidResendCookie(key);
  }

  private getValidResendCookie(key: string) {
    const cookieValue = CookieHandler.getValue(key);
    if (cookieValue == undefined) return null;

    const resendTime = Number(cookieValue);
    if (Number.isNaN(resendTime)) return null;

    return resendTime;
  }

  /**
   * Returns the singleton instance for a given key.
   * @param key Unique identifier for the timer (e.g., cookie key).
   * @param maxSeconds Maximum seconds for the timer.
   */
  static getInstance(key: string, maxSeconds: number): ElapsedCounter {
    if (!ElapsedCounter.elapsedCounterRegistry[key]) {
      ElapsedCounter.elapsedCounterRegistry[key] = new ElapsedCounter(
        key,
        maxSeconds
      );
    }
    return ElapsedCounter.elapsedCounterRegistry[key];
  }

  /**
   * Calculates the elapsed time in seconds since the timer started.
   * @param resendTime The timestamp when the timer started.
   * @returns Elapsed time in seconds.
   */
  private calculateElapsedTime(resendTime: number): number {
    const elapsedTimeMs = Date.now() - resendTime;
    return Math.floor(elapsedTimeMs / 1000);
  }

  /**
   * Saves the current timestamp in a cookie with a small buffer for expiration.
   */
  private saveCookie(): void {
    const expirationDate = new Date(
      Date.now() + (this._maxSeconds + 15) * 1000
    );
    CookieHandler.save(this._key, Date.now(), expirationDate);
  }

  /**
   * Cancels the timer interval without resetting state or cookies.
   */
  cancelTimer(): void {
    clearInterval(this._timerInterval);
  }

  /**
   * Starts the timer and calls the provided callbacks every second.
   * If a timer is already running, it does nothing.
   * @param options.elapsedTime Callback with the elapsed time (in seconds).
   * @param options.regressiveTime Callback with the regressive time (seconds left).
   * @param options.reload If true, only resumes if a valid resend time exists.
   */
  startTimer({
    elapsedTime,
    regressiveTime,
    reload = false,
  }: StartTimeOptions): void {
    if (this._timerInterval) return;
    if (this._resendTime == null || this._resendTime <= 0) {
      if (reload) return;
      this._resendTime = Date.now();
      this.saveCookie();
    }

    const initialElapsed = this.calculateElapsedTime(this._resendTime);
    if (initialElapsed < 0 || initialElapsed > this._maxSeconds) return;
    this._elapsedCounter = initialElapsed;

    let currentElapsed = initialElapsed;
    this._timerInterval = setInterval(() => {
      if (!this._resendTime) clearInterval(this._timerInterval);

      currentElapsed++;
      this._elapsedCounter = currentElapsed;
      elapsedTime?.(this._elapsedCounter);
      regressiveTime?.(this._maxSeconds - this._elapsedCounter);

      if (currentElapsed >= this._maxSeconds) {
        this.resetTimer();
      }
    }, 1000);
  }

  /**
   * Resets the timer, clears the interval, and removes the cookie.
   */
  resetTimer(): void {
    clearInterval(this._timerInterval);
    this._elapsedCounter = -1;
    this._resendTime = null;
    this._timerInterval = undefined;
    CookieHandler.delete(this._key);
  }
}
