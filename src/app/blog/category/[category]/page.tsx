import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, slugify } from "@/lib/blog";
import { breadcrumbJsonLd, jsonLdScript, SITE_URL, OG_DEFAULTS } from "@/lib/seo";
import { BlogGrid } from "../../blog-grid";
import { PhotoBackdrop } from "@/components/photo";
import { coverFor } from "@/lib/covers";

interface Props {
  params: Promise<{ category: string }>;
}

const DESCRIPTIONS: Record<string, string> = {
  Drivers: "Career guides for CDL drivers: getting your CDL, comparing trucking jobs, pay, home time, and questions to ask before you sign on.",
  Carriers: "Recruiting and retention playbooks for trucking companies: job postings, hiring small-fleet drivers, and cutting turnover.",
  Regulations: "Plain-English explainers on FMCSA rules: hours of service, the Drug & Alcohol Clearinghouse, and new compliance changes.",
  Finance: "Money guides for truckers: pay structures, owner-operator vs company driver economics, and tax tips.",
  Industry: "Trucking industry trends, technology, and AI in CDL driver recruitment.",
  Product: "What's new in the NovaLinx app and platform for drivers and carriers.",
  Company: "News and announcements from the NovaLinx team.",
};

export const dynamicParams = false;

function findCategory(slug: string) {
  return [...new Set(getAllPosts().map((p) => p.category))].find((c) => slugify(c) === slug);
}

export function generateStaticParams() {
  return [...new Set(getAllPosts().map((p) => slugify(p.category)))].map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = findCategory((await params).category);
  if (!name) return {};
  const url = `/blog/category/${slugify(name)}`;
  const title = `${name} Articles | Trucking Blog`;
  const description = DESCRIPTIONS[name] ?? `NovaLinx articles about ${name.toLowerCase()} in trucking.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...OG_DEFAULTS, title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const name = findCategory(category);
  if (!name) notFound();

  const all = getAllPosts();
  const posts = all.filter((p) => p.category === name);
  const url = `/blog/category/${category}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${name} Articles`,
      url: `${SITE_URL}${url}`,
      description: DESCRIPTIONS[name],
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/blog/${p.slug}`,
          name: p.title,
        })),
      },
    },
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name, url },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <section className="relative isolate overflow-hidden border-b border-white/8">
        <PhotoBackdrop src={coverFor(name)} priority />
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-20 text-center sm:pt-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">Blog</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{name}</h1>
          {DESCRIPTIONS[name] && (
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">{DESCRIPTIONS[name]}</p>
          )}
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <BlogGrid posts={posts} categories={[...new Set(all.map((p) => p.category))]} active={name} />
        </div>
      </section>
    </>
  );
}
