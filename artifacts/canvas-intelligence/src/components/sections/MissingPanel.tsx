import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Info, ArrowRight, Eye } from "lucide-react";

export function MissingPanel() {
  const gaps = [
    {
      type: "critical",
      text: "No empty state defined for failed identity verification.",
      icon: AlertCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200"
    },
    {
      type: "critical",
      text: "The user has no recovery path after payment failure.",
      icon: AlertCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200"
    },
    {
      type: "warning",
      text: "The flow jumps from account creation to funding without explaining trust.",
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      type: "warning",
      text: "Two button patterns appear to solve the same action.",
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      type: "info",
      text: "Notification permissions are introduced too early in the flow.",
      icon: Info,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    }
  ];

  return (
    <section id="missing" className="min-h-screen w-full bg-background flex border-b border-border">
      
      {/* Left: Canvas Preview Mock */}
      <div className="hidden lg:flex flex-1 border-r border-border bg-dot-grid relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80" />
        
        {/* Mock Abstract Flow */}
        <div className="relative w-full max-w-md aspect-square opacity-60">
           <div className="absolute top-1/4 left-1/4 w-32 h-40 bg-white border border-indigo-200 rounded shadow-sm" />
           <div className="absolute top-1/3 right-1/4 w-32 h-40 bg-white border border-rose-400 rounded shadow-sm ring-4 ring-rose-500/20" />
           <svg className="absolute inset-0 w-full h-full stroke-indigo-200" fill="none">
             <path d="M 180 180 L 250 200" strokeWidth="2" strokeDasharray="4 4" />
           </svg>
           {/* Highlight Pulse */}
           <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute top-1/3 right-1/4 w-32 h-40 bg-rose-500/10 rounded pointer-events-none"
           />
        </div>
      </div>

      {/* Right: Critique Panel */}
      <div className="flex-1 max-w-2xl flex flex-col h-screen">
        <div className="p-8 border-b border-border">
          <h2 className="text-2xl font-medium tracking-tight mb-2">Gap Analysis</h2>
          <p className="text-muted-foreground">The intelligence layer identified 5 potential issues in your current flow.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          {gaps.map((gap, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${gap.border} bg-background shadow-sm flex flex-col gap-4 relative overflow-hidden`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${gap.bg}`} />
              
              <div className="flex items-start gap-3 ml-2">
                <gap.icon className={`w-5 h-5 ${gap.color} mt-0.5 flex-shrink-0`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono font-medium uppercase tracking-wider ${gap.color}`}>
                      {gap.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-snug">{gap.text}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between ml-10 mt-2 pt-3 border-t border-border/50">
                <button className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  View in Canvas
                </button>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-medium px-3 py-1.5 rounded text-muted-foreground hover:bg-muted transition-colors">
                    Dismiss
                  </button>
                  <button className="text-xs font-medium px-3 py-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    Accept
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
