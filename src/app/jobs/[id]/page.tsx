import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getJob, formatSalary, type ApiJob } from "@/lib/api";
import { breadcrumbJsonLd, jobPostingJsonLd } from "@/lib/seo";
import { JobDetailClient } from "./job-detail-client";

interface Props {
  params: Promise<{ id: string }>;
}

async function fetchJob(id: string): Promise<ApiJob | null> {
  try {
    return await getJob(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await fetchJob(id);
  if (!job) {
    return {
      title: "Job Not Found",
      robots: { index: false, follow: false },
    };
  }

  const carrier = job.carrier?.name ? ` at ${job.carrier.name}` : "";
  const location =
    job.city && job.state
      ? ` in ${job.city}, ${job.state}`
      : job.state
        ? ` in ${job.state}`
        : "";
  const pay =
    job.salary?.from && job.salary?.to
      ? `, ${formatSalary(job.salary.from)}–${formatSalary(job.salary.to)}/${job.pay_frequency || "week"}`
      : "";

  const title = `${job.title}${carrier}${location}`;
  const description =
    job.description?.slice(0, 160) ||
    `Apply for ${job.title}${carrier}${location}${pay}. Posted on NovaLinx, the trucking-only job platform for CDL drivers.`;

  const canonical = `/jobs/${id}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await fetchJob(id);

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

  const jobLd = jobPostingJsonLd(job);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Jobs", url: "/jobs" },
    { name: job.title, url: `/jobs/${id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <JobDetailClient job={job} />
    </>
  );
}
