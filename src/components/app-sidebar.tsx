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
import type { UserAccount } from '@/modules/dashboard/store/types/userAccount';

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

interface Props extends React.ComponentProps<typeof Sidebar> {
  user: UserAccount;
}

export function AppSidebar({ user, ...props }: Props) {
  const { userName, email } = user;

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects sectionLabel='Menu' projects={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser name={userName} email={email} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
