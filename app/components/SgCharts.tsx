"use client";

export type StatusTone = "ok" | "attention" | "neutral";

export function statusClass(tone: StatusTone) {
  if (tone === "attention") return "sg-status sg-status-attention";
  if (tone === "ok") return "sg-status sg-status-ok";
  return "sg-status sg-status-neutral";
}

export function Donut({
  segments,
  total,
  center,
  centerLabel,
  ariaLabel,
  size = 148,
}: {
  segments: { value: number; color: string }[];
  total: number;
  center: string;
  centerLabel: string;
  ariaLabel: string;
  size?: number;
}) {
  const radius = size * 0.365;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const safeTotal = total > 0 ? total : 1;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={ariaLabel}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--line)" strokeWidth="14" />
      {segments.map((segment) => {
        const length = (segment.value / safeTotal) * circumference;
        const node = (
          <circle
            key={`${segment.color}-${segment.value}-${offset}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth="14"
            strokeDasharray={`${length} ${circumference}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
        offset += length;
        return node;
      })}
      <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fill="var(--ink)" style={{ fontSize: size > 140 ? "28px" : "24px", fontWeight: 700 }}>
        {center}
      </text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle" fill="var(--muted)" style={{ fontSize: "11px", fontWeight: 700 }}>
        {centerLabel}
      </text>
    </svg>
  );
}

export function Kpi({ label, value, attention = false }: { label: string; value: string; attention?: boolean }) {
  return (
    <div className="border border-[var(--line)] px-4 py-4">
      <p className="sg-meta-label">{label}</p>
      <p className={`mt-2 text-3xl font-bold tracking-tight ${attention ? "text-[var(--sg-red)]" : "text-[var(--ink)]"}`}>{value}</p>
    </div>
  );
}

export function Legend({ swatch, label, value }: { swatch: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <i className={`h-2.5 w-2.5 rounded-sm ${swatch}`} />
      <span className="font-semibold text-[var(--ink)]">{label}</span>
      <span className="text-[var(--muted)]">{value}</span>
    </div>
  );
}

export function Pipeline({
  steps,
}: {
  steps: { label: string; value: string; tone?: StatusTone }[];
}) {
  return (
    <div className="grid gap-0 sm:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step.label} className={`border border-[var(--line)] px-4 py-4 ${index > 0 ? "sm:-ml-px" : ""}`}>
          <p className="sg-meta-label">{step.label}</p>
          <p className={`mt-2 text-2xl font-bold tracking-tight ${step.tone === "attention" ? "text-[var(--sg-red)]" : "text-[var(--ink)]"}`}>
            {step.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export const avatarPalette = [
  "bg-[#202124] text-white",
  "bg-[#3f4246] text-white",
  "bg-[#fff0f1] text-[#e9041e]",
  "bg-[#f0f0f0] text-[#202124]",
  "bg-[#e8e8e8] text-[#202124]",
];

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function avatarClass(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash + name.charCodeAt(i) * (i + 1)) % avatarPalette.length;
  return avatarPalette[hash];
}
