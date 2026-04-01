import { Suspense } from "react";
import { SignUpForm } from "@/components/sign-up-form";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import logo from "../../logo.png";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/40 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="hidden lg:block">
            <Link href="/" className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center">
                <Image
                  src={logo}
                  alt="Event Tap Logo"
                  width={52}
                  height={52}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                Event Tap
              </span>
            </Link>

            <div className="mt-10 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
                <Sparkles className="h-4 w-4" />
                Launch polished event pages faster.
              </div>

              <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
                Create your{" "}
                <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                  Event Tap
                </span>{" "}
                account
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Start building RSVP pages, organizing guests, and tracking responses with a clean,
                simple workflow.
              </p>

              <div className="mt-8 space-y-3 text-sm text-slate-600">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Custom RSVP pages
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Guest and plus-one tracking
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Real-time response updates
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
                <Image
                  src={logo}
                  alt="Event Tap Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
                <span className="text-lg font-semibold tracking-tight text-slate-900">
                  Event Tap
                </span>
              </div>

              <Suspense fallback={<div className="h-96 rounded-3xl bg-white/80" />}>
                <SignUpForm />
              </Suspense>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}