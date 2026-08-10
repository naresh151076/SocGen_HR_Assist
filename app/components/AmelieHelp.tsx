"use client";

import { ArrowRight, Bot, CircleAlert } from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };

const starters = [
  { title: "Plan a programme", prompt: "Validate a programme plan" },
  { title: "Review capacity", prompt: "Find capacity for a cohort" },
  { title: "Resolve a conflict", prompt: "Resolve a trainer or room conflict" },
];

const flow = [
  { step: "1", label: "Demand" },
  { step: "2", label: "Validate" },
  { step: "3", label: "Approve" },
  { step: "4", label: "Radu package" },
];

const ownership = [
  { owner: "You", detail: "Feasibility and publish" },
  { owner: "Claire", detail: "Business need" },
  { owner: "Radu", detail: "Registrations after publish" },
];

const limits = [
  "No learner registrations from planning",
  "No invitations before ops approval",
  "No business trade-offs for Claire",
];

const questions = [
  "Does the proposed session meet the deadline?",
  "What evidence supports trainer and room fit?",
  "What does Radu receive after I publish?",
];

export function AmelieHelp({ onAskAssistant }: Props) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Help"
        tags={["Planning guidance"]}
        menuLabel="Help options"
        menuItems={[
          {
            label: "Ask the assistant",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("I need help planning a programme"),
          },
        ]}
      />

      <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-6 md:px-8 md:py-7">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">Planning path</h2>
            <button
              onClick={() => onAskAssistant("Validate a programme plan")}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-3.5 py-2 text-sm font-bold text-white hover:bg-black"
            >
              <Bot size={15} /> Open a conversation
            </button>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-4">
            {flow.map((item) => (
              <div key={item.step} className="border border-[var(--line)] px-3 py-4 text-center">
                <p className="text-2xl font-bold text-[var(--ink)]">{item.step}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="sg-meta-label">Start here</p>
            <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {starters.map((item) => (
                <button
                  key={item.title}
                  onClick={() => onAskAssistant(item.prompt)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left transition hover:bg-[var(--surface-hover)]"
                >
                  <span className="text-sm font-bold text-[var(--ink)]">{item.title}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[var(--sg-red)]">
                    Ask <ArrowRight size={15} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="sg-meta-label">Ownership</p>
              <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {ownership.map((item) => (
                  <div key={item.owner} className="flex items-center justify-between gap-3 py-3">
                    <p className="text-sm font-bold text-[var(--ink)]">{item.owner}</p>
                    <p className="text-sm text-[var(--muted)]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="sg-meta-label">Limits</p>
              <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {limits.map((item) => (
                  <div key={item} className="flex items-start gap-3 py-3">
                    <CircleAlert size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--sg-red)]" />
                    <p className="text-sm text-[var(--muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="sg-meta-label">Useful asks</p>
            <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {questions.map((question) => (
                <button
                  key={question}
                  onClick={() => onAskAssistant(question)}
                  className="flex w-full items-center justify-between gap-4 py-3.5 text-left transition hover:bg-[var(--surface-hover)]"
                >
                  <span className="text-sm font-semibold text-[var(--ink)]">{question}</span>
                  <ArrowRight size={16} className="shrink-0 text-[var(--muted)]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
