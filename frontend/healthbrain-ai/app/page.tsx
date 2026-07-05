"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, ShieldCheck, Sparkles, Stethoscope, TrendingUp, BadgeCheck, HeartPulse, CalendarClock, Activity, FileText, Microscope, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/store/theme-store";

const features = [
  { title: "Instant report understanding", description: "Upload labs, scans, and notes, and receive an AI summary in plain English.", icon: FileText },
  { title: "Continuous risk monitoring", description: "Track vitals and trends to stay ahead of preventable complications.", icon: Activity },
  { title: "Medication guidance", description: "Never miss a dose with reminders, adherence insights, and schedule support.", icon: BadgeCheck },
];

const steps = [
  "Upload your medical documents and symptoms",
  "HealthBrain AI extracts key values and highlights concerns",
  "Receive recommendations, reminders, and specialist guidance",
];

const stats = [
  { label: "Avg. response time", value: "5 min", change: "+40% faster" },
  { label: "Care plan adherence", value: "92%", change: "+18% uplift" },
  { label: "Doctors connected", value: "1.2k+", change: "24/7 access" },
];

const testimonials = [
  {
    quote: "The experience felt more like a trusted care navigator than a generic AI chatbot.",
    name: "Aisha Khan",
    role: "Post-op recovery",
  },
  {
    quote: "My family finally understands what matters most after each specialist visit.",
    name: "Daniel Ortiz",
    role: "Chronic care",
  },
];

const faqs = [
  { question: "Is HealthBrain AI a replacement for doctors?", answer: "It augments care by translating health information into actionable next steps and helping you prepare for visits." },
  { question: "What documents can I upload?", answer: "PDF, PNG, and JPG files are supported, including lab reports, imaging summaries, and prescriptions." },
  { question: "How secure is my data?", answer: "We use encrypted storage, role-based access, and strict policy controls for patient privacy." },
];

export default function Home() {
  const { mode, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen text-zinc-950 transition-colors dark:text-zinc-100">
      <Navbar theme={mode} toggleTheme={toggleTheme} />
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> AI-powered healthcare intelligence
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Healthcare beyond hospital walls.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                HealthBrain AI gives patients, caregivers, and clinicians a calm, intelligent view of health insights, reports, medicines, and next steps in one place.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/auth/signup">
                  Start your free analysis <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/dashboard">Explore dashboard</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> HIPAA-ready workflow</span>
              <span className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-blue-500" /> Clinician-aligned insights</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-400/20 via-transparent to-blue-400/20 blur-3xl" />
            <Card className="relative overflow-hidden border-emerald-200/70 bg-white/80 dark:border-emerald-900/50 dark:bg-zinc-900/80">
              <CardContent className="space-y-4 p-0">
                <div className="rounded-[1.5rem] border border-zinc-200/70 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-500">Daily health score</p>
                      <p className="mt-1 text-4xl font-semibold text-zinc-950 dark:text-zinc-100">87/100</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-600">
                      <HeartPulse className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div className="h-2 w-[87%] rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
                    <span>Stable trend</span>
                    <span className="font-medium text-emerald-600">Improving</span>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                    <div className="mb-2 flex items-center gap-2 text-emerald-600"><Microscope className="h-4 w-4" /> AI findings</div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">Two abnormal markers detected; hydration and sleep support recommended.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                    <div className="mb-2 flex items-center gap-2 text-blue-600"><CalendarClock className="h-4 w-4" /> Next appointment</div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">Cardiology review tomorrow at 9:30 AM.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Features</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to stay ahead of your care</h2>
            </div>
            <p className="max-w-xl text-zinc-600 dark:text-zinc-300">Designed for busy lives, the platform combines report analysis, symptom triage, medication support, and doctor coordination in one experience.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <Card className="h-full rounded-[1.5rem] transition-transform hover:-translate-y-1">
                    <CardHeader>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600"><Icon className="h-5 w-5" /></div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <Card className="rounded-[2rem] bg-zinc-950 text-zinc-100 dark:bg-zinc-900">
              <CardHeader>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">How it works</p>
                <CardTitle className="text-3xl text-white">A smooth path from uncertainty to confidence.</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-semibold text-emerald-300">0{index + 1}</div>
                    <p className="text-sm leading-7 text-zinc-300">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="grid gap-6 sm:grid-cols-2">
              {stats.map((stat) => (
                <Card key={stat.label} className="rounded-[1.5rem]">
                  <CardContent className="space-y-2 p-0">
                    <p className="text-sm text-zinc-500">{stat.label}</p>
                    <p className="text-3xl font-semibold text-zinc-950 dark:text-zinc-100">{stat.value}</p>
                    <p className="text-sm font-medium text-emerald-600">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <Card className="rounded-[2rem]">
              <CardHeader>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Testimonials</p>
                <CardTitle className="text-3xl">Patients trust HealthBrain AI every day</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/70">
                    <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">“{testimonial.quote}”</p>
                    <div className="mt-4">
                      <p className="font-semibold text-zinc-950 dark:text-zinc-100">{testimonial.name}</p>
                      <p className="text-sm text-zinc-500">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="rounded-[2rem]">
              <CardHeader>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">FAQ</p>
                <CardTitle className="text-3xl">Questions, answered simply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                    <p className="font-semibold text-zinc-950 dark:text-zinc-100">{faq.question}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="rounded-[2rem] border-emerald-200/70 bg-gradient-to-br from-emerald-600 to-blue-600 text-white shadow-2xl shadow-emerald-900/20">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between lg:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Ready to try it?</p>
                <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Bring clarity to every medical milestone.</h2>
              </div>
              <Button asChild size="lg" className="bg-white text-zinc-950 hover:bg-zinc-100">
                <Link href="/auth/signup">
                  Get started <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
