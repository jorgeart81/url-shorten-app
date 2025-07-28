import type { InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/modules/auth/store/authStore';
import { RoutePath } from '@/shared/constants/routePath';
import { CookieService } from '../cookies/cookieService';

export function authInterceptor(config: InternalAxiosRequestConfig) {
  const isAuthRoute = config.url?.startsWith(RoutePath.Auth);
  const status = useAuthStore.getState().status;

  if (
    !isAuthRoute &&
    status === 'authenticated' &&
    !CookieService.authSession
  ) {
    useAuthStore.getState().refreshToken();
  }

  return config;
}
