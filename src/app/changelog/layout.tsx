import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Product Updates",
  description:
    "Latest updates and improvements to the NovaLinx platform — new features, fixes, and shipping log.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: "NovaLinx Changelog",
    description: "Latest updates and improvements to the NovaLinx platform.",
    url: "/changelog",
    type: "website",
  },
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
