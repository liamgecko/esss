"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const testimonials = [
  {
    quote:
      "We provide specialised engineering support services, delivering innovative solutions and technical expertise to meet. We provide specialised engineering support services, delivering innovative solutions and technical expertise to meet.",
  },
  {
    quote:
      "Outstanding service and exceptional results. The team's expertise and attention to detail made all the difference in our project.",
  },
  {
    quote:
      "Professional, reliable, and always willing to go the extra mile. Highly recommend their engineering services.",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
            <div className="relative min-h-[150px] w-full max-w-4xl text-center md:min-h-[180px]">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className={`absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center px-2 text-base leading-relaxed text-white transition-opacity duration-500 ease-in-out md:px-4 md:text-xl lg:text-2xl ${
                    index === currentIndex
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  <span className="w-full">&quot;{testimonial.quote}&quot;</span>
                </blockquote>
              ))}
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
