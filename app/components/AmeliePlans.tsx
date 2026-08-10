"use client";

import { useMemo, useState } from "react";
import { Bot, CheckCircle2, CircleAlert } from "lucide-react";
import { scenario } from "../data/scenario";
import { statusClass, type StatusTone } from "./SgCharts";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };
type ItemId = "nmf" | "risk" | "deputies" | "cyber" | "graduates" | "client";
type FilterKey = "all" | "attention" | "progress" | "done";

type PlanItem = {
  id: ItemId;
  listTitle: string;
  subtitle: string;
  due: string;
  group: "attention" | "recent";
  title: string;
  status: string;
  tone: StatusTone;
  ref: string;
  seats: string;
  seatsNote: string;
  people: string;
  peopleNote: string;
  state: string;
  stateNote: string;
  checks: { name: string; detail: string; tone: StatusTone }[];
  actions: { label: string; prompt: string; primary?: boolean }[];
  fill?: number;
};

const catalogue: PlanItem[] = [
  {
    id: "nmf",
    listTitle: "Claire · NMF cohort",
    subtitle: "12 managers · Paris classroom",
    due: "30 Sep",
    group: "attention",
    title: "New Manager Foundations · session plan",
    status: "Ready to publish",
    tone: "attention",
    ref: scenario.sessionRef,
    seats: String(scenario.capacity),
    seatsNote: "proposed seats",
    people: String(scenario.requested),
    peopleNote: "from Claire",
    state: "Feasible",
    stateNote: "your approval",
    fill: Math.round((scenario.requested / scenario.capacity) * 100),
    checks: [
      { name: "Curriculum", detail: "Mandatory path matched", tone: "ok" },
      { name: "Trainer", detail: scenario.trainer, tone: "ok" },
      { name: "Room", detail: `${scenario.location.split(" Learning")[0]} · ${scenario.capacity} seats`, tone: "ok" },
      { name: "Deadline", detail: "18 Sep inside 30 Sep window", tone: "ok" },
    ],
    actions: [
      { label: "Approve plan", prompt: "Approve the session plan for Claire’s New Manager Foundations cohort.", primary: true },
      { label: "Open checklist", prompt: "Open the planning checklist for the Paris new-manager programme." },
    ],
  },
  {
    id: "risk",
    listTitle: "Risk & Conduct refresh",
    subtitle: "48 employees · digital",
    due: "31 Oct",
    group: "recent",
    title: "Risk & Conduct · digital plan",
    status: "In review",
    tone: "neutral",
    ref: "RCR-118",
    seats: "—",
    seatsNote: "self-paced",
    people: "48",
    peopleNote: "requested",
    state: "Checking",
    stateNote: "capacity",
    checks: [
      { name: "Curriculum", detail: "Annual refresh path", tone: "ok" },
      { name: "Capacity", detail: "Digital seats unconstrained", tone: "ok" },
      { name: "Deadline", detail: "Window under review", tone: "neutral" },
    ],
    actions: [{ label: "Ask Assistant", prompt: "Help me complete the Risk & Conduct digital plan.", primary: true }],
  },
  {
    id: "deputies",
    listTitle: "Markets deputies",
    subtitle: "6 deputies · classroom",
    due: "20 Oct",
    group: "recent",
    title: "Leadership essentials · Markets deputies",
    status: "Draft",
    tone: "neutral",
    ref: "LED-206",
    seats: "12",
    seatsNote: "room options",
    people: "6",
    peopleNote: "requested",
    state: "Preparing",
    stateNote: "trainer search",
    fill: 50,
    checks: [
      { name: "Curriculum", detail: "Leadership essentials", tone: "ok" },
      { name: "Room", detail: "Two Paris options shortlisted", tone: "neutral" },
      { name: "Trainer", detail: "Preference not confirmed", tone: "attention" },
    ],
    actions: [{ label: "Ask Assistant", prompt: "Resolve the trainer conflict for Markets deputies leadership essentials.", primary: true }],
  },
  {
    id: "cyber",
    listTitle: "Cyber awareness",
    subtitle: "15 people · published",
    due: "15 Dec",
    group: "recent",
    title: "Cyber awareness · published to ops",
    status: "Handed off",
    tone: "ok",
    ref: "CYB-091",
    seats: "—",
    seatsNote: "digital",
    people: "15",
    peopleNote: "with Radu",
    state: "Published",
    stateNote: "ops package",
    checks: [{ name: "Package", detail: "Sent to Learning Operations", tone: "ok" }],
    actions: [{ label: "Ask Assistant", prompt: "Summarise the Cyber awareness plan hand-off to Radu." }],
  },
  {
    id: "graduates",
    listTitle: "Graduate onboarding",
    subtitle: "8 starters · Paris",
    due: "15 Nov",
    group: "recent",
    title: "Graduate onboarding · demand received",
    status: "Queued",
    tone: "neutral",
    ref: "GRD-014",
    seats: "16",
    seatsNote: "classroom target",
    people: "8",
    peopleNote: "from Claire",
    state: "New",
    stateNote: "not validated",
    fill: 50,
    checks: [
      { name: "Demand", detail: "Claire business request", tone: "ok" },
      { name: "Resources", detail: "Not yet validated", tone: "attention" },
    ],
    actions: [{ label: "Start plan", prompt: "Validate a programme plan for Graduate onboarding learning.", primary: true }],
  },
  {
    id: "client",
    listTitle: "Client-facing conduct",
    subtitle: "9 RM · confirmed",
    due: "12 Nov",
    group: "recent",
    title: "Client-facing conduct · plan complete",
    status: "Done",
    tone: "ok",
    ref: "CFC-077",
    seats: "12",
    seatsNote: "classroom",
    people: "9",
    peopleNote: "confirmed",
    state: "Published",
    stateNote: "with Radu",
    fill: 75,
    checks: [{ name: "Package", detail: "Session published · ops owns places", tone: "ok" }],
    actions: [{ label: "Ask Assistant", prompt: "Help me prepare a change to the Client-facing conduct session plan." }],
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "attention", label: "Needs you" },
  { key: "progress", label: "In progress" },
  { key: "done", label: "Done" },
];

function matchesFilter(item: PlanItem, filter: FilterKey) {
  if (filter === "all") return true;
  if (filter === "attention") return item.tone === "attention";
  if (filter === "done") return item.tone === "ok";
  return item.tone === "neutral";
}

export function AmeliePlans({ onAskAssistant }: Props) {
  const [selected, setSelected] = useState<ItemId>("nmf");
  const [filter, setFilter] = useState<FilterKey>("all");
  const item = catalogue.find((entry) => entry.id === selected) ?? catalogue[0];
  const visible = useMemo(() => catalogue.filter((entry) => matchesFilter(entry, filter)), [filter]);
  const attention = visible.filter((entry) => entry.group === "attention");
  const recent = visible.filter((entry) => entry.group === "recent");

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Plans"
        tags={["6 programmes", "1 needs you"]}
        menuLabel="Plan options"
        menuItems={[
          {
            label: "Plan a programme",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("Validate a programme plan for a new cohort."),
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
              <span>Plan</span>
              <span>Status</span>
              <span className="text-right">Due</span>
            </div>

            {attention.length > 0 && (
              <>
                <p className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Needs your attention</p>
                {attention.map((entry) => (
                  <PlanRow key={entry.id} item={entry} active={selected === entry.id} onClick={() => setSelected(entry.id)} />
                ))}
              </>
            )}

            {recent.length > 0 && (
              <>
                <p className="px-4 pb-1 pt-5 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Recent plans</p>
                {recent.map((entry) => (
                  <PlanRow key={entry.id} item={entry} active={selected === entry.id} onClick={() => setSelected(entry.id)} />
                ))}
              </>
            )}

            {visible.length === 0 && <p className="px-4 py-8 text-sm text-[var(--muted)]">No plans match this filter.</p>}
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
              <p className="sg-meta-label">People</p>
              <p className="sg-meta-value">{item.people}</p>
              <p className="sg-meta-note">{item.peopleNote}</p>
            </div>
            <div className="sg-meta-cell">
              <p className="sg-meta-label">Seats</p>
              <p className="sg-meta-value">{item.seats}</p>
              <p className="sg-meta-note">{item.seatsNote}</p>
            </div>
            <div className="sg-meta-cell">
              <p className="sg-meta-label">State</p>
              <p className={`sg-meta-value ${item.tone === "attention" ? "text-[var(--sg-red)]" : ""}`}>{item.state}</p>
              <p className="sg-meta-note">{item.stateNote}</p>
            </div>
          </div>

          {typeof item.fill === "number" && (
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--ink)]">Seat fill</p>
                <p className="text-sm font-bold text-[var(--ink)]">{item.fill}%</p>
              </div>
              <div className="sg-progress mt-3" aria-label={`Seat fill ${item.fill} percent`}>
                <div className="sg-progress-fill" style={{ width: `${item.fill}%` }} />
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="sg-meta-label">Feasibility</p>
            <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {item.checks.map((row) => (
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

          <p className="mt-8 text-sm leading-6 text-[var(--muted)]">Claire · You · Radu</p>
        </section>
      </div>
    </div>
  );
}

function PlanRow({ item, active, onClick }: { item: PlanItem; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`sg-list-row grid grid-cols-[minmax(0,1fr)_7.5rem_4.5rem] items-start gap-3 ${active ? "sg-list-row-active" : ""}`}>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-[var(--ink)]">{item.listTitle}</span>
        <span className="mt-1.5 block truncate text-xs leading-5 text-[var(--muted)]">{item.subtitle}</span>
      </span>
      <span className="pt-0.5">
        <span className={statusClass(item.tone)}>{item.status === "Ready to publish" ? "Publish" : item.status}</span>
      </span>
      <span className="pt-0.5 text-right text-xs font-semibold text-[var(--ink)]">{item.due}</span>
    </button>
  );
}
