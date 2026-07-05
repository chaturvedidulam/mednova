import Link from "next/link";
import { Activity, Ambulance, Bot, Compass, HeartPulse, Microscope, ShieldCheck, Sparkles, Trees, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
  { title: "AI Health Passport", description: "A secure digital identity for care continuity and emergency response.", href: "/health-passport", icon: ShieldCheck },
  { title: "Nearby Healthcare Ecosystem", description: "Find hospitals, PHCs, labs, blood banks, ambulances, and pharmacies nearby.", href: "/healthcare-ecosystem", icon: Compass },
  { title: "AI Health Twin", description: "A virtual health profile with long-term risk and trend monitoring.", href: "/health-twin", icon: HeartPulse },
  { title: "Rural Healthcare Mode", description: "Simple, accessible, low-bandwidth care interaction for elder users.", href: "/rural-mode", icon: Trees },
  { title: "Community Health Network", description: "Connect with ASHA workers, volunteers, NGOs, and upcoming camps.", href: "/community-network", icon: Users },
  { title: "Preventive Dashboard", description: "Goal-based wellness planning focused on prevention instead of reaction.", href: "/preventive-dashboard", icon: Activity },
  { title: "Family Care Dashboard", description: "Coordinate care for the entire household in a single vibrant view.", href: "/family-care", icon: Sparkles },
  { title: "AI Health Journey", description: "Narrate every patient milestone from symptoms to recovery progress.", href: "/health-journey", icon: Bot },
  { title: "Health Literacy Center", description: "Turn medical information into simple, approachable learning cards.", href: "/health-literacy", icon: Microscope },
  { title: "Environmental Health Insights", description: "Link local air, weather, and disease risks to daily health choices.", href: "/environmental-insights", icon: Ambulance },
];

export default function InnovationsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="rounded-[2rem] border border-zinc-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Innovative modules</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A distinctive healthcare experience for the future of care.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-300">These additions preserve the current HealthBrain AI experience while introducing bold, memorable, hackathon-worthy capabilities tailored to underserved communities, prevention, and family-centered care.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.title} className="rounded-[2rem] transition-transform hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={module.href}>Open module</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
