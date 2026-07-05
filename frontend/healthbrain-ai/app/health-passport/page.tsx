import { Download, Printer, Share2, QrCode, ShieldCheck, Syringe, Stethoscope, UserCircle2 } from "lucide-react";
import { ModulePage } from "@/components/innovative/module-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const passportFields = [
  { label: "Blood Group", value: "AB+" },
  { label: "Allergies", value: "Penicillin, seafood" },
  { label: "Chronic Diseases", value: "Hypertension" },
  { label: "Current Medications", value: "Metformin, Lisinopril" },
  { label: "Emergency Contact", value: "Jordan · +1 555 0102" },
  { label: "Vaccination Status", value: "Updated · COVID + Flu" },
];

export default function HealthPassportPage() {
  return (
    <ModulePage
      eyebrow="AI Health Passport"
      title="A digital health identity that travels with you"
      description="This secure, shareable health passport can support emergency response, care continuity, and instant visibility for clinicians and family members."
      badges={["QR ready", "Emergency friendly", "Portable"]}
      accent="emerald"
      primaryActionLabel="Download passport"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[2rem] border-emerald-200/70 bg-white/80 backdrop-blur-xl dark:bg-zinc-900/80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Health passport card</CardTitle>
                <CardDescription>Glassmorphism identity card with essential health information.</CardDescription>
              </div>
              <Badge variant="secondary">Trusted profile</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/40 bg-gradient-to-br from-emerald-500/15 via-white/60 to-blue-500/10 p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">HealthBrain AI</p>
                  <h2 className="mt-2 text-2xl font-semibold">Maya A.</h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Patient · Age 34 · ID HB-2048</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-3 text-emerald-600 shadow-sm dark:bg-zinc-950/50">
                  <UserCircle2 className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-[0.8fr_1fr]">
                <div className="flex flex-col items-center justify-center rounded-[1.25rem] border border-zinc-200/70 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <QrCode className="h-20 w-20 text-zinc-900 dark:text-zinc-100" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">Scan to share</p>
                </div>
                <div className="grid gap-3 text-sm">
                  {passportFields.slice(0, 3).map((field) => (
                    <div key={field.label} className="rounded-2xl border border-zinc-200/70 bg-white/70 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{field.label}</p>
                      <p className="mt-1 font-medium text-zinc-950 dark:text-zinc-100">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
              <Button>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Critical care data</CardTitle>
              <CardDescription>Designed for rapid understanding in moments that matter.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {passportFields.map((field) => (
                <div key={field.label} className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <p className="text-sm text-zinc-500">{field.label}</p>
                  <p className="mt-2 font-semibold text-zinc-950 dark:text-zinc-100">{field.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Why this stands out</CardTitle>
              <CardDescription>A memorable healthcare feature for urgent, low-friction care.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span className="text-sm">Immediate emergency response data at a glance.</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                <Syringe className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Vaccination history and medication context in one view.</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                <Stethoscope className="h-5 w-5 text-amber-600" />
                <span className="text-sm">Simple to share across care teams and family support networks.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModulePage>
  );
}
