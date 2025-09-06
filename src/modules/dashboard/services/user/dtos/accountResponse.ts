import type { SuccessResponse } from '@/services/api/genericResponse';

export interface AccountData {
  readonly userName: string;
  readonly email: string;
  readonly emailConfirmed: boolean;
  readonly isActive: boolean;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly devices: DeviceData[];
  readonly domains: DomainData[];
}

export interface DeviceData {
  readonly id: string;
  readonly deviceName: string;
  readonly isActive: boolean;
  readonly isCurrentDevice: boolean;
  readonly keepLoggedIn: boolean;
  readonly clientType: string;
  readonly userAgent: string;
}

export interface DomainData {
  domain: string;
  isApiDomain: boolean;
}

export type AccountResponse = SuccessResponse<AccountData>;
