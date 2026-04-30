import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, MousePointer2, AlertCircle, ArrowRightLeft, Palette, Sparkles } from "lucide-react";
import { useCanvas } from "@/contexts/CanvasContext";

export function InteractiveCanvas() {
  const [viewMode, setViewMode] = useState<"messy" | "structured">("messy");
  const { activeIntent, setActiveIntent } = useCanvas();

  const intents = [
    "Create onboarding for a fintech app",
    "Map the checkout flow for a restaurant marketplace",
    "Design a mobile AI assistant for launch decisions",
    "Architecture for a collaborative whiteboard tool"
  ];

  const handleIntentClick = (intent: string) => {
    setActiveIntent(intent);
    setViewMode("messy");
  };

  return (
    <section id="canvas" className="min-h-[100dvh] w-full relative bg-dot-grid border-b border-border flex flex-col overflow-hidden pt-14">
      
      {/* Top Toolbar */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 bg-background/80 backdrop-blur-md border border-border rounded-lg shadow-sm">
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
      <div className="absolute left-6 top-20 z-20 w-80">
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
  gap: { text: string; mx: number; my: number; sx: number; sy: number };
  component: string;
  connections: { from: number; to: number }[];
}> = {
  "Create onboarding for a fintech app": {
    notes: [
      { text: "Trust is earned, not assumed", rotate: -3, mx: 310, my: 220, sx: 820, sy: 150 },
      { text: "What happens if KYC fails?", rotate: 4, mx: 520, my: 480, sx: 820, sy: 250 },
      { text: "Skip for now?", rotate: -2, mx: 180, my: 390, sx: 820, sy: 350 },
      { text: "Bio-metric fallback?", rotate: 2, mx: 780, my: 200, sx: 820, sy: 450 },
      { text: "Progress bar must be linear", rotate: -1, mx: 150, my: 180, sx: 820, sy: 550 },
    ],
    frames: [
      { label: "Welcome / Value Prop", mx: 180, my: 140, sx: 310, sy: 120 },
      { label: "Identity Verification", mx: 460, my: 180, sx: 310, sy: 340 },
      { label: "Bank Connection", mx: 700, my: 340, sx: 310, sy: 560 },
      { label: "Success / First Deposit", mx: 920, my: 460, sx: 310, sy: 780 },
    ],
    aiSuggestion: "Consider adding a trust explanation before requesting SSN",
    gap: { 
      text: "Empty state for failed identity verification",
      mx: 650, my: 180, sx: 610, sy: 460 
    },
    component: "Progress Indicator",
    connections: [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }],
  },
  "Map the checkout flow for a restaurant marketplace": {
    notes: [
      { text: "What if the restaurant closes mid-order?", rotate: -2, mx: 280, my: 250, sx: 820, sy: 150 },
      { text: "Tip prompt feels too early", rotate: 3, mx: 550, my: 470, sx: 820, sy: 250 },
      { text: "Guest checkout needed", rotate: -4, mx: 170, my: 400, sx: 820, sy: 350 },
      { text: "Apple Pay as default", rotate: 1, mx: 800, my: 220, sx: 820, sy: 450 },
      { text: "Promo code placement?", rotate: -3, mx: 400, my: 600, sx: 820, sy: 550 },
    ],
    frames: [
      { label: "Cart Review", mx: 420, my: 180, sx: 310, sy: 220 },
      { label: "Delivery Options", mx: 180, my: 320, sx: 310, sy: 440 },
      { label: "Payment Entry", mx: 680, my: 320, sx: 310, sy: 660 },
      { label: "Order Tracking", mx: 940, my: 140, sx: 310, sy: 880 },
    ],
    aiSuggestion: "Add an estimated delivery time before payment to reduce abandonment",
    gap: { 
      text: "Recovery path after failed payment authorization",
      mx: 650, my: 180, sx: 610, sy: 460 
    },
    component: "Order Summary Card",
    connections: [{ from: 1, to: 0 }, { from: 0, to: 2 }, { from: 2, to: 3 }],
  },
  "Design a mobile AI assistant for launch decisions": {
    notes: [
      { text: "When should the AI stay quiet?", rotate: -3, mx: 300, my: 230, sx: 820, sy: 150 },
      { text: "Confidence levels matter", rotate: 2, mx: 530, my: 460, sx: 820, sy: 250 },
      { text: "Undo needs to feel safe", rotate: -2, mx: 160, my: 380, sx: 820, sy: 350 },
      { text: "LLM latency indicator", rotate: 3, mx: 750, my: 210, sx: 820, sy: 450 },
      { text: "Voice vs Text input", rotate: -1, mx: 380, my: 580, sx: 820, sy: 550 },
    ],
    frames: [
      { label: "Onboarding Chat", mx: 180, my: 150, sx: 310, sy: 220 },
      { label: "Decision Context", mx: 440, my: 180, sx: 310, sy: 440 },
      { label: "AI Recommendation", mx: 710, my: 340, sx: 310, sy: 660 },
      { label: "Launch Plan Dashboard", mx: 950, my: 480, sx: 310, sy: 880 },
    ],
    aiSuggestion: "Show confidence score alongside each recommendation to build trust",
    gap: { 
      text: "Fallback state when AI cannot generate a recommendation",
      mx: 650, my: 180, sx: 610, sy: 460 
    },
    component: "Confidence Badge",
    connections: [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }],
  },
  "Architecture for a collaborative whiteboard tool": {
    notes: [
      { text: "Conflict resolution: CRDTs vs OT?", rotate: -2, mx: 320, my: 240, sx: 820, sy: 150 },
      { text: "Permission inheritance", rotate: 4, mx: 550, my: 480, sx: 820, sy: 250 },
      { text: "Real-time cursors need to be smooth", rotate: -3, mx: 180, my: 420, sx: 820, sy: 350 },
      { text: "Asset storage limits", rotate: 2, mx: 780, my: 230, sx: 820, sy: 450 },
      { text: "Offline mode syncing", rotate: -1, mx: 420, my: 620, sx: 820, sy: 550 },
    ],
    frames: [
      { label: "Canvas Engine", mx: 460, my: 200, sx: 310, sy: 220 },
      { label: "State Synchronization", mx: 180, my: 200, sx: 310, sy: 440 },
      { label: "User Collaboration", mx: 720, my: 360, sx: 310, sy: 660 },
      { label: "Export / Persistence", mx: 960, my: 200, sx: 310, sy: 880 },
    ],
    aiSuggestion: "Implement a snapshot system to allow quick rollbacks in case of sync conflicts",
    gap: { 
      text: "Resolution strategy for concurrent object deletions",
      mx: 650, my: 180, sx: 610, sy: 460 
    },
    component: "Sync Status Toast",
    connections: [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }],
  },
};

function CanvasObjects({ mode, intent }: { mode: "messy" | "structured"; intent: string }) {
  const isStructured = mode === "structured";
  const data = INTENT_DATA[intent] ?? INTENT_DATA["Create onboarding for a fintech app"];
  const spring = { type: "spring" as const, stiffness: 180, damping: 24 };

  return (
    <div className="relative w-full h-full">
      
      {/* Dynamic Grid Context Labels */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-1/2 left-20 -translate-y-1/2 text-[120px] font-bold text-foreground/[0.02] uppercase leading-none">
          Intelligence Layer
        </div>
        <div className="absolute top-20 right-20 text-[60px] font-bold text-foreground/[0.015] uppercase vertical-text">
          Flow Mapping
        </div>
      </div>

      {/* Region Labels — structured only */}
      <AnimatePresence>
        {isStructured && (
          <>
            {[
              { label: "Core Screens", x: 310, y: 140 },
              { label: "AI Synthesis & Logic Gaps", x: 610, y: 140 },
              { label: "Notes & Prototype Hooks", x: 820, y: 100 },
            ].map(({ label, x, y }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]"
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
          className="absolute w-44 p-4 bg-[#FEFCE8] border border-[#FEF08A]/60 shadow-sm group hover:shadow-md transition-shadow"
        >
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white/40 border border-amber-200 rotate-45" />
          <p className="font-mono text-sm text-amber-900/70 leading-snug">{note.text}</p>
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
          className="absolute w-56 bg-background border border-border/80 rounded-lg shadow-sm overflow-hidden group hover:border-primary/30 transition-colors"
        >
          <div className="px-3 py-2 border-b border-border/50 bg-muted/20 flex items-center justify-between">
            <p className="text-[10px] font-mono text-muted-foreground font-semibold uppercase tracking-wider">{frame.label}</p>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            </div>
          </div>
          <div className="p-4 space-y-2.5">
            <div className="w-12 h-12 rounded-full bg-muted/30 mx-auto mb-3" />
            <div className="w-full h-1.5 bg-muted/40 rounded-full" />
            <div className="w-3/4 h-1.5 bg-muted/40 rounded-full mx-auto" />
            <div className="w-full h-8 bg-muted/10 border border-border/50 rounded-md mt-3" />
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
                <path d="M 0 0 L 10 3.5 L 0 7 z" fill="hsl(var(--primary))" opacity="0.3" />
              </marker>
            </defs>
            {data.connections.map((conn, i) => {
              const fromFrame = data.frames[conn.from];
              const toFrame = data.frames[conn.to];
              if (!fromFrame || !toFrame) return null;
              
              const x1 = 310 + 224/2; // Center of frame width (56 * 4 approx)
              const y1 = fromFrame.sy + 100; // Offset from top
              const y2 = toFrame.sy;
              
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} L ${x1} ${y2}`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  strokeOpacity="0.15"
                  fill="none"
                  markerEnd="url(#arrow)"
                />
              );
            })}
            {/* AI Insight Connector */}
            <path
              d={`M ${310 + 224} ${data.frames[1].sy + 50} C ${310+224+50} ${data.frames[1].sy+50}, 610 ${300-20}, 610 ${300}`}
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeOpacity="0.15"
              strokeDasharray="4 4"
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
          y: isStructured ? 300 : 380,
        }}
        transition={{ ...spring, delay: 0.18 }}
        className="absolute w-64 p-3 bg-primary/5 border border-primary/20 rounded-lg shadow-sm flex flex-col gap-2"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Suggestion</span>
        </div>
        <p className="text-xs text-foreground/80 font-medium leading-snug">{data.aiSuggestion}</p>
      </motion.div>

      {/* Edge Case Gap — Refined to look like a "Ghost Object" */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isStructured ? data.gap.sx : data.gap.mx,
          y: isStructured ? data.gap.sy : data.gap.my,
        }}
        transition={{ ...spring, delay: 0.22 }}
        className="absolute w-56 p-0 bg-transparent border-2 border-dashed border-primary/20 rounded-lg group transition-all hover:border-primary/40"
      >
        <div className="px-3 py-1.5 border-b border-dashed border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3 text-primary/60" />
            <span className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">Structural Gap</span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="w-full h-24 bg-primary/5 rounded-md border border-primary/10 flex items-center justify-center">
             <div className="text-[10px] font-mono text-primary/40 uppercase font-bold">Suggested Screen</div>
          </div>
          <p className="text-[11px] text-foreground/70 font-medium leading-tight">
            {data.gap.text}
          </p>
          <button className="w-full py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold rounded uppercase tracking-wider transition-colors">
            Auto-Generate
          </button>
        </div>
      </motion.div>

      {/* Component Card */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isStructured ? 820 : 420,
          y: isStructured ? 430 : 580,
        }}
        transition={{ ...spring, delay: 0.26 }}
        className="absolute w-44 bg-background border border-border/80 rounded-lg shadow-sm overflow-hidden"
      >
        <div className="px-3 py-2 border-b border-border/50 bg-emerald-50/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             <p className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-tight">{data.component}</p>
          </div>
        </div>
        <div className="p-3">
          <div className="w-full h-8 bg-primary rounded flex items-center justify-center shadow-inner">
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Continue</span>
          </div>
          <div className="mt-2 flex gap-1 justify-center">
             <div className="w-1 h-1 rounded-full bg-muted" />
             <div className="w-1 h-1 rounded-full bg-muted" />
             <div className="w-1 h-1 rounded-full bg-muted" />
          </div>
        </div>
      </motion.div>

    </div>
  );
}

