import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
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
  ],
  openGraph: {
    title: "VanMath | NZ Campervan Cost Calculator",
    description:
      "Don't get stung by hidden RUC fees! Calculate the true cost of your NZ campervan rental.",
    type: "website",
    locale: "en_NZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
