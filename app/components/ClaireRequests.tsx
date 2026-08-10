"use client";

import { useMemo, useState } from "react";
import { Bot, CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import { scenario } from "../data/scenario";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };
type RequestId = "team" | "thomas" | "risk" | "deputies" | "cyber" | "graduates" | "client";
type StatusTone = "ok" | "attention" | "neutral";
type FilterKey = "all" | "attention" | "progress" | "confirmed";

type RequestItem = {
  id: RequestId;
  listTitle: string;
  subtitle: string;
  due: string;
  group: "attention" | "recent";
  title: string;
  status: string;
  tone: StatusTone;
  summary: string;
  ref: string;
  people: string;
  peopleNote: string;
  deadline: string;
  deadlineNote: string;
  state: string;
  stateNote: string;
  next: string;
  actions: { label: string; prompt: string; primary?: boolean }[];
  coverage?: { name: string; detail: string; tone: StatusTone }[];
};

const catalogue: RequestItem[] = [
  {
    id: "team",
    listTitle: "Team mandatory learning",
    subtitle: "12 managers · Paris classroom",
    due: "30 Sep",
    group: "attention",
    title: "New Manager Foundations for my team",
    status: "Follow-up required",
    tone: "attention",
    summary: "Mandatory learning for new Paris managers before 30 September.",
    ref: "NMF-042",
    people: "11 / 12",
    peopleNote: "on a learning path",
    deadline: "30 Sep",
    deadlineNote: "requested deadline",
    state: "1 open",
    stateNote: "business decision with you",
    next: "Choose Thomas’s later-session route so Learning Operations can finish the last person.",
    actions: [
      { label: "Review options", prompt: "Help me choose a later session for Thomas Bernard and explain the impact on my team deadline.", primary: true },
      { label: "Open decision", prompt: "Show me the later-session choice for Thomas Bernard." },
      { label: "Request a change", prompt: "I need to request a change to New Manager Foundations for my team." },
    ],
    coverage: [
      { name: "10 managers", detail: "18 September · Paris", tone: "ok" },
      { name: "Priya Shah", detail: "22 September · alternative", tone: "ok" },
      { name: "Thomas Bernard", detail: "Later-session choice needed", tone: "attention" },
    ],
  },
  {
    id: "thomas",
    listTitle: "Thomas Bernard",
    subtitle: "Later-session choice · NMF-042",
    due: "9 Oct",
    group: "attention",
    title: "Thomas Bernard — later-session choice",
    status: "Decision needed",
    tone: "attention",
    summary: "Linked follow-up from NMF-042. Earliest option is after the requested deadline.",
    ref: "NMF-042",
    people: "1",
    peopleNote: "person awaiting choice",
    deadline: "9 Oct",
    deadlineNote: "earliest suitable option",
    state: "After deadline",
    stateNote: "impact on 30 September",
    next: "Compare later-session options and confirm the acceptable business trade-off. This does not change the 11 confirmed registrations.",
    actions: [
      { label: "Compare options", prompt: "Compare the later-session options for Thomas Bernard, including deadline and team coverage impact.", primary: true },
      { label: "Keep open", prompt: "Keep Thomas Bernard open for another suitable session." },
    ],
  },
  {
    id: "risk",
    listTitle: "Risk & Conduct refresh",
    subtitle: "48 employees · digital",
    due: "31 Oct",
    group: "recent",
    title: "Risk & Conduct annual refresh",
    status: "Planning",
    tone: "neutral",
    summary: "Annual digital refresh for employees in your Paris organisation.",
    ref: "RCR-118",
    people: "48",
    peopleNote: "people requested",
    deadline: "31 Oct",
    deadlineNote: "requested deadline",
    state: "In review",
    stateNote: "with Training Coordination",
    next: "Training Coordination is checking curriculum fit and capacity before returning a plan for your confirmation.",
    actions: [
      { label: "Ask Assistant", prompt: "Help me prepare the next step for Risk & Conduct annual refresh.", primary: true },
    ],
  },
  {
    id: "deputies",
    listTitle: "Markets deputies leadership",
    subtitle: "6 deputies · Paris classroom",
    due: "20 Oct",
    group: "recent",
    title: "Leadership essentials for Markets deputies",
    status: "Awaiting plan",
    tone: "neutral",
    summary: "Classroom preference for newly appointed Markets deputies.",
    ref: "LED-206",
    people: "6",
    peopleNote: "people requested",
    deadline: "20 Oct",
    deadlineNote: "requested deadline",
    state: "Submitted",
    stateNote: "plan being prepared",
    next: "A feasible classroom option is being prepared. You will only return if a business trade-off is needed.",
    actions: [
      { label: "Ask Assistant", prompt: "Help me prepare the next step for Leadership essentials for Markets deputies.", primary: true },
    ],
  },
  {
    id: "cyber",
    listTitle: "Cyber awareness",
    subtitle: "15 direct reports · digital",
    due: "15 Dec",
    group: "recent",
    title: "Cyber awareness for my direct reports",
    status: "On track",
    tone: "ok",
    summary: "Mandatory digital module for your direct reports.",
    ref: "CYB-091",
    people: "15",
    peopleNote: "people confirmed",
    deadline: "15 Dec",
    deadlineNote: "requested deadline",
    state: "Confirmed",
    stateNote: "no action needed",
    next: "All 15 people have a confirmed learning path. No business decision is needed from you.",
    actions: [
      { label: "Ask Assistant", prompt: "Summarise progress for Cyber awareness for my direct reports." },
    ],
  },
  {
    id: "graduates",
    listTitle: "Graduate onboarding",
    subtitle: "8 new starters · Paris",
    due: "15 Nov",
    group: "recent",
    title: "Graduate onboarding learning",
    status: "Draft",
    tone: "neutral",
    summary: "Learning need for new starters joining your organisation.",
    ref: "GRD-014",
    people: "8",
    peopleNote: "people requested",
    deadline: "15 Nov",
    deadlineNote: "requested deadline",
    state: "Draft",
    stateNote: "not yet submitted",
    next: "Finish the cohort details, then send this business need to Training Coordination for feasibility checks.",
    actions: [
      { label: "Continue draft", prompt: "Help me finish Graduate onboarding learning and prepare it for Training Coordination.", primary: true },
    ],
  },
  {
    id: "client",
    listTitle: "Client-facing conduct",
    subtitle: "9 relationship managers",
    due: "12 Nov",
    group: "recent",
    title: "Client-facing conduct for relationship managers",
    status: "Confirmed",
    tone: "ok",
    summary: "Classroom learning places confirmed for relationship managers.",
    ref: "CFC-077",
    people: "9",
    peopleNote: "people confirmed",
    deadline: "12 Nov",
    deadlineNote: "session date",
    state: "Confirmed",
    stateNote: "with Learning Operations",
    next: "Learning Operations has the confirmed places. Ask the assistant only if you need a change.",
    actions: [
      { label: "Ask Assistant", prompt: "Help me prepare a change for Client-facing conduct for relationship managers." },
    ],
  },
];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "attention", label: "Needs you" },
  { key: "progress", label: "In progress" },
  { key: "confirmed", label: "Confirmed" },
];

function statusClass(tone: StatusTone) {
  if (tone === "attention") return "sg-status sg-status-attention";
  if (tone === "ok") return "sg-status sg-status-ok";
  return "sg-status sg-status-neutral";
}

function matchesFilter(item: RequestItem, filter: FilterKey) {
  if (filter === "all") return true;
  if (filter === "attention") return item.tone === "attention";
  if (filter === "confirmed") return item.tone === "ok";
  return item.tone === "neutral";
}

export function ClaireRequests({ onAskAssistant }: Props) {
  const [selected, setSelected] = useState<RequestId>("team");
  const [filter, setFilter] = useState<FilterKey>("all");
  const request = catalogue.find((item) => item.id === selected) ?? catalogue[0];
  const visible = useMemo(() => catalogue.filter((item) => matchesFilter(item, filter)), [filter]);
  const attention = visible.filter((item) => item.group === "attention");
  const recent = visible.filter((item) => item.group === "recent");

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="My requests"
        tags={["7 open", "2 need you"]}
        menuLabel="Request options"
        menuItems={[
          {
            label: "Prepare a request",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("I need to create a learning request for my team."),
          },
        ]}
      />

      <div className="grid min-h-0 w-full flex-1 lg:grid-cols-[minmax(320px,38%)_minmax(0,1fr)]">
        <section className="flex min-h-0 flex-col border-b border-[var(--line)] bg-white lg:border-b-0 lg:border-r">
          <div className="shrink-0 border-b border-[var(--line)] px-4 py-3">
            <div className="flex flex-wrap gap-1.5">
              {filters.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`sg-filter ${filter === item.key ? "sg-filter-active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="scrollbar min-h-0 flex-1 overflow-y-auto px-2 py-3 md:px-3">
            <div className="sg-table-head mb-1">
              <span>Request</span>
              <span>Status</span>
              <span className="text-right">Due</span>
            </div>

            {attention.length > 0 && (
              <>
                <p className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Needs your attention</p>
                {attention.map((item) => (
                  <RequestRow key={item.id} item={item} active={selected === item.id} onClick={() => setSelected(item.id)} />
                ))}
              </>
            )}

            {recent.length > 0 && (
              <>
                <p className="px-4 pb-1 pt-5 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)]">Recent requests</p>
                {recent.map((item) => (
                  <RequestRow key={item.id} item={item} active={selected === item.id} onClick={() => setSelected(item.id)} />
                ))}
              </>
            )}

            {visible.length === 0 && (
              <p className="px-4 py-8 text-sm text-[var(--muted)]">No requests match this filter.</p>
            )}
          </div>
        </section>

        <section className="scrollbar min-h-0 overflow-y-auto bg-white px-5 py-5 md:px-8 md:py-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div className="min-w-0 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">{request.title}</h2>
                <span className={statusClass(request.tone)}>{request.status}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{request.summary}</p>
              <p className="mt-2 text-xs font-semibold text-zinc-500">{request.ref}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {request.actions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    if (action.label === "Open decision") {
                      setSelected("thomas");
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
              <p className="sg-meta-label">People</p>
              <p className="sg-meta-value">{request.people}</p>
              <p className="sg-meta-note">{request.peopleNote}</p>
            </div>
            <div className="sg-meta-cell">
              <p className="sg-meta-label">Deadline</p>
              <p className="sg-meta-value">{request.deadline}</p>
              <p className="sg-meta-note">{request.deadlineNote}</p>
            </div>
            <div className="sg-meta-cell">
              <p className="sg-meta-label">State</p>
              <p className={`sg-meta-value ${request.tone === "attention" ? "text-[var(--sg-red)]" : ""}`}>{request.state}</p>
              <p className="sg-meta-note">{request.stateNote}</p>
            </div>
          </div>

          {request.id === "team" && (
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--ink)]">Coverage before 30 September</p>
                <p className="text-sm font-bold text-[var(--ink)]">{scenario.confirmed} of {scenario.requested}</p>
              </div>
              <div className="sg-progress mt-3" aria-label="11 of 12 people have a confirmed learning path">
                <div className="sg-progress-fill" style={{ width: "92%" }} />
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="sg-meta-label">What happens next</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--ink)]">{request.next}</p>
          </div>

          {request.coverage && (
            <div className="mt-6">
              <p className="sg-meta-label">Who is covered</p>
              <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {request.coverage.map((person) => (
                  <div key={person.name} className="flex items-start gap-3 py-3">
                    {person.tone === "attention" ? (
                      <CircleAlert size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--sg-red)]" />
                    ) : (
                      <CheckCircle2 size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--ink)]" />
                    )}
                    <p className="text-sm leading-5 text-[var(--muted)]">
                      <span className="font-bold text-[var(--ink)]">{person.name}</span>
                      <span className="text-zinc-400"> · </span>
                      {person.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mt-8 text-sm leading-6 text-[var(--muted)]">
            You own the business need and any trade-off. Training Coordination owns the feasible plan; Learning Operations owns registrations and invitations after approval.
          </p>
        </section>
      </div>
    </div>
  );
}

function RequestRow({ item, active, onClick }: { item: RequestItem; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`sg-list-row grid grid-cols-[minmax(0,1fr)_7.5rem_4.5rem] items-start gap-3 ${active ? "sg-list-row-active" : ""}`}>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-[var(--ink)]">{item.listTitle}</span>
        <span className="mt-1.5 block truncate text-xs leading-5 text-[var(--muted)]">{item.subtitle}</span>
      </span>
      <span className="pt-0.5">
        <span className={statusClass(item.tone)}>{item.status === "Follow-up required" ? "1 action" : item.status === "Decision needed" ? "Decision" : item.status}</span>
      </span>
      <span className="pt-0.5 text-right text-xs font-semibold text-[var(--ink)]">{item.due}</span>
    </button>
  );
}
