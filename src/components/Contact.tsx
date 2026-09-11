import React, { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";

export default function Contact() {
  const { developerInfo, sendMessage } = useData();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { void entry; },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await sendMessage(form);
      setSubmitted(true);
    } catch {
      setError("Gagal mengirim pesan. Coba lagi atau hubungi via email langsung.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full font-sans text-sm text-foreground bg-muted rounded-sm px-4 py-3 border border-transparent focus:border-primary outline-none transition-all placeholder:text-muted-foreground";

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-6"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span
            className="font-mono text-xs tracking-widest mb-3 block"
            style={{ color: "var(--primary)" }}
          >
            —07— KONTAK
          </span>
          <h2
            className="font-mono font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Undang Saya
            <br />
            <span style={{ color: "var(--primary)" }}>Interview</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <p className="font-sans text-muted-foreground leading-relaxed">
              Sedang mencari junior developer atau intern yang cepat belajar dan sudah terbukti bisa
              ship produk nyata? Mari ngobrol — tidak perlu formal, bisa mulai dari pertanyaan
              singkat pun saya siap balas.
            </p>

            <div className="space-y-5">
              {[
                { label: "Email", value: developerInfo.email, icon: "◉" },
                { label: "Lokasi", value: developerInfo.location, icon: "◎" },
                { label: "Status", value: developerInfo.currentStatus, icon: "◷" },
                { label: "Preferensi", value: "Remote / Hybrid / On-site", icon: "◈" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="font-mono text-base mt-0.5" style={{ color: "var(--primary)" }}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-sans text-sm text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2 font-mono text-sm font-semibold py-3 rounded-sm transition-opacity hover:opacity-85"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                ↓ Download CV (PDF)
              </a>
              <a
                href={developerInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-mono text-sm py-3 rounded-sm border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--muted-foreground)";
                }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center p-10 rounded-sm border"
                style={{ background: "var(--card)", borderColor: "rgba(200,241,53,0.2)" }}
              >
                <div
                  className="w-14 h-14 rounded-sm flex items-center justify-center font-mono text-2xl mb-5"
                  style={{ background: "rgba(200,241,53,0.1)", color: "var(--primary)" }}
                >
                  ◉
                </div>
                <h3 className="font-mono font-bold text-lg text-foreground mb-2">
                  Pesan Terkirim!
                </h3>
                <p className="font-sans text-sm text-muted-foreground">
                  Terima kasih {form.name}! Saya akan membalas dalam 24 jam. Cek juga LinkedIn
                  saya untuk info terbaru.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kirim pesan lain →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-sm border space-y-4"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase block mb-1.5">
                      Nama
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Recruiter / Hiring Manager"
                      className={inputCls}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hr@perusahaan.com"
                      className={inputCls}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase block mb-1.5">
                    Posisi / Keperluan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Junior Frontend Dev / Magang / Diskusi kolaborasi"
                    className={inputCls}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase block mb-1.5">
                    Pesan
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Ceritakan tentang posisi, perusahaan, atau hal yang ingin Anda diskusikan..."
                    className={`${inputCls} resize-none`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                {error && (
                  <p className="font-sans text-xs text-red-400">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full font-mono text-sm font-semibold py-3.5 rounded-sm transition-opacity hover:opacity-85 active:scale-[0.99] disabled:opacity-50"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  {sending ? "Mengirim..." : "Kirim Pesan →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
