"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Truck,
  Buildings,
  Globe,
  Phone,
  Envelope,
  MapPin,
  ShieldCheck,
  CaretRight,
  CurrencyDollar,
  House,
  CircleNotch,
  Check,
  Warning,
  ChartBar,
  IdentificationCard,
  Path,
  Package,
} from "@phosphor-icons/react";
import { Reveal, StaggerContainer, SectionHeader, cardChild } from "@/components/animations";
import { OperatingAreaMap } from "@/components/operating-area-map";
import { getCarrier, getCarrierJobs, formatSalary, type Carrier, type ApiJob } from "@/lib/api";

function SafetyMeter({ label, percentile }: { label: string; percentile?: number }) {
  if (percentile == null) return null;
  const color =
    percentile <= 30 ? "bg-green-500" : percentile <= 60 ? "bg-yellow-500" : "bg-red-500";
  const ratingLabel =
    percentile <= 30 ? "Good" : percentile <= 60 ? "Average" : "Needs Improvement";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-neutral-400">{label}</span>
        <span className="text-xs text-neutral-600">{percentile}th percentile</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/6">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${Math.min(percentile, 100)}%` }} />
      </div>
      <p className="mt-0.5 text-[10px] text-neutral-600">{ratingLabel}</p>
    </div>
  );
}

export default function CarrierProfilePage() {
  const params = useParams();
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [carrierData, jobsData] = await Promise.all([
          getCarrier(params.id as string),
          getCarrierJobs(params.id as string, {
            filter: "status::eq::Ongoing",
            limit: -1,
            page: 1,
            sort: "title",
          }),
        ]);
        setCarrier(carrierData);
        setJobs(jobsData.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <CircleNotch size={32} className="animate-spin text-neutral-600" />
      </div>
    );
  }

  if (error || !carrier) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium">Carrier not found</p>
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

  const totalTrucks = (carrier.fleet?.trucks || 0) + (carrier.fleet?.tractors || 0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <Link href="/jobs" className="inline-flex items-center gap-1.5 text-xs text-neutral-600 transition hover:text-white">
            <ArrowLeft size={12} weight="bold" />
            Back to all jobs
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-12">
          <Reveal>
            <div className="flex items-start gap-5">
              {carrier.logo ? (
                <img src={carrier.logo} alt={carrier.name} className="h-20 w-20 rounded-2xl border border-white/10 object-contain bg-white p-2" />
              ) : (
<div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
                <Buildings size={36} weight="duotone" className="text-neutral-400" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{carrier.name}</h1>
                  {carrier.responsive_employer && (
                    <span className="rounded-full bg-white/8 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                      Responsive Employer
                    </span>
                  )}
                </div>

                {carrier.address && (
                  <p className="mt-1 text-sm text-neutral-500">
                    {[carrier.address.street, carrier.address.city, carrier.address.state, carrier.address.zip].filter(Boolean).join(", ")}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-500">
                  {carrier.website && (
                    <a href={carrier.website.startsWith("http") ? carrier.website : `https://${carrier.website}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 transition hover:text-white">
                      <Globe size={13} weight="bold" />
                      {carrier.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                  {carrier.phone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone size={13} weight="bold" />
                      {carrier.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main */}
          <div className="space-y-10">
            {/* Overview */}
            <Reveal>
              <section>
                <h2 className="text-lg font-semibold mb-4">Overview</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {[
                    { label: "FMCSA Status", value: carrier.fmcsa?.authority_status || "N/A", sub: carrier.fmcsa?.authority_active_since ? `Since ${carrier.fmcsa.authority_active_since}` : undefined },
                    { label: "USDOT", value: carrier.fmcsa?.usdot || carrier.dot },
                    { label: "Docket", value: carrier.fmcsa?.docket || carrier.mc_number || "N/A" },
                    { label: "Operation", value: carrier.fmcsa?.carrier_operation || "N/A" },
                    { label: "Website", value: carrier.website ? carrier.website.replace(/^https?:\/\//, "") : "N/A" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/8 bg-white/3 p-3">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">{item.label}</p>
                      <p className="mt-1 text-sm font-medium truncate">{item.value}</p>
                      {item.sub && <p className="text-[10px] text-neutral-600">{item.sub}</p>}
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* About */}
            {carrier.description && (
              <Reveal>
                <section>
                  <h2 className="text-lg font-semibold mb-3">About</h2>
                  <p className="text-sm leading-relaxed text-neutral-400 whitespace-pre-line">{carrier.description}</p>
                </section>
              </Reveal>
            )}

            {/* Fleet Information */}
            <Reveal>
              <section>
                <h2 className="text-lg font-semibold mb-4">Fleet Information</h2>
                {carrier.fmcsa?.mcs150_mileage && (
                  <p className="mb-4 text-xs text-neutral-500">
                    MCS-150 Mileage ({carrier.fmcsa.mcs150_year || "N/A"}): {carrier.fmcsa.mcs150_mileage.toLocaleString()} miles
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Truck(s)", value: carrier.fleet?.trucks || 0 },
                    { label: "Tractor(s)", value: carrier.fleet?.tractors || 0 },
                    { label: "Trailer(s)", value: carrier.fleet?.trailers || 0 },
                    { label: "Total Drivers", value: carrier.fleet?.drivers || 0 },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center">
                      <p className="text-2xl font-semibold">{item.value}</p>
                      <p className="mt-1 text-xs text-neutral-600">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm text-neutral-400">
                  {carrier.truck_brands && carrier.truck_brands.length > 0 && (
                    <p>
                      <span className="text-neutral-600">Truck brands:</span> {carrier.truck_brands.join(", ")}
                    </p>
                  )}
                  {carrier.late_model_trucks && <p>Late model trucks: Yes</p>}
                  {carrier.operation_classifications && carrier.operation_classifications.length > 0 && (
                    <p>
                      <span className="text-neutral-600">Operation classifications:</span> {carrier.operation_classifications.join(", ")}
                    </p>
                  )}
                  {carrier.cargo_carried && carrier.cargo_carried.length > 0 && (
                    <p>
                      <span className="text-neutral-600">Cargo carried:</span> {carrier.cargo_carried.join(", ")}
                    </p>
                  )}
                </div>
              </section>
            </Reveal>

            {/* Operating Area */}
            {carrier.operating_states && carrier.operating_states.length > 0 && (
              <Reveal>
                <section>
                  <h2 className="text-lg font-semibold mb-4">Operating Area</h2>
                  <OperatingAreaMap
                    operatingStates={carrier.operating_states}
                    headquartersStates={carrier.headquarters_states}
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {carrier.headquarters_states?.map((s) => (
                      <span key={`hq-${s}`} className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs font-medium text-neutral-300">
                        {s} (HQ)
                      </span>
                    ))}
                    {carrier.operating_states.filter(s => !carrier.headquarters_states?.includes(s)).map((s) => (
                      <span key={s} className="rounded-full border border-white/8 bg-white/3 px-3 py-1 text-xs text-neutral-500">
                        {s}
                      </span>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}

            {/* Safety */}
            {carrier.safety && (
              <Reveal>
                <section>
                  <h2 className="text-lg font-semibold mb-4">Inspections &amp; Safety</h2>
                  <div className="space-y-4">
                    <SafetyMeter label="Vehicle Maintenance" percentile={carrier.safety.vehicle_maintenance_percentile} />
                    <SafetyMeter label="Unsafe Driving" percentile={carrier.safety.unsafe_driving_percentile} />
                    <SafetyMeter label="Hours of Service Compliance" percentile={carrier.safety.hos_compliance_percentile} />
                    <SafetyMeter label="Driver Fitness" percentile={carrier.safety.driver_fitness_percentile} />
                  </div>

                  {/* Accident report */}
                  {(carrier.safety.total_crashes != null) && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Accident Report</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl border border-white/8 bg-white/3 p-3 text-center">
                          <p className="text-lg font-semibold">{carrier.safety.total_crashes}</p>
                          <p className="text-[10px] text-neutral-600">Total Crashes</p>
                        </div>
                        <div className="rounded-xl border border-white/8 bg-white/3 p-3 text-center">
                          <p className="text-lg font-semibold">{carrier.safety.fatal_crashes || 0}</p>
                          <p className="text-[10px] text-neutral-600">Fatalities</p>
                        </div>
                        <div className="rounded-xl border border-white/8 bg-white/3 p-3 text-center">
                          <p className="text-lg font-semibold">{carrier.safety.injury_crashes || 0}</p>
                          <p className="text-[10px] text-neutral-600">Injuries</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Inspection rates */}
                  {(carrier.safety.driver_inspections != null || carrier.safety.vehicle_inspections != null) && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/8 text-left text-xs text-neutral-600">
                            <th className="pb-2 pr-4"></th>
                            <th className="pb-2 pr-4">Inspections</th>
                            <th className="pb-2 pr-4">OOS Rate</th>
                          </tr>
                        </thead>
                        <tbody className="text-neutral-400">
                          {carrier.safety.driver_inspections != null && (
                            <tr className="border-b border-white/6">
                              <td className="py-2 pr-4 font-medium text-neutral-300">Driver</td>
                              <td className="py-2 pr-4">{carrier.safety.driver_inspections}</td>
                              <td className="py-2 pr-4">{carrier.safety.driver_oos_rate?.toFixed(2)}%</td>
                            </tr>
                          )}
                          {carrier.safety.vehicle_inspections != null && (
                            <tr>
                              <td className="py-2 pr-4 font-medium text-neutral-300">Vehicle</td>
                              <td className="py-2 pr-4">{carrier.safety.vehicle_inspections}</td>
                              <td className="py-2 pr-4">{carrier.safety.vehicle_oos_rate?.toFixed(2)}%</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </Reveal>
            )}

            {/* Company Jobs */}
            {jobs.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4">Company Jobs</h2>
                <StaggerContainer className="grid gap-4">
                  {jobs.map((job) => (
                    <motion.div
                      key={job._id}
                      variants={cardChild}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-5 transition-colors hover:border-white/15"
                    >
                      <Link href={`/jobs/${job._id}`} className="block">
                        <h3 className="text-sm font-medium">{job.title}</h3>
                        <p className="mt-1 text-xs text-neutral-500">
                          {formatSalary(job.salary.from)} – {formatSalary(job.salary.to)} per week
                          {job.employment_type && ` · ${job.employment_type}`}
                          {(job.route_type || job.job_type) && ` · ${job.route_type || job.job_type}`}
                        </p>
                        <p className="mt-1 text-xs text-neutral-600">
                          {[job.haul_type, job.home_time?.summary, job.cdl_class && `CDL-${job.cdl_class}`].filter(Boolean).join(" · ")}
                        </p>
                        {job.description && (
                          <p className="mt-2 text-xs text-neutral-500 line-clamp-2">{job.description}</p>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Contact card */}
            <Reveal>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6">
                <a
                  href="https://app.novalinx.io"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  Log in to view contact details
                </a>
              </div>
            </Reveal>

            {/* Quick stats */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6">
                <h3 className="text-sm font-medium mb-4">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Active Jobs</span>
                    <span className="font-medium">{jobs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Fleet Size</span>
                    <span className="font-medium">{totalTrucks} trucks</span>
                  </div>
                  {carrier.fleet?.drivers && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Total Drivers</span>
                      <span className="font-medium">{carrier.fleet.drivers}</span>
                    </div>
                  )}
                  {carrier.fmcsa?.usdot && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">USDOT</span>
                      <span className="font-medium">{carrier.fmcsa.usdot}</span>
                    </div>
                  )}
                  {(carrier.fmcsa?.docket || carrier.mc_number) && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">MC Number</span>
                      <span className="font-medium">{carrier.fmcsa?.docket || carrier.mc_number}</span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
