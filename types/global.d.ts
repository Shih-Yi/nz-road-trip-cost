// Global type declarations for Window extensions

declare global {
  interface Window {
    // Google Tag Manager dataLayer
    dataLayer: Record<string, unknown>[];
    // Tally.so popup
    Tally?: {
      openPopup: (formId: string, options?: Record<string, unknown>) => void;
    };
  }
}

export {};
