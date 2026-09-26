import { cn } from "@/lib/utils";
import { getCategoryVisual } from "../lib/presentation";

interface ProductVisualProps {
  category: string;
  size?: "md" | "lg";
  className?: string;
}

/** Illustrated placeholder tile, keyed by product category. */
export function ProductVisual({ category, size = "md", className }: ProductVisualProps) {
  const visual = getCategoryVisual(category);
  const Icon = visual.icon;
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br",
        visual.tile,
        className,
      )}
      aria-hidden="true"
    >
      <div className="bg-dot-grid mask-radial absolute inset-0 opacity-60" />
      <div
        className={cn(
          "relative grid place-items-center rounded-2xl bg-white shadow-soft ring-1 ring-black/5",
          "transition-transform duration-500 ease-out-expo group-hover:-rotate-3 group-hover:scale-110",
          size === "lg" ? "size-32 rounded-3xl" : "size-20",
        )}
      >
        <Icon
          className={cn(visual.iconClass, size === "lg" ? "size-14" : "size-9")}
          strokeWidth={1.6}
        />
      </div>
    </div>
  );
}
