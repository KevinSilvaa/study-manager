import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { DashboardHeader } from "./_components/dashboard-header";
import { redirect } from "next/navigation";
import { auth } from "auth";
import {
  ChartBar,
  Folder,
  LayoutDashboard,
  List,
  Settings,
  Users,
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await auth();

  if (!data?.user) {
    redirect("/sign-in");
  }

  const dashboardData = {
    user: {
      name: data.user.name,
      email: data.user.email,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        title: "Lifecycle",
        url: "#",
        icon: <List />,
      },
      {
        title: "Analytics",
        url: "#",
        icon: <ChartBar />,
      },
      {
        title: "Projects",
        url: "#",
        icon: <Folder />,
      },
      {
        title: "Team",
        url: "#",
        icon: <Users />,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: <Settings />,
      },
    ],
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar data={dashboardData} variant="inset" />

      <SidebarInset>
        <DashboardHeader />

        <div className="p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
