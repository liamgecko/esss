"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const testimonials = [
  {
    quote: `Barry has the ability to scope any job, order the correct equipment and execute the job to the highest standard that’s required in the challenging world of Precision Engineering.

I would recommend Barry to any company that specializes in On-Site Machining, Bolting and Mechanical works - He has been a massive asset to Gillon Machining over the years.`,
    name: "Gareth Gillon Williams",
    company: "Owner, Gillon Machining Ltd",
  },
  {
    quote: `I've had the pleasure of working with Barry Hamilton for several projects and can confidently confirm that the service provided is second to none. Every engagement is carried out with the utmost diligence and a high level of engineering professionalism.

ESSS demonstrate a strong mechanical service background, supported by extensive knowledge in the field of machining. The quality of service delivered is consistently top-class on every project.`,
    name: "Garry Bratley",
    company: "Contracts Manager, TEI Industrial Services",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const activeSlideRef = useRef<HTMLDivElement | null>(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
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
        {/* Section Header */}
        <ScrollAnimation direction="up" className="mb-12">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-px w-[58px] bg-brand-red" />
            <h2 className="text-xs uppercase tracking-widest font-medium text-neutral-400">
              Testimonials
            </h2>
          </div>

          <h3 className="mb-6 text-3xl font-black leading-tighter tracking-tighter text-white">
            Our work speaks for itself
          </h3>

          <p className="max-w-2xl text-neutral-400 leading-tight">
            Hear what our customers have to say about our work.
          </p>
        </ScrollAnimation>

        {/* Carousel */}
        <ScrollAnimation direction="up" delay={0.2} className="relative">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-neutral-900 text-white transition-colors hover:bg-neutral-800 md:h-12 md:w-12"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Testimonial Content */}
            <div className="relative w-full max-w-4xl">
              <div
                className="relative overflow-hidden text-center transition-[height] duration-300 ease-in-out"
                style={{ height: contentHeight ?? undefined }}
              >
                {testimonials.map((testimonial, index) => (
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
                      <span className="w-full whitespace-pre-line">
                        &quot;{testimonial.quote}&quot;
                      </span>
                    </blockquote>

                    <div className="flex flex-col items-center">
                      <p className="text-sm font-bold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-neutral-400">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-neutral-900 text-white transition-colors hover:bg-neutral-800 md:h-12 md:w-12"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
