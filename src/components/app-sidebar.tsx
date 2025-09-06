import { House, Link } from 'lucide-react';
import * as React from 'react';

import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useDashboardStore } from '@/modules/dashboard/store/dashboardStore';

// This is sample data.
const data = {
  teams: [
    {
      name: 'URL Shorten',
      logo: () => <img src='/favicon.svg' alt='favicon' className='size-6' />,
      plan: 'Free',
    },
  ],
  items: [
    {
      name: 'Home',
      url: '/home',
      icon: House,
    },
    {
      name: 'Links',
      url: '/links',
      icon: Link,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useDashboardStore((state) => state.user);

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects sectionLabel='Menu' projects={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.userName,
            email: user.email,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
