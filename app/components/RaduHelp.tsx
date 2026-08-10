"use client";

import { ArrowRight, Bot, CircleAlert } from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };

const starters = [
  { title: "Check a group", prompt: "Check a group for an approved session" },
  { title: "Prepare registrations", prompt: "Prepare registrations for approval" },
  { title: "Review an exception", prompt: "Investigate invitation status for an exception" },
];

const flow = [
  { step: "1", label: "Check" },
  { step: "2", label: "Hold draft" },
  { step: "3", label: "Claire decides" },
  { step: "4", label: "You approve" },
  { step: "5", label: "Elena evidence" },
];

const ownership = [
  { owner: "You", detail: "Checks, drafts, publish approval" },
  { owner: "Claire", detail: "Business trade-offs" },
  { owner: "Amélie", detail: "Session plan" },
  { owner: "Elena", detail: "Control remediation" },
];

const limits = [
  "No registrations before your approval",
  "No business priority choices for Claire",
  "No control remediation without Elena",
];

const questions = [
  "Which people are ready to register?",
  "What evidence supports the two exceptions?",
  "What happens after I approve invitations?",
];

export function RaduHelp({ onAskAssistant }: Props) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Help"
        tags={["Ops guidance"]}
        menuLabel="Help options"
        menuItems={[
          {
            label: "Ask the assistant",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("I need help with a registration package"),
          },
        ]}
      />

      <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-6 md:px-8 md:py-7">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">Registration path</h2>
            <button
              onClick={() => onAskAssistant("Check a group for an approved session")}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-3.5 py-2 text-sm font-bold text-white hover:bg-black"
            >
              <Bot size={15} /> Open a conversation
            </button>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-5">
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
