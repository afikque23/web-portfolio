import { useEffect, useRef } from "react";
import { useData } from "../context/DataContext";

const roles = [
  "Fresh Graduate Developer",
  "React & Next.js Enthusiast",
  "Problem Solver",
  "Open to Work",
];

export default function Hero() {
  const { developerInfo } = useData();
  const roleRef = useRef<HTMLSpanElement>(null);
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const type = () => {
      const el = roleRef.current;
      if (!el) return;
      const current = roles[roleIndex.current];
      if (!deleting.current) {
        el.textContent = current.slice(0, charIndex.current + 1);
        charIndex.current++;
        if (charIndex.current === current.length) {
          deleting.current = true;
          timeout = setTimeout(type, 2200);
          return;
        }
      } else {
        el.textContent = current.slice(0, charIndex.current - 1);
        charIndex.current--;
        if (charIndex.current === 0) {
          deleting.current = false;
          roleIndex.current = (roleIndex.current + 1) % roles.length;
        }
      }
      timeout = setTimeout(type, deleting.current ? 40 : 85);
    };
    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="min-h-screen relative flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 dot-grid" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 55%, rgba(200,241,53,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
      />

      {/* Status card — floating on desktop only */}
      <div className="hidden md:block absolute top-28 right-12 z-10 animate-fade-in delay-600">
        <div
          className="rounded-sm px-4 py-3 text-sm border"
          style={{ background: "rgba(16,16,19,0.85)", borderColor: "var(--border)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#4ade80", animation: "pulseGlow 2s ease-in-out infinite" }}
            />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              Status
            </span>
          </div>
          <p className="font-sans text-sm text-foreground font-medium">{developerInfo.currentStatus}</p>
          <p className="font-mono text-[10px] text-muted-foreground mt-1">{developerInfo.location}</p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-20 pt-32">
        <div className="mb-5 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--primary)" }}>
            —01— <span ref={roleRef} className="cursor-blink" />
          </span>
          {/* Status inline badge — mobile only */}
          <div className="md:hidden mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border" style={{ background: "rgba(16,16,19,0.85)", borderColor: "var(--border)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#4ade80", animation: "pulseGlow 2s ease-in-out infinite" }}
            />
            <span className="font-sans text-xs text-foreground font-medium">{developerInfo.currentStatus}</span>
            <span className="font-mono text-[9px] text-muted-foreground">· {developerInfo.location}</span>
          </div>
        </div>

        <h1
          className="font-mono font-extrabold leading-none tracking-tighter mb-4 opacity-0 animate-fade-up delay-100"
          style={{
            fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)",
            wordSpacing: "-0.38em",
            animationFillMode: "forwards",
          }}
        >
          <span className="block text-foreground">ARYA YUSUFA</span>
          <span className="block" style={{ color: "var(--primary)" }}>AGNIL FIKRI</span>
        </h1>

        <div
          className="mb-8 opacity-0 animate-fade-up delay-200"
          style={{ animationFillMode: "forwards" }}
        >
          <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
            Fresh graduate D3 Teknik Informatika Politeknik Negeri Semarang 2026 (IPK 3.84 Cum Laude).
            Fokus pada pengembangan web modern dengan React & TypeScript berbasis pendidikan vokasi yang praktikal.{" "}
            <span className="text-foreground font-medium">
              Sekarang aktif mencari posisi junior developer atau magang.
            </span>
          </p>
        </div>

        <div
          className="flex flex-wrap items-center gap-3 mb-12 opacity-0 animate-fade-up delay-300"
          style={{ animationFillMode: "forwards" }}
        >
          <a
            href="#projects"
            className="font-mono text-sm font-semibold px-6 py-3 rounded-sm transition-opacity hover:opacity-85 active:scale-[0.98]"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Lihat Proyek ↓
          </a>
          <a
            href="#"
            className="font-mono text-sm px-6 py-3 rounded-sm border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            Download CV ↗
          </a>
          <a
            href="#contact"
            className="font-mono text-sm px-6 py-3 rounded-sm border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            Let&apos;s Talk →
          </a>
        </div>

        <div
          className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-0 animate-fade-up delay-500"
          style={{ animationFillMode: "forwards" }}
        >
          {[
            { value: "3.84", label: "IPK Cum Laude" },
            { value: "D3", label: "Teknik Informatika" },
            { value: "Polines", label: "Semarang" },
            { value: "10+", label: "Proyek selesai" },
            { value: "3", label: "Sertifikasi" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-2xl md:text-3xl font-bold" style={{ color: "var(--primary)" }}>
                {stat.value}
              </p>
              <p className="font-sans text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
