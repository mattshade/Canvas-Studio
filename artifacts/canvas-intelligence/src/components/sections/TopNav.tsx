import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, Columns, Users, LayoutTemplate, BookOpen, PenTool } from "lucide-react";

export function TopNav() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <span className="font-medium tracking-tight text-sm">Canvas Intelligence</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          <button className="text-xs font-medium px-3 py-1.5 rounded-md hover:bg-muted transition-colors">
            Log in
          </button>
          <button className="text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            Try for free
          </button>
        </div>
      </div>
    </header>
  );
}
