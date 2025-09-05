import { NavLink, Outlet } from 'react-router';

import { Button } from '@/components/ui/button';
import { RoutePath } from '@/shared/constants/routePath';
import { useLanguage } from '@/components/hooks/useLanguage';

import styles from './layout.module.css';

export const LandingLayout = () => {
  const { translate: t } = useLanguage();
  return (
    <div
      className={`w-screen min-h-dvh flex flex-col items-center ${styles['bg-container']}`}
    >
      <nav className='w-full max-w-[1440px] h-16 flex gap-3 py-4 px-6'>
        <div className='flex-1'>
          <h3 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            URL Shorten
          </h3>
        </div>
        <div className='flex gap-inherit'>
          <Button asChild variant='outline' size='sm'>
            <NavLink to={RoutePath.Login} viewTransition>
              {t('logIn')}
            </NavLink>
          </Button>
          <Button size='sm'>
            <NavLink to={RoutePath.Signup} viewTransition>
              {t('signUp')}
            </NavLink>
          </Button>
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
