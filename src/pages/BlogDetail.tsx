import { useEffect, useRef, useState } from "react";
import { ContentSection } from "../data";
import { useData } from "../context/DataContext";

interface BlogDetailProps {
  postId: string;
  onBack: () => void;
  onPostClick: (id: string) => void;
  onProjectsClick: () => void;
}

function CodeBlock({ content, lang }: { content: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div className="rounded-sm overflow-hidden mb-6" style={{ border: "1px solid var(--border)" }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "rgba(238,234,227,0.04)", borderBottom: "1px solid var(--border)" }}
      >
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          {lang || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? "Tersalin ✓" : "Salin"}
        </button>
      </div>
      <pre
        className="p-5 overflow-x-auto"
        style={{ background: "var(--card)", margin: 0 }}
      >
        <code
          className="font-mono text-sm leading-relaxed"
          style={{ color: "#c8f135", whiteSpace: "pre" }}
        >
          {content}
        </code>
      </pre>
    </div>
  );
}

function ArticleContent({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="space-y-0">
      {sections.map((section, i) => {
        switch (section.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={`section-${i}`}
                className="font-mono font-bold mt-10 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "var(--foreground)" }}
              >
                {section.content}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="font-mono font-semibold mt-8 mb-3 text-base"
                style={{ color: "var(--foreground)" }}
              >
                {section.content}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className="font-sans text-base leading-loose mb-5"
                style={{ color: "var(--muted-foreground)" }}
              >
                {section.content}
              </p>
            );
          case "code":
            return <CodeBlock key={i} content={section.content} lang={section.lang} />;
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-6 px-6 py-4 rounded-sm"
                style={{
                  background: "rgba(200,241,53,0.04)",
                  borderLeft: "3px solid var(--primary)",
                }}
              >
                <p
                  className="font-mono text-sm italic leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                >
                  "{section.content}"
                </p>
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="mb-5 space-y-2 pl-4">
                {(section.items || section.content.split("\n").filter(Boolean)).map((item, j) => (
                  <li key={j} className="flex gap-3 font-sans text-base" style={{ color: "var(--muted-foreground)" }}>
                    <span style={{ color: "var(--primary)", flexShrink: 0, marginTop: "4px" }}>→</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={i} className="my-8">
                <img
                  src={section.content}
                  alt={section.caption || ""}
                  className="w-full rounded-sm object-cover"
                  style={{ maxHeight: "400px" }}
                />
                {section.caption && (
                  <figcaption className="font-mono text-[11px] text-muted-foreground text-center mt-2">
                    {section.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function TableOfContents({ sections }: { sections: ContentSection[] }) {
  const h2s = sections
    .map((s, i) => ({ ...s, idx: i }))
    .filter((s) => s.type === "h2");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setActive(idx);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    h2s.forEach((h) => {
      const el = document.getElementById(`section-${h.idx}`);
      if (el) {
        el.setAttribute("data-idx", String(h.idx));
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  if (h2s.length === 0) return null;

  return (
    <nav className="sticky top-20 space-y-1">
      <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">
        Daftar Isi
      </p>
      {h2s.map((h) => (
        <button
          key={h.idx}
          onClick={() => {
            const el = document.getElementById(`section-${h.idx}`);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="block w-full text-left font-sans text-xs leading-relaxed py-1 transition-colors"
          style={{
            color: active === h.idx ? "var(--primary)" : "var(--muted-foreground)",
            paddingLeft: "8px",
            borderLeft: active === h.idx ? "2px solid var(--primary)" : "2px solid transparent",
          }}
        >
          {h.content}
        </button>
      ))}
    </nav>
  );
}

export default function BlogDetail({ postId, onBack, onPostClick, onProjectsClick }: BlogDetailProps) {
  const { blogPosts } = useData();
  const post = blogPosts.find((p) => p.id === postId);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.body.style.overflow = "";
  }, [postId]);

  if (!post) return null;

  const relatedPosts = blogPosts.filter((p) => post.relatedIds.includes(p.id));

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "'Outfit', sans-serif" }}
      ref={topRef}
    >
      <div
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 border-b"
        style={{
          background: "rgba(11,11,13,0.92)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Kembali ke Blog
          </button>
          <div className="flex gap-2">
            {["Twitter", "LinkedIn"].map((svc) => (
              <button
                key={svc}
                className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                {svc} ↗
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-[45vh] overflow-hidden bg-muted">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, var(--background) 0%, rgba(11,11,13,0.6) 70%, rgba(11,11,13,0.2) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-sm"
                style={{ background: "rgba(200,241,53,0.15)", color: "var(--primary)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            className="font-mono font-extrabold leading-tight tracking-tight text-foreground max-w-3xl"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
            <span className="text-muted-foreground opacity-30">·</span>
            <span className="font-mono text-xs text-muted-foreground">{post.readTime} baca</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            <p
              className="font-sans text-lg leading-loose mb-8 pb-8 border-b"
              style={{ color: "var(--muted-foreground)", borderColor: "var(--border)" }}
            >
              {post.excerpt}
            </p>

            <ArticleContent sections={post.content} />

            <div
              className="mt-12 pt-8 border-t flex flex-wrap items-center justify-between gap-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-sm"
                    style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {["Twitter", "LinkedIn"].map((svc) => (
                  <button
                    key={svc}
                    className="font-mono text-xs px-3 py-2 rounded-sm border transition-colors"
                    style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  >
                    Share di {svc}
                  </button>
                ))}
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-5">
                  Artikel Terkait
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <button
                      key={related.id}
                      onClick={() => onPostClick(related.id)}
                      className="group text-left rounded-sm border overflow-hidden transition-all"
                      style={{ background: "var(--card)", borderColor: "var(--border)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    >
                      <div className="h-32 overflow-hidden bg-muted">
                        <img
                          src={related.imageUrl}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex gap-1.5 mb-2 flex-wrap">
                          {related.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm"
                              style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className="font-mono text-xs font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {related.title}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground mt-2">
                          {related.readTime} baca →
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div
              className="mt-12 p-8 rounded-sm"
              style={{ background: "rgba(200,241,53,0.04)", border: "1px solid rgba(200,241,53,0.2)" }}
            >
              <p className="font-mono text-[10px] tracking-widest mb-3" style={{ color: "var(--primary)" }}>
                SELANJUTNYA
              </p>
              <h3 className="font-mono font-bold text-lg text-foreground mb-4">
                Tertarik dengan cara berpikir saya?
              </h3>
              <p className="font-sans text-sm text-muted-foreground mb-6 leading-relaxed">
                Lihat proyek-proyek yang saya bangun — dari Tugas Akhir hingga hackathon dan produk personal yang dipakai ratusan orang.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onProjectsClick}
                  className="font-mono text-sm font-semibold px-5 py-2.5 rounded-sm transition-opacity hover:opacity-85"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  Lihat Proyek Saya →
                </button>
                <button
                  onClick={onBack}
                  className="font-mono text-sm px-5 py-2.5 rounded-sm border transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  ← Semua Artikel
                </button>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block w-56 flex-shrink-0">
            <TableOfContents sections={post.content} />
          </aside>
        </div>
      </div>
    </div>
  );
}
