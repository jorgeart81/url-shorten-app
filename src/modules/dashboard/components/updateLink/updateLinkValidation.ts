import i18n from '@/i18n/config';
import { z } from 'zod/v4';

export const updateLinkSchema = z.object({
  destination: z
    .url(i18n.t('createLink.destination.validation'))
    .trim()
    .max(6144, i18n.t('validation.string.maxLength.generic'))
    .optional(),
  title: z
    .string()
    .max(2048, i18n.t('validation.string.maxLength.generic'))
    .optional(),
});

export type UpdateLinkData = z.infer<typeof updateLinkSchema>;
export type UpdateLinkValidationError = Partial<
  Record<keyof UpdateLinkData, { errors: [] } | undefined>
>;
