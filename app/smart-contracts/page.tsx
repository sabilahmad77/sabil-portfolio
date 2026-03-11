"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { SMART_CONTRACTS, SITE } from "@/lib/constants";

const CHAIN_FILTERS = ["All", "Arbitrum", "BSC", "Ethereum", "Polygon", "Testnets"];

const CATEGORY_FILTERS = [
  "All",
  "RWA Infrastructure",
  "Compliance & KYC",
  "NFT & Marketplace",
  "DeFi & DEX",
  "Token Contracts",
  "Payments & Finance",
];

const STATUS_COLORS = {
  Production: { bg: "rgba(61,214,140,0.1)", color: "#3DD68C", border: "rgba(61,214,140,0.25)" },
  Testnet:    { bg: "rgba(107,127,232,0.1)", color: "#6B7FE8", border: "rgba(107,127,232,0.25)" },
};

const CHAIN_STATS = [
  { chain: "Arbitrum",  count: "8+",  color: "#6B7FE8", label: "Arbitrum One" },
  { chain: "BSC",       count: "13+", color: "#C9A655", label: "BNB Chain" },
  { chain: "Ethereum",  count: "20+", color: "#9375B5", label: "Ethereum" },
  { chain: "Polygon",   count: "20+", color: "#8B5CF6", label: "Polygon" },
  { chain: "Testnets",  count: "30+", color: "#45E3D3", label: "Testnets" },
];

function ContractCard({
  contract,
  delay,
}: {
  contract: (typeof SMART_CONTRACTS)[number];
  delay: number;
}) {
  const [copied, setCopied] = useState(false);
  const st = STATUS_COLORS[contract.status];

  const copyAddress = () => {
    navigator.clipboard.writeText(contract.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay }}
    >
      <div
        className="group relative p-5 rounded-xl border flex flex-col h-full overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${contract.networkColor}50`;
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = `0 16px 40px -10px ${contract.networkColor}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(to right, transparent, ${contract.networkColor}80, transparent)` }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
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
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: st.bg, color: st.color, border: `1px solid ${st.border}` }}
            >
              {contract.status}
            </span>
          </div>
          <a
            href={contract.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium shrink-0 transition-colors hover:text-[var(--color-gold-warm)]"
            style={{ color: "var(--color-mist)" }}
          >
            Explorer ↗
          </a>
        </div>

        {/* Title */}
        <div className="mb-1">
          <span
            className="text-[10px] font-medium"
            style={{ color: "var(--color-mist)" }}
          >
            {contract.project} · {contract.type}
          </span>
        </div>
        <h3
          className="font-semibold text-sm mb-2 leading-snug"
          style={{ color: "var(--color-cream)" }}
        >
          {contract.name}
        </h3>
        <p
          className="text-xs leading-relaxed flex-1 mb-3"
          style={{ color: "var(--color-mist)" }}
        >
          {contract.description}
        </p>

        {/* Address row */}
        <button
          onClick={copyAddress}
          className="flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left transition-all hover:opacity-80"
          style={{ backgroundColor: "var(--color-surface-2)" }}
          title="Click to copy address"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
          </svg>
          <code
            className="text-[11px] font-mono flex-1 truncate"
            style={{ color: "var(--color-teal)" }}
          >
            {contract.shortAddress}
          </code>
          <span
            className="text-[10px] shrink-0 transition-colors"
            style={{ color: copied ? "var(--color-emerald)" : "var(--color-smoke)" }}
          >
            {copied ? "Copied!" : "copy"}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default function SmartContractsPage() {
  const [activeChain, setActiveChain]       = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll]               = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const INITIAL_COUNT = 12;

  const filtered = SMART_CONTRACTS.filter((c) => {
    const chainMatch =
      activeChain === "All" ||
      (activeChain === "Testnets"
        ? (c.chain === "Sepolia" || c.chain === "BSC Testnet")
        : c.chain === activeChain);
    const categoryMatch = activeCategory === "All" || c.category === activeCategory;
    return chainMatch && categoryMatch;
  });

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <main
      className="min-h-screen relative"
      style={{ backgroundColor: "var(--color-abyss)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 0%, rgba(107,127,232,0.07) 0%, transparent 60%)" }}
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
            ← Back to Portfolio
          </Link>
        </div>

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            On-chain · Verified · Deployed
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl lg:text-7xl font-bold leading-none mb-6"
          >
            <span style={{ color: "var(--color-cream)" }}>Smart Contract</span>
            <br />
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, var(--color-gold-warm) 0%, var(--color-gold) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Portfolio.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: "var(--color-mist)" }}
          >
            70+ smart contracts deployed across Ethereum mainnet (20+), Polygon (20+), Arbitrum,
            BNB Chain, and testnets (30+) — spanning RWA tokenisation, NFT marketplaces, DeFi
            protocols, and compliance infrastructure. Every address is verifiable on-chain.
          </motion.p>
        </div>

        {/* ── Chain stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-12"
        >
          {CHAIN_STATS.map((s) => (
            <div
              key={s.chain}
              className="text-center p-4 rounded-xl border"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="font-display text-2xl font-bold mb-1"
                style={{ color: s.color }}
              >
                {s.count}
              </div>
              <div className="text-xs" style={{ color: "var(--color-mist)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Filters ── */}
        <div className="mb-8 space-y-3">
          {/* Chain filter */}
          <div className="flex flex-wrap gap-2">
            {CHAIN_FILTERS.map((chain) => (
              <button
                key={chain}
                onClick={() => { setActiveChain(chain); setShowAll(false); }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: activeChain === chain ? "var(--color-gold-warm)" : "var(--color-surface)",
                  color: activeChain === chain ? "var(--color-abyss)" : "var(--color-mist)",
                  border: `1px solid ${activeChain === chain ? "var(--color-gold-warm)" : "var(--color-border)"}`,
                }}
              >
                {chain}
              </button>
            ))}
          </div>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: activeCategory === cat ? "rgba(107,127,232,0.15)" : "var(--color-surface)",
                  color: activeCategory === cat ? "#6B7FE8" : "var(--color-mist)",
                  border: `1px solid ${activeCategory === cat ? "rgba(107,127,232,0.4)" : "var(--color-border)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs" style={{ color: "var(--color-mist)" }}>
            Showing{" "}
            <span style={{ color: "var(--color-gold-warm)" }}>{visible.length}</span>
            {" "}of{" "}
            <span style={{ color: "var(--color-cream)" }}>{filtered.length}</span>
            {" "}contracts
            {activeChain !== "All" || activeCategory !== "All" ? " (filtered)" : ""}
          </p>
          {filtered.length > INITIAL_COUNT && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-medium transition-colors hover:text-[var(--color-gold-warm)]"
              style={{ color: "var(--color-mist)" }}
            >
              {showAll ? "Show less ↑" : `View all ${filtered.length} →`}
            </button>
          )}
        </div>

        {/* ── Contract grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          <AnimatePresence mode="popLayout">
            {visible.map((contract, i) => (
              <ContractCard key={contract.id} contract={contract} delay={i * 0.03} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Show All / Less button ── */}
        {filtered.length > INITIAL_COUNT && (
          <div className="flex justify-center mb-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2.5 px-8 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: showAll ? "var(--color-gold-warm)" : "transparent",
                color: showAll ? "var(--color-abyss)" : "var(--color-pearl)",
                borderColor: showAll ? "var(--color-gold-warm)" : "var(--color-border)",
                boxShadow: showAll ? "0 8px 28px -6px rgba(201,166,85,0.4)" : "none",
              }}
            >
              {showAll ? "↑ Show Less" : `View All ${filtered.length} Contracts →`}
              {!showAll && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "rgba(201,166,85,0.12)", color: "var(--color-gold-warm)" }}
                >
                  {filtered.length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div
          className="relative p-8 rounded-2xl border text-center overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "rgba(201,166,85,0.2)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(201,166,85,0.5), transparent)" }}
          />
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            Looking to build?
          </p>
          <h3
            className="font-display text-2xl lg:text-3xl font-bold mb-3"
            style={{ color: "var(--color-cream)" }}
          >
            Let&apos;s deploy your next contract.
          </h3>
          <p
            className="text-sm max-w-md mx-auto mb-6"
            style={{ color: "var(--color-mist)" }}
          >
            From ERC-20 tokens to full RWA compliance suites — I architect and ship
            production-grade smart contracts across all major chains.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--color-gold-warm)",
              color: "var(--color-abyss)",
            }}
          >
            Hire as Blockchain Architect →
          </a>
        </div>
      </div>
    </main>
  );
}
