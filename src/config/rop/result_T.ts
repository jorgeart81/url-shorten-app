import { HttpStatusCode } from 'axios';
import type { ResultErrorCode } from './resultErrorCode';

// API error object type definition
export type ErrorObject = Record<string, string[] | undefined>;

/**
 * Result pattern implementation for handling success and error states.
 * Provides a consistent way to handle API responses and error scenarios.
 *
 * @template T - The type of the success value
 */
export class Result<T> {
  readonly value: T | undefined;
  readonly errors: ErrorObject;
  readonly statusCode?: number;
  readonly errorCode?: ResultErrorCode;

  /**
   * Indicates whether the operation was successful.
   * Returns true if there are no errors and no error code.
   */
  get success(): boolean {
    return (
      Object.keys(this.errors).length === 0 && this.errorCode === undefined
    );
  }

  /**
   * Creates a new Result instance.
   *
   * @param value - The success value or undefined for failures
   * @param errors - Object containing error messages grouped by field/category
   * @param statusCode - Optional HTTP status code
   * @param errorCode - Optional application-specific error code
   */
  constructor(
    value: T | undefined,
    errors: ErrorObject,
    statusCode?: HttpStatusCode,
    errorCode?: ResultErrorCode
  ) {
    this.value = value;
    this.errors = errors;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  /**
   * Creates a successful Result with the provided value.
   *
   * @template T - The type of the success value
   * @param value - The success value to wrap
   * @param statusCode - HTTP status code (defaults to 200 OK)
   * @returns A successful Result instance
   */
  static success<T>(
    value?: T,
    statusCode: HttpStatusCode = HttpStatusCode.Ok
  ): Result<T> {
    return new Result<T>(value, {}, statusCode, undefined);
  }

  /**
   * Creates a failed Result with the provided errors.
   *
   * @template T - The type that would have been returned on success
   * @param errors - Object containing error messages grouped by field/category
   * @param statusCode - Optional HTTP status code
   * @param errorCode - Optional application-specific error code
   * @returns A failed Result instance
   */
  static failure<T>(
    errors: ErrorObject,
    statusCode?: HttpStatusCode,
    errorCode?: ResultErrorCode
  ): Result<T> {
    return new Result<T>(undefined as T, errors, statusCode, errorCode);
  }

  /**
   * Helper method to create a simple error Result with a single general message.
   *
   * @template T - The type that would have been returned on success
   * @param message - The error message to include
   * @param statusCode - Optional HTTP status code
   * @param errorCode - Optional application-specific error code
   * @returns A failed Result instance with the message in the general errors array
   */
  static simpleError<T>(
    message: string,
    statusCode?: HttpStatusCode,
    errorCode?: ResultErrorCode
  ): Result<T> {
    return Result.failure<T>({ general: [message] }, statusCode, errorCode);
  }

  /**
   * Gets all error messages from all fields as a flat array.
   * Useful for displaying all errors at once or logging.
   *
   * @returns Array of all error messages across all fields
   */
  get allErrors(): string[] {
    const allErrors: string[] = [];
    Object.values(this.errors).forEach((errorArray) => {
      if (errorArray) {
        allErrors.push(...errorArray);
      }
    });
    return allErrors;
  }

  /**
   * Gets only the general error messages.
   * These are typically application-level errors not tied to specific fields.
   *
   * @returns Array of general error messages
   */
  get generalErrors(): string[] {
    return this.errors.general || [];
  }

  /**
   * Shorthand alias for creating a failed Result.
   * Provides a more concise way to create error results.
   *
   * @template T - The type that would have been returned on success
   * @param errors - Object containing error messages grouped by field/category
   * @param statusCode - Optional HTTP status code
   * @returns A failed Result instance
   */
  static err = <T>(
    errors: ErrorObject,
    statusCode?: HttpStatusCode
  ): Result<T> => Result.failure<T>(errors, statusCode);
}
