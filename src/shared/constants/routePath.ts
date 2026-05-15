const LINKS = "/links";
const HOME = "/home";
const AUTH = "/auth";

export const RoutePath = {
  Account: "/account",
  Auth: AUTH,
  CreateLink: `${LINKS}/create`,
  Home: HOME,
  Links: LINKS,
  Login: `${AUTH}/login`,
  RecoveryAccount: `${AUTH}/password/reset`,
  RefreshToken: `${AUTH}/refresh-token`,
  ResendConfirmation: `${AUTH}/resend-confirmation`,
  Signup: `${AUTH}/signup`,
  TermsAndConditions: "/terms-and-conditions",
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];
