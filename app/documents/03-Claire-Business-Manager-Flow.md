# Claire Martin — Business Manager / Training Requestor

## Status of this document

This is the target-flow specification for the business-manager experience. The current POC implements Claire's demand submission, business trade-off for Priya and Thomas, 11-person plan confirmation, detailed My requests, Team learning and Help support views, and role-restricted navigation. Detailed cohort editing, persistence, and notifications remain planned work. See `07-Implementation-Guide.md` for current coverage.

For a downloadable persona card, presenter notes and slide wording, use `08-Claire-Business-Manager-Persona-Brief.md`.

## Story title

**Request and secure mandatory training for a new-manager cohort**

## Persona and boundary

| Field | Detail |
|---|---|
| Role | Business Manager, France |
| Goal | Keep Markets & Risk learning needs visible and on time; raise cohort requests and decide only the business trade-offs. |
| Raises | A cohort need: people, topic, deadline, location and format preference — usually started in conversation. |
| Decides | The business need, people priority and acceptable alternatives. |
| Does not do | Create sessions, apply registration rules, reconcile records, send invitations or manage controls. |
| Product promise | Ask in plain language; oversee the unit’s learning status; return only for a clear business decision. |

## Scenario

Claire says: “I have 12 new managers joining the Paris organisation. They need New Manager Foundations before 30 September. Please arrange a classroom session in Paris, preferably in the morning. Victor Laurent is our preferred trainer.”

Baseline: 12 people; 18 September recommended session; 10 ready; Priya has a calendar conflict; Thomas starts after the first session; 11 registrations can proceed after Claire’s decisions; Thomas remains follow-up.

## Screen flow

### C1 — Conversation home

The shared landing page first shows the local Registration operations activity chart. **Demo flow** in its top-right corner opens this connected case at C1; selecting the rail logo returns to the chart landing page.

Prompt: “What does your team need to learn?”

Suggested prompts: Train a new cohort / Check my team’s required learning / See my open requests.

Assistant: “I found the mandatory learning path New Manager Foundations. Before I send it for planning, confirm the 12 people and whether Victor is a preference or a requirement.”

Primary action: **Review 12 people**

### C2 — Cohort review

Assistant: “I found 12 new managers in your Paris organisation. Review the group before I submit the learning request.”

Show name, role/organisation, start date and requested-learning status. Do not reveal eligibility results at this point.

Note: “The learning team will check eligibility, previous completion and scheduling conflicts before anyone is registered.”

Primary action: **Confirm 12 people**

Guardrail: later changes appear as documented amendments, not silent edits.

### C3 — Request submitted

Status card: Request received · New Manager Foundations · 12 people · Paris · before 30 September.

Journey tracker: Request received → Plan checked → Your decision if needed → Registrations confirmed.

Assistant: “Amélie will check course rules, trainer availability, room capacity and possible dates. I’ll bring you back only if a business decision is needed.”

Evidence disclosure: curriculum, trainer and room checks in progress; employee check follows a proposed session. Do not name operational systems.

### C4 — Recommended plan

Recommended session:

| Detail | Value |
|---|---|
| Date | Friday, 18 September 2026 |
| Time | 09:00–16:30 |
| Location | Paris — La Défense Learning Centre |
| Format | Classroom |
| Capacity | 16 seats available |
| Trainer | Victor Laurent |
| Deadline | 12 days before the requested date |

Assistant: “I found a plan that meets your deadline and preference. Shall I ask Learning Operations to reserve this option and check the 12 employees for registration?”

Actions: **Confirm this plan** / **See alternatives**

Plain-language note: “Your choice is a business confirmation. Learning Operations completes registration and communication checks before publishing.”

### C5 — Two business decisions

Assistant: “The proposed session works for 10 people. Two need your decision. You can register the 10 ready people now and choose alternatives for the other two.”

**Priya Shah — calendar conflict**

“Priya already has a mandatory course at the same time on 18 September.”

Recommendation: 22 September with Victor; still before deadline.

Actions: **Choose 22 September** / **Keep 18 September and ask for review** / **Remove Priya**

**Thomas Bernard — start-date condition**

“Thomas starts on 21 September and cannot be registered for the 18 September session.”

Recommendation: 9 October; after requested deadline.

Actions: **Choose 9 October** / **Ask Learning Operations for another option** / **Remove Thomas**

Primary action: **Confirm decisions**

The audit disclosure says availability/timing check, source record and outcome—not a raw rule identifier as the headline.

### C6 — Business confirmation and hand-off

Assistant: “Here is the request I will send to Learning Operations: register 10 people for 18 September; register Priya for 22 September; ask Radu for the earliest suitable option for Thomas.”

Acknowledgement: “I confirm that this plan meets my team’s business need.”

Primary action: **Send for operational approval**

After send: “Radu will complete registration, communication and evidence checks. I’ll notify you if another business decision is needed.”

### C7 — Completion / change request

Status: 11 registrations confirmed; 11 calendar invitations sent; 1 follow-up still open.

Assistant: “10 managers are confirmed for 18 September; Priya is confirmed for 22 September; Thomas needs a later session. Radu is finding the earliest suitable option.”

Actions: **View my team learning** / **Request a change** / **Contact Learning Operations**

### C8 — My requests workspace (implemented)

The My requests destination is a full-width master-detail inbox for Claire’s business learning needs. It uses the same edge-to-edge compact header as conversation (no outer page padding) and stays inside the centre workspace—no right context panel. The left column lists recent requests; the right column shows the selected request’s business detail.

- **Needs your attention:** parent team request `NMF-042` and Thomas’s linked later-session follow-up.
- **Recent requests:** Risk & Conduct refresh, Markets deputies leadership, cyber awareness for direct reports, graduate onboarding, and client-facing conduct—examples of cohort and mandatory needs a France business manager would raise.
- Selected team detail leads with coverage before the deadline (11 of 12), the one business decision still with Claire, and a plain-language cohort breakdown.
- The list is a compact table-like view (request, status, due) with filters for All / Needs you / In progress / Confirmed. Rows use two lines only; selection is a flat soft-red fill without a side border.
- Detail actions sit beside the title; key facts use a clean meta strip rather than stacked grey cards.
- Selecting the linked Thomas item explains the 9 October option and its after-deadline impact without implying that a registration was made.
- **Prepare a request** (header menu), **Review options with Assistant**, and **Compare options with Assistant** open a contextual conversation. They prepare explanation or a new request; they do not commit an operational decision.
- Ownership stays one short note: Claire owns the learning need and trade-off; Training Coordination owns feasible planning; Learning Operations owns approved registrations and invitations. Claire does not see back-office controls or an ops hand-off console.

### C9 — Team learning (implemented)

Team learning is Claire’s **Markets & Risk** unit overview for HR transformation via conversation — not an LMS or reporting console. It answers who is on the team, who is new vs established, who needs action, and who needs what.

- Full-width chart workspace: team mix, training status, who-needs-what bars, and the active NMF-042 case.
- Right-hand **Team members** panel: search, status filters, initials avatars, role, tenure and learning status.
- Compact KPIs for My team / New / Established / Need action / Up to date.
- Open follow-ups (for example Thomas Bernard) route back into the conversational assistant for the business choice.
- No registration, invitation or control actions are available here; those stay with Learning Operations and Control personas.

### C10 — Help (implemented)

Help remains a guidance destination for Claire as Business Manager, but it is not a primary left-rail destination. It opens from the persona profile menu so day-to-day work stays in chat, My requests and Team learning. It offers starting points to request learning, check progress or resolve an exception, restates ownership across Claire, Training Coordination and Learning Operations, lists useful questions, and makes the assistant’s limits explicit.

## Navigation and implementation

Claire has a role-restricted version of the same navigation pattern:

- Assistant
- My requests
- Team learning

Help is available from the persona profile menu rather than the left rail. Operations, Controls and Reports are omitted rather than presented as system destinations. The visual rail, collapse behaviour and mobile drawer remain shared.

## Acceptance checks

- Conversation is the home, not a dashboard.
- Claire never chooses a back-office system.
- Every decision identifies its owner: Claire = business priority; Amélie = plan feasibility; Radu = execution.
- Status terms distinguish requested, planned, awaiting business decision, sent for operational approval, confirmed and follow-up required.
- No registration/invitation is shown complete before operational approval.
- Keep 12 requested / 10 ready / 2 decisions / 11 confirmed / 1 follow-up consistent.
- My requests makes the Thomas decision visible without changing the 11 confirmed registrations.
- Team learning stays a business-unit overview; consequential choices still open in Assistant or My requests.

## Claire vs other personas (presentation)

Claire is the **business consumer** of learning operations in an HR transformation story told through conversational AI.

| | Claire (Business Manager) | Amélie (Training Coordination) | Radu (Learning Operations) | Elena (Controls) |
|---|---|---|---|---|
| Lands on | New chat / Assistant home | Assistant | Assistant | Assistant / Controls |
| Speaks in | Plain business need | Feasible plan options | Registration & invitation execution | Control evidence & exceptions |
| Oversees | Unit readiness (Team learning) and request status (My requests) | Session viability | Queues and mass outcomes | Auditability of outcomes |
| Approves | Business trade-offs only | Plan feasibility | Operational publish / send | Control close / remediation |
| Does not see | Ops queues, rule engines, control consoles | Business unit dashboards | Claire’s team overview | Demand intake as primary work |

**Demo path for Claire:** Home → New chat (“What does your team need to learn?”) → raise or continue a cohort request → My requests for status and decisions → Team learning for Markets & Risk readiness → Ask assistant / Open follow-up returns to conversation. Help stays in the profile menu so guidance never competes with chat.

**Transformation message:** Existing systems of record stay in the background. Claire does not learn Mandarin, MyLearning or Neocase. She asks in language, sees unit readiness at a glance, and returns only when a named business decision is required.
