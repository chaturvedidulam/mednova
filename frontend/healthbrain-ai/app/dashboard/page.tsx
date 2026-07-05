"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Bell, CalendarDays, FileText, HeartPulse, Pill, Sparkles, TrendingUp, ArrowRight, PlusCircle, Stethoscope, ShieldCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { getDashboardSummary, getHealthTrends, getTimeline, getReports, MedicalReport } from "@/services/api";

const defaultHealthTrend = [
  { name: "Mon", score: 78 },
  { name: "Tue", score: 82 },
  { name: "Wed", score: 79 },
  { name: "Thu", score: 85 },
  { name: "Fri", score: 87 },
  { name: "Sat", score: 88 },
  { name: "Sun", score: 90 },
];

const adherence = [
  { name: "Mon", value: 92 },
  { name: "Tue", value: 88 },
  { name: "Wed", value: 95 },
  { name: "Thu", value: 90 },
  { name: "Fri", value: 97 },
  { name: "Sat", value: 94 },
  { name: "Sun", value: 96 },
];

const medications = [
  { name: "Metformin", time: "08:00", dosage: "500mg", status: "Taken" },
  { name: "Vitamin D3", time: "12:30", dosage: "1000 IU", status: "Due" },
  { name: "Lisinopril", time: "20:00", dosage: "10mg", status: "Taken" },
];

const appointments = [
  { name: "Dr. Elena Mendez", specialty: "Cardiology", time: "Tomorrow · 09:30" },
  { name: "Care Team", specialty: "Nutrition", time: "Friday · 13:00" },
];

export default function DashboardPage() {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [dashboardData, setDashboardData] = useState<{
    healthScore: number;
    insightTitle: string;
    insightSummary: string;
    completed: number;
  } | null>(null);
  const [healthTrendData, setHealthTrendData] = useState<{ name: string; score: number }[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getReports(),
      getDashboardSummary(),
      getHealthTrends(),
      getTimeline()
    ])
      .then(([allReports, summary, trends, timeline]) => {
        setReports(allReports);
        setDashboardData(summary.data);
        setHealthTrendData(trends.data);
        setTimelineData(timeline.data.slice(0, 3)); // show top 3 on dashboard
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-10 text-sm font-medium text-zinc-500">
        Loading dashboard...
      </div>
    );
  }

  const latestReport = reports[0];
  const totalReportsCount = reports.length;
  const completedAnalysesCount = reports.filter((r) => r.analysis_status === "completed").length;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-zinc-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/75 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Care dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Good evening, Maya</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              {latestReport 
                ? "Your care plan is trending positively. HealthBrain AI highlights a stable day and a few personalized actions based on your reports."
                : "Welcome! Upload your medical reports or labs to generate clinical AI insights and track metrics over time."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" /> Alerts
            </Button>
            <Button asChild>
              <Link href="/upload">
                <PlusCircle className="mr-2 h-4 w-4" /> Upload report
              </Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="h-full rounded-[2rem] border-emerald-200/70 bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Care Overview</p>
                    <p className="mt-3 text-2xl font-semibold">Maya's Metrics</p>
                  </div>
                  <div className="rounded-2xl bg-white/15 p-3">
                    <HeartPulse className="h-7 w-7" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-emerald-100 text-xs font-medium uppercase">Total Reports</p>
                    <p className="text-2xl font-bold mt-1">{totalReportsCount}</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3">
                    <p className="text-emerald-100 text-xs font-medium uppercase">Completed Analyses</p>
                    <p className="text-2xl font-bold mt-1">{completedAnalysesCount}</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3 col-span-2">
                    <p className="text-emerald-100 text-xs font-medium uppercase">Latest Upload Date</p>
                    <p className="text-base font-semibold mt-1">
                      {latestReport 
                        ? new Date(latestReport.uploaded_at).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) 
                        : "No reports uploaded"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <Card className="h-full rounded-[2rem]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI Insights & Recommendations</CardTitle>
                    <CardDescription>Personalized details from your latest report</CardDescription>
                  </div>
                  <Badge variant="secondary"><Sparkles className="mr-1 h-3.5 w-3.5" /> live</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {latestReport ? (
                  <>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                      <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                        <span className="text-xs text-zinc-500 font-medium block">LATEST REPORT</span>
                        <span className="font-semibold text-zinc-950 dark:text-zinc-100 block truncate mt-1">
                          {latestReport.file_name}
                        </span>
                      </div>
                      <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                        <span className="text-xs text-zinc-500 font-medium block">SEVERITY PRIORITY</span>
                        <Badge 
                          className="mt-1" 
                          variant="secondary"
                        >
                          {latestReport.analysis?.severity?.toUpperCase() || "UNKNOWN"}
                        </Badge>
                      </div>
                      {latestReport.analysis?.recommended_specialist && (
                        <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70 col-span-2">
                          <span className="text-xs text-zinc-500 font-medium block">RECOMMENDED SPECIALIST</span>
                          <span className="font-semibold text-zinc-950 dark:text-zinc-100 block mt-1">
                            {latestReport.analysis.recommended_specialist}
                          </span>
                        </div>
                      )}
                    </div>
                    {latestReport.analysis_status === "completed" ? (
                      <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300">
                        <div className="flex items-center gap-2 font-semibold">
                          <ShieldCheck className="h-4 w-4" /> AI Summary Guidance
                        </div>
                        <p className="mt-2 leading-7">{latestReport.analysis?.summary}</p>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                        <div className="flex items-center gap-2 font-semibold text-red-800 dark:text-red-400">
                          <AlertTriangle className="h-4 w-4 text-red-500" /> AI Summary Unavailable
                        </div>
                        <p className="mt-2 leading-7">
                          {latestReport.analysis?.message || "AI Analysis was not generated successfully for this document."}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/30 dark:text-zinc-400">
                    <div className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-zinc-100">
                      <Sparkles className="h-4 w-4 text-zinc-500" /> Get Started
                    </div>
                    <p className="mt-2 leading-7">Upload a medical report or enter your symptoms to generate personalized insights.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Health trends</CardTitle>
                  <CardDescription>7-day health score trajectory</CardDescription>
                </div>
                <Badge variant="outline">Updated live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthTrendData.length > 0 ? healthTrendData : defaultHealthTrend}>
                    <defs>
                      <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#10b981" fill="url(#scoreFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Today’s medicines</CardTitle>
              <CardDescription>Stay consistent with your plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {medications.map((medicine) => (
                <div key={medicine.name} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div>
                    <p className="font-semibold text-zinc-950 dark:text-zinc-100">{medicine.name}</p>
                    <p className="text-sm text-zinc-500">{medicine.dosage} · {medicine.time}</p>
                  </div>
                  <Badge variant={medicine.status === "Taken" ? "default" : "secondary"}>{medicine.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Upcoming appointments</CardTitle>
              <CardDescription>Care coordination at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.name} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div>
                    <p className="font-semibold text-zinc-950 dark:text-zinc-100">{appointment.name}</p>
                    <p className="text-sm text-zinc-500">{appointment.specialty}</p>
                  </div>
                  <div className="text-right text-sm text-zinc-500">
                    <p>{appointment.time}</p>
                    <Button asChild size="sm" variant="secondary" className="mt-2">
                      <Link href="/doctors">View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Recent reports</CardTitle>
              <CardDescription>Recent uploads and key observations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {reports.slice(0, 3).map((rep) => (
                <div key={rep.id} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{rep.file_name}</p>
                      <p className="text-sm text-zinc-500">
                        Uploaded {new Date(rep.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/report?id=${rep.id}`}>Open</Link>
                  </Button>
                </div>
              ))}
              {reports.length === 0 && (
                <div className="flex flex-col items-center justify-center p-6 text-center gap-2 border border-zinc-200 border-dashed rounded-2xl bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50">
                  <p className="text-sm text-zinc-500">No reports found.</p>
                  <Button asChild size="sm" className="mt-1">
                    <Link href="/upload">Upload now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Medicine adherence</CardTitle>
              <CardDescription>Consistency across the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={adherence}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Health timeline</CardTitle>
                  <CardDescription>Most recent care events</CardDescription>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/timeline">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {timelineData.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-zinc-950 dark:text-zinc-100">{item.title}</p>
                      <span className="text-xs text-zinc-500">{item.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
              {timelineData.length === 0 && (
                <p className="text-sm text-zinc-500 text-center py-6">Your timeline is empty.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
