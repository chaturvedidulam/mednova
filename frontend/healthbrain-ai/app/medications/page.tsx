import Link from "next/link";
import { CalendarRange, Clock3, Pill, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const medicines = [
  { name: "Metformin", time: "08:00", dose: "500mg", frequency: "Daily" },
  { name: "Vitamin D3", time: "12:30", dose: "1000 IU", frequency: "Daily" },
  { name: "Lisinopril", time: "20:00", dose: "10mg", frequency: "Daily" },
];

const schedule = [
  { day: "Mon", status: "On track" },
  { day: "Tue", status: "On track" },
  { day: "Wed", status: "Needs reminder" },
  { day: "Thu", status: "On track" },
  { day: "Fri", status: "On track" },
];

export default function MedicationsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Medication scheduler</p>
            <h1 className="mt-2 text-3xl font-semibold">Stay on top of each dose</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Medicine list</CardTitle>
              <CardDescription>Your active treatment plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {medicines.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600"><Pill className="h-4 w-4" /></div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-zinc-500">{item.dose} · {item.frequency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-950 dark:text-zinc-100">{item.time}</p>
                    <Badge className="mt-2">Scheduled</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Daily timeline</CardTitle>
                <CardDescription>Upcoming reminders for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Morning dose", time: "08:00 AM" },
                  { label: "Midday support", time: "12:30 PM" },
                  { label: "Evening dose", time: "08:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-sm text-zinc-500">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Weekly adherence snapshot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {schedule.map((item) => (
                  <div key={item.day} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                    <div className="flex items-center gap-2"><CalendarRange className="h-4 w-4 text-emerald-600" /> <span className="font-medium">{item.day}</span></div>
                    <Badge variant={item.status === "On track" ? "default" : "secondary"}>{item.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
