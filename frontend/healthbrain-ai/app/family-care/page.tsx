import { Activity, CalendarDays, HeartPulse, Pill, ShieldCheck } from "lucide-react";
import { ModulePage } from "@/components/innovative/module-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const familyMembers = [
  { name: "Maya", role: "Self", score: 87, report: "CBC reviewed", meds: "On track", risk: "Low" },
  { name: "Noah", role: "Brother", score: 76, report: "Follow-up needed", meds: "Due", risk: "Moderate" },
  { name: "Aunt Lina", role: "Family", score: 81, report: "Vitals stable", meds: "On track", risk: "Low" },
];

export default function FamilyCarePage() {
  return (
    <ModulePage
      eyebrow="Family care dashboard"
      title="One shared view for the whole household"
      description="Coordinate care for multiple family members with a single, interactive dashboard for scores, medicine adherence, recent reports, and appointments."
      badges={["Multi-member", "Shared insights", "Home care"]}
      accent="blue"
      primaryActionLabel="Create family plan"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4">
          {familyMembers.map((member) => (
            <Card key={member.name} className="rounded-[1.75rem]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                  <Badge variant="secondary">Score {member.score}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-2 text-sm text-zinc-500"><HeartPulse className="h-4 w-4 text-emerald-600" /> Latest report</div>
                  <p className="mt-2 font-semibold text-zinc-950 dark:text-zinc-100">{member.report}</p>
                </div>
                <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-2 text-sm text-zinc-500"><Pill className="h-4 w-4 text-blue-600" /> Medicine status</div>
                  <p className="mt-2 font-semibold text-zinc-950 dark:text-zinc-100">{member.meds}</p>
                </div>
                <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-2 text-sm text-zinc-500"><CalendarDays className="h-4 w-4 text-amber-600" /> Appointments</div>
                  <p className="mt-2 font-semibold text-zinc-950 dark:text-zinc-100">Tomorrow · 09:30</p>
                </div>
                <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-2 text-sm text-zinc-500"><Activity className="h-4 w-4 text-violet-600" /> Risk indicators</div>
                  <p className="mt-2 font-semibold text-zinc-950 dark:text-zinc-100">{member.risk}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Shared family insight</CardTitle>
            <CardDescription>Highlights the most important care dependencies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
              <div className="flex items-center gap-2 text-emerald-600"><ShieldCheck className="h-4 w-4" /> Care coordination is strongest when medication and appointments stay visible.</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">This dashboard makes it easy to spot who needs attention and what support is due.</p>
            </div>
            <Button className="w-full">Share family overview</Button>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
