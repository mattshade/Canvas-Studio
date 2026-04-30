export function DesignSystemDoc() {
  return (
    <section id="design-system" className="min-h-screen w-full bg-background py-24">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16">
          <h2 className="text-3xl font-medium tracking-tight mb-4">Design System</h2>
          <p className="text-lg text-muted-foreground">The foundational elements and UI patterns used in Canvas Intelligence.</p>
        </header>

        <div className="space-y-24">
          
          {/* Typography */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-6">Typography Scale</h3>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="text-sm text-muted-foreground">Display</span>
                <span className="md:col-span-3 text-5xl font-medium tracking-tight">The canvas should help you think.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="text-sm text-muted-foreground">Heading</span>
                <span className="md:col-span-3 text-3xl font-medium tracking-tight">Structure shouldn't come after the work.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="text-sm text-muted-foreground">Body</span>
                <span className="md:col-span-3 text-base text-foreground leading-relaxed max-w-2xl">Design tools are great for execution, but early product thinking is still messy, fragmented, and hard to structure.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="text-sm text-muted-foreground">Caption / UI</span>
                <span className="md:col-span-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Detected Patterns</span>
              </div>
            </div>
          </div>

          {/* Color Tokens */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-6">Color Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <div className="w-full h-24 rounded-lg bg-background border border-border shadow-sm" />
                <p className="text-xs font-medium">Background</p>
                <p className="text-[10px] font-mono text-muted-foreground">#FAFAF8 (Warm White)</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 rounded-lg bg-primary border border-border shadow-sm" />
                <p className="text-xs font-medium">Primary (Indigo)</p>
                <p className="text-[10px] font-mono text-muted-foreground">#4F46E5</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 rounded-lg bg-rose-500 border border-border shadow-sm" />
                <p className="text-xs font-medium">Danger (Rose)</p>
                <p className="text-[10px] font-mono text-muted-foreground">#F43F5E</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 rounded-lg bg-emerald-500 border border-border shadow-sm" />
                <p className="text-xs font-medium">Success (Emerald)</p>
                <p className="text-[10px] font-mono text-muted-foreground">#10B981</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 rounded-lg bg-amber-400 border border-border shadow-sm" />
                <p className="text-xs font-medium">Warning / Note (Amber)</p>
                <p className="text-[10px] font-mono text-muted-foreground">#FBBF24</p>
              </div>
            </div>
          </div>

          {/* Canvas Nodes */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-6">Canvas Node Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground mb-2">Sticky Note</span>
                <div className="w-48 p-4 bg-amber-50 border border-amber-200/60 shadow-sm">
                  <p className="font-mono text-sm text-amber-900/80">Raw unformatted idea</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground mb-2">Frame Card</span>
                <div className="w-56 bg-background border border-indigo-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="px-3 py-2 border-b border-indigo-100 bg-indigo-50/30">
                    <p className="text-[10px] font-mono text-indigo-600 font-medium uppercase tracking-wider">Screen Name</p>
                  </div>
                  <div className="p-4">
                    <div className="w-full h-8 bg-muted/30 rounded" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground mb-2">AI Suggestion</span>
                <div className="w-64 p-3 bg-violet-50 border border-violet-200 rounded-md shadow-sm flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-violet-200 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-violet-900 font-medium">Systemic recommendation or gap identified</p>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-6">Interactive Elements</h3>
            <div className="flex flex-wrap gap-8 items-center p-8 bg-dot-grid border border-border rounded-xl">
              
              <div className="flex items-center gap-1.5 p-1.5 bg-background/80 backdrop-blur-md border border-border rounded-lg shadow-sm">
                <button className="p-2 rounded-md bg-muted text-foreground">Icon</button>
                <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">Icon</button>
              </div>

              <button className="text-xs p-2.5 rounded-lg border bg-primary/5 border-primary/20 text-primary font-medium shadow-sm">
                Selected Intent Chip
              </button>

              <div className="relative inline-flex">
                <div className="w-4 h-4 bg-indigo-500 rounded-full" />
                <div className="absolute top-5 left-4 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap">
                  Cursor Label
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
