import { useState, useMemo, useEffect } from "react";
import { certifications, type Certification } from "../data";
import { useData } from "../context/DataContext";

interface CertificationsPageProps {
  onBack: () => void;
}

const categoryColors: Record<string, { bg: string; fg: string }> = {
  web: { bg: "rgba(200,241,53,0.15)", fg: "var(--primary)" },
  programming: { bg: "rgba(129,140,248,0.15)", fg: "#818cf8" },
  ai: { bg: "rgba(251,191,36,0.15)", fg: "#fbbf24" },
  networking: { bg: "rgba(52,211,153,0.15)", fg: "#34d399" },
};

type CategoryFilter = "all" | "web" | "programming" | "ai" | "networking";

const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "Semua Kategori" },
  { id: "web", label: "Frontend & Web" },
  { id: "programming", label: "Programming & Clean Code" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "networking", label: "Jaringan & Infrastruktur" },
];

export default function CertificationsPage({ onBack }: CertificationsPageProps) {
  const { developerInfo } = useData();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Unique skills across all certs
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    certifications.forEach((c) => {
      c.skills.forEach((s) => skillSet.add(s));
    });
    return Array.from(skillSet).sort();
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: certifications.length };
    certifications.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered certifications
  const filteredCerts = useMemo(() => {
    return certifications.filter((c) => {
      if (selectedCategory !== "all" && c.category !== selectedCategory) {
        return false;
      }
      if (selectedSkill && !c.skills.includes(selectedSkill)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchIssuer = c.issuer.toLowerCase().includes(q);
        const matchDesc = c.description.toLowerCase().includes(q);
        const matchSkill = c.skills.some((s) => s.toLowerCase().includes(q));
        const matchCred = c.credentialId?.toLowerCase().includes(q);
        if (!matchName && !matchIssuer && !matchDesc && !matchSkill && !matchCred) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedSkill, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedSkill(null);
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
              className="font-mono text-[10px] tracking-widest px-2.5 py-0.5 rounded-sm border uppercase"
              style={{
                borderColor: "rgba(200,241,53,0.3)",
                background: "rgba(200,241,53,0.08)",
                color: "var(--primary)",
              }}
            >
              Kredensial &amp; Kursus
            </span>
            <span className="font-mono text-xs text-muted-foreground hidden sm:inline">
              {certifications.length} Total Sertifikat
            </span>
          </div>
        </div>
      </header>

      {/* Main Header / Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <span className="font-mono text-xs tracking-widest mb-3 block" style={{ color: "var(--primary)" }}>
              — PENGEMBANGAN PROFESIONAL &amp; KEAHLIAN —
            </span>
            <h1
              className="font-mono font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Sertifikasi &amp;{" "}
              <span style={{ color: "var(--primary)" }}>Kursus Resmi</span>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl font-sans text-sm md:text-base leading-relaxed">
              Daftar lisensi profesional, sertifikasi industri terakreditasi, dan kursus intensif yang telah diselesaikan oleh {developerInfo.name} untuk memperkuat kompetensi di dunia rekayasa perangkat lunak.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <div
              className="px-4 py-2.5 rounded-sm border flex flex-col min-w-[100px]"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className="font-mono text-xl font-bold" style={{ color: "var(--primary)" }}>
                {certifications.length}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Sertifikasi</span>
            </div>
            <div
              className="px-4 py-2.5 rounded-sm border flex flex-col min-w-[100px]"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className="font-mono text-xl font-bold text-sky-400">
                4
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Penerbit Utama</span>
            </div>
            <div
              className="px-4 py-2.5 rounded-sm border flex flex-col min-w-[100px]"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <span className="font-mono text-xl font-bold text-amber-400">
                100%
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 space-y-4">
          {/* Search Input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-xs">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama sertifikasi, lembaga (Meta, Dicoding, Google), atau keahlian (React, SOLID)..."
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

            {(searchQuery || selectedCategory !== "all" || selectedSkill) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2.5 font-mono text-xs rounded-sm border hover:border-red-500 hover:text-red-400 transition-colors shrink-0 cursor-pointer"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((f) => {
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

          {/* Skills Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider shrink-0">
              Filter Skill:
            </span>
            {selectedSkill && (
              <button
                onClick={() => setSelectedSkill(null)}
                className="font-mono text-[10px] px-2 py-0.5 rounded-sm flex items-center gap-1 cursor-pointer"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                <span>{selectedSkill}</span>
                <span>✕</span>
              </button>
            )}
            {allSkills.slice(0, 12).map((skill) => {
              const isSkillActive = selectedSkill === skill;
              return (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(isSkillActive ? null : skill)}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded-sm border transition-colors cursor-pointer"
                  style={{
                    background: isSkillActive ? "var(--primary)" : "var(--card)",
                    color: isSkillActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    borderColor: isSkillActive ? "var(--primary)" : "var(--border)",
                  }}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter */}
        <div
          className="mt-6 flex items-center justify-between text-xs font-mono text-muted-foreground border-b pb-3"
          style={{ borderColor: "var(--border)" }}
        >
          <span>
            Menampilkan <strong className="text-foreground">{filteredCerts.length}</strong> dari {certifications.length} sertifikasi
          </span>
          {selectedCategory !== "all" && (
            <span className="text-primary font-semibold">
              Kategori: {categoryFilters.find((f) => f.id === selectedCategory)?.label}
            </span>
          )}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {filteredCerts.map((cert) => {
            const catStyle = categoryColors[cert.category] || { bg: "var(--muted)", fg: "var(--foreground)" };
            return (
              <article
                key={cert.id}
                className="group relative p-6 rounded-sm border flex flex-col justify-between transition-all duration-300"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  {/* Top Bar: Category & Year */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <span
                      className="font-mono text-[10px] tracking-wider px-2.5 py-0.5 rounded-sm font-semibold"
                      style={{
                        background: catStyle.bg,
                        color: catStyle.fg,
                      }}
                    >
                      {cert.categoryLabel}
                    </span>
                    <span
                      className="font-mono text-[11px] px-2 py-0.5 rounded-sm"
                      style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                    >
                      {cert.year}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="font-mono font-bold text-base text-foreground group-hover:text-primary transition-colors mb-1.5 leading-snug">
                    {cert.name}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                    <span className="text-primary">🏢</span>
                    <span className="font-medium text-foreground">{cert.issuer}</span>
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-sm"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Credential ID & Verify Link */}
                <div
                  className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {cert.credentialId && (
                      <span className="select-all">
                        ID: <code className="text-foreground">{cert.credentialId}</code>
                      </span>
                    )}
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold hover:text-primary transition-colors text-right self-end sm:self-auto"
                    style={{ color: "var(--primary)" }}
                  >
                    <span>Verifikasi Kredensial</span>
                    <span>↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCerts.length === 0 && (
          <div
            className="text-center py-20 border rounded-sm mt-8"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <p className="font-mono text-2xl mb-2">📜</p>
            <p className="font-mono text-base font-semibold text-foreground mb-1">
              Tidak ada sertifikasi yang cocok
            </p>
            <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto mb-6">
              Tidak ditemukan sertifikasi atau kursus dengan kata kunci &quot;{searchQuery}&quot;. Coba cari istilah lain atau reset filter.
            </p>
            <button
              onClick={resetFilters}
              className="font-mono text-xs px-4 py-2 rounded-sm border transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer"
              style={{ borderColor: "var(--border)" }}
            >
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* Bottom Verification Note */}
        <div
          className="mt-16 p-8 border rounded-sm text-center relative overflow-hidden"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
        >
          <div className="max-w-xl mx-auto">
            <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--primary)" }}>
              Keaslian Dokumen
            </span>
            <h2 className="font-mono font-bold text-xl md:text-2xl text-foreground mb-3">
              Verifikasi &amp; Salinan Sertifikat
            </h2>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              Seluruh kredensial di atas dapat diverifikasi langsung melalui portal penyedia (Meta Coursera, Dicoding, Cisco). Jika Anda memerlukan berkas PDF sertifikat asli untuk verifikasi berkas HRD, silakan hubungi langsung.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${developerInfo.email}?subject=Permintaan%20Verifikasi%20Sertifikat%20-%20Arya%20Yusufa`}
                className="font-mono text-xs font-semibold px-5 py-2.5 rounded-sm transition-all shadow-md"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Minta Salinan Sertifikat (PDF) →
              </a>
              <button
                onClick={onBack}
                className="font-mono text-xs px-5 py-2.5 rounded-sm border hover:border-primary transition-colors cursor-pointer"
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
