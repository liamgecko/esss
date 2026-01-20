import type { Metadata } from "next";

import GallerySection from "@/components/layout/gallery-section";
import { getPageByUri } from "@/lib/wp";

export const metadata: Metadata = {
  title:
    "Recent work | ESSS - Specialist onsite machining and mechanical maintenance in Fife, Scotland",
  description:
    "A selection of recent onsite machining, mechanical maintenance, and controlled bolting work delivered for heavy industry.",
};

export default async function RecentWorkPage() {
  const page = await getPageByUri("/recent-work/");
  const blocks = page?.contentBlocks?.contentBlocks ?? [];

  return (
    <div className="min-h-dvh bg-neutral-950">
      {blocks.map((block, idx) => {
        if (block.__typename !== "ContentBlocksContentBlocksGalleryLayout") {
          return null;
        }

        const images =
          block.galleryImages?.nodes?.map((n) => ({
            src: n.sourceUrl,
            alt: n.altText,
          })) ?? [];

        return (
          <GallerySection
            key={idx}
            heading={block.heading}
            mainHeading={block.mainHeading}
            content={block.content}
            images={images}
          />
        );
      })}
    </div>
  );
}

