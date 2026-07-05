import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%)] px-4 py-10">
      <Card className="w-full max-w-md rounded-[2rem] border-blue-200/70">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-500/15 p-2 text-blue-600">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>Start your AI-guided care journey</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First name</label>
              <Input placeholder="Ava" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Last name</label>
              <Input placeholder="Nguyen" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
            <Input placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
            <Input type="password" placeholder="Create a strong password" />
          </div>
          <Button className="w-full" asChild>
            <Link href="/dashboard">
              Create account <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-center text-sm text-zinc-500">
            Already have an account? <Link href="/auth/login" className="text-emerald-600 hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
