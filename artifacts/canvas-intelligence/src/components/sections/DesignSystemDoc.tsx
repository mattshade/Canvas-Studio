import { PenTool, MousePointer2, Sparkles } from "lucide-react";

export function DesignSystemDoc() {
  return (
    <section id="design-system" className="min-h-screen w-full bg-background py-24">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16">
          <h2 className="text-3xl font-medium tracking-tight mb-4">Design System</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            The token set, node vocabulary, and interaction patterns that define the Canvas Intelligence visual language.
          </p>
        </header>

        <div className="space-y-24">

          {/* Typography */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-8">Typography Scale</h3>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">Display</span>
                  <span className="text-[10px] font-mono text-muted-foreground/60">5xl · medium · tight</span>
                </div>
                <span className="md:col-span-3 text-5xl font-medium tracking-tight leading-tight">The canvas should help you think.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">Heading</span>
                  <span className="text-[10px] font-mono text-muted-foreground/60">3xl · medium · tight</span>
                </div>
                <span className="md:col-span-3 text-3xl font-medium tracking-tight">Structure shouldn't come after the work.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">Body</span>
                  <span className="text-[10px] font-mono text-muted-foreground/60">base · regular · relaxed</span>
                </div>
                <span className="md:col-span-3 text-base text-foreground leading-relaxed max-w-2xl">Design tools are great for execution, but early product thinking is still messy, fragmented, and hard to structure.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">Label / UI</span>
                  <span className="text-[10px] font-mono text-muted-foreground/60">xs · bold · widest</span>
                </div>
                <span className="md:col-span-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Detected Patterns</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-muted-foreground">Mono / Node</span>
                  <span className="text-[10px] font-mono text-muted-foreground/60">sm · mono · indigo</span>
                </div>
                <span className="md:col-span-3 font-mono text-sm text-indigo-600 font-medium uppercase tracking-wider">Frame / Onboarding</span>
              </div>
            </div>
          </div>

          {/* Color Tokens */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-8">Color Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { swatch: "bg-background border border-border", name: "Background", hex: "#FAFAF8", label: "Warm White" },
                { swatch: "bg-primary", name: "Primary", hex: "#4F46E5", label: "Indigo" },
                { swatch: "bg-rose-500", name: "Danger", hex: "#F43F5E", label: "Rose" },
                { swatch: "bg-emerald-500", name: "Success", hex: "#10B981", label: "Emerald" },
                { swatch: "bg-amber-400", name: "Warning / Note", hex: "#FBBF24", label: "Amber" },
              ].map((t) => (
                <div key={t.name} className="space-y-3">
                  <div className={`w-full h-20 rounded-xl ${t.swatch} shadow-sm`} />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{t.hex} · {t.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Canvas Nodes */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-8">Canvas Node Vocabulary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sticky Note — Raw Idea</span>
                <div className="w-48 p-4 bg-amber-50 border border-amber-200/60 shadow-sm">
                  <p className="font-mono text-sm text-amber-900/80">Trust is earned, not assumed</p>
                </div>
                <p className="text-xs text-muted-foreground">Unstructured thoughts, questions, and hypotheses. Always amber. No rounded corners — intentionally handmade.</p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Frame Card — Screen Proposal</span>
                <div className="w-56 bg-background border border-indigo-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="px-3 py-2 border-b border-indigo-100 bg-indigo-50/30">
                    <p className="text-[10px] font-mono text-indigo-600 font-medium uppercase tracking-wider">Screen Name</p>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted/40 mx-auto" />
                    <div className="w-full h-2 bg-muted rounded-full" />
                    <div className="w-3/4 h-2 bg-muted rounded-full mx-auto" />
                    <div className="w-full h-7 bg-indigo-50 border border-indigo-100 rounded mt-1" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">UI frames. Indigo palette signals designed intent. Rounded — production-ready in spirit.</p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Suggestion — Intelligence Layer</span>
                <div className="w-64 p-3 bg-violet-50 border border-violet-200 rounded-md shadow-sm flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-violet-900 font-medium leading-snug">Consider adding a trust explanation before requesting SSN</p>
                </div>
                <p className="text-xs text-muted-foreground">Ambient recommendations. Violet separates AI voice from designer voice. Always dismissible.</p>
              </div>

            </div>
          </div>

          {/* Interactive Elements */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-8">Interactive Elements</h3>
            <div className="flex flex-wrap gap-10 items-start p-8 bg-dot-grid border border-border rounded-xl">

              <div className="flex flex-col gap-3">
                <span className="text-xs text-muted-foreground font-medium">Toolbar</span>
                <div className="flex items-center gap-1.5 p-1.5 bg-background/80 backdrop-blur-md border border-border rounded-lg shadow-sm">
                  <button className="p-2 rounded-md bg-muted text-foreground">
                    <MousePointer2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
                    <PenTool className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <div className="flex items-center p-0.5 bg-muted/50 rounded-md">
                    <button className="px-2.5 py-1 text-xs font-medium rounded bg-background shadow-sm text-foreground">Messy</button>
                    <button className="px-2.5 py-1 text-xs font-medium rounded text-muted-foreground">Structured</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs text-muted-foreground font-medium">Intent Chip</span>
                <button className="text-xs px-3 py-2 rounded-lg border bg-primary/5 border-primary/20 text-primary font-medium shadow-sm">
                  Create onboarding for a fintech app
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs text-muted-foreground font-medium">Cursor Label</span>
                <div className="relative flex items-start gap-2 pl-1 pt-1">
                  <div className="relative">
                    <MousePointer2 className="w-5 h-5 fill-indigo-500 text-indigo-500 -rotate-12" />
                    <div className="absolute top-5 left-4 bg-indigo-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap">
                      Sarah · Design
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs text-muted-foreground font-medium">Primary Actions</span>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                    Try for free
                  </button>
                  <button className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    Log in
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
