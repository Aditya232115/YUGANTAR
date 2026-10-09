# Running and hosting YUGANTAR

## Production process

Use Node 20.9+ on a persistent server with writable application storage.

```sh
npm ci
npm run build
npm start
```

The application runs on port 3000 unless the launch command selects another port. Set server-only environment configuration using `.env.local` or your host's environment settings. Use a stable `SESSION_SECRET` for hosted sessions. HTTPS is required for production use with the secure session cookie.

## Storage requirements

Retain `data/db.json`, `data/.secret` if generated, and `public/uploads`. Back them up together. Keep one server instance using this JSON store. All instances would otherwise need a shared transactional database implementation, which this prototype intentionally does not include.

Invoice/payout counters are part of the database. Deleting or replacing it resets numbering. If a crashed process left `data/.lock`, stop all application processes before removing the lock. Do not remove a lock held by a live writer.

The store is generated on first run, including synthetic demo accounts and two paid sample engagements. Build tasks do not require API keys. Real payments are not supported.

## Hosting boundaries

GitHub is the source repository, not a host for this server. A static-only host cannot run authentication, uploads, API routes or the JSON store. A stateless deployment or read-only filesystem cannot reliably preserve this application's data. Use a persistent Node environment for the demo, or redesign storage before selecting a different deployment model.

Read [SECURITY.md](../SECURITY.md) before exposing the prototype to real users. This package includes no deployment credentials and performs no automatic deployment.
