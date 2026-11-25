import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DISCLAIMER_TEXT, OFFICIAL_SPECS_URL, OFFICIAL_SUPPORT_URL } from "@/lib/sections";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const SITE_TITLE = "Sony Alpha 7 (ILCE-7) — Precision Full-Frame Engineering Showcase";
const SITE_DESCRIPTION =
  "Independent engineering showcase of the Sony Alpha 7 (ILCE-7) with FE 28–70mm F3.5–5.6 OSS lens: 24.3MP 35mm full-frame Exmor CMOS sensor, BIONZ X engine, and 117-point Fast Hybrid AF.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Sony Alpha 7",
    "Sony ILCE-7",
    "Sony a7",
    "FE 28-70mm F3.5-5.6 OSS",
    "SEL2870",
    "Exmor CMOS",
    "BIONZ X",
    "Fast Hybrid AF",
    "Sony E-mount",
    "full-frame mirrorless",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = { themeColor: "#050505", width: "device-width", initialScale: 1 };

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  copyrightNotice: DISCLAIMER_TEXT,
  isBasedOn: OFFICIAL_SUPPORT_URL,
  mainEntity: {
    "@type": "Product",
    name: "Sony Alpha 7 (ILCE-7) with FE 28–70mm F3.5–5.6 OSS",
    alternateName: "Sony α7",
    model: "ILCE-7",
    releaseDate: "2013",
    category: "Full-Frame Mirrorless Interchangeable-Lens Camera",
    brand: {
      "@type": "Brand",
      name: "Sony",
    },
    isRelatedTo: OFFICIAL_SPECS_URL,
    description: SITE_DESCRIPTION,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Image Sensor", value: "35mm full-frame (35.8 × 23.9 mm) Exmor CMOS, approx. 24.3 effective MP" },
      { "@type": "PropertyValue", name: "Image Processor", value: "BIONZ X image engine" },
      { "@type": "PropertyValue", name: "Autofocus System", value: "Fast Hybrid AF (117 phase-detection + 25 contrast-detection points)" },
      { "@type": "PropertyValue", name: "Lens Mount", value: "Sony E-mount" },
      { "@type": "PropertyValue", name: "Sensitivity", value: "ISO 100–25,600 (expandable down to ISO 50)" },
      { "@type": "PropertyValue", name: "Shutter Speed", value: "1/8000 to 30 sec., Bulb" },
      { "@type": "PropertyValue", name: "Video Recording", value: "Full HD 1920 × 1080 (AVCHD / MP4)" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
