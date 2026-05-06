import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CCPA Privacy Notice",
  description:
    "California Consumer Privacy Act (CCPA) notice — your rights and how to exercise them with NovaLinx.",
  alternates: { canonical: "/ccpa" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
