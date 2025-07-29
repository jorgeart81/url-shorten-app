import i18n from '@/i18n/config';
import { z } from 'zod/v4';

export const signupSchema = z.object({
  email: z.email(i18n.t('validations.invalidEmail')),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      i18n.t('validations.passwordRegex')
    ),
});

export type SignupData = z.infer<typeof signupSchema>;
export type SignupValidationError = Partial<
  Record<keyof SignupData, { errors: [] } | undefined>
>;
