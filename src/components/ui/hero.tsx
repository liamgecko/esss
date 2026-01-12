"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[640px] w-full max-w-7xl mx-auto overflow-hidden my-8 rounded-lg px-6">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/esss-hero.jpg"
          alt="Industrial engineering equipment"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/60 to-neutral-950" />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.25, 0, 1] }}
              className="mb-4 text-4xl font-black leading-tighter text-white tracking-tight text-balance"
            >
              Specialist onsite machining and mechanical maintenance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.25, 0, 1] }}
              className="mb-8 leading-relaxed text-white"
            >
              Precision, safety, and reliability for heavy industrial facilities — delivered on time and with minimal disruption.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.25, 0, 1] }}
              className="flex flex-col gap-4 sm:flex-row justify-center"
            >
              <a
                href="#enquire"
                className="rounded-md border border-brand-red bg-brand-red px-6 py-3 text-sm font-bold leading-none text-white transition-colors hover:opacity-90"
              >
                Make an enquiry
              </a>
              <a
                href="#services"
                className="rounded-md border border-white bg-white/5 px-6 py-3 text-sm font-bold leading-none text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                About our services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
