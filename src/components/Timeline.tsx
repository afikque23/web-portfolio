import { useEffect, useRef, useState } from "react";

const timeline: { year: string; title: string; company: string; description: string; type?: "milestone" | "regular" }[] = [
  { year: "2023", title: "Masuk D3 Teknik Informatika Polines", company: "Politeknik Negeri Semarang", description: "Memulai studi vokasi dengan kurikulum berorientasi praktik intensif, rekayasa perangkat lunak, dan dasar algoritma.", type: "milestone" },
  { year: "2024", title: "Eksplorasi Modern Web & Praktikum", company: "Politeknik Negeri Semarang", description: "Mendalami stack modern React, TypeScript, Tailwind CSS, dan database relasional melalui berbagai praktikum lab.", type: "regular" },
  { year: "2024", title: "Menyelesaikan 3 Sertifikasi Web", company: "Meta & Dicoding Indonesia", description: "Mengikuti dan lulus 3 program sertifikasi pengembangan web untuk memperkuat kompetensi frontend dan JavaScript.", type: "milestone" },
  { year: "2025", title: "Praktik Kerja Lapangan / Industri", company: "Mitra Industri Polines", description: "Pengalaman magang industri, menerapkan best practices git workflow, slicing UI responsif, dan integrasi API.", type: "regular" },
  { year: "2025", title: "Pengembangan Proyek BelajarID", company: "Personal Exploration", description: "Membangun proyek web interaktif untuk menguji kemampuan full-stack dan komponen UI kompleks.", type: "regular" },
  { year: "2026", title: "Sidang Tugas Akhir Web & AI", company: "Politeknik Negeri Semarang", description: "Menyelesaikan Tugas Akhir sistem rekomendasi materi belajar berbasis AI dengan nilai A.", type: "regular" },
  { year: "2026", title: "Lulus D3 Cum Laude (IPK 3.84)", company: "Politeknik Negeri Semarang", description: "Menyelesaikan studi D3 Teknik Informatika Polines dengan IPK 3.84/4.00 berpredikat Cum Laude.", type: "milestone" },
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { void entry; },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" ref={ref} className="py-24 px-6" style={{ background: "var(--secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span
            className="font-mono text-xs tracking-widest mb-3 block"
            style={{ color: "var(--primary)" }}
          >
            —04— JOURNEY
          </span>
          <h2
            className="font-mono font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Perjalanan
            <br />
            <span style={{ color: "var(--primary)" }}>3 Tahun Belajar</span>
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "var(--border)" }}
          />

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isActive = activeIndex === i;
              return (
                <div
                  key={i}
                  className={`relative flex items-start md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row gap-4`}
                  style={{ paddingBottom: i < timeline.length - 1 ? "48px" : "0" }}
                >
                  <div
                    className={`hidden md:flex flex-col items-${isLeft ? "end" : "start"} flex-1 pt-1`}
                  >
                    {isLeft ? (
                      <div
                        className="text-right p-5 rounded-sm border cursor-pointer transition-all duration-300 max-w-sm w-full"
                        style={{
                          background: isActive ? "rgba(200,241,53,0.05)" : "var(--card)",
                          borderColor: isActive ? "var(--border-hover)" : "var(--border)",
                        }}
                        onClick={() => setActiveIndex(isActive ? null : i)}
                      >
                        <TimelineCard item={item} />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  <div className="relative flex-shrink-0 flex flex-col items-center md:static">
                    <button
                      className="timeline-node w-8 h-8 rounded-sm flex items-center justify-center border font-mono text-xs font-bold transition-all duration-300"
                      style={{
                        background: isActive || item.type === "milestone" ? "var(--primary)" : "var(--card)",
                        borderColor: item.type === "milestone" ? "var(--primary)" : "var(--border)",
                        color: isActive || item.type === "milestone" ? "var(--primary-foreground)" : "var(--muted-foreground)",
                        boxShadow: item.type === "milestone" ? "0 0 16px rgba(200,241,53,0.2)" : "none",
                      }}
                      onClick={() => setActiveIndex(isActive ? null : i)}
                    >
                      {item.type === "milestone" ? "★" : "○"}
                    </button>
                    <div
                      className="font-mono text-[10px] mt-1.5 whitespace-nowrap"
                      style={{ color: "var(--primary)" }}
                    >
                      {item.year}
                    </div>
                  </div>

                  <div
                    className={`hidden md:flex flex-col items-${isLeft ? "start" : "end"} flex-1 pt-1`}
                  >
                    {!isLeft ? (
                      <div
                        className="p-5 rounded-sm border cursor-pointer transition-all duration-300 max-w-sm w-full"
                        style={{
                          background: isActive ? "rgba(200,241,53,0.05)" : "var(--card)",
                          borderColor: isActive ? "var(--border-hover)" : "var(--border)",
                        }}
                        onClick={() => setActiveIndex(isActive ? null : i)}
                      >
                        <TimelineCard item={item} />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  <div className="md:hidden flex-1">
                    <div
                      className="p-4 rounded-sm border cursor-pointer transition-all duration-300"
                      style={{
                        background: isActive ? "rgba(200,241,53,0.05)" : "var(--card)",
                        borderColor: isActive ? "var(--border-hover)" : "var(--border)",
                      }}
                      onClick={() => setActiveIndex(isActive ? null : i)}
                    >
                      <TimelineCard item={item} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item }: { item: (typeof timeline)[0] }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        {item.type === "milestone" && (
          <span
            className="font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded-sm uppercase"
            style={{ background: "rgba(200,241,53,0.15)", color: "var(--primary)" }}
          >
            Milestone
          </span>
        )}
      </div>
      <h3 className="font-mono font-semibold text-sm text-foreground mb-0.5">{item.title}</h3>
      <p className="font-mono text-xs mb-2" style={{ color: "var(--primary)" }}>
        {item.company}
      </p>
      <p className="font-sans text-xs text-muted-foreground leading-relaxed">{item.description}</p>
    </>
  );
}
