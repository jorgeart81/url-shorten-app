import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { ActionResult } from '@/config/types/actionResult';
import { CookieService } from '@/services/cookies/cookieService';
import { SotorageKey } from '@/shared/constants/storageKey';
import { AuthService } from '../services/authService';
import type { LoginRequest } from '../services/dtos/loginRequest';
import type { RegisterRequest } from '../services/dtos/registerRequest';
import type { AuthState } from './types/authState';

const initialState: AuthState = {
  status: null,
  keepLoggedIn: false,
  refreshTokenAttempts: 0,
  error: undefined,
  errorCode: undefined,
  resendCode: undefined,
};

interface Actions {
  confirmEmail: (
    code: string,
    controller?: AbortController
  ) => Promise<ActionResult>;
  login: (request: LoginRequest) => Promise<ActionResult>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<ActionResult>;
  signUp: (request: RegisterRequest) => Promise<ActionResult>;
  deleteState: () => void;
  sessionExpired: () => void;
}

const storeApi: StateCreator<
  AuthState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  ...initialState,

  // Actions
  confirmEmail: async (code: string, controller?: AbortController) => {
    const { success } = await AuthService.confirmEmail(code, controller);
    return { isSuccess: success };
  },

  login: async (request: LoginRequest) => {
    set({ ...initialState, status: 'authenticating' });
    const { success, value, errorCode } = await AuthService.login(request);
    const resendCode = value?.data?.resendCode;

    if (!success) {
      set((prevState) => ({ ...prevState, errorCode }));
      return { isSuccess: false };
    }

    if (resendCode) {
      set({
        ...initialState,
        status: 'unconfirmedEmail',
        resendCode: resendCode,
      });
      return { isSuccess: success };
    }

    CookieService.saveAuthSession(request.keepLoggedIn);
    set({ status: 'authenticated', keepLoggedIn: request.keepLoggedIn });
    return { isSuccess: success };
  },

  logout: async () => {
    const { success, errorCode } = await AuthService.logout();

    if (!success) {
      set((prevState) => ({ ...prevState, errorCode }));
    }

    CookieService.deleteAuthSession();
    set({ ...initialState });
  },

  refreshToken: async () => {
    const { success, errorCode } = await AuthService.refreshToken();

    if (!success && errorCode === 'INVALID_CREDENTIALS') {
      await AuthService.logout();
      set((prevState) => ({
        ...prevState,
        errorCode,
        status: 'unauthorized',
      }));
      return { isSuccess: false };
    }

    if (!success) {
      set((prevState) => ({
        ...prevState,
        errorCode,
        refreshTokenAttempts: ++prevState.refreshTokenAttempts,
      }));
      return { isSuccess: false };
    }

    CookieService.saveAuthSession(get().keepLoggedIn);
    set((prevState) => ({
      ...prevState,
      status: 'authenticated',
      refreshTokenAttempts: 0,
    }));
    return { isSuccess: success };
  },

  signUp: async (request: RegisterRequest) => {
    set({ ...initialState, status: 'registering' });
    const { success, value, errorCode } = await AuthService.signUp(request);
    const resendCode = value?.data.resendCode;

    if (!success) {
      set((prevState) => ({ ...prevState, errorCode }));
      return { isSuccess: false };
    }

    set({
      ...initialState,
      status: 'unconfirmedEmail',
      resendCode: resendCode,
    });
    return { isSuccess: success };
  },

  deleteState: async () => {
    set({ ...initialState });
    localStorage.removeItem(SotorageKey.AUTH);
  },

  sessionExpired: async () => {
    set((prevState) => ({ ...prevState, status: 'sessionExpired' }));
  },
});

export const useAuthStore = create<AuthState & Actions>()(
  persist(devtools(storeApi), {
    name: SotorageKey.AUTH,
    partialize: (state) => {
      const { error, errorCode, ...rest } = state; // eslint-disable-line @typescript-eslint/no-unused-vars
      return rest;
    },
  })
);
