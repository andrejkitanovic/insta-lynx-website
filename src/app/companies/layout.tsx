import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trucking Companies Hiring CDL Drivers",
  description:
    "Browse trucking carriers hiring CDL drivers on NovaLinx. View safety records, fleet size, operating states, and open positions for each company.",
  alternates: { canonical: "/companies" },
  openGraph: {
    title: "Trucking Companies Hiring CDL Drivers | NovaLinx",
    description:
      "Browse carriers hiring CDL drivers. View safety records, fleet size, and open positions.",
    url: "/companies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trucking Companies Hiring CDL Drivers | NovaLinx",
  },
};

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
