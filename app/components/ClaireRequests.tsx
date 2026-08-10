"use client";

import { useState } from "react";
import { ArrowRight, Bot, CalendarDays, CheckCircle2, CircleAlert, Clock3, Users } from "lucide-react";
import { scenario } from "../data/scenario";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };
type RequestId = "team" | "thomas" | "risk" | "deputies" | "cyber" | "graduates" | "client";

type RequestMeta = {
  title: string;
  status: string;
  tone: "good" | "warn" | "neutral";
  summary: string;
  people: string;
  deadline: string;
  state: string;
  next: string;
};

const requests: Record<RequestId, RequestMeta> = {
  team: {
    title: "New Manager Foundations for my team",
    status: "Follow-up required",
    tone: "warn",
    summary: "12 managers · Paris classroom · before 30 September",
    people: "12",
    deadline: "30 Sep",
    state: "Follow-up",
    next: "Choose Thomas’s later-session route so Learning Operations can finish the last person.",
  },
  thomas: {
    title: "Thomas Bernard — later-session choice",
    status: "Decision needed",
    tone: "warn",
    summary: "Linked to NMF-042 · after the requested deadline",
    people: "1",
    deadline: "9 Oct",
    state: "Decision",
    next: "Compare later-session options and confirm the acceptable business trade-off.",
  },
  risk: {
    title: "Risk & Conduct annual refresh",
    status: "Planning",
    tone: "neutral",
    summary: "48 employees in your Paris organisation · digital · due 31 October",
    people: "48",
    deadline: "31 Oct",
    state: "In review",
    next: "Training Coordination is checking curriculum fit and capacity before returning a plan for your confirmation.",
  },
  deputies: {
    title: "Leadership essentials for Markets deputies",
    status: "Awaiting plan",
    tone: "neutral",
    summary: "6 newly appointed deputies · Paris classroom preferred · before 20 October",
    people: "6",
    deadline: "20 Oct",
    state: "Submitted",
    next: "A feasible classroom option is being prepared. You will only return if a business trade-off is needed.",
  },
  cyber: {
    title: "Cyber awareness for my direct reports",
    status: "On track",
    tone: "good",
    summary: "15 direct reports · mandatory digital module · due 15 December",
    people: "15",
    deadline: "15 Dec",
    state: "Confirmed",
    next: "All 15 people have a confirmed learning path. No business decision is needed from you.",
  },
  graduates: {
    title: "Graduate onboarding learning",
    status: "Draft",
    tone: "neutral",
    summary: "8 new starters joining your organisation · Paris · due 15 November",
    people: "8",
    deadline: "15 Nov",
    state: "Draft",
    next: "Finish the cohort details, then send this business need to Training Coordination for feasibility checks.",
  },
  client: {
    title: "Client-facing conduct for relationship managers",
    status: "Confirmed",
    tone: "good",
    summary: "9 relationship managers · classroom · completed planning",
    people: "9",
    deadline: "12 Nov",
    state: "Confirmed",
    next: "Learning Operations has the confirmed places. Ask the assistant only if you need a change.",
  },
};

export function ClaireRequests({ onAskAssistant }: Props) {
  const [selected, setSelected] = useState<RequestId>("team");
  const request = requests[selected];

  return (
    <div className="flex min-h-full w-full flex-col bg-white">
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

      <div className="grid min-h-0 w-full flex-1 lg:grid-cols-[minmax(280px,34%)_minmax(0,1fr)]">
        <section className="border-b border-zinc-200 bg-[#f7f7f6] lg:border-b-0 lg:border-r">
          <div className="space-y-2 px-4 py-4 md:px-5">
            <p className="px-1 pb-1 text-[11px] font-bold uppercase tracking-[.14em] text-zinc-500">Needs your attention</p>
            <RequestRow
              active={selected === "team"}
              title="Team mandatory learning"
              detail={`${scenario.confirmed} confirmed · 1 follow-up`}
              meta="NMF-042 · Updated today"
              badge="1 action"
              badgeTone="warn"
              onClick={() => setSelected("team")}
            />
            <RequestRow
              active={selected === "thomas"}
              title="Thomas Bernard"
              detail="Later-session business choice"
              meta="Linked to NMF-042"
              badge="Decision needed"
              badgeTone="warn"
              onClick={() => setSelected("thomas")}
            />

            <p className="px-1 pb-1 pt-4 text-[11px] font-bold uppercase tracking-[.14em] text-zinc-500">Recent requests</p>
            <RequestRow
              active={selected === "risk"}
              title="Risk & Conduct refresh"
              detail="48 employees · digital learning"
              meta="Updated yesterday"
              badge="Planning"
              onClick={() => setSelected("risk")}
            />
            <RequestRow
              active={selected === "deputies"}
              title="Markets deputies leadership"
              detail="6 deputies · Paris classroom"
              meta="Submitted 2 days ago"
              badge="Awaiting plan"
              onClick={() => setSelected("deputies")}
            />
            <RequestRow
              active={selected === "cyber"}
              title="Cyber awareness · direct reports"
              detail="15 people · mandatory digital"
              meta="Confirmed last week"
              badge="On track"
              badgeTone="good"
              onClick={() => setSelected("cyber")}
            />
            <RequestRow
              active={selected === "graduates"}
              title="Graduate onboarding"
              detail="8 new starters · Paris"
              meta="Draft · created today"
              badge="Draft"
              onClick={() => setSelected("graduates")}
            />
            <RequestRow
              active={selected === "client"}
              title="Client-facing conduct"
              detail="9 relationship managers"
              meta="Confirmed · 12 November"
              badge="Confirmed"
              badgeTone="good"
              onClick={() => setSelected("client")}
            />
          </div>
        </section>

        <section className="min-w-0 px-5 py-5 md:px-8 md:py-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">{request.title}</h2>
              <p className="mt-1.5 text-sm text-zinc-600">{request.summary}</p>
            </div>
            <Status tone={request.tone}>{request.status}</Status>
          </div>

          {selected === "team" ? (
            <TeamDetail onAskAssistant={onAskAssistant} onOpenThomas={() => setSelected("thomas")} />
          ) : selected === "thomas" ? (
            <ThomasDetail onAskAssistant={onAskAssistant} />
          ) : (
            <OtherRequestDetail request={request} onAskAssistant={onAskAssistant} />
          )}
        </section>
      </div>
    </div>
  );
}

function RequestRow({
  active,
  title,
  detail,
  meta,
  badge,
  badgeTone = "neutral",
  onClick,
}: {
  active: boolean;
  title: string;
  detail: string;
  meta: string;
  badge: string;
  badgeTone?: "good" | "warn" | "neutral";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border px-3.5 py-3 text-left transition duration-200 ease-out motion-reduce:transition-none ${
        active
          ? "border-zinc-300 bg-white shadow-[0_1px_0_rgba(15,23,42,.04)] ring-1 ring-[rgba(233,4,30,.18)]"
          : "border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-[#f0f1f2]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-bold text-zinc-900">{title}</span>
        <Status tone={badgeTone}>{badge}</Status>
      </div>
      <p className="mt-1.5 text-sm text-zinc-600">{detail}</p>
      <p className="mt-2 text-xs font-semibold text-zinc-500">{meta}</p>
    </button>
  );
}

const Status = ({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "good" | "warn" | "neutral" }) => (
  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${tone === "good" ? "bg-emerald-50 text-emerald-700" : tone === "warn" ? "bg-amber-50 text-amber-800" : "bg-zinc-100 text-zinc-600"}`}>{children}</span>
);

function TeamDetail({ onAskAssistant, onOpenThomas }: Props & { onOpenThomas: () => void }) {
  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Fact icon={<Users size={17} />} value={`${scenario.confirmed} / ${scenario.requested}`} label="people on a learning path" tone="good" />
        <Fact icon={<CalendarDays size={17} />} value="18 Sep" label="main session for 10 managers" />
        <Fact icon={<CircleAlert size={17} />} value="1" label="choice still with you" tone="warn" />
      </div>

      <div className="mt-5 rounded-xl bg-zinc-50 px-4 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-zinc-900">Team coverage before 30 September</p>
          <p className="text-sm font-bold text-emerald-700">11 of 12</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200" aria-label="11 of 12 people have a confirmed learning path">
          <div className="h-full w-[92%] rounded-full bg-emerald-500 transition-[width] duration-300 ease-out motion-reduce:transition-none" />
        </div>
        <p className="mt-2.5 text-xs leading-5 text-zinc-600">Most of the cohort is confirmed. One person still needs your business decision before Learning Operations can finish.</p>
      </div>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-bold text-zinc-900">Thomas needs a later-session choice</p>
            <p className="mt-1.5 text-sm leading-6 text-zinc-700">
              He starts on 21 September, so the 18 September session does not work. The earliest suitable option is 9 October — after your requested deadline.
            </p>
          </div>
          <Status tone="warn">Your decision</Status>
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            onClick={() => onAskAssistant("Help me choose a later session for Thomas Bernard and explain the impact on my team deadline.")}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3.5 py-2.5 text-sm font-bold text-white hover:bg-zinc-800"
          >
            <Bot size={15} /> Review options with Assistant
          </button>
          <button onClick={onOpenThomas} className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-bold text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50">
            Open decision <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-zinc-500">Who is covered</p>
        <div className="mt-3 space-y-2.5">
          <PersonRow tone="good" name="10 managers" detail="Confirmed for 18 September · Paris" />
          <PersonRow tone="good" name="Priya Shah" detail="Confirmed for 22 September · alternative session" />
          <PersonRow tone="warn" name="Thomas Bernard" detail="Later-session choice still with you" />
        </div>
      </div>

      <p className="mt-6 rounded-xl bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-600">
        You own the business need and any trade-off. Training Coordination owns the feasible plan; Learning Operations owns registrations and invitations after approval.
      </p>
    </>
  );
}

function ThomasDetail({ onAskAssistant }: Props) {
  return (
    <>
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
        <p className="font-bold text-zinc-900">What you need to decide</p>
        <p className="mt-2 text-sm leading-6 text-zinc-700">
          Choose whether Thomas should take the 9 October option or stay open for another suitable session. This does not change the 11 confirmed registrations already with Learning Operations.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Fact icon={<CalendarDays size={17} />} value="9 Oct" label="earliest suitable option" />
        <Fact icon={<Clock3 size={17} />} value="After deadline" label="impact on 30 September" tone="warn" />
      </div>

      <div className="mt-5 rounded-xl border border-zinc-200 p-4">
        <p className="text-sm font-bold text-zinc-900">Recommended next step</p>
        <p className="mt-1.5 text-sm leading-6 text-zinc-600">
          Ask the assistant to compare later-session options, team coverage and deadline impact. You remain the named owner of the choice.
        </p>
        <button
          onClick={() => onAskAssistant("Compare the later-session options for Thomas Bernard, including deadline and team coverage impact.")}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--sg-red)] px-3.5 py-2.5 text-sm font-bold text-white hover:brightness-95"
        >
          <Bot size={15} /> Compare options with Assistant
        </button>
      </div>

      <div className="mt-5 space-y-2.5">
        <PersonRow tone="good" name="Parent request" detail="NMF-042 · 11 people already confirmed" />
        <PersonRow tone="neutral" name="Why it came back" detail="Thomas starts on 21 September and cannot attend 18 September" />
      </div>
    </>
  );
}

function OtherRequestDetail({ request, onAskAssistant }: { request: RequestMeta; onAskAssistant: (prompt: string) => void }) {
  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Fact icon={<Users size={17} />} value={request.people} label="people requested" tone={request.tone === "good" ? "good" : undefined} />
        <Fact icon={<CalendarDays size={17} />} value={request.deadline} label="requested deadline" />
        <Fact icon={<Clock3 size={17} />} value={request.state} label="current state" tone={request.tone === "warn" ? "warn" : undefined} />
      </div>

      <div className="mt-5 rounded-xl bg-zinc-50 p-4">
        <p className="text-sm font-bold text-zinc-900">What happens next</p>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{request.next}</p>
        <button
          onClick={() => onAskAssistant(`Help me prepare the next step for ${request.title}.`)}
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--sg-red)] hover:underline"
        >
          Ask Assistant <ArrowRight size={15} />
        </button>
      </div>

      <p className="mt-5 text-sm leading-6 text-zinc-600">
        You set the business need and confirm trade-offs. You do not approve rooms, trainers or registration rules.
      </p>
    </>
  );
}

function Fact({ icon, value, label, tone }: { icon: React.ReactNode; value: string; label: string; tone?: "good" | "warn" }) {
  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
      <span className={tone === "good" ? "text-emerald-600" : tone === "warn" ? "text-amber-600" : "text-[var(--sg-red)]"}>{icon}</span>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-semibold text-zinc-500">{label}</p>
    </div>
  );
}

function PersonRow({ name, detail, tone }: { name: string; detail: string; tone: "good" | "warn" | "neutral" }) {
  const icon =
    tone === "good" ? <CheckCircle2 size={15} className="text-emerald-600" /> :
    tone === "warn" ? <CircleAlert size={15} className="text-amber-600" /> :
    <Clock3 size={15} className="text-zinc-500" />;
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-zinc-100 bg-zinc-50/80 px-3.5 py-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p className="text-sm leading-5 text-zinc-600">
        <span className="font-bold text-zinc-900">{name}</span>
        <span className="text-zinc-400"> · </span>
        {detail}
      </p>
    </div>
  );
}
