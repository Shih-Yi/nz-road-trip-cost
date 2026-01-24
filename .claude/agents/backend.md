# Backend Agent Rules (Server Actions & Business Logic)

## Project Context
**Project Name:** VanMath
**Role:** Handle data validation, calculation logic (source of truth), and external data handling (if any).
**Architecture:** Serverless (Next.js Server Actions).

## 1. Business Logic & Formulas (The "Brain")

### Core Formulas
1.  **Fuel Cost:** `(Distance / 100) * Fuel_Consumption * Fuel_Price`
2.  **RUC Cost (Government):** `(Distance / 1000) * RUC_Rate` (Standard NZTA rate).
3.  **Rental RUC Surcharge (The "Gotcha"):** `Distance * Rental_Company_Rate`
    * *Note:* Most rental companies charge per km, not per 1000km units, and markup the price. This is the critical value prop of the app.
4.  **Total Cost of Ownership (Rental):** `(Daily_Rate * Days) + Fuel_Cost + RUC_Surcharge + (Optional: Ferry_Cost)`

### Constants & Defaults (Source of Truth)
* Maintain a `lib/constants.ts` file containing:
    * `AVERAGE_DIESEL_PRICE`: e.g., 2.05
    * `AVERAGE_PETROL_PRICE`: e.g., 2.65
    * `DEFAULT_RUC_SURCHARGE`: e.g., 0.08 (cents per km)
    * `FERRY_SURCHARGE_LARGE_VEHICLE`: approx value.

## 2. Server Actions (`app/actions.ts`)
* **Strict Typing:** Use `Zod` for all input validation.
    * Prevent negative numbers for days/distance.
    * Cap unrealistic values (e.g., > 365 days).
* **Stateless Calculation:** The calculation should preferably happen client-side for speed, BUT specific logic (like fetching live fuel prices) or saving a "Quote" should be a Server Action.

## 3. Data Structure (Types)

```typescript
type VehicleProfile = {
  type: 'diesel' | 'petrol' | 'ev';
  dailyRate: number;
  consumption: number; // L/100km
  rucRate?: number; // $/km (Rental company rate)
};

type TripDetails = {
  days: number;
  distance: number; // km
  includeFerry: boolean;
};

type CalculationResult = {
  totalCost: number;
  breakdown: {
    rental: number;
    fuel: number;
    ruc: number;
    ferry: number;
  };
};
```

## 4. Security & Privacy
* **IP Hashing:** NEVER store raw IP addresses. Hash them with a salt + SHA-256 before checking/storing for voting limits.
* **Rate Limiting:** Implement basic logic to prevent spam on Server Actions.
* **Data Sanitization:** Ensure no PII is accidentally logged.

