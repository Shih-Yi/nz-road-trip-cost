# Frontend Agent Rules (UI/UX & Client Logic)

## Project Context
**Project Name:** VanMath (NZ Campervan Rental True Cost Calculator)
**Goal:** A high-conversion, mobile-first calculator comparing Diesel vs. Petrol campervan rental costs, highlighting hidden RUC fees.
**Target Audience:** International tourists, backpackers, families planning NZ road trips.

## 1. Design System & Aesthetics (The "Wanderlust" Theme)
**Core Philosophy:** "The holiday begins now." Warm, exciting, and trustworthy. Avoid cold financial vibes.

### Color Palette (Tailwind Config)
* **Page Background:** `bg-rose-50` (Hex: #FFF5F7) - A very pale, warm pink/lavender.
* **Card Surface:** `bg-white` with `shadow-sm` or `shadow-rose-100`.
* **Primary Action (CTA):** `bg-orange-500` hover: `bg-orange-600` (Hex: #F97316). Use for "Calculate" and Affiliate links.
* **Brand Highlight:** `text-blue-600` (Hex: #2563EB). Use for key headings (e.g., "VanMath") and trust badges.
* **Text:**
    * Headings: `text-slate-900` (Plus Jakarta Sans or Poppins).
    * Body: `text-slate-600`.
    * Winner (Savings): `text-emerald-600` or Gradient Blue.

### Component Styling (shadcn/ui overrides)
* **Radius:** maximize roundness. Use `rounded-2xl` for cards, `rounded-full` for buttons and inputs.
* **Inputs:** Large touch targets (min 44px height). Light gray borders (`border-slate-200`) with `focus:ring-orange-500`.
* **Typography:** Use a geometric sans-serif font (e.g., `Plus Jakarta Sans`, `Poppins`, or `Inter` with tight tracking for headings).

## 2. Tech Stack & Libraries
* **Framework:** Next.js 14+ (App Router).
* **Styling:** Tailwind CSS + `shadcn/ui` (Radix UI).
* **State Management:** React `useState` (for simple calculator) or `Zustand` (if global settings needed).
* **Visualization:** `Recharts` (ResponsiveContainer, BarChart).
* **Icons:** `lucide-react` (Use colorful backgrounds for icons, e.g., a fuel pump icon inside a `bg-blue-100` circle).

## 3. Key Components & Layout Strategy

### A. Hero Section
* **Layout:** Centered title + brief value prop ("Don't get stung by RUC fees").
* **Visual:** Clean typography with the "Wanderlust" color scheme. No heavy hero images that block the calculator on mobile.

### B. The Calculator (The Core)
* **Container:** A central white card (`bg-white`, `rounded-3xl`, `shadow-xl`) floating on the pink background.
* **Input Groups:**
    * **Trip Details:** Slider for Days, Slider for Distance (Key metric!).
    * **Vehicle A (Diesel) vs Vehicle B (Petrol):** Two columns on desktop, stacked on mobile.
    * **"The Trap" Input:** A specific toggle or dropdown for "Diesel Tax Recovery Fee" (Pre-filled with common rates like $0.08/km).

### C. Results Dashboard (The "Verdict")
* **Visual Hierarchy:**
    * **Winner Banner:** Clearly state "Diesel Wins!" or "Petrol Wins!" at the top.
    * **The "Why":** "You save $150 because..." (Explain the math simply).
    * **Chart:** Simple stacked bar chart showing [Rental Price] + [Fuel] + [RUC].
    * **Affiliate CTA:** Large Orange Button: "Check availability for [Winning Vehicle]".

## 4. UX/Interaction Rules
* **Mobile First:** All sliders and inputs must be easily thumb-accessible.
* **Real-time Reactivity:** The chart and results update *immediately* as sliders move. No "Submit" button required for initial calculation.
* **Input Masking:** Currency inputs should auto-format (e.g., "$ 2,000").
* **Smart Defaults:**
    * Fuel Price: Fetch from constant/config (don't force user to guess).
    * MPG/L per 100km: Pre-fill with realistic averages (e.g., 12L for Diesel Hi-Top).

## 5. SEO & Performance
* **Lighthouse:** Target 100 on Performance and Accessibility.
* **Schema:** Include `SoftwareApplication` or `FAQPage` schema.
* **Metadata:** Dynamic titles based on search intent (e.g., "Diesel vs Petrol Calculator NZ").