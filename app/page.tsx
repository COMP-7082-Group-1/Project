import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, Users, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import logo from "./logo.png";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // SAME functionality
  if (user) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: Calendar,
      title: "Beautiful RSVP Pages",
      description: "Create clean, customizable event pages that match your vibe.",
    },
    {
      icon: Users,
      title: "Guest Management",
      description: "Track plus-ones, dietary notes, and responses in one place.",
    },
    {
      icon: Sparkles,
      title: "Custom Branding",
      description: "Add images, colors, and questions — make it feel like your event.",
    },
    {
      icon: BarChart3,
      title: "Quick Insights",
      description: "See yes/no totals fast and stay on top of attendance.",
    },
  ];

  const steps = [
    { number: "01", title: "Create Event", desc: "Add details in minutes." },
    { number: "02", title: "Share Link", desc: "Send one RSVP link to everyone." },
    { number: "03", title: "Track RSVPs", desc: "Responses update as guests reply." },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      {/* NAV */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center">
              <Image
                src={logo}
                alt="Event Planner Logo"
                width={52}
                height={52}
                className="object-contain"
                priority
              />
            </div>
            <Link href="/" className="font-semibold tracking-tight text-slate-900">
              Event Tap
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full border-slate-300 bg-white/80 px-5 text-slate-700 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            >
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-5 text-white shadow-lg shadow-red-200 transition hover:from-red-700 hover:to-rose-600"
            >
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/40 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
              <Sparkles className="h-4 w-4" />
              Simple RSVPs. Clean dashboards. Less stress.
            </div> */}

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Event planning,{" "}
              <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                simplified
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Plan, organize, and manage your events all in one place. Create your RSVP page, share
              one link, and track responses without spreadsheets.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-xl px-8 py-6 text-lg shadow-lg shadow-slate-900/10 sm:w-auto"
              >
                <Link href="/auth/sign-up" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-xl border-2 px-8 py-6 text-lg sm:w-auto"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                No spreadsheets
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Fast setup
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Clean RSVP tracking
              </span>
            </div>
          </div>

          {/* PREVIEW CARD */}
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-200/60 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-auto hidden text-xs text-slate-400 sm:block">
                  Preview (example data)
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 p-6 text-white">
                  <Calendar className="mb-4 h-8 w-8 text-red-400" />
                  <p className="text-2xl font-bold">Sarah&apos;s Wedding</p>
                  <p className="mt-2 text-sm text-slate-300">June 15, 2026</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">
                    <Sparkles className="h-3.5 w-3.5" />
                    Theme enabled
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl bg-slate-50 p-6">
                  <div>
                    <p className="text-sm text-slate-500">Total RSVPs</p>
                    <p className="mt-1 text-4xl font-bold text-slate-900">142</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      118 Yes
                    </span>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-700">
                      24 No
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 p-6 text-white">
                  <CheckCircle2 className="mb-4 h-8 w-8" />
                  <p className="text-lg font-semibold">83% Response Rate</p>
                  <p className="mt-2 text-sm text-white/80">
                    Strong engagement — you&apos;re on track.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Clean tools to help you host without chaos.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500">
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mt-4 text-lg text-slate-300">Three simple steps.</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.number} className="text-center">
                <div className="text-6xl font-bold text-red-500/25">{s.number}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-slate-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center">
              <Image
                src={logo}
                alt="Event Planner Logo"
                width={52}
                height={52}
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-slate-900">Event Tap</p>
              <p className="text-xs text-slate-500">Plan smarter. Host happier.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ThemeSwitcher />
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} Event Tap</p>
          </div>
        </div>
      </footer>
    </main>
  );
}