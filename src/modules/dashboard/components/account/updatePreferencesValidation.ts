import i18n from '@/i18n/config';
import { z } from 'zod/v4';

export const updatePreferencesSchema = z.object({
  userName: z
    .string()
    .min(3, i18n.t('validation.string.minLength', { minLength: 3 }))
    .max(50, i18n.t('validation.string.maxLength.generic'))
    .optional(),
});

export type UpdatePreferencesData = z.infer<typeof updatePreferencesSchema>;
export type UpdatePreferencesValidationError = Partial<
  Record<keyof UpdatePreferencesData, { errors: [] } | undefined>
>;
