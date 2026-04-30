import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-14 border-b border-border/50">
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col items-start max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-3 h-3 text-violet-500" />
            <span className="text-[11px] font-medium tracking-wide uppercase text-muted-foreground">A thinking layer for the canvas</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-medium tracking-tight leading-[1.05] text-foreground mb-6"
          >
            The canvas should help you think.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg"
          >
            Canvas Intelligence turns scattered ideas, frames, and notes into structured flows, system maps, and design decisions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <a href="#canvas" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-primary/90 transition-all hover:shadow-md">
              Explore the Canvas
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#case-study" className="flex items-center gap-2 bg-transparent border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/50 transition-all">
              View Case Study
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 flex flex-wrap gap-3"
          >
            <div className="text-xs px-2.5 py-1 rounded-md border border-border/50 text-muted-foreground bg-muted/20">Not an AI UI generator</div>
            <div className="text-xs px-2.5 py-1 rounded-md border border-border/50 text-muted-foreground bg-muted/20">Bridges product thinking + systems craft</div>
          </motion.div>
        </div>
        
        <div className="relative h-[500px] w-full hidden lg:block">
          {mounted && (
            <div className="absolute inset-0 w-full h-full perspective-1000">
              <motion.div 
                className="relative w-full h-full transform-style-3d"
                initial={{ rotateX: 10, rotateY: -10 }}
                animate={{ rotateX: [10, 5, 10], rotateY: [-10, -5, -10] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Simulated Canvas Objects in Hero */}
                <motion.div 
                  className="absolute top-20 left-10 w-48 h-32 bg-yellow-50 border border-yellow-200/50 shadow-sm p-4 rotate-[-3deg]"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm font-medium text-amber-900/80 leading-relaxed font-mono">Trust is earned, not assumed</p>
                </motion.div>
                
                <motion.div 
                  className="absolute top-40 right-10 w-56 h-40 bg-white border border-indigo-200 shadow-md p-4 rounded-md"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-[10px] font-mono text-indigo-500 mb-2 font-medium uppercase tracking-wider">Frame / Onboarding</div>
                  <div className="w-full h-2 bg-muted rounded-full mb-2" />
                  <div className="w-3/4 h-2 bg-muted rounded-full mb-6" />
                  <div className="w-full h-8 bg-indigo-50 border border-indigo-100 rounded flex items-center justify-center">
                    <span className="text-xs text-indigo-700 font-medium">Continue</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-20 left-32 w-64 p-3 bg-violet-50 border border-violet-200 shadow-sm rounded-md flex items-start gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-violet-900 font-medium leading-snug">Consider adding a trust explanation before requesting SSN</p>
                </motion.div>
                
                {/* Connecting lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-border/80" fill="none">
                  <motion.path 
                    d="M 190 140 C 250 140, 250 200, 310 200" 
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </svg>
              </motion.div>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
}
