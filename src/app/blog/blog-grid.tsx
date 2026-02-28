"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarBlank, User } from "@phosphor-icons/react";
import { Reveal, StaggerContainer, cardChild } from "@/components/animations";
import type { BlogPost } from "@/lib/blog";

export function BlogGrid({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category pills */}
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "border-white bg-white text-black"
                  : "border-white/8 text-neutral-500 hover:border-white/15 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <motion.div
            key={post.slug}
            variants={cardChild}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15"
            >
              <span className="mb-3 inline-flex w-fit rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                {post.category}
              </span>
              <h3 className="text-base font-medium leading-snug group-hover:text-white">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 border-t border-white/6 pt-4 text-xs text-neutral-600">
                <span className="inline-flex items-center gap-1.5">
                  <User size={12} weight="bold" />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank size={12} weight="bold" />
                  {post.date}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-neutral-600">
          No posts in this category yet.
        </p>
      )}
    </>
  );
}
