"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  Funnel,
  MapPin,
  CurrencyDollar,
  Buildings,
  CircleNotch,
  Star,
  ShieldCheck,
  IdentificationCard,
  Path,
  Package,
  Truck,
  House,
  CaretRight,
  ShareNetwork,
  PawPrint,
  ClipboardText,
  Info,
  Check,
  X,
} from "@phosphor-icons/react";
import { Reveal, StaggerContainer, cardChild } from "@/components/animations";
import { getJobs, formatSalary, type ApiJob } from "@/lib/api";

const ROUTE_FILTERS = ["All", "OTR", "Regional", "Local", "Dedicated"];

function buildPayLine(job: ApiJob): string {
  const parts: string[] = [];
  parts.push(`${formatSalary(job.salary.from)} – ${formatSalary(job.salary.to)}`);
  if (job.pay_frequency) parts.push(job.pay_frequency);
  return parts.join(" / ");
}

function buildHomeTimeLine(job: ApiJob): string | null {
  if (!job.home_time) return null;
  const parts: string[] = [];
  if (job.home_time.summary) parts.push(job.home_time.summary);
  if (job.home_time.days_out_min != null && job.home_time.days_out_max != null) {
    parts.push(`${job.home_time.days_out_min}–${job.home_time.days_out_max} days out`);
  } else if (job.home_time.days_out_min != null) {
    parts.push(`${job.home_time.days_out_min}+ days out`);
  }
  return parts.length ? parts.join(" · ") : null;
}

/* ─── Detail Section used in the showcase panel ─── */
function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <Icon size={16} weight="duotone" className="text-neutral-500" />
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-neutral-400">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check size={13} weight="bold" className="mt-0.5 shrink-0 text-neutral-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─── Quick Showcase Panel ─── */
function JobShowcase({
  job,
  onClose,
}: {
  job: ApiJob;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
    >
      {/* Sticky header */}
      <div className="flex items-start justify-between gap-3 border-b border-white/8 p-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold leading-snug">{job.title}</h2>
          {job.carrier && (
            <Link
              href={`/carriers/${job.carrier._id}`}
              className="mt-1 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-white"
            >
              {job.carrier.logo && (
                <img
                  src={job.carrier.logo}
                  alt={job.carrier.name}
                  className="h-5 w-5 rounded object-contain bg-white"
                />
              )}
              {job.carrier.name}
            </Link>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/8 text-neutral-500 transition hover:text-white"
        >
          <X size={14} weight="bold" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6">
        {/* Pay */}
        <div>
          <p className="text-xl font-semibold">
            {formatSalary(job.salary.from)} – {formatSalary(job.salary.to)}
          </p>
          <p className="text-xs text-neutral-500">{job.pay_frequency || "per week"}</p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://app.novalinx.io"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-medium text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Log in to apply
          </a>
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-500 transition hover:border-white/20 hover:text-white">
            <ShareNetwork size={15} weight="bold" />
          </button>
        </div>

        {/* Quick info pills */}
        <div className="grid grid-cols-2 gap-2.5">
          {(
            [
              job.haul_type ? { icon: Package, label: "Haul Type", value: job.haul_type } : null,
              job.employment_type ? { icon: ClipboardText, label: "Job type", value: job.employment_type } : null,
              job.load_type ? { icon: Truck, label: "Load type", value: job.load_type } : null,
              job.freight_handling ? { icon: Package, label: "Load type", value: job.freight_handling } : null,
              job.home_time?.summary ? { icon: House, label: "Home time", value: job.home_time.summary } : null,
            ] as ({ icon: typeof Package; label: string; value: string } | null)[]
          )
            .filter((x): x is { icon: typeof Package; label: string; value: string } => x !== null)
            .slice(0, 4)
            .map(({ icon: Ic, label, value }) => (
              <div key={label} className="rounded-xl border border-white/8 bg-white/3 p-3">
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-600">
                  <Ic size={12} weight="bold" />
                  {label}
                </div>
                <p className="mt-1 text-xs font-medium">{value}</p>
              </div>
            ))}
        </div>

        {/* Hiring Requirements */}
        {job.hiring_requirements && job.hiring_requirements.length > 0 && (
          <DetailSection icon={ShieldCheck} title="Hiring Requirements">
            <BulletList items={job.hiring_requirements} />
          </DetailSection>
        )}

        {/* Pay & Miles */}
        {job.pay_details && job.pay_details.length > 0 && (
          <DetailSection icon={CurrencyDollar} title="Pay & Miles">
            <BulletList
              items={[
                ...job.pay_details,
                ...(job.sign_on_bonus ? [`${formatSalary(job.sign_on_bonus)} sign-on bonus`] : []),
                ...(job.miles_per_week?.min || job.miles_per_week?.max
                  ? [
                      job.miles_per_week.min && job.miles_per_week.max
                        ? `${job.miles_per_week.min.toLocaleString()} – ${job.miles_per_week.max.toLocaleString()} miles per week`
                        : job.miles_per_week.max
                          ? `Up to ${job.miles_per_week.max.toLocaleString()} miles per week`
                          : `${job.miles_per_week.min?.toLocaleString()}+ miles per week`,
                    ]
                  : []),
              ]}
            />
          </DetailSection>
        )}

        {/* Home Time */}
        {job.home_time && (job.home_time.summary || (job.home_time.details && job.home_time.details.length > 0)) && (
          <DetailSection icon={House} title="Home Time">
            <BulletList
              items={[
                ...(job.home_time.summary ? [job.home_time.summary] : []),
                ...(job.home_time.days_out_min != null
                  ? [
                      `${job.home_time.days_out_min}${job.home_time.days_out_max ? ` – ${job.home_time.days_out_max}` : "+"} expected days out`,
                    ]
                  : []),
                ...(job.home_time.details || []),
              ]}
            />
          </DetailSection>
        )}

        {/* Freight Handling */}
        {job.freight_handling && (
          <DetailSection icon={Package} title="Freight Handling">
            <p className="text-sm text-neutral-400">{job.freight_handling}</p>
          </DetailSection>
        )}

        {/* Additional Info */}
        {job.additional_info && job.additional_info.length > 0 && (
          <DetailSection icon={Info} title="Additional Information">
            <BulletList items={job.additional_info} />
          </DetailSection>
        )}

        {/* Pet & Rider */}
        {(job.pet_policy || job.rider_policy) && (
          <DetailSection icon={PawPrint} title="Pet & Rider Policy">
            <div className="space-y-1 text-sm text-neutral-400">
              {job.pet_policy && <p>Pets: {job.pet_policy}</p>}
              {job.rider_policy && <p>Riders: {job.rider_policy}</p>}
            </div>
          </DetailSection>
        )}

        {/* Carrier card */}
        {job.carrier && (
          <Link
            href={`/carriers/${job.carrier._id}`}
            className="block rounded-xl border border-white/8 bg-white/3 p-4 transition hover:border-white/15"
          >
            <div className="flex items-center gap-3">
              {job.carrier.logo ? (
                <img
                  src={job.carrier.logo}
                  alt={job.carrier.name}
                  className="h-10 w-10 rounded-lg border border-white/10 object-contain bg-white p-0.5"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/4">
                  <Buildings size={18} weight="duotone" className="text-neutral-400" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{job.carrier.name}</p>
                {job.carrier.fleet?.drivers && (
                  <p className="text-[11px] text-neutral-600">
                    {(job.carrier.fleet.trucks || 0) + (job.carrier.fleet.tractors || 0)} truck operation
                  </p>
                )}
                {job.carrier.responsive_employer && (
                  <p className="text-[10px] text-neutral-500 mt-0.5">Responsive Employer</p>
                )}
              </div>
              <CaretRight size={14} className="shrink-0 text-neutral-600" />
            </div>
            {job.carrier.description && (
              <p className="mt-3 text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                {job.carrier.description}
              </p>
            )}
          </Link>
        )}

        {/* View full page link */}
        <Link
          href={`/jobs/${job._id}`}
          className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-2.5 text-xs font-medium text-neutral-400 transition hover:border-white/20 hover:text-white"
        >
          View full job page
          <CaretRight size={12} weight="bold" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Job Card Content (shared between animated and static) ─── */
function JobCardContent({
  job,
  isSelected,
  onSelect,
}: {
  job: ApiJob;
  isSelected: boolean;
  onSelect: (job: ApiJob) => void;
}) {
  return (
    <button
      onClick={() => onSelect(job)}
      className={`block w-full text-left rounded-2xl border p-5 transition-colors duration-200 ${
        isSelected
          ? "border-white/20 bg-white/6"
          : "border-white/8 bg-linear-to-b from-white/4 to-transparent hover:border-white/15"
      }`}
    >
      {/* Title + Pay */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate">{job.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            {job.carrier?.logo ? (
              <img
                src={job.carrier.logo}
                alt={job.carrier.name}
                className="h-4 w-4 rounded object-contain bg-white"
              />
            ) : (
              <Buildings size={13} weight="duotone" className="text-neutral-500" />
            )}
            <span className="text-xs text-neutral-500 truncate">
              {job.carrier?.name || "Unknown Carrier"}
            </span>
            {job.carrier?.fleet && (
              <span className="text-[10px] text-neutral-600">
                {(job.carrier.fleet.trucks || 0) + (job.carrier.fleet.tractors || 0)} Truck Operation
              </span>
            )}
            {job.status === "Ongoing" && (
              <span className="rounded-full bg-white/8 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-neutral-400">
                Actively Hiring
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 sm:text-right">
          <p className="text-sm font-semibold text-white">
            {formatSalary(job.salary.from)} – {formatSalary(job.salary.to)}
          </p>
          <p className="text-[10px] text-neutral-500">
            {job.pay_frequency || "per week"}
          </p>
        </div>
      </div>

      {/* Classification row */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {job.employment_type && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/8 px-2 py-0.5 text-[10px] text-neutral-400">
            <IdentificationCard size={10} weight="bold" />
            {job.employment_type}
          </span>
        )}
        {(job.route_type || job.job_type) && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/8 px-2 py-0.5 text-[10px] text-neutral-400">
            <Path size={10} weight="bold" />
            {job.route_type || job.job_type}
          </span>
        )}
        {job.cdl_class && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/8 px-2 py-0.5 text-[10px] text-neutral-400">
            <ShieldCheck size={10} weight="bold" />
            CDL-{job.cdl_class}
          </span>
        )}
        {job.haul_type && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/8 px-2 py-0.5 text-[10px] text-neutral-400">
            <Package size={10} weight="bold" />
            {job.haul_type}
          </span>
        )}
      </div>

      {/* Pay summary + home time */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-500">
        <span className="inline-flex items-center gap-1">
          <CurrencyDollar size={11} weight="bold" className="text-neutral-600" />
          {buildPayLine(job)}
        </span>
        {buildHomeTimeLine(job) && (
          <span className="inline-flex items-center gap-1">
            <Star size={11} weight="bold" className="text-neutral-600" />
            {buildHomeTimeLine(job)}
          </span>
        )}
        {(job.city || job.state) && (
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} weight="bold" className="text-neutral-600" />
            {[job.city, job.state].filter(Boolean).join(", ")}
          </span>
        )}
      </div>

      {/* Benefits preview */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {job.benefits.slice(0, 3).map((benefit) => (
            <span
              key={benefit}
              className="rounded-full border border-white/6 px-2 py-0.5 text-[10px] text-neutral-500"
            >
              {benefit}
            </span>
          ))}
          {job.benefits.length > 3 && (
            <span className="rounded-full px-2 py-0.5 text-[10px] text-neutral-600">
              +{job.benefits.length - 3} more
            </span>
          )}
        </div>
      )}
    </button>
  );
}

/* ─── Job List (animated on first load, instant on filter) ─── */
function JobList({
  jobs,
  selectedId,
  onSelect,
  animate,
}: {
  jobs: ApiJob[];
  selectedId: string | null;
  onSelect: (job: ApiJob) => void;
  animate: boolean;
}) {
  if (animate) {
    return (
      <StaggerContainer className="space-y-3">
        {jobs.map((job) => (
          <motion.div
            key={job._id}
            variants={cardChild}
            whileHover={{ y: -1, transition: { duration: 0.15 } }}
          >
            <JobCardContent job={job} isSelected={selectedId === job._id} onSelect={onSelect} />
          </motion.div>
        ))}
      </StaggerContainer>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <div key={job._id}>
          <JobCardContent job={job} isSelected={selectedId === job._id} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function JobsPage() {
  return (
    <Suspense>
      <JobsPageContent />
    </Suspense>
  );
}

function JobsPageContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [routeFilter, setRouteFilter] = useState("All");
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<ApiJob | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const res = await getJobs({
          filter: "status::eq::Ongoing",
          limit: -1,
          page: 1,
          sort: "title",
        });
        setJobs(res.data);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Mark animation as done shortly after first render with data
  useEffect(() => {
    if (!loading && jobs.length > 0 && !hasAnimated.current) {
      const t = setTimeout(() => {
        hasAnimated.current = true;
      }, 800);
      return () => clearTimeout(t);
    }
  }, [loading, jobs.length]);

  const animated = hasAnimated.current;

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        (job.carrier?.name || "").toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        !location ||
        (job.city || "").toLowerCase().includes(location.toLowerCase()) ||
        (job.state || "").toLowerCase().includes(location.toLowerCase()) ||
        (job.locations || []).some(
          (l) =>
            (l.city || "").toLowerCase().includes(location.toLowerCase()) ||
            (l.state || "").toLowerCase().includes(location.toLowerCase())
        );

      const matchesRoute =
        routeFilter === "All" ||
        (job.route_type || job.job_type || "").toLowerCase() === routeFilter.toLowerCase();

      return matchesSearch && matchesLocation && matchesRoute;
    });
  }, [jobs, search, location, routeFilter]);

  // Auto-select first job when filtered list changes
  useEffect(() => {
    if (filtered.length > 0 && !filtered.find((j) => j._id === selectedJob?._id)) {
      setSelectedJob(filtered[0]);
    } else if (filtered.length === 0) {
      setSelectedJob(null);
    }
  }, [filtered, selectedJob?._id]);

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
              Hundreds of verified positions from carriers you can trust. Filter
              by route, pay, and home time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters + Split Layout */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filter bar */}
          <Reveal>
            <div className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/3 p-4 lg:flex-row lg:items-center">
              {/* Search */}
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

              {/* ZIP / Location */}
              <div className="relative w-full lg:w-48">
                <MapPin
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                />
                <input
                  type="text"
                  placeholder="ZIP or city / state"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-white/8 bg-white/4 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white/20"
                />
              </div>

              {/* Route pills */}
              <div className="flex items-center gap-2 overflow-x-auto">
                <Funnel size={16} className="shrink-0 text-neutral-600" />
                {ROUTE_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setRouteFilter(f)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      routeFilter === f
                        ? "bg-white text-black border border-white"
                        : "border border-white/8 text-neutral-500 hover:border-white/15 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="mt-16 flex items-center justify-center">
              <CircleNotch size={28} className="animate-spin text-neutral-600" />
            </div>
          ) : (
            <>
              <p className="mt-6 text-sm text-neutral-600">
                {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
                {location && ` in ${location}`}
              </p>

              {/* Split layout */}
              <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_420px]">
                {/* Left: Job list */}
                <div ref={listRef} className="space-y-3">
                  <JobList
                    jobs={filtered}
                    selectedId={selectedJob?._id ?? null}
                    onSelect={setSelectedJob}
                    animate={!animated}
                  />

                  {filtered.length === 0 && (
                    <div className="py-16 text-center">
                      <p className="text-neutral-600">
                        No jobs match your filters. Try broadening your search.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Quick showcase */}
                <div className="hidden lg:block">
                  <div className="sticky top-20 rounded-2xl border border-white/8 bg-linear-to-b from-white/3 to-transparent h-[calc(100vh-220px)] overflow-hidden">
                    <AnimatePresence mode="wait">
                      {selectedJob ? (
                        <JobShowcase
                          key={selectedJob._id}
                          job={selectedJob}
                          onClose={() => setSelectedJob(null)}
                        />
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex h-full items-center justify-center p-6 text-center"
                        >
                          <div>
                            <Buildings size={32} weight="duotone" className="mx-auto text-neutral-700" />
                            <p className="mt-3 text-sm text-neutral-600">
                              Select a job to see details
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
