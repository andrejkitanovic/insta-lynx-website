import type { Metadata } from "next";
import { getInsights, type InsightsResponse } from "@/lib/api";
import { InsightsClient } from "./insights-client";

export const metadata: Metadata = {
  title: "CDL Insights | Real Pay Data from Real Jobs",
  description:
    "Explore CDL trucking pay data, market trends, and job insights. See average weekly pay by employment type, route type, and state, updated from live job postings.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "CDL Insights | Real Pay Data from Real Jobs | NovaLinx",
    description:
      "Average weekly pay by employment type, route type, and state, updated from live job postings.",
    url: "/insights",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CDL Insights | Real Pay Data from Real Jobs | NovaLinx",
  },
};

export default async function InsightsPage() {
  let data: InsightsResponse | null = null;
  try {
    data = await getInsights();
  } catch {
    // API might not be reachable during build
  }

  return <InsightsClient data={data} />;
}
