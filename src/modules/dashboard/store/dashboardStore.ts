import { create, type StateCreator } from 'zustand';
import type { Device, UserAccount } from './types/userAccount';
import { devtools, persist } from 'zustand/middleware';
import { SotorageKey } from '@/shared/constants/storageKey';
import { UserService } from '../services/user/userService';
import {
  mapAccountDataToUserAccount,
  mapDeviceDataDtoToDevice,
} from './mappers/accountMapper';

interface DashboardState {
  user: UserAccount;
  devices: Device[];
}

interface Actions {
  getAccount: () => Promise<void>;
}

const initialState: DashboardState = {
  devices: [],
  user: {
    displayName: '',
    email: '',
    isActive: false,
  }
};

const storeApi: StateCreator<
  DashboardState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  ...initialState,

  // Actions
  getAccount: async () => {
    const { success, value } = await UserService.account();

    if (!success || !value) {
      //TODO: handling errors
      return;
    }

    set((prev) => ({
      ...prev,
      user: mapAccountDataToUserAccount(value.data),
      devices: value.data.devices.map(mapDeviceDataDtoToDevice),
    }));
  },
});

export const useDashboardStore = create<DashboardState & Actions>()(
  persist(devtools(storeApi), {
    name: SotorageKey.DASHBOARD,
  })
);
