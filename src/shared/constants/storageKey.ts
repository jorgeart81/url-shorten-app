export const SotorageKey = {
  AUTH: 'auth',
  DASHBOARD: 'dashboard',
} as const;

export type SotorageKey = (typeof SotorageKey)[keyof typeof SotorageKey];
