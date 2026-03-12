import { ThemeSwitcher } from "@/components/theme-switcher";
import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full flex justify-between items-center border-b border-b-foreground/10 h-16 px-6 shrink-0">
        <div className="flex items-center gap-5 font-semibold">
          <Link href={"/dashboard"}>Event Tap</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <ProfileDropdown />
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
