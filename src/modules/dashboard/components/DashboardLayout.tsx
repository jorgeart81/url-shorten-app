import { Outlet } from 'react-router';

import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import type { UserAccount } from '../store/types/userAccount';
import { useDashboardStore } from '../store/dashboardStore';

/**
 * DashboardLayout
 *
 * Renders the visual shell (sidebar + header) for authenticated dashboard
 * routes. Auth/session validation lives in ProtectedRoute, which is the
 * only route that renders this layout, so `user` is guaranteed to be
 * loaded by the time this component mounts.
 */
export const DashboardLayout = () => {
  const user = useDashboardStore((state) => state.user) as UserAccount;

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
