export type ThemeMode = "light" | "dark";

export interface StatItem {
  label: string;
  value: string;
  change: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface MetricPoint {
  name: string;
  value: number;
}

export interface TimelineEntry {
  id: number;
  title: string;
  detail: string;
  date: string;
  type: "report" | "medication" | "appointment";
}

export interface DoctorProfile {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  rating: number;
  location: string;
}
