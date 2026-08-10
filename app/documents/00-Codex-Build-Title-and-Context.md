# Build title: SG Learning Operations — Conversational Orchestration POC

## Copy this first into Codex

> Build a high-fidelity, responsive Next.js React front-end POC called **SG Learning Operations — Conversational Orchestration POC**. Use the accompanying persona flow Markdown files as the source of truth. Start with 01-Radu-Learning-Administrator-Flagship-Flow.md; implement the other personas as connected supporting routes/states. This is a clickable mock-data prototype, not a live integration. Keep the primary experience conversational, with human approval for consequential actions and dashboards used only for operational review and evidence.

## Product premise

SG GSC Romania manages training planning and administration across a France-first perimeter. The work spans demand, schedule validation, sessions, targeting, registrations, invitations, changes, completion, controls, reporting and invoice support. Existing systems remain systems of record; the POC is an orchestration workbench that makes the work intelligible and governed.

### Evidence-based design facts

| Fact | Design implication |
|---|---|
| 115 curricula and 607 training codes in the 2025 perimeter | Planning needs searchable, scoped curriculum information; do not invent a generic course catalogue UI. |
| 9,608 sessions and 86,699 enrolled/completed/incomplete employees in 2025 | Design for operational volume, queues and bulk outcomes—not one-off consumer booking. |
| 12 registration rules; some codes have up to 10 registration waves | Each outcome must explain the applied rule and carry a traceable rule version. |
| 344 formalised controls in 2025 | Evidence is a first-class outcome, not a reporting afterthought. |
| Three registration inputs: targeting files, shared-space files and Neocase | Show one consolidated intent/queue; never force Radu to pick a source before he can work. |
| 24.7% face-to-face unsubscribe rate (2025) | Cancellation and replacement need an intentional, low-effort experience. |

## Product model

### Visible application navigation

Use this exact sparse navigation on desktop, collapsible to icons; expose the same destinations in a mobile drawer:

1. **Assistant** — the default, conversational intent-to-action experience.
2. **Operations** — work queue, published-session status, exception handling.
3. **Controls** — rule evidence, control results and remediation.
4. **Reports** — operational health and trend summaries.

Do **not** make Mandarin, MyLearning, HR Data/SWS, Neocase, Outlook, Excel or SAP/Ariba primary destinations. They are background systems and should appear only in a non-interactive Systems checked / Planned actions / Evidence panel.

### Governance principles

- The assistant can prepare, validate, recommend and execute routine, approved steps.
- A named human approves a consequential action: publishing a plan, sending mass invitations, making a material schedule change, or closing an unresolved control.
- The UI says what was checked, the result, the rule/policy basis, the evidence reference, and the next action.
- Do not claim that an AI decision replaced a policy rule. Describe outcomes as Rule applied, Check passed, or Needs review.
- Do not show a visible multi-agent swarm. Specialised work happens in the background and is summarised as checks/evidence.

## Core visual and interaction direction

- Société Générale-inspired, not copied: white workspace, near-black text, restrained SG red for key action/status, soft neutral borders.
- Conversation is the centre of the screen. Use concise assistant turns, structured proposal cards, and one clear decision at a time.
- Desktop-first and responsive to tablet/mobile. On mobile, surface a single primary action and collapse evidence/details.
- Preserve these status terms across every screen: Draft, Ready for review, Needs decision, Approved, In progress, Complete, Blocked.
- Preserve this count baseline for the Radu demo: **12 requested; 10 ready to register; 2 need a decision.**

## POC constraints

- Front-end only: local typed mock data, no authentication, API, database or live external connections.
- Simulate state changes after approval; do not mark background actions complete before approval.
- Use French names and France locations only as fictional demo data. Do not present them as client records.
- Make every primary button functional within the demo state.

## Required shared components

- AppShell / expandable left navigation / mobile drawer
- ConversationThread and composer
- SystemEvidence drawer or panel
- RuleOutcome and ExceptionCard
- ApprovalPanel
- AuditTimeline
- WorkQueueRow
- StatusBadge

## Build order

1. Implement Radu’s first four screens and interactions; review conversational clarity.
2. Add Radu approval, execution and post-publish operational state.
3. Add Amélie, Claire and Elena as supporting routes/states using the shared shell/components.
4. Run the final consistency checklist in 05-Cross-Persona-UX-QA.md.

