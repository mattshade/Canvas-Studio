import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, MousePointer2, ListFilter, AlertCircle, ArrowRightLeft, Palette, Sparkles, MessageSquare } from "lucide-react";

export function InteractiveCanvas() {
  const [viewMode, setViewMode] = useState<"messy" | "structured">("messy");
  const [activeIntent, setActiveIntent] = useState<string>("Create onboarding for a fintech app");

  const intents = [
    "Create onboarding for a fintech app",
    "Map the checkout flow for a restaurant marketplace",
    "Design a mobile AI assistant for launch decisions"
  ];

  const handleIntentClick = (intent: string) => {
    setActiveIntent(intent);
    setViewMode("messy");
  };

  return (
    <section id="canvas" className="min-h-[100dvh] w-full relative bg-dot-grid border-b border-border flex flex-col overflow-hidden">
      
      {/* Top Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 bg-background/80 backdrop-blur-md border border-border rounded-lg shadow-sm">
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Add Idea">
          <PenTool className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-md bg-muted text-foreground transition-colors" title="Select">
          <MousePointer2 className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-border mx-1" />
        
        <div className="flex items-center p-1 bg-muted/50 rounded-md">
          <button 
            onClick={() => setViewMode("messy")}
            className={`px-3 py-1.5 text-xs font-medium rounded ${viewMode === "messy" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Messy
          </button>
          <button 
            onClick={() => setViewMode("structured")}
            className={`px-3 py-1.5 text-xs font-medium rounded ${viewMode === "structured" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Structured
          </button>
        </div>
        
        <div className="w-[1px] h-4 bg-border mx-1" />
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Highlight Gaps">
          <AlertCircle className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Show Flow Connections">
          <ArrowRightLeft className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Show Design System Opportunities">
          <Palette className="w-4 h-4" />
        </button>
      </div>

      {/* Intent Panel */}
      <div className="absolute left-6 top-6 z-20 w-80">
        <div className="bg-background/80 backdrop-blur-md border border-border rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Describe your design intent...
          </h3>
          <div className="flex flex-col gap-2">
            {intents.map((intent, i) => (
              <button
                key={i}
                onClick={() => handleIntentClick(intent)}
                className={`text-left text-xs p-2.5 rounded-lg border transition-all ${
                  activeIntent === intent 
                    ? "bg-primary/5 border-primary/20 text-primary font-medium" 
                    : "bg-muted/30 border-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {intent}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIntent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <CanvasObjects mode={viewMode} intent={activeIntent} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

const INTENT_DATA: Record<string, {
  notes: { text: string; rotate: number; mx: number; my: number; sx: number; sy: number }[];
  frames: { label: string; mx: number; my: number; sx: number; sy: number }[];
  aiSuggestion: string;
  warning: string;
  component: string;
}> = {
  "Create onboarding for a fintech app": {
    notes: [
      { text: "Trust is earned, not assumed", rotate: -3, mx: 310, my: 200, sx: 820, sy: 150 },
      { text: "What happens if KYC fails?", rotate: 4, mx: 520, my: 460, sx: 820, sy: 260 },
      { text: "Skip for now?", rotate: -2, mx: 180, my: 370, sx: 820, sy: 340 },
    ],
    frames: [
      { label: "Identity Verification", mx: 460, my: 150, sx: 310, sy: 200 },
      { label: "Bank Connection", mx: 700, my: 310, sx: 310, sy: 480 },
    ],
    aiSuggestion: "Consider adding a trust explanation before requesting SSN",
    warning: "Missing: No empty state for failed identity verification",
    component: "Progress Indicator",
  },
  "Map the checkout flow for a restaurant marketplace": {
    notes: [
      { text: "What if the restaurant closes mid-order?", rotate: -2, mx: 280, my: 230, sx: 820, sy: 150 },
      { text: "Tip prompt feels too early", rotate: 3, mx: 550, my: 450, sx: 820, sy: 250 },
      { text: "Guest checkout needed", rotate: -4, mx: 170, my: 380, sx: 820, sy: 340 },
    ],
    frames: [
      { label: "Cart Review", mx: 420, my: 160, sx: 310, sy: 200 },
      { label: "Payment Entry", mx: 680, my: 300, sx: 310, sy: 480 },
    ],
    aiSuggestion: "Add an estimated delivery time before payment to reduce abandonment",
    warning: "Missing: Recovery path after failed payment authorization",
    component: "Order Summary Card",
  },
  "Design a mobile AI assistant for launch decisions": {
    notes: [
      { text: "When should the AI stay quiet?", rotate: -3, mx: 300, my: 210, sx: 820, sy: 150 },
      { text: "Confidence levels matter", rotate: 2, mx: 530, my: 440, sx: 820, sy: 250 },
      { text: "Undo needs to feel safe", rotate: -2, mx: 160, my: 360, sx: 820, sy: 340 },
    ],
    frames: [
      { label: "Decision Context", mx: 440, my: 150, sx: 310, sy: 200 },
      { label: "AI Recommendation", mx: 710, my: 310, sx: 310, sy: 480 },
    ],
    aiSuggestion: "Show confidence score alongside each recommendation to build trust",
    warning: "Missing: Fallback state when AI cannot generate a recommendation",
    component: "Confidence Badge",
  },
};

function CanvasObjects({ mode, intent }: { mode: "messy" | "structured"; intent: string }) {
  const isStructured = mode === "structured";
  const data = INTENT_DATA[intent] ?? INTENT_DATA["Create onboarding for a fintech app"];
  const spring = { type: "spring" as const, stiffness: 180, damping: 24 };

  return (
    <div className="relative w-full h-full">

      {/* Section Labels — structured only */}
      <AnimatePresence>
        {isStructured && (
          <>
            {[
              { label: "Core Screens", x: 310, y: 140 },
              { label: "AI Insights & Gaps", x: 610, y: 140 },
              { label: "Notes & Components", x: 820, y: 100 },
            ].map(({ label, x, y }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest"
                style={{ left: x, top: y }}
              >
                {label}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Sticky Notes */}
      {data.notes.map((note, i) => (
        <motion.div
          key={i}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: isStructured ? note.sx : note.mx,
            y: isStructured ? note.sy : note.my,
            rotate: isStructured ? 0 : note.rotate,
          }}
          transition={{ ...spring, delay: i * 0.05 }}
          className="absolute w-44 p-4 bg-amber-50 border border-amber-200/60 shadow-sm"
        >
          <p className="font-mono text-sm text-amber-900/80 leading-snug">{note.text}</p>
        </motion.div>
      ))}

      {/* Frame Cards */}
      {data.frames.map((frame, i) => (
        <motion.div
          key={frame.label}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: isStructured ? frame.sx : frame.mx,
            y: isStructured ? frame.sy : frame.my,
          }}
          transition={{ ...spring, delay: 0.1 + i * 0.07 }}
          className="absolute w-56 bg-background border border-indigo-200 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-indigo-100 bg-indigo-50/30">
            <p className="text-[10px] font-mono text-indigo-600 font-medium uppercase tracking-wider">{frame.label}</p>
          </div>
          <div className="p-4 space-y-2.5">
            <div className="w-12 h-12 rounded-full bg-muted/40 mx-auto mb-3" />
            <div className="w-full h-2 bg-muted rounded-full" />
            <div className="w-3/4 h-2 bg-muted rounded-full mx-auto" />
            <div className="w-full h-8 bg-indigo-50 border border-indigo-100 rounded mt-3" />
          </div>
        </motion.div>
      ))}

      {/* Flow connectors — structured only */}
      <AnimatePresence>
        {isStructured && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25 }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--muted-foreground))" opacity="0.5" />
              </marker>
            </defs>
            <path
              d="M 422 400 L 422 460"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 422 280 C 422 350, 610 260, 610 280"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              fill="none"
              markerEnd="url(#arrow)"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* AI Suggestion */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isStructured ? 610 : 240,
          y: isStructured ? 300 : 340,
        }}
        transition={{ ...spring, delay: 0.18 }}
        className="absolute w-64 p-3 bg-violet-50 border border-violet-200 rounded-md shadow-sm flex items-start gap-3"
      >
        <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-violet-900 font-medium leading-snug">{data.aiSuggestion}</p>
      </motion.div>

      {/* Missing State Warning */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isStructured ? 610 : 650,
          y: isStructured ? 440 : 180,
        }}
        transition={{ ...spring, delay: 0.22 }}
        className="absolute w-64 p-3 bg-rose-50 border border-rose-200 rounded-md shadow-sm flex items-start gap-3"
      >
        <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-rose-900 font-medium leading-snug">{data.warning}</p>
      </motion.div>

      {/* Component Card */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isStructured ? 820 : 400,
          y: isStructured ? 430 : 580,
        }}
        transition={{ ...spring, delay: 0.26 }}
        className="absolute w-44 bg-background border border-emerald-200 rounded-md shadow-sm overflow-hidden"
      >
        <div className="px-3 py-2 border-b border-emerald-100 bg-emerald-50/30 flex items-center justify-between">
          <p className="text-[10px] font-mono text-emerald-700 font-medium">{data.component}</p>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div className="p-3">
          <div className="w-full h-8 bg-indigo-600 rounded flex items-center justify-center">
            <span className="text-[10px] font-medium text-white">Continue</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
