"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * Disclosure list following the WAI-ARIA accordion pattern: each header is a
 * real <button> with aria-expanded/aria-controls, and panels are labelled by
 * their header. Height animates with Framer Motion (respecting reduced
 * motion through MotionConfig).
 */
export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="focus-ring group flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left font-display text-base font-semibold text-neutral-900 transition-colors hover:text-primary-700"
              >
                {item.question}
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ease-out-expo",
                    isOpen
                      ? "rotate-45 border-primary-600 bg-primary-600 text-white"
                      : "border-neutral-300 text-neutral-600 group-hover:border-primary-300 group-hover:text-primary-700",
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 pr-16 leading-relaxed text-neutral-600">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
