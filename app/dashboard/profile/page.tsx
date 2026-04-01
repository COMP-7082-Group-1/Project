import Link from "next/link";
import { Suspense } from "react";
import { Mail, Settings2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfilePageSkeleton />}>
      <ProfilePageContent />
    </Suspense>
  );
}

async function ProfilePageContent() {
  const user = await requireUser();
  const displayName = user.full_name?.trim() || "Event Tap User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <section className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-300/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-2xl font-semibold ring-1 ring-white/15">
              {initials}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-red-300">
                Profile
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                {displayName}
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Your Event Tap account details.
              </p>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
          >
            <Link href="/dashboard/settings">
              <Settings2 className="h-4 w-4" />
              Edit Settings
            </Link>
          </Button>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200/70 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Account Details
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <UserRound className="h-4 w-4 text-red-500" />
              Full name
            </div>
            <p className="mt-2 text-base font-medium text-slate-900">
              {displayName}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Mail className="h-4 w-4 text-red-500" />
              Email address
            </div>
            <p className="mt-2 text-base font-medium text-slate-900">
              {user.email}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-2 text-base font-medium capitalize text-slate-900">
              {user.role}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm text-slate-500">Member since</p>
            <p className="mt-2 text-base font-medium text-slate-900">
              {formatDate(user.created_at)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfilePageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <section className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-300/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/15" />
            <div className="flex flex-col gap-3">
              <div className="h-3 w-20 animate-pulse rounded bg-white/20" />
              <div className="h-8 w-48 animate-pulse rounded bg-white/20" />
              <div className="h-4 w-56 animate-pulse rounded bg-white/15" />
            </div>
          </div>

          <div className="h-10 w-36 animate-pulse rounded-md bg-white/15" />
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200/70 bg-white p-7 shadow-sm">
        <div className="h-7 w-40 animate-pulse rounded bg-slate-200" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-5 w-36 animate-pulse rounded bg-slate-300" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-5 w-48 animate-pulse rounded bg-slate-300" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-5 w-20 animate-pulse rounded bg-slate-300" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-5 w-32 animate-pulse rounded bg-slate-300" />
          </div>
        </div>
      </section>
    </div>
  );
}