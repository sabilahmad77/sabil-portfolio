"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const directionMap = {
    up:    { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    down:  { hidden: { y: -40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left:  { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    none:  { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  const variants = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
