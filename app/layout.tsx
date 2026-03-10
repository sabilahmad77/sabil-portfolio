import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Sabil Ahmad — CTO & Blockchain Engineer",
    template: "%s | Sabil Ahmad",
  },
  description: SITE.description,
  keywords: [
    "CTO",
    "Blockchain Engineer",
    "Web3",
    "FANN",
    "Smart Contracts",
    "Solidity",
    "DeFi",
    "AI",
    "Full-Stack",
    "MERN",
    "Qatar",
    "GCC",
    "NFT Marketplace",
    "React",
    "Node.js",
  ],
  authors: [{ name: "Sabil Ahmad", url: SITE.url }],
  creator: "Sabil Ahmad",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE.url,
    siteName: "Sabil Ahmad",
    title: "Sabil Ahmad — CTO & Blockchain Engineer",
    description: SITE.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sabil Ahmad — CTO & Blockchain Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@SabilAhmad77",
    title: "Sabil Ahmad — CTO & Blockchain Engineer",
    description: SITE.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE.url },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sabil Ahmad",
  jobTitle: "Chief Technology Officer",
  worksFor: { "@type": "Organization", name: "FANN", url: "https://fann.art" },
  url: SITE.url,
  email: SITE.email,
  sameAs: [SITE.github, SITE.linkedin, SITE.twitter, SITE.medium],
  knowsAbout: ["Blockchain", "Web3", "Solidity", "React", "Node.js", "AI/ML", "DeFi", "NFTs"],
  workLocation: { "@type": "Place", name: "Doha, Qatar" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
