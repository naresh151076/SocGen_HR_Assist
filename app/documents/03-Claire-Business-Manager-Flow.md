# Claire Martin — Business Manager / Training Requestor

## Status of this document

This is the target-flow specification for the business-manager experience. The current POC implements Claire's demand submission, business trade-off for Priya and Thomas, 11-person plan confirmation, and role-restricted navigation. Detailed cohort editing, persistence, and notifications remain planned work. See `07-Implementation-Guide.md` for current coverage.

## Story title

**Request and secure mandatory training for a new-manager cohort**

## Persona and boundary

| Field | Detail |
|---|---|
| Role | Business Manager, France |
| Goal | Ensure new managers complete mandatory learning on time. |
| Raises | A cohort need: people, topic, deadline, location and format preference. |
| Decides | The business need, people priority and acceptable alternatives. |
| Does not do | Create sessions, apply registration rules, reconcile records, send invitations or manage controls. |
| Product promise | Say what the team needs; only return for a clear business decision. |

## Scenario

Claire says: “I have 12 new managers joining the Paris organisation. They need New Manager Foundations before 30 September. Please arrange a classroom session in Paris, preferably in the morning. Victor Laurent is our preferred trainer.”

Baseline: 12 people; 18 September recommended session; 10 ready; Priya has a calendar conflict; Thomas starts after the first session; 11 registrations can proceed after Claire’s decisions; Thomas remains follow-up.

## Screen flow

### C1 — Conversation home

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

## Navigation and implementation

Claire has a role-restricted version of the same navigation pattern:

- Assistant
- My requests
- Team learning
- Help

Operations, Controls and Reports are omitted rather than presented as system destinations. The visual rail, collapse behaviour and mobile drawer remain shared.

## Acceptance checks

- Conversation is the home, not a dashboard.
- Claire never chooses a back-office system.
- Every decision identifies its owner: Claire = business priority; Amélie = plan feasibility; Radu = execution.
- Status terms distinguish requested, planned, awaiting business decision, sent for operational approval, confirmed and follow-up required.
- No registration/invitation is shown complete before operational approval.
- Keep 12 requested / 10 ready / 2 decisions / 11 confirmed / 1 follow-up consistent.
