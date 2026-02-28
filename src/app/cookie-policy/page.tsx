"use client";

import { Reveal } from "@/components/animations";

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              How we use cookies and similar technologies on our platform.
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
                  What are cookies?
                </h2>
                <p>
                  Cookies are small text files placed on your device when you
                  visit a website. They help websites remember your preferences,
                  understand how you use the site, and improve your experience.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  How we use cookies
                </h2>
                <p className="mb-3">We use cookies to:</p>
                <ul className="list-inside list-disc space-y-2">
                  <li>
                    Keep you signed in and remember your preferences
                  </li>
                  <li>
                    Understand how you interact with our platform
                  </li>
                  <li>
                    Improve our services and user experience
                  </li>
                  <li>
                    Provide relevant job recommendations
                  </li>
                  <li>
                    Analyze site traffic and performance
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Types of cookies we use
                </h2>
                <p className="mb-3">
                  <strong className="text-white">Essential cookies:</strong>{" "}
                  Required for the platform to function. These enable core
                  features like authentication, security, and navigation.
                </p>
                <p className="mb-3">
                  <strong className="text-white">Analytics cookies:</strong>{" "}
                  Help us understand how visitors use our website so we can
                  improve it. These collect anonymous usage data.
                </p>
                <p>
                  <strong className="text-white">Functional cookies:</strong>{" "}
                  Remember your preferences such as language, region, and
                  display settings to provide a personalized experience.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Third-party cookies
                </h2>
                <p>
                  We may use third-party services such as analytics providers
                  that set their own cookies. These cookies are governed by the
                  respective third party&apos;s privacy policy. We do not control
                  these cookies.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Managing cookies
                </h2>
                <p>
                  Most web browsers allow you to control cookies through their
                  settings. You can choose to block or delete cookies, but this
                  may affect the functionality of our platform. Refer to your
                  browser&apos;s help documentation for instructions on managing
                  cookie preferences.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Contact us
                </h2>
                <p>
                  If you have questions about our cookie practices, please
                  contact us at{" "}
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
