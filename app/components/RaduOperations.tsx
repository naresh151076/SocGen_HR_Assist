"use client";

import { useMemo, useState } from "react";
import { Bot, CheckCircle2, CircleAlert } from "lucide-react";
import { scenario } from "../data/scenario";
import { statusClass, type StatusTone } from "./SgCharts";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };
type ItemId = "nmf" | "publish" | "thomas" | "risk" | "cyber" | "client";
type FilterKey = "all" | "attention" | "draft" | "done";

type QueueItem = {
  id: ItemId;
  listTitle: string;
  subtitle: string;
  due: string;
  group: "attention" | "recent";
  title: string;
  status: string;
  tone: StatusTone;
  ref: string;
  ready: string;
  readyNote: string;
  decide: string;
  decideNote: string;
  state: string;
  stateNote: string;
  coverage: { name: string; detail: string; tone: StatusTone }[];
  actions: { label: string; prompt: string; primary?: boolean }[];
  progress?: number;
};

const catalogue: QueueItem[] = [
  {
    id: "nmf",
    listTitle: "NMF registration check",
    subtitle: "12 requested · Claire cohort",
    due: "18 Sep",
    group: "attention",
    title: "New Manager Foundations · registration check",
    status: "Needs Claire",
    tone: "attention",
    ref: scenario.sessionRef,
    ready: String(scenario.ready),
    readyNote: "ready to register",
    decide: "2",
    decideNote: "business exceptions",
    state: "Hold draft",
    stateNote: "awaiting Claire",
    progress: Math.round((scenario.ready / scenario.requested) * 100),
    coverage: [
      { name: `${scenario.ready} people`, detail: "Eligibility and availability passed", tone: "ok" },
      { name: "Priya Shah", detail: "Calendar conflict · 22 Sep option", tone: "attention" },
      { name: "Thomas Bernard", detail: "Starts after session · follow-up", tone: "attention" },
    ],
    actions: [
      { label: "Ask Claire", prompt: "Ask Claire to decide the two registration exceptions for New Manager Foundations.", primary: true },
      { label: "Open brief", prompt: "Open the registration brief for New Manager Foundations · Paris." },
    ],
  },
  {
    id: "publish",
    listTitle: "Approve and publish",
    subtitle: "11 registrations · 11 invitations",
    due: "Today",
    group: "attention",
    title: "Approve 11 registrations and invitations",
    status: "Approval",
    tone: "attention",
    ref: "ML-REG-DRAFT",
    ready: "11",
    readyNote: "prepared records",
    decide: "1",
    decideNote: "Thomas follow-up",
    state: "Draft ready",
    stateNote: "your approval",
    progress: Math.round((scenario.confirmed / scenario.requested) * 100),
    coverage: [
      { name: "10 managers", detail: `${scenario.mainDate.split(",")[0]} · Paris`, tone: "ok" },
      { name: "Priya Shah", detail: `${scenario.alternativeDate.split(",")[0]} · alternative`, tone: "ok" },
      { name: "Thomas Bernard", detail: "Neocase follow-up · Claire", tone: "attention" },
    ],
    actions: [
      { label: "Review publish", prompt: "Review the draft registrations and invitations for the 11-person New Manager Foundations plan.", primary: true },
      { label: "Keep held", prompt: "Keep the New Manager Foundations invitations held until I approve." },
    ],
  },
  {
    id: "thomas",
    listTitle: "Thomas follow-up hold",
    subtitle: "Later session · NMF-042",
    due: "9 Oct",
    group: "recent",
    title: "Thomas Bernard · hold for later session",
    status: "Open",
    tone: "neutral",
    ref: "NMF-042",
    ready: "0",
    readyNote: "not registerable yet",
    decide: "1",
    decideNote: "Claire owns route",
    state: "Follow-up",
    stateNote: "no invite yet",
    coverage: [{ name: "Thomas Bernard", detail: "Earliest option 9 October · after deadline", tone: "attention" }],
    actions: [{ label: "Ask Assistant", prompt: "Summarise the Thomas Bernard follow-up hold for New Manager Foundations.", primary: true }],
  },
  {
    id: "risk",
    listTitle: "Risk & Conduct batch",
    subtitle: "48 digital · awaiting plan",
    due: "31 Oct",
    group: "recent",
    title: "Risk & Conduct · registration package",
    status: "Waiting",
    tone: "neutral",
    ref: "RCR-118",
    ready: "—",
    readyNote: "plan not published",
    decide: "0",
    decideNote: "no check yet",
    state: "Queued",
    stateNote: "from Amélie",
    coverage: [{ name: "Package", detail: "Awaiting published session from Training Coordination", tone: "neutral" }],
    actions: [{ label: "Ask Assistant", prompt: "What is the status of the Risk & Conduct registration package?" }],
  },
  {
    id: "cyber",
    listTitle: "Cyber awareness invites",
    subtitle: "15 confirmed · sent",
    due: "15 Dec",
    group: "recent",
    title: "Cyber awareness · invitations complete",
    status: "Done",
    tone: "ok",
    ref: "CYB-091",
    ready: "15",
    readyNote: "confirmed",
    decide: "0",
    decideNote: "none open",
    state: "Published",
    stateNote: "evidence retained",
    coverage: [{ name: "15 people", detail: "Registrations and invitations matched", tone: "ok" }],
    actions: [{ label: "Ask Assistant", prompt: "Summarise the Cyber awareness invitation batch." }],
  },
  {
    id: "client",
    listTitle: "Client-facing conduct",
    subtitle: "9 classroom · confirmed",
    due: "12 Nov",
    group: "recent",
    title: "Client-facing conduct · places confirmed",
    status: "Done",
    tone: "ok",
    ref: "CFC-077",
    ready: "9",
    readyNote: "registered",
    decide: "0",
    decideNote: "none open",
    state: "Published",
    stateNote: "invites sent",
    coverage: [{ name: "9 people", detail: "Classroom places confirmed", tone: "ok" }],
    actions: [{ label: "Ask Assistant", prompt: "Help me prepare a change for Client-facing conduct registrations." }],
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "attention", label: "Needs you" },
  { key: "draft", label: "Held" },
  { key: "done", label: "Done" },
];

function matchesFilter(item: QueueItem, filter: FilterKey) {
  if (filter === "all") return true;
  if (filter === "attention") return item.tone === "attention";
  if (filter === "done") return item.tone === "ok";
  return item.tone === "neutral";
}

export function RaduOperations({ onAskAssistant }: Props) {
  const [selected, setSelected] = useState<ItemId>("nmf");
  const [filter, setFilter] = useState<FilterKey>("all");
  const item = catalogue.find((entry) => entry.id === selected) ?? catalogue[0];
  const visible = useMemo(() => catalogue.filter((entry) => matchesFilter(entry, filter)), [filter]);
  const attention = visible.filter((entry) => entry.group === "attention");
  const recent = visible.filter((entry) => entry.group === "recent");

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Operations"
        tags={["6 packages", "2 need you"]}
        menuLabel="Operations options"
        menuItems={[
          {
            label: "Prepare registrations",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("Prepare registrations for an approved session."),
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
              <span>Package</span>
              <span>Status</span>
              <span className="text-right">Due</span>
            </div>

            {attention.length > 0 && (
              <>
                <p className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Needs your attention</p>
                {attention.map((entry) => (
                  <QueueRow key={entry.id} item={entry} active={selected === entry.id} onClick={() => setSelected(entry.id)} />
                ))}
              </>
            )}

            {recent.length > 0 && (
              <>
                <p className="px-4 pb-1 pt-5 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Recent packages</p>
                {recent.map((entry) => (
                  <QueueRow key={entry.id} item={entry} active={selected === entry.id} onClick={() => setSelected(entry.id)} />
                ))}
              </>
            )}

            {visible.length === 0 && <p className="px-4 py-8 text-sm text-[var(--muted)]">No packages match this filter.</p>}
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
                  onClick={() => onAskAssistant(action.prompt)}
                  className={
                    action.primary
                      ? "sg-btn sg-btn-ink"
                      : "sg-btn sg-btn-secondary"
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
              <p className="sg-meta-label">Ready</p>
              <p className="sg-meta-value">{item.ready}</p>
              <p className="sg-meta-note">{item.readyNote}</p>
            </div>
            <div className="sg-meta-cell">
              <p className="sg-meta-label">Decide</p>
              <p className={`sg-meta-value ${item.tone === "attention" ? "text-[var(--sg-red)]" : ""}`}>{item.decide}</p>
              <p className="sg-meta-note">{item.decideNote}</p>
            </div>
            <div className="sg-meta-cell">
              <p className="sg-meta-label">State</p>
              <p className="sg-meta-value">{item.state}</p>
              <p className="sg-meta-note">{item.stateNote}</p>
            </div>
          </div>

          {typeof item.progress === "number" && (
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--ink)]">Check progress</p>
                <p className="text-sm font-bold text-[var(--ink)]">{item.progress}%</p>
              </div>
              <div className="sg-progress mt-3" aria-label={`Check progress ${item.progress} percent`}>
                <div className="sg-progress-fill" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="sg-meta-label">Coverage</p>
            <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {item.coverage.map((row) => (
                <div key={row.name} className="flex items-start gap-3 py-3">
                  {row.tone === "attention" ? (
                    <CircleAlert size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--sg-red)]" />
                  ) : row.tone === "ok" ? (
                    <CheckCircle2 size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--ink)]" />
                  ) : (
                    <CheckCircle2 size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--muted)]" />
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

          <p className="mt-8 text-sm leading-6 text-[var(--muted)]">You · Claire · Elena</p>
        </section>
      </div>
    </div>
  );
}

function QueueRow({ item, active, onClick }: { item: QueueItem; active: boolean; onClick: () => void }) {
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
