import { Wrench, Settings, Cog, Toolbox } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";

const services = [
  {
    icon: Wrench,
    title: "Service one",
    description:
      "We provide specialised engineering support services, delivering innovative solutions and technical expertise to meet.",
  },
  {
    icon: Settings,
    title: "Service two",
    description:
      "We provide specialised engineering support services, delivering innovative solutions and technical expertise to meet.",
  },
  {
    icon: Cog,
    title: "Service three",
    description:
      "We provide specialised engineering support services, delivering innovative solutions and technical expertise to meet.",
  },
  {
    icon: Toolbox,
    title: "Service four",
    description:
      "We provide specialised engineering support services, delivering innovative solutions and technical expertise to meet.",
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
            Professional engineering services
          </h3>

          <p className="max-w-2xl text-neutral-400 leading-tight">
            We provide specialised engineering support services, delivering
            innovative             solutions and technical expertise to meet.
          </p>
        </ScrollAnimation>

        {/* Service Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <h4 className="mb-3 text-lg font-black text-white">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="text-sm leading-tight text-neutral-400">
                  {service.description}
                </p>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
