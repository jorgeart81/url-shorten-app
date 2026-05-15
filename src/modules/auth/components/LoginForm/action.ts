import z from "zod";

import type { FormActionState } from "@/shared/constants/types/formActionState";
import { useAuthStore } from "../../store/authStore";
import {
  LoginSchema,
  type LoginData,
  type LoginValidationError,
} from "./loginValidationSchema";
import { getClientFingerprint } from "@/utils/getPlatform";

export interface LoginActionState extends FormActionState<
  LoginData,
  LoginValidationError
> {}

const login = useAuthStore.getState().login;

export const authenticate = async (
  _: LoginActionState | undefined,
  formData: FormData,
): Promise<LoginActionState> => {
  const fields = Object.fromEntries(formData) as LoginData;
  const validatedFields = LoginSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation error.",
      data: fields,
      fieldErrors: z.flattenError(validatedFields.error).fieldErrors,
    } satisfies LoginActionState;
  }

  try {
    const { platform, language, cores } = getClientFingerprint();
    const deviceName = `${platform}/${language}/${cores}`;

    const { isSuccess } = await login({
      email: fields.email,
      password: fields.password,
      keepLoggedIn: fields.keepLoggedIn == "on",
      deviceName: deviceName,
      clientType: "web",
    });

    return { success: isSuccess };
  } catch (_: unknown) {
    return {
      success: false,
      message: "Validation error.",
    };
  }
};
