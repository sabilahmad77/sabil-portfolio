"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { PROJECTS, PROJECT_CATEGORIES, CONTRACTS } from "@/lib/constants";

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  Live: { color: "var(--color-emerald)", bg: "rgba(61,214,140,0.1)" },
  Production: { color: "var(--color-gold-warm)", bg: "rgba(201,166,85,0.1)" },
  Beta: { color: "var(--color-violet)", bg: "rgba(147,117,181,0.1)" },
};

const NETWORK_COLORS: Record<string, string> = {
  indigo: "var(--color-indigo)",
  violet: "var(--color-violet)",
  gold: "var(--color-gold-warm)",
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.some((c) => c === activeCategory));

  return (
    <section
      id="projects"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Projects
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--color-cream)" }}
          >
            60+ Products Shipped.
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: "var(--color-mist)" }}>
            A cross-chain, cross-domain portfolio spanning DeFi, NFT marketplaces, GameFi,
            logistics, and EdTech — from testnet to Ethereum mainnet.
          </p>
        </AnimatedSection>

        {/* Category filter */}
        <AnimatedSection delay={0.1} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor:
                    activeCategory === cat ? "var(--color-gold-warm)" : "var(--color-surface)",
                  color:
                    activeCategory === cat ? "var(--color-abyss)" : "var(--color-mist)",
                  border: `1px solid ${activeCategory === cat ? "var(--color-gold-warm)" : "var(--color-border)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES.Live;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <div
                    className="p-6 rounded-xl border h-full card-hover flex flex-col"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    {/* Image placeholder */}
                    <div
                      className="w-full aspect-video rounded-lg mb-5 flex items-center justify-center text-2xl font-bold relative overflow-hidden"
                      style={{ backgroundColor: "var(--color-surface-2)" }}
                    >
                      <span style={{ color: "var(--color-gold-dim)" }}>
                        {project.name.charAt(0)}
                      </span>
                      {project.featured && (
                        <span
                          className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            backgroundColor: "rgba(201,166,85,0.15)",
                            color: "var(--color-gold-warm)",
                            border: "1px solid rgba(201,166,85,0.3)",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Status + category */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                      >
                        {project.status}
                      </span>
                      {project.category.slice(0, 1).map((c) => (
                        <span key={c} className="text-xs" style={{ color: "var(--color-smoke)" }}>
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Name + description */}
                    <h3
                      className="font-semibold text-base mb-2"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-4 flex-1"
                      style={{ color: "var(--color-mist)" }}
                    >
                      {project.description}
                    </p>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: "var(--color-surface-2)",
                            color: "var(--color-mist)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ color: "var(--color-smoke)" }}
                        >
                          +{project.stack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Smart Contracts — redesigned card grid */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-10">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(69,227,211,0.15), rgba(107,127,232,0.1))",
                border: "1px solid rgba(69,227,211,0.2)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold" style={{ color: "var(--color-cream)" }}>
                Smart Contract Portfolio
              </h3>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-mist)" }}>
                25+ contracts deployed on Ethereum, Polygon, BNB Chain &amp; testnets
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {CONTRACTS.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(201,166,85,0.1)",
                      color: "var(--color-gold-warm)",
                      border: "1px solid rgba(201,166,85,0.2)",
                    }}
                  >
                    {group.category}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.items.map((contract) => {
                    const netColor = NETWORK_COLORS[contract.networkColor] ?? "var(--color-indigo)";
                    return (
                      <div
                        key={contract.name}
                        className="p-5 rounded-xl border transition-all duration-300 hover:scale-[1.01]"
                        style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(201,166,85,0.35)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-semibold"
                            style={{ backgroundColor: `${netColor}18`, color: netColor, border: `1px solid ${netColor}30` }}
                          >
                            {contract.network}
                          </span>
                          <a
                            href={contract.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[var(--color-gold-warm)]"
                            style={{ color: "var(--color-mist)" }}
                          >
                            Explorer ↗
                          </a>
                        </div>
                        <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--color-cream)" }}>
                          {contract.name}
                        </h4>
                        <p className="text-xs mb-3" style={{ color: "var(--color-mist)" }}>
                          {contract.description}
                        </p>
                        <div
                          className="flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{ backgroundColor: "var(--color-surface-2)" }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                          </svg>
                          <code className="text-[11px] font-mono truncate flex-1" style={{ color: "var(--color-teal)" }}>
                            {contract.address}
                          </code>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
