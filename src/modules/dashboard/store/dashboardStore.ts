import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { LinkService } from '../services/links/linkService';
import { UserService } from '../services/user/userService';

import { SotorageKey } from '@/shared/constants/storageKey';
import {
  mapAccountDataToUserAccount,
  mapDeviceDataDtoToDevice,
} from './mappers/accountMapper';
import { mapLinkDataToLink } from './mappers/linkMapper';

import type { Link } from './types/link';
import type { Pagination } from './types/pagination';
import type { Device, UserAccount } from './types/userAccount';

interface DashboardState {
  user: UserAccount;
  devices: Device[];
  links: Pagination<Link>;
}

interface Actions {
  getAccount: () => Promise<void>;
  loadLinks: (page: number, isActive: boolean) => Promise<void>;
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
  loadLinks: async (page: number, isActive: boolean) => {
    const pageNumber = page <= 0 ? 1 : page;

    const { success, value } = await LinkService.getAll({
      page: pageNumber,
      isActive: isActive,
    });

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
