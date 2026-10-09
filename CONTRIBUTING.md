# Contributing to YUGANTAR

## Local setup

Use Node 20.9 or newer. `.nvmrc` selects Node 24 for development and CI.

```sh
npm ci
```

Copy `.env.example` to `.env.local`, then run `npm run dev`. No API key is required for the deterministic fallback experience.

## Development rules

- Keep TypeScript strict and shared types in `src/types/index.ts`.
- Use server-side role and ownership checks for every private resource.
- Build public creator responses from the allow-list in `src/lib/sanitize.ts`.
- Never expose real names, contact details, password hashes, or environment secrets to another account.
- Access the JSON database only through `src/lib/db.ts`.
- Store money as integer paise; format it through `src/lib/format.ts`.
- Keep billing policies in `src/lib/billing.ts`.
- Preserve payment idempotency: retries must not create new documents.
- Keep light/dark themes, mobile layouts, labels, loading states and error handling functional.

## Before submitting a pull request

```sh
npm run typecheck
npm test
npm run build
```

For changes to roles, engagements, payments or portfolio publication, also run `node scripts/integration.mjs` against a local development server. This creates synthetic records and uploads in the local database; use a disposable demo store.

Describe the problem, the resulting behavior, and how you tested it. Include screenshots for visible layout changes and check the printable documents when changing billing layouts. Do not commit `.env.local`, `data/`, uploads, installed packages or build output.
