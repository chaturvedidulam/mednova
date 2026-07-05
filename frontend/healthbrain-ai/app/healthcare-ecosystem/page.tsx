import Link from "next/link";
import { ArrowRight, Compass, MapPin, Navigation, ShieldCheck } from "lucide-react";
import { ModulePage } from "@/components/innovative/module-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const facilities = [
  { name: "Northwell Community Hospital", type: "Hospital", distance: "2.4 km", time: "8 min", availability: "Open now", specialties: "Cardiology, Pediatrics" },
  { name: "Riverside PHC", type: "Primary Health Centre", distance: "4.1 km", time: "12 min", availability: "Open until 6 PM", specialties: "Vaccination, Maternal care" },
  { name: "Greenline Diagnostic Lab", type: "Diagnostic Lab", distance: "3.0 km", time: "10 min", availability: "Rapid reports", specialties: "CBC, MRI" },
  { name: "Lifeline Blood Bank", type: "Blood Bank", distance: "5.2 km", time: "14 min", availability: "24/7 support", specialties: "Plasma, Whole blood" },
  { name: "Rapid Care Ambulance", type: "Ambulance Station", distance: "1.8 km", time: "6 min", availability: "Available", specialties: "ICU transfer" },
  { name: "CityMed Pharmacy", type: "Pharmacy", distance: "1.2 km", time: "4 min", availability: "Open", specialties: "Prescription pickup" },
];

export default function HealthcareEcosystemPage() {
  return (
    <ModulePage
      eyebrow="Nearby healthcare ecosystem"
      title="Find the full care network around you"
      description="Go beyond hospitals and discover nearby clinics, labs, pharmacies, blood banks, and ambulance services in one beautiful, guided view."
      badges={["Map-ready", "Live distances", "Multi-provider"]}
      accent="blue"
      primaryActionLabel="Open map"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Geospatial care map</CardTitle>
            <CardDescription>Navigation-first view with availability and travel context.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[1.5rem] border border-zinc-200/70 bg-gradient-to-br from-blue-500/15 to-emerald-500/10 p-5 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Current location</p>
                  <p className="mt-2 text-lg font-semibold">Downtown, Boston</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-3 text-blue-600 shadow-sm dark:bg-zinc-950/60">
                  <Compass className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-5 rounded-[1.25rem] border border-zinc-200/70 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <MapPin className="h-4 w-4 text-emerald-600" /> Fastest route to the nearest emergency-ready facility.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">8 min travel</Badge>
                  <Badge variant="outline">High availability</Badge>
                  <Badge>Live route</Badge>
                </div>
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link href="/innovations">
                <Navigation className="mr-2 h-4 w-4" /> Start navigation
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {facilities.map((facility) => (
            <Card key={facility.name} className="rounded-[1.75rem]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{facility.name}</CardTitle>
                  <Badge variant="secondary">{facility.type}</Badge>
                </div>
                <CardDescription>{facility.specialties}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center justify-between">
                  <span>Distance</span>
                  <span className="font-semibold text-zinc-950 dark:text-zinc-100">{facility.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Travel</span>
                  <span className="font-semibold text-zinc-950 dark:text-zinc-100">{facility.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Availability</span>
                  <span className="font-semibold text-emerald-600">{facility.availability}</span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/innovations">
                    Open directions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ModulePage>
  );
}
