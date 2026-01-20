import { getContactOptions } from "@/lib/wp";
import ContactSectionClient from "@/components/layout/contact-section.client";

export default async function ContactSection() {
  const data = await getContactOptions();

  return (
    <ContactSectionClient
      heading={data?.heading}
      mainHeading={data?.mainHeading}
      content={data?.content}
      telephoneNumber={data?.telephoneNumber}
      emailAddress={data?.emailAddress}
    />
  );
}
