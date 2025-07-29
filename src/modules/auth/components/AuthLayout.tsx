import { Navigate, Outlet } from 'react-router';

import { RoutePath } from '@/shared/constants/routePath';
import { GalleryVerticalEnd } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const AuthLayout = () => {
  const status = useAuthStore((state) => state.status);
  const resendCode = useAuthStore((state) => state.resendCode);

  if (status === 'authenticated') {
    return <Navigate to={RoutePath.Home} />;
  }

  if (status === 'unconfirmedEmail' && resendCode != null) {
    return <Navigate to={RoutePath.ResendConfirmation} />;
  }

  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a href='#' className='flex items-center gap-2 self-center font-medium'>
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          Url Shorten{}
        </a>
        <Outlet />
      </div>
    </div>
  );
};
