import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, Columns, Users, LayoutTemplate, BookOpen, PenTool } from "lucide-react";
import { LoginModal, TryModal } from "@/components/AuthModals";
import { useCanvas } from "@/contexts/CanvasContext";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [tryOpen, setTryOpen] = useState(false);
  const { openCanvas } = useCanvas();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when a modal is open
  useEffect(() => {
    document.body.style.overflow = loginOpen || tryOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loginOpen, tryOpen]);

  const navItems = [
    { id: "canvas", label: "Canvas", icon: Map },
    { id: "missing", label: "Gaps", icon: Search },
    { id: "flow", label: "Flow", icon: Columns },
    { id: "diff", label: "Diff", icon: PenTool },
    { id: "multiplayer", label: "Multiplayer", icon: Users },
    { id: "system", label: "System", icon: LayoutTemplate },
    { id: "case-study", label: "Case Study", icon: BookOpen },
    { id: "design-system", label: "Design System", icon: LayoutTemplate },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent ${
          scrolled ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="relative w-7 h-7 flex items-center justify-center">
              {/* Base Canvas Square */}
              <div className="absolute inset-0 border-[1.5px] border-foreground/10 rounded-md rotate-[-6deg] transition-transform group-hover:rotate-0" />
              {/* Intelligence Layer Square */}
              <div className="absolute inset-0 bg-primary/10 border-[1.5px] border-primary/30 rounded-md rotate-[6deg] backdrop-blur-[1px] transition-transform group-hover:rotate-0 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
              </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-bold tracking-tight text-sm uppercase">Canvas</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em]">Studio</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/sandbox"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sandbox
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setLoginOpen(true)}
              className="text-xs font-medium px-3 py-1.5 rounded-md hover:bg-muted transition-colors"
            >
              Log in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTryOpen(true)}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              Try for free
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {loginOpen && (
          <LoginModal
            onClose={() => setLoginOpen(false)}
            onOpenCanvas={(intent) => { setLoginOpen(false); openCanvas(intent); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tryOpen && (
          <TryModal
            onClose={() => setTryOpen(false)}
            onOpenCanvas={(intent) => { setTryOpen(false); openCanvas(intent); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
