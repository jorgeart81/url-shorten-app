import { useEffect } from 'react';

import { LogOut, RotateCcw } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';

import { AppSidebar } from '@/components/app-sidebar';
import { FallbackContent } from '@/components/FallbackContent ';
import { useLanguage } from '@/components/hooks/useLanguage';
import { useToast } from '@/components/hooks/useToast';
import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { RoutePath } from '@/shared/constants/routePath';
import { useAuthStore } from '../../auth/store/authStore';
import type { Status } from '../../auth/store/types/status.type';
import { useDashboardStore } from '../store/dashboardStore';

const allowedStatus: Status[] = ['checking', 'authenticated'];

/**
 * DashboardLayout
 *
 * This component wraps all authenticated dashboard routes.
 * It checks the user's authentication status and refreshes the token if needed.
 * If the user is not authenticated, it redirects to the login page.
 * While authentication is being checked, it shows a loading spinner.
 * All child routes rendered inside <Outlet /> require authentication.
 */
export const DashboardLayout = () => {
  const { toastError } = useToast();
  const { translate: t, getErrorTranslation } = useLanguage();

  const status = useAuthStore((state) => state.status);
  const errorCode = useAuthStore((state) => state.errorCode);
  const logout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useDashboardStore((state) => state.user);
  const getAccount = useDashboardStore((state) => state.getAccount);

  const init = async () => {
    if (status === 'authenticated')
      useAuthStore.setState((state) => ({ ...state, status: 'checking' }));

    if (status == null || allowedStatus.includes(status)) {
      const { isSuccess } = await refreshToken();
      if (!isSuccess) {
        toastError(getErrorTranslation(errorCode).description);
        return;
      }
      await getAccount();
    }
  };

  useEffect(() => {
    init();
  }, []);
  if (status == null || !allowedStatus.includes(status)) {
    return <Navigate to={RoutePath.Login} />;
  }
  
  if (errorCode === 'NETWORK_ERROR' || errorCode === 'MAX_DEVICE_LIMIT_REACHED')
    return (
      <FallbackContent
        title={t('errorBoundary.title')}
        description={getErrorTranslation(errorCode).description}
      >
        <Button variant='ghost' onClick={() => window.location.reload()}>
          <RotateCcw /> {t('errorBoundary.reloadButton')}
        </Button>
        <Button variant='ghost' onClick={logout}>
          <LogOut /> {t('logOut')}
        </Button>
      </FallbackContent>
    );
    
    if (status === 'checking' || !user) {
    return <PendingSpinner fullScreen />;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};
