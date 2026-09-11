import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
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

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const { projects } = useData();
  const project = projects.find((p) => p.id === projectId);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.body.style.overflow = "";
  }, []);

  if (!project) return null;

  const stories = [
    { num: "01", label: "Latar Belakang Masalah", content: project.challenge },
    { num: "02", label: "Pendekatan & Solusi", content: project.solution },
    { num: "03", label: "Keputusan Teknis Penting", content: project.technicalDecisions },
    { num: "04", label: "Hasil & Dampak", content: project.outcome },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "'Outfit', sans-serif" }}
    >
      <div
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 border-b"
        style={{
          background: "rgba(11,11,13,0.92)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Kembali ke Portfolio
          </button>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-semibold px-3 py-1.5 rounded-sm transition-opacity hover:opacity-85"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="relative h-[55vh] overflow-hidden bg-muted">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, var(--background) 0%, rgba(11,11,13,0.5) 60%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-10">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-sm"
              style={{
                background: typeColors[project.type] || "rgba(200,241,53,0.15)",
                color: typeFgColors[project.type] || "var(--primary)",
              }}
            >
              {project.typeLabel}
            </span>
            {project.featured && (
              <span
                className="font-mono text-xs px-2.5 py-1 rounded-sm"
                style={{ background: "rgba(200,241,53,0.15)", color: "var(--primary)" }}
              >
                ★ Unggulan
              </span>
            )}
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          </div>
          <h1
            className="font-mono font-extrabold leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {project.title}
          </h1>
          <p className="font-sans text-lg text-muted-foreground mt-3 max-w-2xl">
            {project.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-sm border mb-12 overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          {[
            { label: "Role", value: project.role },
            { label: "Durasi", value: project.duration },
            { label: "Tim", value: project.team },
            { label: "Dampak", value: project.impact },
          ].map((item, i) => (
            <div
              key={item.label}
              className="p-5"
              style={{
                background: "var(--card)",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
              }}
            >
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
                {item.label}
              </p>
              <p className="font-sans text-sm text-foreground font-medium leading-tight">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 rounded-sm"
                style={{ background: "var(--muted)", color: "var(--foreground)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {stories.map((s) => (
            <div
              key={s.num}
              className="p-6 rounded-sm border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--primary)" }}>
                  {s.num}
                </span>
                <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wide">
                  {s.label}
                </h3>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>

        <div
          className="mb-12 p-6 rounded-sm border"
          style={{ background: "rgba(200,241,53,0.04)", borderColor: "rgba(200,241,53,0.2)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--primary)" }}>
              05
            </span>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
              Yang Saya Pelajari — Growth Mindset
            </h3>
          </div>
          <p className="font-sans text-muted-foreground leading-relaxed">{project.learnings}</p>
        </div>

        {project.gallery.length > 0 && (
          <div className="mb-12">
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-4">
              Galeri Screenshot
            </p>
            <div className="relative rounded-sm overflow-hidden bg-muted mb-3" style={{ height: "360px" }}>
              <img
                src={project.gallery[galleryIndex]}
                alt={`${project.title} screenshot ${galleryIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setGalleryIndex((i) => (i - 1 + project.gallery.length) % project.gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-sm flex items-center justify-center font-mono text-sm transition-all hover:scale-110"
                    style={{ background: "rgba(11,11,13,0.8)", color: "var(--foreground)" }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setGalleryIndex((i) => (i + 1) % project.gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-sm flex items-center justify-center font-mono text-sm transition-all hover:scale-110"
                    style={{ background: "rgba(11,11,13,0.8)", color: "var(--foreground)" }}
                  >
                    ›
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: i === galleryIndex ? "20px" : "6px",
                      height: "6px",
                      background: i === galleryIndex ? "var(--primary)" : "rgba(238,234,227,0.4)",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {project.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className="relative rounded-sm overflow-hidden bg-muted transition-all"
                  style={{
                    height: "72px",
                    opacity: i === galleryIndex ? 1 : 0.5,
                    border: i === galleryIndex ? "2px solid var(--primary)" : "2px solid transparent",
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          className="flex flex-wrap items-center gap-4 pt-8 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-semibold px-6 py-3 rounded-sm transition-opacity hover:opacity-85"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Live Demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm px-6 py-3 rounded-sm border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              GitHub Repository →
            </a>
          )}
          <button
            onClick={onBack}
            className="font-mono text-sm px-6 py-3 rounded-sm border transition-colors ml-auto"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
          >
            ← Lihat Proyek Lain
          </button>
        </div>
      </div>
    </div>
  );
}
