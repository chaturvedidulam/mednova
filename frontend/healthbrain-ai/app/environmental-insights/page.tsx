import { CloudRain, Droplets, Leaf, ShieldCheck, SunMedium, Wind } from "lucide-react";
import { ModulePage } from "@/components/innovative/module-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const insights = [
  { label: "Air quality", value: "Good", detail: "Low pollen burden today" },
  { label: "UV index", value: "Moderate", detail: "Use sunscreen during noon" },
  { label: "Humidity", value: "High", detail: "Hydration reminder active" },
];

export default function EnvironmentalInsightsPage() {
  return (
    <ModulePage
      eyebrow="Environmental health insights"
      title="Link daily environment conditions to personal well-being"
      description="Connect air quality, weather, pollen, and UV data with health plans so users can make safer decisions in real time."
      badges={["Weather-aware", "Lifestyle linked", "Actionable"]}
      accent="emerald"
      primaryActionLabel="View environmental alerts"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[2rem] border-green-200/70 bg-green-50/70 dark:border-green-900/50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle>Today’s environmental snapshot</CardTitle>
            <CardDescription>Conditions that influence comfort, breathing, and outdoor plans.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {insights.map((insight) => (
              <div key={insight.label} className="rounded-2xl border border-green-200/70 bg-white/80 p-4 dark:border-green-900/50 dark:bg-zinc-950/70">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-zinc-950 dark:text-zinc-100">{insight.label}</p>
                  <Badge variant="secondary">{insight.value}</Badge>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{insight.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Wellness guidance</CardTitle>
              <CardDescription>Personalized recommendations based on nearby environmental shifts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70"><CloudRain className="h-4 w-4 text-blue-600" /> Rain is expected later; keep inhalers and umbrellas ready.</div>
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70"><SunMedium className="h-4 w-4 text-amber-600" /> Midday sun is bright; a shade break can help reduce strain.</div>
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70"><Wind className="h-4 w-4 text-cyan-600" /> High breeze may trigger dryness; hydration is recommended.</div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-green-200/70 bg-green-50/70 dark:border-green-900/50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle>Nature and health</CardTitle>
              <CardDescription>Simple reminders that connect climate to self-care.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex items-start gap-2"><Leaf className="mt-0.5 h-4 w-4 text-green-600" /> Cleaner air and moderate sun often improve outdoor activity comfort.</div>
              <div className="flex items-start gap-2"><Droplets className="mt-0.5 h-4 w-4 text-cyan-600" /> High humidity can increase dehydration risk if fluid intake drops.</div>
              <div className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> Environmental intelligence should support, not overwhelm, the care routine.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModulePage>
  );
}
