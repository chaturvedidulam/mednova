import { BookOpen, BrainCircuit, Headphones, Lightbulb, Sparkles } from "lucide-react";
import { ModulePage } from "@/components/innovative/module-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topics = [
  { title: "Understanding test reports", description: "Simple language guidance for lab values and next steps." },
  { title: "How to manage medicines", description: "Turn complex regimens into manageable routines." },
  { title: "When to seek care", description: "Know what symptoms deserve immediate attention." },
];

export default function HealthLiteracyPage() {
  return (
    <ModulePage
      eyebrow="Health literacy center"
      title="Make healthcare easy to understand"
      description="A dedicated knowledge hub that translates medical information into culturally relevant, easy-to-follow guidance for everyday users."
      badges={["Plain language", "Audio support", "Friendly guidance"]}
      accent="blue"
      primaryActionLabel="Open learning hub"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[2rem] border-cyan-200/70 bg-cyan-50/70 dark:border-cyan-900/50 dark:bg-cyan-950/20">
          <CardHeader>
            <CardTitle>What people are learning today</CardTitle>
            <CardDescription>Short lessons and explainers built for confidence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topics.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-cyan-200/70 bg-white/80 p-4 dark:border-cyan-900/50 dark:bg-zinc-950/70">
                <div className="flex items-center gap-2 text-cyan-600"><BookOpen className="h-4 w-4" /> <p className="font-semibold text-zinc-950 dark:text-zinc-100">{topic.title}</p></div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{topic.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Learning modes</CardTitle>
              <CardDescription>Support for visual, audio, and text learners.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                <Headphones className="h-4 w-4 text-emerald-600" /> Audio explainers for low-literacy support.
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                <BrainCircuit className="h-4 w-4 text-violet-600" /> Personalized learning suggestions based on recent activity.
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                <Lightbulb className="h-4 w-4 text-amber-600" /> Quick reminders on what matters most this week.
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-cyan-200/70 bg-cyan-50/70 dark:border-cyan-900/50 dark:bg-cyan-950/20">
            <CardHeader>
              <CardTitle>Knowledge confidence</CardTitle>
              <CardDescription>Build health confidence over time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-950 dark:text-zinc-100">Weekly literacy score</span>
                <Badge>82%</Badge>
              </div>
              <Button className="w-full"><Sparkles className="mr-2 h-4 w-4" /> Continue learning</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModulePage>
  );
}
