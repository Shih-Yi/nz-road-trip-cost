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

        {/* SEO Content Section - Optimized for long-tail keywords and search intent */}
        <section className="mx-auto mt-20 max-w-4xl space-y-16 px-2 text-slate-700" aria-labelledby="seo-main-heading">
          {/* Main SEO Heading */}
          <div className="space-y-4">
            <h2 id="seo-main-heading" className="text-2xl font-bold text-slate-900 md:text-3xl">
              Understanding New Zealand Road User Charges (RUC) in 2026
            </h2>
            <p className="leading-relaxed text-slate-600">
              Unlike many other countries, New Zealand taxes diesel vehicles
              separately through <strong>Road User Charges (RUC)</strong>. Petrol
              is taxed at the pump, but diesel is not. If you rent a diesel
              campervan, you (or your rental company) must pay this tax based on
              the distance you drive. As of 2026, rental companies typically charge
              between <strong>$0.08 and $0.09 per kilometer</strong>. This hidden
              cost can add hundreds of dollars to your trip, often making a
              seemingly cheaper diesel rental more expensive than a petrol
              alternative.
            </p>
          </div>

          {/* Comparison Section */}
          <div className="grid gap-8 md:grid-cols-2">
            <article className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                Diesel vs Petrol Campervan: Which is Cheaper in 2026?
              </h3>
              <p className="leading-relaxed text-slate-600">
                The answer depends on your total distance. Diesel engines are more
                fuel-efficient (using ~10-11L/100km vs ~13-14L for petrol), but
                the RUC fees offset these savings on shorter trips. Generally, if
                you plan to drive <strong>over 2,500km</strong>, the efficiency
                of diesel starts to pay off. For shorter trips around the South
                Island or North Island loops, a petrol Hitop campervan is often the
                more economical choice. Use our calculator above to run your
                specific numbers.
              </p>
            </article>
            <article className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                How to Save Money on Your NZ Road Trip
              </h3>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-slate-600">
                <li>
                  <strong>Book Early:</strong> Campervan rates in 2026 fluctuate
                  wildly. Booking 3-6 months in advance can save up to 30%.
                </li>
                <li>
                  <strong>Check Fuel Apps:</strong> Use apps like Gaspy to find the
                  cheapest petrol stations nearby. Prices can vary by 20-30 cents
                  per litre between towns.
                </li>
                <li>
                  <strong>Consider Shoulder Season:</strong> Traveling in March-May
                  or September-November offers cheaper rental rates and significantly
                  less traffic on the roads.
                </li>
              </ul>
            </article>
          </div>

          {/* Campervan vs Car Section - New Keyword Target */}
          <article className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
              Campervan or Car NZ: Which is Best for Your Road Trip?
            </h3>
            <p className="leading-relaxed text-slate-600">
              Deciding between a <strong>campervan or car in NZ</strong> depends on your travel style and budget.
              <strong>Hiring a car vs campervan NZ</strong> often comes down to accommodation preferences.
              A car rental is cheaper (from $40/day) and offers better fuel economy (6-8L/100km), but requires
              booking separate accommodation ($100-$200/night). A campervan combines transport and accommodation,
              providing flexibility to stay in scenic holiday parks. When calculating <strong>campervan vs car cost NZ</strong>,
              remember that while campervans have higher fuel and ferry costs, you save significantly on nightly stays.
            </p>
          </article>

          {/* Popular Routes Section - Long-tail keywords */}
          <article className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Popular NZ Campervan Routes & Estimated Costs
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h4 className="font-bold text-blue-600">Auckland to Queenstown</h4>
                <p className="mt-2 text-sm text-slate-600">
                  ~1,800km via Rotorua, Wellington ferry, Christchurch.
                  Estimated fuel: $380-$520 depending on fuel type.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h4 className="font-bold text-blue-600">South Island Loop</h4>
                <p className="mt-2 text-sm text-slate-600">
                  ~2,200km Christchurch → Queenstown → Milford → West Coast.
                  Estimated fuel: $460-$630 + RUC for diesel.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h4 className="font-bold text-blue-600">North Island Circle</h4>
                <p className="mt-2 text-sm text-slate-600">
                  ~1,500km Auckland → Coromandel → Rotorua → Taupo → Wellington.
                  Estimated fuel: $315-$430 for 14 days.
                </p>
              </div>
            </div>
          </article>

          {/* FAQ Section - Matches JSON-LD */}
          <article className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions About Campervan Rental in NZ
            </h3>
            <div className="space-y-4">
              <details className="group rounded-2xl bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  Should I rent a diesel or petrol campervan in New Zealand?
                </summary>
                <p className="mt-3 text-slate-600">
                  It depends on your trip distance. Diesel is more fuel-efficient but has
                  additional RUC charges of $0.08-0.09/km. For trips under 2,500km, petrol
                  is often cheaper. Use our calculator above for your specific itinerary.
                </p>
              </details>
              <details className="group rounded-2xl bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  What are RUC fees and why do I have to pay them?
                </summary>
                <p className="mt-3 text-slate-600">
                  RUC (Road User Charges) are NZ taxes for diesel vehicles. While petrol
                  tax is included in the pump price, diesel isn&apos;t taxed at purchase.
                  Rental companies collect RUC based on kilometers driven, typically
                  adding $200-400 to a 3,000km trip.
                </p>
              </details>
              <details className="group rounded-2xl bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  How much does a 2-week campervan trip cost in New Zealand?
                </summary>
                <p className="mt-3 text-slate-600">
                  Budget $2,500-$5,000 NZD for 2 weeks including rental ($100-200/day),
                  fuel ($400-800), camping ($20-50/night), and activities. Diesel
                  campervans have additional RUC fees of $240-360 for ~3,000km.
                </p>
              </details>
              <details className="group rounded-2xl bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  When is the best time to rent a campervan in NZ?
                </summary>
                <p className="mt-3 text-slate-600">
                  Shoulder seasons (March-May & September-November) offer the best value
                  with up to 30% lower rental rates. Peak summer (December-February) has
                  highest prices and requires 3-6 months advance booking.
                </p>
              </details>
            </div>
          </article>

          {/* Rental Companies Comparison - Brand keywords */}
          <article className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Comparing NZ Campervan Rental Companies in 2026
            </h3>
            <p className="leading-relaxed text-slate-600">
              Popular rental companies like <strong>Britz</strong>, <strong>Maui</strong>,
              <strong>Mighty Campers</strong>, <strong>Jucy</strong>, and <strong>Spaceships</strong>
              offer different vehicle types and price points. Budget options like Jucy start
              around $80/day for a 2-berth, while premium Maui motorhomes can exceed $250/day.
              All diesel rentals are subject to RUC fees regardless of company. Always compare
              the <em>total cost</em> including rental + fuel + RUC, not just the daily rate.
            </p>
          </article>
        </section>
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
          <div className="mt-4 flex justify-center gap-4 text-xs text-slate-400">
            <a href="/privacy-policy" className="hover:text-slate-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
