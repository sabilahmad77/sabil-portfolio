"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, PROJECT_CATEGORIES, SITE } from "@/lib/constants";

/** Returns a 3-5 char display label — much better than a single letter */
function getProjectLabel(name: string): string {
  const first = name.split(/[\s\-—]+/)[0];
  return (first.length <= 5 ? first : first.slice(0, 4)).toUpperCase();
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "DeFi & Tokenisation":      "linear-gradient(135deg, #1A2235 0%, #0E1D31 60%, rgba(179,145,72,0.15) 100%)",
  "NFT Marketplaces":         "linear-gradient(135deg, #1A2235 0%, #1B1635 60%, rgba(147,117,181,0.15) 100%)",
  "DApps & GameFi":           "linear-gradient(135deg, #1A2235 0%, #0F1C2E 60%, rgba(69,227,211,0.12) 100%)",
  "Blockchain & Web3":        "linear-gradient(135deg, #1A2235 0%, #0E1D31 60%, rgba(201,166,85,0.15) 100%)",
  "Launchpads & GameFi":      "linear-gradient(135deg, #1A2235 0%, #1B1635 60%, rgba(107,127,232,0.15) 100%)",
  "Logistics & Supply Chain": "linear-gradient(135deg, #1A2235 0%, #0C1C20 60%, rgba(61,214,140,0.12) 100%)",
  default:                    "linear-gradient(135deg, #1A2235 0%, #111827 100%)",
};
const CATEGORY_ACCENT: Record<string, string> = {
  "DeFi & Tokenisation":      "#C9A655",
  "NFT Marketplaces":         "#9375B5",
  "DApps & GameFi":           "#45E3D3",
  "Blockchain & Web3":        "#B39148",
  "Launchpads & GameFi":      "#6B7FE8",
  "Logistics & Supply Chain": "#3DD68C",
  default:                    "#C9A655",
};
const STATUS_STYLES: Record<string, { color: string; bg: string; glow: string }> = {
  Live:       { color: "var(--color-emerald)",   bg: "rgba(61,214,140,0.08)",  glow: "rgba(61,214,140,0.25)" },
  Production: { color: "var(--color-gold-warm)", bg: "rgba(201,166,85,0.08)", glow: "rgba(201,166,85,0.25)" },
  Beta:       { color: "var(--color-violet)",    bg: "rgba(147,117,181,0.08)", glow: "rgba(147,117,181,0.25)" },
};

function ProjectCard({ project, delay }: { project: typeof PROJECTS[number]; delay: number }) {
  const [imgError, setImgError] = useState(false);
  const primaryCat   = project.category[0] ?? "default";
  const cardGradient = CATEGORY_GRADIENTS[primaryCat] ?? CATEGORY_GRADIENTS.default;
  const cardAccent   = CATEGORY_ACCENT[primaryCat]    ?? CATEGORY_ACCENT.default;
  const statusStyle  = STATUS_STYLES[project.status]  ?? STATUS_STYLES.Live;
  const label        = getProjectLabel(project.name);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay }}
    >
      <a
        href={project.url !== "#" ? project.url : undefined}
        target={project.url !== "#" ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="group relative rounded-xl border overflow-hidden flex flex-col h-full"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
          cursor: project.url !== "#" ? "pointer" : "default",
          display: "flex",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${cardAccent}50`;
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = `0 24px 60px -12px ${cardAccent}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Header — real image or styled fallback */}
        <div
          className="relative w-full aspect-video flex items-center justify-center overflow-hidden"
          style={{ background: cardGradient }}
        >
          {/* Real project image */}
          {project.image && !imgError && (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          )}

          {/* Fallback — dot-grid + labelled visual */}
          {(!project.image || imgError) && (
            <>
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `radial-gradient(circle, ${cardAccent} 1px, transparent 1px)`,
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
                style={{ backgroundColor: cardAccent, filter: "blur(24px)" }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-[0.07]"
                style={{ backgroundColor: cardAccent, filter: "blur(18px)" }}
              />
              <div className="relative z-10 flex flex-col items-center gap-1">
                <span
                  className="font-display font-bold tracking-tight leading-none"
                  style={{
                    color: cardAccent,
                    textShadow: `0 0 28px ${cardAccent}65`,
                    fontSize: label.length <= 3 ? "2.25rem" : label.length === 4 ? "1.875rem" : "1.5rem",
                  }}
                >
                  {label}
                </span>
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.18em] opacity-50"
                  style={{ color: cardAccent }}
                >
                  {project.category[0]?.split(" ")[0]}
                </span>
              </div>
            </>
          )}

          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${cardAccent}50, transparent)` }}
          />
          {project.featured && (
            <span
              className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm"
              style={{ backgroundColor: "rgba(201,166,85,0.12)", color: "var(--color-gold-warm)", border: "1px solid rgba(201,166,85,0.25)" }}
            >
              ★ Featured
            </span>
          )}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
            style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.glow}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusStyle.color }} />
            {project.status}
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-1.5 flex flex-wrap gap-1">
            {project.category.map((cat) => (
              <span key={cat} className="text-[10px] font-medium" style={{ color: cardAccent }}>{cat}</span>
            ))}
          </div>
          <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--color-cream)" }}>
            {project.name}
          </h3>
          <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: "var(--color-mist)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded-md font-medium"
                style={{ backgroundColor: `${cardAccent}10`, color: "var(--color-mist)", border: `1px solid ${cardAccent}20` }}
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span
                className="text-xs px-2 py-0.5 rounded-md"
                style={{ color: "var(--color-smoke)", backgroundColor: "var(--color-surface-2)" }}
              >
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.some((c) => c === activeCategory));

  return (
    <main
      className="min-h-screen relative"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 0%, rgba(107,127,232,0.05) 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 0% 100%, rgba(201,166,85,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-24">

        {/* ── Back nav ── */}
        <div className="mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--color-gold-warm)]"
            style={{ color: "var(--color-mist)" }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Full Project Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl lg:text-7xl font-bold leading-none mb-5"
          >
            <span style={{ color: "var(--color-cream)" }}>60+</span>{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, var(--color-gold-warm) 0%, var(--color-gold) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Products
            </span>
            <br />
            <span style={{ color: "var(--color-cream)" }}>Shipped.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: "var(--color-mist)" }}
          >
            DeFi protocols, NFT marketplaces, GameFi platforms, logistics SaaS, and EdTech — built for
            clients across the US, Europe, GCC, and Asia. Every project is production-deployed.
          </motion.p>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {[
            { value: "60+",  label: "Projects Delivered",   color: "var(--color-gold-warm)" },
            { value: "70+",  label: "Smart Contracts",       color: "var(--color-teal)" },
            { value: "5+",   label: "Startups Launched",     color: "var(--color-indigo)" },
            { value: "5+",   label: "Chains Deployed",       color: "var(--color-violet)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl border"
              style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
            >
              <div className="font-display text-2xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "var(--color-mist)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Category filter ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: activeCategory === cat ? "var(--color-gold-warm)" : "var(--color-surface)",
                color: activeCategory === cat ? "var(--color-abyss)" : "var(--color-mist)",
                border: `1px solid ${activeCategory === cat ? "var(--color-gold-warm)" : "var(--color-border)"}`,
                boxShadow: activeCategory === cat ? "0 4px 14px -4px rgba(201,166,85,0.4)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Results count ── */}
        <p className="text-xs mb-5" style={{ color: "var(--color-mist)" }}>
          Showing{" "}
          <span style={{ color: "var(--color-gold-warm)" }}>{filtered.length}</span>{" "}
          projects
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>

        {/* ── Projects grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.04} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Smart contracts CTA ── */}
        <div
          className="relative p-8 rounded-2xl border text-center overflow-hidden"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "rgba(69,227,211,0.2)" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(69,227,211,0.5), transparent)" }}
          />
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-teal)" }}>
            On-chain work
          </p>
          <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--color-cream)" }}>
            Want to see the smart contracts?
          </h3>
          <p className="text-sm max-w-md mx-auto mb-6" style={{ color: "var(--color-mist)" }}>
            70+ verified smart contracts across Arbitrum, BNB Chain, Ethereum, and Polygon — with
            live on-chain addresses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/smart-contracts"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--color-teal)", color: "var(--color-abyss)" }}
            >
              View Smart Contract Portfolio →
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105 hover:border-[var(--color-gold-warm)] hover:text-[var(--color-gold-warm)]"
              style={{ borderColor: "var(--color-border)", color: "var(--color-pearl)" }}
            >
              Work With Me →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
