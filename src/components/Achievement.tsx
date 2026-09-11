import { useEffect } from "react";
import type { Achievement } from "../data";

interface AchievementToastProps {
  achievement: Achievement;
  onDismiss: () => void;
}

export default function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className="fixed top-20 right-4 z-[100] animate-slide-top"
      style={{ maxWidth: "320px" }}
    >
      <div
        className="bg-card border rounded-sm overflow-hidden cursor-pointer"
        style={{ borderColor: "var(--primary)" }}
        onClick={onDismiss}
      >
        <div
          className="h-[2px]"
          style={{ background: "var(--primary)" }}
        />
        <div className="p-4 flex gap-3 items-start">
          <div
            className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 font-mono text-lg"
            style={{ background: "rgba(200,241,53,0.1)", color: "var(--primary)" }}
          >
            {achievement.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: "var(--primary)" }}
              >
                Achievement Unlocked
              </span>
            </div>
            <p className="font-mono text-sm font-semibold text-foreground leading-tight">
              {achievement.title}
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-0.5">
              {achievement.description}
            </p>
            <p
              className="font-mono text-xs font-semibold mt-1.5"
              style={{ color: "var(--primary)" }}
            >
              +{achievement.xp} XP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface XPBarProps {
  totalXP: number;
}

export function XPBar({ totalXP }: XPBarProps) {
  const xpPerLevel = 500;
  const level = Math.floor(totalXP / xpPerLevel) + 1;
  const progress = (totalXP % xpPerLevel) / xpPerLevel;

  return (
    <div className="flex items-center gap-2">
      <span
        className="font-mono text-xs font-semibold shrink-0"
        style={{ color: "var(--primary)" }}
      >
        Lv.{level}
      </span>
      <div className="w-20 h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${progress * 100}%`,
            background: "var(--primary)",
          }}
        />
      </div>
      <span className="font-mono text-[10px] text-muted-foreground">
        {totalXP} XP
      </span>
    </div>
  );
}
