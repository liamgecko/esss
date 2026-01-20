import Hero from "@/components/ui/hero";
import AboutSection from "@/components/layout/about-section";
import ServicesSection from "@/components/layout/services-section";
import { getPageByUri } from "@/lib/wp";

export default async function Home() {
  const page = await getPageByUri("/");
  const blocks = page?.contentBlocks?.contentBlocks ?? [];

  return (
    <div className="min-h-dvh bg-neutral-950">
      {blocks.map((block, idx) => {
        switch (block.__typename) {
          case "ContentBlocksContentBlocksHeroLayout":
            return (
              <Hero
                key={idx}
                heroImage={block.heroImage?.node ?? null}
                heroHeading={block.heroHeading}
                heroText={block.heroText}
                primaryButton={block.primaryButton}
                secondaryButton={block.secondaryButton}
              />
            );

          case "ContentBlocksContentBlocksImageTextLayout":
            return (
              <AboutSection
                key={idx}
                heading={block.heading}
                mainHeading={block.mainHeading}
                content={block.content}
                primaryButton={block.primaryButton}
                image={block.image?.node ?? null}
              />
            );

          case "ContentBlocksContentBlocksCardGridLayout":
            return (
              <ServicesSection
                key={idx}
                heading={block.heading}
                mainHeading={block.mainHeading}
                content={block.content}
                cards={block.cards ?? []}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
