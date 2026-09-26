"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Counts up to `value` when scrolled into view. The final value is rendered
 * on the server so it's correct without JS and for screen readers; users
 * who prefer reduced motion just see the number.
 */
export function AnimatedCounter({ value, prefix = "", suffix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 90 });
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const format = (n: number) => `${prefix}${Math.round(n).toLocaleString()}${suffix}`;

  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    // Reset to 0 just before animating so the SSR value doesn't flash first
    if (!isInView) {
      ref.current.textContent = format(0);
      return;
    }
    motionValue.set(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, reduceMotion, motionValue, value]);

  useEffect(() => {
    if (reduceMotion) return;
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [springValue, reduceMotion, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
