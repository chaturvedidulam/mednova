"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, BrainCircuit } from "lucide-react";

import { askReport } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const reportId = Number(sessionStorage.getItem("latestReportId"));
      
      if (!reportId) {
        setAnswer("No uploaded report found. Please upload a report first.");
        setLoading(false);
        return;
      }

      const res = await askReport(reportId, question);
      setAnswer(res.answer);
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 429 || status === 500) {
        setAnswer("The AI assistant is currently experiencing high demand (quota limit reached). Please try again in a few moments, or check your internet connection.");
      } else {
        setAnswer("Unable to fetch response from the AI assistant. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Interactive Assistant</p>
              <h1 className="text-2xl font-semibold mt-0.5">Chat with Report</h1>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/report" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Report
            </Link>
          </Button>
        </div>

        {/* Input Card Container */}
        <Card className="rounded-[2rem] border-zinc-200/70 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Uploaded Report Context</CardTitle>
            <CardDescription>
              Ask clear, contextual questions about your blood panels, abnormal ranges, or metrics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Why is my hemoglobin low?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                className="flex-1"
                disabled={loading}
              />
              <Button
                onClick={handleAskAI}
                disabled={loading || !question.trim()}
                className="sm:w-32"
              >
                {loading ? "Thinking..." : "Ask AI"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Answer Response Card */}
        {(answer || loading) && (
          <Card className="rounded-[2rem] border-emerald-200/70 bg-white/50 backdrop-blur-sm dark:border-emerald-900/30">
            <CardHeader className="flex flex-row items-center gap-2.5 space-y-0 pb-3">
              <div className="rounded-lg bg-emerald-500/15 p-1.5 text-emerald-600">
                <BrainCircuit className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-semibold">AI Answer</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-zinc-500 animate-pulse">
                  <span>Thinking and cross-referencing indicators...</span>
                </div>
              ) : (
                <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                  {answer}
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}