import Link from "next/link";
import { BrainCircuit, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 bg-zinc-950/95 text-zinc-300 dark:border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-400">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">HealthBrain AI</p>
              <p className="text-sm text-zinc-400">Healthcare Beyond Hospital Walls</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-zinc-400">
            A secure, human-centric platform that turns fragmented health data into actionable guidance for patients, clinicians, and caregivers.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button asChild className="w-fit bg-white text-zinc-950 hover:bg-zinc-200">
            <Link href="/auth/signup">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-zinc-500">© 2026 HealthBrain AI. Built for modern care.</p>
        </div>
      </div>
    </footer>
  );
}
