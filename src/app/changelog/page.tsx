"use client";

import { Reveal } from "@/components/animations";

export default function ChangelogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-b from-white/6 via-white/2 to-transparent blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center sm:pt-24">
          <Reveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Updates
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Changelog
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-500">
              What&apos;s new in NovaLinx.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12 text-neutral-400">
            <Reveal>
              <article className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <h2 className="mb-2 text-lg font-medium text-white">
                  Version 1.0.0
                </h2>
                <p className="mb-4 text-sm text-neutral-500">
                  Initial release
                </p>
                <ul className="list-inside list-disc space-y-2 text-sm">
                  <li>Driver app for job search and applications</li>
                  <li>Profile and employment history</li>
                  <li>Chat with carriers</li>
                  <li>Settings and preferences</li>
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
