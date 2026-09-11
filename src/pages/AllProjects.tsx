import { useState, useMemo, useEffect } from "react";
import { useData } from "../context/DataContext";

interface AllProjectsProps {
  onBack: () => void;
  onProjectClick: (id: string) => void;
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
  { id: "all", label: "Semua Kategori" },
  { id: "thesis", label: "Tugas Akhir / IoT" },
  { id: "personal", label: "Web & Mobile" },
  { id: "course", label: "AI & ML" },
  { id: "internship", label: "UMKM & Komunitas" },
];

export default function AllProjects({ onBack, onProjectClick }: AllProjectsProps) {
  const { projects, developerInfo } = useData();
  const [selectedCategory, setSelectedCategory] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => {
      p.tags.forEach((t) => tagSet.add(t));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    projects.forEach((p) => {
      counts[p.type] = (counts[p.type] || 0) + 1;
    });
    return counts;
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.type !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !p.tags.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const matchRole = p.role.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTags && !matchRole) {
          return false;
        }
      }
      return true;
    });
  }, [projects, selectedCategory, selectedTag, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedTag(null);
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Top Navbar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md px-6 py-3.5 transition-all"
        style={{
          background: "rgba(11,11,13,0.92)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-sm border uppercase"
              style={{
                borderColor: "rgba(200,241,53,0.3)",
                background: "rgba(200,241,53,0.08)",
                color: "var(--primary)",
              }}
            >
              Direktori Proyek
            </span>
            <span className="font-mono text-xs text-muted-foreground hidden sm:inline">
              {projects.length} Total Proyek
            </span>
          </div>
        </div>
      </header>

      {/* Main Header / Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8" style={{ borderColor: "var(--border)" }}>
          <div>
            <span className="font-mono text-xs tracking-widest mb-3 block" style={{ color: "var(--primary)" }}>
              — DIREKTORI LENGKAP PROYEK —
            </span>
            <h1
              className="font-mono font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Semua Karya &amp;{" "}
              <span style={{ color: "var(--primary)" }}>Repositori</span>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl font-sans text-sm md:text-base leading-relaxed">
              Arsip lengkap pengembangan perangkat lunak, arsitektur IoT terintegrasi, aplikasi mobile Flutter, platform web modern, dan model machine learning oleh {developerInfo.name}.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <div
              className="px-3.5 py-2 rounded-sm border flex flex-col"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className="font-mono text-lg font-bold" style={{ color: "var(--primary)" }}>
                {projects.length}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Proyek Aktif</span>
            </div>
            <div
              className="px-3.5 py-2 rounded-sm border flex flex-col"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className="font-mono text-lg font-bold text-amber-400">
                {projects.filter((p) => p.featured).length}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Unggulan</span>
            </div>
            <div
              className="px-3.5 py-2 rounded-sm border flex flex-col"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className="font-mono text-lg font-bold text-emerald-400">
                {projects.filter((p) => p.githubUrl).length}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Open Source</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 space-y-4">
          {/* Search Input & Info */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-xs">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul proyek, kata kunci, teknologi (misal: IoT, Flutter, React)..."
                className="w-full pl-9 pr-8 py-2.5 rounded-sm border font-mono text-xs transition-colors focus:outline-none"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {(searchQuery || selectedCategory !== "all" || selectedTag) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2.5 font-mono text-xs rounded-sm border hover:border-red-500 hover:text-red-400 transition-colors shrink-0"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = selectedCategory === f.id;
              const count = categoryCounts[f.id] || 0;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedCategory(f.id)}
                  className="font-mono text-xs px-3.5 py-1.5 rounded-sm border transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  style={{
                    background: isActive ? "var(--primary)" : "var(--card)",
                    color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    borderColor: isActive ? "var(--primary)" : "var(--border)",
                  }}
                >
                  <span>{f.label}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded-full"
                    style={{
                      background: isActive ? "rgba(0,0,0,0.2)" : "var(--muted)",
                      color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Technology Tag Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider shrink-0">
              Filter Tag:
            </span>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="font-mono text-[10px] px-2 py-0.5 rounded-sm flex items-center gap-1"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                <span>{selectedTag}</span>
                <span>✕</span>
              </button>
            )}
            {allTags.slice(0, 14).map((tag) => {
              const isTagActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isTagActive ? null : tag)}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded-sm border transition-colors cursor-pointer"
                  style={{
                    background: isTagActive ? "var(--primary)" : "var(--card)",
                    color: isTagActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    borderColor: isTagActive ? "var(--primary)" : "var(--border)",
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs font-mono text-muted-foreground border-b pb-3" style={{ borderColor: "var(--border)" }}>
          <span>
            Menampilkan <strong className="text-foreground">{filteredProjects.length}</strong> dari {projects.length} proyek
          </span>
          {selectedCategory !== "all" && (
            <span className="text-primary font-semibold">
              Kategori: {filters.find((f) => f.id === selectedCategory)?.label}
            </span>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="project-card group relative overflow-hidden rounded-sm border flex flex-col transition-all duration-300 cursor-pointer"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => onProjectClick(project.id)}
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <div
                  className="project-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
                  style={{ background: "rgba(11,11,13,0.75)" }}
                >
                  <span
                    className="font-mono text-xs font-semibold px-4 py-2 rounded-sm shadow-md"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    Buka Case Study →
                  </span>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  <span
                    className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-sm backdrop-blur-sm"
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
                      style={{ background: "rgba(11,11,13,0.85)", color: "var(--primary)" }}
                    >
                      ★ Unggulan
                    </span>
                  )}
                </div>

                {/* Direct Action Links (Repo / Demo) */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Lihat Repositori GitHub"
                      className="font-mono text-[10px] px-2 py-1 rounded-sm border backdrop-blur-md transition-colors hover:border-primary hover:text-primary flex items-center gap-1"
                      style={{
                        background: "rgba(11,11,13,0.85)",
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                      }}
                    >
                      <span>Code</span>
                      <span>↗</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Lihat Live Demo"
                      className="font-mono text-[10px] px-2 py-1 rounded-sm border backdrop-blur-md transition-colors hover:border-primary hover:text-primary flex items-center gap-1"
                      style={{
                        background: "rgba(11,11,13,0.85)",
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                      }}
                    >
                      <span>Live</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-mono font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0 mt-0.5">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
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
                </div>

                <div
                  className="pt-3.5 border-t flex items-center justify-between mt-auto"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span className="font-sans text-[11px] text-muted-foreground truncate max-w-[180px]">
                    {project.year} • {project.duration}
                  </span>
                  <span
                    className="font-mono text-xs transition-colors group-hover:text-primary flex items-center gap-1"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <span>Detail</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div
            className="text-center py-20 border rounded-sm mt-8"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <p className="font-mono text-2xl mb-2">🔍</p>
            <p className="font-mono text-base font-semibold text-foreground mb-1">
              Tidak ada proyek yang sesuai
            </p>
            <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto mb-6">
              Tidak ditemukan proyek dengan kata kunci &quot;{searchQuery}&quot; atau filter yang dipilih. Coba cari dengan kata kunci lain.
            </p>
            <button
              onClick={resetFilters}
              className="font-mono text-xs px-4 py-2 rounded-sm border transition-colors hover:bg-primary hover:text-primary-foreground"
              style={{ borderColor: "var(--border)" }}
            >
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div
          className="mt-16 p-8 border rounded-sm text-center relative overflow-hidden"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
        >
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--primary)" }}>
              Ada Proyek Menarik?
            </span>
            <h2 className="font-mono font-bold text-xl md:text-2xl text-foreground mb-3">
              Mari Bangun Sesuatu yang Berdampak
            </h2>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              Terbuka untuk kesempatan kerja full-time, kontrak, maupun kolaborasi proyek sistem IoT &amp; full-stack web.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${developerInfo.email}`}
                className="font-mono text-xs font-semibold px-5 py-2.5 rounded-sm transition-all shadow-md"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Kirim Pesan Email →
              </a>
              <button
                onClick={onBack}
                className="font-mono text-xs px-5 py-2.5 rounded-sm border hover:border-primary transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
