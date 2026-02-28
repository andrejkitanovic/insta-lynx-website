import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CalendarBlank, User } from "@phosphor-icons/react/dist/ssr";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Reveal } from "@/components/animations";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — NovaLinx Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 sm:pt-24">
          <Reveal>
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition hover:text-white"
            >
              <ArrowLeft size={14} weight="bold" />
              Back to Blog
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="mb-4 inline-flex rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
              {post.category}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-1.5">
                <User size={14} weight="bold" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarBlank size={14} weight="bold" />
                {post.date}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <article className="prose prose-invert max-w-none text-neutral-400 prose-headings:text-white prose-headings:font-medium prose-a:text-white prose-a:underline hover:prose-a:no-underline prose-strong:text-white prose-li:marker:text-neutral-600">
              <MDXRemote source={post.content} />
            </article>
          </Reveal>

          {/* Back link */}
          <Reveal delay={0.05}>
            <div className="mt-12 border-t border-white/8 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-white"
              >
                <ArrowLeft size={14} weight="bold" />
                Back to all posts
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
