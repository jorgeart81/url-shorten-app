import { create, type StateCreator } from 'zustand';
import type { Device, UserAccount } from './types/userAccount';
import { devtools, persist } from 'zustand/middleware';
import { SotorageKey } from '@/shared/constants/storageKey';
import { UserService } from '../services/user/userService';
import {
  mapAccountDataToUserAccount,
  mapDeviceDataDtoToDevice,
} from './mappers/accountMapper';
import type { Link } from './types/link';
import { LinkService } from '../services/links/linkService';
import { mapLinkDataToLink } from './mappers/linkMapper';
import type { Pagination } from './types/pagination';

interface DashboardState {
  user: UserAccount;
  devices: Device[];
  links: Pagination<Link>;
}

interface Actions {
  getAccount: () => Promise<void>;
  loadLinks: () => Promise<void>;
}

const initialState: DashboardState = {
  devices: [],
  links: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalRecords: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  user: {
    displayName: '',
    email: '',
    isActive: false,
  },
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
  loadLinks: async () => {
    const { success, value } = await LinkService.getAll();

    if (!success || !value) {
      //TODO: handling errors
      return;
    }

    set((prev) => ({
      ...prev,
      links: {
        data: value.data.map(mapLinkDataToLink),
        pageNumber: value.pageNumber,
        pageSize: value.pageSize,
        totalRecords: value.totalRecords,
        totalPages: value.totalPages,
        hasNextPage: value.hasNextPage,
        hasPreviousPage: value.hasPreviousPage,
      },
    }));
  },
});

export const useDashboardStore = create<DashboardState & Actions>()(
  persist(devtools(storeApi), {
    name: SotorageKey.DASHBOARD,
  })
);
