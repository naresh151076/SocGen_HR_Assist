# SG Learning Operations — Connected Persona Storyline

## Canonical product-story reference

This document is the source of truth for the intended connected product story. It supersedes differing dates, names, counts and outcomes in older persona-only flow documents. The current front-end is a partial, local-data implementation of this vision, not all 13 connected states. See `07-Implementation-Guide.md` for what is working today.

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
10. Claire sees request status and Thomas’s follow-up.
11. Elena opens the weekly INV-04 exception.
12. Elena approves the one-invitation remediation.
13. Elena sees the re-check pass and audit evidence complete.

## Navigation rule

Amélie, Radu and Elena use Assistant, Operations, Controls and Reports. Claire uses Assistant, My requests, Team learning and Help. Projects and Recent conversations are shared rail organisers only. Mandarin, MyLearning, HR Data/SWS, Outlook and Neocase are evidence or planned-action references, never left-navigation destinations.

## Governance rule

The assistant prepares, checks, explains and carries out an approved action. It cannot silently make a business, planning, policy or control decision. Mock background actions and audit evidence appear only after the named owner approves them.
