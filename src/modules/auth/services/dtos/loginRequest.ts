import type { ClientType } from '@/config/types/clientType';
export interface LoginRequest {
  readonly email: string;
  readonly password: string;
  readonly deviceName: string;
  readonly clientType: ClientType;
  readonly keepLoggedIn: boolean;
}
