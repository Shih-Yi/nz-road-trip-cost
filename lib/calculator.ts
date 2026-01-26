import { z } from "zod";
import fuelPricesData from "@/data/fuel-prices.json";

// Fuel type for car rental
export type CarFuelType = "petrol" | "diesel" | "hybrid";

// Get latest fuel prices from MBIE data (auto-updated weekly)
const getLatestFuelPrices = () => {
  if (fuelPricesData.length === 0) {
    // Fallback if no data
    return { petrol: 2.53, diesel: 1.88 };
  }
  // Get the last entry (most recent)
  const latest = fuelPricesData[fuelPricesData.length - 1];
  return {
    petrol: latest.petrol,
    diesel: latest.diesel,
  };
};

const latestPrices = getLatestFuelPrices();

// Default NZ fuel and rental data
// Fuel prices auto-loaded from data/fuel-prices.json (MBIE weekly data)
export const DEFAULTS = {
  // Fuel prices (NZD per litre) - auto-updated from MBIE
  dieselPrice: latestPrices.diesel,
  petrolPrice: latestPrices.petrol,

  // Fuel consumption (L per 100km) - 2026 Real World Estimates
  dieselConsumption: 11, // Typical for loaded campervan
  petrolConsumption: 13, // Typical for loaded campervan
  carConsumption: 8, // Typical for mixed car usage

  // Daily rental rates (NZD) - 2026 Average estimates
  dieselDailyRate: 180,
  petrolDailyRate: 140,
  carDailyRate: 60, // Typical car rental rate

  // RUC (Road User Charges) - Diesel only
  rucRate: 0.08, // $0.08/km (rental company rate, higher than govt rate)
  carRucRate: 0.08, // Same rate for diesel cars
  govtRucRate: 0.076, // Government rate for reference (2025/26)

  // Trip defaults
  days: 14,
  distance: 2500, // Typical NZ road trip

  // Car rental defaults
  carFuelType: "petrol" as CarFuelType,
  includeAccommodation: true,
  accommodationPerNight: 180, // Average NZ motel/cabin cost (2026)
} as const;

// Validation schema
export const calculatorSchema = z.object({
  days: z.number().min(1).max(365),
  distance: z.number().min(100).max(20000),
  dieselPrice: z.number().min(0.5).max(10),
  petrolPrice: z.number().min(0.5).max(10),
  dieselConsumption: z.number().min(5).max(25),
  petrolConsumption: z.number().min(5).max(25),
  dieselDailyRate: z.number().min(0).max(1000),
  petrolDailyRate: z.number().min(0).max(1000),
  rucRate: z.number().min(0).max(0.5),
  // Car rental fields
  carDailyRate: z.number().min(0).max(500),
  carConsumption: z.number().min(3).max(20),
  carFuelType: z.enum(["petrol", "diesel", "hybrid"]),
  carRucRate: z.number().min(0).max(0.5),
  includeAccommodation: z.boolean(),
  accommodationPerNight: z.number().min(0).max(1000),
});

export type CalculatorInput = z.infer<typeof calculatorSchema>;

export interface CostBreakdown {
  rental: number;
  fuel: number;
  ruc: number;
  accommodation: number;
  total: number;
}

export type VehicleType = "diesel" | "petrol" | "car";

export interface CalculationResult {
  diesel: CostBreakdown;
  petrol: CostBreakdown;
  car: CostBreakdown;
  winner: VehicleType;
  rankings: Array<{ type: VehicleType; label: string; total: number }>;
  savings: number;
  savingsPercent: number;
}

// Calculate costs for a single vehicle type
const calculateVehicleCost = (
  days: number,
  distance: number,
  dailyRate: number,
  fuelPrice: number,
  consumption: number,
  rucRate: number = 0,
  accommodationPerNight: number = 0
): CostBreakdown => {
  const rental = dailyRate * days;
  const fuel = (distance / 100) * consumption * fuelPrice;
  const ruc = distance * rucRate;
  const accommodation = accommodationPerNight * (days - 1); // nights = days - 1
  const total = rental + fuel + ruc + accommodation;

  return {
    rental: Math.round(rental),
    fuel: Math.round(fuel),
    ruc: Math.round(ruc),
    accommodation: Math.round(accommodation),
    total: Math.round(total),
  };
};

// Get vehicle label
export const getVehicleLabel = (type: VehicleType): string => {
  switch (type) {
    case "diesel":
      return "Diesel Campervan";
    case "petrol":
      return "Petrol Campervan";
    case "car":
      return "Car Rental";
  }
};

// Main calculation function
export const calculateCosts = (input: CalculatorInput): CalculationResult => {
  // Diesel campervan - no accommodation needed
  const diesel = calculateVehicleCost(
    input.days,
    input.distance,
    input.dieselDailyRate,
    input.dieselPrice,
    input.dieselConsumption,
    input.rucRate,
    0
  );

  // Petrol campervan - no accommodation needed
  const petrol = calculateVehicleCost(
    input.days,
    input.distance,
    input.petrolDailyRate,
    input.petrolPrice,
    input.petrolConsumption,
    0,
    0
  );

  // Car rental - needs accommodation
  const carFuelPrice =
    input.carFuelType === "diesel" ? input.dieselPrice : input.petrolPrice;
  const carRuc = input.carFuelType === "diesel" ? input.carRucRate : 0;
  // Hybrid uses less fuel (approximate 30% less)
  const carEffectiveConsumption =
    input.carFuelType === "hybrid"
      ? input.carConsumption * 0.7
      : input.carConsumption;

  const car = calculateVehicleCost(
    input.days,
    input.distance,
    input.carDailyRate,
    carFuelPrice,
    carEffectiveConsumption,
    carRuc,
    input.includeAccommodation ? input.accommodationPerNight : 0
  );

  // Create rankings
  const vehicles = [
    { type: "diesel" as VehicleType, label: "Diesel Campervan", total: diesel.total },
    { type: "petrol" as VehicleType, label: "Petrol Campervan", total: petrol.total },
    { type: "car" as VehicleType, label: "Car Rental", total: car.total },
  ].sort((a, b) => a.total - b.total);

  const winner = vehicles[0].type;
  const savings = vehicles[1].total - vehicles[0].total;
  const savingsPercent = Math.round(
    (savings / vehicles[1].total) * 100
  );

  return {
    diesel,
    petrol,
    car,
    winner,
    rankings: vehicles,
    savings,
    savingsPercent,
  };
};

// Format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format distance
export const formatDistance = (value: number): string => {
  return new Intl.NumberFormat("en-NZ").format(value) + " km";
};
