"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ScrollAnimation from "@/components/ui/scroll-animation";
import WpHtml from "@/components/ui/wp-html";

export type TestimonialsQuote = {
  quote?: string | null;
  name?: string | null;
  roleAndCompany?: string | null;
};

export type TestimonialsSectionClientProps = {
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  quotes?: TestimonialsQuote[] | null;
};

export default function TestimonialsSectionClient({
  heading,
  mainHeading,
  content,
  quotes,
}: TestimonialsSectionClientProps) {
  const items = (quotes ?? []).filter((q) => q?.quote);
  if (items.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const activeSlideRef = useRef<HTMLDivElement | null>(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useLayoutEffect(() => {
    const measure = () => {
      if (!activeSlideRef.current) return;
      setContentHeight(activeSlideRef.current.offsetHeight);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [currentIndex]);

  return (
    <section id="testimonials" className="bg-neutral-950 py-16 md:py-24">
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

        <ScrollAnimation direction="up" delay={0.2} className="relative">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {items.length > 1 ? (
              <button
                onClick={goToPrevious}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-neutral-900 text-white transition-colors hover:bg-neutral-800 md:h-12 md:w-12"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            ) : (
              <div className="h-10 w-10 shrink-0 md:h-12 md:w-12" />
            )}

            <div className="relative w-full max-w-4xl">
              <div
                className="relative overflow-hidden text-center transition-[height] duration-300 ease-in-out"
                style={{ height: contentHeight ?? undefined }}
              >
                {items.map((testimonial, index) => (
                  <div
                    key={index}
                    ref={
                      index === currentIndex
                        ? (node) => {
                            activeSlideRef.current = node;
                          }
                        : null
                    }
                    aria-hidden={index !== currentIndex}
                    className={`absolute left-0 right-0 top-0 flex flex-col items-center transition-opacity duration-500 ease-in-out ${
                      index === currentIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <blockquote className="mb-6 w-full px-2 text-base leading-relaxed text-white md:px-4 md:text-xl">
                      <WpHtml
                        html={testimonial.quote}
                        className="text-white [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-white"
                      />
                    </blockquote>

                    {(testimonial.name || testimonial.roleAndCompany) && (
                      <div className="flex flex-col items-center">
                        {testimonial.name ? (
                          <p className="text-sm font-bold text-white">
                            {testimonial.name}
                          </p>
                        ) : null}
                        {testimonial.roleAndCompany ? (
                          <p className="text-sm text-neutral-400">
                            {testimonial.roleAndCompany}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {items.length > 1 ? (
              <button
                onClick={goToNext}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-neutral-900 text-white transition-colors hover:bg-neutral-800 md:h-12 md:w-12"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            ) : (
              <div className="h-10 w-10 shrink-0 md:h-12 md:w-12" />
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

