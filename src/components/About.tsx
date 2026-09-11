import { education, certifications, organizations } from "../data";
import { useData } from "../context/DataContext";

interface AboutProps {
  onViewAllCertifications?: () => void;
}

export default function About({ onViewAllCertifications }: AboutProps = {}) {
  const { developerInfo } = useData();
  const previewCerts = certifications.slice(0, 3);
  return (
    <section id="about" className="py-24 px-6" style={{ background: "var(--secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span
            className="font-mono text-xs tracking-widest mb-3 block"
            style={{ color: "var(--primary)" }}
          >
            —02— TENTANG SAYA
          </span>
          <h2
            className="font-mono font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Latar Belakang
            <br />
            <span style={{ color: "var(--primary)" }}>& Perjalanan</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div
              className="p-6 rounded-sm border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-sm" style={{ color: "var(--primary)" }}>◎</span>
                <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-widest">
                  Pendidikan
                </h3>
              </div>
              <p className="font-mono font-bold text-base text-foreground mb-0.5">{education.university}</p>
              <p className="font-sans text-sm text-muted-foreground mb-0.5">{education.major}</p>
              <p className="font-sans text-xs text-muted-foreground mb-4">{education.year}</p>

              <div className="flex flex-wrap gap-2">
                <span
                  className="font-mono text-xs px-2.5 py-1 rounded-sm"
                  style={{ background: "rgba(200,241,53,0.12)", color: "var(--primary)" }}
                >
                  IPK {education.gpa}
                </span>
                <span
                  className="font-mono text-xs px-2.5 py-1 rounded-sm"
                  style={{ background: "rgba(200,241,53,0.12)", color: "var(--primary)" }}
                >
                  {education.predicate}
                </span>
              </div>

              <div
                className="mt-4 pt-4 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
                  Tugas Akhir
                </p>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {education.thesisTitle}
                </p>
              </div>
            </div>

            <a
              href={developerInfo.cvUrl && developerInfo.cvUrl !== "#" ? developerInfo.cvUrl : "#"}
              download={developerInfo.cvFilename || "Arya_Yusufa_Agnil_Fikri_CV.pdf"}
              target={developerInfo.cvUrl && developerInfo.cvUrl !== "#" ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center justify-center gap-2 font-mono text-sm font-semibold py-3.5 rounded-sm border transition-all hover:opacity-90"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                borderColor: "var(--primary)",
              }}
            >
              ↓ Download CV (PDF)
            </a>

            <div
              className="p-5 rounded-sm border"
              style={{ background: "rgba(200,241,53,0.04)", borderColor: "rgba(200,241,53,0.15)" }}
            >
              <p className="font-mono text-xs font-semibold mb-2" style={{ color: "var(--primary)" }}>
                Siap Mulai
              </p>
              <p className="font-sans text-sm text-muted-foreground">
                Tersedia untuk remote, hybrid, atau on-site. Bisa mulai dalam{" "}
                <span className="text-foreground font-medium">2 minggu</span> dari penawaran.
                Terbuka untuk relokasi.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-8">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3
                  onClick={onViewAllCertifications}
                  className={`font-mono text-xs font-semibold text-foreground uppercase tracking-widest flex items-center gap-2 ${
                    onViewAllCertifications ? "cursor-pointer hover:text-primary transition-colors" : ""
                  }`}
                  title={onViewAllCertifications ? "Klik untuk melihat semua sertifikasi & kursus" : undefined}
                >
                  <span style={{ color: "var(--primary)" }}>◈</span> Sertifikasi &amp; Kursus
                </h3>
                {onViewAllCertifications && (
                  <button
                    onClick={onViewAllCertifications}
                    className="font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat Semua ({certifications.length})</span>
                    <span>→</span>
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {previewCerts.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={onViewAllCertifications || undefined}
                    className={`flex items-center justify-between gap-4 p-3.5 rounded-sm border transition-all duration-200 group ${
                      onViewAllCertifications ? "cursor-pointer" : ""
                    }`}
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          {cert.name}
                        </p>
                      </div>
                      <p className="font-sans text-[11px] text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="font-mono text-[10px] px-2 py-0.5 rounded-sm"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                      >
                        {cert.year}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {onViewAllCertifications && (
                <button
                  onClick={onViewAllCertifications}
                  className="w-full mt-3 py-2.5 font-mono text-xs font-semibold rounded-sm border transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                    color: "var(--foreground)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--foreground)";
                  }}
                >
                  <span>Lihat Semua Sertifikasi &amp; Pelatihan ({certifications.length})</span>
                  <span>→</span>
                </button>
              )}
            </div>

            {organizations.length > 0 ? (
              <div>
                <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span style={{ color: "var(--primary)" }}>◉</span> Organisasi & Komunitas
                </h3>
                <div className="space-y-3">
                  {organizations.map((org, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-sm border"
                      style={{ background: "var(--card)", borderColor: "var(--border)" }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-1.5">
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-xs font-semibold text-foreground">{org.name}</p>
                          <p className="font-mono text-xs" style={{ color: "var(--primary)" }}>
                            {org.role}
                          </p>
                        </div>
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded-sm shrink-0"
                          style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                        >
                          {org.period}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        {org.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span style={{ color: "var(--primary)" }}>◉</span> Karakter & Nilai Kerja
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="p-4 rounded-sm border"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <p className="font-mono text-xs font-semibold text-foreground mb-1.5">
                      Fokus Praktik & Hands-on
                    </p>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Latar belakang pendidikan vokasi Politeknik dengan kurikulum praktikal, terbiasa langsung mengimplementasikan teori ke dalam kode aplikasi nyata.
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-sm border"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <p className="font-mono text-xs font-semibold text-foreground mb-1.5">
                      Konsistensi & Disiplin (IPK 3.84)
                    </p>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Menjaga standar kualitas belajar tinggi hingga lulus dengan predikat Cum Laude. Teliti terhadap kerapian kode dan detail visual antarmuka.
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-sm border"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <p className="font-mono text-xs font-semibold text-foreground mb-1.5">
                      Pembelajar Cepat & Mandiri
                    </p>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Terbiasa meriset dokumentasi resmi secara mandiri, mengikuti sertifikasi kompetensi web, dan menyelesaikan kendala koding tanpa bergantung penuh pada bimbingan.
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-sm border"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <p className="font-mono text-xs font-semibold text-foreground mb-1.5">
                      Siap Kerja & Beradaptasi
                    </p>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Siap segera onboarding, beradaptasi dengan coding guidelines tim, dan berkontribusi aktif pada proyek web perusahaan.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
