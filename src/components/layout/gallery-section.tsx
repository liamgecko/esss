"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import MediaLightbox, { type MediaLightboxItem } from "@/components/ui/media-lightbox";
import ScrollAnimation from "@/components/ui/scroll-animation";
import WpHtml from "@/components/ui/wp-html";

type GalleryImage = {
  src?: string | null;
  alt?: string | null;
};

export type GallerySectionProps = {
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  images?: GalleryImage[] | null;
};

function getMediaType(src: string): MediaLightboxItem["type"] {
  const lower = src.toLowerCase();
  if (
    lower.endsWith(".mp4") ||
    lower.endsWith(".mov") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".m4v")
  ) {
    return "video";
  }
  return "image";
}

export default function GallerySection({
  heading,
  mainHeading,
  content,
  images,
}: GallerySectionProps) {
  const items = useMemo<MediaLightboxItem[]>(
    () =>
      (images ?? [])
        .map((i) => {
          const src = i.src?.trim();
          if (!src) return null;
          return { type: getMediaType(src), src, alt: i.alt ?? undefined };
        })
        .filter(Boolean) as MediaLightboxItem[],
    [images]
  );

  const hasAny = !!heading || !!mainHeading || !!content || items.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!hasAny) return null;

  return (
    <section className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimation direction="up" className="mb-12">
          {heading ? (
            <div className="mb-1 flex items-center gap-2">
              <div className="h-px w-[58px] bg-brand-red" />
              <h2 className="text-xs uppercase tracking-widest font-medium text-neutral-400">
                {heading}
              </h2>
            </div>
          ) : null}

          {mainHeading ? (
            <h3 className="mb-6 text-3xl font-black leading-tighter tracking-tighter text-white">
              {mainHeading}
            </h3>
          ) : null}

          <WpHtml html={content} className="max-w-2xl" />
        </ScrollAnimation>

        {items.length ? (
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {items.map((item, idx) => {
                const encodedSrc = encodeURI(item.src);
                const isVideo = item.type === "video";

                return (
                  <button
                    key={`${item.src}-${idx}`}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsOpen(true);
                    }}
                    className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-md border-2 border-white/15 bg-neutral-900 transition-all hover:scale-[1.02] hover:border-brand-red"
                    aria-label={`Open ${isVideo ? "video" : "image"} ${idx + 1}`}
                  >
                    {isVideo ? (
                      <>
                        <video
                          src={encodedSrc}
                          preload="metadata"
                          muted
                          playsInline
                          className="h-full w-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-neutral-950/15" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-neutral-950/60 p-3 text-white backdrop-blur-sm transition-colors group-hover:bg-neutral-950/75">
                          <Play className="h-5 w-5" />
                        </div>
                      </>
                    ) : (
                      <Image
                        src={encodedSrc}
                        alt={item.alt ?? `Gallery image ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollAnimation>
        ) : null}
      </div>

      <MediaLightbox
        items={items}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNext={() => setCurrentIndex((p) => (p === items.length - 1 ? 0 : p + 1))}
        onPrevious={() => setCurrentIndex((p) => (p === 0 ? items.length - 1 : p - 1))}
      />
    </section>
  );
}

