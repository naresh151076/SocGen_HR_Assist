"use client";
import { FileCheck2, ShieldCheck, X } from "lucide-react";
import type { ConversationResource } from "../data/conversations";

function statusTone(status?: string) {
  if (!status) return "text-zinc-500";
  const value = status.toLowerCase();
  if (value.includes("pass") || value.includes("active") || value.includes("ready") || value.includes("owner")) return "text-emerald-700";
  if (value.includes("need") || value.includes("follow") || value.includes("pending") || value.includes("exception")) return "text-amber-700";
  return "text-zinc-600";
}

export function RightDetails({
  open,
  onClose,
  resource,
}: {
  open: boolean;
  onClose: () => void;
  resource: ConversationResource | null;
}) {
  if (!resource) return null;

  const sections: { title: string; items: { heading: string; detail: string; status?: string }[] }[] = resource.sections ?? [
    {
      title: "Document summary",
      items: resource.facts.map((fact) => ({ heading: fact.label, detail: fact.value })),
    },
  ];

  return (
    <aside
      className={`${open ? "w-[400px] border-l" : "w-0 border-l-0"} h-full min-h-0 shrink-0 overflow-hidden border-zinc-200 bg-[#f4f5f6] transition-[width] duration-200 ease-out motion-reduce:transition-none`}
      aria-label="Source evidence"
    >
      <div className="scrollbar flex h-full w-[400px] flex-col overflow-y-auto">
        <div className="sticky top-0 z-10 flex h-[var(--panel-header-height)] shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-[#f4f5f6] px-6">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">Source Evidence</h2>
          <button onClick={onClose} aria-label="Close details" className="rounded-lg p-2 text-zinc-500 hover:bg-white hover:text-zinc-800">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          <p className="text-sm leading-6 text-zinc-600">{resource.summary}</p>

          {sections.map((section) => (
            <section key={section.title}>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[.14em] text-zinc-500">{section.title}</p>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={`${section.title}-${item.heading}`} className="rounded-xl border border-zinc-200 bg-white px-4 py-3.5 shadow-[0_1px_0_rgba(15,23,42,.03)]">
                    <div className="flex items-start justify-between gap-4">
                      <p className="min-w-0 text-sm font-bold text-zinc-900">{item.heading}</p>
                      {item.status && <span className={`shrink-0 text-xs font-bold ${statusTone(item.status)}`}>{item.status}</span>}
                    </div>
                    <p className="mt-1.5 text-sm leading-5 text-zinc-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.14em] text-zinc-500">Evidence retained</p>
            <div className="rounded-xl border border-zinc-200 bg-white px-1 py-1">
              {resource.evidence.map((item) => (
                <div key={item} className="flex gap-3 border-b border-zinc-100 px-3 py-3.5 text-sm last:border-b-0">
                  <ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" size={16} />
                  <span className="leading-5 text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <p className="flex items-center gap-2 pb-3 text-xs font-bold text-zinc-500">
            <FileCheck2 size={14} className="text-[var(--sg-red)]" />
            Fictional demo evidence only
          </p>
        </div>
      </div>
    </aside>
  );
}
