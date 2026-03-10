import AnimatedSection from "@/components/ui/AnimatedSection";

const FOCUS_AREAS = [
  {
    icon: "🏛",
    title: "RWA Tokenization at Scale",
    description: "Physical assets — art, real estate, commodities — owned and traded on-chain.",
  },
  {
    icon: "🤖",
    title: "AI-Augmented Creative Economies",
    description: "Valuation, provenance, and discovery powered by machine intelligence.",
  },
  {
    icon: "🌍",
    title: "GCC-First Web3 Infrastructure",
    description: "Building the on-ramps for the world's most dynamic emerging market.",
  },
  {
    icon: "🔗",
    title: "Cross-Chain Interoperability",
    description: "Physical assets that move seamlessly across Ethereum, Polygon, and beyond.",
  },
];

export default function Vision() {
  return (
    <section
      className="py-24 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-void)" }}
    >
      {/* Animated gradient background */}
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
            className="text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: "var(--color-gold)" }}
          >
            Vision
          </p>
        </AnimatedSection>

        {/* Quote */}
        <AnimatedSection delay={0.1}>
          <blockquote
            className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold italic leading-tight mb-8"
            style={{ color: "var(--color-cream)" }}
          >
            "Every dominant technology platform of the next decade will have blockchain provenance
            at its core, AI at its decision layer, and the{" "}
            <span style={{ color: "var(--color-gold-warm)" }}>GCC at its geographic center.</span>
            <br />
            I&apos;m building at all three intersections — at the same time."
          </blockquote>
        </AnimatedSection>

        {/* Attribution */}
        <AnimatedSection delay={0.2} className="mb-20">
          <div className="flex items-center justify-center gap-4">
            <div
              className="h-px w-12"
              style={{ backgroundColor: "var(--color-gold-dim)" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-mist)" }}
            >
              Sabil Ahmad · CTO, FANN
            </span>
            <div
              className="h-px w-12"
              style={{ backgroundColor: "var(--color-gold-dim)" }}
            />
          </div>
        </AnimatedSection>

        {/* Focus areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {FOCUS_AREAS.map((area, i) => (
            <AnimatedSection key={area.title} delay={0.1 + i * 0.1}>
              <div
                className="p-5 rounded-xl border card-hover"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="text-2xl mb-3">{area.icon}</div>
                <h4
                  className="font-semibold text-sm mb-2"
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
