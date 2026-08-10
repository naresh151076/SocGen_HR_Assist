"use client";

import { useState } from "react";
import { Route, ShieldCheck } from "lucide-react";
import type { Persona, PersonaId } from "../data/personas";
import { PromptComposer } from "./PromptComposer";
import { QuickActions } from "./QuickActions";
import { WorkspaceHeader } from "./WorkspaceHeader";

const landingCopy: Record<PersonaId, { lead: string; boundary: string }> = {
  claire: {
    lead: "What does your team need to learn?",
    boundary: "Nothing is registered or invited until Learning Operations approves.",
  },
  amelie: {
    lead: "What programme do you need to plan?",
    boundary: "Approving a plan creates a work package only — registration stays with Learning Operations.",
  },
  radu: {
    lead: "What learning operation needs your decision?",
    boundary: "No MyLearning or Outlook action is recorded until you approve.",
  },
  elena: {
    lead: "What control needs your attention?",
    boundary: "Remediation stays draft until you approve the repair and re-check.",
  },
};

function timeGreeting(name: string) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return `${greeting}, ${name.split(" ")[0]}.`;
}

type Props = {
  persona: Persona;
  onStartChat: (prompt: string) => void;
  onStartDemo: () => void;
};

/** First-state new-chat workspace aligned with conversation chrome. */
export function NewChatLanding({ persona, onStartChat, onStartDemo }: Props) {
  const copy = landingCopy[persona.id];
  const [greeting] = useState(() => timeGreeting(persona.name));

  return (
    <div className="flex w-full flex-col">
      <WorkspaceHeader
        title="New chat"
        menuLabel="New chat options"
        menuItems={[
          {
            label: "Open example request",
            icon: <Route size={15} className="text-[var(--sg-red)]" />,
            onClick: onStartDemo,
          },
        ]}
      />

      <div className="flex min-h-[calc(100dvh-var(--panel-header-height)-3.5rem)] w-full flex-col px-5 py-8 md:min-h-[calc(100dvh-var(--panel-header-height))] md:px-8 md:py-10">
        <div className="mx-auto my-auto w-full max-w-3xl space-y-8 pb-8">
          <div className="space-y-3 text-center sm:text-left">
            <p suppressHydrationWarning className="text-sm font-medium text-zinc-500">
              {greeting}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl md:leading-tight">
              {copy.lead}
            </h2>
            <p className="flex items-start justify-center gap-2 text-sm leading-6 text-zinc-500 sm:justify-start">
              <ShieldCheck size={16} className="mt-0.5 shrink-0" strokeWidth={1.8} />
              <span>{copy.boundary}</span>
            </p>
          </div>

          <PromptComposer onSend={onStartChat} placeholder={persona.prompt} />

          <div>
            <p className="px-0.5 text-[11px] font-bold uppercase tracking-[.14em] text-zinc-500">Suggested starts</p>
            <QuickActions persona={persona.id} onSelect={onStartChat} />
          </div>
        </div>
      </div>
    </div>
  );
}
