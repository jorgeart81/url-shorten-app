import i18n from '@/i18n/config';
import { z } from 'zod/v4';

import { regexPatterns } from '@/utils/regex';

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .regex(regexPatterns.password, i18n.t('validations.passwordRegex')),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: i18n.t('validations.passwordsDoNotMatch'),
    path: ['confirmPassword'],
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordError = Partial<
  Record<keyof ResetPasswordData, { errors: [] } | undefined>
>;

export const resetPasswordFormValidation = (data: {
  [k: string]: FormDataEntryValue;
}) => {
  const validationResult = resetPasswordSchema.safeParse(data);

  if (!validationResult.success || validationResult.error) {
    const errors = z.treeifyError(validationResult.error)
      .properties as ResetPasswordError;

    return { hasErrors: true, errors: errors, data: validationResult.data };
  }

  return { hasErrors: false, errors: undefined, data: validationResult.data };
};
