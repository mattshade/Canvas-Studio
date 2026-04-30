import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Check } from "lucide-react";

// ─── Shared backdrop ────────────────────────────────────────────────────────

function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
      onClick={onClick}
    />
  );
}

// ─── Login Modal ─────────────────────────────────────────────────────────────

const WORKSPACES = [
  {
    name: "Fintech Onboarding Redesign",
    tag: "In progress",
    tagColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    nodes: [
      { x: 18, y: 24, w: 36, h: 20, color: "bg-amber-100 border-amber-200" },
      { x: 62, y: 14, w: 28, h: 24, color: "bg-white border-indigo-200" },
      { x: 56, y: 52, w: 32, h: 16, color: "bg-violet-50 border-violet-200" },
      { x: 14, y: 58, w: 24, h: 14, color: "bg-rose-50 border-rose-200" },
    ],
    lines: ["M 54 34 L 62 26", "M 80 38 L 72 60"],
  },
  {
    name: "Restaurant Marketplace Checkout",
    tag: "Shared",
    tagColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    nodes: [
      { x: 10, y: 30, w: 32, h: 22, color: "bg-white border-indigo-200" },
      { x: 52, y: 18, w: 36, h: 20, color: "bg-amber-100 border-amber-200" },
      { x: 54, y: 55, w: 28, h: 18, color: "bg-emerald-50 border-emerald-200" },
    ],
    lines: ["M 42 41 L 52 28", "M 70 38 L 68 55"],
  },
  {
    name: "Mobile AI Assistant",
    tag: "Draft",
    tagColor: "text-amber-600 bg-amber-50 border-amber-100",
    nodes: [
      { x: 20, y: 20, w: 40, h: 22, color: "bg-violet-50 border-violet-200" },
      { x: 68, y: 40, w: 22, h: 32, color: "bg-white border-indigo-200" },
      { x: 16, y: 58, w: 44, h: 16, color: "bg-rose-50 border-rose-200" },
    ],
    lines: ["M 60 31 L 68 46", "M 60 66 L 68 56"],
  },
];

function MiniCanvas({ nodes, lines }: typeof WORKSPACES[0]) {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
      {/* dot grid */}
      <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.6" fill="hsl(var(--border))" opacity="0.6" />
      </pattern>
      <rect width="100" height="80" fill="url(#dots)" />
      {lines.map((d, i) => (
        <path key={i} d={d} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#sm-arrow)" />
      ))}
      <defs>
        <marker id="sm-arrow" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
          <polygon points="0 0, 5 2, 0 4" fill="hsl(var(--muted-foreground))" opacity="0.4" />
        </marker>
      </defs>
      {nodes.map((n, i) => (
        <foreignObject key={i} x={n.x} y={n.y} width={n.w} height={n.h}>
          <div className={`w-full h-full rounded border ${n.color}`} />
        </foreignObject>
      ))}
    </svg>
  );
}

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [entering, setEntering] = useState(false);

  const handleOpen = (i: number) => {
    setSelected(i);
    setEntering(true);
    setTimeout(() => onClose(), 900);
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="pointer-events-auto w-full max-w-lg bg-background border border-border rounded-2xl shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="text-sm font-medium">Canvas Intelligence</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-6 py-5">
            <h2 className="text-lg font-medium mb-1">Welcome back</h2>
            <p className="text-sm text-muted-foreground mb-5">Pick up where you left off.</p>

            {/* Workspace cards */}
            <div className="flex flex-col gap-2 mb-5">
              {WORKSPACES.map((ws, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleOpen(i)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${
                    selected === i
                      ? "border-primary/40 bg-primary/5 shadow-sm"
                      : "border-border hover:border-border/80 hover:bg-muted/30"
                  }`}
                >
                  {/* Canvas thumbnail */}
                  <div className="w-20 h-14 rounded-lg border border-border bg-background/50 overflow-hidden flex-shrink-0">
                    <MiniCanvas {...ws} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{ws.name}</p>
                    <span className={`mt-1 inline-block text-[10px] font-medium px-2 py-0.5 rounded border ${ws.tagColor}`}>
                      {ws.tag}
                    </span>
                  </div>
                  <AnimatePresence>
                    {selected === i ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] text-muted-foreground">or continue with email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 h-9 px-3 text-sm rounded-lg border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <button className="h-9 px-4 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Continue
              </button>
            </div>
          </div>

          {/* Entering overlay */}
          <AnimatePresence>
            {entering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background/95 flex items-center justify-center rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Opening your canvas...</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

// ─── Try for Free Modal ───────────────────────────────────────────────────────

const SUGGESTIONS = [
  "Fintech onboarding redesign",
  "E-commerce checkout flow",
  "Mobile AI assistant launch",
  "B2B dashboard redesign",
  "Patient portal navigation",
];

const CHIPS = [
  "Fintech onboarding",
  "Restaurant checkout",
  "Mobile AI assistant",
];

const BUILD_STEPS = [
  "Mapping your intent...",
  "Generating user journey...",
  "Identifying key screens...",
  "Detecting component patterns...",
  "Surfacing missing states...",
  "Canvas ready.",
];

type Step = "name" | "building" | "ready";

export function TryModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("name");
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState(SUGGESTIONS[0]);
  const [buildStep, setBuildStep] = useState(0);
  const [nodes, setNodes] = useState<{ id: number; x: number; y: number; type: string; label: string }[]>([]);

  // Cycle placeholder text
  useEffect(() => {
    if (step !== "name") return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % SUGGESTIONS.length;
      setPlaceholder(SUGGESTIONS[i]);
    }, 2200);
    return () => clearInterval(id);
  }, [step]);

  // Building sequence
  useEffect(() => {
    if (step !== "building") return;
    const nodeTemplates = [
      { type: "note", label: "Trust first", x: 14, y: 22 },
      { type: "frame", label: "Onboarding Start", x: 34, y: 12 },
      { type: "frame", label: "Identity Check", x: 34, y: 44 },
      { type: "ai", label: "Add trust explanation before SSN", x: 62, y: 20 },
      { type: "warn", label: "Missing: KYC empty state", x: 62, y: 54 },
      { type: "component", label: "Progress Bar", x: 14, y: 60 },
    ];

    let s = 0;
    const advance = () => {
      if (s >= BUILD_STEPS.length - 1) {
        setStep("ready");
        return;
      }
      setBuildStep((prev) => {
        const next = prev + 1;
        if (next - 1 < nodeTemplates.length) {
          setNodes((n) => [...n, { id: next, ...nodeTemplates[next - 1] }]);
        }
        return next;
      });
      s++;
      setTimeout(advance, 620);
    };

    setTimeout(advance, 400);
  }, [step]);

  const handleStart = () => {
    if (!value.trim()) return;
    setStep("building");
    setBuildStep(0);
    setNodes([]);
  };

  const NODE_STYLES: Record<string, string> = {
    note: "bg-amber-50 border-amber-200 text-amber-900",
    frame: "bg-white border-indigo-200 text-indigo-700",
    ai: "bg-violet-50 border-violet-200 text-violet-900",
    warn: "bg-rose-50 border-rose-200 text-rose-800",
    component: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="pointer-events-auto w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">New Canvas</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">

            {/* Step 1: Name your canvas */}
            {step === "name" && (
              <motion.div
                key="name"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-8 py-10"
              >
                <h2 className="text-2xl font-medium tracking-tight mb-2">What are you designing?</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Describe your design challenge. Canvas Intelligence will generate the structure.
                </p>

                <div className="relative mb-4">
                  <input
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStart()}
                    placeholder={placeholder}
                    className="w-full h-12 px-4 pr-12 text-sm rounded-xl border border-border bg-background placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <AnimatePresence>
                    {value.trim() && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleStart}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-lg"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => { setValue(chip); }}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/50">
                  <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium mb-1">What happens next</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Canvas Intelligence maps your intent into a user journey, key screens, component patterns, and gaps — all structured on a live canvas.
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStart}
                  disabled={!value.trim()}
                  className="mt-6 w-full h-11 flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl disabled:opacity-40 transition-all"
                >
                  Generate canvas
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Building */}
            {step === "building" && (
              <motion.div
                key="building"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                {/* Live canvas preview */}
                <div className="relative w-full h-56 rounded-xl bg-muted/20 border border-border overflow-hidden mb-6">
                  {/* dot grid */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="try-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.8" fill="hsl(var(--border))" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#try-dots)" />
                  </svg>

                  {/* Nodes appearing */}
                  <AnimatePresence>
                    {nodes.map((node) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.7, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className={`absolute px-2.5 py-1.5 rounded-md border text-[10px] font-medium leading-snug max-w-[130px] ${NODE_STYLES[node.type]}`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      >
                        {node.label}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Intent label */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-border rounded-md px-2.5 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">{value}</span>
                  </div>
                </div>

                {/* Build log */}
                <div className="space-y-2">
                  {BUILD_STEPS.slice(0, buildStep + 1).map((label, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        i < buildStep ? "bg-primary" : "border border-primary"
                      }`}>
                        {i < buildStep
                          ? <Check className="w-2.5 h-2.5 text-primary-foreground" />
                          : <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                              animate={{ scale: [1, 1.4, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        }
                      </div>
                      <span className={`text-xs ${i < buildStep ? "text-muted-foreground" : "text-foreground font-medium"}`}>
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Ready */}
            {step === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="px-8 py-10 flex flex-col items-center text-center"
              >
                {/* Floating nodes celebration */}
                <div className="relative w-64 h-32 mb-8">
                  {[
                    { label: "User Journey", color: "bg-indigo-50 border-indigo-200 text-indigo-700", x: 0, y: 10, delay: 0 },
                    { label: "Trust is earned, not assumed", color: "bg-amber-50 border-amber-200 text-amber-900", x: 140, y: 0, delay: 0.08 },
                    { label: "Consider adding trust explanation", color: "bg-violet-50 border-violet-200 text-violet-900", x: 60, y: 60, delay: 0.16 },
                    { label: "Missing: empty state", color: "bg-rose-50 border-rose-200 text-rose-800", x: 0, y: 72, delay: 0.24 },
                    { label: "Primary Button", color: "bg-emerald-50 border-emerald-200 text-emerald-800", x: 158, y: 68, delay: 0.32 },
                  ].map((n, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: n.delay, type: "spring", stiffness: 260, damping: 20 }}
                      className={`absolute px-2 py-1 rounded-md border text-[9px] font-medium leading-snug max-w-[110px] ${n.color}`}
                      style={{ left: n.x, top: n.y }}
                    >
                      {n.label}
                    </motion.div>
                  ))}
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path d="M 80 35 L 80 60" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 2" />
                    <path d="M 50 20 L 80 20" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 2" />
                  </svg>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.3 }}
                  className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4"
                >
                  <Check className="w-6 h-6 text-primary" />
                </motion.div>

                <h2 className="text-xl font-medium mb-2">Your canvas is ready.</h2>
                <p className="text-sm text-muted-foreground mb-8 max-w-xs leading-relaxed">
                  "{value}" has been structured into a user journey, screens, components, and gaps.
                </p>

                <div className="flex gap-3 w-full max-w-xs">
                  <button
                    onClick={onClose}
                    className="flex-1 h-10 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Explore canvas
                  </button>
                  <button
                    onClick={onClose}
                    className="h-10 px-4 text-sm font-medium border border-border rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    Later
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
