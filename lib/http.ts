import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './auth';
import type { Role, SessionUser } from '@/types';
import { readDb } from './db';
import { sanitizeResponse } from './sanitize';
export class HttpError extends Error {
    constructor(public status: number, message: string) { super(message); }
}
export async function requireUser(role?: Role): Promise<SessionUser> { const user = await getSession(); if (!user)
    throw new HttpError(401, 'Please log in'); if (role && user.role !== role)
    throw new HttpError(403, 'Forbidden'); return user; }
export function requireOwner(allowed: boolean) { if (!allowed)
    throw new HttpError(403, 'Forbidden'); }
export async function api(req: NextRequest, fn: () => Promise<unknown>): Promise<NextResponse> { try {
    if (!['GET', 'HEAD'].includes(req.method)) {
        const origin = req.headers.get('origin');
        if (origin && origin !== req.nextUrl.origin)
            throw new HttpError(403, 'Invalid request origin');
    }
    const result = await fn();
    return NextResponse.json({ ok: true, data: await readDb(db => sanitizeResponse(result, db)) });
}
catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : 'Request failed' }, { status: e instanceof HttpError ? e.status : 400 });
} }
export async function body(req: NextRequest): Promise<Record<string, unknown>> { const b: unknown = await req.json(); if (!b || typeof b !== 'object' || Array.isArray(b))
    throw new Error('Invalid request body'); return b as Record<string, unknown>; }
export function text(b: Record<string, unknown>, key: string, max = 4000, optional = false): string { const v = b[key]; if (v === undefined && optional)
    return ''; if (typeof v !== 'string' || v.length > max || (!optional && !v.trim()))
    throw new Error(`Invalid ${key}`); return v.trim(); }
export function list(value: unknown): string[] { if (Array.isArray(value) && value.every(x => typeof x === 'string'))
    return value.slice(0, 30).map(x => x.trim()).filter(Boolean); if (typeof value === 'string')
    return value.split(',').map(x => x.trim()).filter(Boolean).slice(0, 30); throw new Error('Expected comma separated list'); }
