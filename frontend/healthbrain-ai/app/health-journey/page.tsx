import { ArrowRight, Brain, HeartPulse, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import Link from "next/link";
import { ModulePage } from "@/components/innovative/module-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const journeySteps = [
  { title: "Baseline review", detail: "Understand current risk factors and vitals." },
  { title: "Action plan", detail: "Turn insights into daily and weekly guidance." },
  { title: "Long-term follow-up", detail: "Track progress across months and adjust care." },
];

export default function HealthJourneyPage() {
  return (
    <ModulePage
      eyebrow="AI health journey"
      title="A guided path from diagnosis to recovery"
      description="HealthBrain turns scattered health moments into an understandable journey with milestones, next steps, and supportive nudges."
      badges={["Milestone tracking", "Adaptive guidance", "Recovery support"]}
      accent="violet"
      primaryActionLabel="Start your journey"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[2rem] border-violet-200/70 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/20">
          <CardHeader>
            <CardTitle>Your current health story</CardTitle>
            <CardDescription>Clear checkpoints help users feel more in control.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-violet-200/70 bg-white/80 p-4 dark:border-violet-900/50 dark:bg-zinc-950/70">
              <HeartPulse className="h-5 w-5 text-rose-500" />
              <div>
                <p className="font-semibold text-zinc-950 dark:text-zinc-100">Heart risk trend</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Improving over the last 3 weeks.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-violet-200/70 bg-white/80 p-4 dark:border-violet-900/50 dark:bg-zinc-950/70">
              <Brain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-zinc-950 dark:text-zinc-100">Recovery mindset</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Progress reminders are being tuned around your habits.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Journey phases</CardTitle>
            <CardDescription>Structured support for every stage of care.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-sm font-semibold text-violet-600">{index + 1}</div>
                <div>
                  <p className="font-semibold text-zinc-950 dark:text-zinc-100">{step.title}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{step.detail}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> AI health journeys preserve continuity, even across different care providers.
              </div>
              <Link href="/innovations" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-600">
                Explore the full roadmap <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
