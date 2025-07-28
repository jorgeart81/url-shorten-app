export class CookieHandler {
  static save<T>(key: string, value: T, expirationDate: Date) {
    document.cookie = `${key}=${value}; path=/; expires=${expirationDate.toUTCString()};`;
  }

  static getValue(key: string): string | undefined {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((c) => c.startsWith(`${key}=`));
    return cookie?.split('=')[1];
  }

  static delete(key: string) {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}
