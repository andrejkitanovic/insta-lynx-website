import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Carriers — Hire CDL Drivers Faster",
  description:
    "Recruit qualified CDL drivers 3x faster. NovaLinx is the trucking-only job platform built for motor carriers. Plans from $99/mo with the first month free.",
  alternates: { canonical: "/carrier" },
  openGraph: {
    title: "For Carriers — Hire CDL Drivers Faster | NovaLinx",
    description:
      "The trucking-only job platform built for motor carriers. Plans from $99/mo, first month free.",
    url: "/carrier",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Carriers — Hire CDL Drivers Faster | NovaLinx",
    description:
      "The trucking-only job platform built for motor carriers. Plans from $99/mo, first month free.",
  },
};

export default function CarrierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
