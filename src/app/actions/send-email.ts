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

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // You'll need to verify a domain with Resend for production
      to: "liamyoung86@gmail.com",
      subject: `New Enquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Enquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telephone:</strong> ${telephone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return { success: true, message: "Your enquiry has been sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send your enquiry. Please try again later.",
    };
  }
}
