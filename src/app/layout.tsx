import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE_URL, SITE_NAME, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NovaLinx | Find Your Next CDL Trucking Job",
    template: "%s | NovaLinx",
  },
  description:
    "NovaLinx connects CDL drivers with carriers that match their home time, route type, and pay preferences. Browse verified trucking jobs and apply in minutes.",
  applicationName: SITE_NAME,
  keywords: [
    "CDL jobs",
    "trucking jobs",
    "truck driver jobs",
    "OTR jobs",
    "regional trucking jobs",
    "owner operator jobs",
    "CDL Class A",
    "CDL Class B",
    "trucking recruitment",
    "driver hiring platform",
    "NovaLinx",
  ],
  authors: [{ name: "NovaLinx", url: SITE_URL }],
  creator: "NovaLinx",
  publisher: "NovaLinx",
  category: "Transportation",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "NovaLinx | Find Your Next CDL Trucking Job",
    description:
      "Browse trucking jobs matched to your home time, route type, and pay preferences. Built for CDL drivers and the carriers who hire them.",
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NovaLinx, CDL trucking jobs matched to your life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaLinx | Find Your Next CDL Trucking Job",
    description:
      "Browse trucking jobs matched to your home time, route type, and pay preferences.",
    site: "@novalinx",
    creator: "@novalinx",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD inlined (not via next/script) so it's in the initial SSR
            HTML, required for Google/Bing to discover the structured data. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
