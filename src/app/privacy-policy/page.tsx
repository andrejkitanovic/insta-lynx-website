"use client";

import { Reveal } from "@/components/animations";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              How we collect, use, and protect your personal information.
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
                  Last updated
                </h2>
                <p>
                  This privacy policy was last updated and is effective as of the
                  date posted at the top of this page.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Information we collect
                </h2>
                <p className="mb-3">
                  We collect information you provide when you create an account,
                  apply for jobs, complete your profile, or contact us. This may
                  include:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Resume, employment history, and driving experience</li>
                  <li>CDL and license information</li>
                  <li>Location data when you use our app or search for jobs</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  How we use your information
                </h2>
                <p className="mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-inside list-disc space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Match drivers with carriers and job opportunities</li>
                  <li>Send you relevant job recommendations and updates</li>
                  <li>Process applications and communicate with you</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Sharing of information
                </h2>
                <p>
                  We may share your profile and application information with
                  carriers when you apply to jobs. We do not sell your personal
                  information to third parties. We may share data with service
                  providers who assist our operations, subject to confidentiality
                  agreements.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Data security
                </h2>
                <p>
                  We use industry-standard measures to protect your personal
                  information. However, no method of transmission over the
                  internet or electronic storage is 100% secure.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Your choices
                </h2>
                <p>
                  You can update your profile and preferences in the app. You may
                  request access to, correction of, or deletion of your personal
                  data by contacting us. You can opt out of marketing
                  communications at any time.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Contact us
                </h2>
                <p>
                  If you have questions about this privacy policy or our data
                  practices, please contact us at{" "}
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
