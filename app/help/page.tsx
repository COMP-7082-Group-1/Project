import type { Metadata } from "next";
import Link from "next/link";
import { CircleHelp, Mail, MessageSquare, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Help | Event Tap",
  description: "Support resources and contact information for Event Tap.",
};

const quickLinks = [
  {
    title: "Getting started",
    description:
      "Create your first event, publish your RSVP page, and start tracking responses.",
  },
  {
    title: "Managing guests",
    description:
      "Review RSVPs, monitor response statuses, and keep your guest list organized.",
  },
  {
    title: "Account and settings",
    description:
      "Update your profile, keep your account secure, and adjust your event setup.",
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcfcfd_0%,#ffffff_28%,#fff7f7_100%)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-[#c8242b]">
            <CircleHelp className="h-4 w-4" />
            Help Center
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Support for hosts who want things to run smoothly
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Event Tap is designed to keep event planning simple. If you need a
            hand, this page gives you the essentials for setup, troubleshooting,
            and getting in touch.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#c8242b] hover:text-[#c8242b]"
            >
              View Privacy Policy
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {quickLinks.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Frequently needed help
            </h2>

            <div className="mt-6 space-y-6 text-slate-600">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  How do I create an event?
                </h3>
                <p className="mt-2 leading-7">
                  After signing in, go to your dashboard and choose
                  &quot;Create Event.&quot; Add your event details, customize
                  the page, and publish when you are ready to share.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Can I track guest responses in one place?
                </h3>
                <p className="mt-2 leading-7">
                  Yes. Your dashboard is built to help you review pending,
                  accepted, declined, and maybe responses without managing
                  separate spreadsheets.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  What should I do if something does not look right?
                </h3>
                <p className="mt-2 leading-7">
                  Refresh the page first, then check your event details and
                  settings. If the issue continues, contact support with the
                  page you were using and a short description of what happened.
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-slate-900 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">Contact support</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Need direct help? Reach out and include as much detail as you can
              so the issue can be resolved quickly.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <Mail className="mt-0.5 h-5 w-5 text-red-300" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-slate-300">
                    support@eventtap.app
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <MessageSquare className="mt-0.5 h-5 w-5 text-red-300" />
                <div>
                  <p className="font-medium">Response times</p>
                  <p className="text-sm text-slate-300">
                    Most support requests receive a reply within 1 to 2 business
                    days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-red-300" />
                <div>
                  <p className="font-medium">Account safety</p>
                  <p className="text-sm text-slate-300">
                    For privacy and security, do not send passwords or sensitive
                    payment information by email.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
