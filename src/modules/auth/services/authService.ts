import { AxiosError } from 'axios';

import { errorHandler } from '@/config/errorHandler';
import { Result } from '@/config/rop/result_T';
import { RoutePath } from '@/shared/constants/routePath';
import { urlShortenApi } from '@/services/api/urlShortenApi';

import type { ApiErrorResponse, SuccessResponse } from '@/services/api/genericResponse';
import type { LoginRequest } from './dtos/loginRequest';
import type { LoginResponse } from './dtos/loginResponse';
import type { RegisterRequest } from './dtos/registerRequest';
import type { RegisterResponse } from './dtos/registerResponse';

export class AuthService {
  static async confirmEmail(
    code: string,
    controller?: AbortController
  ): Promise<Result<void>> {
    try {
      const { status } = await urlShortenApi.post(
        '/auth/confirm-email',
        {
          code,
        },
        { signal: controller?.signal }
      );

      return Result.success(undefined, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async login(request: LoginRequest): Promise<Result<LoginResponse>> {
    try {
      const { data, status } = await urlShortenApi.post<LoginResponse>(
        '/auth/login',
        request
      );

      return Result.success(data, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async logout(): Promise<Result<void>> {
    try {
      const { status } = await urlShortenApi.post('/auth/logout', {});
      return Result.success(undefined, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async refreshToken(): Promise<Result<void>> {
    try {
      const { status } = await urlShortenApi.post(RoutePath.RefreshToken, {});
      return Result.success(undefined, status);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  }

  static async signUp(
    request: RegisterRequest
  ): Promise<Result<RegisterResponse>> {
    try {
      const { data, status } = await urlShortenApi.post<RegisterResponse>(
        '/auth/register',
        request
      );

      return Result.success(data, status);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error?.response?.status == 409) {
        return Result.failure(
          error.response?.data?.errors,
          error.response?.status,
          'EMAIL_ALREADY_REGISTERED'
        );
      }
      return errorHandler(error);
    }
  }

  static async validateResendCode(
    resendCode: string,
    controller?: AbortController
  ): Promise<Result<void>> {
    try {
      const { status } = await urlShortenApi.post<SuccessResponse<void>>(
        '/auth/validate-resendcode',
        { resendCode },
        { signal: controller?.signal, timeout: 30000 }
      );

      if (status == 204) {
        return Result.success(undefined);
      }
      return Result.failure({ general: ['Unhandled error'] }, status);
    } catch (error: unknown) {
      return AuthService.resendCodeError(error);
    }
  }

  static async resendConfirmationEmail(
    resendCode: string,
    controller?: AbortController
  ): Promise<Result<void>> {
    try {
      const { status } = await urlShortenApi.post<SuccessResponse<void>>(
        '/auth/resend-confirmation',
        { resendCode },
        { signal: controller?.signal }
      );

      if (status == 200) {
        return Result.success();
      }
      return Result.failure({ general: ['Unhandled error'] }, status);
    } catch (error: unknown) {
      return AuthService.resendCodeError(error);
    }
  }

  private static resendCodeError<T = unknown>(error: unknown) {
    if (error instanceof AxiosError) {
      const response = error.response;
      const status = response?.status;
      const data = response?.data as ApiErrorResponse;
      const errors = data.errors?.general;

      const isPayloadExpired =
        Array.isArray(errors) && errors.includes('Payload expired.');

      if (isPayloadExpired)
        return Result.failure<T>(
          { general: ['Payload expired.'] },
          status,
          'RESENCODE_EXPIRED'
        );
    }
    return errorHandler<T>(error);
  }
}
