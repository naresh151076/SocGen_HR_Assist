import { ChevronRight, CalendarPlus, ClipboardCheck, FileSearch, Users } from "lucide-react";
import { type PersonaId } from "../data/personas";

const actions: Record<PersonaId, { label: string; description: string; icon: typeof CalendarPlus }[]> = {
  radu: [
    { label: "Prepare registrations", description: "Check a cohort before approval", icon: Users },
    { label: "Handle a cancellation", description: "Find a replacement or leave a seat open", icon: CalendarPlus },
    { label: "Review an exception", description: "See rule evidence and recommendations", icon: FileSearch },
  ],
  amelie: [
    { label: "Plan a programme", description: "Build a viable classroom schedule", icon: CalendarPlus },
    { label: "Review capacity", description: "Check rooms, trainers and seats", icon: ClipboardCheck },
    { label: "Resolve a planning conflict", description: "Choose a compliant alternative", icon: FileSearch },
  ],
  claire: [
    { label: "Train a new cohort", description: "Request mandatory learning for your team", icon: Users },
    { label: "Check team learning", description: "See open needs and confirmations", icon: ClipboardCheck },
    { label: "Request a change", description: "Update a learning request", icon: CalendarPlus },
  ],
  elena: [
    { label: "Review control exceptions", description: "Focus on decision-required items", icon: FileSearch },
    { label: "Check invitation coverage", description: "Find participant-impact issues", icon: ClipboardCheck },
    { label: "Assign remediation", description: "Set owner, due date and proof", icon: Users },
  ],
};

export function QuickActions({
  persona,
  onSelect,
  compact = false,
}: {
  persona: PersonaId;
  onSelect: (label: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {actions[persona].map(({ label, description, icon: Icon }, index) => (
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
            {!compact && <span className="mt-0.5 block text-xs leading-5 text-zinc-500">{description}</span>}
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
