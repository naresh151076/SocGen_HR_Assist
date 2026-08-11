"use client";

export type StatusTone = "ok" | "attention" | "neutral";

export function statusClass(tone: StatusTone) {
  if (tone === "attention") return "sg-status sg-status-attention";
  if (tone === "ok") return "sg-status sg-status-ok";
  return "sg-status sg-status-neutral";
}

export function cardStatusClass(tone: StatusTone) {
  if (tone === "attention") return "sg-status-card bg-[var(--sg-red-soft)] text-[var(--sg-red)]";
  if (tone === "ok") return "sg-status-card bg-[var(--surface-subtle)] text-[var(--ink)]";
  return "sg-status-card bg-[var(--surface-subtle)] text-[var(--muted)]";
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
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--chart-track)" strokeWidth="14" />
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

/** Dual-tone composition bar — grey-led mix with a light accent option. */
export function SplitMeter({
  left,
  right,
  ariaLabel,
}: {
  left: { label: string; value: number; tone?: "accent" | "strong" | "mid" };
  right: { label: string; value: number; tone?: "accent" | "strong" | "mid" };
  ariaLabel: string;
}) {
  const total = Math.max(left.value + right.value, 1);
  const leftPct = (left.value / total) * 100;

  const toneClass = (tone?: "accent" | "strong" | "mid") => {
    if (tone === "accent") return "bg-[rgba(233,4,30,0.42)]";
    if (tone === "strong") return "bg-[var(--chart-strong)]";
    return "bg-[var(--chart-mid)]";
  };

  return (
    <div className="w-full" role="img" aria-label={ariaLabel}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold tracking-tight text-[var(--chart-strong)]">{left.value}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{left.label}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold tracking-tight text-[var(--ink)]">{right.value}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{right.label}</p>
        </div>
      </div>
      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-[var(--chart-track)]">
        <div className={`h-full ${toneClass(left.tone ?? "mid")}`} style={{ width: `${leftPct}%` }} />
        <div className={`h-full flex-1 ${toneClass(right.tone ?? "strong")}`} />
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        {Math.round(leftPct)}% {left.label.toLowerCase()} · {Math.round(100 - leftPct)}% {right.label.toLowerCase()}
      </p>
    </div>
  );
}

/** Person-cell grid — each square is one teammate. */
export function Waffle({
  cells,
  columns = 8,
  ariaLabel,
}: {
  cells: { tone: "accent" | "strong" | "soft" | "muted" }[];
  columns?: number;
  ariaLabel: string;
}) {
  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      role="img"
      aria-label={ariaLabel}
    >
      {cells.map((cell, index) => (
        <span
          key={`${cell.tone}-${index}`}
          className={`aspect-square rounded-sm ${
            cell.tone === "accent"
              ? "bg-[rgba(233,4,30,0.42)]"
              : cell.tone === "strong"
                ? "bg-[var(--chart-strong)]"
                : cell.tone === "soft"
                  ? "bg-[var(--chart-soft)]"
                  : "bg-[var(--chart-track)]"
          }`}
        />
      ))}
    </div>
  );
}

/** Ranked horizontal bars — mid greys, soft red only when open. */
export function RankedBars({
  items,
  ariaLabel,
}: {
  items: { label: string; value: number; open?: number }[];
  ariaLabel: string;
}) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="space-y-4" role="img" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--surface-subtle)] text-[10px] font-bold text-[var(--muted)]">
                {index + 1}
              </span>
              <p className="truncate text-sm font-bold text-[var(--ink)]">{item.label}</p>
            </div>
            <p className="shrink-0 text-sm font-bold text-[var(--chart-strong)]">
              {item.value}
              {item.open != null && item.open > 0 && (
                <span className="ml-2 text-[var(--sg-red)]">{item.open} open</span>
              )}
            </p>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-[var(--chart-track)]">
            <div
              className={`h-full rounded-full transition-[width] duration-300 ease-out ${
                item.open && item.open > 0 ? "bg-[rgba(233,4,30,0.42)]" : "bg-[var(--chart-mid)]"
              }`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Semi-circle readiness gauge.
 * Progress fills left → right in a mid/dark grey on a light track.
 * Open remainder stays on the light track (no inverted red “progress”).
 */
export function ArcGauge({
  value,
  max,
  center,
  centerLabel,
  ariaLabel,
  size = 168,
}: {
  value: number;
  max: number;
  center: string;
  centerLabel: string;
  ariaLabel: string;
  size?: number;
}) {
  const stroke = 12;
  const radius = size * 0.38;
  const cx = size / 2;
  const cy = size * 0.58;
  const circumference = Math.PI * radius;
  const safeMax = max > 0 ? max : 1;
  const filled = Math.min(value / safeMax, 1) * circumference;

  return (
    <svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`} aria-label={ariaLabel}>
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke="var(--chart-track)"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke="var(--chart-strong)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
      />
      <text x={cx} y={cy - 18} textAnchor="middle" fill="var(--ink)" style={{ fontSize: "28px", fontWeight: 700 }}>
        {center}
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" fill="var(--muted)" style={{ fontSize: "11px", fontWeight: 700 }}>
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

/** Quiet light-grey disc + muted initials — keep red for attention states only. */
export const avatarClassName = "bg-[var(--surface-subtle)] text-[var(--muted)]";

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** @deprecated Prefer avatarClassName — kept for call-site compatibility. */
export function avatarClass(_name?: string) {
  return avatarClassName;
}
