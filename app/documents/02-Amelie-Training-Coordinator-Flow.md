# Amélie Martin — Training Coordinator (ACO/GES)

## Status of this document

This is the target-flow specification for the planning persona. The current POC implements Amélie's connected planning chat for Claire’s **12-person** Paris NMF case (`scenario.ts`), plus Claire-style destinations: **Plans** (master-detail programme inbox with feasibility glyphs) and **Capacity** (seat meter, September strip, resource pass chips, Claire → You → Radu handoff). Help opens from the profile menu. The larger 180-person / 8-session programme below remains target vision, not the connected POC truth set. See `07-Implementation-Guide.md` for current coverage.

For a downloadable persona card, presenter notes and slide wording, use `09-Amelie-Training-Coordinator-Persona-Brief.md`.

## Story title

**Plan a viable training programme before any session is published**

## Persona and boundary

| Field | Detail |
|---|---|
| Role | Training Coordinator, ACO/GES |
| Goal | Publish a plan that respects curriculum, capacity, trainer and room constraints. |
| Current pain | She validates dates manually and creates every session separately across Mandarin, MyLearning and Excel. |
| Authority | Approves planning assumptions, schedule changes and bulk session publication. |
| Does not own | Individual registration, invitations or day-to-day participant changes. |
| Product promise | Review one plan, resolve bounded conflicts, approve once. |

## Scenario

Claire raises this demand: “We need to train 180 newly appointed managers in Paris before 30 November. Use the mandatory New Manager Foundations curriculum. We prefer classroom delivery.”

**Mock-data baseline**

| Planning item | Value |
|---|---|
| Programme | New Manager Foundations |
| Training code | NMF-2026-FR |
| Audience | 180 new managers, Paris |
| Window | 15 September–30 November 2026 |
| Format | Classroom |
| Standard session capacity | 24 |
| Required sessions | 8 sessions / 192 seats |
| Trainer pool | Victor Laurent, Sophie Bernard, Karim Haddad |
| Initial result | 6 ready sessions; 2 decisions required |

**Exceptions**

1. Victor is booked on another mandatory programme on 22 October.
2. Atlas 4 only has 18 seats on 12 November; 24 are required.

## Screen flow

### A1 — Assistant home: start planning

**Route/state:** /assistant · Draft

Amélie says: “Plan classroom sessions for 180 new managers in Paris between 15 September and 30 November. Use New Manager Foundations.”

Assistant: “I found the demand for 180 learners. Before I validate dates and capacity, confirm the planning assumptions.”

Show confirmation cards:

| Card | Value |
|---|---|
| Delivery format | Classroom |
| Planning window | 15 Sep–30 Nov 2026 |
| Session size | 24 learners — planning rule |
| Sessions required | 8 / 192 seats |
| Trainer pool | Victor, Sophie, Karim |

Primary action: **Review planning brief**

Evidence disclosure: Demand request, Mandarin catalogue, capacity rule v3.2, checked timestamp.

### A2 — Planning brief: confirm scope

Assistant: “I will check curriculum rules, trainer availability, room capacity, lead time and duplicate sessions before I propose the plan.”

Compact editable brief:

| Field | Value |
|---|---|
| Demand owner | Claire |
| Curriculum | New Manager Foundations |
| Learners | 180 |
| Region | Paris |
| Format | Classroom |
| Window | 15 Sep–30 Nov |
| Preferred days | Tue–Thu |
| Sessions required | 8 — calculated |

Callout: “Eight sessions provide 192 seats, leaving 12 seats for approved additions or replacements.”

Primary action: **Validate and propose schedule**

Loading copy: “Checking 8 session slots against 3 trainers, 2 locations and current planning rules…”

### A3 — Schedule proposal: ready versus decision

Assistant: “I found a workable plan for all 180 learners. Six sessions are ready to publish. Two need your decision.”

Summary: 180 learners / 8 sessions / 192 seats / 6 ready / 2 need decision / 46 checks passed.

| Date | Trainer | Room | Seats | Status |
|---|---|---|---:|---|
| 17 Sep | Sophie Bernard | Orion 2 | 24 | Ready |
| 24 Sep | Karim Haddad | Orion 2 | 24 | Ready |
| 1 Oct | Victor Laurent | Atlas 4 | 24 | Ready |
| 8 Oct | Sophie Bernard | Orion 2 | 24 | Ready |
| 15 Oct | Karim Haddad | Orion 2 | 24 | Ready |
| 22 Oct | Victor Laurent | Orion 2 | 24 | Needs decision — trainer |
| 5 Nov | Sophie Bernard | Orion 2 | 24 | Ready |
| 12 Nov | Karim Haddad | Atlas 4 | 18 | Needs decision — room |

Primary action: **Resolve 2 planning decisions**

The selected row opens an evidence panel containing rule, rule version, source checked, timestamp, failed outcome and suggested action.

### A4 — Trainer conflict decision

Assistant: “Victor Laurent cannot deliver the 22 October session. He is assigned to Conduct & Compliance Essentials at the same time. I found two compliant alternatives.”

| Option | Outcome | Recommendation |
|---|---|---|
| Assign Sophie Bernard | Same date, room and capacity; qualified and available. | Recommended |
| Move to 29 October | Keeps Victor; remains in the requested window. | Available |
| Remove session | Leaves 168 seats for 180 people. | Not recommended |

Primary action: **Use Sophie Bernard**

Rationale field is pre-filled: “Maintain programme date and capacity using an available qualified trainer.”

Result: “Trainer conflict resolved. The session is ready for final review.”

### A5 — Room capacity decision

Assistant: “Atlas 4 has only 18 available seats. Publishing it would leave the programme six seats short.”

| Option | Outcome | Recommendation |
|---|---|---|
| Move to Orion 2 | Same date/trainer; 24 seats. | Recommended |
| Keep Atlas 4 and add session 9 | Adds six-seat session and more coordination. | Available |
| Move to 19 Nov, Orion 2 | Meets capacity but shifts a week. | Available |

Primary action: **Use Orion 2**

Warning: “Changing the room after publication requires updated invitations. No invitations have been created yet.”

Result: “All 8 sessions now meet planning rules.”

### A6 — Pre-publish review

Assistant: “Your programme is ready for approval. Publishing will create 8 sessions in Mandarin and synchronise approved session records to MyLearning. Registration and Outlook invitations begin later with Learning Operations.”

| Item | Value |
|---|---|
| Learners planned | 180 |
| Sessions / seats | 8 / 192 |
| Delivery window | 17 Sep–12 Nov |
| Trainer change | Sophie assigned 22 Oct |
| Room change | Orion 2 assigned 12 Nov |
| Planning rule checks | 48 passed |
| Open planning exceptions | 0 |
| Registration/invitations | Not started |

Acknowledgement: “I have reviewed the proposed plan and approve publication to the designated systems of record.”

Primary action (disabled until acknowledgement): **Approve and publish 8 sessions**

### A7 — Publishing and hand-off

Assistant: “Publishing your approved programme. I will confirm each update and show you only if something needs attention.”

| Background action | Result |
|---|---|
| Create sessions in Mandarin | 8 of 8 complete |
| Synchronise sessions to MyLearning | 8 of 8 complete |
| Record approval and planning evidence | Complete |
| Create Learning Operations hand-off | Complete |
| External-trainer PO check | Not required — internal trainers |

Completion message: “Eight sessions are ready for registration. Radu has received the registration work package for 180 learners.”

Handoff card: final programme schedule, rule results, trainer/room decisions, approval record and session references.

## Build guardrails

- Do not claim integrations or autonomous writes are real; state simulated/planned actions when appropriate.
- Amélie approves publishing; participant registration begins only after this hand-off.
- Keep 180 / 8 / 192 / 6 initially ready / 2 decisions consistent.
- Keep Assistant active through A7. Planning board belongs in Operations as an optional manual view.
- Use the common four-item navigation from the Context file; do not create planning-system navigation.
