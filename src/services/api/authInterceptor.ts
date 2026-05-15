import type { InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "@/modules/auth/store/authStore";
import { CookieService } from "../cookies/cookieService";
import { ApiRoutes } from "./urlShortenApi";

export function authInterceptor(config: InternalAxiosRequestConfig) {
  const isAuthRouteRequest = config.url?.startsWith(ApiRoutes.Auth.Base);
  const status = useAuthStore.getState().status;

  if (status === "authenticated" && !isAuthRouteRequest) {
    if (CookieService.authSession) return config;
    useAuthStore.getState().refreshToken();
  }

  return config;
}
