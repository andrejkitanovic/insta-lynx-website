import Image from "next/image";

/**
 * Full-bleed decorative photo behind a section. Parent section needs
 * `relative isolate` so the negative z-index stays inside it.
 * Desaturated + dark gradient so it sits under the monochrome UI.
 */
export function PhotoBackdrop({
  src,
  priority = false,
  position = "center",
  strength = "strong",
}: {
  src: string;
  priority?: boolean;
  position?: string;
  strength?: "strong" | "soft";
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className={`object-cover saturate-[.55] ${strength === "strong" ? "opacity-50" : "opacity-60"}`}
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#050505]/60 via-[#050505]/30 to-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%)]" />
      {/* text scrim: keeps small grey copy legible over busy photos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_center,rgba(5,5,5,0.7),transparent)]" />
    </div>
  );
}

/** Framed photo for split layouts; children overlay the bottom edge. */
export function PhotoFrame({
  src,
  alt,
  aspect = "aspect-[4/3]",
  position = "center",
  children,
}: {
  src: string;
  alt: string;
  aspect?: string;
  position?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className={`relative ${aspect} overflow-hidden rounded-3xl border border-white/8`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover saturate-[.7] transition duration-700 hover:scale-[1.03] hover:saturate-100"
          style={{ objectPosition: position }}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/20 to-transparent" />
      </div>
      {children && <div className="relative -mt-28 px-4 sm:-mt-32 sm:px-8">{children}</div>}
    </div>
  );
}
