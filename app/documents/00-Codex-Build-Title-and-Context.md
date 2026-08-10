# SG Learning Operations — product and build context

## Status of this document

This is the product-design brief for the POC and its next iterations. It is not a claim that every state below is implemented. For current code coverage and architecture, read `07-Implementation-Guide.md`; for the intended connected product story, read `06-Connected-Persona-Storyline.md`.

## Build brief

Build a high-fidelity, responsive Next.js React front-end POC called **SG Learning Operations — Conversational Orchestration POC**. Keep the primary experience conversational, with human approval for consequential actions and dashboards used only for operational review and evidence. The POC uses mock data and does not integrate with live systems.

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

The shared rail is collapsible to icons and is available in the mobile drawer. Its destinations vary by accountable persona:

| Persona | Primary destinations | Default |
|---|---|---|
| Claire | **Assistant**, **My requests**, **Team learning** (Help from persona profile menu) | Assistant (New chat), then Team learning / My requests for unit status |
| Amélie | **Assistant**, **Plans**, **Capacity** (Help from persona profile menu) | Assistant |
| Radu | **Assistant**, **Operations**, **Session readiness** (Help from persona profile menu) | Assistant |
| Elena | **Assistant**, **Controls**, **Control health** (Help from persona profile menu) | Assistant (Controls when reviewing exceptions) |

Below the destinations, the rail can show **Projects** and **Recent** conversations. They are conversation organisers, not workflow destinations, and must never replace the persona navigation above.

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
- Context is conversation-linked, never panel-led: a relevant assistant message may link to a fictional brief, checklist or evidence note, which opens the right panel on demand. Do not show a generic Details button or open the panel automatically.
- Do not repeat the signed-in persona’s role, location or explanatory subtitle around a screen title. The left rail supplies persona context; pages lead directly with the task title. Starter cards are title-only. A guided case may use one compact demo pill.
- Desktop-first and responsive to tablet/mobile. On mobile, surface a single primary action and collapse evidence/details.
- Preserve these status terms across every screen: Draft, Ready for review, Needs decision, Approved, In progress, Complete, Follow-up required, Control exception and Control passed.
- Preserve the canonical count baseline: **12 requested → 10 ready → 2 exceptions → 11 confirmed → 1 follow-up.**

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
