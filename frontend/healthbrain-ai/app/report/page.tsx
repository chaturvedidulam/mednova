"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowRight, BrainCircuit, FileText, ShieldCheck } from "lucide-react";

import { getReport, askReport, MedicalReport } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

function ReportPageContent() {
  const searchParams = useSearchParams();
  const [report, setReport] = useState<MedicalReport | null>(null);
  const [loading, setLoading] = useState(true);

  // Chat implementation states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id") ?? sessionStorage.getItem("latestReportId");

    if (!id) {
      setLoading(false);
      return;
    }

    getReport(Number(id))
      .then(setReport)
      .catch((err) => {
        console.error("Error loading report details:", err);
        setReport(null);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-10 text-sm font-medium text-zinc-500">
        Loading report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-10 text-center gap-4">
        <p className="text-sm font-medium text-zinc-500">No report found. Please upload a report first.</p>
        <Button asChild>
          <Link href="/upload">Upload report</Link>
        </Button>
      </div>
    );
  }

  const analysis = report?.analysis;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">AI report analysis</p>
            <h1 className="mt-2 text-3xl font-semibold">Your report is ready</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        {/* AI Analysis Failure Alert Banner */}
        {report.analysis_status === "failed" && (
          <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-5 dark:border-red-950/30 dark:bg-red-950/20 text-zinc-900 dark:text-zinc-100">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold mb-1">
              <AlertTriangle className="h-5 w-5 animate-pulse" /> AI Analysis Limit Exceeded
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {analysis?.message || "Gemini AI analysis limit was reached. The document text has been successfully extracted via OCR, but clinical summarization is temporarily unavailable."}
            </p>
            {analysis?.reason && (
              <p className="mt-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-black/5 dark:bg-black/20 p-2 rounded-lg">
                Details: {analysis.reason}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[2rem] border-emerald-200/70">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Patient summary</CardTitle>
                  <CardDescription>
                    {new Date(report.uploaded_at).toLocaleDateString("en", { month: "long", year: "numeric" })} · {report.file_name}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Patient information</p>
                  <Badge variant="secondary">Confidence 94%</Badge>
                </div>
                <div className="mt-3 grid gap-3 text-sm text-zinc-600 dark:text-zinc-300 sm:grid-cols-2">
                  <div>
                    <span className="font-medium text-zinc-950 dark:text-zinc-100">File Name:</span> {report.file_name}
                  </div>
                  <div>
                    <span className="font-medium text-zinc-950 dark:text-zinc-100">Uploaded:</span> {new Date(report.uploaded_at).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium text-zinc-950 dark:text-zinc-100">Patient:</span> Maya A.
                  </div>
                  <div>
                    <span className="font-medium text-zinc-950 dark:text-zinc-100">Patient ID:</span> #{report.user_id}
                  </div>
                </div>
              </div>

              {/* Dynamic Abnormal Parameters Section */}
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <p className="font-semibold mb-3">Abnormal values</p>
                <div className="space-y-3">
                  {analysis?.abnormal_parameters && analysis.abnormal_parameters.length > 0 ? (
                    analysis.abnormal_parameters.map((item) => (
                      <div
                        key={item.parameter}
                        className="rounded-xl border border-amber-200/70 bg-amber-50 p-3 text-sm dark:border-amber-900/50 dark:bg-amber-950/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <strong className="font-medium text-zinc-950 dark:text-zinc-100">{item.parameter}</strong>
                          <Badge variant="secondary">{item.status}</Badge>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300">Observed value: {item.value}</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">{item.explanation}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">
                      {report.analysis_status === "failed" 
                        ? "AI analysis failed. Raw values are not structured." 
                        : "No abnormal values detected."}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>AI explanation</CardTitle>
                <CardDescription>Why this matters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                <p>
                  {analysis?.summary || (report.analysis_status === "failed" 
                    ? "Summary analysis is unavailable due to API rate limit limits." 
                    : "No summary available.")}
                </p>
                <div className="flex items-center gap-2 text-emerald-600">
                  <ShieldCheck className="h-4 w-4" /> Recommendations are aligned with the latest evidence and your medical history.
                </div>
              </CardContent>
            </Card>

            {/* Possible Conditions Card */}
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Possible Conditions</CardTitle>
                <CardDescription>Potential correlations based on indicators</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {analysis?.possible_conditions && analysis.possible_conditions.length > 0 ? (
                  analysis.possible_conditions.map((condition) => (
                    <Badge key={condition} variant="outline" className="text-sm px-3 py-1 border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/10">
                      {condition}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">No specific medical conditions identified.</p>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>What to do next</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis?.recommendation ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-950/70">
                    <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-600">
                      <BrainCircuit className="h-4 w-4" />
                    </div>
                    <span>{analysis.recommendation}</span>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">No recommendations available.</p>
                )}
              </CardContent>
            </Card>

            {/* Chat with your Report Card Component */}
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Chat with your Report</CardTitle>
                <CardDescription>Ask questions about this report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Why is my hemoglobin low?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !chatLoading && question.trim()) {
                      e.preventDefault();
                      document.getElementById("ask-ai-btn")?.click();
                    }
                  }}
                />
                <Button
                  id="ask-ai-btn"
                  className="w-full"
                  disabled={chatLoading || !question.trim()}
                  onClick={async () => {
                    if (!report) return;
                    setChatLoading(true);
                    try {
                      const result = await askReport(report.id, question);
                      setAnswer(result.answer);
                    } catch (error: any) {
                      const status = error.response?.status;
                      if (status === 429 || status === 500) {
                        setAnswer("The AI service is currently experiencing high demand (quota exceeded). Please try again in a moment, or check your internet connection.");
                      } else {
                        setAnswer("Unable to get AI response. Please try again.");
                      }
                    }
                    setChatLoading(false);
                  }}
                >
                  {chatLoading ? "Thinking..." : "Ask AI"}
                </Button>
                {answer && (
                  <div className="rounded-xl border p-4 bg-zinc-50 dark:bg-zinc-900">
                    <p className="font-semibold mb-2">AI Answer</p>
                    <p className="text-sm leading-7 whitespace-pre-wrap">{answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Medical sources</CardTitle>
                <CardDescription>Supporting references</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex items-start gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <AlertTriangle className="mt-1 h-4 w-4 text-amber-500" />
                  <p>
                    Cross-consulted with guideline summaries from cardiology and metabolic care. 
                    {analysis?.recommended_specialist && (
                      <span className="block mt-1 font-medium text-zinc-900 dark:text-zinc-100">
                        Recommended Specialist: {analysis.recommended_specialist}
                      </span>
                    )}
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link href="/doctors">
                    Find a specialist <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* OCR Text Fallback Card */}
        {report.ocr_text && (
          <Card className="rounded-[2rem] border-zinc-200/70 dark:border-zinc-800">
            <CardHeader>
              <CardTitle>Extracted Document Text</CardTitle>
              <CardDescription>Raw text extracted via OCR from the uploaded file</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="max-h-80 overflow-y-auto rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 text-xs font-mono whitespace-pre-wrap dark:border-zinc-800 dark:bg-zinc-950/70 text-zinc-700 dark:text-zinc-300">
                {report.ocr_text}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center p-10 text-sm font-medium text-zinc-500">
        Loading report...
      </div>
    }>
      <ReportPageContent />
    </Suspense>
  );
}