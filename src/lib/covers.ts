// Default blog cover per category; a post can override with `image:` in frontmatter.
const COVERS: Record<string, string> = {
  Drivers: "/images/drivers.jpg",
  Carriers: "/images/fleet-aerial.jpg",
  Regulations: "/images/highway-lanes.jpg",
  Finance: "/images/trailer-sunset.jpg",
  Industry: "/images/highway-top.jpg",
  Product: "/images/tunnel.jpg",
  Company: "/images/mountain-bw.jpg",
};

export const coverFor = (category: string) => COVERS[category] ?? "/images/mountain-road.jpg";
