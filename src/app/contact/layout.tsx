import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact NovaLinx | Drivers, Carriers & Support",
  description:
    "Get in touch with NovaLinx. Driver support, carrier sales, and partnership inquiries. Available Monday–Friday, 9am–6pm EST.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact NovaLinx",
    description: "Driver support, carrier sales, and partnership inquiries.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
