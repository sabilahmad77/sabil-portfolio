"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { PROJECTS, SMART_CONTRACTS } from "@/lib/constants";

/** Returns a 3-5 char display label — much better than a single letter */
function getProjectLabel(name: string): string {
  const first = name.split(/[\s\-—]+/)[0];
  return (first.length <= 5 ? first : first.slice(0, 4)).toUpperCase();
}

/* ── Category → gradient / accent maps ── */
const CATEGORY_GRADIENTS: Record<string, string> = {
  "DeFi & Tokenisation":      "linear-gradient(135deg, #1A2235 0%, #0E1D31 60%, rgba(179,145,72,0.12) 100%)",
  "NFT Marketplaces":         "linear-gradient(135deg, #1A2235 0%, #1B1635 60%, rgba(147,117,181,0.12) 100%)",
  "DApps & GameFi":           "linear-gradient(135deg, #1A2235 0%, #0F1C2E 60%, rgba(69,227,211,0.1) 100%)",
  "Blockchain & Web3":        "linear-gradient(135deg, #1A2235 0%, #0E1D31 60%, rgba(201,166,85,0.12) 100%)",
  "Launchpads & GameFi":      "linear-gradient(135deg, #1A2235 0%, #1B1635 60%, rgba(107,127,232,0.12) 100%)",
  "Logistics & Supply Chain": "linear-gradient(135deg, #1A2235 0%, #0C1C20 60%, rgba(61,214,140,0.1) 100%)",
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

/* ── Flagship product card (row 1) ── */
function FlagshipCard({ project, delay }: { project: typeof PROJECTS[number]; delay: number }) {
  const [imgError, setImgError] = useState(false);
  const primaryCat   = project.category[0] ?? "default";
  const cardGradient = CATEGORY_GRADIENTS[primaryCat] ?? CATEGORY_GRADIENTS.default;
  const cardAccent   = CATEGORY_ACCENT[primaryCat]    ?? CATEGORY_ACCENT.default;
  const statusStyle  = STATUS_STYLES[project.status]  ?? STATUS_STYLES.Live;
  const label        = getProjectLabel(project.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <a
        href={project.url !== "#" ? project.url : undefined}
        target={project.url !== "#" ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="group block rounded-xl border overflow-hidden h-full flex flex-col"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
          cursor: project.url !== "#" ? "pointer" : "default",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${cardAccent}55`;
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = `0 20px 50px -12px ${cardAccent}22`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Header banner — real image or styled fallback */}
        <div
          className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden"
          style={{ background: cardGradient }}
        >
          {/* Real project image — loads automatically once placed in public/projects/ */}
          {project.image && !imgError && (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              onError={() => setImgError(true)}
            />
          )}

          {/* Fallback visual — shown when no image is available */}
          {(!project.image || imgError) && (
            <>
              {/* Dot-grid texture */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `radial-gradient(circle, ${cardAccent} 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Corner geometric accent */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-15"
                style={{ backgroundColor: cardAccent, filter: "blur(20px)" }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-10"
                style={{ backgroundColor: cardAccent, filter: "blur(16px)" }}
              />
              {/* Display label */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <span
                  className="font-display font-bold tracking-tight leading-none"
                  style={{
                    color: cardAccent,
                    textShadow: `0 0 32px ${cardAccent}70, 0 0 64px ${cardAccent}30`,
                    fontSize: label.length <= 3 ? "2.5rem" : label.length === 4 ? "2.125rem" : "1.75rem",
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

          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${cardAccent}55, transparent)` }} />
          {/* Status badge */}
          <div
            className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-sm"
            style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.glow}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusStyle.color }} />
            {project.status}
          </div>
          {/* Featured star */}
          {project.featured && (
            <span
              className="absolute top-2.5 right-2.5 text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm"
              style={{ backgroundColor: "rgba(201,166,85,0.12)", color: "var(--color-gold-warm)", border: "1px solid rgba(201,166,85,0.25)" }}
            >
              ★
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-[10px] font-medium mb-1" style={{ color: cardAccent }}>
            {project.category[0]}
          </span>
          <h3 className="font-semibold text-sm mb-1.5 leading-snug" style={{ color: "var(--color-cream)" }}>
            {project.name}
          </h3>
          <p className="text-xs leading-relaxed line-clamp-2 flex-1 mb-3" style={{ color: "var(--color-mist)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-auto">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-md"
                style={{ backgroundColor: `${cardAccent}10`, color: "var(--color-mist)", border: `1px solid ${cardAccent}20` }}
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ color: "var(--color-smoke)", backgroundColor: "var(--color-surface-2)" }}>
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* ── Smart contract preview card (row 2) ── */
function SCPreviewCard({ contract, delay }: { contract: typeof SMART_CONTRACTS[number]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <a
        href={contract.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-4 rounded-xl border h-full flex flex-col transition-all duration-250 hover:-translate-y-1"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${contract.networkColor}50`;
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = `0 14px 36px -10px ${contract.networkColor}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Network + status row */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${contract.networkColor}15`,
              color: contract.networkColor,
              border: `1px solid ${contract.networkColor}30`,
            }}
          >
            {contract.network}
          </span>
          <span
            className="text-[10px] font-medium ml-auto"
            style={{ color: "var(--color-mist)" }}
          >
            Explorer ↗
          </span>
        </div>

        {/* Contract name */}
        <h4 className="font-semibold text-sm mb-1 leading-snug flex-1" style={{ color: "var(--color-cream)" }}>
          {contract.name}
        </h4>
        <p className="text-[11px] mb-2" style={{ color: "var(--color-mist)" }}>
          {contract.project} · {contract.type}
        </p>

        {/* Address chip */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg mt-auto"
          style={{ backgroundColor: "var(--color-surface-2)" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
          </svg>
          <code className="text-[10px] font-mono truncate flex-1" style={{ color: "var(--color-teal)" }}>
            {contract.shortAddress}
          </code>
        </div>
      </a>
    </motion.div>
  );
}

/* ── Flagship product IDs in display order ── */
const FLAGSHIP_IDS = ["viko", "mexc-crypto", "bitxgold", "gold-smart-chain"];

/* ── Featured SC contracts for preview (5 best) ── */
const FEATURED_SC_IDS = [
  "fann-arb-rwa-factory",
  "fann-arb-sale-marketplace",
  "fann-arb-auction-marketplace",
  "nftyart-marketplace",
  "leet-swap-dex",
];

/* ── Main section ── */
export default function Projects() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const flagshipProjects = FLAGSHIP_IDS
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PROJECTS;

  const featuredContracts = FEATURED_SC_IDS
    .map((id) => SMART_CONTRACTS.find((c) => c.id === id))
    .filter(Boolean) as typeof SMART_CONTRACTS;

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 0%, rgba(107,127,232,0.05) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 0% 100%, rgba(201,166,85,0.04) 0%, transparent 60%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            Projects
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl lg:text-5xl font-bold leading-none"
              style={{ color: "var(--color-cream)" }}
            >
              60+{" "}
              <span className="italic" style={{ color: "var(--color-gold-warm)" }}>
                Products
              </span>{" "}
              Shipped.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm max-w-sm pb-1"
              style={{ color: "var(--color-mist)" }}
            >
              DeFi, NFT marketplaces, GameFi, logistics, EdTech — from testnet to Ethereum mainnet.
            </motion.p>
          </div>
        </div>

        {/* ── Row 1: Flagship Products (4 cards) ── */}
        <AnimatedSection delay={0.08} className="mb-3">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(201,166,85,0.1)", color: "var(--color-gold-warm)", border: "1px solid rgba(201,166,85,0.2)" }}
            >
              Flagship Products
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {flagshipProjects.map((project, i) => (
              <FlagshipCard key={project.id} project={project} delay={i * 0.07} />
            ))}
          </div>
        </AnimatedSection>

        {/* ── Row 2: Smart Contract Preview (5 cards) ── */}
        <AnimatedSection delay={0.14} className="mb-10">
          <div className="flex items-center gap-3 mb-4 mt-6">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(69,227,211,0.08)", color: "var(--color-teal)", border: "1px solid rgba(69,227,211,0.2)" }}
            >
              Smart Contract Highlights
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
            <Link
              href="/smart-contracts"
              className="shrink-0 text-xs font-medium transition-colors hover:text-[var(--color-teal)]"
              style={{ color: "var(--color-mist)" }}
            >
              View All 70+ →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {featuredContracts.map((contract, i) => (
              <SCPreviewCard key={contract.id} contract={contract} delay={i * 0.06} />
            ))}
          </div>
        </AnimatedSection>

        {/* ── CTA Buttons ── */}
        <AnimatedSection delay={0.18} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/portfolio"
            className="flex items-center gap-2.5 px-8 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--color-gold-warm)",
              color: "var(--color-abyss)",
              boxShadow: "0 8px 28px -6px rgba(201,166,85,0.4)",
            }}
          >
            Explore Full Portfolio →
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(9,9,14,0.25)", color: "var(--color-abyss)" }}
            >
              {PROJECTS.length}
            </span>
          </Link>
          <Link
            href="/smart-contracts"
            className="flex items-center gap-2.5 px-8 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105 hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
            style={{
              backgroundColor: "transparent",
              color: "var(--color-pearl)",
              borderColor: "var(--color-border)",
            }}
          >
            Smart Contract Portfolio →
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(69,227,211,0.1)", color: "var(--color-teal)" }}
            >
              70+
            </span>
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
}
