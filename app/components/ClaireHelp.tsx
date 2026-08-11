"use client";

import { ArrowRight, Bot, CircleAlert } from "lucide-react";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };

const starters = [
  {
    title: "Request learning",
    detail: "Describe a cohort, topic and deadline for your team.",
    prompt: "I need mandatory learning for a new team",
  },
  {
    title: "Check progress",
    detail: "See who is confirmed and who is at deadline risk.",
    prompt: "Show my team’s learning progress and deadline risk",
  },
  {
    title: "Resolve an exception",
    detail: "Compare alternatives when someone cannot attend.",
    prompt: "Help me resolve an attendee learning exception",
  },
];

const ownership = [
  { owner: "You", detail: "Confirm the team need, priorities and acceptable alternatives." },
  { owner: "Training Coordinator", detail: "Approves whether the course, room, trainer and date work." },
  { owner: "Learning Operations", detail: "Approves registrations and invitations after the checks." },
];

const questions = [
  "Which of my team are at risk of missing the deadline?",
  "What alternative dates are suitable for an attendee?",
  "What happens after I confirm the plan?",
];

const limits = [
  "It will not register people or send invitations without Learning Operations approval.",
  "It will not make a priority or deadline trade-off for your team.",
  "It will explain what it checked and what needs a named owner’s decision.",
];

export function ClaireHelp({ onAskAssistant }: Props) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Help"
        tags={["Guidance"]}
        menuLabel="Help options"
        menuItems={[
          {
            label: "Ask the assistant",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("I need help with a team learning request"),
          },
        ]}
      />

      <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-6 md:px-8 md:py-7">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div className="min-w-0 max-w-2xl">
              <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">Start with the outcome you need</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Describe your team, required learning and deadline in plain language. The assistant prepares the request, highlights trade-offs and brings you back only for a business choice.
              </p>
            </div>
            <button
              onClick={() => onAskAssistant("I need mandatory learning for a new team")}
              className="sg-btn sg-btn-ink"
            >
              <Bot size={15} /> Open a conversation
            </button>
          </div>

          <div className="mt-6">
            <p className="sg-meta-label">Common starting points</p>
            <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {starters.map((item) => (
                <button
                  key={item.title}
                  onClick={() => onAskAssistant(item.prompt)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left transition hover:bg-[var(--surface-hover)]"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-[var(--ink)]">{item.title}</span>
                    <span className="mt-1 block text-sm text-[var(--muted)]">{item.detail}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-[var(--sg-red)]">
                    Ask <ArrowRight size={15} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="sg-meta-label">What you decide</p>
              <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {ownership.map((item) => (
                  <div key={item.owner} className="py-3">
                    <p className="text-sm font-bold text-[var(--ink)]">{item.owner}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="sg-meta-label">What the assistant will not do</p>
              <div className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {limits.map((item) => (
                  <div key={item} className="flex items-start gap-3 py-3">
                    <CircleAlert size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[var(--sg-red)]" />
                    <p className="text-sm leading-6 text-[var(--muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="sg-meta-label">Useful things to ask</p>
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

          <p className="mt-8 text-sm leading-6 text-[var(--muted)]">
            As Business Manager, you own the learning need and any deadline trade-off. Training Coordination and Learning Operations own planning and execution after your confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
