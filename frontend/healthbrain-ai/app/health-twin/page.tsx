"use client";

import { Activity, AlertTriangle, HeartPulse, Microscope, Scale, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts";
import { ModulePage, ModuleSection } from "@/components/innovative/module-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const trendData = [
  { month: "Jan", heart: 72, kidney: 91, liver: 88, diabetes: 104, pressure: 124 },
  { month: "Feb", heart: 74, kidney: 90, liver: 86, diabetes: 108, pressure: 126 },
  { month: "Mar", heart: 73, kidney: 89, liver: 85, diabetes: 110, pressure: 123 },
  { month: "Apr", heart: 71, kidney: 88, liver: 84, diabetes: 106, pressure: 121 },
  { month: "May", heart: 70, kidney: 87, liver: 83, diabetes: 105, pressure: 120 },
];

const biometrics = [
  { name: "Heart Health", value: "Stable", detail: "Pulse trend improving" },
  { name: "Kidney Health", value: "Good", detail: "Hydration support effective" },
  { name: "Liver Health", value: "Watch", detail: "Moderate fatty liver indicators" },
  { name: "Diabetes Risk", value: "Moderate", detail: "Meal timing improving" },
];

export default function HealthTwinPage() {
  return (
    <ModulePage
      eyebrow="AI Health Twin"
      title="A living digital profile of your long-term wellbeing"
      description="Instead of only tracking today's metrics, this experience builds a virtual health twin with trend-aware insights for heart, kidneys, liver, blood pressure, BMI, weight, and hemoglobin."
      badges={["Long-term", "Trend-aware", "Predictive"]}
      accent="violet"
      primaryActionLabel="See AI insights"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <ModuleSection title="Longitudinal health profile" description="A multi-metric view of health over the last five months.">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="heart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="pressure" stroke="#10b981" fill="url(#heart)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ModuleSection>

          <ModuleSection title="Core biomarkers" description="Weekly updates are projected into a virtual twin model.">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="heart" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="diabetes" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ModuleSection>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Health twin summary</CardTitle>
              <CardDescription>AI insights based on a longer-term trend view.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {biometrics.map((item) => (
                <div key={item.name} className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-zinc-950 dark:text-zinc-100">{item.name}</p>
                    <Badge variant="secondary">{item.value}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-amber-200/70 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle>AI insight</CardTitle>
              <CardDescription>Long-term prediction from your digital twin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex items-start gap-2">
                <TrendingUp className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>Your cardiovascular profile is trending positively, with a modest improvement in resting heart rate and blood pressure.</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
                <span>Hemoglobin remains slightly below target, suggesting a need to revisit iron intake and sleep consistency.</span>
              </div>
              <div className="flex items-start gap-2">
                <Activity className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>Weight and BMI are holding steady, which is encouraging for long-term metabolic control.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModulePage>
  );
}
