"use client";

import { useState } from "react";
import { ArrowRight, Bot, CalendarDays, CheckCircle2, CircleAlert, ClipboardList, Clock3, FileCheck2, Users } from "lucide-react";
import { scenario } from "../data/scenario";

type Props = { onAskAssistant: (prompt: string) => void };

const Status = ({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "good" | "warn" | "neutral" }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${tone === "good" ? "bg-emerald-50 text-emerald-700" : tone === "warn" ? "bg-amber-50 text-amber-800" : "bg-zinc-100 text-zinc-600"}`}>{children}</span>
);

export function ClaireRequests({ onAskAssistant }: Props) {
  const [selected, setSelected] = useState<"team" | "thomas">("team");
  const isTeam = selected === "team";
  const request = isTeam ? {
    title: "New Manager Foundations for my team",
    description: "12 managers requested · Paris classroom · before 30 September",
    status: "Follow-up required",
    tone: "warn" as const,
  } : {
    title: "Thomas Bernard — later-session choice",
    description: "Linked to NMF-042 · decision needed after the requested deadline",
    status: "Decision needed",
    tone: "warn" as const,
  };

  return <div className="mx-auto max-w-6xl pb-16">
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-3xl font-bold tracking-tight md:text-4xl">My requests</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">Track the learning outcomes you asked for, the decisions still owned by you and the evidence behind each status.</p></div>
      <button onClick={() => onAskAssistant("I need to create a learning request for my team.")} className="inline-flex items-center gap-2 rounded-lg bg-[var(--sg-red)] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-95"><Bot size={16}/> Ask Assistant to prepare a request</button>
    </header>

    <div className="grid gap-5 lg:grid-cols-[.92fr_1.55fr]">
      <section className="rounded-2xl border border-[var(--line)] bg-white p-3 shadow-[0_8px_28px_rgba(20,20,20,.035)]">
        <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[.14em] text-zinc-500">Open items · 2</p>
        <button onClick={() => setSelected("team")} className={`w-full rounded-xl p-4 text-left transition ${isTeam ? "bg-zinc-900 text-white shadow-sm" : "hover:bg-zinc-50"}`}>
          <div className="flex items-start justify-between gap-3"><span className="text-sm font-bold">Team mandatory learning</span><Status tone="warn">1 action</Status></div>
          <p className={`mt-2 text-sm ${isTeam ? "text-zinc-300" : "text-zinc-600"}`}>{scenario.confirmed} confirmed · 1 follow-up</p>
          <p className={`mt-3 text-xs font-semibold ${isTeam ? "text-zinc-400" : "text-zinc-500"}`}>NMF-042 · Updated today</p>
        </button>
        <button onClick={() => setSelected("thomas")} className={`mt-2 w-full rounded-xl p-4 text-left transition ${!isTeam ? "bg-zinc-900 text-white shadow-sm" : "hover:bg-zinc-50"}`}>
          <div className="flex items-start justify-between gap-3"><span className="text-sm font-bold">Thomas Bernard</span><Status tone="warn">Decision needed</Status></div>
          <p className={`mt-2 text-sm ${!isTeam ? "text-zinc-300" : "text-zinc-600"}`}>Later session choice</p>
          <p className={`mt-3 text-xs font-semibold ${!isTeam ? "text-zinc-400" : "text-zinc-500"}`}>Linked to NMF-042</p>
        </button>
        <div className="m-3 mt-5 rounded-xl bg-zinc-50 p-4"><div className="flex items-center gap-2 text-sm font-bold"><ClipboardList size={17} className="text-[var(--sg-red)]"/>How requests work</div><p className="mt-2 text-xs leading-5 text-zinc-600">The assistant prepares and checks. You make the business choices; planning and registration approvals remain with the accountable teams.</p></div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_8px_28px_rgba(20,20,20,.035)] md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-zinc-500">{isTeam ? "Request NMF-042" : "Exception follow-up"}</p><h2 className="mt-2 text-2xl font-bold tracking-tight">{request.title}</h2><p className="mt-2 text-sm text-zinc-600">{request.description}</p></div><Status tone={request.tone}>{request.status}</Status></div>
        {isTeam ? <TeamDetail onAskAssistant={onAskAssistant}/> : <ThomasDetail onAskAssistant={onAskAssistant}/>} 
      </section>
    </div>
  </div>;
}

function TeamDetail({ onAskAssistant }: Props) {
  return <>
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <Stat icon={<Users size={18}/>} value="11 / 12" label="learners confirmed" tone="good"/>
      <Stat icon={<CalendarDays size={18}/>} value="18 Sep" label="main session"/>
      <Stat icon={<CircleAlert size={18}/>} value="1" label="business follow-up" tone="warn"/>
    </div>
    <div className="mt-6 rounded-xl bg-zinc-50 p-4"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-bold">Request progress</p><p className="mt-1 text-xs text-zinc-600">11 of 12 people have a confirmed learning path.</p></div><p className="text-2xl font-bold text-emerald-700">92%</p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200"><div className="h-full w-[92%] rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"/></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div><span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white"><CheckCircle2 size={14}/></span><p className="mt-1 font-semibold">Request</p><p className="text-zinc-500">submitted</p></div><div><span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white"><CheckCircle2 size={14}/></span><p className="mt-1 font-semibold">Plan</p><p className="text-zinc-500">approved</p></div><div><span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white"><Clock3 size={14}/></span><p className="mt-1 font-semibold">Follow-up</p><p className="text-zinc-500">your decision</p></div></div></div>
    <div className="mt-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-bold">Thomas needs a later-session choice</p><p className="mt-1 text-sm leading-6 text-zinc-700">He starts on 21 September and cannot attend the 18 September session. The earliest available alternative is 9 October, after your requested deadline.</p></div><Status tone="warn">Your decision</Status></div><button onClick={() => onAskAssistant("Help me choose a later session for Thomas Bernard and explain the impact on my team deadline.")} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--sg-red)] hover:underline">Review options with Assistant <ArrowRight size={15}/></button></div>
    <EvidenceRows items={["11 registration confirmations retained", "11 invitation records retained", "Claire’s exception decision is still pending"]}/>
  </>;
}

function ThomasDetail({ onAskAssistant }: Props) {
  return <><div className="mt-6 rounded-xl border-l-4 border-[var(--sg-red)] bg-red-50/60 p-4"><p className="font-bold">What needs your decision</p><p className="mt-2 text-sm leading-6 text-zinc-700">Choose whether Thomas should attend the 9 October option or remain open for another suitable session. This does not change the 11 confirmed registrations.</p></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><Stat icon={<CalendarDays size={18}/>} value="9 Oct" label="earliest available option"/><Stat icon={<CircleAlert size={18}/>} value="After deadline" label="delivery impact" tone="warn"/></div><div className="mt-6 rounded-xl bg-zinc-50 p-4"><p className="text-sm font-bold">Recommended conversation</p><p className="mt-1 text-sm text-zinc-600">Ask for a comparison of later-session options, team coverage and deadline impact before you decide.</p><button onClick={() => onAskAssistant("Compare the later-session options for Thomas Bernard, including deadline and team coverage impact.")} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-bold text-white"><Bot size={16}/> Compare options with Assistant</button></div><EvidenceRows items={["Thomas’s start date confirmed", "18 September availability conflict retained", "Alternative session capacity checked"]}/></>;
}

function Stat({ icon, value, label, tone }: { icon: React.ReactNode; value: string; label: string; tone?: "good" | "warn" }) { return <div className="rounded-xl border border-zinc-100 bg-white p-4"><span className={tone === "good" ? "text-emerald-600" : tone === "warn" ? "text-amber-600" : "text-[var(--sg-red)]"}>{icon}</span><p className="mt-3 text-2xl font-bold">{value}</p><p className="mt-1 text-xs font-semibold text-zinc-500">{label}</p></div>; }
function EvidenceRows({ items }: { items: string[] }) { return <div className="mt-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-zinc-500">Evidence available</p><div className="mt-3 grid gap-2 sm:grid-cols-3">{items.map(item => <div key={item} className="flex gap-2 rounded-lg bg-zinc-50 p-3 text-xs leading-5 text-zinc-700"><FileCheck2 size={15} className="mt-0.5 shrink-0 text-emerald-600"/>{item}</div>)}</div></div>; }
