import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, History, GitMerge, FileCheck } from "lucide-react";

export function DesignDiff() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: false });

  const columns = [
    {
      id: "v1",
      title: "Original Idea",
      icon: History,
      time: "10:24 AM",
      content: (
        <div className="flex flex-col gap-4">
          <div className="w-full p-4 bg-amber-50 border border-amber-200/60 shadow-sm transform -rotate-2">
            <p className="font-mono text-sm text-amber-900/80">Need onboarding. Users should add money. Make it fast.</p>
          </div>
          <div className="w-full p-4 bg-amber-50 border border-amber-200/60 shadow-sm transform rotate-1">
            <p className="font-mono text-sm text-amber-900/80">Skip KYC?</p>
          </div>
        </div>
      )
    },
    {
      id: "v2",
      title: "AI Structure",
      icon: Sparkles,
      time: "10:25 AM",
      content: (
        <div className="flex flex-col gap-3">
          <div className="w-full p-3 bg-violet-50 border border-violet-200 shadow-sm rounded">
            <h4 className="text-xs font-bold text-violet-900 mb-2 uppercase tracking-wide">Journey Map</h4>
            <ul className="text-xs text-violet-800 space-y-1 ml-3 list-disc">
              <li>Welcome Screen</li>
              <li>Identity Verification</li>
              <li>Funding Source</li>
            </ul>
          </div>
          <div className="w-full p-3 bg-violet-50 border border-violet-200 shadow-sm rounded">
             <h4 className="text-xs font-bold text-violet-900 mb-2 uppercase tracking-wide">Gaps Found</h4>
             <p className="text-xs text-violet-800">No empty state for KYC failure. Missing trust indicators.</p>
          </div>
        </div>
      )
    },
    {
      id: "v3",
      title: "Designer Edits",
      icon: GitMerge,
      time: "10:45 AM",
      content: (
        <div className="flex flex-col gap-3 relative">
          <div className="w-full p-3 bg-muted/20 border border-border shadow-sm rounded">
            <h4 className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">Journey Map</h4>
            <ul className="text-xs text-muted-foreground space-y-1 ml-3 list-disc">
              <li>Welcome Screen</li>
              <li className="line-through opacity-50">Identity Verification</li>
              <li>Value Prop / Trust</li>
              <li className="text-foreground font-medium text-amber-600">+ Gradual Identity Verif</li>
              <li>Funding Source</li>
            </ul>
          </div>
          <div className="absolute -right-4 top-1/2 p-2 bg-amber-100 text-amber-900 text-[10px] font-mono font-bold rotate-12 shadow-sm border border-amber-200">
             Too much friction up front
          </div>
        </div>
      )
    },
    {
      id: "v4",
      title: "Final Flow",
      icon: FileCheck,
      time: "11:30 AM",
      content: (
        <div className="flex flex-col gap-2">
          <div className="w-full p-2 bg-background border border-indigo-200 shadow-sm rounded flex items-center justify-center h-12">
            <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">Welcome</span>
          </div>
          <div className="w-[1px] h-3 bg-muted mx-auto" />
          <div className="w-full p-2 bg-background border border-indigo-200 shadow-sm rounded flex items-center justify-center h-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400" />
             <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">Trust Ed</span>
          </div>
          <div className="w-[1px] h-3 bg-muted mx-auto" />
          <div className="w-full p-2 bg-background border border-indigo-200 shadow-sm rounded flex items-center justify-center h-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />
             <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">Gradual KYC</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="diff" className="min-h-screen w-full bg-background border-b border-border py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-medium tracking-tight mb-4">Design Diff</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            See the evolution of an idea. The intelligence layer tracks changes between messy thoughts, AI structuring, and final designer decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col h-full"
            >
              {/* Header / Timeline */}
              <div className="mb-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                  <col.icon className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">{col.title}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground mr-2" />
                  <div className="h-[1px] flex-1 bg-border" />
                  <span className="text-[10px] font-mono text-muted-foreground ml-2">{col.time}</span>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 bg-muted/10 border border-border/50 rounded-xl p-4 relative min-h-[400px]">
                {col.content}
                
                {/* Connecting lines between columns (desktop only) */}
                {i < columns.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-[1px] bg-border z-10" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
