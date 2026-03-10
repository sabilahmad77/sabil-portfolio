"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import ThematicIcon3D, { type ThemeType } from "@/components/3d/ThematicIcon3D";
import { PILLARS } from "@/lib/constants";

// Relevant semantic icons for each engineering pillar
const PILLAR_THEMES: ThemeType[] = ["lock", "layers", "token", "chart", "rocket"];
const PILLAR_COLORS  = ["#C9A655", "#45E3D3", "#9375B5", "#6B7FE8", "#3DD68C"];
const PILLAR_ACCENTS = ["#45E3D3", "#C9A655", "#C9A655", "#45E3D3", "#C9A655"];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Bio + Photo grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — Text */}
          <div>
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4"
                 style={{ color: "var(--color-gold)" }}>
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
              <div
                className="space-y-5 text-base lg:text-[1.05rem] leading-relaxed"
                style={{ color: "var(--color-pearl)" }}
              >
                <p>
                  From a small tech corridor in Peshawar to the CTO seat at one of the
                  GCC&apos;s most ambitious blockchain ventures — the path was neither
                  linear nor safe, and that&apos;s precisely why it compounded. I taught
                  myself to code through necessity, freelanced from modest gigs to
                  six-figure engagements across Dubai, London, and New York. Over
                  100 products shipped. Six startups built. Zero shortcuts.
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
                  — a blockchain-native marketplace redefining how physical art is
                  owned, authenticated, and traded across the GCC and globally.
                  I&apos;ve architected the full stack: RWA tokenization, AI-driven
                  valuation engines, Solidity smart contracts on Ethereum and Polygon,
                  and a platform infrastructure built to audit clean and scale without
                  drama.
                </p>
                <p>
                  The standard I hold is simple: build things that are harder to
                  replicate than they are to admire. That applies whether I&apos;m
                  deploying a contract to mainnet, architecting a system for a Series A
                  raise, or deciding which venture to pursue next. If it doesn&apos;t
                  create durable value, it doesn&apos;t ship.
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
                className="px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold-warm)]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-pearl)" }}
              >
                LinkedIn Profile →
              </a>
            </AnimatedSection>
          </div>

          {/* Right — Real Photo + Badge */}
          <div>
            <AnimatedSection direction="right" delay={0.15}>
              {/* Photo frame */}
              <div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border mb-6"
                style={{
                  borderColor: "rgba(179,145,72,0.3)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                {/* Photo placeholder — replace with <Image> once headshot is ready */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{
                    background: "linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
                  }}
                >
                  {/* Stylised monogram avatar */}
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, rgba(201,166,85,0.2), rgba(69,227,211,0.1))",
                      border: "2px solid rgba(201,166,85,0.4)",
                      color: "var(--color-gold-warm)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    SA
                  </div>
                  <p className="text-xs" style={{ color: "var(--color-smoke)" }}>
                    Add headshot → <code style={{ color: "var(--color-teal)" }}>public/sabil-photo.jpg</code>
                  </p>
                </div>

                {/* Gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(14,29,49,0.85) 0%, transparent 100%)",
                  }}
                />
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                  <p className="text-sm font-semibold" style={{ color: "var(--color-cream)" }}>
                    Sabil Ahmad
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-gold)" }}>
                    Doha, Qatar · FANN
                  </p>
                </div>

                {/* Border glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(179,145,72,0.25)" }}
                />
              </div>

              {/* CTO badge */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border w-full"
                style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                  style={{ backgroundColor: "var(--color-emerald)" }}
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: "var(--color-cream)" }}>
                    Chief Technology Officer
                  </div>
                  <div className="text-xs truncate" style={{ color: "var(--color-mist)" }}>
                    FANN · Doha, Qatar · Aug 2024–Present
                  </div>
                </div>
                <div className="ml-auto shrink-0">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: "rgba(61,214,140,0.1)", color: "var(--color-emerald)" }}
                  >
                    Active
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ── Core Engineering Pillars ── */}
        <div>
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                 style={{ color: "var(--color-gold)" }}>
                Engineering Philosophy
              </p>
              <h3
                className="font-display text-2xl lg:text-3xl font-bold"
                style={{ color: "var(--color-cream)" }}
              >
                Core Engineering Pillars
              </h3>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PILLARS.map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.08}>
                <div
                  className="p-5 rounded-xl border card-hover h-full flex flex-col"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  {/* Thematic 3D icon */}
                  <ThematicIcon3D
                    theme={PILLAR_THEMES[i]}
                    color={PILLAR_COLORS[i]}
                    accentColor={PILLAR_ACCENTS[i]}
                    size={76}
                    className="mb-3"
                  />
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
