"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SITE, STATS } from "@/lib/constants";

const BlockchainBackground = dynamic(
  () => import("@/components/3d/BlockchainBackground"),
  { ssr: false, loading: () => null }
);

// ── Stat counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(numericValue / 40);
          const timer = setInterval(() => {
            start += step;
            if (start >= numericValue) {
              setCount(numericValue);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="font-display text-3xl lg:text-4xl font-bold" style={{ color: "var(--color-gold-warm)" }}>
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 tracking-wide uppercase" style={{ color: "var(--color-mist)" }}>
        {label}
      </div>
    </motion.div>
  );
}

// ── Social icon SVGs ──────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.52 11.52 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.295-1.23 3.295-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://github.com/sabilahmad77", label: "GitHub", icon: <GithubIcon /> },
  { href: "https://linkedin.com/in/sabilahmad", label: "LinkedIn", icon: <LinkedinIcon /> },
  { href: "https://x.com/sabilahmad77", label: "X / Twitter", icon: <XIcon /> },
];

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-abyss)", isolation: "isolate" }}
    >
      {/* ── 3D Blockchain network — fills full bg ── */}
      <BlockchainBackground />

      {/* ── Subtle gradient overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(12,20,32,0.45) 0%, rgba(12,20,32,0.92) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--color-abyss), transparent)" }}
      />

      {/* ── Content — centred over the 3D bg ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center py-32">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-emerald)" }} />
          <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "var(--color-mist)" }}>
            CTO · VentraM Group · FANN · Doha, Qatar
          </span>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-emerald)" }} />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none mb-5"
          style={{ color: "var(--color-cream)" }}
        >
          Sabil Ahmad
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="text-xl sm:text-2xl lg:text-3xl font-light mb-5 leading-snug"
          style={{ color: "var(--color-gold-warm)" }}
        >
          Building the Infrastructure of Tomorrow.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48 }}
          className="text-base lg:text-lg leading-relaxed mb-10 max-w-2xl"
          style={{ color: "var(--color-pearl)" }}
        >
          Blockchain architect · AI product engineer · Venture founder.
          Building investor-ready platforms that bridge traditional assets
          with Web3 innovation — from Doha, globally.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--color-gold-warm)",
              color: "var(--color-abyss)",
              boxShadow: "0 8px 30px -8px rgba(201,166,85,0.45)",
            }}
          >
            Hire as CTO
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105 hover:bg-[rgba(201,166,85,0.08)]"
            style={{
              borderColor: "var(--color-gold)",
              color: "var(--color-gold-warm)",
              backgroundColor: "transparent",
            }}
          >
            View Projects
          </a>

          <a
            href={`https://wa.me/${SITE.whatsapp}?text=Hey! I'd like to book a strategy call.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              color: "var(--color-pearl)",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          >
            Book a Call →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-14 w-full max-w-lg mx-auto"
        >
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} delay={0.78 + i * 0.08} />
          ))}
        </motion.div>

        {/* Social links — pill-button style with icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="flex items-center gap-3 flex-wrap justify-center"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-[var(--color-gold)] hover:text-[var(--color-gold-warm)]"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "var(--color-pearl)",
                backgroundColor: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-smoke)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10"
          style={{ backgroundColor: "var(--color-gold-dim)" }}
        />
      </motion.div>
    </section>
  );
}
