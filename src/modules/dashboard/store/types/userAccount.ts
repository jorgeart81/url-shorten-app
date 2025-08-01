export interface UserAccount {
  displayName: string;
  email: string;
  isActive: boolean;
  firstName?: string;
  lastName?: string;
}

export interface Device {
  deviceName: string;
  isActive: boolean;
  isCurrentDevice: boolean;
  keepLoggedIn: boolean;
  clientType: string;
  userAgent: string;
}
