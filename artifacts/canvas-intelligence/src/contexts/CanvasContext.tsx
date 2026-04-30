import { createContext, useContext, useState, useCallback } from "react";

const INTENTS = [
  "Create onboarding for a fintech app",
  "Map the checkout flow for a restaurant marketplace",
  "Design a mobile AI assistant for launch decisions",
];

export function resolveIntent(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("restaurant") || lower.includes("checkout") || lower.includes("marketplace")) {
    return INTENTS[1];
  }
  if (lower.includes("ai") || lower.includes("assistant") || lower.includes("launch") || lower.includes("mobile")) {
    return INTENTS[2];
  }
  return INTENTS[0];
}

interface CanvasContextValue {
  activeIntent: string;
  setActiveIntent: (intent: string) => void;
  openCanvas: (intent: string) => void;
}

const CanvasContext = createContext<CanvasContextValue | null>(null);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const [activeIntent, setActiveIntent] = useState(INTENTS[0]);

  const openCanvas = useCallback((raw: string) => {
    const intent = resolveIntent(raw);
    setActiveIntent(intent);
    requestAnimationFrame(() => {
      const el = document.getElementById("canvas");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <CanvasContext.Provider value={{ activeIntent, setActiveIntent, openCanvas }}>
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("useCanvas must be used within CanvasProvider");
  return ctx;
}
