import { getCarriers, type Carrier } from "@/lib/api";
import CompaniesClient from "./companies-client";

const ITEMS_PER_PAGE = 12;

export const dynamic = "force-dynamic";

export default async function CompaniesPage() {
  let initialCarriers: Carrier[] = [];
  let initialTotalPages = 1;

  try {
    const res = await getCarriers({
      limit: ITEMS_PER_PAGE,
      page: 1,
      sort: "name",
    });
    initialCarriers = res.data;
    initialTotalPages = res.meta.pagination.totalPages;
  } catch {
    initialCarriers = [];
    initialTotalPages = 1;
  }

  return (
    <CompaniesClient
      initialCarriers={initialCarriers}
      initialTotalPages={initialTotalPages}
    />
  );
}
