import { lazy } from 'react';
import { Navigate } from 'react-router';

import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { RoutePath } from '@/shared/constants/routePath';
import { AuthSuspense } from '../components/AuthSuspense';
import { useAuthStore } from '../store/authStore';
import type { Status } from '../store/types/status.type';

const LazyRecoveryAccountForm = lazy(
  () => import('../components/ForgotPassword/RecoveryAccountForm')
);

const allowedStatus: Status[] = ['sessionExpired', 'unauthorized'];

export const RecoveryAccountView = () => {
  const { translate: t } = useLanguage();
  const status = useAuthStore((state) => state.status);

  if (status && !allowedStatus.includes(status)) {
    return <Navigate to={RoutePath.Login} replace />;
  }

  return (
    <AuthSuspense>
      <Head title={t('forgotPasswordForm.title')} />
      <LazyRecoveryAccountForm />
    </AuthSuspense>
  );
};
