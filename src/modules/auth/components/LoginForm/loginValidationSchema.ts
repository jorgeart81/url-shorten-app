import i18n from '@/i18n/config';
import { z } from 'zod/v4';

export const LoginSchema = z.object({
  email: z.email(i18n.t('validations.invalidEmail')),
  password: z.string().trim().min(8, i18n.t('validations.passwordMin')),
  keepLoggedIn: z.string().optional(),
});

export type LoginData = z.infer<typeof LoginSchema>;
export type LoginValidationError = Partial<Record<keyof LoginData, string[]>>;
