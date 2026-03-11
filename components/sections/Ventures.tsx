import AnimatedSection from "@/components/ui/AnimatedSection";
import { VENTURES_FEATURED, VENTURES_MINI } from "@/lib/constants";

const STATUS_COLORS: Record<string, string> = {
  emerald: "var(--color-emerald)",
  gold: "var(--color-gold-warm)",
  violet: "var(--color-violet)",
};

export default function Ventures() {
  return (
    <section
      id="ventures"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-abyss)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ backgroundColor: "var(--color-gold)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Ventures
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            style={{ color: "var(--color-cream)" }}
          >
            Built from Scratch.
            <br />
            <span className="italic" style={{ color: "var(--color-gold-warm)" }}>
              Shipped to the World.
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: "var(--color-mist)" }}>
            Two flagship ventures at the intersection of blockchain, AI, and the GCC market — plus
            four more products in production.
          </p>
        </AnimatedSection>

        {/* Featured venture cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {VENTURES_FEATURED.map((venture, i) => (
            <AnimatedSection key={venture.id} direction={i === 0 ? "left" : "right"} delay={0.1}>
              <div
                className="relative p-8 lg:p-10 rounded-2xl border h-full card-hover"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[venture.statusColor] }}
                    />
                    <span className="text-xs font-medium" style={{ color: STATUS_COLORS[venture.statusColor] }}>
                      {venture.status}
                    </span>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-mist)" }}
                  >
                    My Venture
                  </span>
                </div>

                {/* Logo placeholder + name */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border"
                    style={{
                      backgroundColor: "var(--color-surface-2)",
                      borderColor: "var(--color-gold-dim)",
                      color: "var(--color-gold-warm)",
                    }}
                  >
                    {venture.name[0]}
                  </div>
                  <div>
                    <h3
                      className="font-display text-2xl lg:text-3xl font-bold"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {venture.name}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--color-gold-warm)" }}>
                      {venture.tagline}
                    </p>
                  </div>
                </div>

                {/* Category tags */}
                <p className="text-xs mb-4" style={{ color: "var(--color-teal)" }}>
                  {venture.category}
                </p>

                {/* Description */}
                <p className="text-sm lg:text-base leading-relaxed mb-6" style={{ color: "var(--color-pearl)" }}>
                  {venture.description}
                </p>

                {/* Role */}
                <div
                  className="flex items-center gap-2 mb-6 text-sm"
                  style={{ color: "var(--color-mist)" }}
                >
                  <span className="font-semibold" style={{ color: "var(--color-cream)" }}>
                    Role:
                  </span>
                  {venture.role} · {venture.period} · {venture.location}
                </div>

                {/* Achievements */}
                <ul className="space-y-2 mb-6">
                  {venture.achievements.slice(0, 3).map((a, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-pearl)" }}>
                      <span style={{ color: "var(--color-gold)" }}>↳</span>
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {venture.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{
                        backgroundColor: "var(--color-surface-2)",
                        color: "var(--color-mist)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-3 mt-auto">
                  {venture.url && venture.url !== "#" && (
                    <a
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: "var(--color-gold-warm)",
                        color: "var(--color-abyss)",
                      }}
                    >
                      Explore {venture.name} →
                    </a>
                  )}
                </div>

                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] opacity-[0.06] pointer-events-none"
                  style={{ backgroundColor: "var(--color-gold)" }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mini ventures */}
        <AnimatedSection delay={0.2}>
          <h3
            className="text-sm font-semibold uppercase tracking-widest mb-6 text-center"
            style={{ color: "var(--color-gold)" }}
          >
            Also Building
          </h3>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VENTURES_MINI.map((v, i) => (
            <AnimatedSection key={v.id} delay={0.05 * i}>
              <div
                className="p-5 rounded-xl border card-hover"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-medium"
                    style={{ color: v.status === "Soon" ? "var(--color-violet)" : "var(--color-emerald)" }}
                  >
                    ● {v.status}
                  </span>
                </div>
                <h4
                  className="font-semibold text-base mb-2"
                  style={{ color: "var(--color-cream)" }}
                >
                  {v.name}
                </h4>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--color-mist)" }}>
                  {v.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {v.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: "var(--color-surface-2)", color: "var(--color-smoke)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {v.url && (
                  <a
                    href={v.url}
                    target={v.url !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs transition-colors hover:text-[var(--color-gold-warm)]"
                    style={{ color: "var(--color-mist)" }}
                  >
                    Visit site →
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
