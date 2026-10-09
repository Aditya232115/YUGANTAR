import type { Database } from '@/types';
import { maskLeaks } from './leakGuard';
export function redactIdentities(value: string, db: Database): string { let out = value; for (const user of db.users)
    for (const secret of [user.realName, user.email, user.phone]) {
        if (secret.trim().length < 3)
            continue;
        const escaped = secret.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        out = out.replace(new RegExp(escaped, 'gi'), '[hidden by YUGANTAR]');
    } return out; }
// Traversal is applied after route-specific allow-list projections, never instead of them.
export function sanitizeResponse(value: unknown, db: Database): unknown { if (typeof value === 'string')
    return redactIdentities(value, db); if (Array.isArray(value))
    return value.map(x => sanitizeResponse(x, db)); if (value && typeof value === 'object')
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sanitizeResponse(v, db)])); return value; }
