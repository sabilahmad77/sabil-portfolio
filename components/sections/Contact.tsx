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
    // Simulate form submission — wire to Resend / Formspree in production
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const selectedIntentData = INTENTS.find((i) => i.id === selectedIntent)!;

  return (
    <section
      id="contact"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Contact
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "var(--color-cream)" }}
          >
            Let&apos;s Build
            <br />
            <span className="italic" style={{ color: "var(--color-gold-warm)" }}>
              Something Extraordinary.
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-mist)" }}>
            Whether you&apos;re an investor, fellow engineer, or product team looking for technical
            leadership — I&apos;m interested in hearing from you.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Intent selector + Form */}
          <div>
            <AnimatedSection delay={0.1}>
              <p
                className="text-sm font-medium mb-4"
                style={{ color: "var(--color-pearl)" }}
              >
                What brings you here?
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
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
                      { id: "name", label: "Name *", type: "text", placeholder: "Your name", required: true },
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
                          onFocus={(e) =>
                            (e.target.style.borderColor = "var(--color-gold)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "var(--color-border)")
                          }
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
                      onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
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
                      onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
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

          {/* Right — Contact details */}
          <div className="space-y-6">
            <AnimatedSection direction="right" delay={0.1}>
              {/* Availability signal */}
              <div
                className="p-6 rounded-xl border mb-6"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "rgba(61,214,140,0.25)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--color-emerald)" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-emerald)" }}
                  >
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
              <div className="space-y-4">
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
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs mb-0.5" style={{ color: "var(--color-mist)" }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-medium transition-colors hover:text-[var(--color-gold-warm)]"
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
                className="p-6 rounded-xl border"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-gold)" }}
                >
                  Follow My Work
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "GitHub", href: SITE.github },
                    { label: "LinkedIn", href: SITE.linkedin },
                    { label: "X / Twitter", href: SITE.twitter },
                    { label: "Medium", href: SITE.medium },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-sm border transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold-warm)]"
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
