import { afterEach, describe, expect, it } from 'vitest';
import { CookieKey } from '../../src/shared/constants/cookieKey';
import { ElapsedCounter } from '../../src/utils/elapsedCounter';

const maxSeconds = 60;
const sessionCounter = ElapsedCounter.getInstance(
  CookieKey.EmailResend,
  maxSeconds
);

describe('Elapsed Counter', () => {
  afterEach(() => {
    sessionCounter.resetTimer();
  });

  it(`should send time less than ${maxSeconds}`, async () => {
    const regressiveTime = await new Promise<number>((resolve) => {
      sessionCounter.startTimer({
        regressiveTime(time) {
          resolve(time);
        },
      });
    });

    expect(regressiveTime).toBeLessThan(maxSeconds);
  });

  it(`should send time greater than 0`, async () => {
    const elapsedTime = await new Promise<number>((resolve) => {
      sessionCounter.startTimer({
        elapsedTime(time) {
          resolve(time);
        },
      });
    });

    expect(elapsedTime).toBeGreaterThan(0);
  });
});
