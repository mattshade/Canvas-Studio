import { motion } from "framer-motion";
import { MousePointer2, Plus, Share2 } from "lucide-react";

export default function ExampleCanvas() {
  return (
    <div className="w-full aspect-video bg-muted/20 rounded-2xl border border-border border-dashed flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm">
          <Plus className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm">
          <Share2 className="w-4 h-4" />
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-background border border-border rounded-xl shadow-xl max-w-sm text-center z-10"
      >
        <h3 className="text-lg font-semibold mb-2">Interactive Intelligence</h3>
        <p className="text-sm text-muted-foreground mb-6">
          This is a preview of the Canvas Studio's intelligence layer. 
          Components here are rendered in isolation.
        </p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Explore Layer
        </button>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              x: [Math.random() * 500, Math.random() * 500],
              y: [Math.random() * 300, Math.random() * 300]
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
            className="absolute w-24 h-24 bg-primary/5 rounded-full blur-3xl"
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-medium bg-background/50 backdrop-blur-sm px-2 py-1 rounded border border-border/50">
        <MousePointer2 className="w-3 h-3" />
        Canvas Preview Mode
      </div>
    </div>
  );
}
