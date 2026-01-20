import Image from "next/image";
import ScrollAnimation from "@/components/ui/scroll-animation";
import WpHtml from "@/components/ui/wp-html";

type Link = {
  url?: string | null;
  title?: string | null;
  target?: string | null;
};

export type AboutSectionProps = {
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  primaryButton?: Link | null;
  image?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};

function getRel(target?: string | null) {
  return target === "_blank" ? "noreferrer noopener" : undefined;
}

export default function AboutSection({
  heading,
  mainHeading,
  content,
  primaryButton,
  image,
}: AboutSectionProps) {
  const hasAny =
    !!heading ||
    !!mainHeading ||
    !!content ||
    !!primaryButton?.url ||
    !!image?.sourceUrl;

  if (!hasAny) return null;

  return (
    <section id="about" className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <ScrollAnimation direction="right" className="flex flex-col justify-center">
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

            <WpHtml html={content} className="mb-8" />

            {primaryButton?.url && primaryButton.title ? (
              <a
                href={primaryButton.url}
                target={primaryButton.target || undefined}
                rel={getRel(primaryButton.target)}
                className="inline-block w-fit rounded-md bg-brand-red px-6 py-3 text-sm font-bold leading-none text-white transition-colors hover:opacity-90"
              >
                {primaryButton.title}
              </a>
            ) : null}
          </ScrollAnimation>

          {/* Right Column - Image */}
          {image?.sourceUrl ? (
            <ScrollAnimation
              direction="left"
              delay={0.2}
              className="relative h-[400px] w-full overflow-hidden rounded-lg"
            >
              <Image
                src={image.sourceUrl}
                alt={image.altText || "Image"}
                fill
                className="object-cover"
              />
            </ScrollAnimation>
          ) : null}
        </div>
      </div>
    </section>
  );
}
