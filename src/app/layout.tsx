import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import TestimonialsSection from "@/components/layout/testimonials-section";
import Header from "@/components/layout/header";
import ContactSection from "@/components/layout/contact-section";
import Footer from "@/components/layout/footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ESSS - Specialist onsite machining and mechanical maintenance in Fife, Scotland",
  description: "Specialist onsite machining and mechanical maintenance for heavy industrial facilities. Precision, safety, and reliability delivered on time with minimal disruption.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <Header />
        {children}
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
