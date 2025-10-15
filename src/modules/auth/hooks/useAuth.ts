import { startTransition, useEffect, useState, type FormEvent } from 'react';

import { z } from 'zod/v4';

import { useLanguage } from '@/components/hooks/useLanguage';
import { useAuthStore } from '../store/authStore';

import type { ResultErrorCode } from '@/config/rop/resultErrorCode';
import type { Error } from '../store/types/authState';
import {
  loginSchema,
  type LoginData,
  type LoginValidationError,
} from '../components/LoginForm/loginValidationSchema';
import { getClientFingerprint } from '@/utils/getPlatform';

export const useAuth = () => {
  const { translate } = useLanguage();

  const [error, setError] = useState<Error>();

  const errorCode = useAuthStore((state) => state.errorCode);
  const status = useAuthStore((state) => state.status);
  const login = useAuthStore((state) => state.login);
  const signUp = useAuthStore((state) => state.signUp);

  const onSubmit = (
    event: FormEvent<HTMLFormElement>,
    formAction: (payload: FormData) => void
  ) => {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget as HTMLFormElement));
    });
  };

  const handleErrorCode = (errorCode: ResultErrorCode) => {
    let error: Error | undefined = undefined;

    if (
      errorCode === 'NETWORK_ERROR' ||
      errorCode === 'INVALID_CREDENTIALS' ||
      errorCode === 'EMAIL_ALREADY_REGISTERED'
    ) {
      error = {
        title: translate(`${errorCode}.title`),
        message: translate(`${errorCode}.description`),
      };
    } else {
      error = {
        title: translate('UNKNOWN.title'),
        message: translate('UNKNOWN.description'),
      };
    }

    if (error) {
      setError(error);
    }
  };

  const loginWithValidation = async (input: LoginData) => {
    const { data, error, success } = loginSchema.safeParse(input);

    if (!success && error) {
      return {
        isSuccess: false,
        errors: z.treeifyError(error).properties as LoginValidationError,
      };
    }

    const { platform, language, cores } = getClientFingerprint();
    const deviceName = `${platform}/${language}/${cores}`;

    const { isSuccess } = await login({
      email: data.email,
      password: data.password,
      keepLoggedIn: data.keepLoggedIn == 'on',
      deviceName: deviceName,
      clientType: 'web',
    });

    return { isSuccess, errors: undefined };
  };

  useEffect(() => {
    console.log(errorCode);
    if (!errorCode) return;
    handleErrorCode(errorCode);
  }, [errorCode]);

  return {
    error,
    status,

    // Methods
    login: loginWithValidation,
    onSubmit,
    signUp,
  };
};
