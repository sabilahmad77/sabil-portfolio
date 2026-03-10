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

        {/* Smart Contracts */}
        <AnimatedSection>
          <div
            className="rounded-2xl border p-8 lg:p-10"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(69,227,211,0.1)" }}
              >
                <span style={{ color: "var(--color-teal)" }}>⛓</span>
              </div>
              <div>
                <h3
                  className="font-semibold text-lg"
                  style={{ color: "var(--color-cream)" }}
                >
                  Smart Contract Portfolio
                </h3>
                <p className="text-sm" style={{ color: "var(--color-mist)" }}>
                  Deployed across Ethereum, Polygon, BNB Chain & testnets
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {CONTRACTS.map((group) => (
                <div key={group.category}>
                  <h4
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {group.category}
                  </h4>
                  <div className="space-y-3">
                    {group.items.map((contract) => (
                      <div
                        key={contract.name}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl"
                        style={{ backgroundColor: "var(--color-surface-2)" }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
                            style={{
                              backgroundColor: "rgba(107,127,232,0.1)",
                              color: NETWORK_COLORS[contract.networkColor] ?? "var(--color-indigo)",
                            }}
                          >
                            {contract.network}
                          </span>
                          <div>
                            <div className="text-sm font-medium" style={{ color: "var(--color-cream)" }}>
                              {contract.name}
                            </div>
                            <div className="text-xs" style={{ color: "var(--color-mist)" }}>
                              {contract.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <code
                            className="text-xs font-mono"
                            style={{ color: "var(--color-teal)" }}
                          >
                            {contract.address}
                          </code>
                          <a
                            href={contract.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:border-[var(--color-gold)] whitespace-nowrap"
                            style={{
                              borderColor: "var(--color-border)",
                              color: "var(--color-mist)",
                            }}
                          >
                            View Code →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
