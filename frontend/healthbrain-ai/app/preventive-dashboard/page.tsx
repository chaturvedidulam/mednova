import { Droplets, Footprints, MoonStar, ShieldCheck, Sparkles, Stars, TrendingUp, UtensilsCrossed } from "lucide-react";
import { ModulePage } from "@/components/innovative/module-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const goals = [
  { title: "Hydration", current: 68, target: 100, icon: Droplets, color: "emerald" },
  { title: "Sleep", current: 72, target: 100, icon: MoonStar, color: "blue" },
  { title: "Walking", current: 58, target: 100, icon: Footprints, color: "amber" },
  { title: "Nutrition", current: 81, target: 100, icon: UtensilsCrossed, color: "violet" },
  { title: "Stress", current: 74, target: 100, icon: Sparkles, color: "emerald" },
];

export default function PreventiveDashboardPage() {
  return (
    <ModulePage
      eyebrow="Preventive healthcare dashboard"
      title="Focus on prevention before illness becomes urgent"
      description="This module shifts the experience toward daily goals, weekly progress, and long-term prevention for hydration, sleep, movement, nutrition, and stress."
      badges={["Goal-based", "Weekly progress", "Personalized"]}
      accent="emerald"
      primaryActionLabel="View weekly plan"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const progress = `${Math.round((goal.current / goal.target) * 100)}%`;
            return (
              <Card key={goal.title} className="rounded-[1.75rem]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{goal.title}</CardTitle>
                    <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: progress }} />
                  </div>
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>{goal.current}/{goal.target}</span>
                    <span className="font-semibold text-zinc-950 dark:text-zinc-100">{progress}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Weekly progress</CardTitle>
              <CardDescription>Motivating small steps that add up over time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-zinc-950 dark:text-zinc-100">Monthly improvement</p>
                  <Badge variant="secondary">+12%</Badge>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Hydration consistency improved across four weeks.</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-zinc-950 dark:text-zinc-100">Weekly streak</p>
                  <Badge>6 days</Badge>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">You are nearing your movement and sleep milestone.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <CardHeader>
              <CardTitle>Preventive insight</CardTitle>
              <CardDescription>Small behavioral changes now reduce chronic-risk later.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> Keep hydration steady to support kidney and metabolic balance.</div>
              <div className="flex items-start gap-2"><TrendingUp className="mt-0.5 h-4 w-4 text-blue-600" /> Continue walking after dinner to improve heart resilience.</div>
              <div className="flex items-start gap-2"><Stars className="mt-0.5 h-4 w-4 text-amber-600" /> A consistent sleep schedule can lower stress and improve daily energy.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModulePage>
  );
}
