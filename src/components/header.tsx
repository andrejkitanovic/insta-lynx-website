"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Truck, List, X } from "@phosphor-icons/react";
import { useState } from "react";

const links = [
  { href: "/jobs", label: "Jobs" },
  { href: "/download", label: "For Drivers" },
  { href: "/carrier", label: "For Carriers" },
  { href: "/investors", label: "Investors" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/8 bg-[#050505]/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <Truck size={22} weight="bold" />
          NovaLinx
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-[15px] text-neutral-500 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 hover:text-white ${
                pathname === link.href ? "text-white" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://app.novalinx.io"
            className="hidden text-[15px] text-neutral-500 transition-colors duration-200 hover:text-white sm:inline-block"
          >
            Login
          </a>
          <Link
            href="/jobs"
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all duration-200 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Find Jobs
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/8 bg-[#050505] md:hidden"
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-[15px] transition-colors hover:bg-white/5 ${
                  pathname === link.href
                    ? "text-white"
                    : "text-neutral-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://app.novalinx.io"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg px-3 py-2.5 text-[15px] text-neutral-500 transition-colors hover:bg-white/5"
            >
              Login
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
