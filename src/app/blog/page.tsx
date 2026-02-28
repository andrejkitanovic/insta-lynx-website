import Link from "next/link";
import { CalendarBlank, User, BookOpen } from "@phosphor-icons/react/dist/ssr";
import { Reveal, StaggerContainer, cardChild } from "@/components/animations";
import { getAllPosts } from "@/lib/blog";
import { BlogGrid } from "./blog-grid";

const CATEGORIES = [
  "All",
  "Company",
  "Product",
  "Industry",
  "Drivers",
  "Carriers",
  "Regulations",
  "Finance",
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center sm:pt-24">
          <Reveal>
            <BookOpen
              size={28}
              weight="duotone"
              className="mx-auto mb-4 text-neutral-600"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Unbreaking Trucking
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              Inspiring insights for the ambitious driver. Industry news, career
              tips, and the latest from NovaLinx.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <BlogGrid posts={posts} categories={CATEGORIES} />
        </div>
      </section>
    </>
  );
}
