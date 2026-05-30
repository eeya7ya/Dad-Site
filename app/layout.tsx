import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rose Lens — Wedding & Portrait Photography",
  description:
    "Rose Lens is a fine-art photography studio capturing weddings, engagements and portraits with cinematic, timeless imagery.",
  keywords: [
    "Rose Lens",
    "wedding photography",
    "engagement photography",
    "portrait studio",
    "fine art photographer",
  ],
  openGraph: {
    title: "Rose Lens — Wedding & Portrait Photography",
    description:
      "Cinematic, timeless imagery for weddings, engagements and portraits.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08050a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
