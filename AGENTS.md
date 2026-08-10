# SG Learning Operations contributor guide

## Product boundary

- This is a front-end-only, fictional-data prototype. Do not imply live integrations, production writes, authentication, or persisted records.
- Keep work conversational and governed: the assistant prepares, checks, and recommends; a named persona approves consequential business, planning, registration, or control actions.
- Use `app/data/scenario.ts` as the connected-case truth set. Update the connected storyline and affected persona documents when its people, counts, dates, or outcomes change.

## UI system

- Use `lucide-react` for all interface icons. Prefer a single 1.8–2px outlined style; do not mix icon libraries or introduce emoji as UI icons.
- New-chat quick actions must have a meaningful Lucide icon and a short action label. Use the shared `QuickActions` component rather than recreating action tiles.
- Motion is subtle and functional: 160–320ms ease-out transitions for panel widths, chevrons, hover feedback, and action-card entry. Never make motion block interaction.
- Respect `prefers-reduced-motion`; retain the shared reduction rule in `app/globals.css` whenever motion is added.
- Preserve the fixed app shell: the centre workspace owns page-length scrolling; the left rail and right context panel stay viewport-bound.
- Do not add global or automatic context-panel openers. In a chat, expose a resource link from the relevant assistant message; that message-level action alone opens the right panel. Use `ConversationThread` and `app/data/conversations.ts` for persona-specific fictional documents.

## Documentation and verification

- Update `README.md` and `app/documents/07-Implementation-Guide.md` for implemented feature or architecture changes. Update the relevant persona flow and `06-Connected-Persona-Storyline.md` for workflow changes.
- Run `npm run build` after application changes. Use the browser to verify changed interaction paths and the fixed-panel scroll behaviour when layout or interaction code changes.
