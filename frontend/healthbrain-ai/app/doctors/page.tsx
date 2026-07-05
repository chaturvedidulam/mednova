import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const doctors = [
  { name: "Dr. Elena Mendez", specialty: "Cardiology", experience: "14 years", availability: "Today · 09:30", rating: 4.9, location: "Northwell Health" },
  { name: "Dr. Priya Shah", specialty: "Endocrinology", experience: "11 years", availability: "Tomorrow · 14:00", rating: 4.8, location: "Mayo Clinic" },
  { name: "Dr. Liam Brooks", specialty: "Primary Care", experience: "9 years", availability: "Friday · 10:15", rating: 4.7, location: "Cedars Care" },
];

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_24%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Doctor recommendation</p>
            <h1 className="mt-2 text-3xl font-semibold">Find the right specialist</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.name} className="rounded-[2rem]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{doctor.name}</CardTitle>
                  <Badge variant="secondary">{doctor.specialty}</Badge>
                </div>
                <CardDescription>{doctor.experience} of experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <MapPin className="h-4 w-4 text-emerald-600" /> {doctor.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <CalendarDays className="h-4 w-4 text-blue-600" /> {doctor.availability}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <Star className="h-4 w-4 text-amber-500" /> {doctor.rating} / 5
                </div>
                <Button className="w-full" asChild>
                  <Link href="/dashboard">
                    Book appointment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
