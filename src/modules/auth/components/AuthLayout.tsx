import { Navigate, Outlet } from 'react-router';

import { RoutePath } from '@/shared/constants/routePath';
import { useAuthStore } from '../store/authStore';
import { AuthLogo } from './AuthLogo';

export const AuthLayout = () => {
  const status = useAuthStore((state) => state.status);
  const resendCode = useAuthStore((state) => state.resendCode);

  if (status === 'authenticated' || status === 'checking') {
    return <Navigate to={RoutePath.Home} />;
  }

  if (status === 'unconfirmedEmail' && resendCode != null) {
    return <Navigate to={RoutePath.ResendConfirmation} />;
  }

  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <AuthLogo />
        <Outlet />
      </div>
    </div>
  );
};
