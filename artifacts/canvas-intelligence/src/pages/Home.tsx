import { TopNav } from "@/components/sections/TopNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { InteractiveCanvas } from "@/components/sections/InteractiveCanvas";
import { MissingPanel } from "@/components/sections/MissingPanel";
import { FlowStitching } from "@/components/sections/FlowStitching";
import { DesignDiff } from "@/components/sections/DesignDiff";
import { Multiplayer } from "@/components/sections/Multiplayer";
import { SystemAwareness } from "@/components/sections/SystemAwareness";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { DesignSystemDoc } from "@/components/sections/DesignSystemDoc";
import { CanvasProvider } from "@/contexts/CanvasContext";

export function Home() {
  return (
    <CanvasProvider>
      <div className="w-full min-h-screen bg-background">
        <TopNav />
        <main>
          <HeroSection />
          <InteractiveCanvas />
          <MissingPanel />
          <FlowStitching />
          <DesignDiff />
          <Multiplayer />
          <SystemAwareness />
          <CaseStudy />
          <DesignSystemDoc />
        </main>
      </div>
    </CanvasProvider>
  );
}
