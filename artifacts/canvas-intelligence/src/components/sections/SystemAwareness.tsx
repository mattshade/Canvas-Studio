import { motion } from "framer-motion";
import { LayoutTemplate, AlertTriangle, Lightbulb, Code } from "lucide-react";

export function SystemAwareness() {
  return (
    <section id="system" className="min-h-screen w-full bg-background border-b border-border py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight mb-4">Design System Awareness</h2>
          <p className="text-lg text-muted-foreground">
            The intelligence layer observes patterns across the canvas, identifying inconsistencies and proposing systemic extraction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Detected Patterns */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
              <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Detected Patterns</h3>
            </div>
            
            <div className="p-4 bg-muted/10 border border-border rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Primary Button</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">8 instances</span>
              </div>
              <div className="flex gap-2 mt-2">
                 <div className="w-16 h-6 bg-primary rounded shadow-sm" />
                 <div className="w-20 h-6 bg-primary rounded shadow-sm" />
                 <div className="w-24 h-6 bg-primary rounded shadow-sm" />
              </div>
            </div>

            <div className="p-4 bg-muted/10 border border-border rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Form Input</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">12 instances</span>
              </div>
              <div className="w-full h-8 border border-border bg-background rounded shadow-sm mt-2" />
            </div>
          </div>

          {/* Column 2: Inconsistencies */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Inconsistencies</h3>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-xl">
              <p className="text-sm font-medium text-amber-900 mb-3">2 button styles for same action</p>
              <div className="flex items-center gap-4">
                <div className="w-24 h-8 bg-primary rounded shadow-sm flex items-center justify-center">
                  <span className="text-[10px] text-primary-foreground font-medium">Continue</span>
                </div>
                <span className="text-xs text-muted-foreground">vs</span>
                <div className="w-24 h-8 border-2 border-primary rounded shadow-sm flex items-center justify-center">
                  <span className="text-[10px] text-primary font-medium">Continue</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-rose-50/50 border border-rose-200/50 rounded-xl">
              <p className="text-sm font-medium text-rose-900 mb-3">Missing empty states</p>
              <p className="text-xs text-rose-800/80">Detected 4 list views with no fallback for zero-data states.</p>
            </div>
          </div>

          {/* Column 3: Component Candidates */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
              <Code className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Code Candidates</h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3 bg-emerald-50/50 border border-emerald-200/50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-mono text-xs text-emerald-900">FormInput.tsx</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Extract</span>
              </div>

              <div className="p-3 bg-emerald-50/50 border border-emerald-200/50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-mono text-xs text-emerald-900">OnboardingStep.tsx</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Pattern</span>
              </div>

              <div className="p-3 bg-rose-50/50 border border-rose-200/50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span className="font-mono text-xs text-rose-900">ErrorBoundary.tsx</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">Missing</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs font-medium text-muted-foreground mb-2 block">Extracted Tokens</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4F46E5] ring-2 ring-offset-2 ring-transparent shadow-sm" title="Primary #4F46E5" />
                <div className="w-8 h-8 rounded-full bg-[#059669] ring-2 ring-offset-2 ring-transparent shadow-sm" title="Success #059669" />
                <div className="w-8 h-8 rounded-full bg-[#D97706] ring-2 ring-offset-2 ring-transparent shadow-sm" title="Warning #D97706" />
                <div className="w-8 h-8 rounded-full bg-[#DC2626] ring-2 ring-offset-2 ring-transparent shadow-sm" title="Error #DC2626" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
