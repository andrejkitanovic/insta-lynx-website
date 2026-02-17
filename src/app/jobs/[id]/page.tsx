"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
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
  ClipboardText,
  Info,
  Check,
  CircleNotch,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/animations";
import { getJob, formatSalary, type ApiJob } from "@/lib/api";

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<ApiJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const data = await getJob(params.id as string);
        setJob(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchJob();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <CircleNotch size={32} className="animate-spin text-neutral-600" />
      </div>
    );
  }

  if (error || !job) {
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
                  {job.status === "Ongoing" && (
                    <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                      Actively Hiring
                    </span>
                  )}
                </div>

                {job.carrier && (
                  <Link
                    href={`/carriers/${job.carrier._id}`}
                    className="mt-1 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-white"
                  >
                    {job.carrier.logo && (
                      <img src={job.carrier.logo} alt={job.carrier.name} className="h-5 w-5 rounded object-contain bg-white" />
                    )}
                    {job.carrier.name}
                  </Link>
                )}

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-neutral-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CurrencyDollar size={15} weight="bold" className="text-neutral-600" />
                    {formatSalary(job.salary.from)} – {formatSalary(job.salary.to)}
                    {job.pay_frequency && ` / ${job.pay_frequency}`}
                  </span>
                  {(job.route_type || job.job_type) && (
                    <span className="inline-flex items-center gap-1.5">
                      <Truck size={15} weight="bold" className="text-neutral-600" />
                      {job.employment_type && `${job.employment_type} · `}{job.route_type || job.job_type}
                    </span>
                  )}
                  {job.home_time?.summary && (
                    <span className="inline-flex items-center gap-1.5">
                      <House size={15} weight="bold" className="text-neutral-600" />
                      {job.home_time.summary}
                    </span>
                  )}
                  {(job.city || job.state) && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={15} weight="bold" className="text-neutral-600" />
                      {[job.city, job.state].filter(Boolean).join(", ")}
                    </span>
                  )}
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
                {(
                  [
                    job.haul_type ? { icon: Package, label: "Haul Type", value: job.haul_type } : null,
                    job.employment_type ? { icon: ClipboardText, label: "Employment", value: job.employment_type } : null,
                    job.load_type ? { icon: Truck, label: "Load Type", value: job.load_type } : null,
                    job.home_time?.summary ? { icon: House, label: "Home Time", value: job.home_time.summary } : null,
                    job.cdl_class ? { icon: ShieldCheck, label: "CDL Class", value: `Class ${job.cdl_class}` } : null,
                    job.freight_handling ? { icon: Package, label: "Freight", value: job.freight_handling } : null,
                  ].filter((x): x is { icon: typeof Package; label: string; value: string } => x !== null)
                   .slice(0, 4)
                   .map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/8 bg-white/3 p-4"
                    >
                      <div className="flex items-center gap-2 text-xs text-neutral-600">
                        <Icon size={13} weight="bold" />
                        {label}
                      </div>
                      <p className="mt-1.5 text-sm font-medium">{value}</p>
                    </div>
                  ))
                )}
              </div>
            </Reveal>

            {/* Sections */}
            <div className="mt-10 space-y-8">
              {/* Hiring Requirements */}
              {job.hiring_requirements && job.hiring_requirements.length > 0 && (
                <Reveal delay={0.1}>
                  <section>
                    <h2 className="flex items-center gap-2 text-base font-medium">
                      <ShieldCheck size={18} weight="duotone" className="text-neutral-500" />
                      Hiring Requirements
                    </h2>
                    <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                      {job.hiring_requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {/* Pay Details */}
              {job.pay_details && job.pay_details.length > 0 && (
                <Reveal>
                  <section>
                    <h2 className="flex items-center gap-2 text-base font-medium">
                      <CurrencyDollar size={18} weight="duotone" className="text-neutral-500" />
                      Pay &amp; Miles
                    </h2>
                    <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                      {job.pay_details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {detail}
                        </li>
                      ))}
                      {job.sign_on_bonus != null && job.sign_on_bonus > 0 && (
                        <li className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {formatSalary(job.sign_on_bonus)} sign-on bonus
                        </li>
                      )}
                      {job.miles_per_week && (job.miles_per_week.min || job.miles_per_week.max) && (
                        <li className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {job.miles_per_week.min && job.miles_per_week.max
                            ? `${job.miles_per_week.min.toLocaleString()} – ${job.miles_per_week.max.toLocaleString()} miles per week`
                            : job.miles_per_week.max
                              ? `Up to ${job.miles_per_week.max.toLocaleString()} miles per week`
                              : `${job.miles_per_week.min?.toLocaleString()}+ miles per week`}
                        </li>
                      )}
                    </ul>
                  </section>
                </Reveal>
              )}

              {/* Home Time */}
              {job.home_time && (job.home_time.summary || (job.home_time.details && job.home_time.details.length > 0)) && (
                <Reveal>
                  <section>
                    <h2 className="flex items-center gap-2 text-base font-medium">
                      <House size={18} weight="duotone" className="text-neutral-500" />
                      Home Time
                    </h2>
                    <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                      {job.home_time.summary && (
                        <li className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {job.home_time.summary}
                        </li>
                      )}
                      {job.home_time.days_out_min != null && (
                        <li className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {job.home_time.days_out_min}
                          {job.home_time.days_out_max ? ` – ${job.home_time.days_out_max}` : "+"} expected days out
                        </li>
                      )}
                      {job.home_time.details?.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {/* Freight Handling */}
              {job.freight_handling && (
                <Reveal>
                  <section>
                    <h2 className="flex items-center gap-2 text-base font-medium">
                      <Package size={18} weight="duotone" className="text-neutral-500" />
                      Freight Handling
                    </h2>
                    <p className="mt-3 text-sm text-neutral-400">{job.freight_handling}</p>
                  </section>
                </Reveal>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <Reveal>
                  <section>
                    <h2 className="flex items-center gap-2 text-base font-medium">
                      <ShieldCheck size={18} weight="duotone" className="text-neutral-500" />
                      Benefits
                    </h2>
                    <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                      {job.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {/* Additional Info */}
              {job.additional_info && job.additional_info.length > 0 && (
                <Reveal>
                  <section>
                    <h2 className="flex items-center gap-2 text-base font-medium">
                      <Info size={18} weight="duotone" className="text-neutral-500" />
                      Additional Information
                    </h2>
                    <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                      {job.additional_info.map((info) => (
                        <li key={info} className="flex items-start gap-2.5">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
                          {info}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {/* Pet & Rider */}
              {(job.pet_policy || job.rider_policy) && (
                <Reveal>
                  <section>
                    <h2 className="flex items-center gap-2 text-base font-medium">
                      <PawPrint size={18} weight="duotone" className="text-neutral-500" />
                      Pet &amp; Rider Policy
                    </h2>
                    <div className="mt-3 space-y-1.5 text-sm text-neutral-400">
                      {job.pet_policy && <p>Pets: {job.pet_policy}</p>}
                      {job.rider_policy && <p>Riders: {job.rider_policy}</p>}
                    </div>
                  </section>
                </Reveal>
              )}

              {/* About the Job */}
              {job.description && (
                <Reveal>
                  <section>
                    <h2 className="flex items-center gap-2 text-base font-medium">
                      <ClipboardText size={18} weight="duotone" className="text-neutral-500" />
                      About the Job
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400 whitespace-pre-line">
                      {job.description}
                    </p>
                  </section>
                </Reveal>
              )}
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
            {job.carrier && (
              <Reveal delay={0.1}>
                <Link
                  href={`/carriers/${job.carrier._id}`}
                  className="mt-6 block rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition hover:border-white/15"
                >
                  <div className="flex items-center gap-3">
                    {job.carrier.logo ? (
                      <img src={job.carrier.logo} alt={job.carrier.name} className="h-12 w-12 rounded-xl border border-white/10 object-contain bg-white p-1" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/4">
                        <Buildings size={22} weight="duotone" className="text-neutral-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium">{job.carrier.name}</h3>
                      {job.carrier.fleet?.drivers && (
                        <p className="text-xs text-neutral-600">{job.carrier.fleet.drivers} drivers</p>
                      )}
                    </div>
                  </div>
                  {job.carrier.description && (
                    <p className="mt-4 text-sm leading-relaxed text-neutral-500 line-clamp-3">
                      {job.carrier.description}
                    </p>
                  )}
                  <p className="mt-3 text-xs font-medium text-neutral-400">
                    View carrier profile →
                  </p>
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
