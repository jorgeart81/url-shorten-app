import { startTransition, type FormEvent } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const error = useAuthStore((state) => state.error);
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

  return {
    error,
    status,

    // Methods
    login,
    onSubmit,
    signUp,
  };
};
