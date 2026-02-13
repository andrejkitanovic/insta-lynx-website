"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  XLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <Image
                src="/logo.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 object-contain"
              />
              NovaLinx
            </Link>
            <p className="mt-3 max-w-xs text-sm text-neutral-600">
              Connecting CDL drivers with carriers that value their time,
              safety, and family.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: XLogo, label: "X" },
                { icon: InstagramLogo, label: "Instagram" },
                { icon: FacebookLogo, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/3 text-neutral-600 transition-colors duration-200 hover:border-white/20 hover:text-white"
                >
                  <Icon size={15} weight="bold" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-600">
              Platform
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li>
                <Link href="/jobs" className="transition hover:text-white">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/download" className="transition hover:text-white">
                  Download App
                </Link>
              </li>
              <li>
                <Link href="/carrier" className="transition hover:text-white">
                  For Carriers
                </Link>
              </li>
              <li>
                <Link href="/investors" className="transition hover:text-white">
                  Investors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-600">
              Resources
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-600">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-500">
              <li>support@novalinx.com</li>
              <li>(813) 644-3940</li>
              <li className="text-neutral-600">
                412 East Madison, Suite 1200
                <br />
                Tampa, FL 33602
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-neutral-700 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} NovaLinx. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors duration-200 hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-white">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
