import type { SuccessResponse } from '@/services/api/genericResponse';

export interface RegisterResponseData {
  resendCode: string;
}

export type RegisterResponse = SuccessResponse<RegisterResponseData>;
