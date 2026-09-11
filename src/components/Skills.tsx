import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";

export default function Skills() {
  const { skills, techStack } = useData();
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setAnimated(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cx = 160;
  const cy = 160;
  const maxR = 120;
  const count = skills.length;

  const getPoint = (index: number, radius: number) => {
    const angle = (index * Math.PI * 2) / count - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const skillPoints = skills.map((s, i) => getPoint(i, (animated ? s.value / 100 : 0) * maxR));
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <section id="skills" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span
            className="font-mono text-xs tracking-widest mb-3 block"
            style={{ color: "var(--primary)" }}
          >
            —04— SKILLS
          </span>
          <h2
            className="font-mono font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Senjata
            <br />
            <span style={{ color: "var(--primary)" }}>Andalan</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <svg width="320" height="320" viewBox="0 0 320 320">
                {gridLevels.map((level) => {
                  const pts = Array.from({ length: count }, (_, i) =>
                    getPoint(i, maxR * level)
                  );
                  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
                  return (
                    <path
                      key={level}
                      d={d}
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="1"
                    />
                  );
                })}

                {Array.from({ length: count }, (_, i) => {
                  const outer = getPoint(i, maxR);
                  return (
                    <line
                      key={i}
                      x1={cx}
                      y1={cy}
                      x2={outer.x}
                      y2={outer.y}
                      stroke="var(--border)"
                      strokeWidth="1"
                    />
                  );
                })}

                <path
                  d={
                    skillPoints
                      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
                      .join(" ") + " Z"
                  }
                  fill="rgba(200,241,53,0.1)"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  style={{ transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                />

                {skillPoints.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="var(--primary)"
                    style={{ transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  />
                ))}

                {skills.map((skill, i) => {
                  const labelPt = getPoint(i, maxR + 28);
                  return (
                    <text
                      key={i}
                      x={labelPt.x}
                      y={labelPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="var(--muted-foreground)"
                      fontSize="11"
                      fontFamily="'JetBrains Mono', monospace"
                      fontWeight="500"
                    >
                      {skill.name}
                    </text>
                  );
                })}

                {skills.map((skill, i) => {
                  const valuePt = getPoint(i, (animated ? skill.value / 100 : 0) * maxR * 0.7);
                  return (
                    <text
                      key={i}
                      x={valuePt.x}
                      y={valuePt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="var(--primary)"
                      fontSize="9"
                      fontFamily="'JetBrains Mono', monospace"
                      fontWeight="700"
                      style={{ transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                    >
                      {animated ? skill.value : ""}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          <div>
            <div className="space-y-5 mb-10">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {skill.name}
                    </span>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--primary)" }}
                    >
                      {animated ? skill.value : 0}%
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: animated ? `${skill.value}%` : "0%",
                        background: "var(--primary)",
                        transition: "width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p
                className="font-mono text-[10px] tracking-widest mb-4 uppercase"
                style={{ color: "var(--muted-foreground)" }}
              >
                Tech Stack
              </p>
              <div className="space-y-3">
                {techStack.map((cat) => (
                  <div key={cat.category} className="flex gap-3 items-start">
                    <span
                      className="font-mono text-[10px] pt-0.5 shrink-0 w-20"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-sm"
                          style={{ background: "var(--muted)", color: "var(--foreground)" }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
