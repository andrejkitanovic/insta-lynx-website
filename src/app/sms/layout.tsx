import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Terms",
  description:
    "How NovaLinx uses text messages, how drivers opt in through the NovaLinx app, and how to get help or opt out.",
  alternates: { canonical: "/sms" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
