# API reference

Responses use `{ "ok": true, "data": ... }` or `{ "ok": false, "error": "..." }`. Authentication uses the signed `yg_session` cookie. No API endpoint exposes an environment key. Send JSON with `Content-Type: application/json`, except uploads, which use multipart form data.

Private routes enforce roles and ownership. Common response codes: 200 for success, 400 for invalid input or invalid transitions, 401 for missing/invalid login, 403 for forbidden access, and 404 for missing resources.

## Authentication and health

| Method | Route | Access / request |
|---|---|---|
| GET | `/api/health` | Public feature configuration status |
| POST | `/api/auth/signup` | `role`, `realName`, `email`, `phone`, `password`; brands also send `companyName`, `industry` |
| POST | `/api/auth/login` | `email`, `password` |
| POST | `/api/auth/logout` | Current session; empty JSON object |
| GET | `/api/auth/me` | Public session identity or null |

## Creator and brand profile

| Method | Route | Access / request |
|---|---|---|
| GET | `/api/creators` | Public creator allow-list; discovery filters |
| GET | `/api/creators/<alias-or-id>` | Public alias/profile/portfolio projection |
| GET | `/api/profile` | Current user's public creative profile or company fields |
| POST | `/api/profile` | Current user's profile fields |
| GET | `/api/dashboard` | Current user's engagements, billing and summary |

Discovery query parameters: `q`, `skills`, `tools`, `specialization`, `contentTypes`, `verified`, `min`, `max`. Verification values: `tools`, `workflow`, `pastWork`. Prices in filter parameters are rupees. Creator profile updates use `headline`, `bio`, `skills`, `tools`, `specialization`, `contentTypes`, `rate`, `turnaroundDays`. List inputs accept comma-separated strings or arrays. Brand profile updates use `companyName`, `industry`.

## Briefs and matching

| Method | Route | Access / request |
|---|---|---|
| GET | `/api/briefs` | Brand's own briefs |
| GET | `/api/briefs/<id>` | Owning brand |
| POST | `/api/briefs` | Brand creates a structured brief |
| POST | `/api/briefs/<id>/shortlist` | Owning brand; `creatorId` |
| GET | `/api/match/<brief-id>` | Owning brand; ranked public creators |
| POST | `/api/brief-builder` | Brand; `idea`; structured fields plus actual live/fallback mode |

Brief creation fields: `title`, `description`, `contentType`, `style`, `aspectRatio`, `requiredTools`, `requiredSkills`, `budget`, `deadline`, `commercialUse`, `platforms`, `duration`, `territory`, `exclusivity`. Budget is a decimal rupee string such as `"1000.00"`. Use booleans for usage/exclusivity fields. Aspect ratios are `9:16`, `16:9`, `1:1`, `4:5`. Content types are `image`, `video`, `audio`, `animation`.

## Engagements and chat

| Method | Route | Access / request |
|---|---|---|
| POST | `/api/invites` | Brand; `briefId`, `creatorId`, `message` |
| GET | `/api/engagements/<id>` | Owning brand or assigned creator |
| POST | `/api/engagements/<id>` | `action`: creator `accept`/`decline`, brand `approve`/`revision` |
| POST | `/api/deliveries/<engagement-id>` | Assigned creator; multipart `title` and `file` or `mediaUrl` |
| GET | `/api/messages/<engagement-id>` | Engagement participants after acceptance |
| POST | `/api/messages/<engagement-id>` | Participant; `text`; warning when contacts are masked |

Clients poll chat every three seconds. Approve/revision actions require a delivery. Delivery uploads are accepted during In Progress or Revision.

## Portfolio and plagiarism

`POST /api/portfolio` publishes a creator's portfolio item after checks. `POST /api/plagiarism` returns the check result without publishing. Both use multipart data: `title`, `description`, `contentType`, `toolsUsed`, `file` or `mediaUrl`, `model`, `seed`, `sampler`, `cfg`, `loras`, `controlNets`, `promptStructure`, `license`, `modelSource`. License values: `commercial-safe`, `non-commercial`.

The maximum file size is 20 MB. Allowed upload types: PNG, JPEG, WebP, GIF, MP4, WebM, MP3, WAV, OGG. URL media use HTTPS and receive text checks, since the remote media are not fetched for hashing. A blocked duplicate returns success with `published: false` and the check report. A Needs review item can publish with its review status.

## Payment and document endpoints

| Method | Route | Access / request |
|---|---|---|
| POST | `/api/payments` | Owning brand; `engagementId`; approved delivery required |
| GET | `/api/invoices/<invoice-id>` | Owning brand only |
| GET | `/api/payouts/<statement-id>` | Assigned creator only |
| GET | `/api/document-access/<engagement-id>?kind=invoice` | Owning brand; permission result only |
| GET | `/api/document-access/<engagement-id>?kind=payout` | Assigned creator; permission result only |

Document pages: `/engagements/<id>/invoice` and `/engagements/<id>/payout`. Each offers browser Print and a standalone HTML download. Payment retries return the original invoice; creator statement contents are never returned from the payment endpoint to a brand.
