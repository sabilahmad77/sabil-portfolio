import AnimatedSection from "@/components/ui/AnimatedSection";
import { EXPERIENCE } from "@/lib/constants";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 lg:py-24"
      style={{ backgroundColor: "var(--color-navy)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <AnimatedSection>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-gold)" }}
                >
                  Experience
                </p>
                <h2
                  className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                  style={{ color: "var(--color-cream)" }}
                >
                  A Track Record
                  <br />
                  <span className="italic" style={{ color: "var(--color-gold-warm)" }}>
                    That Compounds.
                  </span>
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-mist)" }}>
                  From IT intern in Peshawar to CTO in Doha — every role built the foundation for
                  the next. No gaps, no shortcuts. Just consistent upward trajectory.
                </p>
                <a
                  href={`mailto:Info@sabilahmad.com`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: "var(--color-gold-warm)", color: "var(--color-abyss)" }}
                >
                  Download CV →
                </a>
              </AnimatedSection>
            </div>
          </div>

          {/* Timeline entries */}
          <div className="lg:col-span-8 relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
              style={{ backgroundColor: "var(--color-border)" }}
            />

            <div className="space-y-4">
              {EXPERIENCE.map((exp, i) => {
                const extraRole = "extraRole" in exp && exp.extraRole ? (exp.extraRole as {
                  role: string;
                  period: string;
                  current?: boolean;
                  description: string;
                  achievements: string[];
                  skills: string[];
                }) : null;

                return (
                  <AnimatedSection key={exp.id} delay={i * 0.08}>
                    <div className="relative sm:pl-16">
                      {/* Timeline dot */}
                      <div
                        className="absolute left-[18px] top-6 w-3 h-3 rounded-full border-2 hidden sm:block"
                        style={{
                          backgroundColor: exp.current ? "var(--color-gold-warm)" : "var(--color-surface)",
                          borderColor: exp.current ? "var(--color-gold-warm)" : "var(--color-border)",
                        }}
                      />

                      <div
                        className="p-6 lg:p-8 rounded-xl border card-hover relative overflow-hidden"
                        style={{
                          backgroundColor: "var(--color-surface)",
                          borderColor: exp.current ? "rgba(201,166,85,0.3)" : "var(--color-border)",
                        }}
                      >
                        {/* Flagship product badge strip — for VentraM / FANN */}
                        {"flagship" in exp && exp.flagship && (
                          <div
                            className="flex items-center gap-2 px-4 py-2 mb-5 rounded-lg border text-xs font-medium w-fit"
                            style={{
                              backgroundColor: "rgba(201,166,85,0.07)",
                              borderColor: "rgba(201,166,85,0.25)",
                              color: "var(--color-gold-warm)",
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-emerald)" }} />
                            {(exp.flagship as { label: string; name: string; url: string }).label}:{" "}
                            <a
                              href={(exp.flagship as { url: string }).url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold hover:opacity-80 transition-opacity"
                            >
                              {(exp.flagship as { name: string }).name}
                            </a>
                            {" "}— Blockchain-Native Art Marketplace
                          </div>
                        )}

                        {/* Primary role header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className="font-semibold text-lg"
                                style={{ color: "var(--color-cream)" }}
                              >
                                {exp.role}
                              </h3>
                              {exp.current && (
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                                  style={{
                                    backgroundColor: "rgba(61,214,140,0.1)",
                                    color: "var(--color-emerald)",
                                  }}
                                >
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className="font-semibold"
                                style={{ color: "var(--color-gold-warm)" }}
                              >
                                {exp.company}
                              </span>
                              <span style={{ color: "var(--color-smoke)" }}>·</span>
                              <span className="text-sm" style={{ color: "var(--color-mist)" }}>
                                {exp.type}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-medium" style={{ color: "var(--color-pearl)" }}>
                              {exp.period}
                            </div>
                            <div className="text-xs" style={{ color: "var(--color-mist)" }}>
                              {exp.location}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: "var(--color-pearl)" }}
                        >
                          {exp.description}
                        </p>

                        {/* Key achievements */}
                        <ul className="space-y-1.5 mb-4">
                          {exp.achievements.map((a, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm"
                              style={{ color: "var(--color-mist)" }}
                            >
                              <span style={{ color: "var(--color-gold)", marginTop: 2 }}>↳</span>
                              {a}
                            </li>
                          ))}
                        </ul>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2.5 py-1 rounded-md"
                              style={{
                                backgroundColor: "var(--color-surface-2)",
                                color: "var(--color-mist)",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* ── Extra Role (e.g. FANN Leadership Representative) ── */}
                        {extraRole && (
                          <div
                            className="mt-6 pt-6 border-t"
                            style={{ borderColor: "var(--color-border)" }}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h4
                                    className="font-semibold text-base"
                                    style={{ color: "var(--color-cream)" }}
                                  >
                                    {extraRole.role}
                                  </h4>
                                  {extraRole.current !== false ? (
                                    <span
                                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                                      style={{
                                        backgroundColor: "rgba(61,214,140,0.1)",
                                        color: "var(--color-emerald)",
                                      }}
                                    >
                                      Current
                                    </span>
                                  ) : (
                                    <span
                                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                                      style={{
                                        backgroundColor: "rgba(201,166,85,0.08)",
                                        color: "var(--color-gold-warm)",
                                        border: "1px solid rgba(201,166,85,0.2)",
                                      }}
                                    >
                                      Prior Role
                                    </span>
                                  )}
                                </div>
                                <span
                                  className="text-sm"
                                  style={{ color: "var(--color-gold-warm)" }}
                                >
                                  {exp.company}
                                </span>
                              </div>
                              <div className="text-sm font-medium shrink-0" style={{ color: "var(--color-pearl)" }}>
                                {extraRole.period}
                              </div>
                            </div>
                            <p
                              className="text-sm leading-relaxed mb-3"
                              style={{ color: "var(--color-pearl)" }}
                            >
                              {extraRole.description}
                            </p>
                            <ul className="space-y-1.5 mb-3">
                              {extraRole.achievements.map((a, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-2 text-sm"
                                  style={{ color: "var(--color-mist)" }}
                                >
                                  <span style={{ color: "var(--color-teal)", marginTop: 2 }}>↳</span>
                                  {a}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-1.5">
                              {extraRole.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-xs px-2.5 py-1 rounded-md"
                                  style={{
                                    backgroundColor: "rgba(69,227,211,0.06)",
                                    color: "var(--color-teal)",
                                    border: "1px solid rgba(69,227,211,0.15)",
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
