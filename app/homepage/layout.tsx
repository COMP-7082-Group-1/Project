import Image from "next/image";
import Link from "next/link";

import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";
import { ThemeSwitcher } from "@/components/theme-switcher";
import logo from "../logo.png";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcfcfd_0%,#ffffff_28%,#fff7f7_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 sm:px-6">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between">
            <Link href="/homepage" className="flex items-center gap-4">
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
                  Elegant event planning software
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-5">
              <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
                <Link href="/homepage" className="transition hover:text-[#c8242b]">
                  Overview
                </Link>
                <Link href="/dashboard" className="transition hover:text-[#c8242b]">
                  Dashboard
                </Link>
              </nav>
              <ProfileDropdown />
            </div>
          </div>
        </header>

        <div className="flex-1 py-10">{children}</div>

        <footer className="border-t border-slate-200/80 bg-white/90">
          <div className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c8242b]">
                Event Tap
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Built for hosts who want a cleaner planning workflow, confident
                guest communication, and a dashboard that feels production-ready.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <Link href="/homepage" className="transition hover:text-[#c8242b]">
                Home
              </Link>
              <Link href="/dashboard" className="transition hover:text-[#c8242b]">
                Dashboard
              </Link>
              <Link
                href="/dashboard/events"
                className="transition hover:text-[#c8242b]"
              >
                My Events
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
