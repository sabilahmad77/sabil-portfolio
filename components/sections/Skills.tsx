"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { SKILL_GROUPS } from "@/lib/constants";
import MiniIcon3D, { type ShapeType } from "@/components/3d/MiniIcon3D";

const COLOR_MAP: Record<string, string> = {
  gold: "var(--color-gold-warm)",
  teal: "var(--color-teal)",
  indigo: "var(--color-indigo)",
  violet: "var(--color-violet)",
  emerald: "var(--color-emerald)",
};

const COLOR_HEX: Record<string, string> = {
  gold: "#C9A655",
  teal: "#45E3D3",
  indigo: "#6B7FE8",
  violet: "#9375B5",
  emerald: "#3DD68C",
};

const SHAPE_MAP: Record<string, ShapeType> = {
  gold: "octahedron",
  teal: "icosahedron",
  indigo: "dodecahedron",
  violet: "torusKnot",
  emerald: "sphere",
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "var(--color-abyss)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Skills & Expertise
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "var(--color-cream)" }}
          >
            A Toolkit Built
            <br />
            <span className="italic" style={{ color: "var(--color-gold-warm)" }}>
              for the Frontier.
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-mist)" }}>
            Full-stack competency from smart contract bytecode to React UI — with deep
            specialization in blockchain infrastructure, DeFi protocols, and AI integration.
          </p>
        </AnimatedSection>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, i) => (
            <AnimatedSection key={group.category} delay={i * 0.08}>
              <div
                className="p-6 rounded-xl border h-full card-hover"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                {/* 3D Icon */}
                <MiniIcon3D
                  shape={SHAPE_MAP[group.color] ?? "octahedron"}
                  color={COLOR_HEX[group.color] ?? "#C9A655"}
                  accentColor="#45E3D3"
                  size={64}
                  className="mb-4"
                />

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="font-semibold text-base"
                    style={{ color: "var(--color-cream)" }}
                  >
                    {group.category}
                  </h3>
                  <span
                    className="text-sm font-bold"
                    style={{ color: COLOR_MAP[group.color] }}
                  >
                    {group.proficiency}%
                  </span>
                </div>

                {/* Proficiency bar */}
                <div
                  className="w-full h-1.5 rounded-full mb-5 overflow-hidden"
                  style={{ backgroundColor: "var(--color-surface-2)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${group.proficiency}%`,
                      backgroundColor: COLOR_MAP[group.color],
                    }}
                  />
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-md font-medium"
                      style={{
                        backgroundColor: `${COLOR_MAP[group.color]}12`,
                        color: COLOR_MAP[group.color],
                        border: `1px solid ${COLOR_MAP[group.color]}30`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional skills summary */}
        <AnimatedSection delay={0.4} className="mt-12">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 rounded-2xl border text-center"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            {[
              { value: "10+", label: "Specializations", color: "var(--color-gold-warm)" },
              { value: "6+", label: "Years Coding", color: "var(--color-teal)" },
              { value: "5+", label: "Blockchain Networks", color: "var(--color-indigo)" },
              { value: "100+", label: "Projects Worked On", color: "var(--color-violet)" },
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
