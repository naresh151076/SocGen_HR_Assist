"use client";

import { Bot, CircleAlert } from "lucide-react";
import { scenario } from "../data/scenario";
import { Donut, Kpi, Legend, Pipeline } from "./SgCharts";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };

const audit = [
  { step: "Detect", state: "Done" },
  { step: "Investigate", state: "Done" },
  { step: "Approve", state: "Open" },
  { step: "Remediate", state: "Held" },
  { step: "Re-check", state: "Queued" },
];

export function ElenaHealth({ onAskAssistant }: Props) {
  const matched = 10;
  const open = 1;
  const passRate = Math.round((matched / scenario.confirmed) * 100);

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Control health"
        tags={["Week 36", "1 open"]}
        menuLabel="Health options"
        menuItems={[
          {
            label: "Ask the assistant",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("Check weekly invitation controls"),
          },
        ]}
      />

      <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="w-full px-5 py-5 md:px-8 md:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">Invitation coverage</h2>
              <span className="sg-status sg-status-attention">INV-04 open</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onAskAssistant("Approve the INV-04 remediation and send one replacement invitation.")}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-3.5 py-2 text-sm font-bold text-white hover:bg-black"
              >
                <Bot size={15} /> Approve remediation
              </button>
              <button
                onClick={() => onAskAssistant("Open the INV-04 evidence note for this week’s invitation control.")}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3.5 py-2 text-sm font-bold text-[var(--ink)] hover:bg-[var(--surface-hover)]"
              >
                Evidence
              </button>
            </div>
          </div>

          <div className="mt-5">
            <Pipeline
              steps={[
                { label: "Confirmed", value: String(scenario.confirmed) },
                { label: "Matched", value: String(matched) },
                { label: "Open", value: String(open), tone: "attention" },
                { label: "Pass", value: `${passRate}%` },
              ]}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <section className="border border-[var(--line)] p-5">
              <p className="sg-meta-label">Match rate</p>
              <div className="mt-4 flex items-center justify-center gap-5">
                <Donut
                  ariaLabel="Invitation match rate"
                  center={`${passRate}%`}
                  centerLabel="MATCH"
                  segments={[
                    { value: matched, color: "var(--ink)" },
                    { value: open, color: "var(--sg-red)" },
                  ]}
                  total={scenario.confirmed}
                />
                <div className="space-y-3 text-sm">
                  <Legend swatch="bg-[var(--ink)]" label="Matched" value={String(matched)} />
                  <Legend swatch="bg-[var(--sg-red)]" label="Open" value={String(open)} />
                </div>
              </div>
            </section>

            <section className="border border-[var(--line)] p-5">
              <p className="sg-meta-label">Active exception</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Kpi label="Control" value="INV-04" attention />
                <Kpi label="Impact" value="1" attention />
                <Kpi label="Session" value="0918" />
                <Kpi label="From" value="Radu" />
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--sg-red-border)] bg-[var(--sg-red-soft)] px-3 py-2.5">
                <CircleAlert size={15} strokeWidth={1.8} className="shrink-0 text-[var(--sg-red)]" />
                <p className="min-w-0 truncate text-sm font-bold text-[var(--ink)]">{scenario.controlParticipant} · invite repair</p>
                <button
                  onClick={() => onAskAssistant("Approve the INV-04 remediation and send one replacement invitation.")}
                  className="ml-auto shrink-0 text-sm font-bold text-[var(--sg-red)] hover:underline"
                >
                  Resolve
                </button>
              </div>
            </section>
          </div>

          <div className="mt-4 border border-[var(--line)] p-5">
            <p className="sg-meta-label">Audit path</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {audit.map((item) => (
                <div
                  key={item.step}
                  className={`border px-3 py-4 text-center ${item.state === "Open" ? "border-[var(--sg-red-border)] bg-[var(--sg-red-soft)]" : "border-[var(--line)]"}`}
                >
                  <p className="text-sm font-bold text-[var(--ink)]">{item.step}</p>
                  <p className={`mt-2 text-xs font-bold uppercase tracking-[.12em] ${item.state === "Open" ? "text-[var(--sg-red)]" : "text-[var(--muted)]"}`}>
                    {item.state}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="border border-[var(--line)] px-4 py-3">
              <p className="sg-meta-label">From</p>
              <p className="mt-1 text-sm font-bold text-[var(--ink)]">Radu · publish</p>
            </div>
            <div className="border border-[var(--line)] px-4 py-3">
              <p className="sg-meta-label">You</p>
              <p className="mt-1 text-sm font-bold text-[var(--ink)]">Approve repair</p>
            </div>
            <div className="border border-[var(--line)] px-4 py-3">
              <p className="sg-meta-label">Next</p>
              <p className="mt-1 text-sm font-bold text-[var(--ink)]">Re-check · archive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
