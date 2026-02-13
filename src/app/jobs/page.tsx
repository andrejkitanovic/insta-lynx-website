"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Truck,
  House,
  CurrencyDollar,
  Funnel,
  CaretRight,
} from "@phosphor-icons/react";
import { Reveal, StaggerContainer, cardChild } from "@/components/animations";
import { JOBS } from "@/data/jobs";

const ROUTE_FILTERS = ["All", "OTR", "Regional", "Local", "Dedicated"];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [routeFilter, setRouteFilter] = useState("All");

  const filtered = JOBS.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesRoute =
      routeFilter === "All" || job.route === routeFilter;
    return matchesSearch && matchesRoute;
  });

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
              Job Board
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Browse CDL Trucking&nbsp;Jobs
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Hundreds of verified positions from carriers you can trust.
              Filter by route, pay, and home time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters + Jobs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filter bar */}
          <Reveal>
            <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/3 p-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <MagnifyingGlass
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                />
                <input
                  type="text"
                  placeholder="Search jobs or carriers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/8 bg-white/4 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white/20"
                />
              </div>
              <div className="flex items-center gap-2">
                <Funnel size={16} className="text-neutral-600" />
                {ROUTE_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setRouteFilter(f)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      routeFilter === f
                        ? "bg-white text-black"
                        : "border border-white/8 text-neutral-500 hover:border-white/15 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <p className="mt-6 text-sm text-neutral-600">
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
          </p>

          {/* Job cards */}
          <StaggerContainer className="mt-6 grid gap-4">
            {filtered.map((job) => (
              <motion.div
                key={job.id}
                variants={cardChild}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-medium">{job.title}</h3>
                      {job.hiring && (
                        <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                          Actively Hiring
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-neutral-500">{job.company}</p>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-neutral-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CurrencyDollar size={13} weight="bold" />
                        {job.pay}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Truck size={13} weight="bold" />
                        {job.route}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <House size={13} weight="bold" />
                        {job.homeTime}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/8 px-2.5 py-1 text-[11px] text-neutral-500">
                        {job.type}
                      </span>
                      <span className="rounded-full border border-white/8 px-2.5 py-1 text-[11px] text-neutral-500">
                        {job.equipment}
                      </span>
                      {job.bonus && (
                        <span className="rounded-full border border-white/10 bg-white/4 px-2.5 py-1 text-[11px] font-medium text-neutral-300">
                          {job.bonus}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/jobs/${job.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] sm:self-center"
                  >
                    View Job <CaretRight size={12} weight="bold" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-neutral-600">
                No jobs match your filters. Try broadening your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
