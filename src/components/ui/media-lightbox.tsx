"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type MediaLightboxItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; alt?: string };

interface MediaLightboxProps {
  items: MediaLightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function MediaLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: MediaLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  const hasMultiple = items.length > 1;
  const currentItem = items[currentIndex];
  const currentSrc = encodeURI(currentItem?.src ?? "");

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.05, duration: 0.2 }}
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-900 text-white transition-colors hover:bg-neutral-800 md:right-8 md:top-8"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </motion.button>

          {/* Prev */}
          {hasMultiple && (
            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-900 text-white transition-colors hover:bg-neutral-800 md:left-8 md:h-12 md:w-12"
              aria-label="Previous item"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
          )}

          {/* Media */}
          <div
            className="relative mx-auto max-h-[90vh] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${currentItem.type}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="relative"
              >
                {currentItem.type === "image" ? (
                  <Image
                    src={currentSrc}
                    alt={currentItem.alt ?? `Gallery image ${currentIndex + 1}`}
                    width={1400}
                    height={900}
                    className="h-auto w-auto max-h-[90vh] max-w-[92vw] object-contain"
                    priority
                  />
                ) : (
                  <video
                    src={currentSrc}
                    controls
                    autoPlay
                    playsInline
                    className="h-auto w-auto max-h-[90vh] max-w-[92vw] object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          {hasMultiple && (
            <motion.button
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-900 text-white transition-colors hover:bg-neutral-800 md:right-8 md:h-12 md:w-12"
              aria-label="Next item"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
          )}

          {/* Counter */}
          {hasMultiple && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ delay: 0.08, duration: 0.2 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-neutral-900/80 px-4 py-2 text-sm text-white backdrop-blur-sm"
            >
              {currentIndex + 1} / {items.length}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

