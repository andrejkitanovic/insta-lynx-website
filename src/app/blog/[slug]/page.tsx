import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PhotoBackdrop } from "@/components/photo";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CalendarBlank, Clock, User } from "@phosphor-icons/react/dist/ssr";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Reveal } from "@/components/animations";
import { mdxComponents } from "@/components/mdx";
import { getAllPosts, getPostBySlug, getRelatedPosts, slugify, toIsoDate } from "@/lib/blog";
import { blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      authors: [post.author],
      publishedTime: toIsoDate(post.date),
      modifiedTime: toIsoDate(post.updated),
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const toc = post.headings.filter((h) => h.level === 2);
  const categoryHref = `/blog/category/${slugify(post.category)}`;

  const jsonLd: object[] = [
    blogPostingJsonLd(post),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.category, url: categoryHref },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  ];
  if (post.faq.length) jsonLd.push(faqJsonLd(post.faq));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/8">
        <PhotoBackdrop src={post.image} priority />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 sm:pt-24">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500">
              <Link href="/blog" className="inline-flex items-center gap-2 transition hover:text-white">
                <ArrowLeft size={14} weight="bold" />
                Blog
              </Link>
              <span className="text-neutral-700">/</span>
              <Link href={categoryHref} className="transition hover:text-white">
                {post.category}
              </Link>
            </nav>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-lg leading-relaxed text-neutral-400">{post.excerpt}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-1.5">
                <User size={14} weight="bold" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarBlank size={14} weight="bold" />
                <time dateTime={toIsoDate(post.date)}>{post.date}</time>
              </span>
              {post.updated !== post.date && (
                <span>
                  Updated <time dateTime={toIsoDate(post.updated)}>{post.updated}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} weight="bold" />
                {post.readingMinutes} min read
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          {toc.length >= 3 && (
            <nav aria-label="Table of contents" className="mb-12 rounded-2xl border border-white/8 bg-white/2 p-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">In this article</p>
              <ol className="space-y-2 text-sm">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-neutral-400 transition hover:text-white">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article className="article">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>

          {post.faq.length > 0 && (
            <section className="mt-16" aria-labelledby="faq">
              <h2 id="faq" className="text-2xl font-semibold tracking-tight">
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-white/8 border-y border-white/8">
                {post.faq.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="cursor-pointer list-none text-[15px] font-medium text-neutral-200 group-open:text-white">
                      {f.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {post.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2" aria-label="Topics">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/8 px-3 py-1 text-xs text-neutral-500">
                  {t}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Link href="/jobs" className="group rounded-2xl border border-white/8 bg-linear-to-b from-white/5 to-transparent p-6 transition hover:border-white/15">
              <p className="text-xs uppercase tracking-wider text-neutral-500">For drivers</p>
              <p className="mt-2 font-medium">Find CDL jobs that fit your life</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-neutral-400 group-hover:text-white">
                Browse jobs <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
            <Link href="/carrier" className="group rounded-2xl border border-white/8 bg-linear-to-b from-white/5 to-transparent p-6 transition hover:border-white/15">
              <p className="text-xs uppercase tracking-wider text-neutral-500">For carriers</p>
              <p className="mt-2 font-medium">Hire qualified CDL drivers faster</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-neutral-400 group-hover:text-white">
                See plans <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-white/8 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Keep reading</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent transition hover:border-white/15"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover saturate-[.6] transition duration-500 group-hover:scale-105 group-hover:saturate-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">{p.category}</span>
                  <h3 className="mt-3 font-medium leading-snug">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-500">{p.excerpt}</p>
                  <span className="mt-4 text-xs text-neutral-600">{p.readingMinutes} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
