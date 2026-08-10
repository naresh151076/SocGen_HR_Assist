import type { PersonaId } from "./personas";

export type ConversationResource = {
  id: string;
  kind: "Brief" | "Checklist" | "Evidence note";
  title: string;
  summary: string;
  facts: { label: string; value: string }[];
  evidence: string[];
  workflow?: { label: string; detail: string }[];
  sections?: { title: string; items: { heading: string; detail: string; status?: string }[] }[];
};

export type ConversationTurn = {
  role: "user" | "assistant";
  text: string;
  stamp: string;
};

export type ConversationScenario = {
  caseTitle: string;
  caseMeta: string;
  eyebrow: string;
  title: string;
  response: string;
  nextStep: string;
  verification?: { id: string; detail: string; badge: string };
  alert?: { title: string; detail: string };
  primaryAction: string;
  secondaryAction: string;
  priorTurns: ConversationTurn[];
  resources: ConversationResource[];
};

const scenarios: Record<PersonaId, ConversationScenario> = {
  radu: {
    caseTitle: "New Manager Foundations · Paris",
    caseMeta: "12 requested · 10 ready · 2 need a decision",
    eyebrow: "Registration support",
    title: "I’ve prepared a safe starting point.",
    response: "I’ll check the requested cohort against the approved session, learning history, availability and capacity. Nothing will be registered or invited until you approve the proposed outcome.",
    nextStep: "Review the registration brief, then decide which exceptions need Claire’s business trade-off.",
    verification: { id: "NMF-2026-0918", detail: "Approved session · 18 September · Paris La Defense · 16 seats", badge: "Session verified" },
    alert: { title: "Two registration exceptions", detail: "Priya has a calendar conflict and Thomas starts after the session. Hold the 10 ready people as a draft until Claire decides." },
    primaryAction: "Review exceptions",
    secondaryAction: "Open registration brief",
    priorTurns: [
      { role: "user", text: "Open the registration work package for Claire’s Paris cohort.", stamp: "You · 09:41" },
      { role: "assistant", text: "I found the approved session NMF-2026-0918. I’ll prepare the draft registration package and flag anyone who needs a decision before invitations are considered.", stamp: "Assistant · 09:41" },
      { role: "user", text: "Keep invitations held until I approve.", stamp: "You · 09:44" },
      { role: "assistant", text: "Understood. I’ll keep the 10 ready people as a draft and surface only the exceptions that need a named decision.", stamp: "Assistant · 09:44" },
    ],
    resources: [{
      id: "registration-brief",
      kind: "Brief",
      title: "Registration brief · New Manager Foundations",
      summary: "Operational evidence for the registration review before Radu approves anything.",
      facts: [
        { label: "Cohort", value: "12 requested · 10 ready" },
        { label: "Session", value: "18 September · Paris" },
        { label: "Decision", value: "2 exceptions need review" },
        { label: "Approval boundary", value: "Radu approves registrations and invitations" },
      ],
      evidence: ["Mandarin session and capacity reference", "MyLearning learning-history and duplicate-booking check", "HR Data/SWS eligibility reference", "Outlook availability check"],
      workflow: [
        { label: "What Radu is doing", detail: "Preparing one draft registration package; no learner record or invitation is changed yet." },
        { label: "How the information is assembled", detail: "The prototype consolidates fictional session, learner, rule and calendar evidence into this one review." },
        { label: "What Radu reviews", detail: "Ready learners, named exceptions, recommendations and the planned action before approval." },
      ],
      sections: [
        { title: "Session record", items: [{ heading: "NMF-2026-0918", detail: "New Manager Foundations · 18 September · Victor Laurent", status: "Active" }, { heading: "Capacity", detail: "16 seats · 10 proposed registrations · 6 remaining" }] },
        { title: "Exception matrix", items: [{ heading: "Priya Shah", detail: "Calendar conflict · recommended 22 September", status: "Needs decision" }, { heading: "Thomas Bernard", detail: "Starts 21 September · earliest option 9 October", status: "Follow-up" }] },
      ],
    }],
  },
  amelie: {
    caseTitle: "Paris new-manager programme",
    caseMeta: "12 learners · classroom · before 30 September",
    eyebrow: "Planning support",
    title: "I can turn the request into a viable plan.",
    response: "I’ll validate curriculum fit, trainer availability, room capacity and the requested deadline before proposing a session plan. Publication remains with you.",
    nextStep: "Confirm the planning assumptions, then approve the session for Learning Operations.",
    verification: { id: "NMF-2026-0918", detail: "Curriculum, trainer, room and deadline checks passed for the proposed Friday session.", badge: "Plan verified" },
    alert: { title: "Registration not started", detail: "Publishing the plan creates Radu’s work package only. No learner is registered and no invitation is sent yet." },
    primaryAction: "Approve session plan",
    secondaryAction: "Open planning checklist",
    priorTurns: [
      { role: "user", text: "Claire needs New Manager Foundations for 12 people in Paris before 30 September.", stamp: "You · 09:18" },
      { role: "assistant", text: "I’ve captured the demand. I’ll check curriculum fit, trainer availability, room capacity and lead time before proposing a session.", stamp: "Assistant · 09:18" },
      { role: "user", text: "Prefer Victor Laurent and a classroom format if possible.", stamp: "You · 09:21" },
      { role: "assistant", text: "Noted. I’ll treat Victor as a preference and keep classroom delivery as the planning assumption.", stamp: "Assistant · 09:21" },
    ],
    resources: [{
      id: "planning-checklist",
      kind: "Checklist",
      title: "Planning checklist · Paris cohort",
      summary: "Feasibility evidence Amélie reviews before publishing the session plan.",
      facts: [
        { label: "Audience", value: "12 new managers" },
        { label: "Window", value: "Before 30 September" },
        { label: "Capacity", value: "16 seats proposed" },
        { label: "Approval boundary", value: "Amélie approves the session plan" },
      ],
      evidence: ["Mandarin curriculum and session reference", "Trainer availability reference", "Room capacity and lead-time reference", "Planning-rule and deadline check"],
      workflow: [
        { label: "What Amélie is doing", detail: "Testing whether the course, date, trainer, room and seats form a viable delivery plan." },
        { label: "How the information is assembled", detail: "The prototype brings fictional curriculum, resource and planning-rule evidence into one proposal." },
        { label: "What Amélie reviews", detail: "Feasibility, any constrained alternatives and the exact session package that would be published." },
      ],
      sections: [
        { title: "Planning record", items: [{ heading: "New Manager Foundations", detail: "Classroom · Paris La Defense · Victor Laurent preferred", status: "Ready" }, { heading: "Proposed date", detail: "Friday, 18 September 2026 · 09:00–16:30 · 16 seats" }] },
        { title: "Checks completed", items: [{ heading: "Curriculum fit", detail: "Mandatory path matched to Claire’s cohort", status: "Passed" }, { heading: "Resource fit", detail: "Trainer and room available inside the deadline", status: "Passed" }] },
      ],
    }],
  },
  claire: {
    caseTitle: "New manager learning request",
    caseMeta: "12 hires · Paris classroom · before 30 September",
    eyebrow: "Team learning request",
    title: "I’ll help turn the need into a clear request.",
    response: "I’ll capture your cohort, deadline and preferences, then show you only the business choices that need your input. Learning Operations completes the checks and approved registrations.",
    nextStep: "Confirm the 12 people and preferred trainer, then send the request for planning.",
    verification: { id: "REQ-NMF-042", detail: "Cohort, deadline and classroom preference captured for New Manager Foundations.", badge: "Need captured" },
    alert: { title: "Business decisions only", detail: "You own who is in the cohort and which alternatives are acceptable. Amélie owns feasibility; Radu owns registration." },
    primaryAction: "Confirm cohort",
    secondaryAction: "Open request note",
    priorTurns: [
      { role: "user", text: "I need mandatory learning for my new managers in Paris.", stamp: "You · 09:12" },
      { role: "assistant", text: "I found New Manager Foundations as the mandatory path. Tell me the cohort size, deadline and any delivery preference.", stamp: "Assistant · 09:12" },
      { role: "user", text: "There are 12 people and they need it before 30 September. Classroom in Paris is preferred.", stamp: "You · 09:15" },
      { role: "assistant", text: "Captured. I’ll keep this as a business request and only bring you back for choices that need your decision.", stamp: "Assistant · 09:15" },
    ],
    resources: [{
      id: "request-note",
      kind: "Brief",
      title: "Request note · Team learning",
      summary: "Business request that separates Claire’s choices from Learning Operations’ checks.",
      facts: [
        { label: "Need", value: "New Manager Foundations" },
        { label: "Cohort", value: "12 new managers · Paris" },
        { label: "Deadline", value: "Before 30 September" },
        { label: "Approval boundary", value: "Claire confirms business priority and acceptable alternatives" },
      ],
      evidence: ["Business request captured", "Cohort and manager context", "Delivery preference", "Deadline and location preference"],
      workflow: [
        { label: "What Claire is doing", detail: "Setting the team need, deadline and acceptable trade-offs—not creating sessions or registrations." },
        { label: "How the information is assembled", detail: "The prototype converts Claire’s conversation into a fictional request package for Planning and Learning Operations." },
        { label: "What Claire reviews", detail: "The recommended plan, the people affected by exceptions and whether the proposed outcome meets the business need." },
      ],
      sections: [
        { title: "Request record", items: [{ heading: "REQ-NMF-042", detail: "New Manager Foundations · Paris classroom preference", status: "Active" }, { heading: "Preferred trainer", detail: "Victor Laurent · preference, not a hard requirement" }] },
        { title: "Ownership path", items: [{ heading: "Claire", detail: "Business need, cohort and acceptable trade-offs", status: "Owner" }, { heading: "Amélie → Radu", detail: "Plan feasibility, then registration and invitations" }] },
      ],
    }],
  },
  elena: {
    caseTitle: "Weekly invitation controls",
    caseMeta: "INV-04 · 1 participant · remediation pending",
    eyebrow: "Control support",
    title: "I’ll frame the exception before any remediation.",
    response: "I’ll identify the affected records, retain the evidence and prepare a contained remediation. A current invitation or accepted exception still needs your approval.",
    nextStep: "Review the invitation mismatch, then approve the contained repair or assign an owner.",
    verification: { id: "INV-04", detail: "Confirmed registration found without a matching current Outlook invitation.", badge: "Control matched" },
    alert: { title: "Remediation requires approval", detail: "The registration is correct. Only one replacement invitation should be sent after Elena approves." },
    primaryAction: "Approve remediation",
    secondaryAction: "Open evidence note",
    priorTurns: [
      { role: "user", text: "Show me this week’s invitation control exceptions.", stamp: "You · 08:55" },
      { role: "assistant", text: "I completed the weekly INV-04 check. One confirmed registration has no matching current invitation and needs your decision today.", stamp: "Assistant · 08:55" },
      { role: "user", text: "Open the highest-priority item first.", stamp: "You · 08:58" },
      { role: "assistant", text: "Opening the replacement-registration mismatch. I’ll keep the original evidence and prepare a contained invitation repair.", stamp: "Assistant · 08:58" },
    ],
    resources: [{
      id: "control-evidence",
      kind: "Evidence note",
      title: "INV-04 evidence note",
      summary: "Control record showing the issue, evidence, remediation boundary and re-check.",
      facts: [
        { label: "Control", value: "INV-04 · invitation coverage" },
        { label: "Impact", value: "1 participant affected" },
        { label: "Re-check", value: "After approved delivery" },
        { label: "Approval boundary", value: "Elena approves remediation or an accepted exception" },
      ],
      evidence: ["MyLearning confirmed-registration reference", "Outlook current-invitation match", "Control rule and source timestamps retained", "Re-check outcome appended to the audit record"],
      workflow: [
        { label: "What Elena is doing", detail: "Investigating one contained control exception and protecting the original evidence." },
        { label: "How the information is assembled", detail: "The prototype compares fictional registration and invitation references against INV-04." },
        { label: "What Elena reviews", detail: "Impact, root cause, remediation scope, accountable action and the required re-check." },
      ],
      sections: [
        { title: "Control record", items: [{ heading: "INV-04", detail: "Every confirmed registration must have a current calendar invitation", status: "Exception" }, { heading: "Detection", detail: "Weekly control after a replacement registration moved post-batch" }] },
        { title: "Remediation scope", items: [{ heading: "One invitation", detail: "Send current invite · keep registration unchanged", status: "Pending" }, { heading: "Re-check", detail: "Rerun INV-04 after delivery confirmation" }] },
      ],
    }],
  },
};

export const getConversationScenario = (personaId: PersonaId) => scenarios[personaId];
