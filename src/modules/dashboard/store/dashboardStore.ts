import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { LinkService } from '../services/links/linkService';
import { UserService } from '../services/user/userService';

import { StorageKey } from '@/shared/constants/storageKey';
import {
  mapAccountDataToUserAccount,
  mapDeviceDataDtoToDevice,
} from './mappers/accountMapper';
import { mapLinkDataToLink } from './mappers/linkMapper';

import type { Link } from './types/link';
import type { Pagination } from './types/pagination';
import type { Device, UserAccount } from './types/userAccount';
import type { JsonPatchDocument } from '@/config/types/jsonPatchDocument';

interface DashboardState {
  user?: UserAccount;
  devices: Device[];
  links: Pagination<Link>;
}

interface Actions {
  getAccount: () => Promise<void>;
  loadLinks: (page: number, isActive: boolean) => Promise<void>;
  updateLinkActiveStatus: (id: string, activate: boolean) => Promise<void>;
  setUserAccount: (user: UserAccount) => Promise<void>;
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
  updateLinkActiveStatus: async (id: string, activate: boolean) => {
    const request: JsonPatchDocument = new Array({
      op: 'replace',
      path: `/isActive`,
      value: activate,
    });
    const { success } = await LinkService.partialUpdate(id, request);

    if (success) {
      const pageNumber = get().links.pageNumber;
      const loadLinks = get().loadLinks;

      await loadLinks(pageNumber, !activate);
    }
  },
  setUserAccount: async (user: UserAccount) => {
    set((prev) => ({
      ...prev,
      user: { ...user },
    }));
  },
});

export const useDashboardStore = create<DashboardState & Actions>()(
  persist(devtools(storeApi), {
    name: StorageKey.DASHBOARD,
  })
);
