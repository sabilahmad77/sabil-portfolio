"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SKILL_GROUPS } from "@/lib/constants";

const COLOR_MAP: Record<string, string> = {
  gold:    "var(--color-gold-warm)",
  teal:    "var(--color-teal)",
  indigo:  "var(--color-indigo)",
  violet:  "var(--color-violet)",
  emerald: "var(--color-emerald)",
};

const COLOR_HEX: Record<string, string> = {
  gold:    "#C9A655",
  teal:    "#45E3D3",
  indigo:  "#6B7FE8",
  violet:  "#9375B5",
  emerald: "#3DD68C",
};

const SKILL_GLYPHS: Record<string, string> = {
  "Blockchain & Web3":        "⛓",
  "DeFi & DApp Development":  "◈",
  "Full-Stack (MERN)":        "⚡",
  "Backend & APIs":           "⬡",
  "AI & Machine Learning":    "◉",
  "Infrastructure & DevOps":  "◆",
};

function ProficiencyBar({
  value,
  color,
  inView,
  delay,
}: {
  value: number;
  color: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <div
      className="w-full h-1 rounded-full overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-2)" }}
    >
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-abyss)" }}
    >
      {/* Subtle background glows */}
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 100% 50%, rgba(107,127,232,0.05) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[300px] h-[250px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(69,227,211,0.04) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <AnimatedSection className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Skills & Expertise
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-bold mb-4 leading-none"
            style={{ color: "var(--color-cream)" }}
          >
            A Toolkit Built
            <br />
            <span className="italic" style={{ color: "var(--color-gold-warm)" }}>
              for the Frontier.
            </span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--color-mist)" }}>
            Full-stack competency from smart contract bytecode to React UI — with deep
            specialization in blockchain infrastructure, DeFi protocols, and AI integration.
          </p>
        </AnimatedSection>

        {/* ── Skills grid — clean 3×2 ── */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border overflow-hidden flex flex-col"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${COLOR_HEX[group.color]}55`;
                e.currentTarget.style.boxShadow = `0 20px 50px -12px ${COLOR_HEX[group.color]}22`;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${COLOR_HEX[group.color]}70, transparent)`,
                }}
              />
              {/* Corner glow on hover */}
              <div
                className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${COLOR_HEX[group.color]}15 0%, transparent 70%)`,
                }}
              />

              <div className="p-5 flex flex-col h-full">
                {/* Category icon + title + proficiency */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                      style={{
                        backgroundColor: `${COLOR_HEX[group.color]}15`,
                        border: `1px solid ${COLOR_HEX[group.color]}30`,
                        color: COLOR_MAP[group.color],
                      }}
                    >
                      {SKILL_GLYPHS[group.category] ?? "◆"}
                    </div>
                    <h3
                      className="font-semibold text-sm leading-snug"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {group.category}
                    </h3>
                  </div>
                  <span
                    className="text-xl font-bold font-display leading-none shrink-0"
                    style={{ color: COLOR_MAP[group.color] }}
                  >
                    {group.proficiency}%
                  </span>
                </div>

                {/* Proficiency bar */}
                <ProficiencyBar
                  value={group.proficiency}
                  color={COLOR_HEX[group.color]}
                  inView={inView}
                  delay={0.15 + i * 0.08}
                />

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {group.skills.slice(0, i === 0 ? 8 : 6).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded-md font-medium"
                      style={{
                        backgroundColor: `${COLOR_HEX[group.color]}10`,
                        color: COLOR_MAP[group.color],
                        border: `1px solid ${COLOR_HEX[group.color]}25`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Summary stats row ── */}
        <AnimatedSection delay={0.4} className="mt-6">
          <div
            className="relative grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl border overflow-hidden text-center"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(201,166,85,0.4), transparent)",
              }}
            />
            {[
              { value: "10+",  label: "Specializations",    color: "var(--color-gold-warm)" },
              { value: "6+",   label: "Years Coding",        color: "var(--color-teal)" },
              { value: "5+",   label: "Blockchain Networks", color: "var(--color-indigo)" },
              { value: "100+", label: "Projects Worked On",  color: "var(--color-violet)" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display text-3xl lg:text-4xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: "var(--color-mist)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
