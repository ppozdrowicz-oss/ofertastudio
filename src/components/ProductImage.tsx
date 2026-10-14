import Image from "next/image";
import type { CSSProperties } from "react";
import { media, type AssetId } from "@/content/media";

// The hero and studio share the same responsive candidate instead of downloading two sizes.
export const studioImageSizes = "(max-width: 767px) 100vw, 65vw";

export function ProductImage({
  id,
  className,
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
  decorative = false,
}: {
  id: AssetId;
  className?: string;
  priority?: boolean;
  sizes?: string;
  decorative?: boolean;
}) {
  const asset = media[id];
  // Reused hero frames share the already preloaded request; every other image stays lazy.
  const loading = !priority && asset.src === media.perfume.src ? "eager" : undefined;
  return (
    <Image
      src={asset.src}
      alt={decorative ? "" : asset.alt}
      width={asset.width}
      height={asset.height}
      className={className}
      sizes={id === "perfume" ? studioImageSizes : sizes}
      preload={priority}
      loading={loading}
      quality={90}
      style={
        asset.registration ? ({ "--registration": asset.registration } as CSSProperties) : undefined
      }
    />
  );
}
