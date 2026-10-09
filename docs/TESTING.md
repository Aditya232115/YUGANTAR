# Tests and demo checklist

## Automated checks

```sh
npm ci
npm run typecheck
npm test
npm run build
```

Type checking generates Next.js route types first, so it works on a fresh clone without a prior build. The eight unit tests cover integer money calculations, idempotent billing, counters, document privacy, public projections, contact masking, exact/near-image duplicate detection, text similarity, matching, empty filters and known-name redaction.

Start the app in another terminal with `npm run dev`, then:

```sh
node scripts/integration.mjs
```

The HTTP script signs in as both roles and other accounts. It verifies brief creation/matching/shortlisting, invite acceptance, contract creation, chat masking, delivery revisions, approval, five concurrent payment requests, role-specific billing, document APIs/page HTTP 403, URL/media flows and cross-creator exact duplicate blocking. It creates synthetic data; run it against a disposable local store.

## Browser checklist

| Check | Expected result |
|---|---|
| Landing and discovery on mobile/desktop | Responsive cards and navigation |
| Switch to Dark, then reload | Dark persists; new profiles default to light |
| Log in as brand1 or creator1 | Dashboard and seeded Billing document present |
| Build brief without AI key | Editable keyword-based brief is prepared |
| Publish brief | Ranked matches show score, reasons and conflicts |
| Filter for an impossible skill | Empty state, alternatives and Clear filters |
| Invite and accept | Contract appears and project chat opens |
| Send `mail me at a@b.com` | Contact is hidden and sender sees a warning |
| Upload same image as two creators | Second publication is blocked |
| View portfolio workflow | Declared workflow and honest plagiarism scope appear |
| Deliver, request revision, deliver again, approve | Valid project transitions |
| Pay repeatedly | One payment, one invoice and one payout statement |
| ₹1,000 contract at zero tax | Brand total ₹1,100; creator payout ₹900 |
| Open invoice as another brand/creator | HTTP 403 |
| Open payout as a brand or another creator | HTTP 403 |
| Print document | A4 white page without navigation or controls |
| Download .html and open offline | Document content and embedded styles remain available |

## Validation history

The delivered application passed its production build, eight unit tests and the HTTP acceptance flow in the local Windows environment. Browser checks verified demo login, the Billing list, invoice fields, dark-mode persistence and an HTML download containing embedded A4 styles without buttons/navigation/scripts. GitHub-hosted CI is configured but has not been run in your repository yet. Test outcomes are snapshots; rerun checks after making changes.
