import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts, slugify } from "@/lib/blog";
import { getCarriers, getJobs } from "@/lib/api";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/jobs", priority: 0.9, changeFrequency: "daily" },
  { path: "/companies", priority: 0.8, changeFrequency: "weekly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/download", priority: 0.8, changeFrequency: "monthly" },
  { path: "/carrier", priority: 0.9, changeFrequency: "monthly" },
  { path: "/investors", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/changelog", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/ccpa", priority: 0.3, changeFrequency: "yearly" },
];

// API down shouldn't break the sitemap; static + blog entries still ship.
async function safe<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = getAllPosts();

  const [jobs, carriers] = await Promise.all([
    safe(async () => (await getJobs({ filter: "status::eq::Ongoing", limit: -1, page: 1 })).data),
    safe(async () => (await getCarriers({ limit: -1, page: 1 })).data),
  ]);

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...[...new Set(posts.map((p) => p.category))].map((c) => ({
      url: `${SITE_URL}/blog/category/${slugify(c)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...jobs.map((job) => ({
      url: `${SITE_URL}/jobs/${job._id}`,
      lastModified: job.updatedAt ? new Date(job.updatedAt) : now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...carriers.map((carrier) => ({
      url: `${SITE_URL}/carriers/${carrier._id}`,
      lastModified: carrier.updatedAt ? new Date(carrier.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
