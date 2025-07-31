import { lazy } from 'react';
import { Navigate } from 'react-router';

import { ResendEmailProvider } from '../components/ResendEmail/context/ResendEmailProvider';
import { AuthSuspense } from '../components/AuthSuspense';
import { RoutePath } from '@/shared/constants/routePath';
import type { Status } from '../store/types/status.type';
import { useAuthStore } from '../store/authStore';

const allowedStatus: Status[] = ['sessionExpired', 'unconfirmedEmail'];

const LazyResendingEmail = lazy(
  () => import('../components/ResendEmail/ResendingEmail')
);

export const ResendView = () => {
  const status = useAuthStore((state) => state.status);

  if (!status || !allowedStatus.includes(status)) {
    return <Navigate to={RoutePath.Login} replace />;
  }

  return (
    <AuthSuspense>
      <ResendEmailProvider>
        <LazyResendingEmail />
      </ResendEmailProvider>
    </AuthSuspense>
  );
};
