# Claire Martin — Business Manager persona brief

Downloadable presentation pack for the business-user (line-manager) experience in **SG Learning Operations / Société Générale HR Assistant**.  
Canonical product flow remains in `03-Claire-Business-Manager-Flow.md`. Connected case truth remains in `06-Connected-Persona-Storyline.md` and `app/data/scenario.ts`.

---

## 1. Persona card

| Field | Detail |
|---|---|
| Name | Claire Martin |
| Initials | C |
| Role | Business Manager |
| Location | Paris, France |
| Business unit (UI) | Markets & Risk |
| Greeting | What does your team need to learn? |
| Composer prompt | Describe the learning need for your team. |
| Flow title | Secure mandatory training for your team |
| Primary action | Review 12 people |
| Unit snapshot (Team learning) | 24 people · 18 need action · 1 open follow-up |

### Suggested starts (New chat)

- Train a new cohort  
- Check team learning  
- Request a change  

### Navigation (Claire only)

| Destination | Purpose |
|---|---|
| **New chat / Assistant** | Raise or continue a learning need in conversation |
| **My requests** | Status inbox and open business decisions |
| **Team learning** | Markets & Risk unit readiness overview |
| **Help** | Profile menu only — guidance without competing with day-to-day work |

Claire does **not** see Operations, Controls or Reports.

### Ownership boundary

| Owner | Owns |
|---|---|
| **Claire** | Business need, people priority, acceptable alternatives / trade-offs |
| **Amélie** (Training Coordination) | Feasible plan (session, capacity, trainer, dates) |
| **Radu** (Learning Operations) | Registrations, invitations and operational publish after approval |
| **Elena** (Controls) | Control evidence and exceptions |

**Product promise:** Ask in plain language; oversee the unit’s learning status; return only for a clear business decision.  
**Governance line (on New chat):** Nothing is registered or invited until Learning Operations approves.

### What Claire never does

Create sessions · apply registration rules · reconcile learner records · send invitations · manage controls · pick Mandarin / MyLearning / Neocase as a destination.

---

## 2. Connected demo story (keep counts consistent)

Claire: “I have 12 new managers joining the Paris organisation. They need New Manager Foundations before 30 September. Please arrange a classroom session in Paris, preferably in the morning. Victor Laurent is our preferred trainer.”

| Baseline | Value |
|---|---|
| Requested | 12 people · New Manager Foundations · Paris classroom · before 30 September |
| Recommended session | 18 September 2026 · Victor Laurent (preference, not a hard requirement) |
| Ready after checks | 10 |
| Business decisions | Priya (calendar conflict → 22 Sep) · Thomas (starts 21 Sep → later session / 9 Oct follow-up) |
| After Claire confirms | 11 confirmed paths · 1 follow-up open (Thomas) |
| Request id (UI) | NMF-042 / REQ-NMF-042 |

---

## 3. Screen journey for presenters

Use screenshots in this order.

### Slide A — New chat

**Title:** Start with the business need, not a system  

Claire lands on conversation: “What does your team need to learn?” Suggested starts keep her in business language. Governance is visible before she types. This is HR transformation for the line manager — **intent first, tools second**.

**Say:** She does not open an LMS or ticketing form. She describes what her team needs.

### Slide B — Conversation + Source Evidence

**Title:** Conversation that becomes a structured, owned request  

Natural language becomes a formal business request: cohort size, location, deadline, preferred trainer. The assistant keeps Claire for decisions only and names the path Claire → Amélie → Radu. Source Evidence shows what was captured and retained.

**Say:** Chat is auditable orchestration, not a black-box chatbot.

### Slide C — My requests

**Title:** Her attention inbox — not an operations queue  

Filters: All / Needs you / In progress / Confirmed. Detail shows coverage before the deadline (11 of 12), who is covered, and the one open business decision (Thomas). Actions such as Review options reopen the Assistant. She never enters registration, invitation or control screens.

**Say:** Status and decisions stay in her lane; ops stays with Radu.

### Slide D — Team learning

**Title:** Unit readiness at a glance  

**Markets & Risk** overview: team mix (new vs established), training status, who needs what, searchable team members with learning status, active NMF-042 case. Charts for oversight; conversation for decisions.

**Say:** Overview, not an LMS admin console. Follow-ups return to chat.

---

## 4. What’s special in this conversational AI approach

1. **Business language in → structured request out** — no form maze or system picker.  
2. **Governed by design** — named owners; nothing registered or invited from chat alone.  
3. **Evidence beside the chat** — what was understood, retained, and who owns next.  
4. **Interrupt only when needed** — Claire returns for trade-offs, not every operational step.  
5. **One persona surface** — chat to raise, My requests to decide, Team learning to oversee.  
6. **Systems of record stay background** — Mandarin, MyLearning, HR Data/SWS, Outlook, Neocase are evidence references, not Claire destinations.

---

## 5. What else we give Claire (beyond “a chatbot”)

| Beyond chat | Why it matters |
|---|---|
| **My requests** | Priority inbox for needs-you / in progress / confirmed |
| **Coverage & who is covered** | Sees 11/12 and the open decision without ops tools |
| **Team learning** | Unit KPIs, charts and member status for Markets & Risk |
| **Suggested starts** | Credible entry points for recurring manager work |
| **Ownership footers** | Clear boundary vs Coordination and Learning Operations |
| **Handoff back to chat** | Overview never becomes a second workflow engine |
| **Role-restricted rail** | No Operations / Controls / Reports clutter |

---

## 6. Claire vs other personas (one table)

| | Claire | Amélie | Radu | Elena |
|---|---|---|---|---|
| Job | Business need & trade-offs | Feasible plan | Registrations & invitations | Control evidence |
| Primary surfaces | Chat, My requests, Team learning | Assistant, Plans, Capacity | Assistant, Operations, Session readiness | Assistant, Controls, Control health |
| Approves | “Does this meet my team’s need?” | Plan viability | Publish / send | Close / remediate |
| Never does | Sessions, rules, invites, controls | Unit dashboards as primary | Claire’s team overview | Demand intake as primary |

---

## 7. Closing line

For Claire, conversational AI is not “chat instead of HR systems.” It is **ask once, oversee readiness, decide only the business trade-off**, while Learning Operations and Controls stay accountable for execution and evidence.

---

## 8. Demo path (checklist)

1. Switch persona to **Claire Martin**.  
2. Open **New chat** → greeting and suggested starts.  
3. Start or open **New manager learning request** → show tags and Source Evidence.  
4. Open **My requests** → Needs you → NMF-042 / Thomas.  
5. Open **Team learning** → Markets & Risk charts + team panel.  
6. Use **Ask assistant** / **Open follow-up** → return to conversation.  
7. Optional: Help from **persona profile menu**.

---

## Related documents

| File | Use |
|---|---|
| `03-Claire-Business-Manager-Flow.md` | Full C1–C10 product specification |
| `09-Amelie-Training-Coordinator-Persona-Brief.md` | Planning persona brief |
| `10-Radu-Learning-Administrator-Persona-Brief.md` | Operations persona brief |
| `11-Elena-Control-Lead-Persona-Brief.md` | Control persona brief |
| `06-Connected-Persona-Storyline.md` | Cross-persona connected case |
| `00-Codex-Build-Title-and-Context.md` | Product premise and navigation model |
| `07-Implementation-Guide.md` | What the POC implements today |
