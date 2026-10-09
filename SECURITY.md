# Security and privacy

YUGANTAR is a local hackathon prototype with synthetic demo accounts and simulated payments. It does not issue legal tax invoices.

## Implemented controls

- Password hashing with Node scrypt.
- Signed, HTTP-only session cookies with SameSite protection.
- Server-side role and engagement ownership checks.
- Explicit public creator projections and text redaction.
- Chat contact masking and blocked-attempt metadata.
- Transaction serialization, atomic JSON file replacement and persistent document counters.
- Environment-only API credentials on the server.
- HTML document downloads without executable scripts.

## Known boundaries

Portfolio and delivery uploads are served from `public/uploads`. Someone who possesses an upload URL can fetch that file. Do not upload confidential material. Free text is scanned, but personal identity inside images, video or audio is not comprehensively detected. Duplicate checks cover platform records, not internet-wide copyright or originality.

The application needs one persistent Node instance and writable local storage. It is not a production multi-instance database. Add rate limits, upload scanning, private delivery storage, operational monitoring and moderation before a public launch with real users. Demo login details shown in the UI are intentional synthetic credentials.

## Reporting a vulnerability

Use the repository's private vulnerability reporting feature if its owner enables it. Otherwise, contact the repository owner through a private channel they provide. Do not post secrets, personal records, session cookies or live exploit details in a public issue.

If an API key or signing secret is exposed, rotate it and remove it from published history. Deleting it from the latest file alone does not remove earlier commits.
