"use client";

import { motion } from "framer-motion";
import { CalendarBlank, User, CaretRight, BookOpen } from "@phosphor-icons/react";
import { Reveal, StaggerContainer, cardChild } from "@/components/animations";

const POSTS = [
  {
    id: 1,
    title: "NovaLinx CEO Joins Jeremy Reymer on Taking the Hire Road Podcast",
    excerpt: "Our CEO shares the story behind NovaLinx and where AI-powered trucking recruitment is headed.",
    author: "NovaLinx",
    date: "Mar 14, 2025",
    category: "Company",
  },
  {
    id: 2,
    title: "Meet Our AI Job Search Agent",
    excerpt: "Introducing NovaLinx Connect — an AI agent that matches drivers to jobs while they sleep.",
    author: "NovaLinx",
    date: "Mar 10, 2025",
    category: "Product",
  },
  {
    id: 3,
    title: "Staying Ahead in Trucking & Technology",
    excerpt: "How forward-thinking carriers are using technology to reduce turnover and improve driver satisfaction.",
    author: "John Daniels",
    date: "Mar 6, 2025",
    category: "Industry",
  },
  {
    id: 4,
    title: "How AI is Reshaping CDL Driver Recruitment",
    excerpt: "From automated screening to predictive matching — a look at the AI tools transforming trucking HR.",
    author: "K. Danks",
    date: "Mar 3, 2025",
    category: "Industry",
  },
  {
    id: 5,
    title: "Top 5 Things Drivers Look for in a Carrier",
    excerpt: "Pay is important, but it's not everything. Here's what actually makes drivers choose — and stay.",
    author: "Chase Riemer",
    date: "Feb 18, 2025",
    category: "Drivers",
  },
  {
    id: 6,
    title: "Understanding the 2025 FMCSA Regulation Changes",
    excerpt: "A breakdown of the latest FMCSA updates and what they mean for drivers and carriers.",
    author: "John Daniels",
    date: "Feb 10, 2025",
    category: "Regulations",
  },
  {
    id: 7,
    title: "Tax Tips for Owner-Operators: Maximizing Your Deductions",
    excerpt: "Don't leave money on the table. Here are the deductions every O/O should know about.",
    author: "K. Danks",
    date: "Jan 28, 2025",
    category: "Finance",
  },
  {
    id: 8,
    title: "The True Cost of Driver Turnover",
    excerpt: "It's not just recruiting costs. We break down the full financial impact of losing a driver.",
    author: "NovaLinx",
    date: "Jan 15, 2025",
    category: "Industry",
  },
  {
    id: 9,
    title: "How to Write a CDL Job Posting That Actually Converts",
    excerpt: "Most job postings are terrible. Here's a framework for listings that attract qualified drivers.",
    author: "Chase Riemer",
    date: "Dec 20, 2024",
    category: "Carriers",
  },
];

const CATEGORIES = ["All", "Company", "Product", "Industry", "Drivers", "Carriers", "Regulations", "Finance"];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
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
              Inspiring insights for the ambitious driver. Industry news,
              career tips, and the latest from NovaLinx.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Category pills */}
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className="rounded-full border border-white/8 px-3 py-1.5 text-xs font-medium text-neutral-500 transition-all duration-200 hover:border-white/15 hover:text-white first:bg-white first:text-black"
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <motion.a
                key={post.id}
                href="#"
                variants={cardChild}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex flex-col rounded-2xl border border-white/8 bg-linear-to-b from-white/4 to-transparent p-6 transition-colors duration-300 hover:border-white/15"
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
              </motion.a>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
