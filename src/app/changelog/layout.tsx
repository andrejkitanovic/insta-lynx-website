import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Changelog | Product Updates",
  description:
    "Latest updates and improvements to the NovaLinx platform: new features, fixes, and shipping log.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "NovaLinx Changelog",
    description: "Latest updates and improvements to the NovaLinx platform.",
    url: "/changelog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaLinx Changelog",
    description: "Latest updates and improvements to the NovaLinx platform.",
  },
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
