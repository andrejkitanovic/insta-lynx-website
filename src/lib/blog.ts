import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { slugify } from "@/lib/slug";
import { coverFor } from "@/lib/covers";

export { slugify };

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  updated: string;
  category: string;
  image: string;
  tags: string[];
  faq: BlogFaq[];
  readingMinutes: number;
  wordCount: number;
  headings: BlogHeading[];
  content: string;
}

function extractHeadings(content: string): BlogHeading[] {
  return [...content.matchAll(/^(##|###)\s+(.+)$/gm)].map((m) => {
    const text = m[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`]/g, "").trim();
    return { id: slugify(text), text, level: m[1].length as 2 | 3 };
  });
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    author: data.author || "NovaLinx Team",
    date: data.date || "",
    updated: data.updated || data.date || "",
    category: data.category || "",
    image: data.image || coverFor(data.category || ""),
    tags: Array.isArray(data.tags) ? data.tags : [],
    faq: Array.isArray(data.faq) ? data.faq.filter((f: BlogFaq) => f?.q && f?.a) : [],
    readingMinutes: Math.max(1, Math.round(wordCount / 230)),
    wordCount,
    headings: extractHeadings(content),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) =>
      parsePost(
        filename.replace(/\.mdx$/, ""),
        fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8"),
      ),
    );

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(slug, fs.readFileSync(filePath, "utf-8"));
}

// ponytail: tag/category overlap scoring, fine for dozens of posts; swap for embeddings if the blog hits hundreds
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const tags = new Set(post.tags);
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (p.category === post.category ? 2 : 0) +
        p.tags.filter((t) => tags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function toIsoDate(date: string): string | undefined {
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}
