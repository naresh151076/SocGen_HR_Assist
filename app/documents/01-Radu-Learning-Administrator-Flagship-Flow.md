# Radu Petrescu — Learning Administrator

## Status of this document

This is the detailed target-flow specification. The current POC implements Radu's connected registration stages: group checking, exception review, final approval, simulated publication, completion evidence, and hand-off to Elena's control workflow. It does not connect to systems of record or persist records. See `07-Implementation-Guide.md` for the delivered scope.

## Why this is the flagship flow

Radu is the best first POC persona because he performs the fragmented, repeatable work: consolidating requests, applying registration rules, checking availability, registering people, sending invitations, handling cancellations, and creating operational proof. The product should make **Radu the decision-maker**, not make AI the hero.

## Persona card

| Field | Detail |
|---|---|
| Name | Radu Petrescu *(fictional demo persona)* |
| Role | Learning Administrator, GSC Romania |
| Goal | Register the right people and communicate accurately at volume, with a clear audit trail. |
| Current pain | He switches between intake files/cases, MyLearning, HR data, Outlook and Excel checks; a cancellation restarts work. |
| Product promise | One operational intent; routine checks and actions in the background; Radu handles only decisions and approvals. |
| Success moment | He can see exactly who is ready, why two people are not, then approve a safe, traceable action. |

## The simple story

Claire, a business manager, needs 12 new managers trained in **New Manager Foundations** in Paris. Amélie has already proposed an available session. Radu must turn that plan into correct registrations and invitations.

**Kid-simple explanation:** Radu is organising a class trip. Today the class list, bus list, permission slips and calendar live in separate rooms. The future product brings the answers to one desk and only asks him when a choice matters.

## Screen flow

### Screen R1 — Assistant home: receive one operational intent

**Route/state:** /assistant · Draft

**Purpose:** Begin from a normal-language request, not a form-heavy registration workflow.

**Primary conversation**

Radu: Prepare registrations for the 12 new managers in Paris for New Manager Foundations. Use the proposed 18 September session. Do not send invitations until I approve.

Assistant: I found the proposed session: New Manager Foundations · 18 September · Paris La Défense · Victor Martin · 16 seats. I will check eligibility, existing learning bookings and availability for the 12 people. I will not register anyone or send invitations without your approval.

**Primary action:** Check the group

**UI elements**

- Conversation thread occupying the main canvas.
- Compact session summary card: date, location, trainer, capacity 0 / 16 filled, status Draft.
- “What I will check” disclosure: curriculum rule, registration-rule eligibility, duplicate booking, calendar availability, capacity.
- Evidence is collapsed: Systems to check: HR Data/SWS, MyLearning, Outlook.

**Interaction:** Clicking Check the group produces R2 loading state, then R2.

**Do not show:** Separate login/system tiles, raw API logs, prompt-engineering language, or an all-person directory.

---

### Screen R2 — Outcome: ten ready, two need a decision

**Route/state:** /assistant?task=reg-042 · Ready for review

**Purpose:** Make the outcome and the human decision obvious in under five seconds.

**Assistant response:** Group check complete. 10 people are ready to register. 2 need your decision before I can continue.

**Primary result card**

| Result | Count | Meaning |
|---|---:|---|
| Ready to register | 10 | Eligibility and schedule checks passed. |
| Needs decision | 2 | A rule or calendar conflict needs Radu’s choice. |
| Capacity after proposed registrations | 10 of 16 | The session has enough seats. |

**Two exception cards** *(fictional demo data)*

1. **Camille Moreau — Calendar conflict**
   - Conflict: Client onboarding workshop, 09:00–12:00.
   - Recommendation: Offer the 25 September Paris session.
   - Actions: **Choose alternative** / **Keep on current session**
2. **Nicolas Bernard — Prerequisite not confirmed**
   - Rule R-04: Manager Essentials completion is not available in the current learning record.
   - Recommendation: Ask Claire to confirm an approved exemption or nominate a replacement.
   - Actions: **Request exemption** / **Choose replacement**

**Evidence panel**

- Registration policy R-07 evaluated
- Existing booking check completed in MyLearning
- Calendar availability check completed
- Prerequisite confirmation requires decision

**Interaction:** Resolve 2 decisions opens R3; the “10 ready” people must not yet be registered.

---

### Screen R3 — Resolve exceptions without losing the whole group

**Route/state:** /assistant?task=reg-042&step=exceptions · Needs decision

**Purpose:** Let Radu make two compact, reversible decisions while preserving the group context.

The main conversation says: “The 10 ready registrations are held as a draft. Resolve the two exceptions, then review the complete action.”

**Decision A — Camille**

Camille Moreau has a confirmed calendar conflict.

Recommended: Move Camille to New Manager Foundations on 25 September, Paris La Défense. Why: Same curriculum, 5 seats available, no calendar conflict.

Actions: **Use 25 September** / **Keep 18 September** / **Exclude from this action**

**Decision B — Nicolas**

Nicolas Bernard needs an approved prerequisite exemption.

Actions: **Send exemption request to Claire** / **Replace Nicolas** / **Exclude from this action**

**Chosen demo path**

- Radu chooses **Use 25 September** for Camille.
- Radu chooses **Send exemption request to Claire** for Nicolas.

Assistant: “The action now includes 11 proposed registrations: 10 for 18 September and 1 alternative registration for 25 September. Nicolas remains pending Claire’s decision.”

**Primary action:** Review before approval

**Controls:** Every choice creates a timeline entry, including actor, timestamp, prior result and rationale. The choice can be edited before approval.

---

### Screen R4 — Approval: make the boundary explicit

**Route/state:** /assistant?task=reg-042&step=review · Ready for review

**Purpose:** Present a compact approval boundary before systems are updated or invitations are sent.

**Approval panel**

Ready for your approval

11 registrations will be created:

- 10 people — 18 September, Paris La Défense
- Camille Moreau — 25 September, Paris La Défense

1 request will be sent:

- Claire: approve or decline Nicolas Bernard’s prerequisite exemption

11 Outlook invitations will be prepared and sent after registrations are confirmed.

**Actions:** **Approve and publish** / **Back to decisions**

**Evidence disclosure**

- MyLearning — create 11 registrations
- Outlook — send 11 calendar invitations
- Neocase — create 1 approval request
- Control record — save rule outcomes and Radu’s decision

**Non-negotiable interaction:** Approve and publish requires an explicit confirm modal: “Publish 11 registrations and send 11 invitations?” The confirm action changes the state to In progress, then Complete. A cancel leaves the draft intact.

---

### Screen R5 — Completion: proof and next task

**Route/state:** /assistant?task=reg-042&step=complete · Complete

**Purpose:** Close routine work without making Radu audit multiple systems.

Assistant: “Published successfully. 11 registrations confirmed in MyLearning; 11 Outlook invitations sent; Camille is registered for the 25 September session; Nicolas’s exemption request is waiting for Claire. I will bring Nicolas back to your queue when Claire responds.”

**Completion card**

| Item | Status | Evidence |
|---|---|---|
| 18 Sep group registration | Complete | ML-REG-2026-10482 |
| 25 Sep alternative registration | Complete | ML-REG-2026-10483 |
| Invitations | Complete | OUT-INV-2026-3021 |
| Nicolas exemption | Waiting on Claire | NC-REQ-2026-887 |

**Next actions:** Open Operations queue / View evidence / Start another task.

---

### Screen R6 — Operations: a cancellation is handled by exception

**Route/state:** /operations · task reg-042 selected

**Trigger:** Two days later, Camille cancels her 25 September place.

**Queue row:** Needs decision · Camille Moreau cancelled · New Manager Foundations · 25 Sep · 1 seat open.

**Assistant side panel:** “Camille cancelled her 25 September registration. The calendar invite has been withdrawn. I found one eligible waitlisted employee, Léa Dubois. She has no booking conflict and meets the session rule.”

**Actions:** Review Léa / Leave seat open.

Review Léa opens a compact approval panel. Radu approves; only then does the UI show Registration confirmed and Invitation sent.

## Acceptance checks for implementation

- Same app shell and status vocabulary as every other persona flow.
- Counts never drift from 12 requested → 10 initially ready → 2 exceptions → 11 approved registrations → 1 approval pending.
- Approval happens before completion claims.
- Every exception has a named cause, rule/check explanation, recommendation, and an alternative action.
- Every background-system reference is evidence/action metadata—not navigation.
- The flow is usable with keyboard focus and the review/approval card stacks vertically on narrow screens.
