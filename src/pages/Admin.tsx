import React, { useRef, useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import type { Project, BlogPost } from "../data";

interface AdminProps { onBack: () => void; }

type AdminTab = "dashboard" | "hero" | "projects" | "blog" | "contact" | "skills" | "chatbot";

// ─── Shared primitives ────────────────────────────────────────────────────────

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0"
      style={{ background: value ? "var(--primary)" : "var(--muted)" }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200"
        style={{
          background: value ? "var(--primary-foreground)" : "var(--muted-foreground)",
          left: value ? "calc(100% - 18px)" : "2px",
        }}
      />
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    published: { bg: "rgba(52,211,153,0.15)",  color: "#34d399",        label: "Published" },
    draft:     { bg: "rgba(251,146,60,0.15)",   color: "#fb923c",        label: "Draft" },
    new:       { bg: "rgba(200,241,53,0.15)",   color: "var(--primary)", label: "Baru" },
    read:      { bg: "rgba(129,140,248,0.15)",  color: "#818cf8",        label: "Dibaca" },
    replied:   { bg: "rgba(52,211,153,0.15)",   color: "#34d399",        label: "Dibalas" },
  };
  const s = map[status] || { bg: "var(--muted)", color: "var(--muted-foreground)", label: status };
  return (
    <span className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-sm" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-mono font-bold text-2xl text-foreground">{title}</h1>
      {subtitle && <p className="font-sans text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{label}</label>
        {hint && <span className="font-sans text-[10px] text-muted-foreground italic">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-muted font-sans text-sm text-foreground px-4 py-2.5 rounded-sm border border-transparent focus:border-primary outline-none transition-all";
const textareaCls = `${inputCls} resize-none`;

function TagInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [val, setVal] = useState("");
  const add = () => { const t = val.trim(); if (t && !tags.includes(t)) onChange([...tags, t]); setVal(""); };
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((t) => (
          <span key={t} className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: "var(--muted)", color: "var(--foreground)" }}>
            {t}
            <button onClick={() => onChange(tags.filter((x) => x !== t))} className="text-muted-foreground hover:text-red-400 ml-0.5">✕</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" className={inputCls} placeholder="Ketik tag lalu Enter…" value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} />
        <button onClick={add} className="font-mono text-xs px-3 rounded-sm border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>+</button>
      </div>
    </div>
  );
}

// ─── Upload components ────────────────────────────────────────────────────────

function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input
        ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange(URL.createObjectURL(f)); e.target.value = ""; }}
      />
      {value ? (
        <div className="relative rounded-sm overflow-hidden bg-muted group cursor-pointer" style={{ height: "160px" }} onClick={() => ref.current?.click()}>
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-mono text-xs text-white">↑ Ganti Gambar</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => ref.current?.click()}
          className="w-full rounded-sm border-2 border-dashed flex flex-col items-center justify-center gap-2 py-8 transition-colors"
          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          <span className="font-mono text-2xl" style={{ color: "var(--primary)" }}>↑</span>
          <span className="font-mono text-xs">Pilih Gambar</span>
          <span className="font-sans text-[10px]">JPG, PNG, WebP · maks. 5 MB</span>
        </button>
      )}
    </div>
  );
}

function GalleryUpload({ urls, onChange }: { urls: string[]; onChange: (urls: string[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input
        ref={ref} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          const newUrls = files.map((f) => URL.createObjectURL(f));
          onChange([...urls, ...newUrls].slice(0, 4));
          e.target.value = "";
        }}
      />
      <div className="grid grid-cols-4 gap-2 mb-2">
        {urls.map((url, i) => (
          <div key={i} className="relative rounded-sm overflow-hidden bg-muted" style={{ height: "72px" }}>
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => onChange(urls.filter((_, j) => j !== i))}
              className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] text-white"
              style={{ background: "rgba(0,0,0,0.7)" }}
            >✕</button>
          </div>
        ))}
        {urls.length < 4 && (
          <button
            onClick={() => ref.current?.click()}
            className="h-[72px] rounded-sm border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <span className="font-mono text-base">+</span>
            <span className="font-mono text-[9px]">Tambah</span>
          </button>
        )}
      </div>
      <p className="font-sans text-[10px] text-muted-foreground">{urls.length}/4 gambar · Klik ✕ untuk hapus</p>
    </div>
  );
}

function FileUpload({
  fileName, onChange, accept = ".pdf", hint = "PDF · maks. 10 MB",
}: { fileName: string; onChange: (url: string, name: string) => void; accept?: string; hint?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input
        ref={ref} type="file" accept={accept} className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange(URL.createObjectURL(f), f.name); e.target.value = ""; }}
      />
      {fileName ? (
        <div
          className="flex items-center gap-3 p-3 rounded-sm border"
          style={{ background: "rgba(200,241,53,0.04)", borderColor: "rgba(200,241,53,0.2)" }}
        >
          <span className="font-mono text-xl" style={{ color: "var(--primary)" }}>⬡</span>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-foreground truncate">{fileName}</p>
            <p className="font-sans text-[10px] text-muted-foreground">Terupload · siap didownload</p>
          </div>
          <button onClick={() => ref.current?.click()} className="font-mono text-[10px] px-3 py-1.5 rounded-sm border transition-colors" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            Ganti
          </button>
        </div>
      ) : (
        <button
          onClick={() => ref.current?.click()}
          className="w-full rounded-sm border-2 border-dashed flex items-center justify-center gap-4 py-6 transition-colors"
          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          <span className="font-mono text-2xl" style={{ color: "var(--primary)" }}>↑</span>
          <div className="text-left">
            <p className="font-mono text-xs text-foreground">Upload CV</p>
            <p className="font-sans text-[10px]">{hint}</p>
          </div>
        </button>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({ title, size = "md", children, onClose }: {
  title: string; size?: "md" | "lg" | "xl"; children: React.ReactNode; onClose: () => void;
}) {
  const widths = { md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-3xl" };
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${widths[size]} rounded-sm border overflow-hidden`}
        style={{ background: "var(--card)", borderColor: "var(--border)", maxHeight: "92vh", display: "flex", flexDirection: "column" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-mono font-semibold text-sm text-foreground">{title}</h3>
          <button onClick={onClose} className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">✕</button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function DeleteModal({ label, onConfirm, onClose }: { label: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <Modal title="Konfirmasi Hapus" onClose={onClose}>
      <p className="font-sans text-sm text-muted-foreground mb-6">
        Yakin ingin menghapus <strong className="text-foreground">{label}</strong>? Tindakan ini tidak dapat dibatalkan.
      </p>
      <div className="flex gap-3">
        <button onClick={onConfirm} className="font-mono text-sm font-semibold px-5 py-2.5 rounded-sm bg-red-500 text-white hover:bg-red-600 transition-colors">Hapus</button>
        <button onClick={onClose} className="font-mono text-sm px-5 py-2.5 rounded-sm border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>Batal</button>
      </div>
    </Modal>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

const monthlyVisitors = [
  { month: "Mar", value: 480 }, { month: "Apr", value: 620 }, { month: "Mei", value: 540 },
  { month: "Jun", value: 790 }, { month: "Jul", value: 870 }, { month: "Agu", value: 1120 },
  { month: "Sep", value: 980 },
];
const maxVisitors = Math.max(...monthlyVisitors.map((m) => m.value));

function Dashboard() {
  const { projects, blogPosts, messages, kbItems, seedDatabase } = useData();
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [seedError, setSeedError] = useState("");

  const unreadCount = messages.filter((m) => m.status === "new").length;

  const handleSeed = async () => {
    setSeeding(true);
    setSeedError("");
    try {
      await seedDatabase();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 5000);
    } catch (e: unknown) {
      const err = e as Error;
      setSeedError(err?.message || "Gagal seed data ke Supabase. Pastikan tabel di SQL Editor sudah dibuat.");
    } finally {
      setSeeding(false);
    }
  };

  const stats = [
    { label: "Total Proyek", value: String(projects.length), change: `${projects.filter((p) => p.featured).length} unggulan`, icon: "⬡" },
    { label: "Blog Posts", value: String(blogPosts.length), change: "Published", icon: "◧" },
    { label: "Pesan Masuk", value: String(messages.length), change: `${unreadCount} belum dibaca`, icon: "◉" },
    { label: "Chatbot KB", value: String(kbItems.length), change: "Tersinkron", icon: "◈" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <SectionHeader title="Dashboard" subtitle="Overview performa & status integrasi Supabase" />
      </div>

      {/* Supabase Connection Banner */}
      <div
        className="p-5 rounded-sm border mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ background: "rgba(200,241,53,0.03)", borderColor: "rgba(200,241,53,0.2)" }}
      >
        <div className="flex items-start gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] mt-1 shrink-0 animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs font-semibold text-foreground">Supabase Backend Terhubung</p>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-sm bg-[#34d399]/15 text-[#34d399]">ONLINE</span>
            </div>
            <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
              Project: <span className="text-foreground">onrdaiuksydndotdetew.supabase.co</span>
            </p>
            {seedSuccess && (
              <p className="font-mono text-xs text-[#34d399] mt-2">
                ✓ Berhasil menyinkronkan data default ke Supabase!
              </p>
            )}
            {seedError && (
              <p className="font-mono text-xs text-red-400 mt-2">
                ✕ {seedError} (Jalankan <span className="underline">supabase_schema.sql</span> di SQL Editor Supabase terlebih dahulu).
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="font-mono text-xs font-semibold px-4 py-2.5 rounded-sm shrink-0 border transition-all hover:opacity-85 active:scale-[0.99] disabled:opacity-50"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            borderColor: "var(--primary)",
          }}
        >
          {seeding ? "Menyinkronkan..." : "⚡ Seed Database Supabase"}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{s.label}</span>
              <span className="font-mono text-base" style={{ color: "var(--primary)" }}>{s.icon}</span>
            </div>
            <p className="font-mono font-bold text-3xl" style={{ color: "var(--foreground)" }}>{s.value}</p>
            <p className="font-sans text-[11px] text-muted-foreground mt-1">{s.change}</p>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-sm border mb-8" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-mono font-semibold text-sm text-foreground">Pengunjung Bulanan</h2>
          <span className="font-mono text-xs text-muted-foreground">Mar — Sep 2026</span>
        </div>
        <div className="flex items-end gap-3 h-36">
          {monthlyVisitors.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="font-mono text-[9px] text-muted-foreground">{m.value}</span>
              <div className="w-full rounded-sm" style={{ height: `${(m.value / maxVisitors) * 100}%`, background: m.month === "Agu" ? "var(--primary)" : "rgba(200,241,53,0.25)" }} />
              <span className="font-mono text-[9px] text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="font-mono font-semibold text-sm text-foreground mb-4">Proyek Terpopuler</h2>
          <div className="space-y-3">
            {[{ name: "StudyMate AI", views: 342, pct: 100 }, { name: "BelajarID", views: 278, pct: 81 }, { name: "EcoTrack", views: 195, pct: 57 }, { name: "HIMA System", views: 143, pct: 42 }].map((p) => (
              <div key={p.name}>
                <div className="flex justify-between mb-1">
                  <span className="font-mono text-xs text-foreground">{p.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{p.views} views</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: "var(--primary)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="font-mono font-semibold text-sm text-foreground mb-4">Aktivitas Terkini</h2>
          <div className="space-y-3">
            {[
              { action: "Pesan baru dari Rina Setiawan", time: "2 jam lalu", icon: "◉" },
              { action: "Chatbot: 'tech stack apa yang dikuasai?'", time: "5 jam lalu", icon: "◈" },
              { action: "Case study dibuka: StudyMate AI", time: "1 hari lalu", icon: "⬡" },
              { action: "Blog dibaca: Cold-Start Problem", time: "1 hari lalu", icon: "◧" },
              { action: "Portfolio dikunjungi (Malang)", time: "2 hari lalu", icon: "◎" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-mono text-xs shrink-0" style={{ color: "var(--primary)" }}>{a.icon}</span>
                <p className="font-sans text-xs text-foreground flex-1 truncate">{a.action}</p>
                <span className="font-mono text-[10px] text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero (Singleton) ─────────────────────────────────────────────────────────

interface HeroData {
  name: string;
  tagline: string;
  roles: string[];
  stats: { value: string; label: string }[];
  cvLink: string;
  cvFileName: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTertiary: string;
  status: string;
}

const defaultHero: HeroData = {
  name: "Arya Yusufa Agnil Fikri",
  tagline: "Lulusan D3 Teknik Informatika Polines (IPK 3.84). Membangun antarmuka web modern dengan fokus pada performa, aksesibilitas, dan arsitektur kode yang bersih.",
  roles: ["Fresh Graduate Developer", "React & Next.js Enthusiast", "Problem Solver", "Open to Work"],
  stats: [
    { value: "3.84", label: "IPK Cum Laude" },
    { value: "D3", label: "Teknik Informatika" },
    { value: "Polines", label: "Semarang" },
    { value: "10+", label: "Proyek Selesai" },
    { value: "3", label: "Sertifikasi" },
  ],
  cvLink: "#",
  cvFileName: "",
  ctaPrimary: "Lihat Proyek ↓",
  ctaSecondary: "Download CV ↗",
  ctaTertiary: "Let's Talk →",
  status: "Tersedia untuk Magang & Full-time",
};

function HeroCRUD() {
  const { developerInfo, updateDeveloperInfo } = useData();
  const [data, setData] = useState<HeroData>(() => ({
    name: developerInfo.name || defaultHero.name,
    tagline: developerInfo.tagline || defaultHero.tagline,
    roles: developerInfo.roles && developerInfo.roles.length > 0 ? developerInfo.roles : defaultHero.roles,
    stats: developerInfo.stats && developerInfo.stats.length > 0 ? developerInfo.stats : defaultHero.stats,
    cvLink: developerInfo.cvUrl || "#",
    cvFileName: developerInfo.cvFilename || "",
    ctaPrimary: "Lihat Proyek ↓",
    ctaSecondary: "Download CV ↗",
    ctaTertiary: "Let's Talk →",
    status: developerInfo.currentStatus || defaultHero.status,
  }));
  const [saved, setSaved] = useState<HeroData>(data);
  const [saving, setSaving] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [preview, setPreview] = useState(false);
  const [saveMsg, setSaveMsg] = useState(false);

  useEffect(() => {
    const updated = {
      name: developerInfo.name || defaultHero.name,
      tagline: developerInfo.tagline || defaultHero.tagline,
      roles: developerInfo.roles && developerInfo.roles.length > 0 ? developerInfo.roles : defaultHero.roles,
      stats: developerInfo.stats && developerInfo.stats.length > 0 ? developerInfo.stats : defaultHero.stats,
      cvLink: developerInfo.cvUrl || "#",
      cvFileName: developerInfo.cvFilename || "",
      ctaPrimary: "Lihat Proyek ↓",
      ctaSecondary: "Download CV ↗",
      ctaTertiary: "Let's Talk →",
      status: developerInfo.currentStatus || defaultHero.status,
    };
    setData(updated);
    setSaved(updated);
  }, [developerInfo]);

  const dirty = JSON.stringify(data) !== JSON.stringify(saved);
  const save = async () => {
    setSaving(true);
    try {
      await updateDeveloperInfo({
        name: data.name,
        tagline: data.tagline,
        currentStatus: data.status,
        roles: data.roles,
        stats: data.stats,
        cvUrl: data.cvLink,
        cvFilename: data.cvFileName,
      });
      setSaved(data);
      setSaveMsg(true);
      setTimeout(() => setSaveMsg(false), 3000);
    } catch (e) {
      console.error("[HeroCRUD] Gagal update developer info:", e);
    } finally {
      setSaving(false);
    }
  };
  const cancel = () => setData(saved);

  const addRole = () => { if (newRole.trim()) { setData((d) => ({ ...d, roles: [...d.roles, newRole.trim()] })); setNewRole(""); } };
  const removeRole = (i: number) => setData((d) => ({ ...d, roles: d.roles.filter((_, j) => j !== i) }));
  const addStat = () => setData((d) => ({ ...d, stats: [...d.stats, { value: "", label: "" }] }));
  const removeStat = (i: number) => setData((d) => ({ ...d, stats: d.stats.filter((_, j) => j !== i) }));
  const updateStat = (i: number, field: "value" | "label", val: string) =>
    setData((d) => { const stats = [...d.stats]; stats[i] = { ...stats[i], [field]: val }; return { ...d, stats }; });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <SectionHeader title="Hero Section" subtitle="Singleton — perubahan langsung tersimpan ke Supabase & tampil di halaman utama" />
        <button onClick={() => setPreview(true)} className="font-mono text-xs px-4 py-2 rounded-sm border shrink-0 transition-colors" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          Preview ↗
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Kolom Kiri: Identitas, CTA & File CV */}
        <div className="space-y-6">
          {/* Identitas */}
          <div className="p-6 rounded-sm border space-y-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase font-semibold">Identitas Profil</p>
            <FormField label="Nama Lengkap">
              <input type="text" className={inputCls} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            </FormField>
            <FormField label="Tagline / Subheadline">
              <textarea rows={3} className={textareaCls} value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />
            </FormField>
            <FormField label="Status Ketersediaan">
              <input type="text" className={inputCls} value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })} />
            </FormField>
          </div>

          {/* CTA */}
          <div className="p-6 rounded-sm border space-y-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase font-semibold">Teks Tombol CTA</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["ctaPrimary", "ctaSecondary", "ctaTertiary"] as const).map((k, i) => (
                <FormField key={k} label={`CTA ${i + 1}`}>
                  <input type="text" className={inputCls} value={data[k]} onChange={(e) => setData({ ...data, [k]: e.target.value })} />
                </FormField>
              ))}
            </div>
          </div>

          {/* CV Upload */}
          <div className="p-6 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase font-semibold mb-4">File CV (PDF)</p>
            <FileUpload
              fileName={data.cvFileName}
              onChange={(url, name) => setData({ ...data, cvLink: url, cvFileName: name })}
              hint="PDF · maks. 10 MB · akan menjadi link download di portfolio"
            />
            {data.cvFileName && (
              <button
                onClick={() => setData({ ...data, cvLink: "#", cvFileName: "" })}
                className="font-mono text-[10px] text-red-500 hover:text-red-400 mt-2 transition-colors"
              >
                ✕ Hapus file CV
              </button>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Kata Rotasi & Statistik */}
        <div className="space-y-6">
          {/* Kata Rotasi */}
          <div className="p-6 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase font-semibold">Kata Rotasi (Typewriter)</p>
              <span className="font-mono text-[10px] text-muted-foreground">{data.roles.length} variasi</span>
            </div>
            <div className="space-y-2 mb-3">
              {data.roles.map((role, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground w-5 text-right">{i + 1}.</span>
                  <input type="text" className={`${inputCls} flex-1`} value={role}
                    onChange={(e) => { const r = [...data.roles]; r[i] = e.target.value; setData({ ...data, roles: r }); }}
                  />
                  <button onClick={() => removeRole(i)} className="font-mono text-xs text-red-500 hover:text-red-400 w-6">✕</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" className={`${inputCls} flex-1`} placeholder="Tambah kata baru…" value={newRole} onChange={(e) => setNewRole(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addRole()} />
              <button onClick={addRole} className="font-mono text-xs px-4 rounded-sm border transition-colors hover:border-primary" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>+ Tambah</button>
            </div>
          </div>

          {/* Statistik */}
          <div className="p-6 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase font-semibold">Statistik Singkat</p>
              <button onClick={addStat} className="font-mono text-[10px] px-3 py-1.5 rounded-sm border hover:border-primary transition-colors" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>+ Tambah Stat</button>
            </div>
            <div className="space-y-2.5">
              {data.stats.map((stat, i) => (
                <div key={i} className="flex gap-2.5 items-center">
                  <input type="text" placeholder="Nilai (mis. 3.84)" className={`${inputCls} w-36 font-mono text-sm`} value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} />
                  <input type="text" placeholder="Label (mis. IPK Cum Laude)" className={`${inputCls} flex-1`} value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
                  <button onClick={() => removeStat(i)} className="font-mono text-xs text-red-500 hover:text-red-400 w-6">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Mini Preview Card */}
          <div className="p-6 rounded-sm border" style={{ background: "rgba(200,241,53,0.02)", borderColor: "rgba(200,241,53,0.15)" }}>
            <p className="font-mono text-[10px] tracking-widest text-primary uppercase font-semibold mb-3">Live Preview Ringkas</p>
            <div className="p-4 rounded-sm" style={{ background: "var(--card)" }}>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-primary/10 text-primary mb-2 inline-block">
                ● {data.status}
              </span>
              <h4 className="font-mono font-bold text-lg text-foreground mb-1">{data.name}</h4>
              <p className="font-mono text-xs text-primary mb-2">
                {data.roles[0] || "Developer"} <span className="animate-pulse">|</span>
              </p>
              <p className="font-sans text-xs text-muted-foreground line-clamp-2 mb-3">{data.tagline}</p>
              <div className="flex flex-wrap gap-3">
                {data.stats.map((s, idx) => (
                  <div key={idx} className="text-left">
                    <span className="font-mono font-bold text-xs text-primary">{s.value} </span>
                    <span className="font-mono text-[10px] text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Bar Full Width */}
      <div className="p-5 rounded-sm border flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button onClick={save} disabled={!dirty || saving} className="font-mono text-sm font-semibold px-6 py-2.5 rounded-sm transition-opacity hover:opacity-85 w-full sm:w-auto" style={{ background: "var(--primary)", color: "var(--primary-foreground)", opacity: (dirty && !saving) ? 1 : 0.4 }}>
            {saving ? "Menyimpan ke Supabase..." : "Simpan Perubahan"}
          </button>
          <button onClick={cancel} disabled={saving} className="font-mono text-sm px-5 py-2.5 rounded-sm border transition-colors w-full sm:w-auto" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>Batal</button>
        </div>
        <div>
          {saveMsg && <span className="font-mono text-xs text-primary font-semibold">✓ Tersimpan di Supabase</span>}
          {dirty && !saveMsg && <span className="font-mono text-xs text-muted-foreground italic">Ada perubahan belum disimpan</span>}
        </div>
      </div>

      {preview && (
        <Modal title="Preview Hero Section" size="lg" onClose={() => setPreview(false)}>
          <div className="rounded-sm p-8 text-center" style={{ background: "var(--background)" }}>
            <div className="flex flex-wrap justify-center gap-5 mb-6">
              {data.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-mono font-bold text-xl" style={{ color: "var(--primary)" }}>{s.value}</p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
            <h1 className="font-mono font-bold text-4xl text-foreground mb-2">{data.name}</h1>
            <div className="font-mono text-lg mb-3" style={{ color: "var(--primary)" }}>{data.roles[0]} <span className="animate-pulse">|</span></div>
            <p className="font-sans text-sm text-muted-foreground mb-6 max-w-md mx-auto">{data.tagline}</p>
            {data.cvFileName && <p className="font-mono text-[11px] mb-4" style={{ color: "var(--primary)" }}>CV: {data.cvFileName}</p>}
            <div className="flex flex-wrap gap-2 justify-center">
              {[data.ctaPrimary, data.ctaSecondary, data.ctaTertiary].map((cta, i) => (
                <span key={i} className="font-mono text-xs px-4 py-2 rounded-sm" style={i === 0 ? { background: "var(--primary)", color: "var(--primary-foreground)" } : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
                  {cta}
                </span>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Projects CRUD ────────────────────────────────────────────────────────────

interface AdminProject {
  id: string; title: string; description: string; type: string; typeLabel: string;
  role: string; team: string; duration: string; year: string; impact: string;
  tags: string[]; imageUrl: string; gallery: string[];
  challenge: string; solution: string; technicalDecisions: string; outcome: string; learnings: string;
  githubUrl: string; liveUrl: string; featured: boolean; status: "published" | "draft";
}

const PROJECT_TYPES = [
  { value: "thesis", label: "Tugas Akhir" },
  { value: "hackathon", label: "Hackathon" },
  { value: "personal", label: "Proyek Personal" },
  { value: "internship", label: "Proyek Organisasi" },
  { value: "course", label: "Kursus / Bootcamp" },
];

function ProjectForm({ initial, onSave, onClose }: { initial: AdminProject; onSave: (p: AdminProject) => void; onClose: () => void }) {
  const [form, setForm] = useState<AdminProject>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const u = (k: keyof AdminProject, v: AdminProject[keyof AdminProject]) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Wajib diisi";
    if (!form.description.trim()) e.description = "Wajib diisi";
    if (!form.challenge.trim()) e.challenge = "Wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const inp = (field: keyof AdminProject, placeholder = "") => (
    <input type="text" className={`${inputCls}${errors[field as string] ? " border-red-500" : ""}`} value={form[field] as string} placeholder={placeholder} onChange={(e) => u(field, e.target.value)} />
  );
  const ta = (field: keyof AdminProject, rows = 3) => (
    <textarea rows={rows} className={`${textareaCls}${errors[field as string] ? " border-red-500" : ""}`} value={form[field] as string} onChange={(e) => u(field, e.target.value)} />
  );

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Info Dasar</p>
        <div className="space-y-3">
          <FormField label="Judul *">{errors.title && <p className="text-red-400 text-[10px] mb-1">{errors.title}</p>}{inp("title", "Nama proyek…")}</FormField>
          <FormField label="Deskripsi Singkat *">{errors.description && <p className="text-red-400 text-[10px] mb-1">{errors.description}</p>}{ta("description", 2)}</FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Jenis Proyek">
              <select className={inputCls} value={form.type} onChange={(e) => { const t = PROJECT_TYPES.find((x) => x.value === e.target.value); u("type", e.target.value); if (t) u("typeLabel", t.label); }}>
                {PROJECT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </FormField>
            <FormField label="Tahun">{inp("year", "2025")}</FormField>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <FormField label="Role">{inp("role", "Frontend Dev")}</FormField>
            <FormField label="Durasi">{inp("duration", "3 bulan")}</FormField>
            <FormField label="Tim">{inp("team", "Solo / Tim 3")}</FormField>
          </div>
          <FormField label="Dampak / Impact">{inp("impact", "Mis. 800+ pengguna")}</FormField>
        </div>
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Cover Image</p>
        <ImageUpload value={form.imageUrl} onChange={(url) => u("imageUrl", url)} />
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Galeri Screenshot <span className="normal-case font-sans text-[10px] ml-1">(maks. 4 gambar)</span></p>
        <GalleryUpload urls={form.gallery} onChange={(urls) => u("gallery", urls)} />
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Link</p>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Demo Live">{inp("liveUrl", "https://…")}</FormField>
          <FormField label="GitHub">{inp("githubUrl", "https://github.com/…")}</FormField>
        </div>
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Tech Stack</p>
        <TagInput tags={form.tags} onChange={(tags) => u("tags", tags)} />
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Cerita Proyek (Case Study)</p>
        <div className="space-y-3">
          <FormField label="01 — Latar Belakang Masalah *">{errors.challenge && <p className="text-red-400 text-[10px] mb-1">{errors.challenge}</p>}{ta("challenge", 3)}</FormField>
          <FormField label="02 — Pendekatan & Solusi">{ta("solution", 3)}</FormField>
          <FormField label="03 — Keputusan Teknis Penting">{ta("technicalDecisions", 3)}</FormField>
          <FormField label="04 — Hasil & Dampak">{ta("outcome", 3)}</FormField>
          <FormField label="05 — Yang Dipelajari">{ta("learnings", 3)}</FormField>
        </div>
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-4">Pengaturan Tampil</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-xs text-foreground">Tampil sebagai Unggulan</p><p className="font-sans text-[11px] text-muted-foreground">Muncul di bagian atas daftar proyek</p></div>
            <Toggle value={form.featured} onChange={(v) => u("featured", v)} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-xs text-foreground">Status Publikasi</p><p className="font-sans text-[11px] text-muted-foreground">{form.status === "published" ? "Published — terlihat publik" : "Draft — hanya terlihat di admin"}</p></div>
            <Toggle value={form.status === "published"} onChange={(v) => u("status", v ? "published" : "draft")} />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => { if (validate()) { onSave(form); onClose(); } }} className="font-mono text-sm font-semibold px-5 py-2.5 rounded-sm hover:opacity-85 transition-opacity" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>Simpan</button>
        <button onClick={onClose} className="font-mono text-sm px-5 py-2.5 rounded-sm border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>Batal</button>
      </div>
    </div>
  );
}

function ProjectsCRUD() {
  const { projects: contextProjects, addProject, updateProject, deleteProject } = useData();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const items: AdminProject[] = contextProjects.map((p) => ({
    ...p,
    tags: [...p.tags],
    gallery: [...p.gallery],
    githubUrl: p.githubUrl || "",
    liveUrl: p.liveUrl || "",
    status: "published" as const,
  }));

  const blank: AdminProject = {
    id: "",
    title: "",
    description: "",
    type: "personal",
    typeLabel: "Proyek Personal",
    role: "",
    team: "",
    duration: "",
    year: "2026",
    impact: "",
    tags: [],
    imageUrl: "",
    gallery: [],
    challenge: "",
    solution: "",
    technicalDecisions: "",
    outcome: "",
    learnings: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    status: "published",
  };

  const save = async (p: AdminProject) => {
    const isExisting = contextProjects.some((x) => x.id === p.id);
    const payload: Project = {
      id: p.id,
      title: p.title,
      description: p.description,
      longDescription: p.description,
      tags: p.tags,
      year: p.year,
      role: p.role,
      team: p.team,
      type: p.type as Project["type"],
      typeLabel: p.typeLabel,
      duration: p.duration,
      impact: p.impact,
      imageUrl: p.imageUrl,
      gallery: p.gallery,
      githubUrl: p.githubUrl || undefined,
      liveUrl: p.liveUrl || undefined,
      challenge: p.challenge,
      solution: p.solution,
      technicalDecisions: p.technicalDecisions,
      outcome: p.outcome,
      learnings: p.learnings,
      featured: p.featured,
    };
    if (isExisting) {
      await updateProject(payload);
    } else {
      const { id: _, ...withoutId } = payload;
      await addProject(withoutId);
    }
  };

  const remove = async (id: string) => {
    await deleteProject(id);
    setDeleteId(null);
  };

  const toggleFeatured = async (item: AdminProject, feat: boolean) => {
    const found = contextProjects.find((x) => x.id === item.id);
    if (found) {
      await updateProject({ ...found, featured: feat });
    }
  };

  const filtered = filter === "all" ? items : items.filter((p) => p.status === filter);
  const deleted = items.find((p) => p.id === deleteId);

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <SectionHeader title="Proyek" subtitle={`${items.length} total · ${items.filter((p) => p.status === "published").length} published`} />
        <button onClick={() => { setEditing(blank); setFormOpen(true); }} className="font-mono text-xs font-semibold px-4 py-2 rounded-sm shrink-0 hover:opacity-85 transition-opacity" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
          + Tambah Proyek
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        {(["all", "published", "draft"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-all" style={{ borderColor: filter === f ? "var(--primary)" : "var(--border)", color: filter === f ? "var(--primary)" : "var(--muted-foreground)" }}>
            {f === "all" ? "Semua" : f === "published" ? "Published" : "Draft"}
          </button>
        ))}
      </div>
      <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
              {["Proyek", "Jenis", "Featured", "Status", "Aksi"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 0 ? "var(--card)" : "var(--secondary)", borderBottom: "1px solid var(--border)" }}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    {item.imageUrl && <div className="w-10 h-7 rounded-sm overflow-hidden bg-muted shrink-0"><img src={item.imageUrl} alt="" className="w-full h-full object-cover" /></div>}
                    <div>
                      <p className="font-mono text-xs font-semibold text-foreground">{item.title || <span className="text-muted-foreground italic">Tanpa judul</span>}</p>
                      <p className="font-sans text-[11px] text-muted-foreground">{item.year}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-sans text-xs text-muted-foreground">{item.typeLabel}</td>
                <td className="px-4 py-3.5">
                  <Toggle value={item.featured} onChange={(v) => toggleFeatured(item, v)} />
                </td>
                <td className="px-4 py-3.5"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-3">
                    <button onClick={() => { setEditing(item); setFormOpen(true); }} className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                    <button onClick={() => setDeleteId(item.id)} className="font-mono text-[10px] text-red-500 hover:text-red-400 transition-colors">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center font-sans text-sm text-muted-foreground" style={{ background: "var(--card)" }}>Tidak ada proyek</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {formOpen && editing && (
        <Modal title={editing.title ? `Edit: ${editing.title}` : "Proyek Baru"} size="xl" onClose={() => { setFormOpen(false); setEditing(null); }}>
          <ProjectForm initial={editing} onSave={save} onClose={() => { setFormOpen(false); setEditing(null); }} />
        </Modal>
      )}
      {deleteId && deleted && (
        <DeleteModal label={deleted.title} onConfirm={() => remove(deleteId)} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}

// ─── Blog CRUD ────────────────────────────────────────────────────────────────

interface AdminBlogPost {
  id: string; title: string; slug: string; excerpt: string;
  date: string; readTime: string; tags: string[]; imageUrl: string;
  status: "published" | "draft"; pinned: boolean; scheduledDate: string;
}

const toSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 60);
const estimateReadTime = (text: string) => `${Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200))} mnt`;

function BlogForm({ initial, onSave, onClose }: { initial: AdminBlogPost; onSave: (p: AdminBlogPost) => void; onClose: () => void }) {
  const [form, setForm] = useState(initial);
  const [slugManual, setSlugManual] = useState(false);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const u = (k: keyof AdminBlogPost, v: AdminBlogPost[keyof AdminBlogPost]) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Wajib diisi";
    if (!form.excerpt.trim()) e.excerpt = "Wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Thumbnail</p>
        <ImageUpload value={form.imageUrl} onChange={(url) => u("imageUrl", url)} />
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Info Artikel</p>
        <div className="space-y-3">
          <FormField label="Judul *">{errors.title && <p className="text-red-400 text-[10px] mb-1">{errors.title}</p>}
            <input type="text" className={inputCls} value={form.title} onChange={(e) => { u("title", e.target.value); if (!slugManual) u("slug", toSlug(e.target.value)); }} placeholder="Judul artikel…" />
          </FormField>
          <FormField label="Slug URL" hint={slugManual ? "Manual" : "Auto dari judul"}>
            <div className="flex gap-2">
              <input type="text" className={`${inputCls} flex-1 font-mono text-xs`} value={form.slug} onChange={(e) => { setSlugManual(true); u("slug", e.target.value.toLowerCase().replace(/\s/g, "-")); }} />
              {slugManual && <button onClick={() => { setSlugManual(false); u("slug", toSlug(form.title)); }} className="font-mono text-[10px] px-2 rounded-sm border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>Reset</button>}
            </div>
          </FormField>
          <FormField label="Excerpt / Ringkasan *">{errors.excerpt && <p className="text-red-400 text-[10px] mb-1">{errors.excerpt}</p>}
            <textarea rows={2} className={textareaCls} value={form.excerpt} onChange={(e) => u("excerpt", e.target.value)} />
          </FormField>
        </div>
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Konten Artikel (Markdown)</p>
        <FormField label="Isi artikel" hint={`${form.readTime} estimasi baca`}>
          <textarea rows={10} className={`${textareaCls} font-mono text-xs`} value={content} onChange={(e) => { setContent(e.target.value); u("readTime", estimateReadTime(e.target.value)); }} placeholder={"# Judul\n\nParagraf pertama...\n\n```javascript\n// code block\n```\n\n> Quote penting"} />
        </FormField>
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">Tag & Tanggal</p>
        <div className="space-y-3">
          <FormField label="Tag"><TagInput tags={form.tags} onChange={(tags) => u("tags", tags)} /></FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Tanggal Terbit"><input type="text" className={inputCls} value={form.date} onChange={(e) => u("date", e.target.value)} placeholder="10 Sep 2026" /></FormField>
            <FormField label="Estimasi Baca" hint="Auto dari konten"><input type="text" className={`${inputCls} text-muted-foreground`} value={form.readTime} readOnly /></FormField>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-4">Pengaturan Publikasi</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-xs text-foreground">Status</p><p className="font-sans text-[11px] text-muted-foreground">{form.status === "published" ? "Published" : "Draft — hanya di admin"}</p></div>
            <Toggle value={form.status === "published"} onChange={(v) => u("status", v ? "published" : "draft")} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="font-mono text-xs text-foreground">Pin sebagai Unggulan</p><p className="font-sans text-[11px] text-muted-foreground">Tampil paling atas di halaman blog</p></div>
            <Toggle value={form.pinned} onChange={(v) => u("pinned", v)} />
          </div>
          <FormField label="Jadwal Publish (opsional)" hint="Kosongkan untuk publish sekarang">
            <input type="datetime-local" className={inputCls} value={form.scheduledDate} onChange={(e) => u("scheduledDate", e.target.value)} />
          </FormField>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => { if (validate()) { onSave(form); onClose(); } }} className="font-mono text-sm font-semibold px-5 py-2.5 rounded-sm hover:opacity-85 transition-opacity" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>Simpan</button>
        <button onClick={onClose} className="font-mono text-sm px-5 py-2.5 rounded-sm border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>Batal</button>
      </div>
    </div>
  );
}

function BlogCRUD() {
  const { blogPosts: contextBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminBlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  const items: AdminBlogPost[] = contextBlogPosts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.id,
    excerpt: p.excerpt,
    date: p.date,
    readTime: p.readTime,
    tags: [...p.tags],
    imageUrl: p.imageUrl,
    status: "published" as const,
    pinned: pinnedIds.includes(p.id),
    scheduledDate: "",
  }));

  const blank: AdminBlogPost = {
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    readTime: "1 mnt",
    tags: [],
    imageUrl: "",
    status: "published",
    pinned: false,
    scheduledDate: "",
  };

  const save = async (p: AdminBlogPost) => {
    const isExisting = contextBlogPosts.some((x) => x.id === p.id);
    const existingPost = contextBlogPosts.find((x) => x.id === p.id);
    const postPayload: BlogPost = {
      id: p.id || p.slug || `blog-${Date.now()}`,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      readTime: p.readTime,
      tags: p.tags,
      imageUrl: p.imageUrl,
      content: existingPost?.content || [
        { type: "p", content: p.excerpt },
      ],
      relatedIds: existingPost?.relatedIds || [],
    };
    if (isExisting) {
      await updateBlogPost(postPayload);
    } else {
      const { id: _, ...withoutId } = postPayload;
      await addBlogPost(withoutId);
    }
  };

  const remove = async (id: string) => {
    await deleteBlogPost(id);
    setDeleteId(null);
  };

  const deleted = items.find((p) => p.id === deleteId);

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <SectionHeader title="Blog Posts" subtitle={`${items.length} total · ${items.filter((p) => p.status === "published").length} published · ${items.filter((p) => p.pinned).length} pinned`} />
        <button onClick={() => { setEditing(blank); setFormOpen(true); }} className="font-mono text-xs font-semibold px-4 py-2 rounded-sm shrink-0 hover:opacity-85 transition-opacity" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
          + Tulis Artikel
        </button>
      </div>
      <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
              {["Artikel", "Tag", "Pinned", "Status", "Tanggal", "Aksi"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 0 ? "var(--card)" : "var(--secondary)", borderBottom: "1px solid var(--border)" }}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 rounded-sm overflow-hidden bg-muted shrink-0">
                      {item.imageUrl && <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="font-mono text-xs font-semibold text-foreground line-clamp-1">{item.title || <span className="text-muted-foreground italic">Tanpa judul</span>}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{item.readTime} baca</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((t) => <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>{t}</span>)}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Toggle value={item.pinned} onChange={(v) => setPinnedIds((prev) => v ? [...prev, item.id] : prev.filter((id) => id !== item.id))} />
                </td>
                <td className="px-4 py-3.5"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-3.5 font-mono text-[10px] text-muted-foreground whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-3">
                    <button onClick={() => { setEditing(item); setFormOpen(true); }} className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                    <button onClick={() => setDeleteId(item.id)} className="font-mono text-[10px] text-red-500 hover:text-red-400 transition-colors">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formOpen && editing && (
        <Modal title={editing.title ? `Edit: ${editing.title}` : "Artikel Baru"} size="xl" onClose={() => { setFormOpen(false); setEditing(null); }}>
          <BlogForm initial={editing} onSave={save} onClose={() => { setFormOpen(false); setEditing(null); }} />
        </Modal>
      )}
      {deleteId && deleted && (
        <DeleteModal label={deleted.title} onConfirm={() => remove(deleteId)} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}

// ─── Contact Inbox ────────────────────────────────────────────────────────────

interface ContactMessage {
  id: string; name: string; email: string; subject: string;
  message: string; date: string; status: "new" | "read" | "replied"; internalNote: string;
}

const defaultMessages: ContactMessage[] = [
  { id: "m1", name: "Rina Setiawan", email: "rina@startup.id", subject: "Kesempatan Magang Frontend", message: "Halo Arya, kami sedang cari intern React untuk Q4 2026. Apakah kamu tersedia untuk interview minggu ini? Kami di Jakarta tapi bisa remote.", date: "10 Sep 2026", status: "new", internalNote: "" },
  { id: "m2", name: "Budi Prakoso", email: "hr@techindonesia.com", subject: "Junior Dev Position — Full Time", message: "Kami tertarik dengan profil Anda di portfolio. Tim kami mencari junior frontend. Apakah bisa schedule call minggu ini?", date: "8 Sep 2026", status: "read", internalNote: "Cek dulu profil perusahaan sebelum balas" },
  { id: "m3", name: "Dewi Anggraini", email: "dewi@gdsc.id", subject: "Speaker GDSC Workshop", message: "Halo! Kami mau mengundang Arya sebagai speaker untuk workshop React.js bulan Oktober. Tertarik?", date: "5 Sep 2026", status: "replied", internalNote: "Sudah konfirmasi tanggal 15 Okt 2026" },
  { id: "m4", name: "Unknown", email: "promo@spam123.com", subject: "Buy followers now!", message: "Get 10000 followers for $5 only. Limited offer!", date: "3 Sep 2026", status: "read", internalNote: "" },
];

function ContactInbox() {
  const { messages: contextMessages, updateMessageStatus, deleteMessage, refreshMessages } = useData();
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">("all");
  const [open, setOpen] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [noteEdit, setNoteEdit] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);

  const msgs: ContactMessage[] = contextMessages.length > 0
    ? contextMessages.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject || "Pesan Kontak",
        message: m.message,
        date: new Date(m.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        status: m.status,
        internalNote: notes[m.id] || "",
      }))
    : defaultMessages;

  const filtered = filter === "all" ? msgs : msgs.filter((m) => m.status === filter);
  const openMsg = msgs.find((m) => m.id === open);
  const deletedMsg = msgs.find((m) => m.id === deleteId);
  const newCount = msgs.filter((m) => m.status === "new").length;

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshMessages();
    } finally {
      setRefreshing(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: ContactMessage["status"]) => {
    await updateMessageStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    await deleteMessage(id);
    setDeleteId(null);
  };

  const updateNote = (id: string, note: string) => {
    setNotes((prev) => ({ ...prev, [id]: note }));
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <SectionHeader title="Kotak Masuk" subtitle={`${msgs.length} pesan · ${newCount} belum dibaca`} />
        </div>
        <div className="flex items-center gap-3">
          {newCount > 0 && <span className="font-mono text-[10px] px-2 py-1 rounded-sm" style={{ background: "rgba(200,241,53,0.15)", color: "var(--primary)" }}>{newCount} baru</span>}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="font-mono text-xs px-3 py-1.5 rounded-sm border hover:border-primary transition-colors disabled:opacity-50"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            {refreshing ? "Memuat..." : "↻ Refresh"}
          </button>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {(["all", "new", "read", "replied"] as const).map((f) => {
          const count = f === "all" ? msgs.length : msgs.filter((m) => m.status === f).length;
          return (
            <button key={f} onClick={() => setFilter(f)} className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-all" style={{ borderColor: filter === f ? "var(--primary)" : "var(--border)", color: filter === f ? "var(--primary)" : "var(--muted-foreground)" }}>
              {f === "all" ? "Semua" : f === "new" ? "Baru" : f === "read" ? "Dibaca" : "Dibalas"} ({count})
            </button>
          );
        })}
      </div>
      <div className="rounded-sm border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
              {["Pengirim", "Perihal", "Tanggal", "Status", "Aksi"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((msg, i) => (
              <tr key={msg.id} style={{ background: i % 2 === 0 ? "var(--card)" : "var(--secondary)", borderBottom: "1px solid var(--border)", fontWeight: msg.status === "new" ? 600 : 400 }}>
                <td className="px-4 py-3.5"><p className="font-mono text-xs text-foreground">{msg.name}</p><p className="font-sans text-[11px] text-muted-foreground">{msg.email}</p></td>
                <td className="px-4 py-3.5 font-sans text-xs text-foreground max-w-[200px] line-clamp-1">{msg.subject}</td>
                <td className="px-4 py-3.5 font-mono text-[10px] text-muted-foreground whitespace-nowrap">{msg.date}</td>
                <td className="px-4 py-3.5"><StatusBadge status={msg.status} /></td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-3">
                    <button onClick={() => { setOpen(msg.id); setNoteEdit(msg.internalNote); if (msg.status === "new") handleUpdateStatus(msg.id, "read"); }} className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors">Buka</button>
                    <button onClick={() => setDeleteId(msg.id)} className="font-mono text-[10px] text-red-500 hover:text-red-400 transition-colors">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center font-sans text-sm text-muted-foreground" style={{ background: "var(--card)" }}>Tidak ada pesan</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {open && openMsg && (
        <Modal title={`Pesan dari ${openMsg.name}`} size="lg" onClose={() => setOpen(null)}>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-sm" style={{ background: "var(--secondary)" }}>
              {[["Dari", openMsg.name], ["Email", openMsg.email], ["Perihal", openMsg.subject], ["Tanggal", openMsg.date]].map(([k, v]) => (
                <div key={k}><p className="font-mono text-[10px] text-muted-foreground uppercase mb-0.5">{k}</p><p className="font-sans text-sm text-foreground">{v}</p></div>
              ))}
            </div>
            <div className="p-4 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-mono text-[10px] text-muted-foreground uppercase mb-2">Isi Pesan</p>
              <p className="font-sans text-sm text-foreground leading-relaxed">{openMsg.message}</p>
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase block mb-1.5">Catatan Internal</label>
              <textarea rows={2} className={textareaCls} value={noteEdit} onChange={(e) => setNoteEdit(e.target.value)} placeholder="Catatan pribadi (tidak terlihat pengirim)…" />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["new", "read", "replied"] as const).map((s) => (
                <button key={s} onClick={() => handleUpdateStatus(openMsg.id, s)} className="font-mono text-xs px-3 py-2 rounded-sm border transition-all" style={{ borderColor: openMsg.status === s ? "var(--primary)" : "var(--border)", color: openMsg.status === s ? "var(--primary)" : "var(--muted-foreground)" }}>
                  {s === "new" ? "Tandai Baru" : s === "read" ? "Tandai Dibaca" : "Tandai Dibalas"}
                </button>
              ))}
              <button onClick={() => { updateNote(openMsg.id, noteEdit); setOpen(null); }} className="font-mono text-xs font-semibold px-4 py-2 rounded-sm ml-auto hover:opacity-85 transition-opacity" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                Simpan Catatan
              </button>
            </div>
          </div>
        </Modal>
      )}
      {deleteId && deletedMsg && (
        <DeleteModal label={`pesan dari ${deletedMsg.name}`} onConfirm={() => handleDelete(deleteId)} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}

// ─── Skills CRUD ──────────────────────────────────────────────────────────────

type SkillCategory = "Frontend" | "Backend" | "Mobile" | "DevOps" | "Tools" | "Soft Skill";
const SKILL_CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Mobile", "DevOps", "Tools", "Soft Skill"];

interface AdminSkill { id: string; name: string; category: SkillCategory; level: number; }

const defaultSkills: AdminSkill[] = [
  { id: "s1",  name: "React",              category: "Frontend",   level: 85 },
  { id: "s2",  name: "Next.js",            category: "Frontend",   level: 80 },
  { id: "s3",  name: "TypeScript",         category: "Frontend",   level: 75 },
  { id: "s4",  name: "Tailwind CSS",       category: "Frontend",   level: 88 },
  { id: "s5",  name: "Node.js",            category: "Backend",    level: 72 },
  { id: "s6",  name: "Python",             category: "Backend",    level: 70 },
  { id: "s7",  name: "FastAPI",            category: "Backend",    level: 65 },
  { id: "s8",  name: "PostgreSQL",         category: "Backend",    level: 68 },
  { id: "s9",  name: "React Native",       category: "Mobile",     level: 60 },
  { id: "s10", name: "Expo",               category: "Mobile",     level: 58 },
  { id: "s11", name: "Docker",             category: "DevOps",     level: 55 },
  { id: "s12", name: "Vercel",             category: "DevOps",     level: 78 },
  { id: "s13", name: "Git",                category: "Tools",      level: 85 },
  { id: "s14", name: "OpenAI API",         category: "Tools",      level: 70 },
  { id: "s15", name: "Problem Solving",    category: "Soft Skill", level: 80 },
  { id: "s16", name: "Team Collaboration", category: "Soft Skill", level: 82 },
  { id: "s17", name: "Technical Writing",  category: "Soft Skill", level: 72 },
];

function SkillRow({ skill, onUpdate, onDelete }: { skill: AdminSkill; onUpdate: (s: AdminSkill) => void; onDelete: () => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(skill);
  if (editing) {
    return (
      <div className="p-3 rounded-sm border space-y-2" style={{ background: "var(--secondary)", borderColor: "var(--border)" }}>
        <div className="flex gap-2">
          <input type="text" className={`${inputCls} flex-1`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className={`${inputCls} w-36`} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as SkillCategory })}>
            {SKILL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input type="range" min={1} max={100} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} className="flex-1 accent-primary" />
          <span className="font-mono text-xs w-10 text-right" style={{ color: "var(--primary)" }}>{form.level}%</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { onUpdate(form); setEditing(false); }} className="font-mono text-[10px] font-semibold px-3 py-1.5 rounded-sm" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>Simpan</button>
          <button onClick={() => { setForm(skill); setEditing(false); }} className="font-mono text-[10px] px-3 py-1.5 rounded-sm border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>Batal</button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-sm hover:bg-muted transition-colors group">
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-foreground mb-1">{skill.name}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
            <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: "var(--primary)" }} />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground w-8 text-right">{skill.level}%</span>
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setEditing(true)} className="font-mono text-[10px] text-muted-foreground hover:text-foreground">Edit</button>
        <button onClick={onDelete} className="font-mono text-[10px] text-red-500 hover:text-red-400">Hapus</button>
      </div>
    </div>
  );
}

function SkillsCRUD() {
  const [skills, setSkills] = useState<AdminSkill[]>(defaultSkills);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [addForm, setAddForm] = useState<{ name: string; category: SkillCategory; level: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">("all");

  const grouped = SKILL_CATEGORIES.reduce<Record<string, AdminSkill[]>>((acc, cat) => { acc[cat] = skills.filter((s) => s.category === cat); return acc; }, {} as Record<string, AdminSkill[]>);
  const deleteTarget = skills.find((s) => s.id === deleteId);
  const addSkill = () => { if (!addForm || !addForm.name.trim()) return; setSkills((p) => [...p, { id: `s-${Date.now()}`, ...addForm }]); setAddForm(null); };
  const categoriesToShow = activeCategory === "all" ? SKILL_CATEGORIES : [activeCategory];

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <SectionHeader title="Skills" subtitle={`${skills.length} skill · ${SKILL_CATEGORIES.length} kategori`} />
        <button onClick={() => setAddForm({ name: "", category: "Frontend", level: 70 })} className="font-mono text-xs font-semibold px-4 py-2 rounded-sm shrink-0 hover:opacity-85 transition-opacity" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
          + Tambah Skill
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveCategory("all")} className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-all" style={{ borderColor: activeCategory === "all" ? "var(--primary)" : "var(--border)", color: activeCategory === "all" ? "var(--primary)" : "var(--muted-foreground)" }}>Semua ({skills.length})</button>
        {SKILL_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-all" style={{ borderColor: activeCategory === cat ? "var(--primary)" : "var(--border)", color: activeCategory === cat ? "var(--primary)" : "var(--muted-foreground)" }}>
            {cat} ({grouped[cat]?.length || 0})
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categoriesToShow.map((cat) => {
          const catSkills = grouped[cat] || [];
          return (
            <div key={cat} className="p-5 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{cat}</p>
                <span className="font-mono text-[10px] text-muted-foreground">{catSkills.length} skill</span>
              </div>
              {catSkills.length === 0 ? (
                <p className="font-sans text-xs text-muted-foreground italic py-2">Belum ada skill</p>
              ) : (
                <div className="space-y-1">
                  {catSkills.map((skill) => (
                    <SkillRow key={skill.id} skill={skill} onUpdate={(updated) => setSkills((p) => p.map((s) => s.id === updated.id ? updated : s))} onDelete={() => setDeleteId(skill.id)} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {addForm && (
        <Modal title="Tambah Skill Baru" onClose={() => setAddForm(null)}>
          <div className="space-y-4">
            <FormField label="Nama Skill"><input type="text" className={inputCls} value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} placeholder="Mis. Vue.js" autoFocus /></FormField>
            <FormField label="Kategori">
              <select className={inputCls} value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value as SkillCategory })}>
                {SKILL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label={`Level: ${addForm.level}%`}>
              <input type="range" min={1} max={100} value={addForm.level} onChange={(e) => setAddForm({ ...addForm, level: Number(e.target.value) })} className="w-full accent-primary" />
              <div className="flex justify-between mt-1"><span className="font-mono text-[10px] text-muted-foreground">Pemula (1)</span><span className="font-mono text-[10px] text-muted-foreground">Expert (100)</span></div>
            </FormField>
            <div className="flex gap-3">
              <button onClick={addSkill} className="font-mono text-sm font-semibold px-5 py-2.5 rounded-sm hover:opacity-85 transition-opacity" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>Tambah</button>
              <button onClick={() => setAddForm(null)} className="font-mono text-sm px-5 py-2.5 rounded-sm border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>Batal</button>
            </div>
          </div>
        </Modal>
      )}
      {deleteId && deleteTarget && (
        <DeleteModal label={deleteTarget.name} onConfirm={() => { setSkills((p) => p.filter((s) => s.id !== deleteId)); setDeleteId(null); }} onClose={() => setDeleteId(null)} />
      )}
    </div>
  );
}

// ─── Chatbot KB ───────────────────────────────────────────────────────────────

const defaultKb = [
  { id: "1", question: "Apa tech stack yang dikuasai?", answer: "React/Next.js/TypeScript untuk frontend, Node.js/Python/FastAPI untuk backend, PostgreSQL/MongoDB untuk database." },
  { id: "2", question: "Apakah tersedia untuk magang?", answer: "Ya, sedang aktif mencari magang atau posisi junior. Bisa mulai segera, fleksibel remote/on-site." },
  { id: "3", question: "Bagaimana cara menghubungi?", answer: "Isi form kontak atau email ke arya@agnilfikri.dev. Response dalam 24 jam." },
  { id: "4", question: "Berapa IPK dan universitas?", answer: "IPK 3.84/4.00 (Cum Laude), D3 Teknik Informatika Politeknik Negeri Semarang (Polines), lulus 2026." },
];

function ChatbotKB() {
  const { kbItems, addKbItem, deleteKbItem } = useData();
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");
  const [adding, setAdding] = useState(false);

  const items = kbItems.length > 0
    ? kbItems.map((k) => ({
        id: k.id,
        question: k.triggers.join(", "),
        answer: k.response,
        isFromDb: true,
      }))
    : defaultKb.map((k) => ({ ...k, isFromDb: false }));

  const add = async () => {
    if (!newQ.trim() || !newA.trim()) return;
    setAdding(true);
    try {
      const triggers = newQ.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
      await addKbItem({ triggers, response: newA });
      setNewQ("");
      setNewA("");
    } catch (e) {
      console.error("[addKbItem]", e);
    } finally {
      setAdding(false);
    }
  };

  const remove = async (id: string, isFromDb: boolean) => {
    if (isFromDb) {
      await deleteKbItem(id);
    }
  };

  return (
    <div>
      <SectionHeader title="Chatbot Knowledge Base" subtitle="Kelola respon & kata kunci trigger asisten AI di Supabase" />
      <div className="p-5 rounded-sm border mb-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-mono text-xs font-semibold text-foreground mb-4">Tambah Entri Baru ke Supabase</h3>
        <div className="space-y-3">
          <FormField label="Kata Kunci / Pertanyaan (pisahkan dengan koma)" hint="contoh: magang, internship, cari kerja">
            <input type="text" className={inputCls} placeholder="magang, internship, lowongan" value={newQ} onChange={(e) => setNewQ(e.target.value)} />
          </FormField>
          <FormField label="Respon Jawaban AI">
            <textarea rows={3} className={textareaCls} placeholder="Jawaban lengkap yang akan diberikan chatbot…" value={newA} onChange={(e) => setNewA(e.target.value)} />
          </FormField>
          <button
            onClick={add}
            disabled={adding || !newQ.trim() || !newA.trim()}
            className="font-mono text-xs font-semibold px-4 py-2 rounded-sm hover:opacity-85 transition-opacity disabled:opacity-50"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            {adding ? "Menyimpan..." : "+ Tambah ke Supabase"}
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-mono text-xs font-semibold text-foreground">Trigger: {item.question}</p>
                  {item.isFromDb && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm bg-[#34d399]/15 text-[#34d399]">
                      Supabase
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">Respon: {item.answer}</p>
              </div>
              {item.isFromDb && (
                <button
                  onClick={() => remove(item.id, item.isFromDb)}
                  className="font-mono text-[10px] text-red-500 hover:text-red-400 transition-colors shrink-0"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: AdminTab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard",  icon: "◎" },
  { id: "hero",      label: "Hero",        icon: "◑" },
  { id: "projects",  label: "Proyek",      icon: "⬡" },
  { id: "blog",      label: "Blog",        icon: "◧" },
  { id: "contact",   label: "Kotak Masuk", icon: "◉" },
  { id: "skills",    label: "Skills",      icon: "◈" },
  { id: "chatbot",   label: "Chatbot KB",  icon: "◆" },
];

export default function Admin({ onBack }: AdminProps) {
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    if (loginForm.username === "admin" && loginForm.password === "admin123") { setLoggedIn(true); setLoginError(""); }
    else setLoginError("Kredensial tidak valid. (hint: admin / admin123)");
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--background)" }}>
        <div className="w-full max-w-sm">
          <button onClick={onBack} className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 flex items-center gap-2">← Kembali ke portfolio</button>
          <div className="p-8 rounded-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="mb-6">
              <span className="font-mono font-bold text-sm tracking-widest" style={{ color: "var(--primary)" }}>AP</span>
              <p className="font-mono text-xs text-muted-foreground mt-1">Admin Panel</p>
            </div>
            <h1 className="font-mono font-bold text-xl text-foreground mb-6">Sign In</h1>
            <div className="space-y-4">
              <FormField label="Username"><input type="text" className={inputCls} placeholder="admin" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} /></FormField>
              <FormField label="Password"><input type="password" className={inputCls} placeholder="••••••••" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} onKeyDown={(e) => e.key === "Enter" && handleLogin()} /></FormField>
              {loginError && <p className="font-sans text-xs text-red-400">{loginError}</p>}
              <button onClick={handleLogin} className="w-full font-mono text-sm font-semibold py-3 rounded-sm transition-opacity hover:opacity-85" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>Masuk →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex overflow-hidden" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <aside className="w-56 h-full shrink-0 border-r flex flex-col" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="px-5 py-5 border-b shrink-0" style={{ borderColor: "var(--border)" }}>
          <span className="font-mono font-bold text-sm tracking-widest" style={{ color: "var(--primary)" }}>AP</span>
          <p className="font-mono text-[10px] text-muted-foreground mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-left transition-all duration-200" style={{ background: tab === item.id ? "rgba(200,241,53,0.1)" : "transparent", color: tab === item.id ? "var(--primary)" : "var(--muted-foreground)" }}>
              <span className="font-mono text-sm">{item.icon}</span>
              <span className="font-mono text-xs">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t space-y-0.5 shrink-0" style={{ borderColor: "var(--border)" }}>
          <button onClick={onBack} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-left font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">← Portfolio</button>
          <button onClick={() => setLoggedIn(false)} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-left font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">⎋ Keluar</button>
        </div>
      </aside>
      <main className="flex-1 h-full overflow-y-auto p-8">
        {tab === "dashboard" && <Dashboard />}
        {tab === "hero"      && <HeroCRUD />}
        {tab === "projects"  && <ProjectsCRUD />}
        {tab === "blog"      && <BlogCRUD />}
        {tab === "contact"   && <ContactInbox />}
        {tab === "skills"    && <SkillsCRUD />}
        {tab === "chatbot"   && <ChatbotKB />}
      </main>
    </div>
  );
}
