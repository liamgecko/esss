"use client";

import { useState } from "react";
import { sendEmail } from "@/app/actions/send-email";
import FloatingInput from "@/components/ui/floating-input";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await sendEmail(formData);
    setSubmitStatus(result);
    setIsSubmitting(false);

    if (result.success) {
      // Reset form
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    }
  }

  return (
    <section id="enquire" className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Contact Information */}
          <ScrollAnimation direction="right" className="flex flex-col">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-px w-[58px] bg-brand-red" />
              <h2 className="text-xs uppercase tracking-widest font-medium text-neutral-400">
                Contact us
              </h2>
            </div>

            <h3 className="mb-6 text-3xl font-black leading-tighter tracking-tighter text-white">
              Enquire about our services
            </h3>

            <p className="mb-8 text-neutral-400">
              We&apos;d love to hear from you and we&apos;re here to help. Get in touch
              with us using the form or you can reach us by phone or email with
              the details below. We look forward to hearing from you!
            </p>

            <div className="space-y-2 text-white">
              <p>
                <span className="font-medium text-neutral-400">t:</span> 01234 567890
              </p>
              <p>
                <span className="font-medium text-neutral-400">e:</span>{" "}
                <a
                  href="mailto:info@engineeringspecialisedservices.co.uk"
                  className="text-white transition-colors hover:text-brand-red"
                >
                  info@engineeringspecialisedservices.co.uk
                </a>
              </p>
            </div>
          </ScrollAnimation>

          {/* Right Column - Contact Form */}
          <ScrollAnimation direction="left" delay={0.2} className="flex flex-col">
            <form
              id="contact-form"
              action={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {/* First Name */}
                <FloatingInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  label="First name"
                  required
                />

                {/* Last Name */}
                <FloatingInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  required
                />
              </div>

              {/* Email Address */}
              <FloatingInput
                type="email"
                id="email"
                name="email"
                label="Email address"
                required
              />

              {/* Telephone Number */}
              <FloatingInput
                type="tel"
                id="telephone"
                name="telephone"
                label="Telephone number"
                required
              />

              {/* Message */}
              <FloatingInput
                id="message"
                name="message"
                label="Message"
                required
                isTextarea
                rows={4}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-brand-red px-6 py-3 text-sm font-bold leading-none text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send enquiry"}
              </button>

              {/* Status Message */}
              {submitStatus && (
                <div
                  className={`rounded-md p-4 text-sm ${
                    submitStatus.success
                      ? "bg-green-500/20 text-green-400"
                      : "bg-brand-red/10 text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
