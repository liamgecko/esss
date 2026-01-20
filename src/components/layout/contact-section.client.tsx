"use client";

import { useMemo, useState } from "react";
import { sendEmail } from "@/app/actions/send-email";

import FloatingInput from "@/components/ui/floating-input";
import ScrollAnimation from "@/components/ui/scroll-animation";
import WpHtml from "@/components/ui/wp-html";

export type ContactSectionClientProps = {
  heading?: string | null;
  mainHeading?: string | null;
  content?: string | null;
  telephoneNumber?: string | null;
  emailAddress?: string | null;
};

function normalizeTel(tel: string) {
  return tel.replace(/[^\d+]/g, "");
}

export default function ContactSectionClient({
  heading,
  mainHeading,
  content,
  telephoneNumber,
  emailAddress,
}: ContactSectionClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const hasLeft =
    !!heading ||
    !!mainHeading ||
    !!content ||
    !!telephoneNumber ||
    !!emailAddress;

  const gridClasses = hasLeft
    ? "grid gap-12 lg:grid-cols-2 lg:gap-16"
    : "grid";

  const telHref = useMemo(() => {
    if (!telephoneNumber) return null;
    const normalized = normalizeTel(telephoneNumber);
    return normalized ? `tel:${normalized}` : null;
  }, [telephoneNumber]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await sendEmail(formData);
    setSubmitStatus(result);
    setIsSubmitting(false);

    if (result.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    }
  }

  return (
    <section id="enquire" className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className={gridClasses}>
          {/* Left Column - Contact Information */}
          {hasLeft ? (
            <ScrollAnimation direction="right" className="flex flex-col">
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

              <WpHtml html={content} className="mb-8 max-w-xl" />

              {(telephoneNumber || emailAddress) ? (
                <div className="space-y-2 text-white">
                  {telephoneNumber ? (
                    <p>
                      {telHref ? (
                        <a
                          href={telHref}
                          className="text-white border-b border-transparent transition-colors hover:border-brand-red"
                        >
                          {telephoneNumber}
                        </a>
                      ) : (
                        telephoneNumber
                      )}
                    </p>
                  ) : null}

                  {emailAddress ? (
                    <p>
                      <a
                        href={`mailto:${emailAddress}`}
                        className="text-white border-b border-transparent transition-colors hover:border-brand-red"
                      >
                        {emailAddress}
                      </a>
                    </p>
                  ) : null}
                </div>
              ) : null}
            </ScrollAnimation>
          ) : null}

          {/* Right Column - Contact Form */}
          <ScrollAnimation direction={hasLeft ? "left" : "up"} delay={0.2} className="flex flex-col">
            <form id="contact-form" action={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FloatingInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  label="First name"
                  required
                />
                <FloatingInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  required
                />
              </div>

              <FloatingInput
                type="email"
                id="email"
                name="email"
                label="Email address"
                required
              />

              <FloatingInput
                type="tel"
                id="telephone"
                name="telephone"
                label="Telephone number"
                required
              />

              <FloatingInput
                id="message"
                name="message"
                label="Message"
                required
                isTextarea
                rows={4}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-brand-red px-6 py-3 text-sm font-bold leading-none text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send enquiry"}
              </button>

              {submitStatus ? (
                <div
                  className={`rounded-md p-4 text-sm ${
                    submitStatus.success
                      ? "bg-green-500/20 text-green-400"
                      : "bg-brand-red/10 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </div>
              ) : null}
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

