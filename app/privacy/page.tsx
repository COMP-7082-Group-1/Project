import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, Shield, UserRoundCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Event Tap",
  description: "Learn how Event Tap collects, uses, and protects your data.",
};

const sections = [
  {
    title: "Information we collect",
    body: "We may collect account information, event details, guest list data, RSVP responses, and technical information needed to operate and improve Event Tap.",
  },
  {
    title: "How we use information",
    body: "We use your information to provide the product, manage event workflows, improve reliability, communicate important updates, and support account security.",
  },
  {
    title: "When information is shared",
    body: "We do not sell your personal information. Data may be shared with service providers that help us host, secure, and operate the platform, subject to appropriate safeguards.",
  },
  {
    title: "Data retention",
    body: "We keep information for as long as needed to provide the service, comply with legal obligations, resolve disputes, and enforce our agreements.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_30%,#fff7f7_100%)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-[#c8242b]">
            <LockKeyhole className="h-4 w-4" />
            Privacy Policy
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Your event data should be handled with care
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            This policy explains, in general terms, how Event Tap collects,
            uses, and protects information connected to your account and event
            planning activity.
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Last updated: March 31, 2026
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <Shield className="h-6 w-6 text-[#c8242b]" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Protection
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We use reasonable safeguards designed to help protect account and
              event information.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <UserRoundCheck className="h-6 w-6 text-[#c8242b]" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Transparency
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We aim to explain data practices clearly so hosts can make
              informed decisions.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <LockKeyhole className="h-6 w-6 text-[#c8242b]" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Control
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              You can review and update event information from your dashboard as
              your needs change.
            </p>
          </article>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-sm">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold text-slate-900">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
              </div>
            ))}

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Your choices
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                You may request help with account questions or privacy-related
                concerns by contacting support. We may ask you to verify your
                identity before acting on certain requests.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Contact
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                For privacy questions, contact
                {" "}
                <a
                  href="mailto:privacy@eventtap.app"
                  className="font-medium text-[#c8242b] hover:underline"
                >
                  privacy@eventtap.app
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
            <Link
              href="/terms"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#c8242b] hover:text-[#c8242b]"
            >
              View Terms
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#c8242b] hover:text-[#c8242b]"
            >
              Visit Help
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
