"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Link = {
  url?: string | null;
  title?: string | null;
  target?: string | null;
};

export type HeroProps = {
  heroImage?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
  heroHeading?: string | null;
  heroText?: string | null;
  primaryButton?: Link | null;
  secondaryButton?: Link | null;
};

function getRel(target?: string | null) {
  return target === "_blank" ? "noreferrer noopener" : undefined;
}

export default function Hero({
  heroImage,
  heroHeading,
  heroText,
  primaryButton,
  secondaryButton,
}: HeroProps) {
  const hasAny =
    !!heroImage?.sourceUrl ||
    !!heroHeading ||
    !!heroText ||
    !!primaryButton?.url ||
    !!secondaryButton?.url;

  if (!hasAny) return null;

  return (
    <section className="relative h-[640px] w-full max-w-7xl mx-auto overflow-hidden my-8 rounded-lg px-6">
      {/* Background Image */}
      {heroImage?.sourceUrl ? (
        <div className="absolute inset-0">
          <Image
            src={heroImage.sourceUrl}
            alt={heroImage.altText || "Hero image"}
            fill
            priority
            className="object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-neutral-950" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-neutral-950/60 to-neutral-950" />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            {heroHeading ? (
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.25, 0, 1],
                }}
                className="mb-4 text-4xl font-black leading-tighter text-white tracking-tight text-balance"
              >
                {heroHeading}
              </motion.h1>
            ) : null}

            {heroText ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.25, 0.25, 0, 1],
                }}
                className="mb-8 text-white [&_p]:leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: heroText }}
              />
            ) : null}

            {primaryButton?.url && primaryButton.title ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.25, 0.25, 0, 1],
                }}
                className="flex flex-col gap-4 sm:flex-row justify-center"
              >
                <a
                  href={primaryButton.url}
                  target={primaryButton.target || undefined}
                  rel={getRel(primaryButton.target)}
                  className="rounded-md border border-brand-red bg-brand-red px-6 py-3 text-sm font-bold leading-none text-white transition-colors hover:opacity-90"
                >
                  {primaryButton.title}
                </a>

                {secondaryButton?.url && secondaryButton.title ? (
                  <a
                    href={secondaryButton.url}
                    target={secondaryButton.target || undefined}
                    rel={getRel(secondaryButton.target)}
                    className="rounded-md border border-white bg-white/5 px-6 py-3 text-sm font-bold leading-none text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    {secondaryButton.title}
                  </a>
                ) : null}
              </motion.div>
            ) : secondaryButton?.url && secondaryButton.title ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.25, 0.25, 0, 1],
                }}
                className="flex flex-col gap-4 sm:flex-row justify-center"
              >
                <a
                  href={secondaryButton.url}
                  target={secondaryButton.target || undefined}
                  rel={getRel(secondaryButton.target)}
                  className="rounded-md border border-white bg-white/5 px-6 py-3 text-sm font-bold leading-none text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  {secondaryButton.title}
                </a>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
