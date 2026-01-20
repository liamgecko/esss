import { getTestimonialsOptions } from "@/lib/wp";
import TestimonialsSectionClient from "@/components/layout/testimonials-section.client";

export default async function TestimonialsSection() {
  const data = await getTestimonialsOptions();
  if (!data?.quotes?.length) return null;

  return (
    <TestimonialsSectionClient
      heading={data.heading}
      mainHeading={data.mainHeading}
      content={data.content}
      quotes={data.quotes}
    />
  );
}
