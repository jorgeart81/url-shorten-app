import { describe, expect, it } from 'vitest';
import { isValidUrlCode } from '../../src/utils/validateCode';

const validCode =
  'CfDJ8IAuX9dAM6tPmJrWwDU9HuZRupldAg2Z0wwAyHAdkIlqMoCc38Rb7_nwJATCotCyZlHsLzqtWLmhvBJS76f4Swm9xZQn3VaGJ8YD7svM_DmzeecgD42I';
const invalidCode = `abc123_./+=-~XYZ!@#%^&*()[]{}<>? abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321$$$$%%%%^^^^&&&&****((((()))))----++++`;

describe('isValidUrlCode method', () => {
  it('should return true for a code with at least 100 allowed characters', () => {
    const isValid = isValidUrlCode(validCode, 100);
    expect(isValid).toBeTruthy();
  });

  it('should return false for a code with less than 100 allowed characters', () => {
    const isValid = isValidUrlCode(validCode.slice(0, 99), 100);
    expect(isValid).toBeFalsy();
  });

  it('should return false for a code with at least 100 not allowed characters', () => {
    const isValid = isValidUrlCode(invalidCode, 100);
    expect(isValid).toBeFalsy();
  });
});
