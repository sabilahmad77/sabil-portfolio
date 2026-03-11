"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SITE } from "@/lib/constants";

const INTENTS = [
  {
    id: "cto",
    icon: "💼",
    title: "Hire as CTO",
    subtitle: "Full-time or fractional CTO engagement",
  },
  {
    id: "invest",
    icon: "🚀",
    title: "Invest / Partner",
    subtitle: "Explore FANN or other ventures",
  },
  {
    id: "collaborate",
    icon: "🤝",
    title: "Collaborate",
    subtitle: "Technical partnership or consulting",
  },
  {
    id: "call",
    icon: "📞",
    title: "Book a Call",
    subtitle: "30-min strategy or discovery session",
  },
];

export default function Contact() {
  const [selectedIntent, setSelectedIntent] = useState("cto");
  const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, intent: selectedIntentData.title }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert(
        "Something went wrong. Please email directly at info@sabilahmad.com"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedIntentData = INTENTS.find((i) => i.id === selectedIntent)!;

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(201,166,85,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* ── Header ── */}
        <AnimatedSection className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Contact
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-tight mb-4">
            <span style={{ color: "var(--color-cream)" }}>Let&apos;s Build</span>
            <br />
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, var(--color-gold-warm) 0%, var(--color-gold) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Something Extraordinary.
            </span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--color-mist)" }}
          >
            Investor, fellow engineer, or product team — I&apos;m interested in hearing from you.
          </p>
        </AnimatedSection>

        {/* ── 2-col grid: Form | Details ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: Intent selector + Form ── */}
          <div>
            <AnimatedSection delay={0.1}>
              <p
                className="text-sm font-medium mb-4"
                style={{ color: "var(--color-pearl)" }}
              >
                What brings you here?
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {INTENTS.map((intent) => (
                  <button
                    key={intent.id}
                    onClick={() => setSelectedIntent(intent.id)}
                    className="p-4 rounded-xl border text-left transition-all duration-300"
                    style={{
                      backgroundColor:
                        selectedIntent === intent.id
                          ? "rgba(201,166,85,0.1)"
                          : "var(--color-surface)",
                      borderColor:
                        selectedIntent === intent.id
                          ? "var(--color-gold)"
                          : "var(--color-border)",
                    }}
                  >
                    <div className="text-xl mb-1">{intent.icon}</div>
                    <div
                      className="text-sm font-semibold mb-0.5"
                      style={{
                        color:
                          selectedIntent === intent.id
                            ? "var(--color-gold-warm)"
                            : "var(--color-cream)",
                      }}
                    >
                      {intent.title}
                    </div>
                    <div className="text-xs" style={{ color: "var(--color-mist)" }}>
                      {intent.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-8 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "rgba(61,214,140,0.3)",
                  }}
                >
                  <div className="text-4xl mb-4">✅</div>
                  <h3
                    className="font-display text-2xl font-bold mb-3"
                    style={{ color: "var(--color-cream)" }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--color-mist)" }}>
                    I&apos;ll reply within 24 hours. Looking forward to connecting.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "name",  label: "Name *",  type: "text",  placeholder: "Your name",      required: true },
                      { id: "email", label: "Email *", type: "email", placeholder: "your@email.com", required: true },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-xs font-medium mb-1.5"
                          style={{ color: "var(--color-pearl)" }}
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={formState[field.id as keyof typeof formState]}
                          onChange={(e) =>
                            setFormState((p) => ({ ...p, [field.id]: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                          style={{
                            backgroundColor: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            color: "var(--color-cream)",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                          onBlur={(e) =>  (e.target.style.borderColor = "var(--color-border)")}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "var(--color-pearl)" }}
                    >
                      Company (optional)
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Your company"
                      value={formState.company}
                      onChange={(e) => setFormState((p) => ({ ...p, company: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-cream)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                      onBlur={(e) =>  (e.target.style.borderColor = "var(--color-border)")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium mb-1.5"
                      style={{ color: "var(--color-pearl)" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder={`Re: ${selectedIntentData.title} — Tell me about your project or opportunity...`}
                      value={formState.message}
                      onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-cream)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                      onBlur={(e) =>  (e.target.style.borderColor = "var(--color-border)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                    style={{
                      backgroundColor: "var(--color-gold-warm)",
                      color: "var(--color-abyss)",
                    }}
                  >
                    {loading ? "Sending..." : `Send Message — ${selectedIntentData.title}`}
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>

          {/* ── Right: Availability + Contact methods + Socials ── */}
          <div className="space-y-5">
            {/* Availability signal */}
            <AnimatedSection direction="right" delay={0.1}>
              <div
                className="p-5 rounded-xl border"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "rgba(61,214,140,0.25)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
                    style={{ backgroundColor: "var(--color-emerald)" }}
                  />
                  <span className="text-sm font-semibold" style={{ color: "var(--color-emerald)" }}>
                    Currently Available
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--color-mist)" }}>
                  Open to CTO roles, fractional engagements, strategic consulting, and investment
                  conversations. Typical response: &lt;24 hours.
                </p>
              </div>
            </AnimatedSection>

            {/* Contact methods */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-2.5">
                {[
                  {
                    icon: "📧",
                    label: "Email",
                    value: SITE.email,
                    href: `mailto:${SITE.email}`,
                  },
                  {
                    icon: "💬",
                    label: "WhatsApp",
                    value: "+974 503 89351",
                    href: `https://wa.me/${SITE.whatsapp}?text=Hey! I found you from your portfolio.`,
                  },
                  {
                    icon: "✈️",
                    label: "Telegram",
                    value: "@sabilahmad77",
                    href: "https://t.me/sabilahmad77",
                  },
                  {
                    icon: "🔗",
                    label: "LinkedIn",
                    value: "linkedin.com/in/sabilahmad",
                    href: SITE.linkedin,
                  },
                  {
                    icon: "📍",
                    label: "Location",
                    value: "Doha, Qatar · Open to remote",
                    href: undefined,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-3.5 rounded-xl"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs mb-0.5" style={{ color: "var(--color-mist)" }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-medium transition-colors hover:text-[var(--color-gold-warm)] truncate block"
                          style={{ color: "var(--color-pearl)" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium" style={{ color: "var(--color-pearl)" }}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Social row */}
            <AnimatedSection direction="right" delay={0.2}>
              <div
                className="p-5 rounded-xl border"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-gold)" }}
                >
                  Follow My Work
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "GitHub",    href: SITE.github },
                    { label: "LinkedIn",  href: SITE.linkedin },
                    { label: "X / Twitter", href: SITE.twitter },
                    { label: "Telegram",  href: "https://t.me/sabilahmad77" },
                    { label: "Medium",    href: SITE.medium },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold-warm)]"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-pearl)",
                      }}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
