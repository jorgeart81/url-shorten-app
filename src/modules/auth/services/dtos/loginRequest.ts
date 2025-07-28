import type { ClientType } from '@/common/types/clientType';

export interface LoginRequest {
  email: string;
  password: string;
  deviceName: string;
  clientType: ClientType;
  keepLoggedIn: boolean;
}
