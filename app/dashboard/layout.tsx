import { ThemeSwitcher } from "@/components/theme-switcher";
import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../logo.png";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/30 via-transparent to-transparent" />

      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center">
                  <Image
                    src={logo}
                    alt="Event Tap Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-lg font-semibold tracking-tight text-slate-900">
                  Event Tap
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button
                asChild
                size="sm"
                className="hidden rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-5 text-white shadow-lg shadow-red-200 transition hover:from-red-700 hover:to-rose-600 sm:inline-flex"
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

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
          <div className="flex-1 rounded-[2rem] border border-slate-200/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur sm:p-8">
            {children}
          </div>
        </div>

        <footer className="border-t border-slate-200/70 bg-white/70">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center">
                <Image
                  src={logo}
                  alt="Event Tap Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Event Tap</p>
                <p className="text-sm text-slate-500">Plan smarter. Host happier.</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/dashboard" className="transition hover:text-red-700">
                Dashboard
              </Link>
              <Link href="/dashboard/events" className="transition hover:text-red-700">
                Events
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
