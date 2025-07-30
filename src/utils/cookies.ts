/**
 * Utility class for handling browser cookies.
 *
 * Provides static methods to save, retrieve, and delete cookies.
 *
 * Example usage:
 *   CookieHandler.save('token', 'abc123', new Date(Date.now() + 3600000)); // Save cookie for 1 hour
 *   const value = CookieHandler.getValue('token'); // Retrieve cookie value
 *   CookieHandler.delete('token'); // Delete cookie
 */
export class CookieHandler {
  /**
   * Saves a value in a cookie with a specified expiration date.
   * @param key The name of the cookie.
   * @param value The value to store (will be stringified).
   * @param expirationDate The expiration date of the cookie.
   */
  static save<T>(key: string, value: T, expirationDate: Date) {
    document.cookie = `${key}=${value}; path=/; expires=${expirationDate.toUTCString()};`;
  }

  /**
   * Retrieves the value of a cookie by its key.
   * @param key The name of the cookie.
   * @returns The cookie value as a string, or undefined if not found.
   */
  static getValue(key: string): string | undefined {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((c) => c.startsWith(`${key}=`));
    return cookie?.split('=')[1];
  }

  /**
   * Deletes a cookie by its key.
   * @param key The name of the cookie to delete.
   */
  static delete(key: string) {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}
