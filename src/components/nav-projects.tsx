import { NavLink } from 'react-router';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { type LucideIcon } from 'lucide-react';

interface Items {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface Props {
  sectionLabel?: string;
  projects: Items[];
}

export function NavProjects({ sectionLabel = 'Projects', projects }: Props) {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>{sectionLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem
            key={item.name}
            onClick={() => {
              if (openMobile) {
                setOpenMobile(false);
              }
            }}
          >
            <NavLink to={item.url}>
              {({ isActive }) => (
                <SidebarMenuButton isActive={isActive}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
