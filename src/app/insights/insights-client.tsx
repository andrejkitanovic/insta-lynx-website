"use client";

import { Reveal, StaggerContainer, cardChild } from "@/components/animations";
import { motion } from "framer-motion";
import {
  CurrencyDollar,
  TrendUp,
  Briefcase,
  MapPin,
  Truck,
  PawPrint,
  Users,
  Medal,
} from "@phosphor-icons/react";
import type { InsightsResponse } from "@/lib/api";

function fmt(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function pct(part: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

export function InsightsClient({ data }: { data: InsightsResponse | null }) {
  const s = data?.summary;
  const totalJobs = s?.totalJobs || 0;

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
              Market Intelligence
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              CDL Insights
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Real pay data aggregated from real job postings. Understand the
              market before your next move.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="mb-10 text-center text-xl font-medium">
              Pay Overview
            </h2>
          </Reveal>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CurrencyDollar,
                label: "Avg Weekly Pay",
                value: s ? fmt(s.avgWeeklyPay) : "—",
              },
              {
                icon: TrendUp,
                label: "Median Pay",
                value: s ? fmt(s.medianPay) : "—",
              },
              {
                icon: Medal,
                label: "90th Percentile",
                value: s ? fmt(s.p90Pay) : "—",
              },
              {
                icon: Briefcase,
                label: "Active Jobs",
                value: s ? totalJobs.toLocaleString() : "—",
              },
            ].map((card) => (
              <motion.div
                key={card.label}
                variants={cardChild}
                className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6"
              >
                <card.icon
                  size={24}
                  weight="bold"
                  className="mb-3 text-neutral-500"
                />
                <p className="text-2xl font-semibold">{card.value}</p>
                <p className="mt-1 text-sm text-neutral-500">{card.label}</p>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Sign-on bonus row */}
          {s && s.avgSignOnBonus > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 sm:flex-row sm:justify-between">
                <div>
                  <p className="text-lg font-medium">
                    Average Sign-On Bonus: {fmt(s.avgSignOnBonus)}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {s.jobsWithSignOnBonus} jobs offering sign-on bonuses
                  </p>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  {pct(s.jobsWithSignOnBonus, totalJobs)} of all jobs
                </span>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Pay by Employment Type */}
      {data && data.byEmploymentType.length > 0 && (
        <section className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <h2 className="mb-10 text-center text-xl font-medium">
                Pay by Employment Type
              </h2>
            </Reveal>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.byEmploymentType.map((item) => (
                <motion.div
                  key={item.type}
                  variants={cardChild}
                  className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6"
                >
                  <Truck
                    size={20}
                    weight="bold"
                    className="mb-3 text-neutral-500"
                  />
                  <p className="text-sm font-medium text-neutral-400">
                    {item.type}
                  </p>
                  <p className="mt-1 text-2xl font-semibold">
                    {fmt(item.avgPay)}
                  </p>
                  <p className="mt-1 text-xs text-neutral-600">
                    {item.count} jobs
                  </p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Job Distribution by Route Type */}
      {data && data.byRouteType.length > 0 && (
        <section className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <h2 className="mb-10 text-center text-xl font-medium">
                Jobs by Route Type
              </h2>
            </Reveal>

            <div className="mx-auto max-w-2xl space-y-4">
              {data.byRouteType.map((item) => {
                const maxCount = Math.max(
                  ...data.byRouteType.map((r) => r.count)
                );
                const widthPct = maxCount ? (item.count / maxCount) * 100 : 0;
                return (
                  <Reveal key={item.type}>
                    <div className="rounded-xl border border-white/8 bg-white/2 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">{item.type}</span>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-neutral-500">
                            {item.count} jobs
                          </span>
                          <span className="font-medium text-white">
                            {fmt(item.avgPay)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${widthPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-white/20"
                        />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Breakdown */}
      {s && totalJobs > 0 && (
        <section className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <h2 className="mb-10 text-center text-xl font-medium">
                Benefits Snapshot
              </h2>
            </Reveal>

            <StaggerContainer className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: PawPrint,
                  label: "Pet-Friendly",
                  count: s.jobsWithPets,
                  desc: "jobs allow pets",
                },
                {
                  icon: Users,
                  label: "Rider-Friendly",
                  count: s.jobsWithRiders,
                  desc: "jobs allow riders",
                },
                {
                  icon: CurrencyDollar,
                  label: "Sign-On Bonus",
                  count: s.jobsWithSignOnBonus,
                  desc: "jobs offer a sign-on bonus",
                },
              ].map((benefit) => (
                <motion.div
                  key={benefit.label}
                  variants={cardChild}
                  className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 text-center"
                >
                  <benefit.icon
                    size={28}
                    weight="bold"
                    className="mx-auto mb-3 text-neutral-500"
                  />
                  <p className="text-2xl font-semibold">
                    {pct(benefit.count, totalJobs)}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {benefit.count} {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Pay by State */}
      {data && data.byState.length > 0 && (
        <section className="border-t border-white/8 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <h2 className="mb-10 text-center text-xl font-medium">
                Pay by State
              </h2>
            </Reveal>

            <div className="mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-2xl border border-white/8">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/8 bg-white/2">
                      <th className="px-4 py-3 font-medium text-neutral-400">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} weight="bold" />
                          State
                        </span>
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-neutral-400">
                        Jobs
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-neutral-400">
                        Avg Pay
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.byState.slice(0, 20).map((row) => (
                      <tr
                        key={row.state}
                        className="border-b border-white/5 transition-colors hover:bg-white/2"
                      >
                        <td className="px-4 py-3 font-medium">{row.state}</td>
                        <td className="px-4 py-3 text-right text-neutral-500">
                          {row.count}
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          {fmt(row.avgPay)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.byState.length > 20 && (
                <p className="mt-3 text-center text-xs text-neutral-600">
                  Showing top 20 states by average pay
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {!data && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-neutral-500">
              Insights data is currently unavailable. Check back soon.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
