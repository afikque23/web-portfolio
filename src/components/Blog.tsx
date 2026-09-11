import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";

interface BlogProps {
  onPostClick: (id: string) => void;
}

export default function Blog({ onPostClick }: BlogProps) {
  const { blogPosts } = useData();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { void entry; },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span
              className="font-mono text-xs tracking-widest mb-3 block"
              style={{ color: "var(--primary)" }}
            >
              —06— WRITING
            </span>
            <h2
              className="font-mono font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Tulisan dari
              <br />
              <span style={{ color: "var(--primary)" }}>Lapangan</span>
            </h2>
          </div>
          <span className="hidden md:block font-mono text-xs text-muted-foreground">
            {blogPosts.length} artikel
          </span>
        </div>

        <div className="space-y-5">
          {blogPosts.map((post, i) => (
            <article
              key={post.id}
              onClick={() => onPostClick(post.id)}
              className="group flex flex-col md:flex-row gap-0 rounded-sm border overflow-hidden cursor-pointer transition-all duration-300"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="relative w-full md:w-56 h-40 md:h-auto flex-shrink-0 bg-muted overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(11,11,13,0.3) 0%, transparent 60%)" }}
                />
                <span
                  className="absolute top-3 left-3 font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-sm"
                  style={{ background: "rgba(11,11,13,0.8)", color: "var(--primary)" }}
                >
                  0{i + 1}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-sm"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-mono font-semibold text-base text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div
                  className="flex items-center justify-between mt-4 pt-4 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-muted-foreground">{post.date}</span>
                    <span className="text-muted-foreground opacity-30">·</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{post.readTime} baca</span>
                  </div>
                  <span
                    className="font-mono text-xs transition-colors group-hover:text-primary"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Baca →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
