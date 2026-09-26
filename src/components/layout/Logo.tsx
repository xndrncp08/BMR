import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  tone?: "default" | "inverse";
  className?: string;
}

/** Brand mark: a rounded green tile with a pharmacy cross and a red dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-soft",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-5 text-white" fill="currentColor">
        <path d="M9.5 3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-6h-6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6z" />
      </svg>
      <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-accent-500 ring-2 ring-white" />
    </span>
  );
}

export function Logo({ tone = "default", className }: LogoProps) {
  const inverse = tone === "inverse";
  return (
    <Link
      href="/"
      className={cn(
        "focus-ring group inline-flex items-center gap-2.5 rounded-xl",
        inverse && "focus-visible:ring-offset-primary-950",
        className,
      )}
    >
      <LogoMark className="transition-transform duration-300 ease-out-expo group-hover:-rotate-6 group-hover:scale-105" />
      <span className="font-display text-lg font-extrabold leading-none tracking-tight">
        <span className={inverse ? "text-white" : "text-primary-800"}>BMR</span>{" "}
        <span className={cn("font-semibold", inverse ? "text-primary-200" : "text-neutral-600")}>
          Pharmacy
        </span>
      </span>
    </Link>
  );
}
