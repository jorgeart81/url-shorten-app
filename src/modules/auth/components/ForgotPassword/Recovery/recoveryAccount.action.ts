import { AuthService } from '../../../services/authService';
import {
  recoveryFormValidation,
  type RecoveryAccountError,
} from './recoveryAccountSchema';

export interface RecoveryAccountState {
  isSuccess: boolean | null;
  validationError?: RecoveryAccountError;
}

export const recoveryAccountAction = async (
  state: RecoveryAccountState,
  queryData: FormData
) => {
  const formData = Object.fromEntries(queryData);
  const { hasErrors, errors, data } = recoveryFormValidation(formData);

  if (hasErrors || !data) return { ...state, validationError: errors };

  const { success } = await AuthService.forgotPassword(data.email);

  return { ...state, isSuccess: success };
};
