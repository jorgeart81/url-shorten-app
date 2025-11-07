import { AuthService } from '../../../services/authService';
import {
  resetPasswordFormValidation,
  type ResetPasswordError,
} from './resetPasswordSchema';

export interface ResetPasswordState {
  code: string;
  isSuccess: boolean | null;
  isCodeExpired: boolean;
  validationError?: ResetPasswordError;
}

export const resetPasswordAction = async (
  state: ResetPasswordState,
  queryData: FormData
) => {
  const formData = Object.fromEntries(queryData);
  const { hasErrors, errors, data } = resetPasswordFormValidation(formData);

  if (hasErrors || !data) return { ...state, validationError: errors };

  const { success, errorCode } = await AuthService.resetPassword(
    state.code,
    data.newPassword
  );

  return {
    ...state,
    isSuccess: success,
    isCodeExpired: errorCode === 'PAYLOAD_EXPIRED',
  };
};
