import Header from "@/components/layout/header";
import Hero from "@/components/ui/hero";
import AboutSection from "@/components/layout/about-section";
import ServicesSection from "@/components/layout/services-section";
import TestimonialsSection from "@/components/layout/testimonials-section";
import ContactSection from "@/components/layout/contact-section";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-dvh bg-neutral-950">
      <Header />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
