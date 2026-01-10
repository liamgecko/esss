"use server";

import { sendEmail } from "./send-email";

export async function sendEmailAction(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
) {
  return await sendEmail(formData);
}
