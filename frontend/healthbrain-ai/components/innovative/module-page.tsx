"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ModulePageProps {
  eyebrow: string;
  title: string;
  description: string;
  badges?: string[];
  accent?: "emerald" | "blue" | "violet" | "amber";
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  children: ReactNode;
}

export function ModulePage({
  eyebrow,
  title,
  description,
  badges = [],
  accent = "emerald",
  primaryActionLabel,
  primaryActionHref,
  secondaryActionLabel,
  secondaryActionHref,
  children,
}: ModulePageProps) {
  const accentClasses = {
    emerald: "from-emerald-600/15 via-emerald-500/5 to-transparent",
    blue: "from-blue-600/15 via-blue-500/5 to-transparent",
    violet: "from-violet-600/15 via-violet-500/5 to-transparent",
    amber: "from-amber-600/15 via-amber-500/5 to-transparent",
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-[2rem] border border-zinc-200/70 bg-gradient-to-br ${accentClasses[accent]} p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  <Sparkles className="mr-1 h-3.5 w-3.5" /> {eyebrow}
                </Badge>
                {badges.map((badge) => (
                  <Badge key={badge} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
              <p className="mt-3 text-base leading-8 text-zinc-600 dark:text-zinc-300">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {secondaryActionLabel && secondaryActionHref ? (
                <Button asChild variant="outline">
                  <Link href={secondaryActionHref}>{secondaryActionLabel}</Link>
                </Button>
              ) : null}
              {primaryActionLabel && primaryActionHref ? (
                <Button asChild>
                  <Link href={primaryActionHref}>
                    {primaryActionLabel} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
          {children}
        </motion.div>
      </div>
    </main>
  );
}

export function ModuleSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <Card className="rounded-[2rem]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
