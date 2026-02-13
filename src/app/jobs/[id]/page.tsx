"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Truck,
  House,
  CurrencyDollar,
  MapPin,
  ShieldCheck,
  Package,
  CaretRight,
  ShareNetwork,
  Heart,
  Buildings,
  PawPrint,
  UserCircle,
  ClipboardText,
  Info,
  Check,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/animations";
import { JOBS } from "@/data/jobs";

export default function JobDetailPage() {
  const params = useParams();
  const job = JOBS.find((j) => j.slug === params.id);

  if (!job) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium">Job not found</p>
          <p className="mt-2 text-sm text-neutral-500">
            This listing may have been removed or the link is incorrect.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black"
          >
            <ArrowLeft size={14} weight="bold" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-600 transition hover:text-white"
          >
            <ArrowLeft size={12} weight="bold" />
            Back to all jobs
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div>
            {/* Header */}
            <Reveal>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {job.title}
                  </h1>
                  {job.hiring && (
                    <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                      Actively Hiring
                    </span>
                  )}
                </div>
                <Link
                  href="#company"
                  className="mt-1 text-sm text-neutral-500 transition hover:text-white"
                >
                  {job.company}
                </Link>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-neutral-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CurrencyDollar size={15} weight="bold" className="text-neutral-600" />
                    {job.pay}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Truck size={15} weight="bold" className="text-neutral-600" />
                    {job.type} · {job.route}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <House size={15} weight="bold" className="text-neutral-600" />
                    {job.homeTime}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://app.novalinx.io"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    Apply Now
                    <CaretRight size={14} weight="bold" />
                  </a>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-500 transition hover:border-white/20 hover:text-white">
                    <ShareNetwork size={16} weight="bold" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-500 transition hover:border-white/20 hover:text-white">
                    <Heart size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Quick info pills */}
            <Reveal delay={0.05}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Package, label: "Haul Type", value: job.equipment },
                  { icon: ClipboardText, label: "Job Type", value: job.type },
                  { icon: Truck, label: "Load Type", value: job.freightHandling.split("—")[0].trim() },
                  { icon: House, label: "Home Time", value: job.homeTime },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/8 bg-white/3 p-4"
                  >
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <item.icon size={13} weight="bold" />
                      {item.label}
                    </div>
                    <p className="mt-1.5 text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Sections */}
            <div className="mt-10 space-y-8">
              {/* Hiring Requirements */}
              <Reveal delay={0.1}>
                <section>
                  <h2 className="flex items-center gap-2 text-base font-medium">
                    <ShieldCheck size={18} weight="duotone" className="text-neutral-500" />
                    Hiring Requirements
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                    {job.hiringRequirements.map((req) => (
                      <li key={req} className="flex items-start gap-2.5">
                        <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Pay & Miles */}
              <Reveal>
                <section>
                  <h2 className="flex items-center gap-2 text-base font-medium">
                    <CurrencyDollar size={18} weight="duotone" className="text-neutral-500" />
                    Pay &amp; Miles
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                    {job.payDetails.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Home Time */}
              <Reveal>
                <section>
                  <h2 className="flex items-center gap-2 text-base font-medium">
                    <House size={18} weight="duotone" className="text-neutral-500" />
                    Home Time
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                    {job.homeTimeDetails.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Freight Handling */}
              <Reveal>
                <section>
                  <h2 className="flex items-center gap-2 text-base font-medium">
                    <Package size={18} weight="duotone" className="text-neutral-500" />
                    Freight Handling
                  </h2>
                  <p className="mt-3 text-sm text-neutral-400">{job.freightHandling}</p>
                </section>
              </Reveal>

              {/* Additional Info */}
              <Reveal>
                <section>
                  <h2 className="flex items-center gap-2 text-base font-medium">
                    <Info size={18} weight="duotone" className="text-neutral-500" />
                    Additional Information
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                    {job.additionalInfo.map((info) => (
                      <li key={info} className="flex items-start gap-2.5">
                        <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                        {info}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Pet & Rider */}
              <Reveal>
                <section>
                  <h2 className="flex items-center gap-2 text-base font-medium">
                    <PawPrint size={18} weight="duotone" className="text-neutral-500" />
                    Pet &amp; Rider Policy
                  </h2>
                  <div className="mt-3 space-y-1.5 text-sm text-neutral-400">
                    <p>{job.petPolicy}</p>
                    <p>{job.riderPolicy}</p>
                  </div>
                </section>
              </Reveal>

              {/* About the job */}
              <Reveal>
                <section>
                  <h2 className="flex items-center gap-2 text-base font-medium">
                    <ClipboardText size={18} weight="duotone" className="text-neutral-500" />
                    About the Job
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {job.description}
                  </p>
                </section>
              </Reveal>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Apply card */}
            <Reveal>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6">
                <a
                  href="https://app.novalinx.io"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  Log in to Apply
                  <CaretRight size={14} weight="bold" />
                </a>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition hover:text-white">
                    <ShareNetwork size={14} /> Share job
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition hover:text-white">
                    <Heart size={14} /> Save
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Company card */}
            <Reveal delay={0.1}>
              <div
                id="company"
                className="mt-6 rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/4">
                    <Buildings size={22} weight="duotone" className="text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{job.company}</h3>
                    <p className="text-xs text-neutral-600">{job.fleetSize}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                  {job.companyDescription}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
