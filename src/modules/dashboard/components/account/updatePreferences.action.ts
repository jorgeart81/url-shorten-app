import z from 'zod/v4';

import type { JsonPatchOperation } from '@/config/types/jsonPatchDocument';
import { UserService } from '../../services/user/userService';
import type { UserAccount } from '../../store/types/userAccount';
import {
  updatePreferencesSchema,
  type UpdatePreferencesValidationError,
} from './updatePreferencesValidation';

export type UpdateStatus = 'noChanges' | 'success' | 'fail';
export interface UpdatePreferencesState {
  user: UserAccount;
  status: UpdateStatus;
  validationError?: UpdatePreferencesValidationError;
}

function getChangedFields<T extends Record<string, unknown>>(
  data: { [k: string]: FormDataEntryValue },
  original: T
) {
  const changeEntries = Object.entries(data).filter(
    ([key, value]) => key in original && value !== original[key as keyof T]
  );

  return { hasChanges: changeEntries.length > 0, changeEntries };
}

const formDataValidation = (data: { [k: string]: FormDataEntryValue }) => {
  const validationResult = updatePreferencesSchema.safeParse(data);

  if (!validationResult.success || validationResult.error) {
    const errors = z.treeifyError(validationResult.error)
      .properties as UpdatePreferencesValidationError;

    return { hasErrors: true, errors: errors, data: validationResult.data };
  }
  return { hasErrors: false, errors: undefined, data: validationResult.data };
};

export const updatePreferencesAction = async (
  state: UpdatePreferencesState,
  queryData: FormData
) => {
  let status: UpdateStatus = state.status;
  const formData = Object.fromEntries(queryData);

  const { hasChanges, changeEntries } = getChangedFields(
    formData,
    state.user as unknown as Record<string, unknown>
  );
  if (!hasChanges) {
    status = 'noChanges';
    return { ...state, status };
  }

  const { hasErrors, errors, data } = formDataValidation(formData);
  if (hasErrors) return { ...state, validationError: errors };

  const patchOperations: JsonPatchOperation[] = changeEntries.map(
    ([key, value]) => ({
      op: 'replace',
      path: `/${key}`,
      value,
    })
  );

  const result = await UserService.partialUserAccountUpdate(patchOperations);
  status = result.success ? 'success' : 'fail';

  return {
    ...state,
    user: { ...state.user, userName: data?.userName ?? state.user.userName },
    validationError: undefined,
    status,
  };
};
