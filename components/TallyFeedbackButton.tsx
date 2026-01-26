"use client";

import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { sendEvent } from "@/lib/analytics";

interface TallyFeedbackButtonProps {
  formId?: string;
}

export function TallyFeedbackButton({ formId }: TallyFeedbackButtonProps) {
  // Priority: 1. Env Var, 2. Prop, 3. Default Placeholder
  const tallyFormId = process.env.NEXT_PUBLIC_TALLY_FEEDBACK_FORM_ID || formId || "3xXk4r";

  // Load Tally.so script
  useEffect(() => {
    if (typeof window !== "undefined" && !document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleClick = () => {
    if (!tallyFormId) {
      console.warn("Tally form ID not configured.");
      return;
    }

    // Track feedback open
    sendEvent("open_feedback", { category: "Support", label: "Floating Button" });

    if (window.Tally) {
      window.Tally.openPopup(tallyFormId, {
        hideTitle: true,
        overlay: true, // Changed to true for better focus, or keep false if you prefer non-blocking
        width: 376,
        autoClose: 0, // 0 to disable auto-close, or keep 3000
        emoji: {
          text: "👋",
          animation: "wave"
        }
      });
    } else {
      window.open(`https://tally.so/r/${tallyFormId}`, "_blank");
    }
  };

  if (!tallyFormId) return null;

  return (
    <button
      onClick={handleClick}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200/50 transition-all hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl active:scale-95"
      aria-label="Send Feedback"
      type="button"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-white shadow-md opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
        Feedback
      </span>
    </button>
  );
}
