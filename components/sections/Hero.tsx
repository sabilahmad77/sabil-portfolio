"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SITE, STATS } from "@/lib/constants";

const HeroSphere = dynamic(() => import("@/components/3d/HeroSphere"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

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
      className="text-center lg:text-left"
    >
      <div
        className="font-display text-3xl lg:text-4xl font-bold"
        style={{ color: "var(--color-gold-warm)" }}
      >
        {count}{suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: "var(--color-mist)" }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--color-abyss)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(179,145,72,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, var(--color-abyss), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-24 lg:py-0">
          {/* Left — Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--color-emerald)" }}
              />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: "var(--color-mist)" }}
              >
                CTO · FANN · Doha, Qatar
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none mb-4"
              style={{ color: "var(--color-cream)" }}
            >
              Sabil Ahmad
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xl sm:text-2xl lg:text-3xl font-light mb-6 leading-snug"
              style={{ color: "var(--color-gold-warm)" }}
            >
              Building the Infrastructure
              <br />
              of Tomorrow.
            </motion.p>

            {/* Sub-description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base lg:text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--color-mist)" }}
            >
              Blockchain architect · AI product engineer · Venture founder.
              Building investor-ready platforms that bridge traditional assets
              with Web3 innovation — from Doha, globally.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: "var(--color-gold-warm)",
                  color: "var(--color-abyss)",
                  boxShadow: "0 8px 30px -8px rgba(201,166,85,0.4)",
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
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105"
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
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{ color: "var(--color-pearl)" }}
              >
                Book a Call →
              </a>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
              {STATS.map((stat, i) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={0.7 + i * 0.1}
                />
              ))}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-5 mt-10"
            >
              {[
                { href: SITE.github, label: "GitHub" },
                { href: SITE.linkedin, label: "LinkedIn" },
                { href: SITE.twitter, label: "X / Twitter" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-[var(--color-gold-warm)]"
                  style={{ color: "var(--color-smoke)" }}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[280px] sm:h-[400px] lg:h-[620px]"
          >
            <HeroSphere />
          </motion.div>
        </div>
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
