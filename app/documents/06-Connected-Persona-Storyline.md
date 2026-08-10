# SG Learning Operations — Connected Persona Storyline

## Canonical product-story reference

This document is the source of truth for the intended connected product story. It supersedes differing dates, names, counts and outcomes in older persona-only flow documents. The current front-end presents the key sequence as a continuous, local-data conversation rather than as numbered screens. See `07-Implementation-Guide.md` for what is working today.

**Demo:** Get 12 new managers into the right training, on time, with proof.

Claire requests training. Amélie validates and publishes the feasible session. Radu checks and registers the group, returning only business exceptions to Claire. Elena closes the loop through an invitation control and a human-approved remediation.

## Shared truth set

| Item | Canonical value |
|---|---|
| Case | `nmf-042` |
| Need | 12 new managers complete **New Manager Foundations** before 30 September 2026 |
| Main session | Friday 18 September 2026, 09:00–16:30, Paris La Defense Learning Centre, 16 seats, Victor Laurent |
| Alternative | Tuesday 22 September 2026, 09:00–16:30, 8 seats |
| Exceptions | Priya Shah has a calendar conflict; Thomas Bernard starts on 21 September |
| Approved result | 10 registrations for 18 September plus Priya for 22 September = 11 confirmed registrations |
| Follow-up | Thomas waits for Claire’s later-session business decision; 9 October is the earliest suitable option |
| Control | INV-04 finds one confirmed registration without a matching current Outlook invitation |

## The 13 connected states

1. Claire requests training.
2. Amélie validates the plan.
3. Amélie approves and publishes the session plan.
4. Amélie hands the work package to Radu.
5. Radu checks the group.
6. Radu reviews exceptions and asks Claire for a business decision.
7. Claire chooses Priya’s alternative and keeps Thomas open.
8. Radu approves 11 registrations and 11 invitations.
9. Radu sees completion and operational evidence.
10. Claire sees a selectable master-detail My requests inbox with her business learning needs; the selected team request shows deadline coverage, the cohort outcome, a short ownership note, and Thomas’s follow-up decision.
11. Elena opens the weekly INV-04 exception.
12. Elena approves the one-invitation remediation.
13. Elena sees the re-check pass and audit evidence complete.

## Landing and navigation rule

The default Assistant landing page greets the signed-in persona by first name using the browser's local time (Good morning, Good afternoon, or Good evening). A compact Registration updates chart sits below the greeting. The **Demo flow** button in the top-right corner starts the connected case at state 1. Selecting the Société Générale logo in either rail state returns to this landing page and exits any demo or conversation state.

Amélie, Radu and Elena use Assistant, Operations, Controls and Reports. Claire uses Assistant, My requests and Team learning in the left rail; Help is available from the persona profile menu so guidance stays secondary to chat. Projects and Recent conversations are shared rail organisers only. Mandarin, MyLearning, HR Data/SWS, Outlook and Neocase are evidence or planned-action references, never left-navigation destinations.

Selecting **New chat** opens a conversation-shaped first state: the same compact header treatment as an active thread (title and overflow menu only—no status pills), a time-aware first-name greeting, a larger persona question as the landing title, an inline composer, a short governance boundary, and suggested starts. When the user sends a request, the assistant responds with persona-relevant mock content and may offer a linked fictional brief, checklist or evidence note. That message-level link—not a generic workspace control—opens the supporting-details panel. Closing the panel preserves the conversation and its linked resource.

Claire's Team learning destination is a Markets & Risk unit overview: team mix, training status, who needs what, a searchable member panel with learning statuses, and the active NMF-042 follow-up. Its calls to action return to the conversational assistant. Help opens from the persona profile menu with task-led prompts and the approval boundary for business, planning and operational decisions.

Compared with Amélie, Radu and Elena, Claire is the business-facing consumer of the same connected case: she starts needs in chat, watches request progress in My requests, and uses Team learning for unit readiness—never for registration, invitations or controls.

## Presentation rule

Do not use an eyebrow, persona label, or explanatory subtitle to introduce a screen title: the signed-in persona is already visible in the left rail. Lead with one meaningful title. Preserve factual field captions and accessible labels where they aid comprehension. Persona-specific starter actions keep a short title with an optional one-line description under Suggested starts. The guided case may use one compact `Guided demo · NMF-042` pill, but no persona banner or descriptive header copy.

## Conversation work-package rule

Every guided persona message must make the operating model explainable in the conversation itself. Under the assistant outcome, show a compact **How this work is being prepared** panel with:

- what the accountable persona is doing now;
- how the fictional request and evidence context have been assembled;
- the checks, records, or planned-action references considered; and
- what that persona must review or approve before the next action.

This panel is part of the chat, not a second workflow screen or a source-system launcher. Mandarin, MyLearning, HR Data/SWS, Outlook and Neocase remain fictional evidence references only. The linked brief, checklist or control note supplies the more durable case facts, evidence retained and approval boundary. This makes hand-offs understandable while keeping the prototype honest about having no live integration.

## Governance rule

The assistant prepares, checks, explains and carries out an approved action. It cannot silently make a business, planning, policy or control decision. Mock background actions and audit evidence appear only after the named owner approves them.
