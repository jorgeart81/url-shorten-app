import type { ResultErrorCode } from '@/config/rop/resultErrorCode';
import type { Status } from './status.type';

export interface AuthState {
  user?: UserStore;
  status: Status | null;
  keepLoggedIn: boolean;
  error?: Error;
  errorCode?: ResultErrorCode;
  resendCode?: string;
}

export interface UserStore {
  uid: string;
  email: string;
  role: string;
  displayName?: string;
}

export interface Error {
  title: string;
  message: string;
}
