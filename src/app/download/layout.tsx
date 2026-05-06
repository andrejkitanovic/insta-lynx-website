import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download the NovaLinx App for CDL Drivers",
  description:
    "Get the NovaLinx mobile app for iOS and Android. Build your CDL profile once, get matched to trucking jobs, message carriers, and apply in one tap.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download the NovaLinx App — CDL Trucking Jobs",
    description:
      "Build your CDL profile, get matched to jobs, and apply in one tap. Free on iOS and Android.",
    url: "/download",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download the NovaLinx App — CDL Trucking Jobs",
  },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
