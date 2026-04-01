import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Scale, ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Event Tap",
  description: "Terms that govern the use of Event Tap.",
};

const terms = [
  {
    title: "Using Event Tap",
    body: "You agree to use Event Tap responsibly and in compliance with applicable laws. You are responsible for the information you upload, publish, or share through your events.",
  },
  {
    title: "Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for activity that occurs under your account.",
  },
  {
    title: "Event content",
    body: "You retain responsibility for your event details, guest communications, and uploaded content. You should only share information you are permitted to use.",
  },
  {
    title: "Service availability",
    body: "We work to keep the platform reliable, but Event Tap may change, be updated, or experience interruptions from time to time.",
  },
  {
    title: "Termination",
    body: "We may suspend or terminate access when necessary to protect the platform, comply with legal obligations, or respond to misuse.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcfcfd_0%,#ffffff_26%,#fff7f7_100%)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-[#c8242b]">
            <FileText className="h-4 w-4" />
            Terms of Service
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Clear terms for using Event Tap
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            These terms describe the general rules, responsibilities, and
            expectations for using the Event Tap platform.
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Last updated: March 31, 2026
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <Scale className="h-6 w-6 text-[#c8242b]" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Fair use
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use the platform in a lawful, respectful, and non-abusive way.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <ScrollText className="h-6 w-6 text-[#c8242b]" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Responsibilities
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Hosts remain responsible for their event setup, guest data, and
              communications.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <FileText className="h-6 w-6 text-[#c8242b]" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Updates
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              These terms may be revised as the product evolves or legal
              requirements change.
            </p>
          </article>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-sm">
          <div className="space-y-8">
            {terms.map((term) => (
              <div key={term.title}>
                <h2 className="text-xl font-semibold text-slate-900">
                  {term.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">{term.body}</p>
              </div>
            ))}

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Limitation of liability
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                To the extent permitted by law, Event Tap is provided on an
                &quot;as is&quot; basis without guarantees of uninterrupted
                availability or fitness for every use case.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Contact
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Questions about these terms can be sent to
                {" "}
                <a
                  href="mailto:legal@eventtap.app"
                  className="font-medium text-[#c8242b] hover:underline"
                >
                  legal@eventtap.app
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-[#c8242b] hover:text-[#c8242b]"
            >
              View Privacy Policy
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
