import { lazy } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import { RoutePath } from '@/shared/constants/routePath';
import { isValidUrlCode } from '@/utils/validateCode';
import { AuthSuspense } from '../components/AuthSuspense';
import { useAuthStore } from '../store/authStore';

const EmailConfirmation = lazy(
  () => import('../components/Email/EmailConfirmation')
);

export const EmailConfirmationView = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const status = useAuthStore((state) => state.status);
  if (status === 'authenticated' || !code || !isValidUrlCode(code, 100)) {
    return <Navigate to={RoutePath.Login} replace />;
  }

  return (
    <AuthSuspense>
      <EmailConfirmation code={code} />
    </AuthSuspense>
  );
};
