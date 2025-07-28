export const RoutePath = {
  Auth: '/auth',
  Home: '/home',
  Links: '/links',
  CreateLink: '/links/create',
  Login: '/auth/login',
  RefreshToken: '/auth/refresh-token',
  ResendConfirmation: '/auth/resend-confirmation',
  Signup: '/auth/signup',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];
