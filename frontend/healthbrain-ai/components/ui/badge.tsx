import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
        variant === "secondary" && "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
        variant === "outline" && "border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
