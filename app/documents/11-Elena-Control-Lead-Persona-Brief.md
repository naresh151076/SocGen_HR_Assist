# Elena Popescu — Control Lead persona brief

Downloadable presentation pack for the Learning Operations Control Lead in **SG Learning Operations / Société Générale HR Assistant**.  
Canonical product flow remains in `04-Elena-Control-Lead-Flow.md`. Connected case truth remains in `06-Connected-Persona-Storyline.md` and `app/data/scenario.ts`.

---

## 1. Persona card

| Field | Detail |
|---|---|
| Name | Elena Popescu |
| Initials | E |
| Role | Learning Operations Control Lead |
| Location | GSC Romania |
| Greeting | What control needs your attention? |
| Composer prompt | Describe the control exception or evidence you want to review. |
| Flow title | Turn a control check into accountable evidence |
| Primary action | Review remediation |
| Snapshot (connected case) | 1 control exception · 1 approval needed · 1 re-check required |

### Suggested starts (New chat)

- Review a control exception  
- Approve a contained remediation  
- Check weekly invitation controls  

### Navigation (Elena only)

| Destination | Purpose |
|---|---|
| **New chat / Assistant** | Investigate exceptions and approve remediation with evidence |
| **Controls** | Exception inbox centred on INV-04 with match coverage and evidence rows |
| **Control health** | Invitation match-rate, audit-path strip, Radu → You → re-check handoff |
| **Help** | Profile menu only — ownership path without competing with the control queue |

Elena does **not** schedule every session, register individuals as primary work, or own Claire’s business demand intake.

### Ownership boundary

| Owner | Owns |
|---|---|
| **Claire** | Business need and trade-offs |
| **Amélie** | Feasible published plan |
| **Radu** | Registrations, invitations and operational execution |
| **Elena** | Control gaps, remediation approval, proof that process executed correctly |

**Product promise:** Show what is out of control, why, who owns the fix, and whether proof exists.  
**Governance line:** Remediation that sends or replaces invitations still requires a named human approval; AI does not close controls silently.

### What Elena never does

Become the Training Coordinator for capacity planning · become the business manager for cohort choices · treat Excel screenshot packs as the product · mark controls passed without evidence.

---

## 2. Connected demo story (keep counts consistent)

After Radu confirms 11 registrations and invitations, Elena’s weekly invitation control finds a match gap.

| Baseline | Value |
|---|---|
| Control | **INV-04** — invitation match |
| Case link | NMF cohort · 18 September session |
| Finding | Confirmed registration without a matching current Outlook invitation (**François Laurent**) |
| Elena’s job | Review evidence, approve contained remediation, require re-check |
| After approval | Replacement invitation path + re-check pass + audit evidence complete |
| Upstream | Radu executed registrations; Claire/Amélie already decided business/plan |

*(Broader weekly volumes such as “126 sessions / 8 exceptions” in the flow spec are target vision; the connected POC centres INV-04 · François Laurent.)*

---

## 3. Screen journey for presenters

Use screenshots in this order.

### Slide A — New chat

**Title:** Controls from language, not from spreadsheet archaeology  

Elena lands on: “What control needs your attention?” Suggested starts focus on exceptions, remediation and weekly invitation checks. Cross-system proof becomes evidence beside the chat — not a manual assembly of screenshots and emails as the primary UX.

**Say:** She asks for the exception; the product brings the evidence pack.

### Slide B — Conversation + INV-04 evidence

**Title:** Exception → owner → proof → re-check  

The assistant frames INV-04: what failed, participant impact, recommended remediation, and what evidence will be retained. Elena approves a contained remediation; the UI never claims an AI decision replaced a policy rule.

**Say:** Named human closes the loop; language stays Rule applied / Check passed / Needs review.

### Slide C — Controls

**Title:** Exception inbox with match coverage  

Master-detail Controls board centred on INV-04: match coverage, evidence rows, approve remediation / open evidence. Supporting items stay secondary. CTAs reopen the Assistant with the connected control scenario.

**Say:** Participant-impact work is visible without a weekly Excel rebuild.

### Slide D — Control health

**Title:** Match rate and audit path at a glance  

Invitation match-rate donut, audit-path strip, Radu → You → re-check handoff. Oversight board; consequential remediation approval returns to chat.

**Say:** Health is visual; closure stays governed and evidenced.

---

## 4. What’s special in this conversational AI approach

1. **Exception-first** — show what is out of control before drowning in all sessions.  
2. **Evidence as a first-class outcome** — sources, timestamps, coverage — not screenshots as the product.  
3. **Contained remediation with approval** — fix path is clear; human still authorises.  
4. **Re-check required** — close the loop, do not “mark done” on hope.  
5. **Controls + Control health** — queue and health without merging Elena into Radu’s ops chat.  
6. **Policy-safe language** — outcomes explained as checks and evidence, never “AI overrode the rule.”

---

## 5. What else we give Elena (beyond “a chatbot”)

| Beyond chat | Why it matters |
|---|---|
| **Controls** | Master-detail exception inbox centred on INV-04 |
| **Control health** | Match-rate and audit-path overview |
| **Handoff strip** | Radu → Elena → re-check as facts |
| **Evidence rows** | What supports the exception and the fix |
| **Help (profile)** | Ownership path and assistant limits |
| **CTAs back to Assistant** | Boards surface risk; conversation owns approval |

---

## 6. Elena vs other personas (one table)

| | Claire | Amélie | Radu | Elena |
|---|---|---|---|---|
| Job | Business need & trade-offs | Feasible plan | Registrations & invitations | Control evidence |
| Primary surfaces | Chat, My requests, Team learning | Assistant, Plans, Capacity | Assistant, Operations, Session readiness | Assistant, Controls, Control health |
| Approves | “Does this meet my team’s need?” | Plan viability / publish | Register / invite publish | Close / remediate |
| Never does | Sessions, rules, invites, controls | Unit dashboards as primary | Claire’s team overview | Demand intake as primary |

---

## 7. Closing line

For Elena, conversational AI is not “auto-close controls.” It is **surface the gap, show the evidence, approve a contained fix, and prove the re-check** — so Learning Operations stays auditable after Claire, Amélie and Radu have done their work.

---

## 8. Demo path (checklist)

1. Switch persona to **Elena Popescu**.  
2. Open **New chat** → greeting and suggested starts.  
3. Open the connected INV-04 conversation → evidence and remediation.  
4. Open **Controls** → INV-04 invitation match.  
5. Open **Control health** → match rate and audit path.  
6. Use Approve remediation / Open evidence → return to conversation.  
7. Optional: Help from **persona profile menu**.

---

## Related documents

| File | Use |
|---|---|
| `04-Elena-Control-Lead-Flow.md` | Full control-remediation product specification |
| `06-Connected-Persona-Storyline.md` | Cross-persona connected case |
| `10-Radu-Learning-Administrator-Persona-Brief.md` | Upstream operations brief |
| `08-Claire-Business-Manager-Persona-Brief.md` | Business-manager brief |
| `07-Implementation-Guide.md` | What the POC implements today |
