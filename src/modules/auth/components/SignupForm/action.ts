import z from "zod";

import type { FormActionState } from "@/shared/constants/types/formActionState";
import { useAuthStore } from "../../store/authStore";

import {
  SignupSchema,
  type SignupData,
  type SignupValidationError,
} from "./signupValidation";

interface SignUpActionState extends FormActionState<
  SignupData,
  SignupValidationError
> {}

const signUp = useAuthStore.getState().signUp;

export const register = async (
  _: SignUpActionState | undefined,
  formData: FormData,
): Promise<SignUpActionState> => {
  const fields = Object.fromEntries(formData) as SignupData;
  const validatedFields = SignupSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation error.",
      data: fields,
      fieldErrors: z.flattenError(validatedFields.error).fieldErrors,
    } satisfies SignUpActionState;
  }

  try {
    const { isSuccess } = await signUp({
      email: fields.email,
      password: fields.password,
    });

    return { success: isSuccess };
  } catch (_: unknown) {
    return {
      success: false,
      message: "Validation error.",
    };
  }
};
