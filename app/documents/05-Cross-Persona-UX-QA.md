# Cross-persona UX consistency and implementation QA

Use this checklist as the quality gate for every implemented persona state and before expanding the prototype. The current POC implements the shared shell and a 13-state connected case across all four personas; integration, persistence, and full operational queues remain acceptance criteria rather than completed-work claims. See `07-Implementation-Guide.md` for coverage.

## 1. Shared product language

| Concept | Use this | Do not use |
|---|---|---|
| Work status | Draft, Ready for review, Needs decision, Approved, In progress, Complete, Blocked | Inconsistent variants such as Pending / Done / Resolved without definition |
| Automated reasoning | Rule applied, Check passed, Needs review | “AI decided” or “agent completed policy” |
| Evidence | Systems checked, Planned actions, Evidence, Activity record | Source-system navigation |
| Human action | Approve and publish, Confirm decision, Assign owner | Vague “Proceed” for consequential actions |

## 2. Navigation

For internal operational personas (Radu, Amélie, Elena), the desktop rail is exactly:

1. Assistant
2. Operations
3. Controls
4. Reports

Requirements:

- Active state is text + icon + non-colour indication.
- Rail expands/collapses without changing route order or labels.
- On mobile it becomes a drawer; focused item remains visible after navigation.
- Underlying systems are never primary navigation.
- Claire uses a role-restricted version: Assistant, My requests, Team learning, Help. Its rail styling and responsive behaviour remain identical.

## 3. Ownership map

| Decision | Accountable persona | Must never be assigned to |
|---|---|---|
| Plan feasibility, trainer/room conflict, publish session plan | Amélie | Claire or the assistant alone |
| Registration actions and operational exception handling | Radu | Claire or the assistant alone |
| Business priority, cohort confirmation, acceptable deadline trade-off | Claire | Radu without escalation |
| Control remediation and acceptance | Elena | The assistant alone |

## 4. Hand-offs

| From | To | Data/outcome visible in UI |
|---|---|---|
| Claire | Amélie | Demand, cohort, deadline, format/location/trainer preference |
| Amélie | Radu | Published session references, capacity, planning decisions and evidence |
| Radu | Claire | Registration/invitation outcome and outstanding business decision |
| Radu | Elena | Rule outcomes, action timeline and evidence references |
| Elena | Operations owner | Remediation assignment, due date, decision and re-check status |

## 5. Data integrity tests

- Radu story: 12 requested; 10 initially ready; 2 decisions; 11 approved registrations; 1 pending exemption.
- Amélie story: 180 requested learners; 8 sessions; 192 seats; 6 initially ready; 2 planning decisions; 0 open planning exceptions after resolution.
- Claire story: 12 requested; 10 ready; 2 decisions; 11 confirmed; 1 open follow-up.
- Never mark a registration, invitation, session publication or remediation complete before its named human approval.
- Dates, locations, trainer names and learner names must remain internally consistent within each story. Do not force different persona demos to share people unless the implementation intentionally wires them together.

## 6. Experience and accessibility tests

- The first screen is conversational for every persona. Dashboard-like views are secondary/manual destinations.
- Every exception states: what happened, why it matters, recommendation, alternatives, owner and next action.
- All primary actions are functional through local state changes.
- Destructive/consequential actions use a confirmation step and preserve a draft on cancel.
- Keyboard navigation exposes focus, reaches all actions and works in modal/dialog states.
- Status never relies on colour alone.
- Cards stack cleanly at tablet/mobile; evidence/details can collapse without hiding key decision context.
- Do not open a context panel automatically or add a generic Details button to a conversation. Supporting material must be linked from the relevant message, and the panel opens only after that link is selected. Claire’s My requests, Team learning and Help destinations do not use the right panel.
- Non-chat destinations that share the app shell (New chat, My requests, Team learning, Help) use the compact `WorkspaceHeader` treatment—same height and title weight as the conversation header—not a large page hero title.
- New chat opens as a conversation-shaped first state: compact header with overflow menu only (no status pills), time-aware greeting, larger persona question, inline composer, governance boundary, then suggested starts. It must not use a sparse empty-state hero.
- New-chat replies use the shared conversation-resource model: each persona receives fictional, role-relevant supporting material (brief, checklist, or evidence note), never a claim of a live document or system record.
- On a landing or first guided state, the input is inline with the title and initial content. A bottom-fixed composer appears only once the conversation contains more than the initial state.
- For every persona, measure the fixed composer against the usable workspace—not the browser viewport—with expanded rail, collapsed rail, and an open supporting-details panel. Its centre must equal the centre of the remaining workspace in all three states.
- The final message, decision panel, and handoff must remain fully visible above the fixed composer; retain at least 240px of bottom clearance.
- Each persona owns a distinct conversation. A completed decision shows the handoff and switches to the next persona’s request context; do not combine all owners into one thread.
- Every new-chat shortcut uses a task-relevant Lucide icon from the shared `QuickActions` component; icons must not mix libraries or visual styles.
- Panel and disclosure motion is short, functional, and disabled for users with `prefers-reduced-motion`.
- UI does not display raw prompts, model explanations, API payloads or a visible agent swarm.

## 7. POC honesty tests

- Clearly model real systems as background systems of record: Mandarin, MyLearning, Excel/shared spaces, Neocase, Outlook, HR Data/SWS and SAP/Ariba.
- Do not claim existing APIs or production writes.
- Where appropriate label actions as simulated or planned system actions.
- Do not claim that every control is automated or that a policy rule can be overridden without accountable human action.
- Use fictional names/data labels in the prototype.

## Definition of done

The POC is done when a reviewer can:

1. Start a natural-language request.
2. Understand what the assistant checked.
3. See the one human decision that matters.
4. Approve a controlled action.
5. See resulting proof and the next owner.
6. Move across personas without seeing navigation, language or governance rules change unexpectedly.
