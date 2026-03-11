"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import { useState } from "react";

export default function About() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section
      id="about"
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      {/* Top gradient — blends from Hero (abyss) into navy */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--color-abyss), transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Bio + Photo grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left — Text */}
          <div>
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4"
                 style={{ color: "var(--color-gold)" }}>
                About
              </p>
              <h2
                className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold italic mb-5 leading-tight"
                style={{ color: "var(--color-cream)" }}
              >
                From Pakistan to Doha.
                <br />
                From freelancer to CTO.
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="space-y-3 text-[0.95rem] lg:text-base leading-relaxed"
                style={{ color: "var(--color-pearl)" }}
              >
                <p>
                  From a small tech corridor in Pakistan to the CTO seat in Doha —
                  driven by curiosity, persistence, and a passion for building systems
                  that scale.
                </p>
                <p>
                  I started as a freelancer delivering web and blockchain solutions for
                  global clients, gradually evolving into a blockchain architect working
                  across Web3 infrastructure, smart contracts, and full-stack platforms.
                </p>
                <p>
                  Today I serve as CTO of{" "}
                  <a
                    href="https://fann.art"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-gold-warm)" }}
                  >
                    FANN
                  </a>
                  {" "}and Co-Founder of{" "}
                  <a
                    href="https://ventramgroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-gold-warm)" }}
                  >
                    VentraM Group
                  </a>
                  {" "}— building a blockchain-native ArtTech ecosystem at FANN while
                  launching high-growth technology ventures across the GCC through VentraM.
                  My focus remains on product architecture, scalable platforms, and
                  investor-ready technology built for global markets.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="mt-7 flex flex-wrap gap-4">
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
                LinkedIn →
              </a>
              <a
                href="https://t.me/sabilahmad77"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-pearl)" }}
              >
                Telegram →
              </a>
            </AnimatedSection>
          </div>

          {/* Right — Photo + Badge */}
          <div>
            <AnimatedSection direction="right" delay={0.15}>
              {/* max-w constrains the photo to ~75% of the column — 25% smaller */}
              <div className="w-full max-w-[380px] lg:ml-auto">
              <div
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border mb-4"
                style={{
                  borderColor: "rgba(179,145,72,0.3)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                {/* Real photo — falls back to placeholder if missing */}
                {!photoError ? (
                  <Image
                    src="/sabil-photo.jpg"
                    alt="Sabil Ahmad"
                    fill
                    className="object-cover object-top"
                    onError={() => setPhotoError(true)}
                    priority
                  />
                ) : (
                  /* Placeholder shown until photo file is placed in public/ */
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    style={{
                      background: "linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
                    }}
                  >
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
                )}

                {/* Bottom gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(14,29,49,0.85) 0%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                  <p className="text-sm font-semibold" style={{ color: "var(--color-cream)" }}>
                    Sabil Ahmad
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-gold)" }}>
                    Doha, Qatar · VentraM Group · FANN
                  </p>
                </div>

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
                    CTO & Co-Founder
                  </div>
                  <div className="text-xs truncate" style={{ color: "var(--color-mist)" }}>
                    VentraM Group · FANN · Doha, Qatar
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
              </div>{/* end max-w wrapper */}
            </AnimatedSection>
          </div>
        </div>

      </div>
    </section>
  );
}
