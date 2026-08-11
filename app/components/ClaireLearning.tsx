"use client";

import { useMemo, useState } from "react";
import { Bot, CircleAlert, Search, Star } from "lucide-react";
import { scenario } from "../data/scenario";
import {
  ArcGauge,
  avatarClassName,
  cardStatusClass,
  initials,
  Kpi,
  Legend,
  RankedBars,
  SplitMeter,
  Waffle,
  type StatusTone,
} from "./SgCharts";
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
  { label: "New Manager Foundations", value: 12, open: 1 },
  { label: "Risk & Conduct refresh", value: 2, open: 0 },
  { label: "Cyber awareness", value: 2, open: 0 },
  { label: "Leadership essentials", value: 2, open: 0 },
];

const statusFilters: { key: "all" | MemberStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "follow-up", label: "Follow-up" },
  { key: "needs-training", label: "Needs training" },
  { key: "in-progress", label: "In progress" },
  { key: "up-to-date", label: "Up to date" },
];

function memberTone(status: MemberStatus): StatusTone {
  if (status === "follow-up" || status === "needs-training") return "attention";
  if (status === "in-progress") return "neutral";
  return "ok";
}

function statusLabel(status: MemberStatus) {
  if (status === "follow-up") return "Follow-up";
  if (status === "needs-training") return "Needs training";
  if (status === "in-progress") return "In progress";
  return "Up to date";
}

const confirmed = scenario.confirmed;
const requested = scenario.requested;
const openCase = requested - confirmed;
const readiness = Math.round((confirmed / requested) * 100);

const askTeamPrompt =
  "Summarise Markets & Risk learning needs: who still needs training, who is in progress, and which follow-up still needs my decision.";

export function ClaireLearning({ onAskAssistant }: Props) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MemberStatus>("all");

  const visibleMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesQuery = !q || member.name.toLowerCase().includes(q) || member.role.toLowerCase().includes(q) || member.need.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || member.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const waffleCells = useMemo(
    () =>
      members.map((member) => ({
        tone: (member.status === "up-to-date" ? "strong" : "accent") as "strong" | "accent",
      })),
    [],
  );

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
            onClick: () => onAskAssistant(askTeamPrompt),
          },
        ]}
      />

      <div className="grid min-h-0 w-full flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(340px,38%)]">
        <div className="scrollbar min-h-0 overflow-y-auto border-b border-[var(--line)] lg:border-b-0 lg:border-r">
          <div className="w-full px-5 py-5 md:px-8 md:py-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">{businessUnit}</h2>
                <span className="sg-status sg-status-attention">{team.total - team.upToDate} need action</span>
              </div>
              <button onClick={() => onAskAssistant(askTeamPrompt)} className="sg-btn sg-btn-primary">
                <Bot size={15} strokeWidth={1.8} /> AskAI
              </button>
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
                <div className="mt-5">
                  <SplitMeter
                    ariaLabel="Team mix of new and established members"
                    left={{ label: "New", value: team.newJoiners, tone: "mid" }}
                    right={{ label: "Established", value: team.established, tone: "strong" }}
                  />
                </div>
              </section>

              <section className="border border-[var(--line)] p-5">
                <p className="sg-meta-label">Training status</p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <Waffle ariaLabel="Training status by person" cells={waffleCells} columns={8} />
                  </div>
                  <div className="shrink-0 space-y-3 text-sm">
                    <Legend swatch="bg-[var(--chart-strong)]" label="Up to date" value={String(team.upToDate)} />
                    <Legend swatch="bg-[rgba(233,4,30,0.42)]" label="Need action" value={String(team.total - team.upToDate)} />
                    <p className="text-xs text-[var(--muted)]">One square = one person</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
              <section className="border border-[var(--line)] p-5">
                <p className="sg-meta-label">Who needs what</p>
                <div className="mt-5">
                  <RankedBars ariaLabel="Learning topics by people who need them" items={needs} />
                </div>
              </section>

              <section className="border border-[var(--line)] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="sg-meta-label">Active case</p>
                  <span className="text-xs font-semibold text-zinc-500">NMF-042</span>
                </div>
                <div className="mt-2 flex flex-col items-center">
                  <ArcGauge
                    ariaLabel="Active case readiness"
                    value={confirmed}
                    max={requested}
                    center={`${readiness}%`}
                    centerLabel="READY"
                  />
                  <div className="mt-1 flex w-full justify-center gap-5 text-sm">
                    <Legend swatch="bg-[var(--chart-strong)]" label="Confirmed" value={String(confirmed)} />
                    <Legend swatch="bg-[var(--chart-track)]" label="Open" value={String(openCase)} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-full border border-[var(--sg-red-border)] bg-[var(--sg-red-soft)] px-3 py-2.5">
                  <CircleAlert size={15} strokeWidth={1.8} className="shrink-0 text-[var(--sg-red)]" />
                  <p className="min-w-0 truncate text-sm font-bold text-[var(--ink)]">Thomas Bernard · 9 Oct</p>
                  <button
                    onClick={() => onAskAssistant("Compare later learning options for Thomas Bernard")}
                    className="sg-btn sg-btn-primary sg-btn-compact ml-auto shrink-0"
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

          <div className="scrollbar min-h-0 flex-1 overflow-y-auto p-3">
            {visibleMembers.length === 0 ? (
              <p className="px-1 py-8 text-sm text-[var(--muted)]">No people match this search.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {visibleMembers.map((member) => (
                  <article
                    key={member.name}
                    className="relative flex flex-col items-center rounded-xl border border-[var(--line)] bg-white px-2 pb-3 pt-8 text-center transition-colors duration-200 ease-out hover:border-[var(--sg-red-border)] hover:bg-[var(--surface-subtle)]"
                  >
                    {member.tenure === "new" && (
                      <span className="sg-badge-new" title="New joiner" aria-label="New joiner">
                        <Star size={10} strokeWidth={1.8} fill="currentColor" />
                        <span className="sg-badge-new-label">new</span>
                      </span>
                    )}
                    <span className={`absolute right-1.5 top-1.5 ${cardStatusClass(memberTone(member.status))}`}>
                      {statusLabel(member.status)}
                    </span>
                    <span className={`grid h-12 w-12 place-items-center rounded-full text-sm font-bold ${avatarClassName}`}>
                      {initials(member.name)}
                    </span>
                    <p className="mt-2.5 w-full truncate text-xs font-bold text-[var(--ink)]" title={member.name}>
                      {member.name}
                    </p>
                    <p className="mt-0.5 w-full truncate text-[10px] text-[var(--muted)]" title={member.role}>
                      {member.role}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
