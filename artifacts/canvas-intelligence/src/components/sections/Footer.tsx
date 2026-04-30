import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const links = [
  { label: "Canvas", href: "#canvas" },
  { label: "Gap Analysis", href: "#missing" },
  { label: "Flow Stitching", href: "#flow" },
  { label: "Design Diff", href: "#diff" },
  { label: "Multiplayer", href: "#multiplayer" },
  { label: "System Awareness", href: "#system" },
  { label: "Case Study", href: "#case-study" },
  { label: "Design System", href: "#design-system" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#0F0F10] text-[#A1A1AA] border-t border-[#27272A]">

      {/* Final CTA band */}
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#27272A] bg-[#1A1A1B]">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-[11px] font-medium tracking-wide uppercase text-[#71717A]">Portfolio project</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#F4F4F5] leading-tight max-w-2xl">
            Built to show how design thinking can be a product.
          </h2>

          <p className="text-[#71717A] text-lg max-w-lg leading-relaxed">
            Canvas Intelligence is a speculative design concept exploring AI-native collaboration tools. Every interaction is intentional; no screen is a dead end.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <a
              href="#canvas"
              className="flex items-center gap-2 bg-white text-[#0F0F10] px-6 py-3 rounded-lg font-medium hover:bg-[#F4F4F5] transition-colors shadow-sm"
            >
              Explore the canvas
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#case-study"
              className="flex items-center gap-2 border border-[#27272A] text-[#A1A1AA] px-6 py-3 rounded-lg font-medium hover:border-[#3F3F46] hover:text-[#D4D4D8] transition-colors"
            >
              Read the case study
            </a>
          </div>
        </motion.div>
      </div>

      {/* Nav + attribution */}
      <div className="border-t border-[#1F1F21] max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-[#D4D4D8]">Canvas Intelligence</span>
            <span className="text-[#3F3F46] text-xs ml-2">A design portfolio concept</span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-[#52525B] hover:text-[#A1A1AA] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

        </div>
      </div>

    </footer>
  );
}
