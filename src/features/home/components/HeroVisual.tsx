import { Check, Clock, PackageCheck, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Request received", time: "9:41 PM", state: "done" },
  { label: "Checked by pharmacist", time: "9:52 PM", state: "done" },
  { label: "Ready for pickup", time: "Any time — we're open", state: "current" },
] as const;

/**
 * Decorative hero illustration showing what a refill looks like at BMR.
 * Pure CSS animation (no JS), hidden from assistive tech, and motion is
 * disabled under prefers-reduced-motion by the global rule.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      {/* Glow */}
      <div className="absolute inset-8 rounded-full bg-primary-500/30 blur-3xl" />

      <div className="animate-rise delay-2 relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.03] p-5 shadow-2xl backdrop-blur-sm sm:p-8">
        {/* Refill status card */}
        <div className="rounded-3xl bg-white p-5 text-neutral-900 shadow-glow sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary-50 text-primary-600">
                <PackageCheck className="size-6" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-base font-bold tracking-tight">Prescription refill</p>
                <p className="font-mono text-xs text-neutral-500">RX-2419 · 30 tablets</p>
              </div>
            </div>
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
              Ready
            </span>
          </div>

          <ol className="mt-6 space-y-0">
            {STEPS.map((step, index) => (
              <li key={step.label} className="relative flex gap-4 pb-5 last:pb-0">
                {index < STEPS.length - 1 && (
                  <span className="absolute left-[0.6875rem] top-7 h-[calc(100%-1.5rem)] w-0.5 rounded bg-primary-200" />
                )}
                <span
                  className={cn(
                    "relative grid size-6 shrink-0 place-items-center rounded-full",
                    step.state === "done" ? "bg-primary-600 text-white" : "bg-accent-500 text-white",
                  )}
                >
                  {step.state === "current" && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent-400/60" />
                  )}
                  <Check className="relative size-3.5" strokeWidth={3} />
                </span>
                <div className="-mt-0.5">
                  <p className="text-sm font-semibold">{step.label}</p>
                  <p className="text-xs text-neutral-500">{step.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Pill bottle illustration row */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {["bg-primary-400", "bg-accent-400", "bg-primary-200"].map((cap, i) => (
            <div
              key={cap}
              className="flex h-20 flex-col items-center justify-end rounded-2xl bg-white/[0.07] ring-1 ring-inset ring-white/10"
            >
              <div className={cn("h-3 w-10 rounded-t-md", cap)} />
              <div className="flex h-10 w-12 items-center justify-center rounded-b-lg rounded-t-sm bg-white/90">
                <div className={cn("h-3.5 w-8 rounded-sm", i === 1 ? "bg-accent-100" : "bg-primary-100")} />
              </div>
              <div className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating chips */}
      <div className="animate-rise delay-4 absolute -left-3 bottom-16 sm:-left-8">
        <div className="animate-float flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 text-neutral-900 shadow-lift">
          <span className="grid size-8 place-items-center rounded-xl bg-primary-600 text-white">
            <Stethoscope className="size-4" />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-bold">Pharmacist on duty</p>
            <p className="text-[0.6875rem] text-neutral-500">Ask us anything</p>
          </div>
        </div>
      </div>

      <div className="animate-rise delay-5 absolute -right-2 -top-5 sm:-right-6">
        <div className="animate-float-slow flex items-center gap-2 rounded-2xl bg-accent-600 px-3.5 py-2.5 text-white shadow-lift"
          style={{ animationDelay: "1.5s" }}
        >
          <Clock className="size-4" />
          <p className="text-xs font-bold">Open 24 hours, every day</p>
        </div>
      </div>
    </div>
  );
}
