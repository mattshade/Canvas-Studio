export function CaseStudy() {
  return (
    <section id="case-study" className="min-h-screen w-full bg-[#0F0F10] text-[#F3F4F6] border-b border-[#27272A] py-32">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-24 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight">
            Structure should emerge from work, not precede it.
          </h2>
          <p className="text-xl text-[#A1A1AA] leading-relaxed">
            A case study on ambient intelligence in design tooling.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-24">
          
          {/* Section 1 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4D4D8] border-b border-[#27272A] pb-2">
              01. Design Challenge
            </h3>
            <p className="text-[#A1A1AA] leading-relaxed">
              Design tools are phenomenal for execution, but early product thinking remains messy, fragmented, and hard to structure. Ideas live in text files, flows live in boxes and arrows, and UI lives in frames. Connecting the "why" to the "what" requires immense manual overhead.
            </p>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4D4D8] border-b border-[#27272A] pb-2">
              02. Core Insight
            </h3>
            <p className="text-[#A1A1AA] leading-relaxed">
              Forcing designers into strict structures early kills creativity. Structure shouldn't come after the work as a cleanup task — it should emerge from it naturally. AI is uniquely positioned to surface structure from noise, allowing designers to stay in a flow state while maintaining systemic rigor.
            </p>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4D4D8] border-b border-[#27272A] pb-2">
              03. Systems Model
            </h3>
            <p className="text-[#A1A1AA] leading-relaxed">
              Canvas Intelligence introduces a unified object model. It connects raw ideas (notes), interface proposals (frames), user journeys (flows), team feedback (comments), and technical reality (components) into one visible system. Designers can reason about the entire product ecosystem, not just the current screen.
            </p>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4D4D8] border-b border-[#27272A] pb-2">
              04. Interaction Model
            </h3>
            <p className="text-[#A1A1AA] leading-relaxed">
              The intelligence is ambient — it never interrupts or dictates. It acts as a silent partner that surfaces gaps, suggests connective tissue, and identifies patterns. The interface relies on subtle indicators rather than aggressive modals. The designer retains total spatial and conceptual control.
            </p>
          </div>

          {/* Section 5 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4D4D8] border-b border-[#27272A] pb-2">
              05. Trust and Control
            </h3>
            <p className="text-[#A1A1AA] leading-relaxed">
              AI should not replace human judgment; it should illuminate blind spots. By making gaps, structural opportunities, and tradeoffs visible, it elevates the designer's ability to make informed decisions. Every suggestion is discrete, reviewable, and dismissible.
            </p>
          </div>

          {/* Section 6 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4D4D8] border-b border-[#27272A] pb-2">
              06. What This Demonstrates
            </h3>
            <p className="text-[#A1A1AA] leading-relaxed">
              This concept illustrates deep systems thinking applied to design tooling itself. It demonstrates comfort with complex interaction models, AI-native product design, and the ability to reason about collaboration, trust, and creative workflows at an enterprise scale.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
