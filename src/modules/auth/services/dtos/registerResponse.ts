import type { SuccessResponse } from '@/services/api/genericResponse';

export interface RegisterResponseData {
  readonly resendCode: string;
}

export type RegisterResponse = SuccessResponse<RegisterResponseData>;
