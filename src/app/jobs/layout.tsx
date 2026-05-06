import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse CDL Trucking Jobs",
  description:
    "Search verified CDL trucking jobs by location, route type, pay, home time, and equipment. Find your next OTR, regional, or local trucking job.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "Browse CDL Trucking Jobs — NovaLinx",
    description:
      "Search verified CDL trucking jobs by location, route type, pay, home time, and equipment.",
    url: "/jobs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse CDL Trucking Jobs — NovaLinx",
    description:
      "Search verified CDL trucking jobs by location, route type, pay, and home time.",
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
