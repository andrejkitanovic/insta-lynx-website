"use client";

import { motion } from "framer-motion";
import {
  DeviceMobile,
  PaperPlaneTilt,
  Clock,
  UserCircle,
  BellRinging,
  ShieldCheck,
  MagnifyingGlass,
  CaretRight,
  Star,
} from "@phosphor-icons/react";
import {
  Reveal,
  StaggerContainer,
  SectionHeader,
  cardChild,
} from "@/components/animations";
import { AppStoreBadges } from "@/components/app-store-badges";

export default function DownloadPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
                For Drivers
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Download the NovaLinx&nbsp;App
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-500 sm:text-lg">
                Your trucking career in your pocket. Build your profile, get
                matched with jobs, message carriers, and apply — all from one
                app.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <AppStoreBadges className="mt-8" />
            </Reveal>
          </div>

          {/* App mockup placeholder */}
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-[200px] rounded-[2.5rem] border border-white/10 bg-linear-to-b from-white/4 to-white/1 p-3 shadow-[0_0_80px_rgba(255,255,255,0.04)]">
                <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-white/8 bg-[#0a0a0a]">
                  <DeviceMobile size={40} weight="duotone" className="text-neutral-700" />
                  <p className="mt-3 text-xs text-neutral-600">NovaLinx App</p>
                  <p className="mt-1 text-[10px] text-neutral-700">iOS & Android</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why You'll Love It */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-200px] top-[-100px] h-[400px] w-[400px] rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Features"
            title="Why You'll Love the App"
            description="Everything you need to find, compare, and land your next CDL job."
          />

          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: PaperPlaneTilt, title: "Apply with Ease", desc: "One-tap applications with your saved profile. No re-entering info every time." },
              { icon: Clock, title: "Don't Waste Time", desc: "Only see jobs that match your route, pay, and home-time preferences." },
              { icon: UserCircle, title: "Save Your Profile", desc: "Build once, apply everywhere. Your CDL details, endorsements, and preferences stored securely." },
              { icon: ShieldCheck, title: "No More Spam", desc: "We never share your info. Only carriers you apply to can see your profile." },
              { icon: MagnifyingGlass, title: "Save Searches", desc: "Bookmark your favorite searches and get notified when new matches appear." },
              { icon: BellRinging, title: "Job Notifications", desc: "Real-time push notifications when a carrier posts a job that fits your criteria." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={cardChild}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15"
              >
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

      {/* Get Matched CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-white/4 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Star size={28} weight="fill" className="mx-auto mb-4 text-neutral-800" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Get Matched with CDL&nbsp;Jobs
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Create your profile once and let carriers come to you. Personalized
              recommendations delivered straight to your phone.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Download the App
              </a>
              <a href="/jobs" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/3 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/25 hover:bg-white/6">
                Browse Jobs Online <CaretRight size={14} weight="bold" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
