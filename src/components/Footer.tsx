import { useData } from "../context/DataContext";

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps = {}) {
  const { developerInfo } = useData();
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-10 px-6"
      style={{ borderColor: "var(--border)", background: "var(--background)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span
            className="font-mono font-bold text-sm tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            AY
          </span>
          <span className="font-mono text-xs text-muted-foreground ml-3">
            {developerInfo.name} · {developerInfo.location}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { label: "GitHub", href: developerInfo.github },
            { label: "LinkedIn", href: developerInfo.linkedin },
            { label: "Twitter", href: developerInfo.twitter },
            { label: "Email", href: `mailto:${developerInfo.email}` },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <p className="font-mono text-[10px] text-muted-foreground">
            © {year} · Built with React + Tailwind
          </p>
          {onAdminClick && (
            <>
              <span className="text-muted-foreground opacity-30 text-xs">·</span>
              <button
                onClick={onAdminClick}
                className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors opacity-40 hover:opacity-100 flex items-center gap-1.5 cursor-pointer"
                title="Admin Panel"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>admin</span>
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
