import { track } from '@vercel/analytics/react';

/**
 * Analytics Event Types
 *
 * Funnel Events (conversion tracking):
 * - calculator_started: User begins interacting with calculator
 * - calculator_completed: First calculation result generated
 * - results_viewed: User scrolls to see results
 * - cta_clicked: User clicks primary CTA
 *
 * Behavior Events (UX optimization):
 * - input_changed: Any input value changed
 * - vehicle_selected: Vehicle preset selected
 * - fuel_type_changed: Fuel type toggled
 * - accommodation_toggled: Accommodation option changed
 *
 * Business Events (monetization):
 * - winner_revealed: Shows which vehicle type won
 * - affiliate_click: Clicks on affiliate/booking links
 * - high_value_user: User with high trip value (long duration + distance)
 *
 * Engagement Events:
 * - scroll_depth: Page scroll percentage
 * - time_on_calculator: Time spent using calculator
 * - open_feedback: Feedback button clicked
 */
type EventName =
  // Funnel events
  | 'calculator_started'
  | 'calculator_completed'
  | 'results_viewed'
  | 'cta_clicked'
  // Behavior events
  | 'input_changed'
  | 'vehicle_selected'
  | 'fuel_type_changed'
  | 'accommodation_toggled'
  // Business events
  | 'winner_revealed'
  | 'affiliate_click'
  | 'high_value_user'
  // Engagement events
  | 'scroll_depth'
  | 'time_on_calculator'
  | 'open_feedback'
  // Legacy (keep for compatibility)
  | 'calculate_adjustment'
  | 'select_vehicle_preset'
  | 'click_affiliate'
  | 'view_results';

interface EventProperties {
  // Common properties
  category?: string;
  label?: string;
  value?: number;
  // Input tracking
  input_name?: string;
  input_value?: number | string;
  // Vehicle tracking
  vehicle_type?: 'diesel' | 'petrol' | 'car';
  vehicle_preset?: string;
  fuel_type?: 'petrol' | 'diesel' | 'hybrid';
  // Trip tracking
  trip_days?: number;
  trip_distance?: number;
  // Results tracking
  winner?: string;
  total_cost?: number;
  savings?: number;
  savings_percent?: number;
  // Engagement
  scroll_percent?: number;
  time_seconds?: number;
  // Monetization
  affiliate_destination?: string;
  estimated_booking_value?: number;
  // Allow additional properties
  [key: string]: string | number | boolean | undefined;
}

export const sendEvent = (name: EventName, properties?: EventProperties) => {
  // 1. Send to Vercel Analytics (Privacy-friendly)
  try {
    track(name, properties);
  } catch (e) {
    // Ignore errors in dev or if blocked
  }

  // 2. Send to Google Tag Manager (via dataLayer)
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: name,
      ...properties
    });
  }

  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${name}`, properties);
  }
};

// ============================================
// Helper Functions for Common Tracking Patterns
// ============================================

// Track state for "once per session" events
const firedEvents = new Set<string>();

/**
 * Send event only once per session (useful for funnel events)
 */
export const sendEventOnce = (name: EventName, properties?: EventProperties) => {
  if (firedEvents.has(name)) return;
  firedEvents.add(name);
  sendEvent(name, properties);
};

/**
 * Track calculator started (first interaction)
 */
export const trackCalculatorStarted = () => {
  sendEventOnce('calculator_started', {
    category: 'funnel',
  });
};

/**
 * Track input changes with debouncing handled by caller
 */
export const trackInputChanged = (
  inputName: string,
  inputValue: number | string,
  tripDays?: number,
  tripDistance?: number
) => {
  sendEvent('input_changed', {
    category: 'behavior',
    input_name: inputName,
    input_value: inputValue,
    trip_days: tripDays,
    trip_distance: tripDistance,
  });
};

/**
 * Track vehicle preset selection
 */
export const trackVehicleSelected = (
  vehicleType: 'diesel' | 'petrol' | 'car',
  presetName: string,
  consumption: number
) => {
  sendEvent('vehicle_selected', {
    category: 'behavior',
    vehicle_type: vehicleType,
    vehicle_preset: presetName,
    value: consumption,
  });
};

/**
 * Track fuel type change (for car rental)
 */
export const trackFuelTypeChanged = (
  fuelType: 'petrol' | 'diesel' | 'hybrid',
  vehiclePreset?: string
) => {
  sendEvent('fuel_type_changed', {
    category: 'behavior',
    fuel_type: fuelType,
    vehicle_preset: vehiclePreset,
  });
};

/**
 * Track accommodation toggle
 */
export const trackAccommodationToggled = (included: boolean, perNight?: number) => {
  sendEvent('accommodation_toggled', {
    category: 'behavior',
    label: included ? 'included' : 'excluded',
    value: perNight,
  });
};

/**
 * Track when winner is revealed (calculation completed)
 * Only fires ONCE per session - captures the first result shown to user
 */
export const trackWinnerRevealed = (
  winner: string,
  totalCost: number,
  savings: number,
  savingsPercent: number,
  tripDays: number,
  tripDistance: number
) => {
  // Only fire once per session
  if (firedEvents.has('winner_revealed')) return;

  sendEventOnce('calculator_completed', { category: 'funnel' });

  sendEventOnce('winner_revealed', {
    category: 'business',
    winner,
    total_cost: totalCost,
    savings,
    savings_percent: savingsPercent,
    trip_days: tripDays,
    trip_distance: tripDistance,
  });

  // Track high-value users (14+ days AND 2000+ km)
  if (tripDays >= 14 && tripDistance >= 2000) {
    sendEventOnce('high_value_user', {
      category: 'business',
      trip_days: tripDays,
      trip_distance: tripDistance,
      estimated_booking_value: totalCost,
    });
  }
};

/**
 * Track CTA / affiliate clicks
 */
export const trackCTAClicked = (
  destination: string,
  winner: string,
  estimatedValue?: number
) => {
  sendEvent('cta_clicked', {
    category: 'funnel',
    affiliate_destination: destination,
    winner,
  });

  sendEvent('affiliate_click', {
    category: 'business',
    affiliate_destination: destination,
    winner,
    estimated_booking_value: estimatedValue,
  });
};

/**
 * Track results section viewed
 */
export const trackResultsViewed = () => {
  sendEventOnce('results_viewed', {
    category: 'funnel',
  });
};

/**
 * Track scroll depth (call at 25%, 50%, 75%, 100%)
 */
export const trackScrollDepth = (percent: number) => {
  const milestone = Math.floor(percent / 25) * 25;
  const key = `scroll_depth_${milestone}`;

  if (firedEvents.has(key)) return;
  firedEvents.add(key);

  sendEvent('scroll_depth', {
    category: 'engagement',
    scroll_percent: milestone,
  });
};

/**
 * Track time spent on calculator
 */
export const trackTimeOnCalculator = (seconds: number) => {
  // Track at 30s, 60s, 120s, 300s milestones
  const milestones = [30, 60, 120, 300];
  for (const milestone of milestones) {
    if (seconds >= milestone) {
      const key = `time_${milestone}s`;
      if (!firedEvents.has(key)) {
        firedEvents.add(key);
        sendEvent('time_on_calculator', {
          category: 'engagement',
          time_seconds: milestone,
        });
      }
    }
  }
};

/**
 * Reset session tracking (for testing)
 */
export const resetAnalyticsSession = () => {
  firedEvents.clear();
};
