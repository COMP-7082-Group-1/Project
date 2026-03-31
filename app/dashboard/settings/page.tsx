import Link from "next/link";
import { LockKeyhole, Mail, Settings2, Sparkles, UserRound } from "lucide-react";

import { updateAccountSettings } from "@/app/dashboard/settings/actions";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ saved?: string }>;
}) {
  const user = await requireUser();
  const params = searchParams ? await searchParams : undefined;
  const saved = params?.saved === "1";

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-300/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-red-300">
              Settings
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Account Settings
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Update the essentials for your Event Tap account and keep your
              security details in one place.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
              Last updated
            </p>
            <p className="mt-2 text-lg font-semibold">
              {formatDate(user.updated_at)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-red-50 p-3 text-red-600">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Account preferences
              </h2>
              <p className="text-sm text-slate-500">
                Edit the core information tied to your profile.
              </p>
            </div>
          </div>

          {saved ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Your account settings were saved.
            </div>
          ) : null}

          <form
            action={updateAccountSettings}
            className="mt-6 grid gap-5 sm:grid-cols-2"
          >
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="full_name" className="text-sm font-medium text-slate-900">
                Full name
              </label>
              <input
                id="full_name"
                name="full_name"
                required
                defaultValue={user.full_name}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-red-300 focus:bg-white"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-900">
                Email address
              </label>
              <input
                id="email"
                name="email"
                disabled
                defaultValue={user.email}
                className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
              />
              <p className="text-xs text-slate-500">
                Email changes are not enabled yet in this dashboard.
              </p>
            </div>

            <div className="flex justify-end sm:col-span-2">
              <Button type="submit">Save settings</Button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Security</h2>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <LockKeyhole className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-slate-900">Password</p>
                  <p className="text-sm text-slate-500">
                    Change your password whenever you want to refresh account
                    security.
                  </p>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full justify-center">
                <Link href="/auth/update-password">Update password</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Account snapshot
            </h2>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <UserRound className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-slate-900">Display name</p>
                  <p className="text-sm text-slate-500">{user.full_name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <Mail className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-slate-900">Role</p>
                  <p className="text-sm capitalize text-slate-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
