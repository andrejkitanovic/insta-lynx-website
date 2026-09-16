import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NovaLinx blog article";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 50% -20%, #2a2a2a 0%, #050505 60%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#a3a3a3", letterSpacing: 4, textTransform: "uppercase" }}>
          {post?.category ?? "Blog"}
        </div>
        <div style={{ display: "flex", fontSize: post && post.title.length > 60 ? 58 : 68, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1.5 }}>
          {post?.title ?? "NovaLinx Blog"}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#737373" }}>
          <span style={{ color: "#fff", fontWeight: 600 }}>NovaLinx</span>
          <span>{post ? `${post.readingMinutes} min read · novalinx.io/blog` : "novalinx.io/blog"}</span>
        </div>
      </div>
    ),
    size,
  );
}
