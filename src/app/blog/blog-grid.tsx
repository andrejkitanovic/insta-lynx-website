"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarBlank, Clock } from "@phosphor-icons/react";
import { Reveal, StaggerContainer, cardChild } from "@/components/animations";
import type { BlogPost } from "@/lib/blog";
import { slugify } from "@/lib/slug";

export function BlogGrid({
  posts,
  categories,
  active = "All",
}: {
  posts: BlogPost[];
  categories: string[];
  active?: string;
}) {
  return (
    <>
      {/* Category links are real URLs so crawlers can reach the category hubs */}
      <Reveal>
        <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
          {["All", ...categories].map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/blog" : `/blog/category/${slugify(cat)}`}
              aria-current={active === cat ? "page" : undefined}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                active === cat
                  ? "border-white bg-white text-black"
                  : "border-white/8 text-neutral-500 hover:border-white/15 hover:text-white"
              }`}
            >
              {cat}
            </Link>
          ))}
        </nav>
      </Reveal>

      <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <motion.article
            key={post.slug}
            variants={cardChild}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent transition-colors duration-300 hover:border-white/15"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover saturate-[.6] transition duration-500 group-hover:scale-105 group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#050505]/80 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
              <span className="mb-3 inline-flex w-fit rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                {post.category}
              </span>
              <h2 className="text-base font-medium leading-snug group-hover:text-white">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 border-t border-white/6 pt-4 text-xs text-neutral-600">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank size={12} weight="bold" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} weight="bold" />
                  {post.readingMinutes} min read
                </span>
              </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </StaggerContainer>

      {posts.length === 0 && (
        <p className="mt-10 text-center text-sm text-neutral-600">
          No posts in this category yet.
        </p>
      )}
    </>
  );
}
