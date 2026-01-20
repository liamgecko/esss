import type { LucideIcon } from "lucide-react";
import { Bolt, Cog, Settings, Toolbox, Wrench } from "lucide-react";
import ScrollAnimation from "@/components/ui/scroll-animation";
import WpHtml from "@/components/ui/wp-html";

type Link = {
  url?: string | null;
  title?: string | null;
  target?: string | null;
};

type Card = {
  heading?: string | null;
  content?: string | null;
  icon?: string | null;
};

export type ServicesSectionProps = {
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  cards?: Card[] | null;
  // not used now, but keeps parity with block signature if needed later
  primaryButton?: Link | null;
};

function iconFromString(value?: string | null): LucideIcon {
  const key = (value ?? "").trim().toLowerCase();
  const map: Record<string, LucideIcon> = {
    bolt: Bolt,
    cog: Cog,
    settings: Settings,
    toolbox: Toolbox,
    wrench: Wrench,
  };
  return map[key] ?? Wrench;
}

export default function ServicesSection({
  heading,
  mainHeading,
  content,
  cards,
}: ServicesSectionProps) {
  const hasAny = !!heading || !!mainHeading || !!content || (cards?.length ?? 0) > 0;
  if (!hasAny) return null;

  return (
    <section id="services" className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
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

        {/* Service Cards Grid */}
        {(cards?.length ?? 0) > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(cards ?? []).map((card, index) => {
              const Icon = iconFromString(card.icon);
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
                {card.heading ? (
                  <h4 className="mb-3 text-lg font-black text-white">
                    {card.heading}
                  </h4>
                ) : null}

                <WpHtml html={card.content} className="text-sm [&_p]:mb-3 [&_ul]:mt-3" />
              </ScrollAnimation>
            );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
