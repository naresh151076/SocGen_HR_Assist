"use client";

import { ArrowRight, Bot, CircleAlert } from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };

const starters = [
  { title: "Review exceptions", prompt: "Review a control exception" },
  { title: "Check coverage", prompt: "Check weekly invitation controls" },
  { title: "Assign remediation", prompt: "Assign remediation for an invitation mismatch" },
];

const flow = [
  { step: "1", label: "Detect" },
  { step: "2", label: "Investigate" },
  { step: "3", label: "Approve" },
  { step: "4", label: "Re-check" },
];

const ownership = [
  { owner: "You", detail: "Exception and remediation" },
  { owner: "Radu", detail: "Source registrations" },
  { owner: "Audit", detail: "Append-only evidence" },
];

const limits = [
  "No silent invitation sends",
  "No overwrite of detection evidence",
  "No registration edits from control",
];

const questions = [
  "Which invitation controls need me today?",
  "What evidence supports INV-04?",
  "What happens after I approve remediation?",
];

export function ElenaHelp({ onAskAssistant }: Props) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Help"
        tags={["Control guidance"]}
        menuLabel="Help options"
        menuItems={[
          {
            label: "Ask the assistant",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("I need help with a control exception"),
          },
        ]}
      />

      <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-6 md:px-8 md:py-7">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">Control path</h2>
            <button
              onClick={() => onAskAssistant("Review a control exception")}
              className="sg-btn sg-btn-ink"
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
