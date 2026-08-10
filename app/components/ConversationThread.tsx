"use client";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Ellipsis, FileCheck2, FileText, ShieldCheck } from "lucide-react";
import { getConversationScenario, type ConversationResource } from "../data/conversations";
import type { Persona } from "../data/personas";

function ConversationHeader({
  title,
  meta,
  onOpenEvidence,
}: {
  title: string;
  meta: string;
  onOpenEvidence: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tags = meta.split("·").map((part) => part.trim()).filter(Boolean);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="flex h-[var(--panel-header-height)] w-full shrink-0 items-center justify-between gap-3 border-b border-zinc-200 px-5 md:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold text-zinc-900">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <div className="hidden items-center gap-1.5 md:flex">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600">
              {tag}
            </span>
          ))}
        </div>
        <div className="relative" ref={menuRef}>
          <button
            aria-label="Conversation options"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
          >
            <Ellipsis size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 z-40 w-52 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-[0_16px_40px_rgba(15,23,42,.12)]">
              <button
                onClick={() => { onOpenEvidence(); setMenuOpen(false); }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                <FileCheck2 size={15} className="text-[var(--sg-red)]" />
                Open source evidence
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                <FileText size={15} className="text-zinc-500" />
                View request details
              </button>
              <p className="border-t border-zinc-100 px-3 py-2 text-[11px] leading-4 text-zinc-500 md:hidden">{meta}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function UserMessage({ text, initials, stamp = "You · just now" }: { text: string; initials: string; stamp?: string }) {
  return (
    <div className="flex items-end justify-end gap-3">
      <div className="max-w-[min(42rem,78%)]">
        <div className="rounded-2xl rounded-br-md bg-[#e8f1fb] px-4 py-3 text-sm leading-6 text-zinc-800 shadow-[0_1px_0_rgba(15,23,42,.04)]">
          <p>{text}</p>
          <p className="mt-2 text-[11px] font-semibold text-sky-800/70">{stamp}</p>
        </div>
      </div>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-700 text-[11px] font-bold text-white">{initials}</span>
    </div>
  );
}

function AssistantAvatar() {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--sg-red)] text-[10px] font-bold tracking-wide text-white">AI</span>;
}

function AssistantText({ text, stamp }: { text: string; stamp?: string }) {
  return (
    <div className="flex items-start gap-3">
      <AssistantAvatar />
      <div className="min-w-0 max-w-4xl flex-1">
        <p className="text-xs font-bold uppercase tracking-[.12em] text-zinc-400">Assistant</p>
        <p className="mt-2 text-[15px] leading-7 text-zinc-800">{text}</p>
        {stamp && <p className="mt-2 text-[11px] font-semibold text-zinc-400">{stamp}</p>}
      </div>
    </div>
  );
}

function VerificationCard({ id, detail, badge }: { id: string; detail: string; badge: string }) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-[0_1px_0_rgba(15,23,42,.03)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={18} /></span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-zinc-900">Match: {id}</p>
            <p className="mt-1 text-sm leading-5 text-zinc-600">{detail}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-teal-700">{badge}</span>
      </div>
    </div>
  );
}

function AlertCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0 text-amber-600"><AlertTriangle size={18} /></span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-zinc-900">{title}</p>
          <p className="mt-1 text-sm leading-5 text-zinc-700">{detail}</p>
        </div>
      </div>
    </div>
  );
}

export function ConversationThread({
  persona,
  prompt,
  onOpenResource,
  onPrimaryAction,
}: {
  persona: Persona;
  prompt: string;
  onOpenResource: (resource: ConversationResource) => void;
  onPrimaryAction?: () => void;
}) {
  const scenario = getConversationScenario(persona.id);
  const resource = scenario.resources[0];

  return (
    <div className="flex w-full flex-col">
      <ConversationHeader title={scenario.caseTitle} meta={scenario.caseMeta} onOpenEvidence={() => onOpenResource(resource)} />

      <div className="w-full space-y-6 px-5 py-6 md:px-8">
        {scenario.priorTurns.map((turn, index) =>
          turn.role === "user" ? (
            <UserMessage key={`${turn.stamp}-${index}`} text={turn.text} initials={persona.initials} stamp={turn.stamp} />
          ) : (
            <AssistantText key={`${turn.stamp}-${index}`} text={turn.text} stamp={turn.stamp} />
          ),
        )}

        <UserMessage text={prompt} initials={persona.initials} />

        <div className="flex items-start gap-3">
          <AssistantAvatar />
          <div className="min-w-0 max-w-4xl flex-1 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.12em] text-zinc-400">Assistant</p>
              <p className="mt-2 text-[15px] leading-7 text-zinc-800">{scenario.response}</p>
              <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-zinc-700">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                {scenario.nextStep}
              </p>
            </div>

            {scenario.verification && (
              <VerificationCard id={scenario.verification.id} detail={scenario.verification.detail} badge={scenario.verification.badge} />
            )}
            {scenario.alert && <AlertCard title={scenario.alert.title} detail={scenario.alert.detail} />}

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                onClick={() => (onPrimaryAction ? onPrimaryAction() : onOpenResource(resource))}
                className="inline-flex items-center rounded-lg bg-[var(--sg-red)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#c70419]"
              >
                {scenario.primaryAction}
              </button>
              <button
                onClick={() => onOpenResource(resource)}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-bold text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
              >
                <FileCheck2 size={15} className="text-[var(--sg-red)]" />
                {scenario.secondaryAction}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ConversationHeader, UserMessage, AssistantAvatar, AssistantText, VerificationCard, AlertCard };
