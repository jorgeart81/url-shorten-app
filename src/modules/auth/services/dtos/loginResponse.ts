import type { SuccessResponse } from '@/services/api/genericResponse';

export interface LoginResponseData {
  readonly resendCode?: string;
}

// LoginResponse is just an alias for SuccessResponse<LoginResponseData>
export type LoginResponse = SuccessResponse<LoginResponseData>;
