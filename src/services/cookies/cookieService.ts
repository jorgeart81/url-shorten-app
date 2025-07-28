import { CookieHandler } from '@/utils/cookies';
import { TimeSpan } from '@/utils/timeSpan';
import { CookieKey } from './cookieKey';

export class CookieService {
  static authSession = CookieHandler.getValue(CookieKey.AuthSession) as
    | 'keep'
    | 'temp'
    | undefined;

  static deleteAuthSession(): void {
    CookieHandler.delete(CookieKey.AuthSession);
  }

  static saveAuthSession(keepLoggedIn: boolean): void {
    CookieHandler.save(
      CookieKey.AuthSession,
      keepLoggedIn ? 'keep' : 'temp',
      new Date(
        Date.now() +
          (keepLoggedIn ? TimeSpan.fromDays(1) : TimeSpan.fromMinutes(25))
      )
    );
  }
}
