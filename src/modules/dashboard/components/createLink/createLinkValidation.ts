import i18n from '@/i18n/config';
import { z } from 'zod/v4';

export const createLinkSchema = z.object({
  destination: z
    .url(i18n.t('createLink.destination.validation'))
    .trim()
    .max(6144, i18n.t('validation.string.maxLength.generic')),
  title: z
    .string()
    .max(2048, i18n.t('validation.string.maxLength.generic'))
    .optional(),
  domain: z
    .string()
    .trim()
    .max(255, i18n.t('validation.string.maxLength.generic')),
  customBackHalf: z
    .string()
    .trim()
    .max(
      50,
      `${i18n.t('validation.string.maxLength').replace('{{maxLength}}', '50')}`
    )
    .optional(),
});

export type CreateLinkData = z.infer<typeof createLinkSchema>;
export type CreateLinkValidationError = Partial<
  Record<keyof CreateLinkData, { errors: [] } | undefined>
>;
