# Implementation guide

## Purpose and delivery status

This repository is a front-end-only prototype of the SG Learning Operations product direction. It demonstrates conversational orchestration, governed decisions, role-aware navigation, and evidence-oriented language. It does not connect to systems of record or perform real actions.

| Area | Current POC coverage |
|---|---|
| Shared shell | Implemented: fixed navigation rail, centre scroll region, responsive mobile drawer, persona menu and projects/recents; logos return to a time-aware, persona-named landing greeting with a compact registration-updates chart, and an edge control remains available in both rail states |
| Conversation resources | Implemented for every persona: a fictional brief, checklist, or evidence note is generated with a new chat and opens the right panel only when its message-level link is selected |
| New-chat quick actions | Implemented for every persona with shared, meaningful Lucide icons, entry/hover feedback, and reduced-motion support |
| Connected example conversation | Implemented as local, persona-specific chats linked by explicit handoffs across Claire, Amélie, Radu, and Elena; every guided turn now explains the accountable work, fictional evidence context, review boundary, and linked detailed brief/checklist/evidence note |
| Persona workflows | Implemented for demand, Claire’s master-detail My requests inbox and decision workspace, Team learning and Help support views, plan validation/approval, registration review/approval, and invitation-control remediation |
| Evidence language | Implemented as rule summary, systems checked, control evidence, and audit-oriented UI |
| Integrations and persistence | Not implemented |

## Architecture

| Location | Responsibility |
|---|---|
| `app/page.tsx` | App-shell state, persona switching, panel state, responsive navigation, and scroll containment |
| `app/components/SideNav.tsx` | Persona navigation, projects/recent conversations, search, and account menu |
| `app/components/Workbench.tsx` | Time-aware landing greeting, registration-updates chart, continuous example conversation with in-chat work-package explainers, Claire's Team learning summary, Help guidance, and fixed composer |
| `app/components/PersonaFlow.tsx` | Compact supporting-persona flows |
| `app/components/RightDetails.tsx` | Expandable live-context panel |
| `app/components/ConversationThread.tsx` | Reusable persona-aware chat response and linked supporting resources |
| `app/data/conversations.ts` | Fictional chat scenarios plus persona work-package, evidence-reference and approval-boundary content |
| `app/components/PromptComposer.tsx` | Reusable governed-workflow composer |
| `app/components/QuickActions.tsx` | Persona-specific action shortcuts with the shared icon and motion treatment |
| `app/components/ClaireRequests.tsx` | Claire’s full-width master-detail request inbox with compact destination header, attention + recent lists, business coverage/decision detail, and contextual Assistant hand-offs |
| `app/components/WorkspaceHeader.tsx` | Shared compact header for non-chat destinations (title, status tags, optional actions), aligned with the conversation header height and weight |
| `app/data/scenario.ts` | Fictional shared scenario data |
| `app/data/personas.ts` | Persona metadata and role-based navigation |

## Layout behaviour

The root shell is constrained to the dynamic viewport height. The document body does not scroll. The centre workspace has the vertical overflow, while the left rail and right details panel remain in the shell. The details panel can scroll internally if its content exceeds the viewport.

Conversation, My requests, Team learning and Help use a full-bleed centre (no outer max-width or page padding) so their compact headers align edge-to-edge. Landing and other supporting destinations keep the padded content shell.

This is intentional: a long conversation must not move navigation, identity controls, or contextual evidence out of reach.

The right panel is not a default conversation fixture and there is no global Details control. A chat message exposes a relevant supporting-material link; selecting it opens that document in the panel, and closing it returns the user to the conversation without duplicating a control in the centre workspace.

The first interaction uses an inline composer beside the page title or initial guided state. The fixed composer is reserved for an ongoing chat (after a user/assistant exchange) or a guided case after its first step; it must never leave an empty initial screen with a detached input at the bottom of the viewport.

The example request is displayed as an application-like conversation rather than a numbered workflow. Each accountable persona receives an independent thread with user messages, assistant outcomes, focused questions, compact decision controls, and a linked fictional resource. A decision that completes an owner’s work states the next handoff, then switches the visible persona and opens the next request context. It uses fictional local data and never claims live actions.

Every fixed-composer thread reserves 240px of bottom content clearance. This prevents a final message, handoff, or decision control from sitting behind the composer.

On desktop, the fixed composer is centred in the available workspace between the current left navigation width and the optional right-panel width. It uses shell-level CSS variables, so it remains aligned when either panel expands or collapses rather than centring against the full browser viewport.

Browser verification of the shared shell uses three layout states: expanded navigation, collapsed navigation, and collapsed navigation with the 330px supporting-details panel open. The composer centre must equal the centre of the remaining workspace in each state. This one implementation is used by all personas.

## Icon and motion system

All UI icons use `lucide-react` with a consistent outlined weight. The persona-aware new-chat shortcuts use the shared `QuickActions` component: each responsive card keeps its task-relevant icon on the left, label in the centre, and chevron affordance on the right. A red border appears only on hover, with short entry and hover feedback. Navigation rails and disclosure chevrons use matching 200ms width or rotation transitions.

Motion is decorative only when it reinforces feedback or state change. `app/globals.css` includes a `prefers-reduced-motion` rule that effectively removes animations and transitions for users who request less motion. Future contributors must preserve this rule; repository-wide UI and documentation expectations are recorded in `AGENTS.md`.

## Product roadmap

The detailed persona documents describe the intended target product. The next implementation work should be:

1. Add local persistence and deep links for the connected case.
2. Add authenticated service adapters behind an explicit simulation mode.
3. Add real evidence references, audit events, role permissions, error/retry states, and automated accessibility testing.

## Verification

Run `npm run build` after changes. The build validates TypeScript and produces the static Next.js output. Use the browser to test the approval boundaries, persona hand-offs, and fixed-panel scroll containment.
