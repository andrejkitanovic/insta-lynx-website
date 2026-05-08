import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import {
  getCarrier,
  getCarrierJobs,
  type Carrier,
  type ApiJob,
} from "@/lib/api";
import { breadcrumbJsonLd } from "@/lib/seo";
import { CarrierDetailClient } from "./carrier-detail-client";

interface Props {
  params: Promise<{ id: string }>;
}

async function fetchCarrierData(
  id: string,
): Promise<{ carrier: Carrier | null; jobs: ApiJob[] }> {
  try {
    const [carrier, jobsRes] = await Promise.all([
      getCarrier(id),
      getCarrierJobs(id, {
        filter: "status::eq::Ongoing",
        limit: -1,
        page: 1,
        sort: "title",
      }).catch(() => ({ data: [] as ApiJob[], meta: undefined })),
    ]);
    return { carrier, jobs: jobsRes.data };
  } catch {
    return { carrier: null, jobs: [] };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { carrier } = await fetchCarrierData(id);
  if (!carrier) {
    return { title: "Carrier Not Found", robots: { index: false, follow: false } };
  }

  const headquarters =
    carrier.address?.city && carrier.address?.state
      ? ` headquartered in ${carrier.address.city}, ${carrier.address.state}`
      : "";

  const title = `${carrier.name} | CDL Trucking Jobs & Carrier Profile`;
  const description =
    carrier.description?.slice(0, 160) ||
    `View ${carrier.name}'s carrier profile${headquarters}. See safety record, fleet, operating states, and current CDL trucking job openings on NovaLinx.`;

  const canonical = `/carriers/${id}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "profile",
      ...(carrier.logo ? { images: [carrier.logo] } : {}),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function carrierJsonLd(carrier: Carrier) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: carrier.name,
    description: carrier.description,
    url: carrier.website,
    logo: carrier.logo,
    telephone: carrier.phone,
    address: carrier.address
      ? {
          "@type": "PostalAddress",
          streetAddress: carrier.address.street,
          addressLocality: carrier.address.city,
          addressRegion: carrier.address.state,
          postalCode: carrier.address.zip,
          addressCountry: "US",
        }
      : undefined,
    identifier: carrier.dot ? `USDOT ${carrier.dot}` : undefined,
    industry: "Transportation and Trucking",
    sameAs: carrier.website ? [carrier.website] : undefined,
  };
}

export default async function CarrierProfilePage({ params }: Props) {
  const { id } = await params;
  const { carrier, jobs } = await fetchCarrierData(id);

  if (!carrier) {
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

  const carrierLd = carrierJsonLd(carrier);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Companies", url: "/companies" },
    { name: carrier.name, url: `/carriers/${id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carrierLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CarrierDetailClient carrier={carrier} jobs={jobs} />
    </>
  );
}
