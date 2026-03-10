"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardSidebarItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export const DashboardSidebarItem = ({
  label,
  href,
  icon,
  isActive,
}: DashboardSidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};
