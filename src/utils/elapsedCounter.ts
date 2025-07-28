import { CookieHandler } from './cookies';

interface StartTimeOptions {
  elapsedTime?: (time: number) => void;
  regressiveTime?: (time: number) => void;
  reload?: boolean;
}

export class ElapsedCounter {
  private _elapsedCounter: number = -1;
  private _resendTime: number;
  private _maxSeconds: number;
  private _timerInterval: NodeJS.Timeout | undefined;

  private readonly key: string;
  private readonly maxSeconds: number;

  constructor(key: string, maxSeconds: number) {
    this.key = key;
    this.maxSeconds = maxSeconds;
    this._maxSeconds = maxSeconds;
    this._resendTime = Number(CookieHandler.getValue(key));
  }

  private calculateElapsedTime(resendTime: number): number {
    const elapsedTimeMs = Date.now() - resendTime;
    return Math.floor(elapsedTimeMs / 1000);
  }

  private saveCookie(): void {
    const expirationDate = new Date(Date.now() + (this.maxSeconds + 15) * 1000);
    CookieHandler.save(this.key, Date.now(), expirationDate);
  }

  cancelTimer(): void {
    clearInterval(this._timerInterval);
  }

  startTimer({
    elapsedTime,
    regressiveTime,
    reload = false,
  }: StartTimeOptions): void {
    if (this._timerInterval) return;
    if (Number.isNaN(this._resendTime) || this._resendTime <= 0) {
      if (reload) return;
      this._resendTime = Date.now();
      this.saveCookie();
    }

    const initialElapsed = this.calculateElapsedTime(this._resendTime);
    if (initialElapsed < 0 || initialElapsed > this.maxSeconds) return;
    this._elapsedCounter = initialElapsed;

    let currentElapsed = initialElapsed;

    this._timerInterval = setInterval(() => {
      currentElapsed++;
      this._elapsedCounter = currentElapsed;
      elapsedTime?.(this._elapsedCounter);
      regressiveTime?.(this._maxSeconds - this._elapsedCounter);

      if (currentElapsed >= this.maxSeconds) {
        this.resetTimer();
      }
    }, 1000);
  }

  resetTimer(): void {
    clearInterval(this._timerInterval);
    this._elapsedCounter = -1;
    this._resendTime = NaN;
    this._timerInterval = undefined;
    CookieHandler.delete(this.key);
  }
}
