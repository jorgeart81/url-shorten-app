import { NavLink, Outlet } from 'react-router';

import { Button } from '@/components/ui/button';
import { RoutePath } from '@/shared/constants/routePath';
import { useLanguage } from '@/components/hooks/useLanguage';

import styles from './layout.module.css';
import { useAuthStore } from '@/modules/auth/store/authStore';

export const LandingLayout = () => {
  const { translate: t } = useLanguage();
  const status = useAuthStore((state) => state.status);

  return (
    <div
      className={`w-screen min-h-dvh flex flex-col items-center ${styles['bg-container']}`}
    >
      <nav className='w-full max-w-[1440px] h-16 flex gap-3 py-4 px-6'>
        <div className='flex items-center gap-2 flex-1'>
          <img src='/favicon.svg' alt='favicon' className='size-8' />
          <h3 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            URL Shorten
          </h3>
        </div>
        <div className='flex gap-inherit'>
          <Button asChild variant='outline' size='sm'>
            <NavLink to={RoutePath.Login} viewTransition>
              {status === 'authenticated' ? t('myAccount') : t('logIn')}
            </NavLink>
          </Button>
          {status !== 'authenticated' && (
            <Button size='sm'>
              <NavLink to={RoutePath.Signup} viewTransition>
                {t('signUp')}
              </NavLink>
            </Button>
          )}
        </div>
      </nav>
      <div className='relative w-full max-w-6xl flex-1'>
        <Outlet />
      </div>
      <footer className='flex items-center h-12 text-sm text-muted-foreground'>
        &copy; 2025 URL Shorten App. All rights reserved.
      </footer>
    </div>
  );
};
