import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';

import { AppSidebar } from '@/components/app-sidebar';
import { PendingSpinner } from '@/components/status-indicators/PendingSpinner';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { RoutePath } from '@/shared/constants/routePath';
import { useAuthStore } from '../../auth/store/authStore';
import type { Status } from '../../auth/store/types/status.type';

const allowedStatus: Status[] = ['checking', 'authenticated'];

export const DashboardLayout = () => {
  const status = useAuthStore((state) => state.status);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    if (status === 'authenticated')
      useAuthStore.setState((state) => ({ ...state, status: 'checking' }));

    if (status == null || allowedStatus.includes(status)) refreshToken();
  }, []);

  if (status == null || !allowedStatus.includes(status)) {
    return <Navigate to={RoutePath.Login} />;
  }

  if (status === 'checking') return <PendingSpinner fullScreen />;

  return (
    <SidebarProvider>
      <AppSidebar />
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
        <div className='flex items-center flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='container min-h-full'>
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
