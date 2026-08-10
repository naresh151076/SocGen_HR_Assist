# Implementation guide

## Purpose and delivery status

This repository is a front-end-only prototype of the SG Learning Operations product direction. It demonstrates conversational orchestration, governed decisions, role-aware navigation, and evidence-oriented language. It does not connect to systems of record or perform real actions.

| Area | Current POC coverage |
|---|---|
| Shared shell | Implemented: fixed navigation rail, centre scroll region, responsive mobile drawer, persona menu, projects and recents |
| Right context panel | Implemented for an active Radu conversation; it opens/collapses without moving the conversation workspace |
| Connected case | Implemented as a local 13-state journey across Claire, Amélie, Radu, and Elena |
| Persona workflows | Implemented for demand, plan validation/approval, registration review/approval, and invitation-control remediation |
| Evidence language | Implemented as rule summary, systems checked, control evidence, and audit-oriented UI |
| Integrations and persistence | Not implemented |

## Architecture

| Location | Responsibility |
|---|---|
| `app/page.tsx` | App-shell state, persona switching, panel state, responsive navigation, and scroll containment |
| `app/components/SideNav.tsx` | Persona navigation, projects/recent conversations, search, and account menu |
| `app/components/Workbench.tsx` | Radu’s six-step conversational operation and fixed composer |
| `app/components/PersonaFlow.tsx` | Compact supporting-persona flows |
| `app/components/RightDetails.tsx` | Expandable live-context panel |
| `app/components/PromptComposer.tsx` | Reusable governed-workflow composer |
| `app/data/scenario.ts` | Fictional shared scenario data |
| `app/data/personas.ts` | Persona metadata and role-based navigation |

## Layout behaviour

The root shell is constrained to the dynamic viewport height. The document body does not scroll. The centre workspace has the vertical overflow, while the left rail and right details panel remain in the shell. The details panel can scroll internally if its content exceeds the viewport.

This is intentional: a long conversation must not move navigation, identity controls, or contextual evidence out of reach.

## Product roadmap

The detailed persona documents describe the intended target product. The next implementation work should be:

1. Add local persistence and deep links for the connected case.
2. Add authenticated service adapters behind an explicit simulation mode.
3. Add real evidence references, audit events, role permissions, error/retry states, and automated accessibility testing.

## Verification

Run `npm run build` after changes. The build validates TypeScript and produces the static Next.js output. Use the browser to test the approval boundaries, persona hand-offs, and fixed-panel scroll containment.
