import AnimatedSection from "@/components/ui/AnimatedSection";
import { ARTICLES, SITE } from "@/lib/constants";

export default function Writing() {
  const featured = ARTICLES.find((a) => a.featured)!;
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <section
      id="writing"
      className="py-24 lg:py-36"
      style={{ backgroundColor: "var(--color-abyss)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-gold)" }}
            >
              Writing & Thought Leadership
            </p>
            <h2
              className="font-display text-4xl lg:text-5xl font-bold"
              style={{ color: "var(--color-cream)" }}
            >
              Ideas Worth
              <br />
              <span className="italic" style={{ color: "var(--color-gold-warm)" }}>
                Building On.
              </span>
            </h2>
          </div>
          <div className="flex gap-3">
            <a
              href={SITE.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:border-[var(--color-gold)]"
              style={{ borderColor: "var(--color-border)", color: "var(--color-pearl)" }}
            >
              Follow on Medium →
            </a>
          </div>
        </AnimatedSection>

        {/* Featured article */}
        <AnimatedSection delay={0.1} className="mb-8">
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-8 lg:p-10 rounded-2xl border card-hover group"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: "rgba(201,166,85,0.1)",
                      color: "var(--color-gold-warm)",
                    }}
                  >
                    Featured
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-teal)" }}>
                    {featured.readTime}
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-mist)" }}>
                    {featured.date}
                  </span>
                </div>

                <h3
                  className="font-display text-2xl lg:text-3xl font-bold mb-4 leading-tight group-hover:text-[var(--color-gold-warm)] transition-colors"
                  style={{ color: "var(--color-cream)" }}
                >
                  {featured.title}
                </h3>

                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-mist)" }}>
                  {featured.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{
                        backgroundColor: "var(--color-surface-2)",
                        color: "var(--color-mist)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="shrink-0 flex items-center justify-center w-full lg:w-48 h-36 lg:h-full rounded-xl text-4xl"
                style={{ backgroundColor: "var(--color-surface-2)" }}
              >
                ✍️
              </div>
            </div>

            <div
              className="mt-6 pt-6 border-t flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
              style={{ borderColor: "var(--color-border)", color: "var(--color-gold-warm)" }}
            >
              Read Article
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </AnimatedSection>

        {/* Other articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((article, i) => (
            <AnimatedSection key={article.id} delay={0.1 + i * 0.08}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-xl border card-hover group h-full"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs" style={{ color: "var(--color-teal)" }}>
                    {article.readTime}
                  </span>
                  <span style={{ color: "var(--color-smoke)" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--color-mist)" }}>
                    {article.date}
                  </span>
                </div>

                <h3
                  className="font-semibold text-base mb-3 leading-snug group-hover:text-[var(--color-gold-warm)] transition-colors"
                  style={{ color: "var(--color-cream)" }}
                >
                  {article.title}
                </h3>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-mist)" }}>
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: "var(--color-surface-2)",
                        color: "var(--color-smoke)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-gold-warm)" }}
                >
                  Read →
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
