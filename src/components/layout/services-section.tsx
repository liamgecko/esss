import { Wrench, Settings, Bolt } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const services = [
  {
    icon: Wrench,
    title: "Onsite machining",
    capabilities: [
      "Pipe cutting, preparation, and boring",
      "Flange facing and refurbishment",
      "Line boring",
      "Shaft machining and repair",
      "Drilling and tapping",
      "Milling",
    ],
  },
  {
    icon: Settings,
    title: "Mechanical maintenance",
    capabilities: [
      "Planned and preventative maintenance",
      "Mechanical repairs and component replacement",
      "Equipment installation and removal",
      "Alignment and fit-up",
      "Inspection, fault finding, and corrective works",
      "Shutdown and breakdown support",
    ],
  },
  {
    icon: Bolt,
    title: "Controlled bolting",
    capabilities: [
      "Flange bolt tensioning and torquing",
      "Hydraulic and mechanical bolt tensioning",
      "Stud replacement and flange preparation",
      "Sequence planning and documentation",
      "Gasket installation and verification",
      "Inspection and verification to engineering standards",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <ScrollAnimation direction="up" className="mb-12">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-px w-[58px] bg-brand-red" />
            <h2 className="text-xs uppercase tracking-widest font-medium text-neutral-400">
              Our services
            </h2>
          </div>

          <h3 className="mb-6 text-3xl font-black leading-tighter tracking-tighter text-white">
            Specialist onsite machining and mechanical maintenance
          </h3>

          <p className="max-w-2xl text-neutral-400 leading-tight">
          All work is conducted in accordance with client specifications, site safety procedures, and industry standards (ASME, API, or equivalent), including operations in live or high-risk environments.
          </p>
        </ScrollAnimation>

        {/* Service Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollAnimation
                key={index}
                direction="up"
                delay={index * 0.1}
                className="rounded-lg bg-neutral-900 p-6 transition-colors hover:bg-neutral-800"
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border-2 border-brand-red">
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h4 className="mb-4 text-lg font-black text-white">
                  {service.title}
                </h4>

                {/* Capabilities List */}
                <ul className="space-y-2 text-sm leading-tight text-neutral-400">
                  {service.capabilities.map((capability, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
