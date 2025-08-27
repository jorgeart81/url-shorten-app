export const RoutePath = {
  Account: '/account',
  Auth: '/auth',
  CreateLink: '/links/create',
  Home: '/home',
  Links: '/links',
  Login: '/auth/login',
  RefreshToken: '/auth/refresh-token',
  ResendConfirmation: '/auth/resend-confirmation',
  Signup: '/auth/signup',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];
