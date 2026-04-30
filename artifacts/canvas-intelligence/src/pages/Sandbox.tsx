import { useEffect, useState, type ComponentType } from "react";
import { modules as discoveredModules } from "../.generated/mockup-components";
import { TopNav } from "@/components/sections/TopNav";
import { Footer } from "@/components/sections/Footer";
import { useLocation } from "wouter";
import { CanvasProvider } from "@/contexts/CanvasContext";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }

      try {
        const mod = await loader();
        if (cancelled) {
          return;
        }
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) {
          return;
        }

        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();

    return () => {
      cancelled = true;
    };
  }, [componentPath, modules]);

  if (error) {
    return (
      <div className="p-8 mt-20">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <h2 className="text-destructive font-semibold mb-2">Preview Error</h2>
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {error}
          </pre>
        </div>
      </div>
    );
  }

  if (!Component) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="w-full min-h-screen pt-20 px-6 pb-20">
       <div className="max-w-7xl mx-auto">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
             <div className="border-b border-border bg-muted/30 px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{componentPath}</span>
             </div>
             <div className="p-8">
                <Component />
             </div>
          </div>
       </div>
    </div>
  );
}


export function Sandbox() {
  const [location] = useLocation();
  const previewMatch = location.match(/^\/sandbox\/(.+)$/);
  const componentPath = previewMatch ? previewMatch[1] : null;

  return (
    <CanvasProvider>
      <div className="w-full min-h-screen bg-background flex flex-col">
        <TopNav />
        <main className="flex-grow">
          {componentPath ? (
            <PreviewRenderer
              componentPath={componentPath}
              modules={discoveredModules}
            />
          ) : (
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Component Sandbox</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore and preview individual components in isolation. Add new components to 
                  <code className="bg-muted px-1.5 py-0.5 rounded mx-1 text-foreground">src/components/mockups</code> to see them here.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {Object.keys(discoveredModules).length === 0 ? (
                    <div className="col-span-full border border-dashed border-border rounded-2xl p-12 text-center">
                      <p className="text-muted-foreground mb-4">No mockup components found yet.</p>
                      <p className="text-sm text-muted-foreground">
                        Start by creating a file in <code className="bg-muted px-1 py-0.5 rounded">src/components/mockups/Example.tsx</code>
                      </p>
                    </div>
                 ) : (
                    Object.keys(discoveredModules).map((key) => {
                      const name = key.replace('./components/mockups/', '').replace('.tsx', '');
                      return (
                        <a
                          key={key}
                          href={`/sandbox/${name}`}
                          className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all"
                        >
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Preview component</p>
                        </a>
                      );
                    })
                 )}
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </CanvasProvider>
  );
}
