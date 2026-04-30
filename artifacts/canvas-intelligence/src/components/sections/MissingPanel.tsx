import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, AlertTriangle, Info, Eye, CheckCircle2, X } from "lucide-react";
import { useCanvas } from "@/contexts/CanvasContext";

const ALL_GAPS = [
  {
    id: "g1",
    type: "critical" as const,
    text: "No empty state defined for failed identity verification.",
    intent: "Create onboarding for a fintech app",
    icon: AlertCircle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    barColor: "bg-rose-400",
  },
  {
    id: "g2",
    type: "critical" as const,
    text: "The user has no recovery path after payment failure.",
    intent: "Map the checkout flow for a restaurant marketplace",
    icon: AlertCircle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    barColor: "bg-rose-400",
  },
  {
    id: "g3",
    type: "warning" as const,
    text: "The flow jumps from account creation to funding without explaining trust.",
    intent: "Create onboarding for a fintech app",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    barColor: "bg-amber-400",
  },
  {
    id: "g4",
    type: "warning" as const,
    text: "Two button patterns appear to solve the same action.",
    intent: "Design a mobile AI assistant for launch decisions",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    barColor: "bg-amber-400",
  },
  {
    id: "g5",
    type: "info" as const,
    text: "Notification permissions are introduced too early in the flow.",
    intent: "Map the checkout flow for a restaurant marketplace",
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    barColor: "bg-blue-400",
  },
];

export function MissingPanel() {
  const { openCanvas } = useCanvas();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const visible = ALL_GAPS.filter((g) => !dismissed.has(g.id));
  const remaining = visible.filter((g) => !accepted.has(g.id));
  const resolvedCount = dismissed.size + accepted.size;

  return (
    <section id="missing" className="min-h-screen w-full bg-background flex border-b border-border">

      {/* Left: canvas preview */}
      <div className="hidden lg:flex flex-1 border-r border-border bg-dot-grid relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60" />

        <div className="relative w-full max-w-sm aspect-square opacity-70">
          <div className="absolute top-[20%] left-[18%] w-36 h-44 bg-white border border-indigo-200 rounded-lg shadow-sm" />
          <div className="absolute top-[25%] right-[15%] w-36 h-44 bg-white border-2 border-rose-400 rounded-lg shadow-sm ring-4 ring-rose-500/20" />

          {/* pulsing highlight on the gap frame */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="absolute top-[25%] right-[15%] w-36 h-44 bg-rose-400/20 rounded-lg pointer-events-none"
          />

          <svg className="absolute inset-0 w-full h-full stroke-indigo-200" fill="none">
            <path d="M 170 170 L 240 190" strokeWidth="2" strokeDasharray="5 4" />
          </svg>

          {/* floating label */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-[20%] right-[12%] translate-x-full -translate-y-2 bg-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm whitespace-nowrap"
          >
            Gap detected
          </motion.div>
        </div>
      </div>

      {/* Right: critique panel */}
      <div className="flex-1 max-w-2xl flex flex-col h-screen">
        <div className="p-8 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-medium tracking-tight mb-2">Gap Analysis</h2>
              <p className="text-muted-foreground text-sm">
                {remaining.length > 0
                  ? `${remaining.length} issue${remaining.length !== 1 ? "s" : ""} require attention`
                  : "All gaps resolved — canvas is structurally sound"}
              </p>
            </div>
            {resolvedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {resolvedCount} resolved
              </motion.div>
            )}
          </div>

          {/* progress bar */}
          <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-400 rounded-full"
              animate={{ width: `${(resolvedCount / ALL_GAPS.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          <AnimatePresence initial={false}>
            {visible.map((gap, i) => {
              const isAccepted = accepted.has(gap.id);
              return (
                <motion.div
                  key={gap.id}
                  layout
                  initial={{ opacity: 0, y: 10, height: "auto" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`rounded-xl border ${gap.border} bg-background shadow-sm flex flex-col relative overflow-hidden transition-colors ${isAccepted ? "opacity-60" : ""}`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${gap.barColor}`} />

                  <div className="p-4 flex items-start gap-3 ml-2">
                    <gap.icon className={`w-5 h-5 ${gap.color} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1">
                      <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${gap.color}`}>
                        {gap.type}
                      </span>
                      <p className={`text-sm font-medium text-foreground leading-snug mt-0.5 ${isAccepted ? "line-through text-muted-foreground" : ""}`}>
                        {gap.text}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between ml-12 mr-4 mb-4 pt-3 border-t border-border/50">
                    <button
                      onClick={() => openCanvas(gap.intent)}
                      className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View in canvas
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDismissed((s) => new Set([...s, gap.id]))}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Dismiss
                      </button>
                      <button
                        onClick={() =>
                          isAccepted
                            ? setAccepted((s) => { const n = new Set(s); n.delete(gap.id); return n; })
                            : setAccepted((s) => new Set([...s, gap.id]))
                        }
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                          isAccepted
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                      >
                        {isAccepted ? (
                          <><CheckCircle2 className="w-3 h-3" /> Accepted</>
                        ) : (
                          "Accept fix"
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {visible.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-4 py-20 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <p className="text-lg font-medium">All gaps resolved</p>
              <p className="text-sm text-muted-foreground">The flow is structurally complete.</p>
              <button
                onClick={() => { setDismissed(new Set()); setAccepted(new Set()); }}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors mt-2"
              >
                Reset
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
