import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { slugify } from "@/lib/blog";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function heading(Tag: "h2" | "h3") {
  return function Heading({ children }: { children?: ReactNode }) {
    const id = slugify(textOf(children));
    return (
      <Tag id={id} className="group scroll-mt-28">
        <a href={`#${id}`} className="no-underline">
          {children}
          <span aria-hidden className="ml-2 text-neutral-700 opacity-0 transition group-hover:opacity-100">#</span>
        </a>
      </Tag>
    );
  };
}

export const mdxComponents = {
  h2: heading("h2"),
  h3: heading("h3"),
  a: ({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...rest}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener" {...rest}>{children}</a>
    ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
};
