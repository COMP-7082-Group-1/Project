import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import logo from "../logo.png";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_22%,#fff7f7_100%)]">
      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
            <Link href="/dashboard" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Image
                  src={logo}
                  alt="Event Tap Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c8242b]">
                  Event Tap
                </span>
                <span className="text-sm text-slate-500">
                  Host operations dashboard
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Button
                asChild
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link href="/dashboard/events/new">
                  <Plus className="h-4 w-4" />
                  Create Event
                </Link>
              </Button>
              <ProfileDropdown />
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-1 overflow-hidden px-4 py-6 sm:px-6">
          <div className="flex flex-1 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <DashboardSidebar />
            <div className="flex-1 border-l border-slate-200/70 bg-white p-6 sm:p-8">
              {children}
            </div>
          </div>
        </div>

        <footer className="border-t border-slate-200/80 bg-white/95">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Image
                  src={logo}
                  alt="Event Tap Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Event Tap</p>
                <p className="text-sm text-slate-500">
                  Modern planning tools for polished event teams.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <Link href="/dashboard" className="transition hover:text-[#c8242b]">
                Dashboard
              </Link>
              <Link
                href="/dashboard/events"
                className="transition hover:text-[#c8242b]"
              >
                Events
              </Link>
              <Link href="/privacy" className="transition hover:text-[#c8242b]">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-[#c8242b]">
                Terms
              </Link>
              <Link
                href="/dashboard/settings"
                className="transition hover:text-[#c8242b]"
              >
                Settings
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
