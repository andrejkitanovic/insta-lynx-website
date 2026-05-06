import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/components/app-store-badges";
import type { ApiJob } from "@/lib/api";

export const SITE_NAME = "NovaLinx";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://novalinx.com"
).replace(/\/$/, "");

export const SOCIAL = {
  x: "https://x.com/novalinx",
  instagram: "https://instagram.com/novalinx",
  facebook: "https://facebook.com/novalinx",
  linkedin: "https://www.linkedin.com/company/novalinx",
};

export const ORG = {
  name: SITE_NAME,
  legalName: "NovaLinx, Inc.",
  email: "support@novalinx.com",
  phone: "+1-813-644-3940",
  address: {
    street: "412 East Madison, Suite 1200",
    city: "Tampa",
    state: "FL",
    zip: "33602",
    country: "US",
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORG.name,
  legalName: ORG.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: ORG.email,
  telephone: ORG.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: ORG.address.street,
    addressLocality: ORG.address.city,
    addressRegion: ORG.address.state,
    postalCode: ORG.address.zip,
    addressCountry: ORG.address.country,
  },
  sameAs: [SOCIAL.x, SOCIAL.instagram, SOCIAL.facebook, SOCIAL.linkedin],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/jobs?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const mobileAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: `${SITE_NAME} — CDL Trucking Jobs`,
  operatingSystem: "iOS, Android",
  applicationCategory: "BusinessApplication",
  description:
    "Find CDL trucking jobs matched to your home time, route type, and pay preferences.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${SITE_URL}/#organization` },
  installUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
  downloadUrl: [APP_STORE_URL, GOOGLE_PLAY_URL],
};

export function breadcrumbJsonLd(
  trail: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: { "@type": "Organization", name: post.author || SITE_NAME },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: post.category,
    image: `${SITE_URL}/og-image.png`,
  };
}

/**
 * Google for Jobs structured data. Carriers with no logo, missing salary, etc.
 * still produce valid output — fields are conditionally included.
 */
export function jobPostingJsonLd(job: ApiJob) {
  const city = job.city || job.locations?.[0]?.city;
  const state = job.state || job.locations?.[0]?.state;
  const carrierName = job.carrier?.name || "NovaLinx Partner Carrier";

  const jobLocation = city || state
    ? {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: city || undefined,
          addressRegion: state || undefined,
          addressCountry: "US",
        },
      }
    : undefined;

  const salaryFrom = job.salary?.from;
  const salaryTo = job.salary?.to;
  const baseSalary = salaryFrom || salaryTo
    ? {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          ...(salaryFrom ? { minValue: salaryFrom } : {}),
          ...(salaryTo ? { maxValue: salaryTo } : {}),
          unitText: "WEEK",
        },
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || `${job.title} with ${carrierName}.`,
    datePosted: job.createdAt
      ? new Date(job.createdAt).toISOString()
      : new Date().toISOString(),
    employmentType: mapEmploymentType(job.employment_type),
    hiringOrganization: {
      "@type": "Organization",
      name: carrierName,
      sameAs: job.carrier?.website,
      logo: job.carrier?.logo,
    },
    ...(jobLocation ? { jobLocation } : {}),
    ...(baseSalary ? { baseSalary } : {}),
    industry: "Transportation and Trucking",
    occupationalCategory: "53-3032 Heavy and Tractor-Trailer Truck Drivers",
    directApply: true,
    url: `${SITE_URL}/jobs?id=${job._id}`,
  };
}

function mapEmploymentType(type?: string): string {
  if (!type) return "FULL_TIME";
  const v = type.toLowerCase();
  if (v.includes("part")) return "PART_TIME";
  if (v.includes("contract") || v.includes("owner") || v.includes("o/o")) return "CONTRACTOR";
  if (v.includes("temp")) return "TEMPORARY";
  return "FULL_TIME";
}
