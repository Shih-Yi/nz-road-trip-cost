// Vehicle presets with typical fuel consumption data for NZ

export interface VehiclePreset {
  id: string;
  name: string;
  examples: string;
  fuelType: "petrol" | "diesel";
  consumption: number; // Average L/100km
  consumptionRange: string; // Display range
}

// Campervan presets
export const CAMPERVAN_PRESETS: VehiclePreset[] = [
  {
    id: "sleeper-van",
    name: "Sleeper Van",
    examples: "Toyota Estima, Nissan Serena",
    fuelType: "petrol",
    consumption: 11,
    consumptionRange: "10 - 12 L",
  },
  {
    id: "hitop-petrol",
    name: "HiTop (Petrol)",
    examples: "Toyota Hiace",
    fuelType: "petrol",
    consumption: 14,
    consumptionRange: "13 - 15 L",
  },
  {
    id: "hitop-diesel",
    name: "HiTop (Diesel)",
    examples: "Toyota Hiace Diesel",
    fuelType: "diesel",
    consumption: 10,
    consumptionRange: "9 - 11 L",
  },
  {
    id: "motorhome",
    name: "Motorhome (2-4 Berth)",
    examples: "Mercedes Sprinter, VW Crafter",
    fuelType: "diesel",
    consumption: 14.5,
    consumptionRange: "13 - 16 L",
  },
  {
    id: "large-rv",
    name: "Large RV (6 Berth)",
    examples: "Fiat Ducato, Ford Transit",
    fuelType: "diesel",
    consumption: 16,
    consumptionRange: "15 - 18 L",
  },
];

// Car presets
export const CAR_PRESETS: VehiclePreset[] = [
  {
    id: "economy",
    name: "Economy Car",
    examples: "Toyota Corolla, Suzuki Swift",
    fuelType: "petrol",
    consumption: 7.5,
    consumptionRange: "7 - 8 L",
  },
  {
    id: "compact-suv",
    name: "Compact SUV",
    examples: "Toyota RAV4, Mitsubishi Outlander",
    fuelType: "petrol",
    consumption: 9.5,
    consumptionRange: "9 - 10.5 L",
  },
  {
    id: "large-suv",
    name: "Large SUV",
    examples: "Toyota Highlander, Prado",
    fuelType: "petrol",
    consumption: 12,
    consumptionRange: "11 - 13 L",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    examples: "Toyota Prius, Corolla Hybrid",
    fuelType: "petrol",
    consumption: 5,
    consumptionRange: "4.5 - 5.5 L",
  },
];

// Get diesel presets for diesel campervan
export const getDieselCampervanPresets = () =>
  CAMPERVAN_PRESETS.filter((p) => p.fuelType === "diesel");

// Get petrol presets for petrol campervan
export const getPetrolCampervanPresets = () =>
  CAMPERVAN_PRESETS.filter((p) => p.fuelType === "petrol");
