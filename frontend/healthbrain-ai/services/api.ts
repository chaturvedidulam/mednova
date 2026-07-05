import axios from "axios";

export interface ReportAnalysis {
  summary?: string;
  abnormal_parameters?: Array<{
    parameter?: string;
    value?: string;
    status?: string;
    explanation?: string;
  }>;
  possible_conditions?: string[];
  severity?: "low" | "moderate" | "high" | "unknown";
  recommended_specialist?: string;
  recommendation?: string;
  emergency?: boolean;
  error?: string;
  message?: string;
  reason?: string;
}

export interface MedicalReport {
  id: number;
  user_id: number;
  file_name: string;
  stored_file_name: string;
  original_file_path: string;
  report_type: string;
  mime_type: string;
  file_size: number;
  ocr_text: string | null;
  analysis: ReportAnalysis | null;
  analysis_status: "pending" | "completed" | "failed" | string;
  uploaded_at: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000",
  timeout: 120000,
});

export async function uploadReport(file: File, reportType = "medical_report") {
  const formData = new FormData();
  formData.append("report_type", reportType);
  formData.append("file", file);

  const response = await api.post<MedicalReport>("/reports/upload", formData);
  return response.data;
}

export async function getReport(reportId: number) {
  const response = await api.get<MedicalReport>(`/reports/${reportId}`);
  return response.data;
}

export async function askReport(
    reportId: number,
    question: string
) {
    const response = await api.post("/chat",{
            report_id: reportId,
            question,
        }
    )

    return response.data

}

export async function getReports() {
  const response = await api.get<MedicalReport[]>("/reports");
  return response.data;
}

export async function getDashboardSummary() {
  const reports = await getReports();
  return { data: buildDashboardSummary(reports) };
}

export async function getHealthTrends() {
  const reports = await getReports();
  return { data: buildHealthTrends(reports) };
}

export async function getDoctors() {
  return {
    data: [
      {
        id: 1,
        name: "Primary care physician",
        specialty: "General Medicine",
        experience: "Available for review",
        availability: "Next available",
        rating: 4.8,
        location: "Based on latest analysis",
      },
    ],
  };
}

export async function getMedicationPlan() {
  return {
    data: [
      { name: "Medication plan", time: "Today", dosage: "Review with clinician", status: "Pending" },
    ],
  };
}

export async function getTimeline() {
  const reports = await getReports();
  return { data: reports.map(reportToTimelineEntry) };
}

export function reportToTimelineEntry(report: MedicalReport) {
  return {
    id: report.id,
    title: report.file_name,
    detail: report.analysis?.summary || statusLabel(report.analysis_status),
    date: formatDate(report.uploaded_at),
    type: "report" as const,
  };
}

export function statusLabel(status: string) {
  if (status === "completed") {
    return "Analyzed";
  }

  if (status === "failed") {
    return "Analysis failed";
  }

  return "Processing";
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export interface SymptomAnalysis {
  possible_conditions: string[];
  severity: string;
  recommended_specialist: string;
  recommendation: string;
  emergency: boolean;
}

export async function analyzeSymptoms(symptoms: string) {
  const response = await api.post<SymptomAnalysis>(
    "/symptoms",
    {
      symptoms,
    }
  );

  return response.data;
}

function buildDashboardSummary(reports: MedicalReport[]) {
  const latest = reports[0];
  const completed = reports.filter((report) => report.analysis_status === "completed").length;

  return {
    healthScore: latest?.analysis_status === "completed" ? 87 : 72,
    insightTitle: latest?.analysis?.severity ? `${latest.analysis.severity} priority` : "Upload a report",
    insightSummary: latest?.analysis?.summary || "Upload a medical report to generate AI insights.",
    reports,
    completed,
  };
}

function buildHealthTrends(reports: MedicalReport[]) {
  const recent = reports.slice(0, 7).reverse();

  if (recent.length === 0) {
    return [
      { name: "Mon", score: 0 },
      { name: "Tue", score: 0 },
      { name: "Wed", score: 0 },
      { name: "Thu", score: 0 },
      { name: "Fri", score: 0 },
      { name: "Sat", score: 0 },
      { name: "Sun", score: 0 },
    ];
  }

  return recent.map((report) => ({
    name: new Intl.DateTimeFormat("en", { weekday: "short" }).format(new Date(report.uploaded_at)),
    score: report.analysis_status === "completed" ? 87 : 60,
  }));
}
