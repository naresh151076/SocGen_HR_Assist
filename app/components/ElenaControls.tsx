"use client";

import { useMemo, useState } from "react";
import { Bot, CheckCircle2, CircleAlert } from "lucide-react";
import { scenario } from "../data/scenario";
import { statusClass, type StatusTone } from "./SgCharts";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };
type ItemId = "inv04" | "inv12" | "att03" | "cap07" | "inv04b" | "weekly";
type FilterKey = "all" | "attention" | "progress" | "passed";

type ControlItem = {
  id: ItemId;
  listTitle: string;
  subtitle: string;
  due: string;
  group: "attention" | "recent";
  title: string;
  status: string;
  tone: StatusTone;
  ref: string;
  impact: string;
  impactNote: string;
  match: string;
  matchNote: string;
  state: string;
  stateNote: string;
  evidence: { name: string; detail: string; tone: StatusTone }[];
  actions: { label: string; prompt: string; primary?: boolean }[];
  coverage?: number;
};

const catalogue: ControlItem[] = [
  {
    id: "inv04",
    listTitle: "INV-04 invitation match",
    subtitle: `${scenario.controlParticipant} · NMF cohort`,
    due: "Today",
    group: "attention",
    title: "INV-04 · registration without current invitation",
    status: "Approve",
    tone: "attention",
    ref: "INV-04",
    impact: "1",
    impactNote: scenario.controlParticipant,
    match: "10 / 11",
    matchNote: "invites matched",
    state: "Exception",
    stateNote: "your decision",
    coverage: Math.round((10 / scenario.confirmed) * 100),
    evidence: [
      { name: scenario.controlParticipant, detail: "Confirmed registration · 18 September", tone: "ok" },
      { name: "Invitation", detail: "No current Outlook match", tone: "attention" },
      { name: "Cause", detail: "Session change after invitation batch", tone: "neutral" },
      { name: "Repair", detail: "One replacement invitation · keep registration", tone: "attention" },
    ],
    actions: [
      { label: "Approve remediation", prompt: "Approve the INV-04 remediation and send one replacement invitation.", primary: true },
      { label: "Open evidence", prompt: "Open the INV-04 evidence note for this week’s invitation control." },
    ],
  },
  {
    id: "inv12",
    listTitle: "INV-12 duplicate invite",
    subtitle: "0 open · cleared",
    due: "Mon",
    group: "recent",
    title: "INV-12 · duplicate invitation scan",
    status: "Passed",
    tone: "ok",
    ref: "INV-12",
    impact: "0",
    impactNote: "participants",
    match: "100%",
    matchNote: "unique invites",
    state: "Passed",
    stateNote: "re-check clean",
    coverage: 100,
    evidence: [{ name: "Scan", detail: "No duplicate current invitations", tone: "ok" }],
    actions: [{ label: "Ask Assistant", prompt: "Summarise the INV-12 duplicate invitation scan." }],
  },
  {
    id: "att03",
    listTitle: "ATT-03 attendance gap",
    subtitle: "Monitoring · Q3",
    due: "Fri",
    group: "recent",
    title: "ATT-03 · attendance vs registration",
    status: "Watch",
    tone: "neutral",
    ref: "ATT-03",
    impact: "3",
    impactNote: "under review",
    match: "—",
    matchNote: "not due yet",
    state: "Queued",
    stateNote: "next weekly pack",
    evidence: [{ name: "Scope", detail: "Classroom sessions this week", tone: "neutral" }],
    actions: [{ label: "Ask Assistant", prompt: "Prepare the ATT-03 attendance gap review." }],
  },
  {
    id: "cap07",
    listTitle: "CAP-07 overbook risk",
    subtitle: "Capacity rule · clear",
    due: "Wed",
    group: "recent",
    title: "CAP-07 · capacity overbook check",
    status: "Passed",
    tone: "ok",
    ref: "CAP-07",
    impact: "0",
    impactNote: "sessions",
    match: "16 / 16",
    matchNote: "max seats respected",
    state: "Passed",
    stateNote: "evidence retained",
    coverage: 100,
    evidence: [{ name: "NMF-2026-0918", detail: "11 confirmed · capacity 16", tone: "ok" }],
    actions: [{ label: "Ask Assistant", prompt: "Show capacity control evidence for New Manager Foundations." }],
  },
  {
    id: "inv04b",
    listTitle: "INV-04 prior week",
    subtitle: "Remediated · archived",
    due: "Done",
    group: "recent",
    title: "INV-04 · prior week remediation",
    status: "Passed",
    tone: "ok",
    ref: "INV-04 · prior",
    impact: "2",
    impactNote: "repaired",
    match: "100%",
    matchNote: "after re-check",
    state: "Closed",
    stateNote: "audit kept",
    coverage: 100,
    evidence: [{ name: "History", detail: "Detection · decision · re-check retained", tone: "ok" }],
    actions: [{ label: "Ask Assistant", prompt: "Show the prior-week INV-04 audit trail." }],
  },
  {
    id: "weekly",
    listTitle: "Weekly control pack",
    subtitle: "Invitation coverage set",
    due: "Today",
    group: "recent",
    title: "Weekly invitation control pack",
    status: "Pack",
    tone: "neutral",
    ref: "WEEK-36",
    impact: "1",
    impactNote: "points to INV-04",
    match: "3 / 4",
    matchNote: "controls passed",
    state: "In progress",
    stateNote: "open INV-04",
    coverage: 75,
    evidence: [
      { name: "INV-04", detail: "1 exception open", tone: "attention" },
      { name: "INV-12", detail: "Passed", tone: "ok" },
      { name: "CAP-07", detail: "Passed", tone: "ok" },
    ],
    actions: [
      { label: "Open INV-04", prompt: "Show me this week’s invitation control exceptions.", primary: true },
    ],
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "attention", label: "Needs you" },
  { key: "progress", label: "Watch" },
  { key: "passed", label: "Passed" },
];

function matchesFilter(item: ControlItem, filter: FilterKey) {
  if (filter === "all") return true;
  if (filter === "attention") return item.tone === "attention";
  if (filter === "passed") return item.tone === "ok";
  return item.tone === "neutral";
}

export function ElenaControls({ onAskAssistant }: Props) {
  const [selected, setSelected] = useState<ItemId>("inv04");
  const [filter, setFilter] = useState<FilterKey>("all");
  const item = catalogue.find((entry) => entry.id === selected) ?? catalogue[0];
  const visible = useMemo(() => catalogue.filter((entry) => matchesFilter(entry, filter)), [filter]);
  const attention = visible.filter((entry) => entry.group === "attention");
  const recent = visible.filter((entry) => entry.group === "recent");

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Controls"
        tags={["INV-04 open", "1 needs you"]}
        menuLabel="Control options"
        menuItems={[
          {
            label: "Review exceptions",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("Review a control exception"),
          },
        ]}
      />

      <div className="grid min-h-0 w-full flex-1 lg:grid-cols-[minmax(320px,38%)_minmax(0,1fr)]">
        <section className="flex min-h-0 flex-col border-b border-[var(--line)] bg-white lg:border-b-0 lg:border-r">
          <div className="shrink-0 border-b border-[var(--line)] px-4 py-3">
            <div className="flex flex-wrap gap-1.5">
              {filters.map((entry) => (
                <button key={entry.key} onClick={() => setFilter(entry.key)} className={`sg-filter ${filter === entry.key ? "sg-filter-active" : ""}`}>
                  {entry.label}
                </button>
              ))}
            </div>
          </div>

          <div className="scrollbar min-h-0 flex-1 overflow-y-auto px-2 py-3 md:px-3">
            <div className="sg-table-head mb-1">
              <span>Control</span>
              <span>Status</span>
              <span className="text-right">Due</span>
            </div>

            {attention.length > 0 && (
              <>
                <p className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Needs your attention</p>
                {attention.map((entry) => (
                  <ControlRow key={entry.id} item={entry} active={selected === entry.id} onClick={() => setSelected(entry.id)} />
                ))}
              </>
            )}

            {recent.length > 0 && (
              <>
                <p className="px-4 pb-1 pt-5 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Recent controls</p>
                {recent.map((entry) => (
                  <ControlRow key={entry.id} item={entry} active={selected === entry.id} onClick={() => setSelected(entry.id)} />
                ))}
              </>
            )}

            {visible.length === 0 && <p className="px-4 py-8 text-sm text-[var(--muted)]">No controls match this filter.</p>}
          </div>
        </section>

        <section className="scrollbar min-h-0 overflow-y-auto bg-white px-5 py-5 md:px-8 md:py-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div className="min-w-0 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">{item.title}</h2>
                <span className={statusClass(item.tone)}>{item.status}</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-zinc-500">{item.ref}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {item.actions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    if (action.label === "Open INV-04") {
                      setSelected("inv04");
                      return;
                    }
                    onAskAssistant(action.prompt);
                  }}
                  className={
                    action.primary
                      ? "inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-3.5 py-2 text-sm font-bold text-white hover:bg-black"
                      : "inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3.5 py-2 text-sm font-bold text-[var(--ink)] hover:bg-[var(--surface-hover)]"
                  }
                >
                  {action.primary && <Bot size={15} />}
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sg-meta-grid mt-0">
            <div className="sg-meta-cell">
              <p className="sg-meta-label">Impact</p>
              <p className={`sg-meta-value ${item.tone === "attention" ? "text-[var(--sg-red)]" : ""}`}>{item.impact}</p>
              <p className="sg-meta-note">{item.impactNote}</p>
            </div>
            <div className="sg-meta-cell">
              <p className="sg-meta-label">Match</p>
              <p className="sg-meta-value">{item.match}</p>
              <p className="sg-meta-note">{item.matchNote}</p>
            </div>
            <div className="sg-meta-cell">
              <p className="sg-meta-label">State</p>
              <p className="sg-meta-value">{item.state}</p>
              <p className="sg-meta-note">{item.stateNote}</p>
            </div>
          </div>

          {typeof item.coverage === "number" && (
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--ink)]">Coverage</p>
                <p className="text-sm font-bold text-[var(--ink)]">{item.coverage}%</p>
              </div>
              <div className="sg-progress mt-3" aria-label={`Coverage ${item.coverage} percent`}>
                <div className="sg-progress-fill" style={{ width: `${item.coverage}%` }} />
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="sg-meta-label">Evidence</p>
            <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {item.evidence.map((row) => (
                <div key={row.name} className="flex items-start gap-3 py-3">
                  {row.tone === "attention" ? (
                    <CircleAlert size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--sg-red)]" />
                  ) : (
                    <CheckCircle2 size={16} strokeWidth={1.8} className={`mt-0.5 shrink-0 ${row.tone === "ok" ? "text-[var(--ink)]" : "text-[var(--muted)]"}`} />
                  )}
                  <p className="text-sm leading-5 text-[var(--muted)]">
                    <span className="font-bold text-[var(--ink)]">{row.name}</span>
                    <span className="text-zinc-400"> · </span>
                    {row.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm leading-6 text-[var(--muted)]">Radu · You · Audit</p>
        </section>
      </div>
    </div>
  );
}

function ControlRow({ item, active, onClick }: { item: ControlItem; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`sg-list-row grid grid-cols-[minmax(0,1fr)_7.5rem_4.5rem] items-start gap-3 ${active ? "sg-list-row-active" : ""}`}>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-[var(--ink)]">{item.listTitle}</span>
        <span className="mt-1.5 block truncate text-xs leading-5 text-[var(--muted)]">{item.subtitle}</span>
      </span>
      <span className="pt-0.5">
        <span className={statusClass(item.tone)}>{item.status}</span>
      </span>
      <span className="pt-0.5 text-right text-xs font-semibold text-[var(--ink)]">{item.due}</span>
    </button>
  );
}
