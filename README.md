# YUGANTAR

Complete local prototype: Next.js App Router, TypeScript strict, Tailwind, Node crypto sessions, JSON database, anonymous creator marketplace, matching, portfolio checks, polling chat, simulated billing, light theme and persistent dark mode.

## Documentation

- [GitHub upload and push instructions](docs/GITHUB_SETUP.md)
- [Architecture and data model](docs/ARCHITECTURE.md)
- [API reference](docs/API.md)
- [Acceptance tests and demo walkthrough](docs/TESTING.md)
- [Hosting and persistent storage](docs/DEPLOYMENT.md)
- [Contributing](CONTRIBUTING.md)
- [Security and privacy](SECURITY.md)

The repository contains the complete frontend and backend. `package.json` belongs at the repository root. Runtime data is generated on first run and is excluded from Git. GitHub stores the code; the website runs through a Node server.

## Run in VS Code

Open this `yugantar` folder. Use Node 20.9+ (approved upgrade for patched dependencies).

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. No API keys are necessary. The database and local signing secret are created automatically. Stop the server before resetting the demo by deleting `data/db.json`; this also resets the invoice counters, so never reset a store whose document numbering must be retained. Keep the database together with its documents.

`tsx` is the single extra development package: it runs TypeScript acceptance tests with Node's built-in test runner. Runtime additions use only sharp. Tailwind’s PostCSS adapter is part of the modern Next.js scaffold. No payment gateway, PDF library, database service, or AI SDK is used.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Brand | brand1@demo.local | Demo123! |
| Creator | creator1@demo.local | Demo123! |
| Second brand | brand2@demo.local | Demo123! |
| Second creator | creator2@demo.local | Demo123! |

All brand1–4 and creator1–10 accounts use the same password. Two paid engagements are seeded; brand1/creator1 and brand2/creator2 see their own document on first login. Use separate browser profiles to act as different roles concurrently.

## Environment

Copy `.env.example` to `.env.local`. Only `src/lib/env.ts` reads configuration. Keys never enter client bundles. Without `SESSION_SECRET`, a random secret is persisted to `data/.secret`. Without an Anthropic key, the keyword brief builder works. If a configured model is unavailable, times out, or returns invalid JSON, the app also falls back. The requested model name is configurable; availability depends on your API account. Health reports key configuration, not a service availability probe. Optional reverse-image key is deliberately unused: no external provider was specified.

`TAX_RATE` is a decimal fraction: `0` default, `0.05` for 5%. Tax is computed on contract plus the platform fee. INR is the prototype currency. Money is stored in paise, computed using integers, and formatted only in `src/lib/format.ts`. The fee policy and tax calculation live in `src/lib/billing.ts`.

For a ₹1,000 contract with zero tax: invoice service subtotal ₹1,000, platform fee ₹100, brand total ₹1,100, creator payout ₹900. The prototype intentionally charges the brand a fee and deducts a fee from the creator, matching the supplied invoice and payout requirements. Existing contracts preserve their fee and payout. Changing the fee policy requires an explicit contract migration.

## Walk through the complete flow

1. Log in as brand1. Dashboard Billing already contains an invoice. Open it, print to PDF with browser printing, or download the HTML. Navbar and controls disappear in print.
2. Create a new brief. Enter a rough idea, click **Build my brief**, review prefilled fields, provide deadline and budget, and publish. See scores, reasons and commercial-use conflicts. Shortlist a creator and send an invite.
3. Log in as the invited creator. Open the invitation from the dashboard and accept. The contract is created at this point, using the brief budget. A brand company name becomes visible after acceptance; aliases remain the only creator identity.
4. In chat send `call me on 9876543210` or `mail me at a@b.com`. The text is hidden and the sender sees a warning; the original blocked text is not stored. Chat refreshes every three seconds.
5. Upload a delivery or enter an HTTPS media URL. As brand1, request revision. As creator, upload a revised delivery. As brand1, approve it. Click **Pay now (simulated)**. The engagement becomes Delivered; an invoice and creator statement are created together under the database lock.
6. Repeat the payment POST for the same engagement; it returns the existing invoice. There is one payment, invoice and payout statement. Brand sees only its invoice; creator sees only its payout statement. Both dashboards include Billing.
7. Copy `/engagements/<id>/invoice` into the other brand account or a creator account. It returns HTTP 403. The same applies to `/api/invoices/<invoice-id>`. Copy the payout URL into a brand or other creator account; it returns 403 too.
8. As creator, edit skills, tools, content types, specialization, starting rate and turnaround. Add a portfolio image with a distinctive title and description. Inspect the displayed plagiarism checks and workflow modal. Upload the identical bytes under another creator: publication is blocked. Images use SHA-256 and 64-bit dHash; text uses three-word shingles/Jaccard. Near-duplicate and text matches publish as under review.
9. Put an email, phone, social handle or URL in public text fields: submission is blocked. Inspect brand-facing responses: no raw creator record, realName, email, phone or password hash is exposed.
10. In Discover, enter a nonexistent skill or impossible price. See the empty state, alternative creators and working **Clear filters**. Toggle Dark; reload to confirm it persists. Light is the initial theme.
11. Remove API keys and restart. Brief builder, matching, portfolio checks, authentication, chat and billing still work. Optional AI review uses title/description only and is labeled advisory.

## Verification

```powershell
npm run typecheck
npm test
npm run build
```

Eight automated unit tests cover integer totals, payment/document idempotency, counters, seed privacy, public projections, leak masking, duplicate blocking, matching and filters. Use the walkthrough for browser printing and full role transitions. The included `scripts/integration.mjs` runs an HTTP acceptance flow against a running server:

```powershell
node scripts/integration.mjs
```

It creates a temporary brief and complete paid engagement in your local demo database.

## Files and feature map

| Feature | Implementation |
|---|---|
| Landing, responsive light/dark theme | app/page.tsx, app/globals.css, Navbar.tsx |
| Signup/login/logout and protected roles | lib/auth.ts, lib/service.ts, lib/pageAuth.ts, creator/layout.tsx, brand/layout.tsx |
| JSON store, automatic demo seed | lib/db.ts, data/seed.ts |
| Server environment and health | lib/env.ts, lib/service.ts |
| Public anonymity allow-list | lib/sanitize.ts, lib/leakGuard.ts |
| Creator editing, portfolio/workflow badges | AppViews.tsx, UploadForm.tsx, WorkflowModal.tsx, lib/sanitize.ts |
| Discovery and empty states | lib/filters.ts, DiscoverView, FilterBar.tsx, EmptyState.tsx |
| Brief builder and ranked matching | lib/ai.ts, lib/matching.ts, BriefForm.tsx, MatchScoreCard.tsx |
| Shortlist/invite/accept/contract/revision | lib/service.ts, EngagementView, StatusStepper.tsx |
| Polling chat and masked contacts | ChatBox.tsx, lib/service.ts, lib/leakGuard.ts |
| SHA-256, dHash, text and advisory checks | lib/plagiarism.ts, PlagiarismResult.tsx |
| Payments, counters, invoice/payout | lib/billing.ts, api/payments/route.ts, api/invoices/[id]/route.ts, api/payouts/[id]/route.ts |
| Document permissions including HTTP 403 | proxy.ts, api/document-access/[id]/route.ts, invoice/payout pages |
| Printable A4 and HTML downloads | InvoiceView.tsx, PayoutStatementView.tsx, DocumentActions.tsx, globals.css |
| Billing on both dashboards | BillingList.tsx, DashboardView |

Most marketplace endpoints share `lib/service.ts` through explicit route adapters and the catch-all route. All API responses follow `{ok,data?,error?}`. Input validation and role/ownership checks run on the server. Document routes are explicit as requested. `FILE_TREE.txt` lists all source files.

## Prototype scope

Checks cover duplicates inside YUGANTAR and basic risk, **not the entire internet**. Seeded art is marked as demo work rather than a verified upload. Media URLs are not fetched for hashing. Public portfolio media are deliberately public; delivery uploads are local prototype files, so anyone with their unguessable file URL can fetch the binary. Do not put confidential assets into this prototype. HTML downloads embed the document's styles and work offline. Browser Print lets you save a PDF without a PDF package.

This is a single persistent Node server prototype, not a stateless/serverless deployment. The store serializes transactions with a process queue and exclusive lock file and saves using atomic replacement. If a process crashes while holding the lock, stop all server processes before removing `data/.lock`. There is no automatic stale-lock removal to avoid destroying a live writer's lock. Back up `data/db.json`, `data/.secret` and uploads together. A public production launch would additionally need moderation for intentional identity disclosure in images/voice, rate limits, malware scanning, protected delivery storage and operational hardening. These are outside the requested local prototype.
