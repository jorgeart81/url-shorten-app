import { Head } from '@/components/Head';
import { SignupForm } from '../components/SignupForm/SignupForm';
import { useLanguage } from '@/components/hooks/useLanguage';

export const SignupView = () => {
  const { translate: t } = useLanguage();
  return (
    <>
      <Head title={t('registerForm.title')} />
      <SignupForm />
    </>
  );
};
