# SG Learning Operations

Interactive Next.js front-end POC for Société Générale GSC Romania learning operations. It uses typed mock data only—there are no external integrations, authentication, APIs, or persistence.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo flow

Use **Assistant** to progress through the six connected states:

1. Claire’s request for 12 new managers
2. Feasible Paris session proposal
3. Calendar-conflict exception review (10 eligible, 2 exceptions)
4. Cohort selection and recommended alternatives
5. Approval before any background action is completed
6. Operations view with progress, exception, controls, and audit history

The left navigation can collapse and keeps its section vocabulary consistent across every state. `app/data/scenario.ts` is the single typed mock-data source; reusable UI components live in `app/components`.
