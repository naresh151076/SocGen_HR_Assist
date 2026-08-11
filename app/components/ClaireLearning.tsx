"use client";

import { useMemo, useState } from "react";
import { Bot, CircleAlert, Search } from "lucide-react";
import { scenario } from "../data/scenario";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };
type MemberStatus = "up-to-date" | "in-progress" | "needs-training" | "follow-up";
type Member = {
  name: string;
  role: string;
  tenure: "new" | "established";
  status: MemberStatus;
  need: string;
};

const businessUnit = "Markets & Risk";

/** Fictional Claire BM unit — aligned to the connected NMF case plus supporting learning needs. */
const members: Member[] = [
  ...scenario.people.map((person) => ({
    name: person.name,
    role: person.team,
    tenure: "new" as const,
    status: (person.name === "Thomas Bernard"
      ? "follow-up"
      : "in-progress") as MemberStatus,
    need: person.name === "Thomas Bernard" ? "Later-session choice" : scenario.course,
  })),
  { name: "Camille Renard", role: "Risk", tenure: "established", status: "needs-training", need: "Risk & Conduct refresh" },
  { name: "Noah Petit", role: "Compliance", tenure: "established", status: "needs-training", need: "Risk & Conduct refresh" },
  { name: "Léa Morel", role: "Global Markets", tenure: "established", status: "up-to-date", need: "None" },
  { name: "Antoine Girard", role: "Operations", tenure: "established", status: "up-to-date", need: "None" },
  { name: "Sofia Martins", role: "Client Services", tenure: "established", status: "needs-training", need: "Cyber awareness" },
  { name: "Marc Lefevre", role: "Finance", tenure: "established", status: "up-to-date", need: "None" },
  { name: "Hannah Keller", role: "Legal", tenure: "established", status: "needs-training", need: "Cyber awareness" },
  { name: "Youssef Benali", role: "IT", tenure: "established", status: "up-to-date", need: "None" },
  { name: "Emma Roche", role: "HR", tenure: "established", status: "needs-training", need: "Leadership essentials" },
  { name: "Lucas Perrin", role: "Audit", tenure: "established", status: "up-to-date", need: "None" },
  { name: "Clara Fontaine", role: "Corporate Banking", tenure: "established", status: "needs-training", need: "Leadership essentials" },
  { name: "Hugo Marchand", role: "Securities Services", tenure: "established", status: "up-to-date", need: "None" },
];

const team = {
  total: members.length,
  newJoiners: members.filter((m) => m.tenure === "new").length,
  established: members.filter((m) => m.tenure === "established").length,
  needTraining: members.filter((m) => m.status === "needs-training" || m.status === "follow-up" || m.status === "in-progress").length,
  upToDate: members.filter((m) => m.status === "up-to-date").length,
};

const needs = [
  { topic: "New Manager Foundations", people: 12, open: 1 },
  { topic: "Risk & Conduct refresh", people: 2, open: 0 },
  { topic: "Cyber awareness", people: 2, open: 0 },
  { topic: "Leadership essentials", people: 2, open: 0 },
];

const statusFilters: { key: "all" | MemberStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "follow-up", label: "Follow-up" },
  { key: "needs-training", label: "Needs training" },
  { key: "in-progress", label: "In progress" },
  { key: "up-to-date", label: "Up to date" },
];

const avatarPalette = [
  "border border-zinc-200 bg-white text-zinc-600",
  "border border-zinc-200 bg-zinc-50 text-zinc-600",
  "border border-zinc-200 bg-zinc-100 text-zinc-700",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function avatarClass(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash + name.charCodeAt(i) * (i + 1)) % avatarPalette.length;
  return avatarPalette[hash];
}

function statusLabel(status: MemberStatus) {
  if (status === "follow-up") return "Follow-up";
  if (status === "needs-training") return "Needs training";
  if (status === "in-progress") return "In progress";
  return "Up to date";
}

function statusClass(status: MemberStatus) {
  if (status === "follow-up" || status === "needs-training") return "sg-status sg-status-attention";
  if (status === "in-progress") return "sg-status sg-status-neutral";
  return "sg-status sg-status-ok";
}

const confirmed = scenario.confirmed;
const requested = scenario.requested;
const openCase = requested - confirmed;
const readiness = Math.round((confirmed / requested) * 100);

export function ClaireLearning({ onAskAssistant }: Props) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MemberStatus>("all");
  const maxNeed = Math.max(...needs.map((item) => item.people));

  const visibleMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesQuery = !q || member.name.toLowerCase().includes(q) || member.role.toLowerCase().includes(q) || member.need.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || member.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Team learning"
        tags={[`${team.total} people`, `${members.filter((m) => m.status !== "up-to-date").length} active needs`]}
        menuLabel="Team learning options"
        menuItems={[
          {
            label: "Ask the assistant",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("Summarise my team’s learning needs and who still needs a decision"),
          },
        ]}
      />

      <div className="grid min-h-0 w-full flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,34%)]">
        <div className="scrollbar min-h-0 overflow-y-auto border-b border-[var(--line)] lg:border-b-0 lg:border-r">
          <div className="w-full px-5 py-5 md:px-8 md:py-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">{businessUnit}</h2>
                <span className="sg-status sg-status-attention">{team.total - team.upToDate} need action</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onAskAssistant("Which of my team still need mandatory learning?")}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-3.5 py-2 text-sm font-bold text-white hover:bg-black"
                >
                  <Bot size={15} /> Who needs training
                </button>
                <button
                  onClick={() => onAskAssistant("Compare later learning options for Thomas Bernard")}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3.5 py-2 text-sm font-bold text-[var(--ink)] hover:bg-[var(--surface-hover)]"
                >
                  Open follow-up
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              <Kpi label="My team" value={String(team.total)} />
              <Kpi label="New" value={String(team.newJoiners)} />
              <Kpi label="Established" value={String(team.established)} />
              <Kpi label="Need action" value={String(team.total - team.upToDate)} attention />
              <Kpi label="Up to date" value={String(team.upToDate)} />
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-2">
              <section className="border border-[var(--line)] p-5">
                <p className="sg-meta-label">Team mix</p>
                <div className="mt-4 flex items-center justify-center gap-5">
                  <Donut
                    ariaLabel="Team mix"
                    center={`${Math.round((team.newJoiners / team.total) * 100)}%`}
                    centerLabel="NEW"
                    segments={[
                      { value: team.newJoiners, color: "var(--sg-red)" },
                      { value: team.established, color: "var(--ink)" },
                    ]}
                    total={team.total}
                  />
                  <div className="space-y-3 text-sm">
                    <Legend swatch="bg-[var(--sg-red)]" label="New" value={String(team.newJoiners)} />
                    <Legend swatch="bg-[var(--ink)]" label="Established" value={String(team.established)} />
                  </div>
                </div>
              </section>

              <section className="border border-[var(--line)] p-5">
                <p className="sg-meta-label">Training status</p>
                <div className="mt-4 flex items-center justify-center gap-5">
                  <Donut
                    ariaLabel="Training status"
                    center={`${Math.round((team.upToDate / team.total) * 100)}%`}
                    centerLabel="READY"
                    segments={[
                      { value: team.upToDate, color: "var(--ink)" },
                      { value: team.total - team.upToDate, color: "var(--sg-red)" },
                    ]}
                    total={team.total}
                  />
                  <div className="space-y-3 text-sm">
                    <Legend swatch="bg-[var(--ink)]" label="Up to date" value={String(team.upToDate)} />
                    <Legend swatch="bg-[var(--sg-red)]" label="Need action" value={String(team.total - team.upToDate)} />
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
              <section className="border border-[var(--line)] p-5">
                <p className="sg-meta-label">Who needs what</p>
                <div className="mt-5 space-y-4">
                  {needs.map((item) => (
                    <div key={item.topic}>
                      <div className="mb-1.5 flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-bold text-[var(--ink)]">{item.topic}</p>
                        <p className="shrink-0 text-sm font-bold text-[var(--ink)]">
                          {item.people}
                          {item.open > 0 && <span className="ml-2 text-[var(--sg-red)]">{item.open} open</span>}
                        </p>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-[var(--line)]">
                        <div
                          className={`h-full rounded-full ${item.open > 0 ? "bg-[var(--sg-red)]" : "bg-[var(--ink)]"}`}
                          style={{ width: `${(item.people / maxNeed) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border border-[var(--line)] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="sg-meta-label">Active case</p>
                  <span className="text-xs font-semibold text-zinc-500">NMF-042</span>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <Donut
                    ariaLabel="Active case coverage"
                    center={`${readiness}%`}
                    centerLabel="READY"
                    size={124}
                    segments={[
                      { value: confirmed, color: "var(--ink)" },
                      { value: openCase, color: "var(--sg-red)" },
                    ]}
                    total={requested}
                  />
                  <div className="space-y-2.5 text-sm">
                    <Legend swatch="bg-[var(--ink)]" label="Confirmed" value={String(confirmed)} />
                    <Legend swatch="bg-[var(--sg-red)]" label="Open" value={String(openCase)} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--sg-red-border)] bg-[var(--sg-red-soft)] px-3 py-2.5">
                  <CircleAlert size={15} strokeWidth={1.8} className="shrink-0 text-[var(--sg-red)]" />
                  <p className="min-w-0 truncate text-sm font-bold text-[var(--ink)]">Thomas Bernard · 9 Oct</p>
                  <button
                    onClick={() => onAskAssistant("Compare later learning options for Thomas Bernard")}
                    className="ml-auto shrink-0 text-sm font-bold text-[var(--sg-red)] hover:underline"
                  >
                    Resolve
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <aside className="flex min-h-0 flex-col bg-white">
          <div className="shrink-0 border-b border-[var(--line)] px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-[var(--ink)]">Team members</p>
              <span className="text-xs font-semibold text-[var(--muted)]">{visibleMembers.length}</span>
            </div>
            <label className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 focus-within:border-[var(--sg-red)]">
              <Search size={15} className="shrink-0 text-[var(--muted)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search people or needs"
                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-zinc-400"
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {statusFilters.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setStatusFilter(item.key)}
                  className={`sg-filter ${statusFilter === item.key ? "sg-filter-active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
            {visibleMembers.length === 0 ? (
              <p className="px-4 py-8 text-sm text-[var(--muted)]">No people match this search.</p>
            ) : (
              visibleMembers.map((member) => (
                <div key={member.name} className="mx-3 my-2 flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white px-3.5 py-3 transition-colors duration-200 ease-out hover:bg-zinc-50 motion-reduce:transition-none">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[11px] font-bold ${avatarClass(member.name)}`}>
                    {initials(member.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-bold text-[var(--ink)]">{member.name}</p>
                      <span className={statusClass(member.status)}>{statusLabel(member.status)}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-[var(--muted)]">
                      {member.role}
                      <span className="text-zinc-400"> · </span>
                      {member.tenure === "new" ? "New" : "Established"}
                      <span className="text-zinc-400"> · </span>
                      {member.need}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Donut({
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

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={ariaLabel}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--line)" strokeWidth="14" />
      {segments.map((segment) => {
        const length = (segment.value / total) * circumference;
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

function Kpi({ label, value, attention = false }: { label: string; value: string; attention?: boolean }) {
  return (
    <div className="border border-[var(--line)] px-4 py-4">
      <p className="sg-meta-label">{label}</p>
      <p className={`mt-2 text-3xl font-bold tracking-tight ${attention ? "text-[var(--sg-red)]" : "text-[var(--ink)]"}`}>{value}</p>
    </div>
  );
}

function Legend({ swatch, label, value }: { swatch: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <i className={`h-2.5 w-2.5 rounded-sm ${swatch}`} />
      <span className="font-semibold text-[var(--ink)]">{label}</span>
      <span className="text-[var(--muted)]">{value}</span>
    </div>
  );
}
