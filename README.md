# SG Learning Operations

SG Learning Operations is a front-end proof of concept for a governed, conversational learning-operations workbench. It shows how Société Générale Global Solution Centre teams could move a learning request from intent to an explainable, human-approved operational outcome—without turning systems of record into the primary user experience.

This is a clickable Next.js prototype. It uses fictional, typed local data only. It has no authentication, API calls, persistence, or production-system writes.

## What the prototype is trying to achieve

The product centres the conversation around a single operational request. It should help a user understand:

- what has been requested;
- what the workflow checked and the evidence considered;
- which people or conditions need a human decision;
- what will happen after approval; and
- what proof or follow-up remains afterward.

The assistant can prepare, check, recommend, and simulate approved work. It must not silently make business, planning, policy, or control decisions.

## Included experiences

### Shared application shell

- A collapsible persona-aware navigation rail, with projects and recent conversations.
- A mobile navigation drawer.
- A centre-only scrolling workspace. The left rail and optional right context panel remain fixed within the viewport.
- A time-aware, persona-named landing greeting with a compact **Registration updates** chart; the rail and mobile logos return to it, and the connected demo starts from its top-right **Demo flow** button.
- A persistent rail-edge control that overlaps the navigation and workspace so collapse and expand remain available in both rail states.
- Conversation-linked supporting documents: a fictional brief, checklist, or evidence note opens the expandable right panel only when a user selects that resource.
- Persona-specific quick-action cards beneath every new-chat composer, with a left-aligned Lucide icon, clear chevron affordance, red hover border, and reduced-motion-safe feedback.
- Claire's **Team learning** view: a contextual cohort infographic with deadline readiness, request journey, confirmed routes and a conversational Thomas follow-up.
- Claire's **Help** view: task-led prompts, clear decision ownership, and explicit assistant guardrails.
- Accessible labels, visible focus treatment, and responsive card layouts.

### Connected persona case

The flagship interactive demo follows a fictional **New Manager Foundations** request across four accountable roles:

1. Claire submits a 12-person learning need.
2. Amélie validates and approves a 16-seat Paris session.
3. Radu checks the group: 10 are ready and two require a business decision.
4. Claire confirms the 11-person outcome: 10 on the main session, Priya on an alternative session, and Thomas retained as follow-up.
5. Radu approves the simulated registrations and invitations, then sees the completion evidence.
6. Elena reviews an INV-04 invitation-control exception, approves a contained remediation, and sees the re-check pass.

Each role has persona-aware navigation, a conversational state, evidence, and an explicit ownership boundary. The scenario is intentionally governed: no completion state is shown until the relevant human approval.

Claire’s **My requests** workspace is a connected-case status view: it visualises the 11 of 12 confirmed learning paths, exposes the remaining Thomas follow-up, and routes comparison or new-request work back into the conversational assistant. It does not create live requests or complete registrations.

## Demo data and boundaries

- All people, requests, places, dates, outcomes, systems, and identifiers are fictional demonstration data.
- `app/data/scenario.ts` holds the shared scenario data.
- `app/data/personas.ts` defines persona information and role-based navigation.
- Background-system names (for example Mandarin, MyLearning, HR Data/SWS, Outlook, and Neocase) are evidence or planned-action references only—not interactive integrations or navigation destinations.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create an optimized production build:

```bash
npm run build
```

## Documentation map

Start with [the implementation guide](app/documents/07-Implementation-Guide.md) for the current feature inventory, architecture, and delivery boundaries.

| Document | Purpose |
|---|---|
| `00-Codex-Build-Title-and-Context.md` | Product premise, design principles, and build scope |
| `01-Radu-Learning-Administrator-Flagship-Flow.md` | Flagship Radu workflow specification |
| `02-Amelie-Training-Coordinator-Flow.md` | Planning-workflow product specification |
| `03-Claire-Business-Manager-Flow.md` | Business-manager product specification |
| `04-Elena-Control-Lead-Flow.md` | Control-remediation product specification |
| `05-Cross-Persona-UX-QA.md` | Cross-persona quality and governance checks |
| `06-Connected-Persona-Storyline.md` | Canonical connected product storyline |
| `07-Implementation-Guide.md` | Current POC behaviour, code map, and gaps to the product vision |
