export const RoutePath = {
  Account: '/account',
  Auth: '/auth',
  CreateLink: '/links/create',
  Home: '/home',
  Links: '/links',
  Login: '/auth/login',
  RefreshToken: '/auth/refresh-token',
  ResendConfirmation: '/auth/resend-confirmation',
  RecoveryAccount: '/auth/password/reset',
  Signup: '/auth/signup',
  TermsAndConditions: '/terms-and-conditions',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];
