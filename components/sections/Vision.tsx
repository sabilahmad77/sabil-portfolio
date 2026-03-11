"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const FOCUS_AREAS = [
  {
    glyph: "◈",
    color: "#C9A655",
    title: "RWA Tokenization at Scale",
    description: "Physical assets — art, real estate, commodities — owned and traded on-chain.",
  },
  {
    glyph: "◉",
    color: "#45E3D3",
    title: "AI-Augmented Creative Economies",
    description: "Valuation, provenance, and discovery powered by machine intelligence.",
  },
  {
    glyph: "⬡",
    color: "#9375B5",
    title: "GCC-First Web3 Infrastructure",
    description: "Building the on-ramps for the world's most dynamic emerging market.",
  },
  {
    glyph: "◆",
    color: "#6B7FE8",
    title: "Cross-Chain Interoperability",
    description: "Assets that move seamlessly across Ethereum, Polygon, and beyond.",
  },
];

export default function Vision() {
  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-void)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, var(--color-gold) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Label */}
        <AnimatedSection>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--color-gold)" }}
          >
            Vision
          </p>
        </AnimatedSection>

        {/* Quote */}
        <AnimatedSection delay={0.1}>
          <blockquote
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold italic leading-tight mb-7"
            style={{ color: "var(--color-cream)" }}
          >
            &ldquo;Every dominant technology platform of the next decade will have blockchain provenance
            at its core, AI at its decision layer, and the{" "}
            <span style={{ color: "var(--color-gold-warm)" }}>GCC at its geographic center.</span>
            <br />
            I&apos;m building at all three intersections — at the same time.&rdquo;
          </blockquote>
        </AnimatedSection>

        {/* Attribution */}
        <AnimatedSection delay={0.2} className="mb-14">
          <div className="flex items-center justify-center gap-4">
            <div
              className="h-px w-10"
              style={{ backgroundColor: "var(--color-gold-dim)" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-mist)" }}
            >
              Sabil Ahmad · CTO, FANN
            </span>
            <div
              className="h-px w-10"
              style={{ backgroundColor: "var(--color-gold-dim)" }}
            />
          </div>
        </AnimatedSection>

        {/* Focus areas — clean 4-col cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {FOCUS_AREAS.map((area, i) => (
            <AnimatedSection key={area.title} delay={0.1 + i * 0.08}>
              <div
                className="group relative p-4 rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${area.color}55`;
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.015)";
                  e.currentTarget.style.boxShadow = `0 16px 40px -10px ${area.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Top gradient accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, transparent, ${area.color}80, transparent)`,
                  }}
                />
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${area.color}20 0%, transparent 70%)`,
                  }}
                />

                {/* Glyph icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm mb-3"
                  style={{
                    backgroundColor: `${area.color}15`,
                    border: `1px solid ${area.color}30`,
                    color: area.color,
                  }}
                >
                  {area.glyph}
                </div>

                <h4
                  className="font-semibold text-sm mb-1.5 leading-snug"
                  style={{ color: "var(--color-cream)" }}
                >
                  {area.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-mist)" }}>
                  {area.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
