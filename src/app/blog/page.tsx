import { PhotoBackdrop } from "@/components/photo";
import type { Metadata } from "next";
import { BookOpen } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/animations";
import { getAllPosts, toIsoDate } from "@/lib/blog";
import { breadcrumbJsonLd, jsonLdScript, SITE_NAME, SITE_URL, OG_DEFAULTS } from "@/lib/seo";
import { BlogGrid } from "./blog-grid";

const TITLE = "Trucking Blog: CDL Careers, Pay, Regulations & Recruiting";
const DESCRIPTION =
  "Guides for CDL drivers and trucking carriers: how to get your CDL, truck driver pay, hours of service, owner-operator economics, and driver recruiting.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${SITE_NAME} Blog` }] },
  },
  openGraph: { ...OG_DEFAULTS, title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION, url: "/blog", type: "website" },
  twitter: { card: "summary_large_image", title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: `${SITE_NAME} Blog: Unbreaking Trucking`,
      description: DESCRIPTION,
      url: `${SITE_URL}/blog`,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: toIsoDate(p.date),
        author: { "@type": p.author.startsWith(SITE_NAME) ? "Organization" : "Person", name: p.author },
      })),
    },
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/8">
        <PhotoBackdrop src="/images/mountain-road.jpg" position="center 70%" priority />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center sm:pt-24">
          <Reveal>
            <BookOpen size={28} weight="duotone" className="mx-auto mb-4 text-neutral-600" />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Unbreaking Trucking
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Practical guides for CDL drivers and the carriers who hire them: careers, pay,
              regulations, and recruiting.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <BlogGrid posts={posts} categories={[...new Set(posts.map((p) => p.category))]} />
        </div>
      </section>
    </>
  );
}
