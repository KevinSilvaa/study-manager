import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Book } from "lucide-react";
import { MainSidebarNav } from "./main-sidebar-nav";
import { SecondarySidebarNav } from "./secondary-sidebar-nav";
import { UserSidebarNav } from "./user-sidebar-nav";
import type { ReactNode } from "react";

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  data: {
    user: {
      name: string
      email: string
    }
    navMain: {
      title: string
      url: string
      icon: ReactNode
    }[]
    navSecondary: {
      title: string
      url: string
      icon: ReactNode
    }[]
  }
}

export function DashboardSidebar({
  data,
  ...props
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-sidebar">
              <Book className="size-5!" />
              <span className="text-base font-semibold">Study Manager</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainSidebarNav items={data.navMain} />
        <SecondarySidebarNav items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserSidebarNav user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
