import { requireUser } from "@/lib/auth";
import { CalendarDays, Mail, Shield, UserCircle2 } from "lucide-react";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function ProfilePage() {
  const user = await requireUser();
  const displayName = user.full_name?.trim() || "Event Tap User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-300/30">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-2xl font-semibold ring-1 ring-white/15">
              {initials}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-red-300">Profile</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">{displayName}</h1>
              <p className="mt-2 text-slate-300">
                Manage your account details and review your Event Tap profile.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Member since</p>
            <p className="mt-2 text-lg font-semibold">{formatDate(user.created_at)}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-red-50 p-3 text-red-600">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Account details</h2>
              <p className="text-sm text-slate-500">Your current account information.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Full name</p>
              <p className="mt-2 text-base font-medium text-slate-900">{displayName}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Email address</p>
              <p className="mt-2 text-base font-medium text-slate-900">{user.email}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Role</p>
              <p className="mt-2 text-base font-medium capitalize text-slate-900">{user.role}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm text-slate-500">Last updated</p>
              <p className="mt-2 text-base font-medium text-slate-900">
                {formatDate(user.updated_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[1.75rem] border border-slate-200/70 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Quick summary</h2>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <Mail className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-slate-900">Primary email</p>
                  <p className="text-sm text-slate-500">This email is used for login and updates.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <Shield className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-slate-900">Account role</p>
                  <p className="text-sm text-slate-500">
                    Your current access level is set to {user.role}.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <CalendarDays className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-slate-900">Joined Event Tap</p>
                  <p className="text-sm text-slate-500">{formatDate(user.created_at)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-red-100 bg-red-50/70 p-7">
            <h2 className="text-lg font-semibold text-slate-900">Next step</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              If you want editable profile settings, the next logical step is adding a form here to
              update your name, email, and password.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
