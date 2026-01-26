"use client";

import { useState, useMemo } from "react";
import {
  Fuel,
  Car,
  Calendar,
  MapPin,
  AlertTriangle,
  Info,
  Hotel,
  Truck,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DEFAULTS,
  calculateCosts,
  formatDistance,
  type CalculatorInput,
} from "@/lib/calculator";
import {
  getDieselCampervanPresets,
  getPetrolCampervanPresets,
  CAR_PRESETS,
} from "@/lib/vehicle-presets";
import { VehiclePresetSelector } from "./VehiclePresetSelector";
import { ResultsDashboard } from "./ResultsDashboard";
import fuelPrices from "@/data/fuel-prices.json";

const IconWrapper = ({
  children,
  className = "bg-blue-50 text-blue-600",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex h-10 w-10 items-center justify-center rounded-full ${className}`}
  >
    {children}
  </div>
);

export const Calculator = () => {
  // Get latest fuel price date
  const latestDate = useMemo(() => {
    if (!fuelPrices.length) return "Unknown";
    // Sort by date descending to get the most recent one
    const sorted = [...fuelPrices].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted[0].date;
  }, []);

  const [inputs, setInputs] = useState<CalculatorInput>({
    days: DEFAULTS.days,
    distance: DEFAULTS.distance,
    dieselPrice: DEFAULTS.dieselPrice,
    petrolPrice: DEFAULTS.petrolPrice,
    dieselConsumption: DEFAULTS.dieselConsumption,
    petrolConsumption: DEFAULTS.petrolConsumption,
    dieselDailyRate: DEFAULTS.dieselDailyRate,
    petrolDailyRate: DEFAULTS.petrolDailyRate,
    rucRate: DEFAULTS.rucRate,
    // Car rental
    carDailyRate: DEFAULTS.carDailyRate,
    carConsumption: DEFAULTS.carConsumption,
    carFuelType: DEFAULTS.carFuelType,
    carRucRate: DEFAULTS.carRucRate,
    includeAccommodation: DEFAULTS.includeAccommodation,
    accommodationPerNight: DEFAULTS.accommodationPerNight,
  });

  const results = useMemo(() => calculateCosts(inputs), [inputs]);

  const updateInput = <K extends keyof CalculatorInput>(
    key: K,
    value: CalculatorInput[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <TooltipProvider>
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Trip Details Card */}
        <Card className="rounded-3xl border-0 bg-white shadow-xl shadow-rose-100/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <IconWrapper className="bg-orange-50 text-orange-500">
                <MapPin className="h-5 w-5" />
              </IconWrapper>
              Your Trip
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-4">
            {/* Days Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-base font-semibold text-slate-700">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  Trip Duration
                </Label>
                <span className="rounded-full bg-orange-100 px-4 py-1 text-lg font-bold text-orange-600">
                  {inputs.days} days
                </span>
              </div>
              <Slider
                value={[inputs.days]}
                onValueChange={([value]) => updateInput("days", value)}
                min={1}
                max={60}
                step={1}
                className="py-2"
                aria-label="Trip duration in days"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>1 day</span>
                <span>60 days</span>
              </div>
            </div>

            {/* Distance Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-base font-semibold text-slate-700">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  Estimated Distance
                </Label>
                <span className="rounded-full bg-blue-100 px-4 py-1 text-lg font-bold text-blue-600">
                  {formatDistance(inputs.distance)}
                </span>
              </div>
              <Slider
                value={[inputs.distance]}
                onValueChange={([value]) => updateInput("distance", value)}
                min={100}
                max={10000}
                step={100}
                className="py-2"
                aria-label="Estimated travel distance"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>100 km</span>
                <span>10,000 km</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Comparison - 3 columns */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Diesel Campervan */}
          <Card className="rounded-3xl border-0 bg-white shadow-xl shadow-rose-100/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
                <IconWrapper className="bg-slate-100 text-slate-600">
                  <Truck className="h-5 w-5" />
                </IconWrapper>
                Diesel Campervan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Daily Rate */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">
                  Daily Rental Rate
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <Input
                    type="number"
                    value={inputs.dieselDailyRate}
                    onChange={(e) =>
                      updateInput("dieselDailyRate", Number(e.target.value))
                    }
                    className="h-12 rounded-full border-slate-200 pl-8 text-lg font-semibold"
                    min={0}
                    max={1000}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    /day
                  </span>
                </div>
              </div>

              {/* Fuel Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Fuel className="h-4 w-4" />
                    Diesel Price{" "}
                    <span className="font-normal text-slate-400">
                      (Est. National Avg)
                    </span>
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs rounded-2xl">
                      <p className="text-sm">
                        Based on the latest weekly monitoring data from MBIE
                        (Ministry of Business, Innovation and Employment). Last
                        updated: {latestDate}.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <Input
                    type="number"
                    value={inputs.dieselPrice}
                    onChange={(e) =>
                      updateInput("dieselPrice", Number(e.target.value))
                    }
                    className="h-12 rounded-full border-slate-200 pl-8 text-lg font-semibold"
                    min={0.5}
                    max={10}
                    step={0.01}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    /L
                  </span>
                </div>
              </div>

              {/* Vehicle Type & Consumption Selector */}
              <VehiclePresetSelector
                presets={getDieselCampervanPresets()}
                value={inputs.dieselConsumption}
                onChange={(value) => updateInput("dieselConsumption", value)}
                label="Vehicle Type & Fuel Consumption"
                accentColor="slate"
              />

              {/* RUC Rate */}
              <div className="space-y-2 rounded-2xl bg-amber-50 p-4">
                <Label className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                  <AlertTriangle className="h-4 w-4" />
                  Diesel Tax (RUC)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 cursor-help text-amber-500" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs rounded-2xl">
                      <p className="text-sm">
                        <strong>Road User Charges (RUC)</strong> apply to diesel
                        vehicles in NZ. Rental companies often charge{" "}
                        <strong>$0.08-$0.09/km</strong>.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600">
                    $
                  </span>
                  <Input
                    type="number"
                    value={inputs.rucRate}
                    onChange={(e) =>
                      updateInput("rucRate", Number(e.target.value))
                    }
                    className="h-12 rounded-full border-amber-200 bg-white pl-8 text-lg font-semibold text-amber-700"
                    min={0}
                    max={0.5}
                    step={0.01}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500">
                    /km
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Petrol Campervan */}
          <Card className="rounded-3xl border-0 bg-white shadow-xl shadow-rose-100/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
                <IconWrapper className="bg-emerald-50 text-emerald-600">
                  <Truck className="h-5 w-5" />
                </IconWrapper>
                Petrol Campervan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Daily Rate */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">
                  Daily Rental Rate
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <Input
                    type="number"
                    value={inputs.petrolDailyRate}
                    onChange={(e) =>
                      updateInput("petrolDailyRate", Number(e.target.value))
                    }
                    className="h-12 rounded-full border-slate-200 pl-8 text-lg font-semibold"
                    min={0}
                    max={1000}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    /day
                  </span>
                </div>
              </div>

              {/* Fuel Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Fuel className="h-4 w-4" />
                    Petrol Price (91){" "}
                    <span className="font-normal text-slate-400">
                      (Est. National Avg)
                    </span>
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs rounded-2xl">
                      <p className="text-sm">
                        Based on the latest weekly monitoring data from MBIE
                        (Ministry of Business, Innovation and Employment). Last
                        updated: {latestDate}.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <Input
                    type="number"
                    value={inputs.petrolPrice}
                    onChange={(e) =>
                      updateInput("petrolPrice", Number(e.target.value))
                    }
                    className="h-12 rounded-full border-slate-200 pl-8 text-lg font-semibold"
                    min={0.5}
                    max={10}
                    step={0.01}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    /L
                  </span>
                </div>
              </div>

              {/* Vehicle Type & Consumption Selector */}
              <VehiclePresetSelector
                presets={getPetrolCampervanPresets()}
                value={inputs.petrolConsumption}
                onChange={(value) => updateInput("petrolConsumption", value)}
                label="Vehicle Type & Fuel Consumption"
                accentColor="emerald"
              />

              {/* No RUC info */}
              <div className="space-y-2 rounded-2xl bg-emerald-50 p-4">
                <Label className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  No Diesel Tax (RUC)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 cursor-help text-emerald-500" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs rounded-2xl">
                      <p className="text-sm">
                        Petrol vehicles don&apos;t pay RUC - the road tax is
                        included in the fuel price.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <p className="text-2xl font-bold text-emerald-600">$0.00/km</p>
                <p className="text-xs text-emerald-600">
                  Road tax included in fuel
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Car Rental */}
          <Card className="rounded-3xl border-0 bg-white shadow-xl shadow-rose-100/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
                <IconWrapper className="bg-blue-50 text-blue-600">
                  <Car className="h-5 w-5" />
                </IconWrapper>
                Car Rental
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Daily Rate */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">
                  Daily Rental Rate
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <Input
                    type="number"
                    value={inputs.carDailyRate}
                    onChange={(e) =>
                      updateInput("carDailyRate", Number(e.target.value))
                    }
                    className="h-12 rounded-full border-slate-200 pl-8 text-lg font-semibold"
                    min={0}
                    max={500}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    /day
                  </span>
                </div>
              </div>

              {/* Vehicle Type & Consumption Selector */}
              <VehiclePresetSelector
                presets={CAR_PRESETS}
                value={inputs.carConsumption}
                onChange={(value) => updateInput("carConsumption", value)}
                label="Vehicle Type & Fuel Consumption"
                accentColor="blue"
                showFuelTypeSelector={true}
                fuelType={inputs.carFuelType === "hybrid" ? "petrol" : inputs.carFuelType}
                onFuelTypeChange={(type) => updateInput("carFuelType", type)}
                petrolPrice={inputs.petrolPrice}
                dieselPrice={inputs.dieselPrice}
                lastUpdated={latestDate}
                dieselCompatiblePresets={["large-suv"]}
                petrolCompatiblePresets={["economy", "compact-suv", "hybrid"]}
              />

              {/* RUC Rate - Only for diesel cars */}
              {inputs.carFuelType === "diesel" && (
                <div className="space-y-2 rounded-2xl bg-amber-50 p-4">
                  <Label className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                    <AlertTriangle className="h-4 w-4" />
                    Diesel Tax (RUC)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 cursor-help text-amber-500" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs rounded-2xl">
                        <p className="text-sm">
                          <strong>Road User Charges (RUC)</strong> apply to diesel
                          vehicles in NZ. Car rental companies often charge{" "}
                          <strong>$0.08-$0.09/km</strong>.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600">
                      $
                    </span>
                    <Input
                      type="number"
                      value={inputs.carRucRate}
                      onChange={(e) =>
                        updateInput("carRucRate", Number(e.target.value))
                      }
                      className="h-12 rounded-full border-amber-200 bg-white pl-8 text-lg font-semibold text-amber-700"
                      min={0}
                      max={0.5}
                      step={0.01}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500">
                      /km
                    </span>
                  </div>
                </div>
              )}

              {/* Accommodation */}
              <div className="space-y-3 rounded-2xl bg-purple-50 p-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm font-semibold text-purple-700">
                    <Hotel className="h-4 w-4" />
                    Accommodation
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 cursor-help text-purple-500" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs rounded-2xl">
                        <p className="text-sm">
                          Unlike campervans, car rentals require separate
                          accommodation. Toggle this to include hotel/motel
                          costs in the comparison.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Button
                    variant={inputs.includeAccommodation ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${
                      inputs.includeAccommodation
                        ? "bg-purple-600 hover:bg-purple-700"
                        : ""
                    }`}
                    onClick={() =>
                      updateInput(
                        "includeAccommodation",
                        !inputs.includeAccommodation
                      )
                    }
                  >
                    {inputs.includeAccommodation ? "Included" : "Excluded"}
                  </Button>
                </div>
                {inputs.includeAccommodation && (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600">
                      $
                    </span>
                    <Input
                      type="number"
                      value={inputs.accommodationPerNight}
                      onChange={(e) =>
                        updateInput(
                          "accommodationPerNight",
                          Number(e.target.value)
                        )
                      }
                      className="h-12 rounded-full border-purple-200 bg-white pl-8 text-lg font-semibold text-purple-700"
                      min={0}
                      max={1000}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500">
                      /night
                    </span>
                  </div>
                )}
                <p className="text-xs text-purple-600">
                  {inputs.includeAccommodation
                    ? `${inputs.days - 1} nights @ $${inputs.accommodationPerNight}/night`
                    : "Not included in comparison"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Dashboard */}
        <ResultsDashboard results={results} inputs={inputs} />

        <p className="mt-8 text-center text-xs text-slate-400">
          Data Source: Fuel prices are sourced from MBIE Weekly Fuel Price
          Monitoring. Vehicle specifications are estimates based on market
          averages.
        </p>
      </div>
    </TooltipProvider>
  );
};
