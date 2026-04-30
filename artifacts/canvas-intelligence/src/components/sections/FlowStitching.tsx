import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function FlowStitching() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-200px", once: false });

  return (
    <section id="flow" className="min-h-[120dvh] w-full bg-background border-b border-border py-24 flex flex-col" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl font-medium tracking-tight mb-4">Flow Stitching</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Canvas Intelligence understands the relationship between frames, automatically generating user journeys from scattered screens.
        </p>
      </div>

      <div className="flex-1 relative w-full max-w-7xl mx-auto overflow-hidden bg-dot-grid border border-border rounded-2xl shadow-sm">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          
          {/* Base Layout Grid (invisible, for positioning) */}
          <div className="w-full max-w-5xl h-[600px] relative">
            
            {/* SVG Connectors (Only visible when connected) */}
            <motion.svg 
              className="absolute inset-0 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <defs>
                <marker id="arrow-emerald" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="hsl(160 100% 40%)" />
                </marker>
                <marker id="arrow-rose" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="hsl(0 84% 60%)" />
                </marker>
                <marker id="arrow-muted" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--muted-foreground))" />
                </marker>
              </defs>

              {/* Start -> Identity */}
              <path d="M 120 200 L 260 200" stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" markerEnd="url(#arrow-muted)" />
              
              {/* Identity -> Bank */}
              <path d="M 420 200 L 520 200" stroke="hsl(160 100% 40%)" strokeWidth="2" fill="none" markerEnd="url(#arrow-emerald)" />
              
              {/* Identity -> Error (Branch) */}
              <path d="M 340 280 C 340 350, 400 400, 520 400" stroke="hsl(0 84% 60%)" strokeWidth="2" strokeDasharray="6 4" fill="none" markerEnd="url(#arrow-rose)" />
              
              {/* Bank -> Funding */}
              <path d="M 680 200 L 780 200" stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" markerEnd="url(#arrow-muted)" />
            </motion.svg>

            {/* Frame: Start */}
            <motion.div
              layout
              initial={false}
              animate={{
                x: isInView ? 0 : 50,
                y: isInView ? 120 : 50,
                rotate: isInView ? 0 : -5,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute w-32 h-40 bg-white border border-indigo-200 rounded shadow-sm flex flex-col"
            >
              <div className="h-6 border-b border-indigo-100 bg-indigo-50/50 flex items-center px-2">
                <span className="text-[8px] font-mono text-indigo-600 font-bold uppercase">Start</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2">
                <div className="w-full h-16 bg-muted/30 rounded" />
                <div className="w-full h-4 bg-primary/20 rounded mt-auto" />
              </div>
            </motion.div>

            {/* Frame: Identity Verification */}
            <motion.div
              layout
              initial={false}
              animate={{
                x: isInView ? 260 : 300,
                y: isInView ? 120 : 80,
                rotate: isInView ? 0 : 3,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="absolute w-32 h-40 bg-white border border-indigo-200 rounded shadow-sm flex flex-col z-10"
            >
              <div className="h-6 border-b border-indigo-100 bg-indigo-50/50 flex items-center px-2">
                <span className="text-[8px] font-mono text-indigo-600 font-bold uppercase">Identity</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2 items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-muted/50" />
                <div className="w-full h-2 bg-muted/30 rounded" />
                <div className="w-3/4 h-2 bg-muted/30 rounded" />
              </div>
              
              {/* Decision Diamond Overlay (Only in structured view) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-100 border border-amber-300 rotate-45 flex items-center justify-center z-20"
              >
                <span className="text-[8px] font-bold text-amber-800 -rotate-45">?</span>
              </motion.div>
            </motion.div>

            {/* Frame: Bank Connection */}
            <motion.div
              layout
              initial={false}
              animate={{
                x: isInView ? 520 : 600,
                y: isInView ? 120 : 150,
                rotate: isInView ? 0 : -4,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="absolute w-32 h-40 bg-white border border-emerald-200 rounded shadow-sm flex flex-col"
            >
              <div className="h-6 border-b border-emerald-100 bg-emerald-50/50 flex items-center px-2">
                <span className="text-[8px] font-mono text-emerald-700 font-bold uppercase">Bank Connect</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2">
                <div className="w-full h-8 border-2 border-dashed border-muted rounded" />
                <div className="w-full h-8 bg-muted/30 rounded" />
                <div className="w-full h-8 bg-muted/30 rounded" />
              </div>
            </motion.div>

            {/* Frame: Funding Setup */}
            <motion.div
              layout
              initial={false}
              animate={{
                x: isInView ? 780 : 800,
                y: isInView ? 120 : 250,
                rotate: isInView ? 0 : 2,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              className="absolute w-32 h-40 bg-white border border-indigo-200 rounded shadow-sm flex flex-col"
            >
              <div className="h-6 border-b border-indigo-100 bg-indigo-50/50 flex items-center px-2">
                <span className="text-[8px] font-mono text-indigo-600 font-bold uppercase">Funding</span>
              </div>
              <div className="flex-1 p-2 flex flex-col gap-2 items-center">
                <div className="text-xl font-bold text-foreground mt-4">$0.00</div>
                <div className="w-full h-6 bg-muted/30 rounded mt-auto" />
                <div className="w-full h-6 bg-primary/20 rounded" />
              </div>
            </motion.div>

            {/* Frame: Error Recovery (Branch) */}
            <motion.div
              layout
              initial={false}
              animate={{
                x: isInView ? 520 : 400,
                y: isInView ? 320 : 400,
                rotate: isInView ? 0 : -6,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
              className="absolute w-32 h-40 bg-white border border-rose-200 rounded shadow-sm flex flex-col"
            >
              <div className="h-6 border-b border-rose-100 bg-rose-50/50 flex items-center px-2">
                <span className="text-[8px] font-mono text-rose-700 font-bold uppercase">Error Recovery</span>
              </div>
              <div className="flex-1 p-2 flex flex-col items-center justify-center gap-3 text-center">
                <AlertCircle className="w-8 h-8 text-rose-400" />
                <div className="w-full h-2 bg-muted/30 rounded" />
                <div className="w-full h-6 bg-rose-100 text-rose-700 text-[8px] font-bold flex items-center justify-center rounded">
                  Retry
                </div>
              </div>
            </motion.div>
            
            {/* Status Labels (Only visible when connected) */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: isInView ? 1 : 0 }}
               transition={{ delay: 0.8 }}
            >
              <div className="absolute top-[180px] left-[440px] text-[10px] font-bold text-emerald-600 bg-white px-1.5 py-0.5 rounded border border-emerald-200 z-10">Pass</div>
              <div className="absolute top-[280px] left-[310px] text-[10px] font-bold text-rose-600 bg-white px-1.5 py-0.5 rounded border border-rose-200 z-10">Fail</div>
            </motion.div>

          </div>
        </div>
        
        {/* Toggle Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/90 backdrop-blur border border-border px-4 py-2 rounded-full shadow-sm">
          <span className={`text-xs font-medium ${!isInView ? 'text-foreground' : 'text-muted-foreground'}`}>Scattered Frames</span>
          <div className="w-8 h-4 bg-muted rounded-full relative">
            <motion.div 
              className="absolute top-0.5 w-3 h-3 bg-primary rounded-full"
              animate={{ left: isInView ? "18px" : "2px" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>
          <span className={`text-xs font-medium ${isInView ? 'text-foreground' : 'text-muted-foreground'}`}>Connected Flow</span>
        </div>
      </div>
    </section>
  );
}
