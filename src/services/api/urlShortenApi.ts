import axios, { type AxiosInstance } from "axios";

import { env } from "@/config/env";
import { authInterceptor } from "./authInterceptor";

const urlShortenApi: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
});

urlShortenApi.interceptors.request.use(authInterceptor);

export { urlShortenApi };

const AUTH = "/auth";

export const ApiRoutes = {
  Auth: {
    Base: AUTH,
    ConfirmEmail: `${AUTH}/confirm-email`,
    ForgotPassword: `${AUTH}/forgot-password`,
    Login: `${AUTH}/login`,
    Logout: `${AUTH}/logout`,
    RefreshToken: `${AUTH}/refresh-token`,
    Register: `${AUTH}/register`,
    ResendConfirmation: `${AUTH}/resend-confirmation`,
    ResetPassword: `${AUTH}/reset-password`,
    ValidateResendCode: `${AUTH}/validate-resendcode`,
  },
} as const;
