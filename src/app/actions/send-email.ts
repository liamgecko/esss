"use server";

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendEmail(formData: FormData) {
  if (!resend) {
    return {
      success: false,
      message:
        "Email service is not configured. Please set RESEND_API_KEY environment variable.",
    };
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const telephone = formData.get("telephone") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!firstName || !lastName || !email || !telephone || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  try {
    const { error } = await resend.emails.send({
      // Wix DNS doesn't allow Resend domain verification, so use Resend's shared domain.
      // Replies still go to the enquirer via replyTo.
      from: "ESSS <onboarding@resend.dev>",
      to: ["info@engineeringspecialisedsupport.com"],
      replyTo: email,
      subject: `New Enquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Enquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telephone:</strong> <a href="tel:${telephone}">${telephone}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return {
        success: false,
        message:
          typeof (error as { message?: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Failed to send your enquiry. Please try again later.",
      };
    }

    return { success: true, message: "Your enquiry has been sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to send your enquiry. Please try again later.",
    };
  }
}
