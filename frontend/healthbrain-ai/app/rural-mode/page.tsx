import { Headphones, Languages, Mic, MoonStar, Signal, Smartphone, Volume2 } from "lucide-react";
import { ModulePage } from "@/components/innovative/module-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RuralModePage() {
  return (
    <ModulePage
      eyebrow="Rural healthcare mode"
      title="Care designed for simplicity, clarity, and offline readiness"
      description="This mode is intentionally simple for elderly and rural users: large buttons, accessible language, low-bandwidth visuals, and voice-first interaction cues."
      badges={["Large text", "Low bandwidth", "Offline ready"]}
      accent="amber"
      primaryActionLabel="Try voice guide"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="rounded-[2rem] border-amber-200/70 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle>Simple care interface</CardTitle>
            <CardDescription>Optimized for older adults and low-connectivity settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-amber-200/70 bg-white/80 p-4 dark:border-amber-900/50 dark:bg-zinc-950/70">
                <div className="mb-2 flex items-center gap-2 text-amber-600"><MoonStar className="h-4 w-4" /> Easy night mode</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Soft contrast for better readability at home or outdoors.</p>
              </div>
              <div className="rounded-2xl border border-amber-200/70 bg-white/80 p-4 dark:border-amber-900/50 dark:bg-zinc-950/70">
                <div className="mb-2 flex items-center gap-2 text-amber-600"><Signal className="h-4 w-4" /> Offline indicator</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">A visible signal showing when a lightweight mode is active.</p>
              </div>
              <div className="rounded-2xl border border-amber-200/70 bg-white/80 p-4 dark:border-amber-900/50 dark:bg-zinc-950/70">
                <div className="mb-2 flex items-center gap-2 text-amber-600"><Languages className="h-4 w-4" /> Regional language</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Switch between Hindi, Tamil, Bengali, and regional choices.</p>
              </div>
              <div className="rounded-2xl border border-amber-200/70 bg-white/80 p-4 dark:border-amber-900/50 dark:bg-zinc-950/70">
                <div className="mb-2 flex items-center gap-2 text-amber-600"><Volume2 className="h-4 w-4" /> Voice guidance</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Voice prompts guide the user through symptom entry and reminders.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Quick action panel</CardTitle>
            <CardDescription>Large touchpoints for essential care support.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="px-6">
                <Mic className="mr-2 h-4 w-4" /> Speak symptoms
              </Button>
              <Button size="lg" variant="outline">
                <Headphones className="mr-2 h-4 w-4" /> Audio support
              </Button>
            </div>
            <div className="rounded-[1.5rem] border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-zinc-950 dark:text-zinc-100">Connectivity status</p>
                <Badge variant="secondary">Low-bandwidth mode</Badge>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <Smartphone className="h-4 w-4 text-emerald-600" /> Data-saving interface active. Voice guidance will continue even when network is weak.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
