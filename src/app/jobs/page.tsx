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

/* ─── Filter option constants ─── */
const CDL_CLASSES = ["A", "B"] as const;
const EMPLOYMENT_TYPES = [
  { key: "company_driver", label: "Company Driver", match: "W2 Employee" },
  { key: "owner_operator", label: "Owner Operator", match: "Owner Operator (O/O)" },
  { key: "lease_purchase", label: "Lease to Purchase", match: "Lease Purchase" },
] as const;
const DRIVER_TYPES = ["Solo", "Team"] as const;
const ROUTE_TYPES = ["OTR", "Regional", "Semi-Local", "Local"] as const;
const HAUL_TYPES = ["Dry Van", "Flatbed", "Refrigerated", "Tanker", "Box Truck", "Power Only", "Hazmat tanker", "Straight Tanker"] as const;
const SAP_OPTIONS = ["No SAP", "SAP Friendly", "SAP Completed Only"] as const;
const FREIGHT_OPTIONS = ["No-Touch", "Touch Freight", "Live Load/Unload", "Drop & Hook"] as const;

interface JobFilters {
  cdlClass: string;
  employmentTypes: string[];
  driverType: string;
  routeTypes: string[];
  haulTypes: string[];
  sapPolicy: string;
  freightHandling: string[];
  petsOnly: boolean;
  ridersOnly: boolean;
  minPay: number;
  maxDaysOut: number;
}

const EMPTY_FILTERS: JobFilters = {
  cdlClass: "",
  employmentTypes: [],
  driverType: "",
  routeTypes: [],
  haulTypes: [],
  sapPolicy: "",
  freightHandling: [],
  petsOnly: false,
  ridersOnly: false,
  minPay: 0,
  maxDaysOut: 0,
};

function countActiveFilters(f: JobFilters): number {
  let count = 0;
  if (f.cdlClass) count++;
  count += f.employmentTypes.length;
  if (f.driverType) count++;
  count += f.routeTypes.length;
  count += f.haulTypes.length;
  if (f.sapPolicy) count++;
  count += f.freightHandling.length;
  if (f.petsOnly) count++;
  if (f.ridersOnly) count++;
  if (f.minPay > 0) count++;
  if (f.maxDaysOut > 0) count++;
  return count;
}

/* ─── Toggle helpers ─── */
function toggleInArray(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

/* ─── Filter Modal ─── */
function FilterModal({
  open,
  onClose,
  filters,
  onApply,
  jobCount,
}: {
  open: boolean;
  onClose: () => void;
  filters: JobFilters;
  onApply: (f: JobFilters) => void;
  jobCount: number;
}) {
  const [draft, setDraft] = useState<JobFilters>(filters);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const prevOpen = useRef(open);

  // eslint-disable-next-line react-hooks/refs
  if (open && !prevOpen.current) {
    setDraft(filters);
  }
  // eslint-disable-next-line react-hooks/refs
  prevOpen.current = open;

  const toggleAccordion = (key: string) =>
    setExpandedSection((prev) => (prev === key ? null : key));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative z-10 mx-4 grid w-full max-w-[500px] max-h-[80dvh] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">Filter jobs</h2>
              <p className="mt-1 text-sm text-neutral-500 hidden lg:block">
                Refine your search by job type, pay, home time, trailer type and more.
              </p>
            </div>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-neutral-500 transition hover:text-white">
              <X size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto overscroll-contain p-6 space-y-5">
          {/* CDL Class */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">CDL Class</p>
            <div className="grid grid-cols-2 gap-3">
              {CDL_CLASSES.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setDraft((d) => ({ ...d, cdlClass: d.cdlClass === cls ? "" : cls }))}
                  className={`rounded-lg border py-2.5 text-sm font-medium transition ${
                    draft.cdlClass === cls
                      ? "border-white bg-white text-black"
                      : "border-white/10 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Employment Type */}
          <div className="space-y-2.5">
            {EMPLOYMENT_TYPES.map((et) => (
              <label key={et.key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">{et.label}</span>
                <button
                  onClick={() => setDraft((d) => ({ ...d, employmentTypes: toggleInArray(d.employmentTypes, et.match) }))}
                  className={`h-5 w-9 rounded-full border transition-colors ${
                    draft.employmentTypes.includes(et.match)
                      ? "bg-white border-white"
                      : "bg-white/10 border-white/10"
                  }`}
                >
                  <span
                    className={`block h-4 w-4 rounded-full transition-transform ${
                      draft.employmentTypes.includes(et.match)
                        ? "translate-x-4 bg-black"
                        : "translate-x-0.5 bg-neutral-500"
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>

          {/* Driver Type */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">Driver Type</p>
            <div className="grid grid-cols-2 gap-3">
              {DRIVER_TYPES.map((dt) => (
                <button
                  key={dt}
                  onClick={() => setDraft((d) => ({ ...d, driverType: d.driverType === dt ? "" : dt }))}
                  className={`rounded-lg border py-2.5 text-sm font-medium transition ${
                    draft.driverType === dt
                      ? "border-white bg-white text-black"
                      : "border-white/10 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  {dt}
                </button>
              ))}
            </div>
          </div>

          {/* Route Type (checkboxes) */}
          <div className="space-y-2.5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Route Type</p>
            {ROUTE_TYPES.map((rt) => (
              <label key={rt} className="flex items-center gap-3 cursor-pointer">
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                    draft.routeTypes.includes(rt)
                      ? "border-white bg-white"
                      : "border-white/20 bg-transparent"
                  }`}
                >
                  {draft.routeTypes.includes(rt) && <Check size={10} weight="bold" className="text-black" />}
                </span>
                <span className="text-sm">{rt}</span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={draft.routeTypes.includes(rt)}
                  onChange={() => setDraft((d) => ({ ...d, routeTypes: toggleInArray(d.routeTypes, rt) }))}
                />
              </label>
            ))}
          </div>

          {/* ─── Accordion sections ─── */}

          {/* Haul Type */}
          <AccordionSection title="Haul Type" expanded={expandedSection === "haul"} onToggle={() => toggleAccordion("haul")}>
            <div className="flex flex-wrap gap-2">
              {HAUL_TYPES.map((ht) => (
                <button
                  key={ht}
                  onClick={() => setDraft((d) => ({ ...d, haulTypes: toggleInArray(d.haulTypes, ht) }))}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    draft.haulTypes.includes(ht)
                      ? "border-white bg-white text-black"
                      : "border-white/10 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  {ht}
                </button>
              ))}
            </div>
          </AccordionSection>

          {/* SAP Policy */}
          <AccordionSection title="SAP Policy" expanded={expandedSection === "sap"} onToggle={() => toggleAccordion("sap")}>
            <div className="space-y-2.5">
              {SAP_OPTIONS.map((sap) => (
                <label key={sap} className="flex items-center gap-3 cursor-pointer">
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                      draft.sapPolicy === sap
                        ? "border-white bg-white"
                        : "border-white/20 bg-transparent"
                    }`}
                  >
                    {draft.sapPolicy === sap && <span className="block h-2 w-2 rounded-full bg-black" />}
                  </span>
                  <span className="text-sm">{sap}</span>
                  <input
                    type="radio"
                    name="sap"
                    className="sr-only"
                    checked={draft.sapPolicy === sap}
                    onChange={() => setDraft((d) => ({ ...d, sapPolicy: d.sapPolicy === sap ? "" : sap }))}
                  />
                </label>
              ))}
            </div>
          </AccordionSection>

          {/* Pay & Home Time */}
          <AccordionSection title="Pay & Home Time" expanded={expandedSection === "pay"} onToggle={() => toggleAccordion("pay")}>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-neutral-500">Minimum weekly pay ($)</label>
                <input
                  type="number"
                  value={draft.minPay || ""}
                  onChange={(e) => setDraft((d) => ({ ...d, minPay: Number(e.target.value) || 0 }))}
                  placeholder="e.g. 1500"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white/20"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-500">Max days out</label>
                <input
                  type="number"
                  value={draft.maxDaysOut || ""}
                  onChange={(e) => setDraft((d) => ({ ...d, maxDaysOut: Number(e.target.value) || 0 }))}
                  placeholder="e.g. 14"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-white/20"
                />
              </div>
            </div>
          </AccordionSection>

          {/* Freight Handling */}
          <AccordionSection title="Freight Handling" expanded={expandedSection === "freight"} onToggle={() => toggleAccordion("freight")}>
            <div className="flex flex-wrap gap-2">
              {FREIGHT_OPTIONS.map((fo) => (
                <button
                  key={fo}
                  onClick={() => setDraft((d) => ({ ...d, freightHandling: toggleInArray(d.freightHandling, fo) }))}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    draft.freightHandling.includes(fo)
                      ? "border-white bg-white text-black"
                      : "border-white/10 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  {fo}
                </button>
              ))}
            </div>
          </AccordionSection>

          {/* Pets & Riders */}
          <AccordionSection title="Pets & Riders" expanded={expandedSection === "pets"} onToggle={() => toggleAccordion("pets")}>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">Only jobs allowing pets</span>
                <button
                  onClick={() => setDraft((d) => ({ ...d, petsOnly: !d.petsOnly }))}
                  className={`h-5 w-9 rounded-full border transition-colors ${
                    draft.petsOnly ? "bg-white border-white" : "bg-white/10 border-white/10"
                  }`}
                >
                  <span className={`block h-4 w-4 rounded-full transition-transform ${draft.petsOnly ? "translate-x-4 bg-black" : "translate-x-0.5 bg-neutral-500"}`} />
                </button>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">Only jobs allowing riders</span>
                <button
                  onClick={() => setDraft((d) => ({ ...d, ridersOnly: !d.ridersOnly }))}
                  className={`h-5 w-9 rounded-full border transition-colors ${
                    draft.ridersOnly ? "bg-white border-white" : "bg-white/10 border-white/10"
                  }`}
                >
                  <span className={`block h-4 w-4 rounded-full transition-transform ${draft.ridersOnly ? "translate-x-4 bg-black" : "translate-x-0.5 bg-neutral-500"}`} />
                </button>
              </label>
            </div>
          </AccordionSection>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/8 p-4">
          <button
            onClick={() => setDraft(EMPTY_FILTERS)}
            className="text-sm text-neutral-500 transition hover:text-white"
          >
            Clear all
          </button>
          <button
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Show {jobCount} jobs
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Accordion Section ─── */
function AccordionSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/6 pt-3">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-1 text-left">
        <span className="text-sm font-medium">{title}</span>
        <svg
          className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && <div className="pt-3 pb-1">{children}</div>}
    </div>
  );
}

/* ─── Filter Badge ─── */
function FilterBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium text-neutral-300">
      {label}
      <button onClick={onRemove} className="text-neutral-500 transition hover:text-white">
        <X size={10} weight="bold" />
      </button>
    </span>
  );
}

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
            href="/download"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-medium text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Apply via App
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
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<ApiJob | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const activeFilterCount = countActiveFilters(filters);

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
      // Text search
      if (search) {
        const q = search.toLowerCase();
        const searchable = [job.title, job.carrier?.name].filter(Boolean).join(" ").toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      // Location
      if (location) {
        const loc = location.toLowerCase();
        const matchLoc =
          (job.city || "").toLowerCase().includes(loc) ||
          (job.state || "").toLowerCase().includes(loc) ||
          (job.locations || []).some(
            (l) =>
              (l.city || "").toLowerCase().includes(loc) ||
              (l.state || "").toLowerCase().includes(loc)
          );
        if (!matchLoc) return false;
      }

      // CDL Class
      if (filters.cdlClass && job.cdl_class !== filters.cdlClass) return false;

      // Employment Types
      if (filters.employmentTypes.length > 0 && !filters.employmentTypes.includes(job.employment_type || "")) return false;

      // Driver Type
      if (filters.driverType && (job.driver_type || "").toLowerCase() !== filters.driverType.toLowerCase()) return false;

      // Route Types
      if (filters.routeTypes.length > 0) {
        const rt = (job.route_type || job.job_type || "").toLowerCase();
        if (!filters.routeTypes.some((f) => f.toLowerCase() === rt)) return false;
      }

      // Haul Types
      if (filters.haulTypes.length > 0) {
        const ht = (job.haul_type || "").toLowerCase();
        if (!filters.haulTypes.some((f) => f.toLowerCase() === ht)) return false;
      }

      // SAP Policy
      if (filters.sapPolicy && (job.sap_policy || "") !== filters.sapPolicy) return false;

      // Freight Handling
      if (filters.freightHandling.length > 0) {
        const fh = (job.load_type || job.freight_handling || "").toLowerCase();
        if (!filters.freightHandling.some((f) => f.toLowerCase() === fh)) return false;
      }

      // Pets
      if (filters.petsOnly) {
        const pp = (job.pet_policy || "").toLowerCase();
        if (!pp || pp.includes("no pet")) return false;
      }

      // Riders
      if (filters.ridersOnly) {
        const rp = (job.rider_policy || "").toLowerCase();
        if (!rp || rp.includes("no rider")) return false;
      }

      // Min Pay
      if (filters.minPay > 0 && job.salary.to < filters.minPay) return false;

      // Max Days Out
      if (filters.maxDaysOut > 0 && job.home_time?.days_out_max && job.home_time.days_out_max > filters.maxDaysOut) return false;

      return true;
    });
  }, [jobs, search, location, filters]);

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

              {/* Filter button */}
              <button
                onClick={() => setShowFilterModal(true)}
                className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeFilterCount > 0
                    ? "bg-white text-black border border-white"
                    : "border border-white/8 text-neutral-400 hover:border-white/15 hover:text-white"
                }`}
              >
                <Funnel size={15} weight="bold" />
                Filter Jobs
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </Reveal>

          {/* Active filter badges */}
          {activeFilterCount > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {filters.cdlClass && (
                <FilterBadge label={`CDL-${filters.cdlClass}`} onRemove={() => setFilters((f) => ({ ...f, cdlClass: "" }))} />
              )}
              {filters.employmentTypes.map((et) => (
                <FilterBadge key={et} label={et} onRemove={() => setFilters((f) => ({ ...f, employmentTypes: f.employmentTypes.filter((v) => v !== et) }))} />
              ))}
              {filters.driverType && (
                <FilterBadge label={filters.driverType} onRemove={() => setFilters((f) => ({ ...f, driverType: "" }))} />
              )}
              {filters.routeTypes.map((rt) => (
                <FilterBadge key={rt} label={rt} onRemove={() => setFilters((f) => ({ ...f, routeTypes: f.routeTypes.filter((v) => v !== rt) }))} />
              ))}
              {filters.haulTypes.map((ht) => (
                <FilterBadge key={ht} label={ht} onRemove={() => setFilters((f) => ({ ...f, haulTypes: f.haulTypes.filter((v) => v !== ht) }))} />
              ))}
              {filters.sapPolicy && (
                <FilterBadge label={filters.sapPolicy} onRemove={() => setFilters((f) => ({ ...f, sapPolicy: "" }))} />
              )}
              {filters.freightHandling.map((fh) => (
                <FilterBadge key={fh} label={fh} onRemove={() => setFilters((f) => ({ ...f, freightHandling: f.freightHandling.filter((v) => v !== fh) }))} />
              ))}
              {filters.petsOnly && (
                <FilterBadge label="Pets allowed" onRemove={() => setFilters((f) => ({ ...f, petsOnly: false }))} />
              )}
              {filters.ridersOnly && (
                <FilterBadge label="Riders allowed" onRemove={() => setFilters((f) => ({ ...f, ridersOnly: false }))} />
              )}
              {filters.minPay > 0 && (
                <FilterBadge label={`Min $${filters.minPay}/wk`} onRemove={() => setFilters((f) => ({ ...f, minPay: 0 }))} />
              )}
              {filters.maxDaysOut > 0 && (
                <FilterBadge label={`Max ${filters.maxDaysOut}d out`} onRemove={() => setFilters((f) => ({ ...f, maxDaysOut: 0 }))} />
              )}
              <button
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="text-xs font-medium text-red-400 transition hover:text-red-300"
              >
                Clear all
              </button>
            </div>
          )}

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

      {/* Filter Modal */}
      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApply={setFilters}
        jobCount={filtered.length}
      />
    </>
  );
}
