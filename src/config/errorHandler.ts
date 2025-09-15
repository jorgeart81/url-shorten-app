import type { ApiErrorResponse } from '@/services/api/genericResponse';
import { AxiosError } from 'axios';
import { Result } from './rop/result_T';

/**
 * Handles API errors and converts them to Result objects.
 *
 * @template T - The type that would have been returned on success
 * @param error - The error object to handle (typically from axios)
 * @returns A failed Result instance with appropriate error messages and codes
 */
export function errorHandler<T = unknown>(error: unknown): Result<T> {
  if (error instanceof AxiosError) {
    // Handle network errors (no response from server)
    if (
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNREFUSED' ||
      error.code === 'ECONNABORTED' ||
      !error.response
    ) {
      return Result.failure<T>(
        {
          general: [
            'Network error. Please check your internet connection and try again.',
          ],
        },
        error.response?.status,
        'NETWORK_ERROR'
      );
    }

    if (error.response) {
      const { status, data } = error.response;
      const apiError = data as ApiErrorResponse;

      // Use API errors or fallback to general error
      const errors = apiError.errors ?? {
        general: [apiError.detail || 'An error occurred.'],
      };

      if (errors.general?.includes('Maximum device limit reached.')) {
        return Result.failure<T>(errors, status, 'MAX_DEVICE_LIMIT_REACHED');
      }

      switch (status) {
        case 400:
          return Result.failure<T>(errors, status, 'INVALID_REQUEST');
        case 401:
          return Result.failure<T>(errors, status, 'INVALID_CREDENTIALS');
        case 403:
          return Result.failure<T>(errors, status, 'ACCESS_DENIED');
        case 409:
          return Result.failure<T>(errors, status, 'CONFLICT');
        case 429:
          return Result.failure<T>(errors, status, 'TOO_MANY_REQUESTS');
        case 500:
          return Result.failure<T>(errors, status, 'SERVER_ERROR');
        default:
          return Result.failure<T>(
            { general: ['An unexpected error occurred.'] },
            status,
            'UNKNOWN'
          );
      }
    }
  }

  // Handle non-Axios errors
  return Result.failure<T>(
    { general: ['An unexpected error occurred.'] },
    500,
    'UNKNOWN'
  );
}
