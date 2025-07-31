import { Head } from '@/components/Head';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { useLanguage } from '@/components/hooks/useLanguage';

export const LoginView = () => {
  const { translate: t } = useLanguage();

  return (
    <>
      <Head title={t('loginForm.title')} />
      <LoginForm />
    </>
  );
};
