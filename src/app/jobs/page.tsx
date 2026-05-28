import { getJobs, type ApiJob } from "@/lib/api";
import JobsClient from "./jobs-client";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  let initialJobs: ApiJob[] = [];
  try {
    const res = await getJobs({
      filter: "status::eq::Ongoing",
      limit: -1,
      page: 1,
      sort: "-createdAt",
    });
    initialJobs = res.data;
  } catch {
    initialJobs = [];
  }

  return <JobsClient initialJobs={initialJobs} />;
}
