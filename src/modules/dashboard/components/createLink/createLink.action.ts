import z from 'zod/v4';

import { RoutePath } from '@/shared/constants/routePath';
import { LinkService } from '../../services/links/linkService';
import {
  createLinkSchema,
  type CreateLinkValidationError,
} from './createLinkValidation';
import type { CreateState } from './QuickCreateLink';

const formDataValidation = (data: { [k: string]: FormDataEntryValue }) => {
  const validationResult = createLinkSchema.safeParse(data);

  if (!validationResult.success || validationResult.error) {
    const errors = z.treeifyError(validationResult.error)
      .properties as CreateLinkValidationError;

    return { hasErrors: true, errors: errors, data: validationResult.data };
  }
  return { hasErrors: false, errors: undefined, data: validationResult.data };
};

export const createLinkAction = async (
  state: CreateState,
  queryData: FormData
) => {
  const formData = Object.fromEntries(queryData);
  const { hasErrors, errors, data } = formDataValidation(formData);
  
  if (hasErrors || !data) return { ...state, validationError: errors };
  
  const { backHalf, destination, ...rest } = data;
  
  const { success, value } = await LinkService.createLink({
    ...rest,
    backHalf: backHalf && backHalf.trim().length > 0 ? backHalf : undefined,
    destination: destination,
  });

  if (success && value?.data.backHalf) {
    return {
      ...state,
      goTo: `${RoutePath.Links}/${value.data.backHalf}/details`,
    };
  }

  return state
};
