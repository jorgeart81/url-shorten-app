import i18n from '@/i18n/config';
import { regexPatterns } from '@/utils/regex';
import { z } from 'zod/v4';

export const SignupSchema = z.object({
  email: z.email(i18n.t('validations.invalidEmail')),
  password: z
    .string()
    .trim()
    .regex(regexPatterns.password, i18n.t('validations.passwordRegex')),
});

export type SignupData = z.infer<typeof SignupSchema>;
export type SignupValidationError = Partial<Record<keyof SignupData, string[]>>;
