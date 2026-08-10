# Amélie Martin — Training Coordinator persona brief

Downloadable presentation pack for the planning persona in **SG Learning Operations / Société Générale HR Assistant**.  
Canonical product flow remains in `02-Amelie-Training-Coordinator-Flow.md`. Connected case truth remains in `06-Connected-Persona-Storyline.md` and `app/data/scenario.ts`.

---

## 1. Persona card

| Field | Detail |
|---|---|
| Name | Amélie Martin |
| Initials | AM |
| Role | Training Coordinator, ACO/GES |
| Location | Paris, France |
| Greeting | What programme do you need to plan? |
| Composer prompt | Describe the programme, cohort and deadline you are planning for. |
| Flow title | Plan a viable session before publication |
| Primary action | Review the plan |
| Snapshot (connected case) | 16 seats proposed · 12 people requested · 1 plan to approve |

### Suggested starts (New chat)

- Validate a programme plan  
- Find capacity for a cohort  
- Resolve a trainer or room conflict  

### Navigation (Amélie only)

| Destination | Purpose |
|---|---|
| **New chat / Assistant** | Validate and publish a feasible session plan in conversation |
| **Plans** | Programme inbox with feasibility status for Claire’s demand and other programmes |
| **Capacity** | Seat meter, September strip, resource-pass chips, handoff to Radu |
| **Help** | Profile menu only — guidance without competing with day-to-day work |

Amélie does **not** see My requests, Team learning, Operations, Controls or Registration queues as primary work.

### Ownership boundary

| Owner | Owns |
|---|---|
| **Claire** | Business need, people priority, acceptable alternatives / trade-offs |
| **Amélie** (Training Coordination) | Feasible plan (session, capacity, trainer, dates); plan publish |
| **Radu** (Learning Operations) | Registrations, invitations and operational publish after approval |
| **Elena** (Controls) | Control evidence and exceptions |

**Product promise:** Review one plan, resolve bounded conflicts, approve once.  
**Governance line:** No session is treated as published for registration until Amélie confirms the plan; Radu still owns register/invite after that.

### What Amélie never does

Individual registrations · mass invitations · Claire’s unit dashboard as her home · closing control exceptions · picking Mandarin / MyLearning / Excel as the primary workspace.

---

## 2. Connected demo story (keep counts consistent)

Claire’s demand reaches Amélie as a planning package for **New Manager Foundations** · 12 people · Paris classroom · before 30 September.

| Baseline | Value |
|---|---|
| Demand owner | Claire Martin · Markets & Risk |
| Curriculum | New Manager Foundations |
| Main session proposed | Friday 18 September 2026 · Paris La Défense · Victor Laurent · 16 seats |
| Alternative | Tuesday 22 September (for calendar conflicts such as Priya) |
| Amélie’s job | Confirm curriculum, capacity, trainer and room; publish a feasible plan for Radu |
| After publish | Hand-off to Radu for registration checks |
| Request id (UI) | NMF-042 |

*(Larger 180-person / 8-session programme in the flow spec is target vision, not the connected POC truth set.)*

---

## 3. Screen journey for presenters

Use screenshots in this order.

### Slide A — New chat

**Title:** Plan from intent, not from eight systems  

Amélie lands on: “What programme do you need to plan?” Suggested starts keep her in planning language. She does not open Mandarin, MyLearning and Excel as separate destinations.

**Say:** Conversation starts the plan; systems stay in the evidence trail.

### Slide B — Conversation + planning evidence

**Title:** One plan package with named owners  

The assistant validates curriculum, capacity, trainer and room against Claire’s demand. Amélie resolves only bounded conflicts, then approves publication. Evidence shows what was checked and that Claire owns the business need while Radu will own registration next.

**Say:** Amélie is the planning decision-maker; AI prepares the checks.

### Slide C — Plans

**Title:** Programme inbox with feasibility, not a session factory  

Full-width master-detail: Claire’s NMF cohort and supporting programmes. Feasibility glyphs and status replace prose manuals. CTAs reopen the Assistant with the connected planning scenario.

**Say:** She sees what is ready to publish and what still needs a planning choice.

### Slide D — Capacity

**Title:** Seats and resources at a glance  

Seat meter, September strip, resource-pass chips, and a Claire → You → Radu handoff strip. Oversight board; consequential publish decisions return to chat.

**Say:** Capacity is visual; approval stays governed in conversation.

---

## 4. What’s special in this conversational AI approach

1. **Demand in → feasible plan out** — without manually recreating sessions across systems.  
2. **Bounded conflicts only** — trainer clash or room shortfall become decisions, not spreadsheet archaeology.  
3. **Publish once** — planning approval is a named human action before Radu registers.  
4. **Evidence of checks** — curriculum, capacity, trainer, room with timestamps and sources.  
5. **Plans + Capacity** — oversight without turning Amélie into an LMS admin.  
6. **Clean handoff** — Claire’s need → Amélie’s plan → Radu’s operations, never one merged chat.

---

## 5. What else we give Amélie (beyond “a chatbot”)

| Beyond chat | Why it matters |
|---|---|
| **Plans** | Programme inbox with feasibility status for NMF and related programmes |
| **Capacity** | Visual seat and resource readiness for the September window |
| **Handoff strip** | Claire → Amélie → Radu as facts and chips |
| **Suggested starts** | Validate plan / find capacity / resolve conflict |
| **Help (profile)** | Numbered ownership path without left-rail clutter |
| **CTAs back to Assistant** | Boards prepare; conversation owns consequential approval |

---

## 6. Amélie vs other personas (one table)

| | Claire | Amélie | Radu | Elena |
|---|---|---|---|---|
| Job | Business need & trade-offs | Feasible plan | Registrations & invitations | Control evidence |
| Primary surfaces | Chat, My requests, Team learning | Assistant, Plans, Capacity | Assistant, Operations, Session readiness | Assistant, Controls, Control health |
| Approves | “Does this meet my team’s need?” | Plan viability / publish | Publish / send | Close / remediate |
| Never does | Sessions, rules, invites, controls | Unit dashboards as primary | Claire’s team overview | Demand intake as primary |

---

## 7. Closing line

For Amélie, conversational AI is not “chat instead of Mandarin.” It is **validate once, resolve only real conflicts, publish a feasible plan**, then hand a clean package to Learning Operations.

---

## 8. Demo path (checklist)

1. Switch persona to **Amélie Martin**.  
2. Open **New chat** → greeting and suggested starts.  
3. Open or start the connected NMF planning conversation → show evidence.  
4. Open **Plans** → Claire · NMF cohort.  
5. Open **Capacity** → seat meter and handoff strip.  
6. Use plan / conflict CTAs → return to conversation.  
7. Optional: Help from **persona profile menu**.

---

## Related documents

| File | Use |
|---|---|
| `02-Amelie-Training-Coordinator-Flow.md` | Full planning product specification |
| `06-Connected-Persona-Storyline.md` | Cross-persona connected case |
| `08-Claire-Business-Manager-Persona-Brief.md` | Upstream business-manager brief |
| `10-Radu-Learning-Administrator-Persona-Brief.md` | Downstream operations brief |
| `07-Implementation-Guide.md` | What the POC implements today |
