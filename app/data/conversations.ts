import type { PersonaId } from "./personas";

export type ConversationResource = {
  id: string;
  kind: "Brief" | "Checklist" | "Evidence note";
  title: string;
  summary: string;
  facts: { label: string; value: string }[];
  evidence: string[];
};

export type ConversationScenario = {
  eyebrow: string;
  title: string;
  response: string;
  nextStep: string;
  resources: ConversationResource[];
};

const scenarios: Record<PersonaId, ConversationScenario> = {
  radu: {
    eyebrow: "Registration support",
    title: "I’ve prepared a safe starting point.",
    response: "I’ll check the requested cohort against the approved session, learning history, availability and capacity. Nothing will be registered or invited until you approve the proposed outcome.",
    nextStep: "Share the cohort or open the registration brief to review the checks.",
    resources: [{ id:"registration-brief", kind:"Brief", title:"Registration brief · New Manager Foundations", summary:"A fictional cohort and session summary prepared for review.", facts:[{label:"Cohort",value:"12 requested · 10 ready"},{label:"Session",value:"18 September · Paris"},{label:"Decision",value:"2 exceptions need review"}], evidence:["Curriculum and planning rules","Learning history and capacity","Availability check"] }]
  },
  amelie: {
    eyebrow: "Planning support",
    title: "I can turn the request into a viable plan.",
    response: "I’ll validate curriculum fit, trainer availability, room capacity and the requested deadline before proposing a session plan. Publication remains with you.",
    nextStep: "Open the planning checklist to see the assumptions I will use.",
    resources: [{ id:"planning-checklist", kind:"Checklist", title:"Planning checklist · Paris cohort", summary:"A fictional planning checklist for the proposed programme.", facts:[{label:"Audience",value:"12 new managers"},{label:"Window",value:"Before 30 September"},{label:"Capacity",value:"16 seats proposed"}], evidence:["Curriculum scope","Trainer availability","Room capacity and lead time"] }]
  },
  claire: {
    eyebrow: "Team learning request",
    title: "I’ll help turn the need into a clear request.",
    response: "I’ll capture your cohort, deadline and preferences, then show you only the business choices that need your input. Learning Operations completes the checks and approved registrations.",
    nextStep: "Open the request note to review the information that will be shared for planning.",
    resources: [{ id:"request-note", kind:"Brief", title:"Request note · Team learning", summary:"A fictional business request prepared for Learning Operations.", facts:[{label:"Need",value:"New Manager Foundations"},{label:"Cohort",value:"12 new managers · Paris"},{label:"Deadline",value:"Before 30 September"}], evidence:["Business request captured","Delivery preference","Cohort count"] }]
  },
  elena: {
    eyebrow: "Control support",
    title: "I’ll frame the exception before any remediation.",
    response: "I’ll identify the affected records, retain the evidence and prepare a contained remediation. A current invitation or accepted exception still needs your approval.",
    nextStep: "Open the evidence note to review the control scope and proposed re-check.",
    resources: [{ id:"control-evidence", kind:"Evidence note", title:"INV-04 evidence note", summary:"A fictional control record for an invitation mismatch.", facts:[{label:"Control",value:"INV-04 · invitation coverage"},{label:"Impact",value:"1 participant affected"},{label:"Re-check",value:"After approved delivery"}], evidence:["Registration state matched","Invitation match failed","Source timestamps retained"] }]
  }
};

export const getConversationScenario = (personaId: PersonaId) => scenarios[personaId];
