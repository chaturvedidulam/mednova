import Link from "next/link";
import { ArrowRight, BrainCircuit, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_30%)] px-4 py-10">
      <Card className="w-full max-w-md rounded-[2rem] border-emerald-200/70">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Access your HealthBrain AI workspace</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
            <Input placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full" asChild>
            <Link href="/dashboard">
              Sign in <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center justify-between text-sm text-zinc-500">
            <Link href="/auth/forgot-password" className="text-emerald-600 hover:underline">Forgot password?</Link>
            <Link href="/auth/signup" className="text-emerald-600 hover:underline">Create account</Link>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-200/70 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <ShieldCheck className="h-4 w-4" /> Secure access with biometric-ready authentication.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
