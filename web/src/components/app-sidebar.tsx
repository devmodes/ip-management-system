import * as React from "react";
import {
  ActivityIcon,
  BookOpen,
  Bot,
  Command,
  LifeBuoy,
  Map,
  NetworkIcon,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  UsersIcon,
} from "lucide-react";

import { NavContents } from "@components/nav-projects";
import { NavUser } from "@components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar";
import { Link } from "react-router-dom";

const data = {
  contents: [
    {
      name: "User Management",
      url: "/app/users",
      icon: UsersIcon,
    },
    {
      name: "IP Address",
      url: "/app/ip-address",
      icon: NetworkIcon,
    },
    {
      name: "Audit Logs",
      url: "/app/audit",
      icon: ActivityIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/app">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">TECHLINT</span>
                  <span className="truncate text-xs">
                    Digital Solutions Firm
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavContents projects={data.contents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
