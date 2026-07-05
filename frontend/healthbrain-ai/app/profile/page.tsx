import Link from "next/link";
import { ArrowRight, BriefcaseMedical, ContactRound, HeartPulse, ShieldCheck, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">User profile</p>
            <h1 className="mt-2 text-3xl font-semibold">Your health identity</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-600"><UserCircle2 className="h-6 w-6" /></div>
                <div>
                  <CardTitle>Maya A.</CardTitle>
                  <CardDescription>Patient profile</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <p className="font-semibold text-zinc-950 dark:text-zinc-100">Personal details</p>
                <p className="mt-2">Age 34 · Female · Boston, MA</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <p className="font-semibold text-zinc-950 dark:text-zinc-100">Medical history</p>
                <p className="mt-2">Post-op recovery · Mild hypertension · Seasonal allergies</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Emergency contacts</CardTitle>
                <CardDescription>Trusted names and numbers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Jordan A.", relation: "Spouse", number: "+1 (555) 414-3010" },
                  { name: "Kaitlyn A.", relation: "Sibling", number: "+1 (555) 902-3110" },
                ].map((contact) => (
                  <div key={contact.name} className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                    <p className="font-semibold">{contact.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">{contact.relation}</p>
                    <p className="mt-1 text-sm text-zinc-500">{contact.number}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Allergies & insurance</CardTitle>
                <CardDescription>Important care details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Allergies</div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Penicillin · Shellfish</p>
                </div>
                <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="flex items-center gap-2 font-semibold"><BriefcaseMedical className="h-4 w-4 text-blue-600" /> Insurance</div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">BlueCross PPO · Member ID 4401 2019</p>
                </div>
                <Button asChild className="w-full">
                  <Link href="/settings">
                    Update preferences <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
