"use client";

import { useMemo, useState } from "react";
import { Bot, CircleAlert, Search } from "lucide-react";
import { scenario } from "../data/scenario";
import { Donut, Kpi, Legend, Pipeline, avatarClass, initials, statusClass, type StatusTone } from "./SgCharts";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };
type PersonStatus = "ready" | "decide" | "confirmed" | "follow-up";

type CohortPerson = {
  name: string;
  team: string;
  status: PersonStatus;
  note: string;
};

const people: CohortPerson[] = scenario.people.map((person) => {
  if (person.name === "Thomas Bernard") {
    return { name: person.name, team: person.team, status: "follow-up", note: "9 Oct · Claire" };
  }
  if (person.name === "Priya Shah") {
    return { name: person.name, team: person.team, status: "confirmed", note: "22 Sep · alternative" };
  }
  return { name: person.name, team: person.team, status: "confirmed", note: "18 Sep · main" };
});

// Pre-decision view overlay for the active check: show ready/decide mix for the live case.
const checkPeople: CohortPerson[] = scenario.people.map((person) => ({
  name: person.name,
  team: person.team,
  status: person.status === "Needs decision" ? "decide" : "ready",
  note: person.status === "Needs decision" ? person.note : "Checks passed",
}));

const filters: { key: "all" | PersonStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "decide", label: "Decide" },
  { key: "ready", label: "Ready" },
  { key: "confirmed", label: "Confirmed" },
  { key: "follow-up", label: "Follow-up" },
];

function personTone(status: PersonStatus): StatusTone {
  if (status === "decide" || status === "follow-up") return "attention";
  if (status === "ready") return "neutral";
  return "ok";
}

function personLabel(status: PersonStatus) {
  if (status === "decide") return "Decide";
  if (status === "follow-up") return "Follow-up";
  if (status === "ready") return "Ready";
  return "Confirmed";
}

export function RaduReadiness({ onAskAssistant }: Props) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PersonStatus>("all");
  const [view, setView] = useState<"outcome" | "check">("outcome");
  const roster = view === "check" ? checkPeople : people;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roster.filter((person) => {
      const matchesQuery = !q || person.name.toLowerCase().includes(q) || person.team.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || person.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, roster, statusFilter]);

  const readyCount = view === "check" ? scenario.ready : scenario.confirmed;
  const decideCount = view === "check" ? 2 : 1;
  const readiness = Math.round((readyCount / scenario.requested) * 100);

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Session readiness"
        tags={[scenario.sessionRef, `${scenario.requested} people`]}
        menuLabel="Readiness options"
        menuItems={[
          {
            label: "Ask the assistant",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("Summarise session readiness for New Manager Foundations · Paris."),
          },
        ]}
      />

      <div className="grid min-h-0 w-full flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,34%)]">
        <div className="scrollbar min-h-0 overflow-y-auto border-b border-[var(--line)] lg:border-b-0 lg:border-r">
          <div className="w-full px-5 py-5 md:px-8 md:py-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">{scenario.course}</h2>
                <span className="sg-status sg-status-attention">{decideCount} open</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setView(view === "outcome" ? "check" : "outcome")}
                  className="sg-btn sg-btn-secondary"
                >
                  {view === "outcome" ? "Show check" : "Show outcome"}
                </button>
                <button
                  onClick={() => onAskAssistant("Review exceptions for the New Manager Foundations registration check.")}
                  className="sg-btn sg-btn-ink"
                >
                  <Bot size={15} /> Review exceptions
                </button>
              </div>
            </div>

            <div className="mt-5">
              <Pipeline
                steps={[
                  { label: "Requested", value: String(scenario.requested) },
                  { label: view === "check" ? "Ready" : "Confirmed", value: String(readyCount) },
                  { label: "Capacity", value: String(scenario.capacity) },
                  { label: "Open", value: String(decideCount), tone: "attention" },
                ]}
              />
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-2">
              <section className="border border-[var(--line)] p-5">
                <p className="sg-meta-label">{view === "check" ? "Check mix" : "Outcome mix"}</p>
                <div className="mt-4 flex items-center justify-center gap-5">
                  <Donut
                    ariaLabel="Cohort readiness"
                    center={`${readiness}%`}
                    centerLabel={view === "check" ? "READY" : "DONE"}
                    segments={[
                      { value: readyCount, color: "var(--chart-strong)" },
                      { value: scenario.requested - readyCount, color: "rgba(233, 4, 30, 0.45)" },
                    ]}
                    total={scenario.requested}
                  />
                  <div className="space-y-3 text-sm">
                    <Legend swatch="bg-[var(--chart-strong)]" label={view === "check" ? "Ready" : "Confirmed"} value={String(readyCount)} />
                    <Legend swatch="bg-[rgba(233,4,30,0.42)]" label="Open" value={String(scenario.requested - readyCount)} />
                  </div>
                </div>
              </section>

              <section className="border border-[var(--line)] p-5">
                <p className="sg-meta-label">Session</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Kpi label="Date" value="18 Sep" />
                  <Kpi label="Seats left" value={String(scenario.capacity - (view === "check" ? scenario.ready : 10))} />
                  <Kpi label="Trainer" value="Victor" />
                  <Kpi label="Invites" value={view === "outcome" ? "11" : "0"} attention={view === "check"} />
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-full border border-[var(--sg-red-border)] bg-[var(--sg-red-soft)] px-3 py-2.5">
                  <CircleAlert size={15} strokeWidth={1.8} className="shrink-0 text-[var(--sg-red)]" />
                  <p className="min-w-0 truncate text-sm font-bold text-[var(--ink)]">
                    {view === "check" ? "Priya · Thomas" : "Thomas · later session"}
                  </p>
                  <button
                    onClick={() =>
                      onAskAssistant(
                        view === "check"
                          ? "Ask Claire to decide the two registration exceptions for New Manager Foundations."
                          : "Summarise the Thomas Bernard follow-up hold for New Manager Foundations."
                      )
                    }
                    className="sg-btn sg-btn-primary sg-btn-compact ml-auto shrink-0"
                  >
                    {view === "check" ? "Ask Claire" : "Open hold"}
                  </button>
                </div>
              </section>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="border border-[var(--line)] px-4 py-3">
                <p className="sg-meta-label">From</p>
                <p className="mt-1 text-sm font-bold text-[var(--ink)]">Amélie · plan</p>
              </div>
              <div className="border border-[var(--line)] px-4 py-3">
                <p className="sg-meta-label">Decision</p>
                <p className="mt-1 text-sm font-bold text-[var(--ink)]">Claire · exceptions</p>
              </div>
              <div className="border border-[var(--line)] px-4 py-3">
                <p className="sg-meta-label">Next</p>
                <p className="mt-1 text-sm font-bold text-[var(--ink)]">Elena · INV-04</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex min-h-0 flex-col bg-white">
          <div className="shrink-0 border-b border-[var(--line)] px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-[var(--ink)]">Cohort</p>
              <span className="text-xs font-semibold text-[var(--muted)]">{visible.length}</span>
            </div>
            <label className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3 py-2.5 focus-within:border-[var(--sg-red)]">
              <Search size={15} className="shrink-0 text-[var(--muted)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search people"
                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-zinc-400"
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {filters.map((entry) => (
                <button
                  key={entry.key}
                  onClick={() => setStatusFilter(entry.key)}
                  className={`sg-filter ${statusFilter === entry.key ? "sg-filter-active" : ""}`}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>

          <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
            {visible.length === 0 ? (
              <p className="px-4 py-8 text-sm text-[var(--muted)]">No people match this search.</p>
            ) : (
              visible.map((person) => (
                <div key={person.name} className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3.5">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-bold ${avatarClass(person.name)}`}>
                    {initials(person.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-bold text-[var(--ink)]">{person.name}</p>
                      <span className={statusClass(personTone(person.status))}>{personLabel(person.status)}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-[var(--muted)]">
                      {person.team}
                      <span className="text-zinc-400"> · </span>
                      {person.note}
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
