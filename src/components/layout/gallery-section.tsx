"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import Lightbox from "@/components/ui/lightbox";
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

export default function GallerySection({
  heading,
  mainHeading,
  content,
  images,
}: GallerySectionProps) {
  const items = useMemo(
    () => (images ?? []).map((i) => i.src).filter(Boolean) as string[],
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
              {items.map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsOpen(true);
                  }}
                  className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-md border-2 border-white/15 bg-neutral-900 transition-all hover:scale-[1.02] hover:border-brand-red"
                  aria-label={`Open image ${idx + 1}`}
                >
                  <Image
                    src={src}
                    alt={images?.[idx]?.alt ?? `Gallery image ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </button>
              ))}
            </div>
          </ScrollAnimation>
        ) : null}
      </div>

      <Lightbox
        images={items}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNext={() => setCurrentIndex((p) => (p === items.length - 1 ? 0 : p + 1))}
        onPrevious={() => setCurrentIndex((p) => (p === 0 ? items.length - 1 : p - 1))}
      />
    </section>
  );
}

