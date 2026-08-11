"use client";

import { Bot, CircleAlert } from "lucide-react";
import { scenario } from "../data/scenario";
import { Donut, Kpi, Legend, Pipeline } from "./SgCharts";
import { WorkspaceHeader } from "./WorkspaceHeader";

type Props = { onAskAssistant: (prompt: string) => void };

const resources = [
  { label: "Trainer", value: scenario.trainer, tone: "ok" as const },
  { label: "Room", value: "La Defense", tone: "ok" as const },
  { label: "Format", value: "Classroom", tone: "ok" as const },
  { label: "Lead time", value: "Inside window", tone: "ok" as const },
];

const timeline = [
  { day: "Mon 15", label: "Demand", fill: false },
  { day: "Wed 17", label: "Validate", fill: false },
  { day: "Fri 18", label: "Session", fill: true },
  { day: "Tue 22", label: "Alt seat", fill: false },
  { day: "Tue 30", label: "Deadline", fill: false },
];

export function AmelieCapacity({ onAskAssistant }: Props) {
  const fill = Math.round((scenario.requested / scenario.capacity) * 100);
  const remaining = scenario.capacity - scenario.requested;

  return (
    <div className="flex h-full min-h-full w-full flex-col bg-white">
      <WorkspaceHeader
        title="Capacity"
        tags={[`${scenario.requested} of ${scenario.capacity} seats`, "1 plan ready"]}
        menuLabel="Capacity options"
        menuItems={[
          {
            label: "Ask the assistant",
            icon: <Bot size={15} className="text-[var(--sg-red)]" />,
            onClick: () => onAskAssistant("Review capacity for Claire’s Paris New Manager Foundations cohort."),
          },
        ]}
      />

      <div className="scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="w-full px-5 py-5 md:px-8 md:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">Paris · September</h2>
              <span className="sg-status sg-status-attention">Publish pending</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onAskAssistant("Approve the session plan for Claire’s New Manager Foundations cohort.")}
                className="sg-btn sg-btn-ink"
              >
                <Bot size={15} /> Approve plan
              </button>
              <button
                onClick={() => onAskAssistant("Find capacity for a cohort before 30 September.")}
                className="sg-btn sg-btn-secondary"
              >
                Find capacity
              </button>
            </div>
          </div>

          <div className="mt-5">
            <Pipeline
              steps={[
                { label: "Demand", value: String(scenario.requested) },
                { label: "Seats", value: String(scenario.capacity) },
                { label: "Free", value: String(remaining) },
                { label: "Fill", value: `${fill}%`, tone: fill > 80 ? "attention" : undefined },
              ]}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <section className="border border-[var(--line)] p-5">
              <p className="sg-meta-label">Seat meter</p>
              <div className="mt-4 flex items-center justify-center gap-5">
                <Donut
                  ariaLabel="Seat fill"
                  center={`${fill}%`}
                  centerLabel="FILL"
                  segments={[
                    { value: scenario.requested, color: "var(--chart-strong)" },
                    { value: remaining, color: "var(--chart-soft)" },
                  ]}
                  total={scenario.capacity}
                />
                <div className="space-y-3 text-sm">
                  <Legend swatch="bg-[var(--chart-strong)]" label="Requested" value={String(scenario.requested)} />
                  <Legend swatch="bg-[var(--chart-soft)]" label="Free" value={String(remaining)} />
                </div>
              </div>
            </section>

            <section className="border border-[var(--line)] p-5">
              <p className="sg-meta-label">Proposed session</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Kpi label="Date" value="18 Sep" />
                <Kpi label="Time" value="09:00" />
                <Kpi label="Ref" value="0918" />
                <Kpi label="From" value="Claire" />
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-full border border-[var(--sg-red-border)] bg-[var(--sg-red-soft)] px-3 py-2.5">
                <CircleAlert size={15} strokeWidth={1.8} className="shrink-0 text-[var(--sg-red)]" />
                <p className="min-w-0 truncate text-sm font-bold text-[var(--ink)]">Hand to Radu after publish</p>
                <button
                  onClick={() => onAskAssistant("Approve the session plan for Claire’s New Manager Foundations cohort.")}
                  className="sg-btn sg-btn-primary sg-btn-compact ml-auto shrink-0"
                >
                  Publish
                </button>
              </div>
            </section>
          </div>

          <div className="mt-4 border border-[var(--line)] p-5">
            <p className="sg-meta-label">September strip</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {timeline.map((slot) => (
                <div
                  key={slot.day}
                  className={`border px-3 py-4 text-center ${slot.fill ? "border-[var(--chart-strong)] bg-[var(--chart-strong)] text-white" : "border-[var(--line)]"}`}
                >
                  <p className={`text-xs font-bold uppercase tracking-[.12em] ${slot.fill ? "text-white/70" : "text-[var(--muted)]"}`}>{slot.day}</p>
                  <p className={`mt-2 text-sm font-bold ${slot.fill ? "text-white" : "text-[var(--ink)]"}`}>{slot.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {resources.map((item) => (
              <div key={item.label} className="border border-[var(--line)] px-4 py-4">
                <p className="sg-meta-label">{item.label}</p>
                <p className="mt-2 text-sm font-bold text-[var(--ink)]">{item.value}</p>
                <span className="sg-status sg-status-ok mt-3">Pass</span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="border border-[var(--line)] px-4 py-3">
              <p className="sg-meta-label">From</p>
              <p className="mt-1 text-sm font-bold text-[var(--ink)]">Claire · demand</p>
            </div>
            <div className="border border-[var(--line)] px-4 py-3">
              <p className="sg-meta-label">You</p>
              <p className="mt-1 text-sm font-bold text-[var(--ink)]">Validate · publish</p>
            </div>
            <div className="border border-[var(--line)] px-4 py-3">
              <p className="sg-meta-label">Next</p>
              <p className="mt-1 text-sm font-bold text-[var(--ink)]">Radu · package</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
