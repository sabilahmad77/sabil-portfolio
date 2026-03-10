import AnimatedSection from "@/components/ui/AnimatedSection";
import { PILLARS } from "@/lib/constants";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left — Text */}
          <div>
            <AnimatedSection>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--color-gold)" }}
              >
                About
              </p>
              <h2
                className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold italic mb-8 leading-tight"
                style={{ color: "var(--color-cream)" }}
              >
                From Pakistan to Doha.
                <br />
                From freelancer to CTO.
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="space-y-6 text-base lg:text-lg leading-relaxed" style={{ color: "var(--color-pearl)" }}>
                <p>
                  I started writing code in Peshawar with no roadmap and no network. What I had was
                  compulsive curiosity — and the internet. Over 100 projects as a freelancer on Fiverr
                  and Upwork taught me that quality of execution is the only sustainable competitive
                  advantage. Every client, every broken deployment, every 2am debugging session was
                  compounding.
                </p>
                <p>
                  Today I lead engineering at{" "}
                  <a
                    href="https://fann.art"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-gold-warm)" }}
                  >
                    FANN
                  </a>{" "}
                  — a blockchain-native art marketplace redefining how physical art is owned, verified,
                  and traded in the GCC and beyond. I&apos;ve architected RWA tokenization systems, AI
                  valuation engines, and smart contract infrastructure that doesn&apos;t just work — it
                  audits clean and scales without drama.
                </p>
                <p>
                  My north star hasn&apos;t changed: build things that are genuinely harder to replicate
                  than they are to admire. That standard applies whether I&apos;m deploying a Solidity
                  contract to Ethereum mainnet, designing a system architecture for a Series A team, or
                  choosing which startup to build next.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--color-gold-warm)", color: "var(--color-abyss)" }}
              >
                Work With Me
              </a>
              <a
                href="https://linkedin.com/in/sabilahmad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:border-[var(--color-gold)]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-pearl)" }}
              >
                LinkedIn Profile →
              </a>
            </AnimatedSection>
          </div>

          {/* Right — Photo + Core Role */}
          <div>
            <AnimatedSection direction="right" delay={0.15}>
              {/* Placeholder for headshot */}
              <div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border mb-8"
                style={{ borderColor: "var(--color-gold-dim)", backgroundColor: "var(--color-surface)" }}
              >
                {/* When headshot is available, replace this with <Image> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                    style={{ backgroundColor: "var(--color-surface-2)" }}
                  >
                    👨‍💻
                  </div>
                  <p className="text-sm text-center" style={{ color: "var(--color-mist)" }}>
                    Sabil Ahmad
                    <br />
                    <span style={{ color: "var(--color-smoke)" }}>WebSummit PITCH · Doha, Qatar</span>
                  </p>
                </div>
                {/* Gold gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{
                    background: "linear-gradient(to top, rgba(179,145,72,0.08), transparent)",
                  }}
                />
                {/* Gold border glow */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(179,145,72,0.2)" }}
                />
              </div>

              {/* Role badge */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--color-emerald)" }}
                />
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--color-cream)" }}>
                    Chief Technology Officer
                  </div>
                  <div className="text-xs" style={{ color: "var(--color-mist)" }}>
                    FANN · Doha, Qatar · Aug 2024–Present
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Pillars */}
        <div>
          <AnimatedSection>
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-8 text-center"
              style={{ color: "var(--color-gold)" }}
            >
              Core Engineering Pillars
            </h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PILLARS.map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.08}>
                <div
                  className="p-5 rounded-xl border card-hover h-full"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <div className="text-2xl mb-3">{pillar.icon}</div>
                  <h4
                    className="text-sm font-semibold mb-2 leading-tight"
                    style={{ color: "var(--color-cream)" }}
                  >
                    {pillar.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-mist)" }}>
                    {pillar.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
