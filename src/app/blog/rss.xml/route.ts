import { getAllPosts, toIsoDate } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllPosts()
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const date = toIsoDate(p.date);
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(p.excerpt)}</description><category>${esc(p.category)}</category>${date ? `<pubDate>${new Date(date).toUTCString()}</pubDate>` : ""}</item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${SITE_NAME} Blog</title><link>${SITE_URL}/blog</link><description>Career, pay, regulation, and recruiting guides for CDL drivers and trucking carriers.</description><language>en-us</language><atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
