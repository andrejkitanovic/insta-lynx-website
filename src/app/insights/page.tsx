import { getInsights, type InsightsResponse } from "@/lib/api";
import { InsightsClient } from "./insights-client";

export const metadata = {
  title: "CDL Insights — Real Pay Data from Real Jobs | NovaLinx",
  description:
    "Explore CDL trucking salary data, market trends, and job insights. See average pay by employment type, route type, and state.",
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
