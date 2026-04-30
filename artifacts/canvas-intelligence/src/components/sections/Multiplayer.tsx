import { motion } from "framer-motion";
import { MousePointer2, Sparkles } from "lucide-react";

export function Multiplayer() {
  return (
    <section id="multiplayer" className="min-h-screen w-full bg-dot-grid border-b border-border py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 mb-16 text-center relative z-10">
        <h2 className="text-3xl font-medium tracking-tight mb-4">Multiplayer Thinking</h2>
        <p className="text-lg text-muted-foreground">
          Collaboration isn't just cursors moving. It's integrating perspectives from design, product, engineering, and artificial intelligence in real-time.
        </p>
      </div>

      <div className="relative w-full h-[600px] max-w-6xl mx-auto">
        
        {/* Mock Canvas Content underneath */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border border-border bg-background rounded-lg shadow-sm opacity-50 flex items-center justify-center">
           <div className="flex gap-8">
             <div className="w-40 h-64 bg-muted/20 border border-border rounded" />
             <div className="w-40 h-64 bg-muted/20 border border-border rounded" />
             <div className="w-40 h-64 bg-muted/20 border border-border rounded" />
           </div>
        </div>

        {/* Cursor: Designer */}
        <motion.div
          className="absolute z-20"
          animate={{
            x: [100, 300, 250, 400],
            y: [100, 150, 300, 200],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <MousePointer2 className="w-5 h-5 text-indigo-500 fill-indigo-500 -rotate-12" />
            <div className="absolute top-5 left-4 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap">
              Sarah (Design)
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
              className="absolute top-10 left-4 bg-white border border-indigo-200 text-indigo-900 text-xs p-2 rounded shadow-md w-48 rounded-tl-none"
            >
              This interaction needs a loading state between steps
            </motion.div>
          </div>
        </motion.div>

        {/* Cursor: PM */}
        <motion.div
          className="absolute z-20"
          animate={{
            x: [600, 700, 500, 650],
            y: [400, 250, 100, 150],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="relative">
            <MousePointer2 className="w-5 h-5 text-amber-500 fill-amber-500 -rotate-12" />
            <div className="absolute top-5 left-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap">
              David (Product)
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 5 }}
              className="absolute top-10 left-4 bg-white border border-amber-200 text-amber-900 text-xs p-2 rounded shadow-md w-48 rounded-tl-none"
            >
              Can we reduce steps 3-4 into one? Activation drops here.
            </motion.div>
          </div>
        </motion.div>

        {/* Cursor: Engineer */}
        <motion.div
          className="absolute z-20"
          animate={{
            x: [800, 600, 850, 750],
            y: [100, 350, 400, 250],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="relative">
            <MousePointer2 className="w-5 h-5 text-emerald-500 fill-emerald-500 -rotate-12" />
            <div className="absolute top-5 left-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap">
              Alex (Eng)
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 8 }}
              className="absolute top-10 left-4 bg-white border border-emerald-200 text-emerald-900 text-xs p-2 rounded shadow-md w-48 rounded-tl-none"
            >
              SSO integration adds 2 weeks. Can we phase this?
            </motion.div>
          </div>
        </motion.div>

        {/* Cursor: AI */}
        <motion.div
          className="absolute z-20"
          animate={{
            x: [400, 200, 450, 350],
            y: [500, 400, 250, 450],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <div className="relative">
            <div className="w-5 h-5 relative flex items-center justify-center -rotate-12">
              <Sparkles className="w-4 h-4 text-violet-500 absolute" />
            </div>
            <div className="absolute top-5 left-4 bg-violet-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap flex items-center gap-1">
              Intelligence
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 10 }}
              className="absolute top-10 left-4 bg-white border border-violet-200 text-violet-900 text-xs p-2 rounded shadow-md w-56 rounded-tl-none"
            >
              3 edge cases unaddressed: network failure, expired session, partial data.
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
