"use client";

import { motion } from "framer-motion";

interface LogoProps {
  variant?: "light" | "dark" | "gold";
  size?: number;
  showText?: boolean;
  className?: string;
  animate?: boolean;
}

export default function Logo({
  variant = "gold",
  size = 40,
  showText = false,
  className = "",
  animate = false,
}: LogoProps) {
  const colors = {
    light: { mark: "#F2F1EC", bg: "transparent" },
    dark: { mark: "#0C1420", bg: "transparent" },
    gold: { mark: "#C9A655", bg: "transparent" },
  };

  const { mark } = colors[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        whileHover={animate ? { rotate: 5, scale: 1.05 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring */}
          <circle
            cx="20"
            cy="20"
            r="19"
            stroke={mark}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          {/* S path */}
          <path
            d="M14 14.5C14 12.5 15.8 11 18.5 11C21.5 11 23 12.5 23 14.5C23 16.5 21 17.5 18.5 18.5C16 19.5 14 20.5 14 22.5C14 24.5 15.8 26 19.5 26C22.5 26 24.5 24.5 24.5 22.5"
            stroke={mark}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* A path */}
          <path
            d="M17 29L20.5 12L24 29"
            stroke={mark}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* A crossbar */}
          <path
            d="M18 22.5H23"
            stroke={mark}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Gold dot accent */}
          <circle cx="20" cy="20" r="1.5" fill={mark} opacity="0.6" />
        </svg>
      </motion.div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className="font-sans font-700 tracking-wide text-sm"
            style={{ color: mark, letterSpacing: "0.12em" }}
          >
            SABIL AHMAD
          </span>
          <span className="font-sans text-xs" style={{ color: "var(--color-mist)", letterSpacing: "0.06em" }}>
            CTO · BLOCKCHAIN ENGINEER
          </span>
        </div>
      )}
    </div>
  );
}
