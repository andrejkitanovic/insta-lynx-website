"use client";

import { Reveal } from "@/components/animations";

// Must match signIn.smsConsent in mobile/i18n/locales/en.json
const CONSENT_TEXT =
  "By tapping Send Verification Code, you agree to receive text messages from NovaLinx: verification codes and account alerts (application updates, new messages, reminders). Message frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out.";

const link = "text-white underline hover:no-underline";

export default function SmsTermsPage() {
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
              SMS Terms
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              How NovaLinx uses text messages, how you opt in, and how to opt
              out.
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
                  NovaLinx Text Alerts
                </h2>
                <p>
                  NovaLinx is a job platform that connects CDL truck drivers
                  with trucking companies. We send text messages only to drivers
                  who create an account in the NovaLinx mobile app (iOS and
                  Android) and agree to receive them. We do not send marketing
                  or promotional text messages.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  What you will receive
                </h2>
                <ul className="list-inside list-disc space-y-2">
                  <li>One-time verification codes to sign in</li>
                  <li>
                    Application status updates, for example when a carrier hires
                    you
                  </li>
                  <li>Alerts when a carrier sends you a new message</li>
                  <li>Reminders to finish your driver profile</li>
                </ul>
                <p className="mt-4">Example messages:</p>
                <ul className="mt-2 list-inside list-disc space-y-2">
                  <li>&ldquo;Your NovaLinx verification code is: 123456&rdquo;</li>
                  <li>
                    &ldquo;You have a new message from a carrier on NovaLinx.
                    Open the app to reply. Reply STOP to opt out.&rdquo;
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  How you opt in
                </h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>Download the NovaLinx app and open the sign-in screen.</li>
                  <li>Enter your mobile phone number.</li>
                  <li>
                    Read the disclosure shown under the button and tap{" "}
                    <span className="text-white">Send Verification Code</span>.
                  </li>
                  <li>
                    Enter the one-time code we text you to confirm the number.
                  </li>
                </ol>
                <p className="mt-4">The disclosure in the app reads:</p>
                <blockquote className="mt-2 border-l-2 border-white/20 pl-4 italic text-neutral-300">
                  {CONSENT_TEXT}
                </blockquote>
                <p className="mt-4">
                  Next to it are links to these SMS Terms and our Privacy
                  Policy. We only text numbers that opted in this way. We never
                  buy phone numbers or add numbers collected anywhere else.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Frequency and cost
                </h2>
                <p>
                  Message frequency varies with your account activity. Message
                  and data rates may apply, depending on your mobile plan.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Opt out and help
                </h2>
                <p>
                  Reply <span className="text-white">STOP</span> to any message
                  to stop receiving texts. You will get one confirmation and no
                  further messages. Reply{" "}
                  <span className="text-white">START</span> to opt back in.
                  Reply <span className="text-white">HELP</span> for help, or
                  email{" "}
                  <a href="mailto:support@novalinx.io" className={link}>
                    support@novalinx.io
                  </a>
                  . Mobile carriers are not liable for delayed or undelivered
                  messages.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div>
                <h2 className="mb-4 text-xl font-medium text-white">
                  Privacy
                </h2>
                <p>
                  No mobile information will be shared with third parties or
                  affiliates for marketing or promotional purposes. Text
                  messaging opt-in data and consent are never sold or shared
                  with any third party. See our{" "}
                  <a href="/privacy-policy" className={link}>
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms-and-conditions" className={link}>
                    Terms of Service
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
