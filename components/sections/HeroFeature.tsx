"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { PILLARS } from "@/lib/constants";

const FeatureOrb3D = dynamic(() => import("@/components/3d/FeatureOrb3D"), {
  ssr: false,
  loading: () => null,
});

const EXPERTISE = [
  { label: "Blockchain Architect",  color: "#C9A655", icon: "⬡" },
  { label: "AI Product Builder",    color: "#45E3D3", icon: "◈" },
  { label: "Venture Founder",       color: "#9375B5", icon: "◆" },
  { label: "Smart Contract Expert", color: "#6B7FE8", icon: "◉" },
];

const PILLAR_COLORS = ["#C9A655", "#45E3D3", "#9375B5", "#6B7FE8", "#3DD68C"];

export default function HeroFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={ref}
      className="relative py-0 overflow-hidden"
      style={{ backgroundColor: "var(--color-abyss)" }}
    >
      {/* Top gradient — blends from About (navy) into abyss */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--color-navy), transparent)" }}
      />

      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Deep glow behind orb */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.07]"
          style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Orb + Content row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[420px]">

          {/* Left — 3D Orb */}
          <div className="relative h-[320px] lg:h-[420px] w-full">
            <FeatureOrb3D className="h-full" />
          </div>

          {/* Right — Content */}
          <div className="pb-8 lg:py-16 lg:pl-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-gold)" }}
            >
              What I Build
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl lg:text-5xl font-bold leading-tight mb-5"
              style={{ color: "var(--color-cream)" }}
            >
              Infrastructure that
              <br />
              <span className="italic" style={{ color: "var(--color-gold-warm)" }}>
                Compounds.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--color-mist)" }}
            >
              From smart contract bytecode to full-stack SaaS — I architect systems
              designed to survive production, pass audits, and scale without rewrite.
            </motion.p>

            {/* Expertise tags */}
            <div className="flex flex-col gap-3">
              {EXPERTISE.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.36 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg leading-none" style={{ color: p.color }}>
                    {p.icon}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--color-pearl)" }}>
                    {p.label}
                  </span>
                  <div
                    className="flex-1 h-px max-w-[80px]"
                    style={{ background: `linear-gradient(to right, ${p.color}40, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Compact Core Engineering Pillars ── */}
        <div
          ref={pillarsRef}
          className="border-t pb-12 pt-7"
          style={{ borderColor: "var(--color-border)" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Engineering Pillars
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 10 }}
                animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col gap-2 p-3 rounded-xl border overflow-hidden cursor-default"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${PILLAR_COLORS[i]}60`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 8px 28px -6px ${PILLAR_COLORS[i]}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-14 h-14 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${PILLAR_COLORS[i]}25 0%, transparent 70%)`,
                  }}
                />
                {/* Colored dot — highlights on hover */}
                <div
                  className="w-2 h-2 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
                  style={{ backgroundColor: PILLAR_COLORS[i], boxShadow: `0 0 6px ${PILLAR_COLORS[i]}80` }}
                />
                {/* Title */}
                <span
                  className="text-xs font-semibold leading-snug transition-colors duration-200"
                  style={{ color: "var(--color-cream)" }}
                >
                  {pillar.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom gradient into next section (Ventures) */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--color-navy), transparent)" }}
      />
    </section>
  );
}
