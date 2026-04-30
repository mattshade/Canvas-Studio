import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutTemplate, AlertTriangle, Lightbulb, Code, CheckCircle2, X } from "lucide-react";

const CANDIDATES = [
  { id: "c1", name: "FormInput.tsx", tag: "Extract", color: "emerald" as const, instances: 12 },
  { id: "c2", name: "OnboardingStep.tsx", tag: "Pattern", color: "emerald" as const, instances: 5 },
  { id: "c3", name: "ErrorBoundary.tsx", tag: "Missing", color: "rose" as const, instances: 0 },
];

export function SystemAwareness() {
  const [extracted, setExtracted] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExtracted((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <section id="system" className="min-h-screen w-full bg-background border-b border-border py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-medium tracking-tight mb-4">Design System Awareness</h2>
            <p className="text-lg text-muted-foreground">
              The intelligence layer watches your canvas as you work — surfacing repeating patterns, flagging inconsistencies, and nominating component candidates before you think to ask.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Column 1: Detected Patterns */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
              <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Detected Patterns</h3>
            </div>

            {[
              { label: "Primary Button", count: 8, preview: (
                <div className="flex gap-2 mt-3">
                  <div className="w-14 h-6 bg-primary rounded shadow-sm" />
                  <div className="w-18 h-6 bg-primary rounded shadow-sm" />
                  <div className="w-20 h-6 bg-primary rounded shadow-sm" />
                </div>
              )},
              { label: "Form Input", count: 12, preview: (
                <div className="w-full h-8 border border-border bg-background rounded shadow-sm mt-3" />
              )},
              { label: "Section Header", count: 6, preview: (
                <div className="flex flex-col gap-1.5 mt-3">
                  <div className="w-full h-2 bg-foreground/20 rounded-full" />
                  <div className="w-2/3 h-2 bg-muted rounded-full" />
                </div>
              )},
            ].map((p) => (
              <div key={p.label} className="p-4 bg-muted/10 border border-border rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{p.label}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{p.count}×</span>
                </div>
                {p.preview}
              </div>
            ))}
          </div>

          {/* Column 2: Inconsistencies */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Inconsistencies</h3>
            </div>

            <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl">
              <p className="text-sm font-medium text-amber-900 mb-4">2 button styles for the same action</p>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-24 h-8 bg-primary rounded shadow-sm flex items-center justify-center">
                    <span className="text-[10px] text-primary-foreground font-medium">Continue</span>
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground">screens 2, 4, 6</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">vs</span>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-24 h-8 border-2 border-primary rounded shadow-sm flex items-center justify-center">
                    <span className="text-[10px] text-primary font-medium">Continue</span>
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground">screens 3, 5</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-rose-50/60 border border-rose-200/60 rounded-xl">
              <p className="text-sm font-medium text-rose-900 mb-2">Missing empty states</p>
              <p className="text-xs text-rose-800/80 leading-relaxed">4 list views detected with no fallback for zero-data or error states.</p>
            </div>

            <div className="p-4 bg-blue-50/60 border border-blue-200/60 rounded-xl">
              <p className="text-sm font-medium text-blue-900 mb-2">Spacing inconsistency</p>
              <p className="text-xs text-blue-800/80 leading-relaxed">Card padding alternates between 16px and 24px across equivalent contexts.</p>
            </div>
          </div>

          {/* Column 3: Component Candidates */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
              <Code className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Code Candidates</h3>
            </div>

            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {CANDIDATES.filter((c) => !dismissed.has(c.id)).map((c) => {
                  const isExtracted = extracted.has(c.id);
                  const isRose = c.color === "rose";
                  return (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`p-3 border rounded-lg flex items-center justify-between gap-2 ${
                        isRose
                          ? "bg-rose-50/60 border-rose-200/60"
                          : isExtracted
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-emerald-50/60 border-emerald-200/60"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isRose ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        ) : (
                          <Lightbulb className={`w-3.5 h-3.5 flex-shrink-0 ${isExtracted ? "text-emerald-600" : "text-emerald-500"}`} />
                        )}
                        <span className={`font-mono text-xs truncate ${isRose ? "text-rose-900" : "text-emerald-900"}`}>
                          {c.name}
                        </span>
                        {c.instances > 0 && (
                          <span className="text-[9px] text-muted-foreground ml-1 flex-shrink-0">{c.instances}×</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {!isRose && (
                          <button
                            onClick={() => toggle(c.id)}
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded transition-colors ${
                              isExtracted
                                ? "bg-emerald-200 text-emerald-800 hover:bg-emerald-300"
                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            }`}
                          >
                            {isExtracted ? (
                              <span className="flex items-center gap-0.5"><CheckCircle2 className="w-2.5 h-2.5 inline" /> Done</span>
                            ) : c.tag}
                          </button>
                        )}
                        {isRose && (
                          <span className="text-[10px] uppercase font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded">Missing</span>
                        )}
                        <button
                          onClick={() => setDismissed((s) => new Set([...s, c.id]))}
                          className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {dismissed.size > 0 && (
                <button
                  onClick={() => setDismissed(new Set())}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors self-start"
                >
                  Show dismissed ({dismissed.size})
                </button>
              )}
            </div>

            <div className="mt-4">
              <span className="text-xs font-medium text-muted-foreground mb-3 block">Extracted Design Tokens</span>
              <div className="flex gap-3 flex-wrap">
                {[
                  { color: "#4F46E5", label: "Primary" },
                  { color: "#059669", label: "Success" },
                  { color: "#D97706", label: "Warning" },
                  { color: "#DC2626", label: "Error" },
                  { color: "#7C3AED", label: "AI" },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-8 h-8 rounded-full shadow-sm ring-2 ring-offset-2 ring-transparent hover:ring-border transition-all"
                      style={{ backgroundColor: t.color }}
                      title={`${t.label} ${t.color}`}
                    />
                    <span className="text-[9px] text-muted-foreground">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
