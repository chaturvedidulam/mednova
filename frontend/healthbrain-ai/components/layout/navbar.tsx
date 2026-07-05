"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrainCircuit, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/70 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/70"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-600/15 p-2 text-emerald-600">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">HealthBrain AI</p>
            <p className="text-xs text-zinc-500">Healthcare Beyond Hospital Walls</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:flex">
          <Link href="#features" className="transition hover:text-emerald-600">Features</Link>
          <Link href="#how-it-works" className="transition hover:text-emerald-600">How it works</Link>
          <Link href="/dashboard" className="transition hover:text-emerald-600">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/auth/login">Get started</Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open navigation">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
