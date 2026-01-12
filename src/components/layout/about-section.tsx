import Image from "next/image";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function AboutSection() {
  return (
    <section id="about" className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <ScrollAnimation direction="right" className="flex flex-col justify-center">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-px w-[58px] bg-brand-red" />
              <h2 className="text-xs uppercase tracking-widest font-medium text-neutral-400">
                About us
              </h2>
            </div>

            <h3 className="mb-6 text-3xl font-black leading-tighter tracking-tighter text-white">
              Trusted by heavy industry to reduce downtime on critical plant and equipment.
            </h3>

            <div className="mb-8 space-y-4 text-neutral-400">
              <p className="leading-tight">
              Our business specialises in onsite machining and mechanical maintenance for heavy industrial facilities where precision, safety, and reliability are critical.
              </p>
              <p className="leading-tight">
              We support power generation, oil and gas, marine, and manufacturing operations by delivering accurate onsite machining and mechanical repair services directly at site. This approach reduces turnaround times, controls costs, and ensures alignment with client maintenance schedules.
              </p>
              <p className="leading-tight">
              With a strong focus on safety compliance, high-quality workmanship, and operational efficiency, we provide dependable support for critical plant and equipment. Our team is experienced in working safely within live and high-risk environments, delivering the required results without compromise.
              </p>
            </div>

            <a
              href="#enquire"
              className="inline-block w-fit rounded-md bg-brand-red px-6 py-3 text-sm font-bold leading-none text-white transition-colors hover:opacity-90"
            >
              Make an enquiry
            </a>
          </ScrollAnimation>

          {/* Right Column - Image */}
          <ScrollAnimation direction="left" delay={0.2} className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src="/esss-content.jpg"
              alt="Industrial engineering equipment and machinery"
              fill
              className="object-cover"
            />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
