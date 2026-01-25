"use client";

import { useState, useRef } from "react";
import { Pencil, Check, Fuel, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { VehiclePreset } from "@/lib/vehicle-presets";

interface VehiclePresetSelectorProps {
  presets: VehiclePreset[];
  value: number;
  onChange: (value: number) => void;
  label: string;
  accentColor?: string;
  // Car-specific props for fuel type selection
  showFuelTypeSelector?: boolean;
  fuelType?: "petrol" | "diesel";
  onFuelTypeChange?: (type: "petrol" | "diesel") => void;
  petrolPrice?: number;
  dieselPrice?: number;
  // Preset IDs that can use diesel
  dieselCompatiblePresets?: string[];
  // Preset IDs that can use petrol
  petrolCompatiblePresets?: string[];
}

export const VehiclePresetSelector = ({
  presets,
  value,
  onChange,
  label,
  accentColor = "blue",
  showFuelTypeSelector = false,
  fuelType = "petrol",
  onFuelTypeChange,
  petrolPrice = 2.53,
  dieselPrice = 1.88,
  dieselCompatiblePresets = [],
  petrolCompatiblePresets = [],
}: VehiclePresetSelectorProps) => {
  const [isCustom, setIsCustom] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Find matching preset
  const selectedPreset = presets.find(
    (p) => Math.abs(p.consumption - value) < 0.5
  );

  // Determine availability
  // If we are in custom mode, everything is allowed.
  // If a preset is selected, check the lists.
  // If lists are empty (and not custom), default to allowing? 
  // Actually, for "Car Rental", we will pass specific lists.
  // For safety, if a list is not provided/empty, maybe we shouldn't lock? 
  // But here we want strict locking.
  // Let's rely on the passed props.
  const isPetrolAllowed = isCustom || (selectedPreset && petrolCompatiblePresets.includes(selectedPreset.id));
  const isDieselAllowed = isCustom || (selectedPreset && dieselCompatiblePresets.includes(selectedPreset.id));

  const handlePresetSelect = (preset: VehiclePreset) => {
    onChange(preset.consumption);
    setIsCustom(false);
    setShowCustomInput(false);
    
    // Auto-switch fuel type if current one is not allowed for this new preset
    if (onFuelTypeChange) {
      const presetSupportsPetrol = petrolCompatiblePresets.includes(preset.id);
      const presetSupportsDiesel = dieselCompatiblePresets.includes(preset.id);

      if (presetSupportsPetrol && !presetSupportsDiesel) {
        onFuelTypeChange("petrol");
      } else if (!presetSupportsPetrol && presetSupportsDiesel) {
        onFuelTypeChange("diesel");
      }
      // If both supported, keep current (or default to petrol if current invalid?)
      // If current is 'diesel' but new only supports 'petrol' -> switch to petrol (handled above)
      // If current is 'petrol' but new only supports 'diesel' -> switch to diesel (handled above)
    }
  };

  const handleCustomSelect = () => {
    setIsCustom(true);
    setShowCustomInput(true);
    // Custom allows everything, so no need to force switch, but user can now click any fuel
  };

  const handleFuelTypeChange = (type: "petrol" | "diesel") => {
    if (!onFuelTypeChange) return;
    onFuelTypeChange(type);
  };

  const colorClasses = {
    blue: {
      pill: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      pillActive: "bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2",
      badge: "bg-blue-50 text-blue-600",
    },
    slate: {
      pill: "bg-slate-100 text-slate-700 hover:bg-slate-200",
      pillActive: "bg-slate-700 text-white ring-2 ring-slate-700 ring-offset-2",
      badge: "bg-slate-100 text-slate-600",
    },
    emerald: {
      pill: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      pillActive: "bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-2",
      badge: "bg-emerald-50 text-emerald-600",
    },
  };

  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-slate-600">{label}</Label>

      {/* Smart Pills */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const isSelected = selectedPreset?.id === preset.id && !isCustom;
          return (
            <Tooltip key={preset.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handlePresetSelect(preset)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
                    isSelected ? colors.pillActive : colors.pill
                  )}
                >
                  {isSelected && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                  <span>{preset.name}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                      isSelected ? "bg-white/20 text-white" : colors.badge
                    )}
                  >
                    {preset.consumption}L
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="rounded-xl border-0 bg-slate-900 text-white"
              >
                <div className="space-y-1 p-1">
                  <p className="font-semibold">{preset.name}</p>
                  <p className="text-xs text-slate-300">{preset.examples}</p>
                  <p className="text-xs">
                    Fuel: <span className="font-medium">{preset.consumptionRange}/100km</span>
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Custom Pill */}
        <button
          onClick={handleCustomSelect}
          className={cn(
            "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
            isCustom ? colors.pillActive : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          )}
        >
          {isCustom && <Check className="h-3.5 w-3.5" />}
          <Pencil className="h-3.5 w-3.5" />
          <span>Custom</span>
        </button>
      </div>

      {/* Fuel Type Selector - Always visible when showFuelTypeSelector is true */}
      {showFuelTypeSelector && onFuelTypeChange && (
        <div className="space-y-2 rounded-2xl bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Fuel className="h-3.5 w-3.5" />
            <span>Fuel Type:</span>
          </div>

          <div className="flex gap-2">
            {/* Petrol Button */}
            {isPetrolAllowed ? (
              <button
                onClick={() => handleFuelTypeChange("petrol")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all",
                  fuelType === "petrol"
                    ? "bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-1"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                )}
              >
                <span className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  fuelType === "petrol" ? "bg-white" : "bg-emerald-500"
                )} />
                <span>Petrol</span>
                <span className="text-xs opacity-75">${petrolPrice}</span>
              </button>
            ) : (
              <div className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Petrol</span>
                <span className="text-xs opacity-50">(${petrolPrice})</span>
              </div>
            )}

            {/* Diesel Button */}
            {isDieselAllowed ? (
              <button
                onClick={() => handleFuelTypeChange("diesel")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all",
                  fuelType === "diesel"
                    ? "bg-amber-600 text-white ring-2 ring-amber-600 ring-offset-1"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                )}
              >
                <span className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  fuelType === "diesel" ? "bg-white" : "bg-amber-500"
                )} />
                <span>Diesel</span>
                <span className="text-xs opacity-75">${dieselPrice}+RUC</span>
              </button>
            ) : (
              <div className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Diesel</span>
                <span className="text-xs opacity-50">(RUC)</span>
              </div>
            )}
          </div>
          
          {fuelType === "diesel" && (
            <p className="text-xs text-amber-600">
              Diesel vehicles pay Road User Charges (RUC)
            </p>
          )}
        </div>
      )}

      {/* Custom Input - Only show when in custom mode */}
      {(showCustomInput || isCustom) && (
        <div className="space-y-2 rounded-2xl bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-500">
            Enter fuel consumption:
          </p>
          <div className="relative">
            <Input
              ref={inputRef}
              type="number"
              value={value}
              onChange={(e) => {
                onChange(Number(e.target.value));
                setIsCustom(true);
              }}
              className="h-11 rounded-full border-slate-200 pr-20 text-center text-lg font-semibold"
              min={3}
              max={25}
              step={0.5}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              L/100km
            </span>
          </div>
        </div>
      )}

      {/* Selected Preset Info - Show when preset selected and NOT in custom mode */}
      {selectedPreset && !isCustom && (
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <div>
            <p className="text-xs text-slate-500">{selectedPreset.examples}</p>
            <p className="text-sm font-medium text-slate-700">
              Est. {selectedPreset.consumptionRange}/100km
            </p>
          </div>
          <div className={cn("rounded-full px-3 py-1.5 text-lg font-bold", colors.badge)}>
            {value} L
          </div>
        </div>
      )}
    </div>
  );
};
