import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";

const poppinsFonts = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "QuickServe POS – Modern Restaurant POS & Receipt Generator",
    template: "%s | QuickServe POS",
  },
  description:
    "A high-performance Restaurant Point of Sale (POS) and Instant Thermal Receipt Generator built with Next.js, Tailwind CSS, and REST API integration.",

  keywords: [
    "Restaurant POS",
    "Point of Sale Web App",
    "Next.js POS System",
    "Thermal Receipt Generator",
    "Cashier App",
    "Frontend Developer Portfolio",
  ],
  authors: [{name: "Herman"}],
  creator: "Herman",

  metadataBase: new URL("https://quick-serve-pos-two.vercel.app"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "QuickServe POS – Modern Restaurant POS & Receipt System",
    description:
      "Interactive POS terminal featuring real-time product search, category filtering, dynamic cart calculations, and instant thermal receipt printing.",
    url: "https://quick-serve-pos-two.vercel.app/",
    siteName: "QuickServe POS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/home.webp",
        width: 1200,
        height: 630,
        alt: "QuickServe POS Interface Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "QuickServe POS – Modern Restaurant POS & Receipt System",
    description:
      "High-performance POS application built with Next.js & Tailwind CSS. Features dynamic cart logic and instant receipt generation.",
    images: ["/home.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppinsFonts.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
