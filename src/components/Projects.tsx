import { useState, useEffect, useRef } from "react";
import { useData } from "../context/DataContext";

interface ProjectsProps {
  onProjectClick: (id: string) => void;
  onViewAll?: () => void;
}

const typeColors: Record<string, string> = {
  thesis: "rgba(200,241,53,0.15)",
  hackathon: "rgba(251,146,60,0.15)",
  personal: "rgba(129,140,248,0.15)",
  internship: "rgba(52,211,153,0.15)",
  course: "rgba(251,191,36,0.15)",
};

const typeFgColors: Record<string, string> = {
  thesis: "var(--primary)",
  hackathon: "#fb923c",
  personal: "#818cf8",
  internship: "#34d399",
  course: "#fbbf24",
};

type Filter = "all" | "thesis" | "personal" | "course" | "internship";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "thesis", label: "Tugas Akhir / IoT" },
  { id: "personal", label: "Web & Mobile" },
  { id: "course", label: "AI & ML" },
  { id: "internship", label: "UMKM & Komunitas" },
];

export default function Projects({ onProjectClick, onViewAll }: ProjectsProps) {
  const { projects } = useData();
  const [filter, setFilter] = useState<Filter>("all");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { void entry; }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);
  const displayed = filtered.slice(0, 4);

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-8 mb-10 flex-wrap">
          <div>
            <span className="font-mono text-xs tracking-widest mb-3 block" style={{ color: "var(--primary)" }}>
              —03— PROJECTS
            </span>
            <h2
              className="font-mono font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Proyek yang
              <br />
              <span style={{ color: "var(--primary)" }}>Bisa Bicara</span>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-3 self-end">
            <p className="hidden md:block font-sans text-sm text-muted-foreground max-w-xs text-right">
              Bukan sekadar coding assignment — semua proyek punya pengguna nyata, masalah nyata, dan pelajaran nyata.
            </p>
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="group font-mono text-xs px-3.5 py-1.5 rounded-sm border hover:border-primary hover:text-primary transition-all flex items-center gap-1.5 cursor-pointer"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", background: "var(--card)" }}
              >
                <span>Lihat Semua Proyek ({projects.length})</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-all duration-200"
              style={{
                background: filter === f.id ? "var(--primary)" : "transparent",
                color: filter === f.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                borderColor: filter === f.id ? "var(--primary)" : "var(--border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayed.map((project, i) => (
            <article
              key={project.id}
              className="project-card group relative overflow-hidden rounded-sm border cursor-pointer transition-all duration-300"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => onProjectClick(project.id)}
            >
              <div className="relative h-44 overflow-hidden bg-muted">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="project-overlay absolute inset-0 opacity-0 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(11,11,13,0.75)" }}
                >
                  <span
                    className="font-mono text-sm font-semibold px-4 py-2 rounded-sm"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    Baca Case Study →
                  </span>
                </div>
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span
                    className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-sm"
                    style={{
                      background: typeColors[project.type] || "rgba(200,241,53,0.15)",
                      color: typeFgColors[project.type] || "var(--primary)",
                    }}
                  >
                    {project.typeLabel}
                  </span>
                  {project.featured && (
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded-sm"
                      style={{ background: "rgba(11,11,13,0.8)", color: "var(--primary)" }}
                    >
                      ★ Unggulan
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-mono font-bold text-lg text-foreground">{project.title}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0 mt-1">
                    0{i + 1}
                  </span>
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded-sm"
                      style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span className="font-sans text-xs text-muted-foreground">{project.impact}</span>
                  <span
                    className="font-mono text-xs transition-colors group-hover:text-primary"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Case Study →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA Button */}
        {onViewAll && projects.length > 0 && (
          <div className="mt-14 text-center flex flex-col items-center justify-center gap-3">
            <button
              onClick={onViewAll}
              className="group inline-flex items-center gap-3 font-mono text-sm font-semibold px-8 py-3.5 rounded-sm border transition-all duration-300 cursor-pointer shadow-lg"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                borderColor: "var(--primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(200,241,53,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>Lihat Semua Proyek ({projects.length})</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>
            <p className="font-sans text-xs text-muted-foreground">
              Menampilkan {displayed.length} dari total {projects.length} proyek. Buka direktori lengkap untuk pencarian dan filter teknologi.
            </p>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-mono text-sm text-muted-foreground">Tidak ada proyek dengan filter ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}
