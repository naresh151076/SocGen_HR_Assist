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
- A **New chat** first state that matches conversation chrome: compact header, time-aware greeting, larger persona question, inline composer, governance note, and persona-specific quick-action cards with Lucide icons, chevron affordance, and reduced-motion-safe feedback.
- Calm member rosters: white cards, soft rose avatars, and restrained status chips; a compact `--sg-new` tenure mark for new joiners; red reserved for attention and follow-up.
- Role-shaped full-bleed destinations for every persona (Claire: My requests / Team learning; Amélie: Plans / Capacity; Radu: Operations / Session readiness; Elena: Controls / Control health), using KPIs and shared on-brand chart primitives (split meters, waffle grids, ranked bars, arc gauges, donuts) rather than prose.
- Persona **Help** from the profile menu: numbered ownership path, starter asks and limits, without long descriptions.
- Accessible labels, visible focus treatment, and responsive layouts.

### Connected persona case

The flagship interactive demo follows a fictional **New Manager Foundations** request across four accountable roles:

1. Claire submits a 12-person learning need.
2. Amélie validates and approves a 16-seat Paris session.
3. Radu checks the group: 10 are ready and two require a business decision.
4. Claire confirms the 11-person outcome: 10 on the main session, Priya on an alternative session, and Thomas retained as follow-up.
5. Radu approves the simulated registrations and invitations, then sees the completion evidence.
6. Elena reviews an INV-04 invitation-control exception, approves a contained remediation, and sees the re-check pass.

Each role has persona-aware navigation, a conversational state, evidence, and an explicit ownership boundary. The scenario is intentionally governed: no completion state is shown until the relevant human approval.

Every guided chat turn also includes an in-conversation work package: what that persona is doing, how the fictional request and evidence are brought together, the references considered, and the review required before the next hand-off. Linked persona briefs, planning checklists and control notes provide the detailed supporting view without pretending to open live systems.

Each persona’s secondary workspace follows the same pattern as Claire’s **My requests**: full-width master-detail or chart board, conversation-aligned header, brand status tokens only, and CTAs that reopen the Assistant with that persona’s existing conversation scenario. Amélie’s Plans board surfaces Claire’s NMF demand and feasibility checks; Radu’s Operations queue holds the registration check and publish draft; Elena’s Controls inbox centres INV-04 with match coverage. Oversight boards (Team learning, Capacity, Session readiness, Control health) show handoffs and open follow-ups as chips and callouts—not text manuals.

## Demo data and boundaries

## Navigation control

The desktop navigation expand/collapse control sits on the outer rail edge between the brand header and New chat, keeping the action close to navigation without obscuring project or recent-conversation content. Projects and Recent collapse independently and reveal overflow plus create actions on hover or keyboard focus. Each project has separate folder, new-conversation, overflow, and expand/collapse controls; project and conversation overflow menus dismiss when the user clicks elsewhere.

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
