"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpToLine, FileText, Image as ImageIcon, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getReports, MedicalReport, statusLabel, uploadReport } from "@/services/api";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [history, setHistory] = useState<MedicalReport[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    getReports()
      .then((reports) => setHistory(reports.slice(0, 5)))
      .catch(() => setHistory([]));
  }, []);

  async function handleUpload(file: File | undefined) {
    if (!file || isUploading) {
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const report = await uploadReport(file);
      sessionStorage.setItem("latestReport", JSON.stringify(report));
      sessionStorage.setItem("latestReportId", String(report.id));
      router.push("/report");

    } catch {
      setError("Upload failed. Please check that the backend is running and try again.");

    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Upload medical report</p>
            <h1 className="mt-2 text-3xl font-semibold">Securely share your documents</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[2rem] border-emerald-200/70">
            <CardHeader>
              <CardTitle>Drag & drop your files</CardTitle>
              <CardDescription>Supported formats: PDF, PNG, and JPG</CardDescription>
            </CardHeader>
            <CardContent>
              <label
                className={`flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed px-6 py-16 text-center transition ${dragActive ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : "border-zinc-300 dark:border-zinc-700"}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragActive(false);
                  void handleUpload(event.dataTransfer.files[0]);
                }}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-emerald-600" />
                <p className="text-lg font-semibold">Drop files here or click to browse</p>
                <p className="mt-2 text-sm text-zinc-500">We will analyze the data, extract key values, and prepare a human-readable report.</p>
                <Button className="mt-6" disabled={isUploading} asChild>
                  <span>
                    <ArrowUpToLine className="mr-2 h-4 w-4" /> {isUploading ? "Uploading..." : "Upload files"}
                  </span>
                </Button>
                {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                  onChange={(event) => void handleUpload(event.target.files?.[0])}
                />
              </label>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Upload history</CardTitle>
              <CardDescription>Recent documents and analysis status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-blue-500/15 p-2 text-blue-600">
                      {item.file_name.toLowerCase().endsWith("pdf") ? <FileText className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-semibold">{item.file_name}</p>
                      <p className="text-sm text-zinc-500">{formatDate(item.uploaded_at)}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{statusLabel(item.analysis_status)}</Badge>
                </div>
              ))}
              {history.length === 0 ? (
                <p className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/70">No uploads yet.</p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
