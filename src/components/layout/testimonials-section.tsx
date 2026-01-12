"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";
import Lightbox from "@/components/ui/lightbox";

const testimonials = [
  {
    quote:
      "We provide specialised engineering support services, delivering innovative solutions and technical expertise to meet. We provide specialised engineering support services, delivering innovative solutions and technical expertise to meet.",
    images: [
      "/esss-hero.jpg",
      "/esss-content.jpg",
    ],
  },
  {
    quote:
      "Outstanding service and exceptional results. The team's expertise and attention to detail made all the difference in our project.",
    images: [
      "/esss-content.jpg",
      "/esss-hero.jpg",
    ],
  },
  {
    quote:
      "Professional, reliable, and always willing to go the extra mile. Highly recommend their engineering services.",
    images: [
      "/esss-hero.jpg",
      "/esss-content.jpg",
    ],
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

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

  const openLightbox = (imageIndex: number) => {
    setLightboxImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNextImage = () => {
    const currentTestimonial = testimonials[currentIndex];
    setLightboxImageIndex((prev) =>
      prev === currentTestimonial.images.length - 1 ? 0 : prev + 1
    );
  };

  const goToPreviousImage = () => {
    const currentTestimonial = testimonials[currentIndex];
    setLightboxImageIndex((prev) =>
      prev === 0 ? currentTestimonial.images.length - 1 : prev - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

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
              <div className="relative min-h-[150px] text-center md:min-h-[180px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute left-0 right-0 top-0 flex flex-col items-center transition-opacity duration-500 ease-in-out ${
                      index === currentIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <blockquote className="mb-6 w-full px-2 text-base leading-relaxed text-white md:px-4 md:text-xl lg:text-2xl">
                      <span className="w-full">&quot;{testimonial.quote}&quot;</span>
                    </blockquote>

                    {/* Thumbnail Gallery */}
                    {testimonial.images && testimonial.images.length > 0 && (
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {testimonial.images.map((image, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => openLightbox(imgIndex)}
                            className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border-2 border-white/20 transition-all hover:border-brand-red hover:scale-105 md:h-24 md:w-24"
                            aria-label={`View image ${imgIndex + 1}`}
                          >
                            <Image
                              src={image}
                              alt={`Gallery thumbnail ${imgIndex + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 80px, 96px"
                            />
                          </button>
                        ))}
                      </div>
                    )}
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

      {/* Lightbox */}
      {currentTestimonial.images && currentTestimonial.images.length > 0 && (
        <Lightbox
          images={currentTestimonial.images}
          currentIndex={lightboxImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={goToNextImage}
          onPrevious={goToPreviousImage}
        />
      )}
    </section>
  );
}
