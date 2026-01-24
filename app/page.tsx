import { Calculator } from "@/components/Calculator";
import { Truck, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden px-4 pb-8 pt-12 md:px-8 md:pb-12 md:pt-20">
        {/* Decorative background elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Logo/Brand */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Truck className="h-5 w-5 text-orange-500" />
            <span className="font-bold text-slate-900">VanMath</span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            <span className="text-blue-600">Diesel vs Petrol?</span>
            <br />
            Calculate the{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              True Cost
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 md:text-xl">
            Don&apos;t get stung by hidden{" "}
            <span className="font-semibold text-amber-600">
              RUC fees
            </span>{" "}
            when renting a campervan in New Zealand. Find out which fuel type
            actually saves you money.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                <Shield className="h-4 w-4 text-emerald-600" />
              </div>
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
              <span>Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50">
                <Truck className="h-4 w-4 text-orange-600" />
              </div>
              <span>NZ-specific data</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Calculator Section */}
      <main className="px-4 pb-16 md:px-8">
        <Calculator />
      </main>

      {/* Footer */}
      <footer className="border-t border-rose-100 bg-white/50 px-4 py-8 text-center backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-sm text-slate-500">
            VanMath helps tourists calculate the true cost of campervan rentals
            in New Zealand, including often-overlooked RUC (Road User Charges)
            for diesel vehicles.
          </p>
          <p className="text-xs text-slate-400">
            Fuel prices and consumption rates are estimates. Always verify with
            your rental company. Prices in NZD.
          </p>
        </div>
      </footer>
    </div>
  );
}
