import { lazy } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import { Head } from '@/components/Head';
import { useLanguage } from '@/components/hooks/useLanguage';
import { RoutePath } from '@/shared/constants/routePath';
import { AuthSuspense } from '../components/AuthSuspense';
import { useAuthStore } from '../store/authStore';
import type { Status } from '../store/types/status.type';
import { isValidUrlCode } from '@/utils/validateCode';

const LazyRecoveryAccountForm = lazy(
  () => import('../components/ForgotPassword/Recovery/RecoveryAccountForm')
);
const LazyResetPasswordForm = lazy(
  () => import('../components/ForgotPassword/Reset/ResetPasswordForm')
);

const allowedStatus: Status[] = ['sessionExpired', 'unauthorized'];

export const RecoveryAccountView = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const { translate: t } = useLanguage();
  const status = useAuthStore((state) => state.status);

  if (status && !allowedStatus.includes(status)) {
    return <Navigate to={RoutePath.Login} replace />;
  }

  return (
    <AuthSuspense>
      <Head title={t('forgotPasswordForm.title')} />
      <div className='flex min-h-dvh flex-col items-center justify-center gap-6 p-6 md:p-10'>
        {code != null && isValidUrlCode(code, 100) ? (
          <LazyResetPasswordForm code={code} />
        ) : (
          <LazyRecoveryAccountForm />
        )}
      </div>
    </AuthSuspense>
  );
};
