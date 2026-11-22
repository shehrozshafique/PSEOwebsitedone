import type { Metadata } from "next";
import { Onest, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AttributionCapture from "@/components/AttributionCapture";
import { ScrollProgress } from "@/components/effects";
import { site } from "@/lib/site";
import MobileCta from "@/components/MobileCta";
import LeadPopup from "@/components/LeadPopup";
import type { Viewport } from "next";

export const viewport: Viewport = { themeColor: "#0a0b0a", viewportFit: "cover" };

// Display font: Onest stands in for Matter until the web license is bought.
// To switch: load Matter with next/font/local and give it variable "--nf-display".
const display = Onest({ variable: "--nf-display", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });
const body = Inter({ variable: "--nf-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Websites, SEO, ads and automation for local businesses and online stores`,
  description:
    "Websites, Shopify stores, SEO, Google Maps, ads and automation that bring local businesses more calls and online stores more orders.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <SmoothScroll />
        <AttributionCapture />
        <ScrollProgress />
        {children}
        <MobileCta />
        <LeadPopup />
      </body>
    </html>
  );
}
