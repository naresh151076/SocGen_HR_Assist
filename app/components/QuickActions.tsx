import { ChevronRight, CalendarPlus, ClipboardCheck, FileSearch, Users } from "lucide-react";
import { type PersonaId } from "../data/personas";

const actions: Record<PersonaId, { label: string; icon: typeof CalendarPlus }[]> = {
  radu: [
    { label: "Prepare registrations", icon: Users },
    { label: "Handle a cancellation", icon: CalendarPlus },
    { label: "Review an exception", icon: FileSearch },
  ],
  amelie: [
    { label: "Plan a programme", icon: CalendarPlus },
    { label: "Review capacity", icon: ClipboardCheck },
    { label: "Resolve a planning conflict", icon: FileSearch },
  ],
  claire: [
    { label: "Train a new cohort", icon: Users },
    { label: "Check team learning", icon: ClipboardCheck },
    { label: "Request a change", icon: CalendarPlus },
  ],
  elena: [
    { label: "Review control exceptions", icon: FileSearch },
    { label: "Check invitation coverage", icon: ClipboardCheck },
    { label: "Assign remediation", icon: Users },
  ],
};

export function QuickActions({
  persona,
  onSelect,
}: {
  persona: PersonaId;
  onSelect: (label: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {actions[persona].map(({ label, icon: Icon }, index) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          className="action-card group flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white px-4 py-3.5 text-left"
          style={{ animationDelay: `${index * 55}ms` }}
        >
          <span className="action-card-icon grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-700">
            <Icon size={20} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold leading-5 text-zinc-900">{label}</span>
          </span>
          <ChevronRight
            aria-hidden="true"
            size={18}
            strokeWidth={1.8}
            className="shrink-0 text-zinc-400 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-1 group-hover:text-[var(--sg-red)]"
          />
        </button>
      ))}
    </div>
  );
}
