import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, MousePointer2, ListFilter, AlertCircle, ArrowRightLeft, Palette, Sparkles, MessageSquare } from "lucide-react";

export function InteractiveCanvas() {
  const [viewMode, setViewMode] = useState<"messy" | "structured">("messy");
  const [activeIntent, setActiveIntent] = useState<string | null>(null);

  const intents = [
    "Create onboarding for a fintech app",
    "Map the checkout flow for a restaurant marketplace",
    "Design a mobile AI assistant for launch decisions"
  ];

  const handleIntentClick = (intent: string) => {
    setActiveIntent(intent);
    setViewMode("messy"); // Reset to messy when new intent is selected
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
        <AnimatePresence>
          {activeIntent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {/* Render Canvas Objects Based on View Mode */}
              <CanvasObjects mode={viewMode} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!activeIntent && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm font-medium mb-2">Canvas is empty</p>
              <p className="text-xs">Select an intent to generate structure</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CanvasObjects({ mode }: { mode: "messy" | "structured" }) {
  const isStructured = mode === "structured";

  return (
    <div className="relative w-full h-full">
      {/* Sticky Notes */}
      <motion.div
        layout
        initial={false}
        animate={{
          x: isStructured ? 800 : 300,
          y: isStructured ? 150 : 200,
          rotate: isStructured ? 0 : -3,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute w-48 p-4 bg-amber-50 border border-amber-200/60 shadow-sm"
      >
        <p className="font-mono text-sm text-amber-900/80">Trust is earned, not assumed</p>
      </motion.div>

      <motion.div
        layout
        initial={false}
        animate={{
          x: isStructured ? 800 : 500,
          y: isStructured ? 250 : 450,
          rotate: isStructured ? 0 : 4,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute w-48 p-4 bg-amber-50 border border-amber-200/60 shadow-sm"
      >
        <p className="font-mono text-sm text-amber-900/80">What happens if KYC fails?</p>
      </motion.div>

      {/* Frame Cards */}
      <motion.div
        layout
        initial={false}
        animate={{
          x: isStructured ? 300 : 450,
          y: isStructured ? 200 : 150,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute w-56 bg-background border border-indigo-200 rounded-lg shadow-sm overflow-hidden"
      >
        <div className="px-3 py-2 border-b border-indigo-100 bg-indigo-50/30">
          <p className="text-[10px] font-mono text-indigo-600 font-medium uppercase tracking-wider">Identity Verification</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="w-16 h-16 rounded-full bg-muted/50 mx-auto mb-4" />
          <div className="w-full h-2 bg-muted rounded-full" />
          <div className="w-3/4 h-2 bg-muted rounded-full mx-auto" />
          <div className="w-full h-8 bg-indigo-50 border border-indigo-100 rounded mt-4" />
        </div>
      </motion.div>

      <motion.div
        layout
        initial={false}
        animate={{
          x: isStructured ? 300 : 700,
          y: isStructured ? 500 : 300,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute w-56 bg-background border border-indigo-200 rounded-lg shadow-sm overflow-hidden"
      >
        <div className="px-3 py-2 border-b border-indigo-100 bg-indigo-50/30">
          <p className="text-[10px] font-mono text-indigo-600 font-medium uppercase tracking-wider">Bank Connection</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="w-full h-12 border-2 border-dashed border-muted rounded-md mb-4" />
          <div className="w-full h-10 bg-muted/30 rounded" />
          <div className="w-full h-10 bg-muted/30 rounded" />
          <div className="w-full h-8 bg-indigo-50 border border-indigo-100 rounded mt-4" />
        </div>
      </motion.div>

      {/* Connectors (only in structured view) */}
      <AnimatePresence>
        {isStructured && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <path
              d="M 412 400 L 412 450"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>
          </motion.svg>
        )}
      </AnimatePresence>

      {/* AI Suggestion */}
      <motion.div
        layout
        initial={false}
        animate={{
          x: isStructured ? 600 : 250,
          y: isStructured ? 300 : 350,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute w-64 p-3 bg-violet-50 border border-violet-200 rounded-md shadow-sm flex items-start gap-3"
      >
        <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-violet-900 font-medium leading-snug">Consider adding a trust explanation before requesting SSN</p>
      </motion.div>

      {/* Missing State Warning */}
      <motion.div
        layout
        initial={false}
        animate={{
          x: isStructured ? 600 : 650,
          y: isStructured ? 450 : 180,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute w-64 p-3 bg-rose-50 border border-rose-200 rounded-md shadow-sm flex items-start gap-3"
      >
        <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-rose-900 font-medium leading-snug">Missing: No empty state defined for failed KYC</p>
      </motion.div>
      
      {/* Component Card */}
      <motion.div
        layout
        initial={false}
        animate={{
          x: isStructured ? 800 : 400,
          y: isStructured ? 400 : 600,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute w-48 bg-background border border-emerald-200 rounded-md shadow-sm overflow-hidden"
      >
         <div className="px-3 py-2 border-b border-emerald-100 bg-emerald-50/30 flex items-center justify-between">
          <p className="text-[10px] font-mono text-emerald-700 font-medium">Primary Button</p>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div className="p-3">
           <div className="w-full h-8 bg-indigo-600 rounded flex items-center justify-center">
             <span className="text-[10px] font-medium text-white">Continue</span>
           </div>
        </div>
      </motion.div>

      {/* Section Labels (only in structured view) */}
      <AnimatePresence>
        {isStructured && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[300px] top-[100px] text-xs font-medium text-muted-foreground uppercase tracking-widest"
            >
              Core Screens
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[600px] top-[100px] text-xs font-medium text-muted-foreground uppercase tracking-widest"
            >
              AI Insights & Gaps
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[800px] top-[100px] text-xs font-medium text-muted-foreground uppercase tracking-widest"
            >
              Notes & Components
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
