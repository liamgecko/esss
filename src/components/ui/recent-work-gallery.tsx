"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import MediaLightbox, { type MediaLightboxItem } from "@/components/ui/media-lightbox";

const RECENT_WORK_MEDIA_FILES = [
  "Adapter Spool Wakefield 4.jpg",
  "Adapter Spool Wakefield 5.jpg",
  "Adapter Spool Wakefield 6.jpg",
  "Angled Counterboring South Humberbank.jpg",
  "Line Boring Pump Enfield.jpg",
  "Warped Flange Face Repaired Grangemouth.jpg",
  "Weld Excavation.JPG",
  "IMG_6414.PNG",
  "IMG_0995.jpeg",
  "IMG_1010.jpeg",
  "IMG_1014.jpeg",
  "IMG_1888.jpeg",
  "IMG_1893.jpeg",
  "IMG_1894.jpeg",
  "IMG_6446.jpeg",
  "IMG_6461.jpeg",
  "IMG_6466.jpeg",
  "IMG_6485.jpeg",
  "IMG_6495.jpeg",
  "IMG_6496.jpeg",
  "IMG_6503.jpeg",
  "IMG_7341.jpeg",
  "IMG_7343.jpeg",
  "IMG_7344.jpeg",
  "IMG_9056.jpeg",
  "IMG_9096.jpeg",
  "IMG_9102.jpeg",
  "IMG_9106.jpeg",
  "IMG_9111.jpeg",
  "Line Boring Rosyth.MOV",
  "Line Boring Setup used to Core & Trepan Vessel Ireland.MP4",
  "Stud Drilling Thread Removal.MOV",
] as const;

function getMediaType(fileName: string): MediaLightboxItem["type"] {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".webm")) {
    return "video";
  }
  return "image";
}

export default function RecentWorkGallery() {
  const items = useMemo<MediaLightboxItem[]>(() => {
    return RECENT_WORK_MEDIA_FILES.map((fileName) => {
      const src = `/recentwork/${fileName}`;
      const type = getMediaType(fileName);
      return { type, src, alt: fileName };
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openAt = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const next = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {items.map((item, index) => {
          const encodedSrc = encodeURI(item.src);
          const isVideo = item.type === "video";

          return (
            <button
              key={`${item.src}-${index}`}
              type="button"
              onClick={() => openAt(index)}
              className="group relative aspect-square w-full overflow-hidden rounded-md border-2 border-white/15 bg-neutral-900 transition-all hover:scale-[1.02] hover:border-brand-red cursor-pointer"
              aria-label={`Open ${isVideo ? "video" : "image"} ${index + 1}`}
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
                  alt={item.alt ?? `Recent work image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </button>
          );
        })}
      </div>

      <MediaLightbox
        items={items}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={close}
        onNext={next}
        onPrevious={previous}
      />
    </>
  );
}

