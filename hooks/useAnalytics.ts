"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  trackScrollDepth,
  trackTimeOnCalculator,
  trackResultsViewed,
  trackCalculatorStarted,
} from "@/lib/analytics";

/**
 * Hook to track page engagement (scroll depth + time on page)
 */
export const useEngagementTracking = () => {
  const startTime = useRef<number>(Date.now());
  const timeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Track scroll depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      trackScrollDepth(scrollPercent);
    };

    // Track time on page
    const startTimeTracking = () => {
      timeInterval.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime.current) / 1000);
        trackTimeOnCalculator(seconds);
      }, 5000); // Check every 5 seconds
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    startTimeTracking();

    // Initial scroll check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
      }
    };
  }, []);
};

/**
 * Hook to track when results section becomes visible
 */
export const useResultsVisibilityTracking = (resultsRef: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!resultsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackResultsViewed();
          }
        });
      },
      { threshold: 0.3 } // 30% visible
    );

    observer.observe(resultsRef.current);

    return () => observer.disconnect();
  }, [resultsRef]);
};

/**
 * Hook to track first interaction with calculator
 */
export const useCalculatorStartTracking = () => {
  const hasStarted = useRef(false);

  const markStarted = useCallback(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackCalculatorStarted();
    }
  }, []);

  return markStarted;
};
