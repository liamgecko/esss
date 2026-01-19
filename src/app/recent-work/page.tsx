import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/layout/header";
import ContactSection from "@/components/layout/contact-section";
import Footer from "@/components/layout/footer";
import TestimonialsSection from "@/components/layout/testimonials-section";
import RecentWorkGallery from "@/components/ui/recent-work-gallery";

export const metadata: Metadata = {
  title:
    "Recent work | ESSS - Specialist onsite machining and mechanical maintenance in Fife, Scotland",
  description:
    "A selection of recent onsite machining, mechanical maintenance, and controlled bolting work delivered for heavy industry.",
};

export default function RecentWorkPage() {
  return (
    <div className="min-h-dvh bg-neutral-950">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-px w-[58px] bg-brand-red" />
            <p className="text-xs uppercase tracking-widest font-medium text-neutral-400">
              Recent work
            </p>
          </div>

          <h1 className="mb-6 text-3xl font-black leading-tighter tracking-tighter text-white md:text-4xl">
            Recent onsite machining and maintenance projects
          </h1>

          <p className="max-w-2xl text-neutral-400 leading-tight">
            A selection of recent work across heavy industrial facilities. Each
            job is delivered in accordance with client specifications, site
            safety procedures, and relevant industry standards.
          </p>
        </div>

        <RecentWorkGallery />

      </main>

      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

