"use client";

import { Route, ShieldCheck } from "lucide-react";
import type { Persona, PersonaId } from "../data/personas";
import { AssistantAvatar } from "./ConversationThread";
import { PromptComposer } from "./PromptComposer";
import { QuickActions } from "./QuickActions";
import { WorkspaceHeader } from "./WorkspaceHeader";

const landingCopy: Record<
  PersonaId,
  { tags: string[]; lead: string; support: string; boundary: string }
> = {
  claire: {
    tags: ["Team learning", "You decide"],
    lead: "What does your team need to learn?",
    support:
      "Describe the people, required learning and deadline in plain language. I’ll prepare the request, surface trade-offs and bring you back only for a business choice.",
    boundary: "Nothing is registered or invited until Learning Operations approves.",
  },
  amelie: {
    tags: ["Planning", "Publish after review"],
    lead: "What programme do you need to plan?",
    support:
      "Share the cohort, curriculum need and deadline. I’ll check capacity, trainer and room fit, then propose a plan you can approve before anything is published.",
    boundary: "Approving a plan creates a work package only — registration stays with Learning Operations.",
  },
  radu: {
    tags: ["Registration", "Approval before write"],
    lead: "What learning operation needs your decision?",
    support:
      "Describe the registration or invitation work. I’ll check the group against the approved session and keep consequential actions behind your approval.",
    boundary: "No MyLearning or Outlook action is recorded until you approve.",
  },
  elena: {
    tags: ["Controls", "Remediation approval"],
    lead: "What control needs your attention?",
    support:
      "Describe the exception or evidence to review. I’ll prepare the contained remediation options and keep the control decision with you.",
    boundary: "Remediation stays draft until you approve the repair and re-check.",
  },
};

type Props = {
  persona: Persona;
  onStartChat: (prompt: string) => void;
  onStartDemo: () => void;
};

/** First-state new-chat workspace aligned with conversation chrome. */
export function NewChatLanding({ persona, onStartChat, onStartDemo }: Props) {
  const copy = landingCopy[persona.id];

  return (
    <div className="flex w-full flex-col">
      <WorkspaceHeader
        title="New chat"
        tags={copy.tags}
        menuLabel="New chat options"
        menuItems={[
          {
            label: "Open example request",
            icon: <Route size={15} className="text-[var(--sg-red)]" />,
            onClick: onStartDemo,
          },
        ]}
      />

      <div className="w-full px-5 py-6 md:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-3">
            <AssistantAvatar />
            <div className="min-w-0 flex-1 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.12em] text-zinc-400">Assistant</p>
                <p className="mt-2 text-[15px] font-semibold leading-7 text-zinc-900">{copy.lead}</p>
                <p className="mt-2 text-[15px] leading-7 text-zinc-700">{copy.support}</p>
              </div>
              <div className="flex gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-zinc-500" strokeWidth={1.8} />
                <p className="text-sm leading-6 text-zinc-600">{copy.boundary}</p>
              </div>
            </div>
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
