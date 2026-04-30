import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function FlowStitching() {
  const [connected, setConnected] = useState(false);

  return (
    <section id="flow" className="min-h-[110dvh] w-full bg-background border-b border-border py-24 flex flex-col">
      <div className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-medium tracking-tight mb-4">Flow Stitching</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Canvas Intelligence reads your scattered screens and generates a structured user journey — including error branches you haven't designed yet.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 relative w-full max-w-7xl mx-auto overflow-hidden bg-dot-grid border border-border rounded-2xl shadow-sm">
        <div className="absolute inset-0 flex items-center justify-center p-12">

          <div className="w-full max-w-5xl h-[520px] relative">

            {/* SVG connectors */}
            <AnimatePresence>
              {connected && (
                <motion.svg
                  key="connectors"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <defs>
                    <marker id="arr-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="hsl(160 84% 39%)" />
                    </marker>
                    <marker id="arr-rose" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="hsl(0 84% 60%)" />
                    </marker>
                    <marker id="arr-muted" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--muted-foreground))" opacity="0.6" />
                    </marker>
                  </defs>

                  <motion.path d="M 120 200 L 258 200" stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" markerEnd="url(#arr-muted)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                  <motion.path d="M 418 200 L 518 200" stroke="hsl(160 84% 39%)" strokeWidth="2" fill="none" markerEnd="url(#arr-green)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.15 }} />
                  <motion.path d="M 338 278 C 338 348, 398 398, 518 398" stroke="hsl(0 84% 60%)" strokeWidth="2" strokeDasharray="6 4" fill="none" markerEnd="url(#arr-rose)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
                  <motion.path d="M 678 200 L 778 200" stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" markerEnd="url(#arr-muted)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* Frame: Start */}
            <motion.div
              animate={{ x: connected ? 0 : 50, y: connected ? 120 : 50, rotate: connected ? 0 : -5 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute w-32 h-40 bg-white border border-indigo-200 rounded-lg shadow-sm flex flex-col"
            >
              <div className="h-6 border-b border-indigo-100 bg-indigo-50/60 flex items-center px-2">
                <span className="text-[8px] font-mono text-indigo-600 font-bold uppercase tracking-wider">Start</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2">
                <div className="w-full h-16 bg-muted/30 rounded" />
                <div className="w-full h-4 bg-primary/20 rounded mt-auto" />
              </div>
            </motion.div>

            {/* Frame: Identity */}
            <motion.div
              animate={{ x: connected ? 260 : 310, y: connected ? 120 : 80, rotate: connected ? 0 : 3 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.06 }}
              className="absolute w-32 h-40 bg-white border border-indigo-200 rounded-lg shadow-sm flex flex-col z-10"
            >
              <div className="h-6 border-b border-indigo-100 bg-indigo-50/60 flex items-center px-2">
                <span className="text-[8px] font-mono text-indigo-600 font-bold uppercase tracking-wider">Identity</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2 items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-muted/50" />
                <div className="w-full h-2 bg-muted/30 rounded" />
                <div className="w-3/4 h-2 bg-muted/30 rounded" />
              </div>
              {/* decision diamond */}
              <AnimatePresence>
                {connected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-9 h-9 bg-amber-100 border border-amber-300 rotate-45 flex items-center justify-center z-20"
                  >
                    <span className="text-[9px] font-bold text-amber-800 -rotate-45">?</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Frame: Bank Connect */}
            <motion.div
              animate={{ x: connected ? 520 : 600, y: connected ? 120 : 155, rotate: connected ? 0 : -4 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.12 }}
              className="absolute w-32 h-40 bg-white border border-emerald-200 rounded-lg shadow-sm flex flex-col"
            >
              <div className="h-6 border-b border-emerald-100 bg-emerald-50/60 flex items-center px-2">
                <span className="text-[8px] font-mono text-emerald-700 font-bold uppercase tracking-wider">Bank Connect</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2">
                <div className="w-full h-8 border-2 border-dashed border-muted rounded" />
                <div className="w-full h-8 bg-muted/30 rounded" />
                <div className="w-full h-7 bg-muted/30 rounded" />
              </div>
            </motion.div>

            {/* Frame: Funding */}
            <motion.div
              animate={{ x: connected ? 780 : 810, y: connected ? 120 : 260, rotate: connected ? 0 : 2 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.18 }}
              className="absolute w-32 h-40 bg-white border border-indigo-200 rounded-lg shadow-sm flex flex-col"
            >
              <div className="h-6 border-b border-indigo-100 bg-indigo-50/60 flex items-center px-2">
                <span className="text-[8px] font-mono text-indigo-600 font-bold uppercase tracking-wider">Funding</span>
              </div>
              <div className="flex-1 p-2 flex flex-col items-center">
                <div className="text-xl font-bold text-foreground mt-4">$0.00</div>
                <div className="w-full h-6 bg-muted/30 rounded mt-auto mb-1" />
                <div className="w-full h-6 bg-primary/20 rounded" />
              </div>
            </motion.div>

            {/* Frame: Error Recovery */}
            <motion.div
              animate={{ x: connected ? 520 : 390, y: connected ? 320 : 410, rotate: connected ? 0 : -6 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.24 }}
              className="absolute w-32 h-40 bg-white border border-rose-200 rounded-lg shadow-sm flex flex-col"
            >
              <div className="h-6 border-b border-rose-100 bg-rose-50/60 flex items-center px-2">
                <span className="text-[8px] font-mono text-rose-700 font-bold uppercase tracking-wider">Error Recovery</span>
              </div>
              <div className="flex-1 p-2 flex flex-col items-center justify-center gap-3 text-center">
                <AlertCircle className="w-8 h-8 text-rose-400" />
                <div className="w-full h-2 bg-muted/30 rounded" />
                <div className="w-full h-6 bg-rose-100 text-rose-700 text-[8px] font-bold flex items-center justify-center rounded">
                  Retry
                </div>
              </div>
            </motion.div>

            {/* pass/fail labels */}
            <AnimatePresence>
              {connected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <div className="absolute top-[178px] left-[438px] text-[10px] font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-emerald-200 z-20">Pass</div>
                  <div className="absolute top-[280px] left-[305px] text-[10px] font-bold text-rose-600 bg-white px-1.5 py-0.5 rounded border border-rose-200 z-20">Fail</div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Manual toggle */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/90 backdrop-blur-sm border border-border px-4 py-2 rounded-full shadow-sm">
          <span className={`text-xs font-medium transition-colors ${!connected ? "text-foreground" : "text-muted-foreground"}`}>
            Scattered Frames
          </span>
          <button
            onClick={() => setConnected((v) => !v)}
            className="w-10 h-5 bg-muted rounded-full relative focus:outline-none"
            aria-label="Toggle flow connection"
          >
            <motion.div
              className="absolute top-0.5 w-4 h-4 bg-primary rounded-full shadow-sm"
              animate={{ left: connected ? "22px" : "2px" }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
            />
          </button>
          <span className={`text-xs font-medium transition-colors ${connected ? "text-foreground" : "text-muted-foreground"}`}>
            Connected Flow
          </span>
        </div>
      </div>
    </section>
  );
}
