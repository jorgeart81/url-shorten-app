import i18n from '@/i18n/config';
import { z } from 'zod/v4';

export const recoveryAccountSchema = z.object({
  email: z.email(i18n.t('validations.invalidEmail')),
});

export type RecoveryAccountData = z.infer<typeof recoveryAccountSchema>;
export type RecoveryAccountError = Partial<
  Record<keyof RecoveryAccountData, { errors: [] } | undefined>
>;

export const recoveryFormValidation = (data: {
  [k: string]: FormDataEntryValue;
}) => {
  const validationResult = recoveryAccountSchema.safeParse(data);

  if (!validationResult.success || validationResult.error) {
    const errors = z.treeifyError(validationResult.error)
      .properties as RecoveryAccountError;

    return { hasErrors: true, errors: errors, data: validationResult.data };
  }

  return { hasErrors: false, errors: undefined, data: validationResult.data };
};
