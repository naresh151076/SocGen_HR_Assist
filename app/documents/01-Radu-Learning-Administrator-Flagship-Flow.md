# Radu Petrescu — Learning Administrator

## Status of this document

This is the detailed target-flow specification. The current POC implements Radu's connected registration chat, plus Claire-style support destinations: **Operations** (master-detail package inbox with NMF check, publish draft, Thomas hold and supporting packages) and **Session readiness** (pipeline, donuts, cohort panel, Amélie → Claire → Elena handoff strip). Help opens from the profile menu with a numbered ops path. Chat CTAs reuse `conversations.ts` prompts. Canonical counts follow `scenario.ts` / `06-Connected-Persona-Storyline.md` (Priya/Thomas, not older Camille/Nicolas names). See `07-Implementation-Guide.md` for the delivered scope.

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

Assistant: I found the proposed session: New Manager Foundations · 18 September · Paris La Défense · Victor Laurent · 16 seats. I will check eligibility, existing learning bookings and availability for the 12 people. I will not register anyone or send invitations without your approval.

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

**Two exception cards** *(connected case — `scenario.ts`)*

1. **Priya Shah — Calendar conflict**
   - Conflict: Mandatory course already booked at the same time on 18 September.
   - Recommendation: Offer the comparable 22 September Paris session (still before Claire’s deadline).
   - Actions: **Ask Claire to choose alternative** / **Keep on current session** / **Exclude**
2. **Thomas Bernard — Start-date condition**
   - Condition: Starts on 21 September; cannot attend the 18 September session.
   - Recommendation: Hold as follow-up; earliest suitable option 9 October (after requested deadline).
   - Actions: **Ask Claire for later-session decision** / **Exclude from this action**

**Evidence panel**

- Registration policy evaluated
- Existing booking check completed in MyLearning
- Calendar availability check completed
- Business trade-offs require Claire’s decision

**Interaction:** Resolve 2 decisions opens R3; the “10 ready” people must not yet be registered.

---

### Screen R3 — Resolve exceptions without losing the whole group

**Route/state:** /assistant?task=reg-042&step=exceptions · Needs decision

**Purpose:** Let Radu surface the exceptions while Claire owns the business trade-offs; preserve the group draft.

The main conversation says: “The 10 ready registrations are held as a draft. Claire must decide the two business exceptions, then review the complete action.”

**Decision A — Priya (Claire)**

Priya Shah has a confirmed calendar conflict on 18 September.

Recommended: Move Priya to New Manager Foundations on 22 September, Paris La Défense. Why: Same curriculum, seats available, still before the 30 September deadline.

Actions: **Choose 22 September** / **Keep 18 September** / **Remove Priya**

**Decision B — Thomas (Claire)**

Thomas Bernard starts on 21 September and cannot be registered for 18 September.

Actions: **Choose 9 October** / **Ask Learning Operations for another option** / **Remove Thomas**

**Chosen demo path**

- Claire chooses **22 September** for Priya.
- Claire keeps **Thomas** as a later-session follow-up (9 October earliest).

Assistant: “The action now includes 11 proposed registrations: 10 for 18 September and Priya for 22 September. Thomas remains an open follow-up for Claire.”

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
- Priya Shah — 22 September, Paris La Défense

1 follow-up remains open:

- Thomas Bernard — later-session choice with Claire (earliest 9 October)

11 Outlook invitations will be prepared and sent after registrations are confirmed.

**Actions:** **Approve and publish** / **Back to decisions**

**Evidence disclosure**

- MyLearning — create 11 registrations
- Outlook — send 11 calendar invitations
- Control record — save rule outcomes and Radu’s decision

**Non-negotiable interaction:** Approve and publish requires an explicit confirm modal: “Publish 11 registrations and send 11 invitations?” The confirm action changes the state to In progress, then Complete. A cancel leaves the draft intact.

---

### Screen R5 — Completion: proof and next task

**Route/state:** /assistant?task=reg-042&step=complete · Complete

**Purpose:** Close routine work without making Radu audit multiple systems.

Assistant: “Published successfully. 11 registrations confirmed in MyLearning; 11 Outlook invitations sent; Priya is registered for 22 September; Thomas remains a follow-up for Claire. Elena can review invitation coverage on INV-04.”

**Completion card**

| Item | Status | Evidence |
|---|---|---|
| 18 Sep group registration | Complete | ML-REG-2026-10482 |
| 22 Sep alternative registration | Complete | ML-REG-2026-10483 |
| Invitations | Complete | OUT-INV-2026-3021 |
| Thomas follow-up | Waiting on Claire | NMF-042 |

**Next actions:** Open Operations / Session readiness / View evidence / Hand to Elena for INV-04.

---

### Screen R6 — Target vision: cancellation handled by exception (not connected POC)

**Route/state:** /operations · optional later scenario

**Trigger (vision):** A confirmed attendee cancels after publish. The product finds an eligible waitlisted replacement for Radu’s approval.

This cancellation path is **not** part of the connected NMF-042 demo (Priya / Thomas / INV-04). Keep it out of live UI counts for the connected case.

## Acceptance checks for implementation

- Same app shell and status vocabulary as every other persona flow.
- Counts never drift from 12 requested → 10 initially ready → 2 exceptions → 11 approved registrations → 1 follow-up (Thomas).
- Approval happens before completion claims.
- Every exception has a named cause, rule/check explanation, recommendation, and an alternative action.
- Business trade-offs (Priya / Thomas) are Claire’s; Radu does not invent business priority.
- Every background-system reference is evidence/action metadata—not navigation.
- Navigation is Assistant · Operations · Session readiness (Help in profile).
- The flow is usable with keyboard focus and the review/approval card stacks vertically on narrow screens.
