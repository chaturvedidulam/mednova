import { AlertCircle, HeartHandshake, MapPin, PlusCircle, ShieldCheck, Users } from "lucide-react";
import { ModulePage } from "@/components/innovative/module-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const network = [
  { name: "Asha Devi", role: "ASHA Worker", area: "Ward 12", availability: "Today" },
  { name: "Ravi Kumar", role: "Community Volunteer", area: "Village 4", availability: "Available" },
  { name: "Saksham Foundation", role: "NGO", area: "Rural outreach", availability: "Next camp" },
];

const camps = [
  { title: "Mobile vaccination camp", date: "Jul 07", place: "Riverside School" },
  { title: "Diabetes screening drive", date: "Jul 12", place: "Community Hall" },
];

export default function CommunityNetworkPage() {
  return (
    <ModulePage
      eyebrow="Community health network"
      title="A human support layer around the digital platform"
      description="Connect with community health workers, volunteers, NGOs, and upcoming public health camps for trusted local care support."
      badges={["Local support", "Community-led", "Assistance ready"]}
      accent="emerald"
      primaryActionLabel="Request assistance"
      primaryActionHref="/innovations"
      secondaryActionLabel="Back to modules"
      secondaryActionHref="/innovations"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card className="rounded-[2rem]">
            <CardHeader>
              <CardTitle>Nearby support network</CardTitle>
              <CardDescription>Trusted local helpers near you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {network.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <div>
                    <p className="font-semibold text-zinc-950 dark:text-zinc-100">{item.name}</p>
                    <p className="text-sm text-zinc-500">{item.role} · {item.area}</p>
                  </div>
                  <Badge variant="secondary">{item.availability}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <CardHeader>
              <CardTitle>Non-emergency assistance</CardTitle>
              <CardDescription>Request help without needing to visit a hospital for routine support.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/70 bg-white/70 p-3 dark:border-emerald-900/50 dark:bg-zinc-950/70">
                <HeartHandshake className="h-5 w-5 text-emerald-600" />
                <span className="text-sm">Support for medicine pickup, transport coordination, and basic health guidance.</span>
              </div>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Submit community request
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Upcoming health camps</CardTitle>
            <CardDescription>Government and NGO-led public health events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {camps.map((camp) => (
              <div key={camp.title} className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-zinc-950 dark:text-zinc-100">{camp.title}</p>
                  <Badge variant="outline">{camp.date}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <MapPin className="h-4 w-4 text-blue-600" /> {camp.place}
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
              <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>These updates help users stay informed without depending entirely on hospital visits.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
