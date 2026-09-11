import { useEffect } from "react";
import { projects } from "../data";

interface CaseStudyProps {
  projectId: string;
  onClose: () => void;
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

export default function CaseStudy({ projectId, onClose }: CaseStudyProps) {
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[80] flex">
      <div
        className="flex-1 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className="w-full max-w-2xl h-full overflow-y-auto animate-slide-right flex-shrink-0"
        style={{ background: "var(--card)", borderLeft: "1px solid var(--border)" }}
      >
        <div className="relative">
          <div className="relative h-56 bg-muted overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, var(--card) 0%, rgba(16,16,19,0.4) 100%)" }}
            />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-sm flex items-center justify-center font-mono text-sm transition-colors hover:bg-muted"
            style={{ background: "rgba(16,16,19,0.8)", color: "var(--foreground)" }}
          >
            ✕
          </button>

          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span
              className="font-mono text-xs tracking-widest px-2 py-1 rounded-sm"
              style={{
                background: typeColors[project.type] || "rgba(200,241,53,0.15)",
                color: typeFgColors[project.type] || "var(--primary)",
              }}
            >
              {project.typeLabel}
            </span>
            <span
              className="font-mono text-xs px-2 py-1 rounded-sm"
              style={{ background: "rgba(16,16,19,0.8)", color: "var(--muted-foreground)" }}
            >
              {project.year}
            </span>
          </div>
        </div>

        <div className="p-8">
          <h2 className="font-mono font-bold text-3xl text-foreground mb-2">{project.title}</h2>
          <p className="font-sans text-muted-foreground mb-8">{project.longDescription}</p>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-sm mb-8"
            style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
          >
            {[
              { label: "Role", value: project.role },
              { label: "Durasi", value: project.duration },
              { label: "Dampak", value: project.impact },
              { label: "Jenis", value: project.typeLabel },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1 uppercase">
                  {item.label}
                </p>
                <p className="font-sans text-sm text-foreground font-medium leading-tight">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2.5 py-1 rounded-sm"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {[
            { label: "Challenge", content: project.challenge, num: "01", icon: "◎" },
            { label: "Solution", content: project.solution, num: "02", icon: "◈" },
            { label: "Outcome", content: project.outcome, num: "03", icon: "◉" },
          ].map((section) => (
            <div
              key={section.label}
              className="mb-7 pb-7"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--primary)" }}>
                  {section.num}
                </span>
                <h3 className="font-mono font-semibold text-sm text-foreground uppercase tracking-wider">
                  {section.label}
                </h3>
              </div>
              <p className="font-sans text-muted-foreground leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}

          <div
            className="mb-8 p-5 rounded-sm border"
            style={{ background: "rgba(200,241,53,0.04)", borderColor: "rgba(200,241,53,0.2)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--primary)" }}>
                04
              </span>
              <h3 className="font-mono font-semibold text-sm uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                Yang Saya Pelajari
              </h3>
            </div>
            <p className="font-sans text-muted-foreground leading-relaxed text-sm">
              {project.learnings}
            </p>
          </div>

          <div className="flex gap-3 mt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-semibold px-5 py-2.5 rounded-sm transition-opacity hover:opacity-85"
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
                className="font-mono text-sm px-5 py-2.5 rounded-sm border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
