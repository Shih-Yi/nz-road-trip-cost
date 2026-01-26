import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { TallyFeedbackButton } from "@/components/TallyFeedbackButton";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VanMath | NZ Campervan Cost Calculator - Diesel vs Petrol",
  description:
    "Calculate the true cost of renting a campervan in New Zealand. Compare Diesel vs Petrol, understand RUC fees, and find the cheapest option for your road trip.",
  keywords: [
    "NZ campervan rental",
    "diesel vs petrol calculator",
    "RUC fees New Zealand",
    "campervan cost calculator",
    "New Zealand road trip",
    "campervan hire NZ",
    "diesel price NZ 2026",
    "petrol price NZ 2026",
    "road trip cost estimator",
  ],
  authors: [{ name: "VanMath" }],
  creator: "VanMath",
  metadataBase: new URL("https://camperorcar.co.nz"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "VanMath | NZ Campervan Cost Calculator - True Cost of Travel",
    description:
      "Don't get stung by hidden RUC fees! Calculate the true cost of your NZ campervan rental. Compare Diesel vs Petrol with real-time 2026 data.",
    type: "website",
    locale: "en_NZ",
    siteName: "VanMath",
  },
  twitter: {
    card: "summary_large_image",
    title: "VanMath | NZ Campervan Cost Calculator",
    description: "Calculate diesel vs petrol costs for your NZ road trip. Includes RUC and rental fees.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VanMath NZ Fuel Cost Calculator",
    url: "https://camperorcar.co.nz",
    description:
      "A free tool to calculate and compare the cost of diesel vs petrol campervan rentals in New Zealand, including Road User Charges (RUC).",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NZD",
    },
    featureList: "Fuel Cost Calculation, RUC Calculation, Rental Comparison",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
        
        {/* Feedback Widget - Tally Popup */}
        <TallyFeedbackButton />

        {/* Google Analytics & Tag Manager - Managed via GTM only */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
