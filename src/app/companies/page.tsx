"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Buildings,
  Truck,
  MapPin,
  ShieldCheck,
  CircleNotch,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Reveal, StaggerContainer, cardChild } from "@/components/animations";
import { getCarriers, type Carrier } from "@/lib/api";

const ITEMS_PER_PAGE = 12;

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCarriers() {
      try {
        setLoading(true);
        const filter = search
          ? `name::regex::${search}`
          : undefined;
        const res = await getCarriers({
          filter,
          limit: ITEMS_PER_PAGE,
          page,
          sort: "name",
        });
        setCarriers(res.data);
        setTotalPages(res.meta.pagination.totalPages);
      } catch {
        setCarriers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCarriers();
  }, [search, page]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

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
              Carrier Directory
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Browse Companies
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Explore verified carriers on the NovaLinx platform. Find the right
              company for your next driving career.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          {/* Search bar */}
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <MagnifyingGlass
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
              />
              <input
                type="text"
                placeholder="Search carriers by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/8 bg-white/4 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white/20"
              />
            </div>
          </Reveal>

          {loading ? (
            <div className="mt-16 flex items-center justify-center">
              <CircleNotch
                size={28}
                className="animate-spin text-neutral-600"
              />
            </div>
          ) : (
            <>
              <p className="mt-6 text-center text-sm text-neutral-600">
                {carriers.length > 0
                  ? `Showing page ${page} of ${totalPages}`
                  : "No carriers found"}
              </p>

              <StaggerContainer className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {carriers.map((carrier) => (
                  <motion.div
                    key={carrier._id}
                    variants={cardChild}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <Link
                      href={`/carriers/${carrier._id}`}
                      className="group flex h-full flex-col rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3">
                        {carrier.logo ? (
                          <img
                            src={carrier.logo}
                            alt={carrier.name}
                            className="h-10 w-10 shrink-0 rounded-lg bg-white object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                            <Buildings
                              size={20}
                              weight="duotone"
                              className="text-neutral-500"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-medium group-hover:text-white">
                            {carrier.name}
                          </h3>
                          <div className="mt-0.5 flex items-center gap-2 text-[10px] text-neutral-600">
                            <span>DOT: {carrier.dot}</span>
                            {carrier.mc_number && (
                              <span>MC: {carrier.mc_number}</span>
                            )}
                          </div>
                        </div>
                        {carrier.responsive_employer && (
                          <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                            Responsive
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {carrier.description && (
                        <p className="mt-3 flex-1 text-xs leading-relaxed text-neutral-500 line-clamp-2">
                          {carrier.description}
                        </p>
                      )}

                      {/* Stats row */}
                      <div className="mt-4 flex flex-wrap gap-3 border-t border-white/6 pt-4 text-[11px] text-neutral-500">
                        {carrier.fleet && (
                          <span className="inline-flex items-center gap-1">
                            <Truck
                              size={11}
                              weight="bold"
                              className="text-neutral-600"
                            />
                            {(carrier.fleet.trucks || 0) +
                              (carrier.fleet.tractors || 0)}{" "}
                            trucks
                          </span>
                        )}
                        {carrier.address?.state && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin
                              size={11}
                              weight="bold"
                              className="text-neutral-600"
                            />
                            {carrier.address.city
                              ? `${carrier.address.city}, ${carrier.address.state}`
                              : carrier.address.state}
                          </span>
                        )}
                        {carrier.operating_states &&
                          carrier.operating_states.length > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <ShieldCheck
                                size={11}
                                weight="bold"
                                className="text-neutral-600"
                              />
                              {carrier.operating_states.length} states
                            </span>
                          )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </StaggerContainer>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition hover:border-white/20 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <CaretLeft size={12} weight="bold" />
                    Previous
                  </button>
                  <span className="text-xs text-neutral-600">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition hover:border-white/20 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Next
                    <CaretRight size={12} weight="bold" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
