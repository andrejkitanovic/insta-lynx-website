import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors — The Future of Trucking Recruitment",
  description:
    "NovaLinx is redefining how America's 3.5M truck drivers find their next lane. AI-powered matching, $30k MRR, $1.2M raised. Book a meeting with our team.",
  alternates: { canonical: "/investors" },
  openGraph: {
    title: "Investors — NovaLinx",
    description:
      "Redefining trucking recruitment with AI. AI-powered matching, $30k MRR, $1.2M raised.",
    url: "/investors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investors — NovaLinx",
  },
};

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
