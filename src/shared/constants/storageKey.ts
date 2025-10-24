export const StorageKey = {
  AUTH: 'auth',
  DASHBOARD: 'dashboard',
} as const;

export type StorageKey = (typeof StorageKey)[keyof typeof StorageKey];
