import Link from "next/link";
import { ArrowRight, BellRing, MoonStar, Shield, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Settings</p>
            <h1 className="mt-2 text-3xl font-semibold">Personalize your experience</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Light and dark mode support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center gap-2"><MoonStar className="h-4 w-4 text-emerald-600" /> Appearance</div>
                <Badge>Automatic</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Medication and appointment reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center gap-2"><BellRing className="h-4 w-4 text-blue-600" /> Reminders</div>
                <Badge variant="secondary">Enabled</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Controlled data sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-600" /> Data permissions</div>
                <Badge>Granular</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your access and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center gap-2"><UserCircle2 className="h-4 w-4 text-blue-600" /> Sign-in methods</div>
                <Badge variant="secondary">Protected</Badge>
              </div>
              <Button asChild className="w-full">
                <Link href="/auth/login">
                  Sign out <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
