import type {
  AccountData,
  DeviceData,
} from '@/modules/dashboard/services/user/dtos/accountResponse';
import type {
  UserAccount,
  Device,
} from '@/modules/dashboard/store/types/userAccount';

/**
 * Extracts the username part from an email (before the '@').
 * If '@' is not found, returns the full email.
 */
function extractNameFromEmail(email: string): string {
  const atIdx = email.indexOf('@');
  return atIdx > 0 ? email.slice(0, atIdx) : email;
}

/**
 * Maps AccountData (DTO) to UserAccount (store type).
 * @param data AccountData object from API response
 * @returns UserAccount object for store usage
 */
export function mapAccountDataToUserAccount(data: AccountData): UserAccount {
  let displayName = data.userName;
  if (data.userName === data.email) {
    displayName = extractNameFromEmail(data.email);
  }

  return {
    userName: displayName,
    email: data.email,
    emailConfirmed: data.emailConfirmed,
    isActive: data.isActive,
    firstName: data.firstName,
    lastName: data.lastName,
  };
}

/**
 * Maps Device (DTO) to Device (store type).
 * @param device Device object from API response
 * @returns Device object for store usage
 */
export function mapDeviceDataDtoToDevice(device: DeviceData): Device {
  return {
    id: device.id,
    deviceName: device.deviceName,
    isActive: device.isActive,
    isCurrentDevice: device.isCurrentDevice,
    keepLoggedIn: device.keepLoggedIn,
    clientType: device.clientType,
    userAgent: device.userAgent,
  };
}
