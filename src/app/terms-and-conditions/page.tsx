"use client";

import { Reveal } from "@/components/animations";

export default function TermsAndConditionsPage() {
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
              Terms and Conditions
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Terms governing your use of NovaLinx services and the app.
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
                  Agreement to terms
                </h2>
                <p>
                  By accessing or using NovaLinx (&quot;we,&quot; &quot;us,&quot;
                  or &quot;our&quot;) websites, mobile applications, or services,
                  you agree to be bound by these Terms and Conditions. If you do
                  not agree, do not use our services.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Use of the service
                </h2>
                <p className="mb-3">
                  You may use NovaLinx to search for driving jobs, apply to
                  positions, communicate with carriers, and manage your profile.
                  You agree to:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not misuse, abuse, or attempt to gain unauthorized access</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Accounts and eligibility
                </h2>
                <p>
                  You must be at least 18 years old and legally able to enter
                  into contracts to use our services. You are responsible for
                  maintaining the confidentiality of your account credentials and
                  for all activity under your account.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Job applications and carrier matching
                </h2>
                <p>
                  NovaLinx facilitates connections between drivers and carriers.
                  We do not employ drivers or guarantee job placement. The
                  relationship between you and a carrier is between you and
                  that carrier. We are not responsible for carrier hiring
                  decisions, job offers, or employment terms.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Intellectual property
                </h2>
                <p>
                  All content, features, and functionality of our services
                  (including but not limited to text, graphics, logos, and
                  software) are owned by NovaLinx or our licensors and are
                  protected by copyright, trademark, and other laws.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Disclaimers
                </h2>
                <p>
                  Our services are provided &quot;as is&quot; and &quot;as
                  available&quot; without warranties of any kind. We do not
                  warrant that the service will be uninterrupted, error-free, or
                  free of harmful components. You use the service at your own
                  risk.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Limitation of liability
                </h2>
                <p>
                  To the maximum extent permitted by law, NovaLinx and its
                  affiliates shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, or any loss of
                  profits or data, arising from your use of the service.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Changes
                </h2>
                <p>
                  We may modify these terms at any time. We will notify you of
                  material changes by posting the updated terms on this page and
                  updating the &quot;Last updated&quot; date. Continued use of
                  the service after changes constitutes acceptance.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Contact
                </h2>
                <p>
                  For questions about these Terms and Conditions, contact us at{" "}
                  <a
                    href="mailto:legal@novalinx.io"
                    className="text-white underline hover:no-underline"
                  >
                    legal@novalinx.io
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
