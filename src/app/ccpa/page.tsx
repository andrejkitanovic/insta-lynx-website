"use client";

import { Reveal } from "@/components/animations";

export default function CCPAPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center sm:pt-24">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Legal
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              CCPA Privacy Rights
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Your California Consumer Privacy Act rights and how to exercise
              them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-invert max-w-none space-y-10 text-neutral-400">
            <Reveal>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Your rights under CCPA
                </h2>
                <p className="mb-3">
                  If you are a California resident, the California Consumer
                  Privacy Act (CCPA) grants you the following rights regarding
                  your personal information:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>
                    <strong className="text-white">Right to Know:</strong> You
                    can request details about the categories and specific pieces
                    of personal information we have collected about you.
                  </li>
                  <li>
                    <strong className="text-white">Right to Delete:</strong> You
                    can request that we delete your personal information, subject
                    to certain exceptions.
                  </li>
                  <li>
                    <strong className="text-white">
                      Right to Opt-Out of Sale:
                    </strong>{" "}
                    NovaLinx does not sell your personal information. If this
                    changes, you will have the right to opt out.
                  </li>
                  <li>
                    <strong className="text-white">
                      Right to Non-Discrimination:
                    </strong>{" "}
                    We will not discriminate against you for exercising any of
                    your CCPA rights.
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Information we collect
                </h2>
                <p className="mb-3">
                  In the preceding 12 months, we may have collected the
                  following categories of personal information:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>
                    Identifiers (name, email, phone number, driver&apos;s
                    license number)
                  </li>
                  <li>
                    Professional information (employment history, CDL
                    credentials, driving experience)
                  </li>
                  <li>
                    Geolocation data (when using job search features)
                  </li>
                  <li>
                    Internet activity (browsing history on our platform, search
                    queries)
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  How to submit a request
                </h2>
                <p className="mb-3">
                  To exercise any of your CCPA rights, you may submit a
                  verifiable consumer request by:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>
                    Emailing us at{" "}
                    <a
                      href="mailto:privacy@novalinx.io"
                      className="text-white underline hover:no-underline"
                    >
                      privacy@novalinx.io
                    </a>{" "}
                    with the subject line &quot;CCPA Request&quot;
                  </li>
                  <li>
                    Calling us at{" "}
                    <a
                      href="tel:+18136443940"
                      className="text-white underline hover:no-underline"
                    >
                      (813) 644-3940
                    </a>
                  </li>
                  <li>
                    Using the delete account feature in the NovaLinx mobile app
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Verification process
                </h2>
                <p>
                  When you submit a request, we will verify your identity by
                  matching the information you provide with the information we
                  have on file. We may ask you to confirm your phone number or
                  email address. We will respond to verifiable requests within 45
                  days.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Authorized agents
                </h2>
                <p>
                  You may designate an authorized agent to make a request on
                  your behalf. Authorized agents must provide proof of written
                  permission from you and verify their own identity.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Contact us
                </h2>
                <p>
                  For questions about your CCPA rights, contact us at{" "}
                  <a
                    href="mailto:privacy@novalinx.io"
                    className="text-white underline hover:no-underline"
                  >
                    privacy@novalinx.io
                  </a>{" "}
                  or through our{" "}
                  <a
                    href="/contact"
                    className="text-white underline hover:no-underline"
                  >
                    contact page
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
