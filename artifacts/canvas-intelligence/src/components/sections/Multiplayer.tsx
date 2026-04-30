import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Sparkles } from "lucide-react";

const cursors = [
  {
    name: "Sarah",
    role: "Design",
    hex: "#6366F1",
    bg: "bg-indigo-500",
    border: "border-indigo-200",
    textColor: "text-indigo-900",
    path: { x: [120, 320, 260, 420], y: [110, 155, 310, 205] },
    duration: 14,
    comment: "This interaction needs a loading state between steps",
    commentDelay: 0.6,
  },
  {
    name: "David",
    role: "Product",
    hex: "#F59E0B",
    bg: "bg-amber-500",
    border: "border-amber-200",
    textColor: "text-amber-900",
    path: { x: [610, 700, 500, 640], y: [400, 250, 110, 155] },
    duration: 17,
    comment: "Can we reduce steps 3–4 into one? Activation drops here.",
    commentDelay: 1.2,
  },
  {
    name: "Alex",
    role: "Eng",
    hex: "#10B981",
    bg: "bg-emerald-500",
    border: "border-emerald-200",
    textColor: "text-emerald-900",
    path: { x: [800, 620, 850, 740], y: [110, 355, 395, 250] },
    duration: 19,
    comment: "SSO integration adds 2 weeks. Can we phase this?",
    commentDelay: 1.8,
  },
];

export function Multiplayer() {
  return (
    <section id="multiplayer" className="min-h-screen w-full bg-dot-grid border-b border-border py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-medium tracking-tight mb-4">Multiplayer Thinking</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Collaboration isn't just cursors. Canvas Intelligence brings design, product, engineering, and AI into one coherent spatial context — each perspective anchored to the same frame.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full h-[600px] max-w-6xl mx-auto">

        {/* Mock canvas */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[360px] border border-border bg-background/70 backdrop-blur-sm rounded-xl shadow-sm flex items-center justify-center gap-8 px-10">
          <div className="flex gap-6">
            {["Welcome", "Identity Verify", "Bank Connect"].map((label) => (
              <div key={label} className="w-44 h-64 bg-muted/10 border border-border rounded-lg flex flex-col">
                <div className="h-7 border-b border-border bg-muted/20 flex items-center px-3">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
                </div>
                <div className="flex-1 p-3 flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted/40 mx-auto mt-2" />
                  <div className="w-full h-2 bg-muted/30 rounded-full" />
                  <div className="w-3/4 h-2 bg-muted/30 rounded-full" />
                  <div className="w-full h-7 bg-primary/10 border border-primary/10 rounded mt-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Human cursors */}
        {cursors.map((cursor) => (
          <motion.div
            key={cursor.name}
            className="absolute z-20 pointer-events-none"
            animate={{ x: cursor.path.x, y: cursor.path.y }}
            transition={{ duration: cursor.duration, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <MousePointer2 className="w-5 h-5 -rotate-12" style={{ color: cursor.hex, fill: cursor.hex }} />
              <div className={`absolute top-5 left-4 ${cursor.bg} text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap`}>
                {cursor.name} · {cursor.role}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: cursor.commentDelay, duration: 0.35 }}
                className={`absolute top-11 left-4 bg-white ${cursor.border} border ${cursor.textColor} text-xs p-2.5 rounded-lg rounded-tl-none shadow-md w-52 leading-snug`}
              >
                {cursor.comment}
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* AI cursor */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          animate={{ x: [410, 215, 460, 360], y: [490, 395, 260, 450] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="w-5 h-5 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-500" />
            </div>
            <div className="absolute top-5 left-4 bg-violet-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Intelligence
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.35 }}
              className="absolute top-11 left-4 bg-white border border-violet-200 text-violet-900 text-xs p-2.5 rounded-lg rounded-tl-none shadow-md w-56 leading-snug"
            >
              3 edge cases unaddressed: network failure, expired session, partial data.
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
