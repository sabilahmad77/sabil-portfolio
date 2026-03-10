import Logo from "@/components/logo/Logo";
import { SITE } from "@/lib/constants";

const links = {
  Navigate: [
    { label: "About", href: "#about" },
    { label: "Ventures", href: "#ventures" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ],
  Connect: [
    { label: "GitHub", href: SITE.github },
    { label: "LinkedIn", href: SITE.linkedin },
    { label: "X / Twitter", href: SITE.twitter },
    { label: "Medium", href: SITE.medium },
    { label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}` },
    { label: "Email", href: `mailto:${SITE.email}` },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--color-void)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo variant="gold" size={44} showText className="mb-6" />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--color-mist)" }}>
              CTO at FANN. Blockchain architect, AI product engineer, and venture founder.
              Building the infrastructure of tomorrow from Doha, Qatar.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--color-emerald)" }}
              />
              <span className="text-sm" style={{ color: "var(--color-emerald)" }}>
                Available for CTO Engagements
              </span>
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--color-gold)" }}
              >
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm transition-colors hover:text-[var(--color-gold-warm)]"
                      style={{ color: "var(--color-mist)" }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p className="text-sm" style={{ color: "var(--color-smoke)" }}>
            © {new Date().getFullYear()} Sabil Ahmad. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "var(--color-smoke)" }}>
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
