"use client";

import { motion } from "framer-motion";
import {
  TrendUp,
  UsersThree,
  CurrencyDollar,
  Rocket,
  Megaphone,
  Handshake,
  CaretRight,
  Plus,
  ChartLineUp,
  Target,
  Lightning,
} from "@phosphor-icons/react";
import {
  Reveal,
  StaggerContainer,
  SectionHeader,
  cardChild,
} from "@/components/animations";

export default function InvestorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 text-center sm:pt-28">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">Investors</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Redefining Trucking Recruitment with AI&nbsp;Agents
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-500 sm:text-lg">
              Get a piece of NovaLinx. We&apos;re building the future of how
              America&apos;s 3.5 million truck drivers find their next lane.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="#" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Book a Meeting
            </a>
          </Reveal>
        </div>
      </section>

      {/* A Broken System */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-200px] top-[-100px] h-[400px] w-[400px] rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">The Problem</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A Broken System</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-500">
              The trucking industry suffers from 90%+ annual driver turnover.
              Carriers spend thousands per hire on outdated job boards, cold calls,
              and recruiters that deliver unqualified leads. Drivers waste hours
              sifting through irrelevant postings. Both sides lose.
            </p>
          </Reveal>
        </div>
      </section>

      {/* A Smarter Way */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader label="The Solution" title="A Smarter Way to Connect" description="Two products. One platform. Connecting drivers and carriers intelligently." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-8">
                <Target size={24} weight="duotone" className="mb-4 text-neutral-400" />
                <h3 className="text-lg font-medium">NovaLinx Platform</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  An established, trucking-only job marketplace with 15k+ active monthly users.
                  Drivers create profiles, carriers post jobs, and our matching algorithm does the rest.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-8">
                <Lightning size={24} weight="duotone" className="mb-4 text-neutral-400" />
                <h3 className="text-lg font-medium">NovaLinx Connect</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  Our AI-powered assistant that automates the recruiting workflow.
                  It screens, matches, and communicates with drivers on behalf of carriers — 24/7.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits for both */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-200px] top-[-100px] h-[400px] w-[400px] rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader label="Benefits" title="Built for Both Sides" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <Reveal>
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-600">For Drivers</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {["Less searching, more driving", "Trusted carrier insights before applying", "Faster hiring process — days, not weeks"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CaretRight size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-600">For Carriers</p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {["No wasted time on unqualified leads", "3x faster time-to-hire", "Risk-free recruitment — pay for results"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CaretRight size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-white/1.5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader label="Traction" title="Built for Drivers, Designed for Growth" />
          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { stat: "200k+", label: "Driver matches", icon: UsersThree },
              { stat: "15k+", label: "Active monthly users", icon: TrendUp },
              { stat: "$30k", label: "Monthly revenue", icon: CurrencyDollar },
              { stat: "$1.2M", label: "Funding secured", icon: Rocket },
              { stat: "3M+", label: "Audience reach", icon: Megaphone },
            ].map((item) => (
              <motion.div key={item.label} variants={cardChild} className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 text-center">
                <item.icon size={24} weight="duotone" className="mx-auto mb-3 text-neutral-500" />
                <p className="text-2xl font-semibold">{item.stat}</p>
                <p className="mt-1 text-xs text-neutral-600">{item.label}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-white/8 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeader label="FAQ's" title="Some Questions, Some Answers" />
          <Reveal delay={0.1}>
            <div className="mt-12 divide-y divide-white/8">
              {[
                { q: "How is NovaLinx changing trucking?", a: "We replace outdated recruiting with intelligent matching. Our AI understands driver preferences and carrier needs, creating better fits that reduce turnover." },
                { q: "What makes NovaLinx different?", a: "We're trucking-only. No generic job board noise. Every feature is purpose-built for CDL drivers and motor carriers." },
                { q: "How do I get involved as an investor?", a: "Book a meeting with our team. We'll walk you through our traction, roadmap, and how you can be part of the next phase of growth." },
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
              Be Part of NovaLinx&apos;s&nbsp;Growth
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              We&apos;re on a mission to fix trucking recruitment. Let&apos;s talk about how
              you can join us.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Book a Meeting
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
