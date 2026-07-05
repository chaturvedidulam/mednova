"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, FileText, Pill, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getReports, MedicalReport } from "@/services/api";

export default function TimelinePage() {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then((reportsRes) => {
        setReports(reportsRes);
      })
      .catch((err) => {
        console.error("Failed to load timeline page data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-10 text-sm font-medium text-zinc-500">
        Loading timeline...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Health timeline</p>
            <h1 className="mt-2 text-3xl font-semibold">See your care story evolve</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Interactive timeline</CardTitle>
              <CardDescription>Milestones and major health changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {reports.map((report) => (
                <div key={report.id} className="flex gap-4 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="font-semibold text-zinc-950 dark:text-zinc-100 truncate">{report.file_name}</p>
                      <span className="text-xs text-zinc-500 shrink-0 font-mono">
                        {new Date(report.uploaded_at).toLocaleString("en", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        Type: {report.report_type.replace("_", " ")}
                      </Badge>
                      <Badge variant={report.analysis_status === "completed" ? "default" : report.analysis_status === "failed" ? "destructive" : "secondary"} className="text-xs capitalize">
                        Status: {report.analysis_status}
                      </Badge>
                      {report.analysis?.severity && (
                        <Badge variant="secondary" className="text-xs uppercase">
                          Severity: {report.analysis.severity}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed truncate">
                      {report.analysis?.summary || "No summary available."}
                    </p>
                    <div className="mt-3">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/report?id=${report.id}`}>
                          View analysis report <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {reports.length === 0 && (
                <p className="text-sm text-zinc-500 text-center py-10">No events on your timeline yet. Upload reports to start.</p>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Previous reports</CardTitle>
                <CardDescription>Archive of recent analyses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {reports.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                    <Link href={`/report?id=${item.id}`} className="flex items-center gap-2 hover:underline text-left">
                      <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="font-medium text-zinc-950 dark:text-zinc-100 truncate max-w-[150px] sm:max-w-[220px]">
                        {item.file_name}
                      </span>
                    </Link>
                    <span className="text-xs text-zinc-500 shrink-0">
                      {new Date(item.uploaded_at).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                ))}
                {reports.length === 0 && (
                  <p className="text-sm text-zinc-500">No reports found.</p>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Health trends</CardTitle>
                <CardDescription>Signal summary across recent weeks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <Activity className="h-4 w-4 text-emerald-600" /> <span>Heart rate stability improved by 8%</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <Pill className="h-4 w-4 text-blue-600" /> <span>Medication adherence reached 96%</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <Stethoscope className="h-4 w-4 text-amber-600" /> <span>Blood pressure trend remains within target range</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

// Simple local Badge component for layout fallback if shadcn badge behaves uniquely
function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: "default" | "secondary" | "destructive" | "outline", className?: string }) {
  const styles = {
    default: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    secondary: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    destructive: "bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-300",
    outline: "border border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
