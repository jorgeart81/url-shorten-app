import type { ResultErrorCode } from '@/config/rop/resultErrorCode';
import type { Status } from './status.type';

export interface AuthState {
  status: Status | null;
  keepLoggedIn: boolean;
  refreshTokenAttempts: number;
  error?: Error;
  errorCode?: ResultErrorCode;
  resendCode?: string;
}

export interface Error {
  title: string;
  message: string;
}
