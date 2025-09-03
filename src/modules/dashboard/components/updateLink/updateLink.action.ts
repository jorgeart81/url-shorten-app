import z from 'zod/v4';

import { LinkService } from '../../services/links/linkService';
import {
  updateLinkSchema,
  type UpdateLinkValidationError,
} from './updateLinkValidation';

import type { JsonPatchOperation } from '@/config/types/jsonPatchDocument';
import type { Link } from '../../store/types/link';
import type { UpdateState, UpdateStatus } from './LinkEditForm';

/**
 * Compares the submitted form data with the original link object and determines which fields have changed.
 *
 * Returns an object with:
 * - hasChanges: boolean indicating if there are any changes.
 * - changeEntries: array of [key, value] pairs for fields that have changed.
 *
 * Only fields present in both the form data and the link object are compared.
 * Fields are considered changed if their value in the form data is different from the value in the link object.
 *
 * @param data - The form data as an object of key-value pairs.
 * @param link - The original link object to compare against.
 * @returns An object with hasChanges and changeEntries.
 *
 * @example
 * const changes = changeData({ title: "New", destination: "url" }, link);
 * if (changes.hasChanges) {
 *   // Proceed with patch operations
 * }
 */
const changeData = (data: { [k: string]: FormDataEntryValue }, link: Link) => {
  const changeEntries = Object.entries(data).filter(
    ([key, value]) => key in link && value !== link[key as keyof Link]
  );

  return { hasChanges: changeEntries.length > 0, changeEntries };
};

const formDataValidation = (data: { [k: string]: FormDataEntryValue }) => {
  const validationResult = updateLinkSchema.safeParse(data);

  if (!validationResult.success || validationResult.error) {
    const errors = z.treeifyError(validationResult.error)
      .properties as UpdateLinkValidationError;

    return { hasErrors: true, errors: errors };
  }
  return { hasErrors: false, errors: undefined };
};

export const updateLinkAction = async (
  state: UpdateState,
  queryData: FormData
) => {
  let status: UpdateStatus = state.status;
  const formData = Object.fromEntries(queryData);

  const { hasChanges, changeEntries } = changeData(formData, state.link);
  if (!hasChanges) {
    status = 'noChanges';
    return { ...state, status };
  }

  const { hasErrors, errors } = formDataValidation(formData);
  if (hasErrors) return { ...state, validationError: errors };

  const patchOperations: JsonPatchOperation[] = changeEntries.map(
    ([key, value]) => ({
      op: 'replace',
      path: `/${key}`,
      value,
    })
  );

  const result = await LinkService.partialUpdate(
    state.link.id,
    patchOperations
  );
  status = result.success ? 'success' : 'fail';
  return {
    ...state,
    status,
  };
};
