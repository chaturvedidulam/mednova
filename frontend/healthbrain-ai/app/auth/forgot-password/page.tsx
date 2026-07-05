import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_30%)] px-4 py-10">
      <Card className="w-full max-w-md rounded-[2rem] border-zinc-200/70">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Reset password</CardTitle>
              <CardDescription>We’ll send recovery instructions to your inbox</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email address</label>
            <Input placeholder="you@example.com" />
          </div>
          <Button className="w-full" asChild>
            <Link href="/auth/login">
              Send reset link <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-center text-sm text-zinc-500">
            Return to <Link href="/auth/login" className="text-emerald-600 hover:underline">sign in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
