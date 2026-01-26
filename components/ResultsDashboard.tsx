"use client";

import { Trophy, TrendingDown, ExternalLink, Medal } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  getVehicleLabel,
  type CalculationResult,
  type CalculatorInput,
} from "@/lib/calculator";
import { trackCTAClicked } from "@/lib/analytics";

interface ResultsDashboardProps {
  results: CalculationResult;
  inputs: CalculatorInput;
}

const getRankBadge = (index: number) => {
  switch (index) {
    case 0:
      return (
        <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
          BEST VALUE
        </span>
      );
    case 1:
      return (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
          2ND
        </span>
      );
    case 2:
      return (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
          3RD
        </span>
      );
    default:
      return null;
  }
};

export const ResultsDashboard = ({
  results,
  inputs,
}: ResultsDashboardProps) => {
  const { diesel, petrol, car, rankings, savings, savingsPercent } = results;

  const chartData = [
    {
      name: "Diesel Van",
      Rental: diesel.rental,
      Fuel: diesel.fuel,
      RUC: diesel.ruc,
      Accommodation: diesel.accommodation,
      total: diesel.total,
    },
    {
      name: "Petrol Van",
      Rental: petrol.rental,
      Fuel: petrol.fuel,
      RUC: petrol.ruc,
      Accommodation: petrol.accommodation,
      total: petrol.total,
    },
    {
      name: "Car + Hotel",
      Rental: car.rental,
      Fuel: car.fuel,
      RUC: car.ruc,
      Accommodation: car.accommodation,
      total: car.total,
    },
  ];

  const winner = rankings[0];
  const runnerUp = rankings[1];

  return (
    <Card className="rounded-3xl border-0 bg-white shadow-xl shadow-rose-100/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Trophy className="h-5 w-5" />
          </div>
          The Verdict
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Winner Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-100">
                For your {inputs.days}-day, {inputs.distance.toLocaleString()}km
                trip:
              </p>
              <h3 className="mt-1 text-3xl font-extrabold">
                {winner.label} Wins!
              </h3>
              <p className="mt-2 text-emerald-100">
                You save{" "}
                <span className="font-bold text-white">
                  {formatCurrency(savings)}
                </span>{" "}
                ({savingsPercent}%) compared to {runnerUp.label}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-emerald-100">Total Cost</p>
              <p className="text-4xl font-extrabold">
                {formatCurrency(winner.total)}
              </p>
            </div>
          </div>
        </div>

        {/* Rankings */}
        <div className="grid gap-3 md:grid-cols-3">
          {rankings.map((vehicle, index) => (
            <div
              key={vehicle.type}
              className={`flex items-center justify-between rounded-2xl p-4 ${
                index === 0
                  ? "bg-emerald-50 ring-2 ring-emerald-500"
                  : "bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    index === 0
                      ? "bg-emerald-500 text-white"
                      : index === 1
                        ? "bg-amber-200 text-amber-700"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Medal className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {vehicle.label}
                  </p>
                  <p className="text-xs text-slate-500">
                    #{index + 1} Best Value
                  </p>
                </div>
              </div>
              <p
                className={`text-lg font-bold ${
                  index === 0 ? "text-emerald-600" : "text-slate-700"
                }`}
              >
                {formatCurrency(vehicle.total)}
              </p>
            </div>
          ))}
        </div>

        {/* Cost Breakdown Explanation */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-700">
            <TrendingDown className="h-4 w-4" />
            Why {winner.label} is the best value:
          </h4>
          {winner.type === "diesel" && (
            <p className="text-slate-600">
              Despite the{" "}
              <span className="font-semibold text-amber-600">
                {formatCurrency(diesel.ruc)} RUC fee
              </span>
              , the Diesel Campervan wins because of its{" "}
              <span className="font-semibold text-blue-600">
                better fuel efficiency
              </span>{" "}
              and the fact that you don&apos;t need to pay for separate
              accommodation.
            </p>
          )}
          {winner.type === "petrol" && (
            <p className="text-slate-600">
              The Petrol Campervan wins because it has{" "}
              <span className="font-semibold text-emerald-600">
                no RUC fees
              </span>{" "}
              and includes your accommodation (you sleep in the van!). This
              makes it more economical than both Diesel campervans and car +
              hotel combos.
            </p>
          )}
          {winner.type === "car" && (
            <p className="text-slate-600">
              {inputs.includeAccommodation ? (
                <>
                  Even with{" "}
                  <span className="font-semibold text-purple-600">
                    {formatCurrency(car.accommodation)} in accommodation costs
                  </span>
                  , the car rental wins because of its{" "}
                  <span className="font-semibold text-blue-600">
                    lower daily rate and better fuel efficiency
                  </span>
                  . For shorter trips or budget accommodation, cars can be more
                  economical!
                </>
              ) : (
                <>
                  Without accommodation costs included, the car rental has the{" "}
                  <span className="font-semibold text-blue-600">
                    lowest daily rate and best fuel efficiency
                  </span>
                  . Remember to factor in where you&apos;ll stay though!
                </>
              )}
            </p>
          )}
        </div>

        {/* Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" barSize={32}>
              <XAxis
                type="number"
                tickFormatter={(value) => `$${value}`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontWeight: 600, fontSize: 12 }}
                width={80}
              />
              <RechartsTooltip
                formatter={(value) => [formatCurrency(Number(value) || 0)]}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Bar
                dataKey="Rental"
                stackId="a"
                fill="#F97316"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Fuel"
                stackId="a"
                fill="#3b82f6"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="RUC"
                stackId="a"
                fill="#f59e0b"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Accommodation"
                stackId="a"
                fill="#a855f7"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Diesel Summary */}
          <div
            className={`rounded-2xl p-4 ${
              results.winner === "diesel"
                ? "bg-emerald-50 ring-2 ring-emerald-500"
                : "bg-slate-50"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Diesel Campervan</h4>
              {getRankBadge(rankings.findIndex((r) => r.type === "diesel"))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Rental ({inputs.days} days)
                </span>
                <span className="font-semibold">
                  {formatCurrency(diesel.rental)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fuel</span>
                <span className="font-semibold">
                  {formatCurrency(diesel.fuel)}
                </span>
              </div>
              <div className="flex justify-between text-amber-600">
                <span>RUC Fee</span>
                <span className="font-semibold">
                  {formatCurrency(diesel.ruc)}
                </span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-extrabold">
                  {formatCurrency(diesel.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Petrol Summary */}
          <div
            className={`rounded-2xl p-4 ${
              results.winner === "petrol"
                ? "bg-emerald-50 ring-2 ring-emerald-500"
                : "bg-slate-50"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Petrol Campervan</h4>
              {getRankBadge(rankings.findIndex((r) => r.type === "petrol"))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Rental ({inputs.days} days)
                </span>
                <span className="font-semibold">
                  {formatCurrency(petrol.rental)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fuel</span>
                <span className="font-semibold">
                  {formatCurrency(petrol.fuel)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>RUC Fee</span>
                <span className="font-semibold">$0</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-extrabold">
                  {formatCurrency(petrol.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Car Summary */}
          <div
            className={`rounded-2xl p-4 ${
              results.winner === "car"
                ? "bg-emerald-50 ring-2 ring-emerald-500"
                : "bg-slate-50"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Car Rental</h4>
              {getRankBadge(rankings.findIndex((r) => r.type === "car"))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Rental ({inputs.days} days)
                </span>
                <span className="font-semibold">
                  {formatCurrency(car.rental)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fuel</span>
                <span className="font-semibold">{formatCurrency(car.fuel)}</span>
              </div>
              {inputs.carFuelType === "diesel" && (
                <div className="flex justify-between text-amber-600">
                  <span>RUC Fee</span>
                  <span className="font-semibold">
                    {formatCurrency(car.ruc)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-purple-600">
                <span>Accommodation</span>
                <span className="font-semibold">
                  {inputs.includeAccommodation
                    ? formatCurrency(car.accommodation)
                    : "N/A"}
                </span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-extrabold">
                  {formatCurrency(car.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate CTA */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <p className="text-center text-slate-500">
            Ready to book? Check current availability and prices:
          </p>
          <Button
            size="lg"
            className="h-14 w-full max-w-md rounded-full bg-orange-500 text-lg font-bold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-300"
            onClick={() => {
              trackCTAClicked(
                "rental_comparison",
                results.winner,
                rankings[0].total
              );
              // TODO: Replace with actual affiliate link
              // window.open("https://affiliate-link.com", "_blank");
            }}
          >
            Check {getVehicleLabel(results.winner)} Rates
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-xs text-slate-400">
            Compare prices from top NZ rental companies
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
