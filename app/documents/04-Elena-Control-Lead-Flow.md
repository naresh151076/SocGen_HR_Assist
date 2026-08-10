# Elena Popescu — Learning Operations Control Lead

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

## Scenario

It is Monday. Elena opens the weekly control review.

Assistant: “I checked 126 active sessions and 1,842 registrations. 118 sessions passed all scheduled checks. Eight need attention. Two require your decision today.”

The highest-priority item is an invitation mismatch: 10 people are registered in MyLearning for New Manager Foundations on 18 September, but two do not have matching Outlook invitations after they were moved from a cancelled session.

This is mock data. It demonstrates an observed type of manual cross-check; it is not a claim that this incident occurred.

## Screen flow

### E1 — Controls home

**Route/state:** /controls · Controls active

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

Assistant: “I completed the weekly learning-operations check across active sessions, registrations and invitations.”

What changed:

- Six invitation mismatches resolved when source data synchronised.
- Two need approval because an Outlook action is required.
- Four lower-priority session-data discrepancies have owners and remain in their resolution window.

Actions: **Review 2 decision-required items** / **View all 8 exceptions** / **Download weekly control summary**

Trust note: “Checks use the approved control catalogue. Each result keeps source timestamps and the evidence used.”

### E3 — Exception queue

| Priority | Exception | Impact | Why it failed | Owner | Due |
|---|---|---:|---|---|---|
| High | Missing participant invitations | 2 learners | Confirmed registration has no matching invitation | Elena | Today |
| Medium | Session data mismatch | 1 session | Trainer differs between session records | Amélie | Tomorrow |
| Medium | Target population variance | 4 learners | Registration differs from approved target list | Radu | Tomorrow |
| Low | Closure evidence incomplete | 1 session | Attendance confirmation pending | Radu | 3 days |

Filter chips: All / Needs my approval / Participant impact / Overdue / Assigned to me.

### E4 — Investigate one exception

Header: “Missing Outlook invitations · New Manager Foundations · Paris · 18 September 2026 · High priority · 2 learners affected.”

Plain-language explanation: “Two employees are registered but do not have a matching calendar invitation. Training is in three days.”

**Control checked:** Every confirmed registration must have a current calendar invitation.

**Outcome:** 10 of 12 registrations have a match; two do not.

| Learner | Learning status | Invitation status | Why |
|---|---|---|---|
| Sofia Marin | Confirmed | No active invite | Moved from a cancelled session after the invitation batch |
| Andrei Ionescu | Confirmed | No active invite | Moved from a cancelled session after the invitation batch |

Evidence timeline:

1. Radu registered Sofia and Andrei.
2. Replacement-registration rule was applied.
3. The previous invitation batch was already complete.
4. The weekly control identified no matching current invite.
5. The exception was assigned to Elena.

Recommendation: “Send two personalised invitations now. Keep registrations unchanged.”

Actions: **Approve and send invitations** / **Assign to Radu** / **Mark accepted exception**

An accepted exception requires reason, expiry date and accountable owner.

### E5 — Remediation approval

Approval title: “You are approving an operational communication action.”

After approval, the product will:

1. Create invitations for Sofia and Andrei.
2. Include course date, location, trainer and cancellation instructions.
3. Record the replacement rule context.
4. Rerun the invitation control after delivery confirmation.

Fields: decision, reason, approver, control reference INV-04, retention note.

Primary action: **Approve and send 2 invitations**

Guardrail: “No invitation is sent until an accountable user approves this action.”

### E6 — Confirmation and audit record

Success: “Invitations sent and control passed.”

| Result | Value |
|---|---|
| Invitations delivered | 2 of 2 |
| Matching records | 2 of 2 |
| Control result | INV-04 passed |
| Audit record | Updated |

Audit record fields: control; initial failure; detected timestamp; sources; root cause; decision; approver; completed timestamp; re-check; related records.

Original evidence is preserved; remediation entries are appended, never overwritten.

### E7 — Control reporting

Headline: “Invitation controls are improving, but replacement registrations remain the main source of exceptions.”

Metrics: control pass rate 94.8%; decision-required exceptions 2; average remediation time 5h 18m; evidence complete 342 / 344.

Insight: “Replacement registrations occur after scheduled invitation batches. Consider an approved event-triggered invitation workflow.”

Actions: View recurring root causes / Assign improvement action / Export weekly control pack.

## Build guardrails

- Do not claim all 344 controls are automated; model an approved catalogue with future automation eligibility.
- The assistant cannot silently close an exception, alter source records or accept an exception without a named accountable human.
- Passed requires relevant evidence—not an AI-generated explanation.
- Systems belong in evidence/action summaries, never primary navigation.
- Preserve global visual tokens and navigation. Use Controls active for E1–E7.

