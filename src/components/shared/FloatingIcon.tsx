"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingIconProps {
  children: ReactNode;
}

export function FloatingIcon({ children }: FloatingIconProps) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotate: [0, 3, 0, -3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
