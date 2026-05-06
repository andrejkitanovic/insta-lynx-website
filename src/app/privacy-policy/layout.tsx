import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NovaLinx collects, uses, and protects your information when you use our website and mobile app.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
