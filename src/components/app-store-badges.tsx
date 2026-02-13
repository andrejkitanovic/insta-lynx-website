"use client";

import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react";

export function AppStoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href="#"
        className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-5 py-3 transition-all duration-200 hover:border-white/20 hover:bg-white/8"
      >
        <AppleLogo size={28} weight="fill" className="text-white" />
        <span className="text-left">
          <span className="block text-[10px] leading-tight text-neutral-500">
            Download on the
          </span>
          <span className="block text-sm font-semibold leading-tight text-white">
            App Store
          </span>
        </span>
      </a>
      <a
        href="#"
        className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-5 py-3 transition-all duration-200 hover:border-white/20 hover:bg-white/8"
      >
        <GooglePlayLogo size={28} weight="fill" className="text-white" />
        <span className="text-left">
          <span className="block text-[10px] leading-tight text-neutral-500">
            Get it on
          </span>
          <span className="block text-sm font-semibold leading-tight text-white">
            Google Play
          </span>
        </span>
      </a>
    </div>
  );
}
