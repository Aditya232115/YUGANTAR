# Architecture

## Stack

Next.js App Router serves pages and API endpoints in one TypeScript application. React provides interactive forms and dashboards. Tailwind and the shared stylesheet provide responsive light/dark layouts. Node crypto provides password hashing, session signatures, upload IDs and exact-file hashes. Sharp computes image dHash. The JSON store is local to one persistent Node server.

## Source layout

| Path | Responsibility |
|---|---|
| `src/types/index.ts` | Shared domain records |
| `src/app/` | Landing, authentication, discovery, dashboards and project pages |
| `src/app/api/` | Route adapters and explicit document/payment endpoints |
| `src/components/` | Forms, cards, chat and printable documents |
| `src/lib/service.ts` | Marketplace endpoint validation and transitions |
| `src/lib/db.ts` | Serialized JSON transactions and atomic persistence |
| `src/lib/auth.ts` | scrypt and signed sessions |
| `src/lib/sanitize.ts`, `privacy.ts`, `leakGuard.ts` | Public projections and identity/contact protection |
| `src/lib/billing.ts`, `format.ts` | Fee/tax rules and integer currency formatting |
| `src/lib/matching.ts`, `filters.ts` | Creator rankings and discovery |
| `src/lib/ai.ts`, `env.ts` | Server-only API configuration and deterministic fallback |
| `src/lib/plagiarism.ts`, `uploads.ts` | Duplicate checks and media handling |
| `src/data/seed.ts` | First-run demo generator |
| `src/proxy.ts` | HTTP document-page access checks |

## Main records

Users have a private identity and a public alias. Portfolio items have tools, workflow details and recorded plagiarism checks. Briefs belong to brands. Engagements link a brand, creator and brief. Acceptance creates a contract that snapshots the price, platform fee and creator payout. Messages belong to an engagement. Payments, invoices and payout statements are separate records linked to that engagement.

The DB also stores invoice/payout counters and blocked-attempt metadata. User records are never directly returned as public creator responses.

## Lifecycle

```text
Brief → shortlist → invite
Invite → creator accepts → contract + chat
Work in progress → delivery → brand revision request → revised delivery
Delivery → brand approves → simulated payment → Delivered
                                      ├─ brand invoice
                                      └─ creator-only payout statement
```

Approval does not finalize payment. A paid engagement is Delivered. Retried payment requests return the existing invoice. Payment, invoice, payout and counters are committed together in one JSON transaction.

## Billing

All values are integer paise. The default fee is 10%. For a ₹1,000 contract, the brand pays ₹1,100 before tax and the creator receives ₹900. Tax is a configurable prototype rate applied to contract plus fee. This fee on both sides is the requested prototype policy. The accepted contract is the source for its price, fee and payout.

Invoice and statement numbers have independent annual counters. Retain the DB to retain uniqueness. Resetting the prototype DB also resets numbering.

## Privacy boundary

Brands receive aliases, public creative fields and their own documents. Creators receive their own payout statements. Company names become visible to the creator after acceptance. Contact details are blocked in public text and masked in chat. Known private identity strings are redacted after allow-list projections. Document page checks return HTTP 403 for other signed-in accounts, in addition to checks inside API handlers.

## Storage and AI

Each read/write obtains an exclusive lock. Writes replace the JSON file atomically. This is appropriate for the local single-server prototype, not distributed deployment. Anthropic requests run only on the server. Missing keys, failed requests and invalid structured responses use the built-in fallback. Reverse image search has no configured provider implementation.
