"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MagnifyingGlass,
  Bell,
  ShieldCheck,
  CursorClick,
  ChartBar,
  Users,
  UserCircle,
  Handshake,
  Rocket,
  XLogo,
  InstagramLogo,
  FacebookLogo,
  ArrowDown,
  Plus,
  Star,
  MapPin,
  CaretRight,
  Quotes,
} from "@phosphor-icons/react";
import {
  Reveal,
  StaggerContainer,
  SectionHeader,
  cardChild,
} from "@/components/animations";
import { AppStoreBadges } from "@/components/app-store-badges";

export default function Home() {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <>
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-white/8"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            style={{ y: glowY, scale: glowScale }}
            className="absolute left-1/2 top-[-200px] h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl"
          />
          <div className="absolute bottom-0 left-[-300px] h-[400px] w-[600px] rounded-full bg-white/2 blur-3xl" />
          <div className="absolute bottom-[-100px] right-[-200px] h-[500px] w-[500px] rounded-full bg-white/3 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 text-center sm:pb-32 sm:pt-36">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              <MapPin size={14} weight="bold" className="text-neutral-500" />
              CDL Trucking Jobs &middot; Matched to Your Life
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Let&apos;s Find You a New{" "}
              <span className="bg-linear-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
                Trucking&nbsp;Job
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500 sm:text-xl">
              Enter your ZIP code to see jobs tailored to your home time, route
              type, and pay preferences. No recruiters you don&apos;t want —
              just lanes that fit&nbsp;your&nbsp;life.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(zip.trim() ? `/jobs?location=${encodeURIComponent(zip.trim())}` : "/jobs");
              }}
              className="mx-auto mt-10 flex max-w-md flex-col items-stretch gap-3 sm:flex-row"
            >
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter your ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="flex-1 rounded-full border border-white/10 bg-white/4 px-5 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-all duration-200 focus:border-white/25 focus:bg-white/6 focus:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              />
              <button
                type="submit"
                className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10">Show Jobs</span>
                <span className="absolute inset-0 z-0 bg-linear-to-r from-neutral-200 to-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.4}>
            <AppStoreBadges className="mt-8 justify-center" />
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-10 flex items-center justify-center gap-4">
              {[
                { icon: XLogo, label: "X" },
                { icon: InstagramLogo, label: "Instagram" },
                { icon: FacebookLogo, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/3 text-neutral-600 transition-colors duration-200 hover:border-white/20 hover:text-white"
                >
                  <Icon size={16} weight="bold" />
                </motion.a>
              ))}
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-14"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown size={20} className="mx-auto text-neutral-700" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Founder quote ─── */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Quotes
              size={32}
              weight="fill"
              className="mx-auto mb-6 text-neutral-800"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="text-xl font-medium leading-relaxed text-neutral-300 sm:text-2xl lg:text-3xl">
              We connect CDL drivers with carriers that value their time,
              safety, and family. One profile. Thousands of lanes. Zero spam.
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-neutral-600">
              Co-founders &middot; NovaLinx
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Benefits"
            title="Why Choose Us?"
            description="Everything drivers and carriers need to find, match, and move — faster."
          />

          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MagnifyingGlass,
                title: "Personalized Matching",
                desc: "Jobs matched to your home time, route preference, and CDL endorsements.",
              },
              {
                icon: Bell,
                title: "Real-Time Notifications",
                desc: "Instant alerts when a new lane opens that fits your profile.",
              },
              {
                icon: ShieldCheck,
                title: "Verified Carriers Only",
                desc: "Every carrier on the platform is vetted — no scams, no ghost postings.",
              },
              {
                icon: CursorClick,
                title: "One-Tap Apply",
                desc: "Apply from the mobile app in seconds with your saved profile.",
              },
              {
                icon: ChartBar,
                title: "Carrier Dashboard",
                desc: "Post jobs, manage applications, and track performance in one place.",
              },
              {
                icon: Users,
                title: "Works For All Fleet Sizes",
                desc: "Whether you run 5 trucks or 5,000, NovaLinx scales with you.",
              },
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
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── For Drivers ─── */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-200px] top-[50%] h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              label="For Drivers"
              title="Find Your Perfect Job, Faster & Easier."
              description="Download the NovaLinx app and unlock thousands of CDL jobs tailored to your experience, equipment, and lifestyle."
            />
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-4 text-[15px] text-neutral-400">
                {[
                  "Browse jobs on the website, apply through the mobile app.",
                  "Personalized job recommendations based on your profile.",
                  "Real-time notifications when new jobs match your preferences.",
                  "Detailed carrier information before you ever hit apply.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CaretRight
                      size={14}
                      weight="bold"
                      className="mt-1 shrink-0 text-neutral-600"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="/download"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                More for Drivers <CaretRight size={14} weight="bold" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/8 bg-linear-to-b from-white/4 to-white/1 p-6 shadow-[0_0_60px_rgba(255,255,255,0.03)]">
              <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-600">
                <Star size={12} weight="fill" className="text-neutral-500" />
                Featured Lanes
              </p>
              <div className="space-y-3">
                {[
                  {
                    route: "Home Weekly · Midwest Regional",
                    pay: "From $1,600/wk · Full benefits",
                  },
                  {
                    route: "Dedicated Route · Southeast",
                    pay: "From $1,800/wk · Sign-on bonus",
                  },
                  {
                    route: "OTR · 3 Weeks Out, 1 Home",
                    pay: "From $2,100/wk · Pet & rider policy",
                  },
                ].map((job) => (
                  <motion.div
                    key={job.route}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="rounded-xl border border-white/8 bg-white/3 p-4 transition-colors duration-200 hover:border-white/15 hover:bg-white/5"
                  >
                    <p className="text-sm font-medium">{job.route}</p>
                    <p className="mt-1 text-xs text-neutral-600">{job.pay}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── For Carriers ─── */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-200px] top-[40%] h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-3xl border border-white/8 bg-linear-to-b from-white/4 to-white/1 p-6 shadow-[0_0_60px_rgba(255,255,255,0.03)]">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "10k+", label: "Drivers on platform" },
                  { stat: "85%", label: "Response rate" },
                  { stat: "48h", label: "Avg. time to hire" },
                  { stat: "4.8", label: "Carrier satisfaction", hasStar: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/8 bg-white/3 p-5 text-center"
                  >
                    <p className="flex items-center justify-center gap-1 text-2xl font-semibold">
                      {item.stat}
                      {item.hasStar && (
                        <Star
                          size={16}
                          weight="fill"
                          className="text-neutral-600"
                        />
                      )}
                    </p>
                    <p className="mt-1 text-xs text-neutral-600">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeader
              label="For Carriers"
              title="Get Your Jobs in Front of Qualified Drivers."
              description="Post jobs in minutes and reach experienced CDL drivers actively looking for their next lane."
            />
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-4 text-[15px] text-neutral-400">
                {[
                  "Targeted exposure to relevant, qualified drivers only.",
                  "Manage applications from web or integrate with your ATS.",
                  "Built for fleets of all sizes — small carrier to enterprise.",
                  "Transparent pricing. No hidden fees.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CaretRight
                      size={14}
                      weight="bold"
                      className="mt-1 shrink-0 text-neutral-600"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="/carrier"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                More for Carriers <CaretRight size={14} weight="bold" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-white/1.5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Process"
            title="Our Simple & Smart Process"
            description="Get matched in three easy steps — whether you're a driver or a carrier."
          />
          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: UserCircle,
                title: "Create Your Profile",
                desc: "Drivers: add your CDL type, endorsements, home time, and route preferences. Carriers: add your company info and open lanes.",
              },
              {
                step: "02",
                icon: Handshake,
                title: "Get Matched",
                desc: "Our system instantly connects you with the best-fit jobs or drivers based on your criteria — no manual searching.",
              },
              {
                step: "03",
                icon: Rocket,
                title: "Apply & Hire",
                desc: "Drivers apply with one tap. Carriers review qualified candidates and fill seats faster than ever.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={cardChild}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15"
              >
                <span className="absolute right-6 top-6 text-4xl font-semibold text-white/4">
                  {item.step}
                </span>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-neutral-400 transition-colors group-hover:text-white">
                  <item.icon size={20} weight="duotone" />
                </div>
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="relative overflow-hidden border-b border-white/8 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-100px] bottom-[-100px] h-[400px] w-[400px] rounded-full bg-white/2 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            label="Reviews"
            title="Trusted by Drivers & Carriers"
            description="Hear from real users who found success on the platform."
          />
          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "Found a home-weekly gig within 3 days. The matching is spot-on.",
                name: "Marcus T.",
                role: "CDL-A Driver · Midwest",
              },
              {
                quote:
                  "We filled 12 seats in two weeks. Best recruiting ROI we've seen.",
                name: "Sarah K.",
                role: "Fleet Manager · Southeast",
              },
              {
                quote:
                  "Finally an app that doesn't spam me with irrelevant OTR jobs.",
                name: "James R.",
                role: "CDL-A Driver · Northeast",
              },
              {
                quote:
                  "Setup took 10 minutes. Applications started flowing the same day.",
                name: "Priya M.",
                role: "Operations Lead · National Fleet",
              },
              {
                quote:
                  "The driver profiles are detailed and verified. Saves us hours.",
                name: "Daniel K.",
                role: "Recruiting Director · Regional",
              },
              {
                quote:
                  "Switched from another platform — night and day difference.",
                name: "Elena R.",
                role: "CDL-B Driver · West Coast",
              },
            ].map((item) => (
              <motion.div
                key={item.name}
                variants={cardChild}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15"
              >
                <Quotes
                  size={18}
                  weight="fill"
                  className="mb-3 text-neutral-800"
                />
                <p className="text-sm leading-relaxed text-neutral-400">
                  {item.quote}
                </p>
                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-neutral-600">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-b border-white/8 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeader
            label="FAQ's"
            title="Frequently Asked Questions"
            description="Find quick answers to the most common questions."
          />
          <Reveal delay={0.15}>
            <div className="mt-12 divide-y divide-white/8">
              {[
                {
                  q: "Is NovaLinx free for drivers?",
                  a: "Yes, NovaLinx is completely free for CDL drivers. Create a profile, browse jobs, and apply — no cost ever.",
                },
                {
                  q: "How does the matching work?",
                  a: "When you create a profile, you tell us your preferred home time, route type, equipment, and pay range. We automatically surface jobs that fit.",
                },
                {
                  q: "What types of CDL jobs are listed?",
                  a: "OTR, regional, local, dedicated, team, and owner-operator positions across all 48 states.",
                },
                {
                  q: "How do carriers post jobs?",
                  a: "Sign up, add your company details, and post a job in under 5 minutes. Jobs go live immediately and reach qualified drivers.",
                },
                {
                  q: "Is my information secure?",
                  a: "Absolutely. We use enterprise-grade security and never share your data without your explicit permission.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between text-[15px] font-medium text-neutral-300 transition-colors duration-200 group-open:text-white">
                    {item.q}
                    <Plus
                      size={16}
                      weight="bold"
                      className="shrink-0 text-neutral-700 transition-transform duration-300 group-open:rotate-45 group-open:text-neutral-400"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-white/4 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Get Started
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to Find Your Next&nbsp;Lane? Let&apos;s&nbsp;Go.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Join thousands of drivers and carriers already using NovaLinx.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/jobs"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Find Trucking Jobs
              </a>
              <a
                href="/carrier"
                className="rounded-full border border-white/12 bg-white/3 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/25 hover:bg-white/6"
              >
                Post Jobs as a Carrier
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
