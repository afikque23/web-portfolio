import { testimonials } from "../data";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-6"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span
            className="font-mono text-xs tracking-widest mb-3 block"
            style={{ color: "var(--primary)" }}
          >
            —05— TESTIMONIALS
          </span>
          <h2
            className="font-mono font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Kata Mereka
            <br />
            <span style={{ color: "var(--primary)" }}>yang Kenal Langsung</span>
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg">
            Dari dosen pembimbing, supervisor magang, sampai rekan tim hackathon — bukan
            endorsement korporat, tapi orang-orang yang benar-benar tahu cara kerja saya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-sm border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div
                className="font-mono text-5xl leading-none mb-6 font-bold"
                style={{ color: "var(--primary)", opacity: 0.4 }}
              >
                "
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>
              <div
                className="pt-5 border-t flex items-center gap-3"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-9 h-9 rounded-sm flex items-center justify-center font-mono text-xs font-bold shrink-0"
                  style={{ background: "rgba(200,241,53,0.15)", color: "var(--primary)" }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs font-semibold text-foreground truncate">{t.name}</p>
                  <p className="font-sans text-[11px] text-muted-foreground truncate">
                    {t.role}
                  </p>
                  <span
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm mt-1 inline-block"
                    style={{ background: "rgba(200,241,53,0.1)", color: "var(--primary)" }}
                  >
                    {t.context}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
