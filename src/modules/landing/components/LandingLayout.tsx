import { NavLink, Outlet } from 'react-router';
import { useLanguage } from '@/components/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { RoutePath } from '@/shared/constants/routePath';

export const LandingLayout = () => {
  const { translate: t } = useLanguage();
  const status = useAuthStore((state) => state.status);

  return (
    <div className='flex min-h-dvh w-screen flex-col items-center'>
      <nav className='w-full max-w-360 h-16 flex gap-3 py-4 px-6'>
        <div className='flex items-center gap-2 flex-1'>
          <img src='/favicon.svg' alt='favicon' className='size-9' />
          <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
            URL Shorten
          </h3>
        </div>
        <div className='flex gap-inherit'>
          <Button asChild variant='outline' size='sm'>
            <NavLink to={RoutePath.Login} viewTransition>
              {status === 'authenticated' ? t('myAccount') : t('logIn')}
            </NavLink>
          </Button>
        </div>
      </nav>

      <div className='relative w-full max-w-7xl flex-1'>
        <Outlet />
      </div>

      <footer className='flex min-h-12 w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 py-3 text-center text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary'>
        <span>
          &copy; {new Date().getFullYear()} URL Shorten App. All rights
          reserved.
        </span>
        <NavLink to={RoutePath.TermsAndConditions}>
          Terms and Conditions
        </NavLink>
      </footer>
    </div>
  );
};
