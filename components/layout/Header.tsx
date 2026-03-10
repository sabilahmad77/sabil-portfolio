"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/logo/Logo";
import { SITE } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Ventures", href: "#ventures" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl border-b"
            : "bg-transparent border-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(12, 20, 32, 0.92)" : "transparent",
          borderColor: scrolled ? "var(--color-border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <Logo variant="gold" size={36} showText animate />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-sm font-medium transition-colors duration-200 hover:text-[var(--color-gold-warm)] relative group"
                  style={{ color: "var(--color-mist)" }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: "var(--color-gold-warm)" }}
                  />
                </button>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Hey! I found you from your portfolio. Can we discuss a collaboration?`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--color-gold-warm)",
                  color: "var(--color-abyss)",
                }}
              >
                Hire as CTO
              </a>

              {/* Mobile menu button */}
              <button
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--color-pearl)" }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--color-pearl)" }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--color-pearl)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden pt-16"
            style={{ backgroundColor: "var(--color-abyss)" }}
          >
            <div className="flex flex-col gap-1 p-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(item.href)}
                  className="w-full text-left px-4 py-4 text-xl font-medium rounded-xl transition-colors"
                  style={{ color: "var(--color-pearl)" }}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href={`mailto:${SITE.email}`}
                className="mt-4 flex items-center justify-center px-6 py-4 rounded-full text-lg font-semibold"
                style={{ backgroundColor: "var(--color-gold-warm)", color: "var(--color-abyss)" }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
