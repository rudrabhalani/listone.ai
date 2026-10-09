import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Listone.ai | AI Product Photos, A+ Content & Listing Optimization",
  description:
    "Turn one product photo or ASIN into 15 listing images, A+ content, and optimized bullet points. Edit everything like Canva.",
  keywords: [
    "Listone.ai",
    "Amazon product photography",
    "A+ content studio",
    "Amazon listing optimization",
    "Canva style e-commerce editor",
    "ASIN photo generator",
    "E-commerce AI",
    "Flipkart listing images",
    "Shopify product photos",
  ],
  authors: [{ name: "Bhalani Rudra Sandipbhai", url: "https://github.com/rudrabhalani/listone.ai.git" }],
  creator: "Bhalani Rudra Sandipbhai",
  openGraph: {
    title: "Listone.ai | AI Product Photos, A+ Content & Listing Optimization",
    description:
      "From one photo to a complete listing. 15 high-converting listing images, A+ content & bullet points in minutes.",
    url: "https://listone.ai",
    siteName: "Listone.ai",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Listone.ai | AI Product Photos, A+ Content & Listing Optimization",
    description:
      "Turn one product photo or ASIN into 15 listing images, A+ content, and optimized bullet points. Edit everything like Canva.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon-512.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${jakarta.variable} ${inter.variable} antialiased min-h-screen bg-[#0B0B14] text-[#E5E7EB] selection:bg-brand-violet/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
