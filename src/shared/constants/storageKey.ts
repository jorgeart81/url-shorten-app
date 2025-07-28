export const SotorageKey = {
  AUTH: 'auth',
} as const;

export type SotorageKey = (typeof SotorageKey)[keyof typeof SotorageKey];
