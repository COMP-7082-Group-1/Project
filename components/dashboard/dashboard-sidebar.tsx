"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  LayoutDashboard,
  PartyPopper,
  Settings,
  HelpCircle,
  PlusCircle,
} from "lucide-react";
import { DashboardSidebarItem } from "./dashboard-sidebar-item";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        label: "My Events",
        href: "/dashboard/events",
        icon: <PartyPopper className="h-4 w-4" />,
      },
      {
        label: "Create a New Event",
        href: "/dashboard/events/new",
        icon: <PlusCircle className="h-4 w-4" />,
      },
      // {
      //   label: "Guest List",
      //   href: "/dashboard/guests",
      //   icon: <Users className="h-4 w-4" />,
      // },
      // {
      //   label: "Invitations",
      //   href: "/dashboard/invitations",
      //   icon: <Mail className="h-4 w-4" />,
      // },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: <Settings className="h-4 w-4" />,
      },
    ],
    []
  );

  return (
    <aside className="w-56 shrink-0 border-r flex flex-col justify-between py-6 px-3">
      <nav className="flex flex-col gap-1">
        {routes.map((route) => (
          <DashboardSidebarItem
            key={route.href}
            label={route.label}
            href={route.href}
            icon={route.icon}
            isActive={pathname === route.href}
          />
        ))}
      </nav>
      <div className="flex flex-col gap-1">
        <DashboardSidebarItem
          label="Help"
          href="/help"
          icon={<HelpCircle className="h-4 w-4" />}
          isActive={false}
        />
      </div>
    </aside>
  );
};
