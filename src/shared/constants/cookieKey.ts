export const CookieKey = {
  AuthSession: 'us_session',
  EmailResend: 'us_resend',
  EmailResendSession: 'us_resend_session',
} as const;

export type CookieKey = (typeof CookieKey)[keyof typeof CookieKey];
