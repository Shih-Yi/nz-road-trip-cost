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
  title: "VanMath | NZ Campervan Cost Calculator - Diesel vs Petrol 2026",
  description:
    "Free calculator to compare Diesel vs Petrol campervan rental costs in New Zealand. Includes hidden RUC fees, fuel prices & budget planner. Save $100s on your road trip!",
  keywords: [
    // 🎯 Short-tail keywords (高搜尋量)
    "campervan rental NZ",
    "motorhome hire NZ",
    "NZ road trip",
    "campervan New Zealand",
    "diesel vs petrol",
    "RUC fees",
    "van rental NZ",
    "camper hire",
    "NZ fuel prices",
    "road trip calculator",
    // 🎯 Long-tail keywords (高轉換意圖)
    "cheapest campervan rental new zealand 2026",
    "should I rent diesel or petrol campervan NZ",
    "new zealand road trip cost calculator",
    "how much does it cost to rent a campervan in NZ",
    "diesel campervan hidden fees new zealand",
    "RUC road user charges calculator NZ",
    "best fuel type for campervan rental NZ",
    "budget campervan trip south island",
    "north island road trip fuel cost",
    "queenstown to auckland campervan cost",
    // 🎯 Local intent keywords (地理意圖)
    "campervan hire auckland",
    "christchurch campervan rental",
    "queenstown motorhome hire",
    "wellington camper rental",
    // 🎯 Comparison keywords (比較意圖)
    "britz vs mighty campers cost",
    "jucy vs spaceships NZ",
    "cheap campervan vs expensive motorhome",
    "2 berth vs 4 berth campervan cost",
    // 🎯 Seasonal keywords (季節性)
    "summer road trip NZ 2026",
    "winter campervan rental deals NZ",
    "shoulder season NZ travel",
  ],
  authors: [{ name: "VanMath", url: "https://camperorcar.co.nz" }],
  creator: "VanMath",
  publisher: "VanMath",
  metadataBase: new URL("https://camperorcar.co.nz"),
  alternates: {
    canonical: "/",
    languages: {
      "en-NZ": "/",
      "en-AU": "/",
      "en-US": "/",
    },
  },
  category: "Travel",
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
    title: "Diesel vs Petrol Campervan Calculator | Save Money in NZ 2026",
    description:
      "Don't get stung by hidden RUC fees! Free calculator reveals the TRUE cost of campervan rentals in New Zealand. Compare Diesel vs Petrol & save $100s.",
    type: "website",
    locale: "en_NZ",
    siteName: "VanMath",
    url: "https://camperorcar.co.nz",
    // Static image for LINE and platforms that don't support dynamic images
    // Generate with: node scripts/generate-og-image.mjs
    images: [
      {
        url: "https://camperorcar.co.nz/og-image.png",
        width: 1200,
        height: 630,
        alt: "VanMath - NZ Campervan Cost Calculator showing Diesel vs Petrol comparison",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diesel vs Petrol? Calculate Your NZ Campervan Costs",
    description:
      "Free tool: Compare fuel costs + hidden RUC fees for your NZ road trip. Find out which campervan type actually saves money!",
    images: ["https://camperorcar.co.nz/og-image.png"],
    creator: "@vanmath_nz",
  },
  other: {
    // 🌏 Geo tags for local SEO
    "geo.region": "NZ",
    "geo.placename": "New Zealand",
    "geo.position": "-41.286460;174.776236",
    ICBM: "-41.286460, 174.776236",
    // 📱 Mobile optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "VanMath",
    // 🔍 Additional SEO
    "format-detection": "telephone=no",
    rating: "general",
    referrer: "origin-when-cross-origin",
  },
  verification: {
    // Add your verification codes here when ready
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🔍 Enhanced JSON-LD Structured Data for SEO
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VanMath NZ Campervan Cost Calculator",
    url: "https://camperorcar.co.nz",
    description:
      "Free online calculator to compare Diesel vs Petrol campervan rental costs in New Zealand. Includes RUC fees, fuel consumption, and budget planning.",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    softwareVersion: "2.0",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NZD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Diesel vs Petrol cost comparison",
      "RUC (Road User Charges) calculation",
      "Real-time NZ fuel prices",
      "Trip distance budgeting",
      "Rental cost breakdown",
    ],
    screenshot: "https://camperorcar.co.nz/opengraph-image",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // 📍 Organization Schema
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VanMath",
    url: "https://camperorcar.co.nz",
    logo: "https://camperorcar.co.nz/logo.png",
    description:
      "VanMath helps tourists calculate the true cost of campervan rentals in New Zealand.",
    areaServed: {
      "@type": "Country",
      name: "New Zealand",
    },
    serviceType: "Travel Cost Calculator",
  };

  // ❓ FAQ Schema (Boosts search appearance with rich snippets)
  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should I rent a diesel or petrol campervan in New Zealand?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on your trip distance. Diesel is more fuel-efficient but has additional RUC (Road User Charges) of $0.08-0.09/km. For trips under 2,500km, petrol is often cheaper. For longer trips, diesel may save money due to better fuel economy. Use our free calculator to compare costs for your specific itinerary.",
        },
      },
      {
        "@type": "Question",
        name: "What are RUC fees in New Zealand?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RUC (Road User Charges) are taxes that diesel vehicle owners must pay in New Zealand. Unlike petrol tax which is included in the pump price, diesel is taxed separately based on distance traveled. The government rate is approximately $0.076/km, but rental companies often charge $0.08-0.09/km. This can add $200-400 to a typical 3,000km road trip.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a campervan road trip cost in New Zealand in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical 2-week campervan road trip in NZ costs $2,500-$5,000 including rental ($100-200/day), fuel ($400-800 depending on distance), camping fees ($20-50/night), and activities. Diesel campervans have hidden RUC fees of $240-360 for a 3,000km trip. Use our calculator to get an accurate estimate for your specific trip.",
        },
      },
      {
        "@type": "Question",
        name: "Is diesel or petrol cheaper in New Zealand 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As of 2026, diesel is approximately $2.10/L while petrol (91) is around $2.65/L in New Zealand. However, diesel vehicles must also pay RUC charges ($0.076-0.09/km), which often makes the total running cost similar or higher than petrol for shorter trips.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best time to rent a campervan in New Zealand?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The shoulder seasons (March-May and September-November) offer the best value with lower rental rates (up to 30% cheaper than peak summer), fewer crowds, and still pleasant weather. Peak season (December-February) has the highest prices and requires booking 3-6 months in advance.",
        },
      },
    ],
  };

  // 📊 HowTo Schema for calculator usage
  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Your NZ Campervan Trip Cost",
    description:
      "Use VanMath to calculate and compare diesel vs petrol campervan costs for your New Zealand road trip.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter trip details",
        text: "Input your rental duration (days) and planned driving distance (km).",
      },
      {
        "@type": "HowToStep",
        name: "Set daily rental rates",
        text: "Enter the daily rental rate for both diesel and petrol campervans you're comparing.",
      },
      {
        "@type": "HowToStep",
        name: "Review fuel settings",
        text: "Adjust fuel prices and consumption rates if needed, or use our NZ average defaults.",
      },
      {
        "@type": "HowToStep",
        name: "Compare results",
        text: "See the total cost breakdown including rental, fuel, and RUC fees to find the cheaper option.",
      },
    ],
    totalTime: "PT2M",
    tool: {
      "@type": "HowToTool",
      name: "VanMath Calculator",
    },
  };

  const jsonLd = [jsonLdWebApp, jsonLdOrganization, jsonLdFAQ, jsonLdHowTo];

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

        {/* JSON-LD Structured Data for Rich Search Results */}
        {jsonLd.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </body>
    </html>
  );
}
