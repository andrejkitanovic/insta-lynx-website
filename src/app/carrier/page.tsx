"use client";

import { motion } from "framer-motion";
import {
  Users,
  Crosshair,
  Clock,
  CurrencyDollar,
  EnvelopeSimple,
  Robot,
  FileText,
  Headset,
  UsersFour,
  BellRinging,
  Star,
  Quotes,
  Plus,
  CaretRight,
  ChartLineUp,
  ShieldCheck,
  Crown,
  MagnifyingGlass,
  Check,
} from "@phosphor-icons/react";
import {
  Reveal,
  StaggerContainer,
  SectionHeader,
  cardChild,
} from "@/components/animations";

export default function CarrierPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">For Carriers</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              We Help Trucking Companies Hire&nbsp;Drivers.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500 sm:text-lg">
              The trucking-only job platform that puts your open positions in
              front of qualified, actively-looking CDL drivers.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Book a Free Demo
              </a>
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/3 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/25 hover:bg-white/6">
                See Plans <CaretRight size={14} weight="bold" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Difference */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-200px] top-[-100px] h-[400px] w-[400px] rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader label="Why NovaLinx" title="The NovaLinx Difference" description="What sets us apart from generic job boards." />
          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, title: "Qualified Drivers", desc: "Every driver on our platform has a verified CDL and is actively job-hunting." },
              { icon: Crosshair, title: "All-in on Trucking", desc: "We're not a general job board. Trucking is all we do — and we do it well." },
              { icon: Clock, title: "Improved Time-to-hire", desc: "Our matching fills seats 3x faster than traditional recruiting." },
              { icon: CurrencyDollar, title: "No Upfront Costs", desc: "Start with our free plan. Only pay when you're ready to scale." },
            ].map((item) => (
              <motion.div key={item.title} variants={cardChild} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-neutral-400 transition-colors group-hover:text-white">
                  <item.icon size={20} weight="duotone" />
                </div>
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-100px] bottom-[-100px] h-[400px] w-[400px] rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader label="Testimonials" title="What Our Customers Say" />
          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-3">
            {[
              { quote: "NovaLinx cut our time-to-hire by 60%. The driver quality is unmatched.", name: "Boba Kecman", role: "Transfinity Logistics" },
              { quote: "We went from struggling to fill seats to having a pipeline of qualified drivers.", name: "Carlos L. González", role: "Cadak Transportation Inc" },
              { quote: "The platform pays for itself within the first month. Incredible ROI.", name: "Shane Manternach", role: "RT&T Enterprises Inc" },
            ].map((item) => (
              <motion.div key={item.name} variants={cardChild} className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6">
                <Quotes size={18} weight="fill" className="mb-3 text-neutral-800" />
                <p className="text-sm leading-relaxed text-neutral-400">{item.quote}</p>
                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-neutral-600">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader label="Features" title="Time-Saving Features" description="Everything you need to recruit smarter and faster." />
          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: EnvelopeSimple, title: "Invite Drivers to Apply", desc: "Proactively reach out to drivers that match your job requirements." },
              { icon: Robot, title: "CoPilot — Recruit Smarter", desc: "Our AI assistant helps you craft listings and identify the best candidates." },
              { icon: FileText, title: "Complete Applications", desc: "Receive full driver applications — no more chasing missing information." },
              { icon: Headset, title: "Dedicated Support", desc: "A real person to help you optimize listings and improve results." },
              { icon: UsersFour, title: "Match with Qualified Drivers", desc: "Our algorithm surfaces drivers whose preferences align with your lanes." },
              { icon: BellRinging, title: "Automated Notifications", desc: "Get instant alerts when a qualified driver applies to your posting." },
            ].map((item) => (
              <motion.div key={item.title} variants={cardChild} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-neutral-400 transition-colors group-hover:text-white">
                  <item.icon size={20} weight="duotone" />
                </div>
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Premium benefits */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-200px] top-[40%] h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader label="Premium" title="Why Go Premium?" description="Unlock the full power of the platform." />
          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: ChartLineUp, title: "Top of Search Results", desc: "Premium listings appear first when drivers search for jobs." },
              { icon: Users, title: "Unlimited Applications", desc: "No caps on qualified driver applications to your postings." },
              { icon: FileText, title: "Complete Applications", desc: "Full driver profiles with CDL info, endorsements, and work history." },
              { icon: ShieldCheck, title: "Partner Badge", desc: "Stand out with a verified partner badge on all your listings." },
              { icon: CurrencyDollar, title: "Pay for Results", desc: "Only pay for drivers you actually hire. Zero risk." },
              { icon: Crown, title: "Success Management", desc: "A dedicated team to help you optimize and scale your recruiting." },
            ].map((item) => (
              <motion.div key={item.title} variants={cardChild} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-neutral-400 transition-colors group-hover:text-white">
                  <item.icon size={20} weight="duotone" />
                </div>
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-white/1.5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader label="Pricing" title="Choose Your Plan" description="Start free. Scale when you're ready." />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {/* Basic */}
            <Reveal>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-8">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-600">Basic</p>
                <p className="mt-3 text-3xl font-semibold">Free</p>
                <p className="mt-1 text-sm text-neutral-500">Up to 5 applications / month</p>
                <a href="#" className="mt-6 flex items-center justify-center rounded-full border border-white/12 bg-white/3 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/25 hover:bg-white/6">
                  Get Started
                </a>
                <ul className="mt-6 space-y-3 text-sm text-neutral-500">
                  {["Post unlimited jobs", "Up to 5 applications/month", "Basic analytics", "Email support"].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Growth */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/15 bg-linear-to-b from-white/6 to-white/2 p-8 shadow-[0_0_60px_rgba(255,255,255,0.03)]">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">NovaLinx Growth</p>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-black">Popular</span>
                </div>
                <p className="mt-3 text-3xl font-semibold">Custom</p>
                <p className="mt-1 text-sm text-neutral-500">Tailored to your fleet size</p>
                <a href="#" className="mt-6 flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Book a Demo
                </a>
                <ul className="mt-6 space-y-3 text-sm text-neutral-400">
                  {["Unlimited job postings", "Unlimited applications", "AI-powered CoPilot", "Priority search placement", "Dedicated success manager", "24/7 support"].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-white/8 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeader label="FAQ's" title="Frequently Asked Questions" />
          <Reveal delay={0.1}>
            <div className="mt-12 divide-y divide-white/8">
              {[
                { q: "How does payment work?", a: "Our basic plan is free forever. For our Growth plan, we offer custom pricing based on your fleet size. You only pay for results." },
                { q: "How do I get started?", a: "Create a free account, add your company info, and post your first job in under 5 minutes." },
                { q: "What about driver retention?", a: "Our matching focuses on fit — not just filling seats. When drivers end up in lanes that match their lifestyle, they stay longer." },
                { q: "Can I integrate with my ATS?", a: "Yes. We support integrations with major ATS platforms. Contact our team for setup help." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between text-[15px] font-medium text-neutral-300 transition-colors duration-200 group-open:text-white">
                    {item.q}
                    <Plus size={16} weight="bold" className="shrink-0 text-neutral-700 transition-transform duration-300 group-open:rotate-45 group-open:text-neutral-400" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-white/4 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to Fill Your Seats?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Book a live demo and see how NovaLinx can transform your driver recruiting.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Book a Free Demo
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
