import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  House,
  Link,
  Map,
} from 'lucide-react';
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
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    }
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
    }
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
            name: user.displayName,
            email: user.email,
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
