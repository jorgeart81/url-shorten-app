/**
 * Checks if a URL code is valid based on minimum length and allowed characters.
 *
 * @param code - The code received from the URL (can be null).
 * @param minLength - The minimum length required for the code to be considered valid.
 * @returns true if the code is valid, false otherwise.
 *
 * A code is valid if:
 *  - It is not null or empty.
 *  - It has at least `minLength` characters (ignoring spaces).
 *  - It can be decoded with decodeURIComponent without error.
 *  - It only contains allowed characters: letters, numbers, dash, underscore, dot, tilde, plus, slash, and equals sign.
 */
export const isValidUrlCode = (code: string | null, minLength: number): boolean => {
  if (!code || code.trim().length < minLength) return false;

  try {
    const decoded = decodeURIComponent(code);

    return /^[\w\-._~+/=]+$/.test(decoded);
  } catch {
    return false;
  }
};
