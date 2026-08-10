# Elena Popescu — Learning Operations Control Lead

## Status of this document

This is the target-flow specification for control remediation. The current POC implements Elena's connected INV-04 chat, plus Claire-style destinations: **Controls** (master-detail exception inbox centred on INV-04 with match coverage and evidence rows) and **Control health** (match-rate donut, audit-path strip, Radu → You → re-check handoff). Help opens from the profile menu. Broader weekly-queue volumes below remain target vision; the connected POC uses one participant impact from `scenario.ts`. See `07-Implementation-Guide.md` for current coverage.

For a downloadable persona card, presenter notes and slide wording, use `11-Elena-Control-Lead-Persona-Brief.md`.

## Story title

**Turn weekly control checking into accountable evidence and remediation**

## Persona and boundary

| Field | Detail |
|---|---|
| Role | Learning Operations Control Lead, GSC Romania |
| Goal | Find control gaps, assign remediation and prove correct process execution. |
| Current pain | Weekly/monthly Excel cross-checks across disconnected records; screenshots, emails and comments must be assembled as evidence. |
| Authority | Reviews evidence, approves remediation and escalates recurring control failures. |
| Does not do | Schedule every session or register each individual herself. |
| Product promise | Show what is out of control, why, who owns the fix, and whether proof exists. |

## Scenario (connected POC — source of truth)

After Radu publishes 11 registrations and invitations for Claire’s NMF cohort, Elena opens the weekly invitation control.

| Control item | Value |
|---|---|
| Control | INV-04 · invitation coverage |
| Cohort | New Manager Foundations · 18 September · `NMF-2026-0918` |
| Impact | **1 participant · François Laurent** |
| Finding | Confirmed registration without a matching current Outlook invitation |
| Cause | Session change after the invitation batch |
| Remediation | Send one replacement invitation; keep registration unchanged; re-check INV-04 |
| Approval | Elena must approve before any invitation is sent |

**Product destinations implemented:** Controls (exception inbox centred on INV-04) and Control health (match rate, audit path, Radu → You → re-check). Help is in the profile menu.

## Target vision scenario (not POC UI)

Volume-scale weekly control packs below remain design vision. They must not override the single INV-04 / François Laurent connected case in the prototype.

It is Monday. Elena opens the weekly control review.

Assistant: “I checked 126 active sessions and 1,842 registrations. 118 sessions passed all scheduled checks. Eight need attention. Two require your decision today.”

The highest-priority item is an invitation mismatch across multiple learners after a cancelled session move.

This is mock data. It demonstrates an observed type of manual cross-check; it is not a claim that this incident occurred.

## Screen flow

> **Note:** E1–E3 and E7 below mix **target-vision** weekly volumes with the control pattern. The connected POC conversation and Controls / Control health destinations use **INV-04 · 1 participant · François Laurent** only.

### E1 — Controls home

**Route/state:** /controls · Controls active

**POC headline:** “INV-04 needs your decision today — one participant impact on the NMF cohort.”

| Card (POC) | Value |
|---|---:|
| Matched invites | 10 / 11 |
| Open exception | 1 |
| Control | INV-04 |
| Impact | François Laurent |

Primary action: **Review INV-04**

### E1b — Target vision home (not POC)

Headline: “Good morning, Elena. Two control exceptions need your decision today.”

| Card | Value |
|---|---:|
| Passed | 118 |
| Needs attention | 8 |
| Due today | 2 |
| Overdue | 0 |

Control areas: Session alignment / Target population and registration / Participant invitations / Trainer invitations / Completion / Finance support.

Prompt suggestion: “Show me only controls with participant impact.”

Primary action: **Review decision-required items**

### E2 — Weekly control briefing

Assistant: “I completed the weekly INV-04 check for the New Manager Foundations cohort.”

**POC what changed:**

- 10 of 11 confirmed registrations have a matching current invitation.
- François Laurent needs a replacement invitation after a session change.
- Contained remediation is ready for Elena’s approval.

Actions: **Approve remediation** / **Open evidence note**

Trust note: “Checks use the approved control catalogue. Each result keeps source timestamps and the evidence used.”

### E3 — Exception queue (POC row)

| Priority | Exception | Impact | Why it failed | Owner | Due |
|---|---|---:|---|---|---|
| High | INV-04 missing invitation | 1 learner (François Laurent) | Confirmed registration has no matching current invitation | Elena | Today |

Supporting rows (Risk & Conduct, capacity, prior INV-04) may appear as context but do not change the connected count.

Filter chips: All / Needs you / Watch / Passed.

### E4 — Investigate one exception

Header: “Missing Outlook invitation · New Manager Foundations · Paris · 18 September 2026 · François Laurent.”

Plain-language explanation: “François is registered but does not have a matching calendar invitation after a session change.”

**Control checked:** Every confirmed registration must have a current calendar invitation.

**Outcome:** 10 of 11 confirmed registrations have a match; one does not.

| Learner | Learning status | Invitation status | Why |
|---|---|---|---|
| François Laurent | Confirmed | No active invite | Session change after the invitation batch |

Evidence timeline:

1. Radu registered the NMF cohort (11 confirmed paths).
2. A session change occurred after the invitation batch.
3. The weekly INV-04 control found no matching current invite for François.
4. The exception was assigned to Elena.

Recommendation: “Send one personalised invitation now. Keep the registration unchanged.”

Actions: **Approve and send invitation** / **Assign to Radu** / **Mark accepted exception**

An accepted exception requires reason, expiry date and accountable owner.

### E5 — Remediation approval

Approval title: “You are approving an operational communication action.”

After approval, the product will:

1. Create one invitation for François Laurent.
2. Include course date, location, trainer and cancellation instructions.
3. Record the session-change context.
4. Rerun INV-04 after delivery confirmation.

Fields: decision, reason, approver, control reference INV-04, retention note.

Primary action: **Approve and send 1 invitation**

Guardrail: “No invitation is sent until an accountable user approves this action.”

### E6 — Confirmation and audit record

Success: “Invitation sent and control passed.”

| Result | Value |
|---|---|
| Invitations delivered | 1 of 1 |
| Matching records | 11 of 11 |
| Control result | INV-04 passed |
| Audit record | Updated |

Audit record fields: control; initial failure; detected timestamp; sources; root cause; decision; approver; completed timestamp; re-check; related records.

Original evidence is preserved; remediation entries are appended, never overwritten.

### E7 — Control reporting (target vision metrics)

Headline: “Invitation controls are improving, but replacement registrations remain the main source of exceptions.”

Metrics (vision): control pass rate 94.8%; decision-required exceptions 2; average remediation time 5h 18m; evidence complete 342 / 344.

Insight: “Replacement registrations occur after scheduled invitation batches. Consider an approved event-triggered invitation workflow.”

Actions: View recurring root causes / Assign improvement action / Export weekly control pack.

## Build guardrails

- Do not claim all 344 controls are automated; model an approved catalogue with future automation eligibility.
- The assistant cannot silently close an exception, alter source records or accept an exception without a named accountable human.
- Connected POC impact stays at **1 participant (François Laurent)**; weekly volume figures stay in target vision only.
- Passed requires relevant evidence—not an AI-generated explanation.
- Systems belong in evidence/action summaries, never primary navigation.
- Navigation is Assistant · Controls · Control health (Help in profile).
