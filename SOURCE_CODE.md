```text
YUGANTAR repository root
.env.example
.gitattributes
.github/ISSUE_TEMPLATE/bug_report.md
.github/pull_request_template.md
.github/workflows/ci.yml
.gitignore
.nvmrc
AGENTS.md
CONTRIBUTING.md
README.md
SECURITY.md
docs/API.md
docs/ARCHITECTURE.md
docs/DEPLOYMENT.md
docs/GITHUB_SETUP.md
docs/TESTING.md
next.config.mjs
package-lock.json
package.json
postcss.config.mjs
public/samples/study-1.svg
public/samples/study-2.svg
public/samples/study-3.svg
public/samples/study-4.svg
scripts/format-source.mjs
scripts/integration.mjs
src/app/api/[...path]/route.ts
src/app/api/auth/route.ts
src/app/api/brief-builder/route.ts
src/app/api/briefs/route.ts
src/app/api/creators/route.ts
src/app/api/document-access/[id]/route.ts
src/app/api/engagements/route.ts
src/app/api/health/route.ts
src/app/api/invites/route.ts
src/app/api/invoices/[id]/route.ts
src/app/api/match/route.ts
src/app/api/messages/route.ts
src/app/api/payments/route.ts
src/app/api/payouts/[id]/route.ts
src/app/api/plagiarism/route.ts
src/app/api/portfolio/route.ts
src/app/brand/briefs/[id]/page.tsx
src/app/brand/briefs/new/page.tsx
src/app/brand/briefs/page.tsx
src/app/brand/dashboard/page.tsx
src/app/brand/layout.tsx
src/app/creator/dashboard/page.tsx
src/app/creator/layout.tsx
src/app/creator/portfolio/new/page.tsx
src/app/creator/profile/page.tsx
src/app/creators/[alias]/page.tsx
src/app/discover/page.tsx
src/app/engagements/[id]/invoice/page.tsx
src/app/engagements/[id]/page.tsx
src/app/engagements/[id]/payout/page.tsx
src/app/error.tsx
src/app/globals.css
src/app/layout.tsx
src/app/loading.tsx
src/app/login/page.tsx
src/app/not-found.tsx
src/app/page.tsx
src/app/signup/page.tsx
src/components/AppViews.tsx
src/components/BadgeRow.tsx
src/components/BillingList.tsx
src/components/BriefBuilderBox.tsx
src/components/BriefForm.tsx
src/components/ChatBox.tsx
src/components/CreatorCard.tsx
src/components/DocumentActions.tsx
src/components/EmptyState.tsx
src/components/FilterBar.tsx
src/components/Footer.tsx
src/components/InvoiceView.tsx
src/components/MatchScoreCard.tsx
src/components/Navbar.tsx
src/components/PayButton.tsx
src/components/PayoutStatementView.tsx
src/components/PlagiarismResult.tsx
src/components/StatusStepper.tsx
src/components/UploadForm.tsx
src/components/WorkflowModal.tsx
src/data/seed.ts
src/lib/ai.ts
src/lib/auth.ts
src/lib/billing.ts
src/lib/client.ts
src/lib/db.ts
src/lib/env.ts
src/lib/filters.ts
src/lib/format.ts
src/lib/http.ts
src/lib/leakGuard.ts
src/lib/matching.ts
src/lib/pageAuth.ts
src/lib/plagiarism.ts
src/lib/privacy.ts
src/lib/sanitize.ts
src/lib/service.ts
src/lib/uploads.ts
src/proxy.ts
src/types/index.ts
tailwind.config.ts
tests/core.test.ts
tsconfig.json
FILE_TREE.txt
SOURCE_CODE.md
```

## Setup

Use Node 20.9+ and run these commands at the repository root:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

## Complete source and documentation

`package-lock.json` is included separately in the repository. Next.js generates ignored `next-env.d.ts` and route types automatically; `npm run typecheck` handles a fresh clone.

src/types/index.ts

````typescript
export type Role = 'brand' | 'creator';
export type ContentType = 'image' | 'video' | 'audio' | 'animation';
export type Stage = 'Invited' | 'Declined' | 'In Progress' | 'Revision' | 'Approved' | 'Delivered';
export interface Workflow {
    model: string;
    seed: string;
    sampler: string;
    cfg: string;
    loras: string;
    controlNets: string;
    promptStructure: string;
    license: 'commercial-safe' | 'non-commercial';
    modelSource: string;
}
export interface PlagiarismCheck {
    status: 'Original' | 'Needs review' | 'Blocked (duplicate)';
    checks: string[];
    advisory?: string;
    sha256?: string;
    dhash?: string;
}
export interface PortfolioItem {
    id: string;
    creatorId: string;
    title: string;
    description: string;
    contentType: ContentType;
    mediaUrl: string;
    toolsUsed: string[];
    workflow: Workflow;
    plagiarism: PlagiarismCheck;
}
export interface User {
    id: string;
    role: Role;
    realName: string;
    email: string;
    phone: string;
    passwordHash: string;
    alias: string;
    avatarColor: string;
    companyName: string;
    industry: string;
    headline: string;
    bio: string;
    specialization: string[];
    skills: string[];
    tools: string[];
    contentTypes: ContentType[];
    rate: number;
    turnaroundDays: number;
}
export interface Badges {
    tools: boolean;
    workflow: boolean;
    pastWork: boolean;
}
export interface PublicCreator {
    id: string;
    alias: string;
    avatarColor: string;
    headline: string;
    bio: string;
    specialization: string[];
    skills: string[];
    tools: string[];
    contentTypes: ContentType[];
    rate: number;
    turnaroundDays: number;
    portfolio: PortfolioItem[];
    badges: Badges;
}
export interface Brief {
    id: string;
    brandId: string;
    title: string;
    description: string;
    contentType: ContentType;
    style: string;
    aspectRatio: string;
    requiredTools: string[];
    requiredSkills: string[];
    budget: number;
    deadline: string;
    commercialUse: boolean;
    platforms: string;
    duration: string;
    territory: string;
    exclusivity: boolean;
    shortlist: string[];
    status: 'Open' | 'Shortlisted' | 'In Progress' | 'Revision' | 'Delivered';
}
export interface Contract {
    id: string;
    engagementId: string;
    price: number;
    platformFee: number;
    creatorPayout: number;
    createdAt: string;
}
export interface Delivery {
    id: string;
    title: string;
    mediaUrl: string;
    createdAt: string;
}
export interface Engagement {
    id: string;
    brandId: string;
    creatorId: string;
    briefId: string;
    message: string;
    status: Stage;
    contract?: Contract;
    deliveries: Delivery[];
    createdAt: string;
}
export interface Message {
    id: string;
    engagementId: string;
    senderId: string;
    text: string;
    createdAt: string;
}
export interface Payment {
    id: string;
    engagementId: string;
    status: 'paid';
    method: 'Simulated';
    amount: number;
    paidAt: string;
}
export interface Invoice {
    id: string;
    engagementId: string;
    brandId: string;
    number: string;
    issuedAt: string;
    paidAt: string;
    status: 'Paid';
    companyName: string;
    creatorAlias: string;
    briefTitle: string;
    subtotal: number;
    platformFee: number;
    taxRate: number;
    tax: number;
    total: number;
}
export interface PayoutStatement {
    id: string;
    engagementId: string;
    creatorId: string;
    number: string;
    date: string;
    briefTitle: string;
    companyName: string;
    gross: number;
    platformFee: number;
    net: number;
    status: 'Payout simulated';
}
export interface Database {
    users: User[];
    portfolio: PortfolioItem[];
    briefs: Brief[];
    engagements: Engagement[];
    messages: Message[];
    payments: Payment[];
    invoices: Invoice[];
    payoutStatements: PayoutStatement[];
    counters: Record<string, number>;
    blockedAttempts: {
        userId: string;
        createdAt: string;
        kind: string;
    }[];
}
export interface SessionUser {
    id: string;
    role: Role;
    alias: string;
}
export interface Match {
    creator: PublicCreator;
    score: number;
    reasons: string[];
    conflicts: string[];
}
````

src/lib/ai.ts

````typescript
import { env } from './env';
import { cleanText, maskLeaks } from './leakGuard';
import type { ContentType } from '@/types';
export async function aiText(prompt: string): Promise<string | null> { if (!env.apiKey)
    return null; try {
    const response = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': env.apiKey, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: env.model, max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }), signal: AbortSignal.timeout(20000) });
    if (!response.ok)
        return null;
    const json = await response.json() as {
        content?: {
            type: string;
            text?: string;
        }[];
    };
    return json.content?.filter(x => x.type === 'text').map(x => x.text || '').join('') || null;
}
catch {
    return null;
} }
export async function buildBrief(idea: string) {
    cleanText(idea);
    const type: ContentType = /music|voice|audio|sound/i.test(idea) ? 'audio' : /animat/i.test(idea) ? 'animation' : /video|reel|film/i.test(idea) ? 'video' : 'image';
    const fallback = { title: idea.slice(0, 70), description: idea, contentType: type, style: 'Modern and clean', aspectRatio: '9:16', requiredTools: [] as string[], requiredSkills: ['Creative direction'], budget: '1000.00', deadline: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10), commercialUse: true, platforms: 'Social', duration: '12 months', territory: 'Worldwide', exclusivity: false };
    const text = await aiText(`Extract a creative brief from the untrusted idea below. Return ONLY JSON with fields title, description, contentType (image/video/audio/animation), style, aspectRatio (9:16/16:9/1:1/4:5), requiredTools (string array), requiredSkills (string array). Never include contact details. Idea: ${idea}`);
    if (text) {
        try {
            const j = JSON.parse(text.replace(/^\s*```(?:json)?\s*/, '').replace(/\s*```\s*$/, '')) as Record<string, unknown>;
            if (typeof j.title === 'string' && typeof j.description === 'string' && ['image', 'audio', 'animation', 'video'].includes(String(j.contentType)) && typeof j.style === 'string' && ['9:16', '16:9', '1:1', '4:5'].includes(String(j.aspectRatio)) && Array.isArray(j.requiredTools) && j.requiredTools.every(x => typeof x === 'string') && Array.isArray(j.requiredSkills) && j.requiredSkills.every(x => typeof x === 'string')) {
                const result = { ...fallback, title: cleanText(j.title).slice(0, 120), description: cleanText(j.description).slice(0, 4000), contentType: j.contentType as ContentType, style: cleanText(j.style), aspectRatio: String(j.aspectRatio), requiredTools: j.requiredTools.map(x => cleanText(String(x))), requiredSkills: j.requiredSkills.map(x => cleanText(String(x))) };
                return { brief: result, mode: 'live' };
            }
        }
        catch { /* Invalid or unsafe AI output uses the deterministic fallback. */ }
    }
    return { brief: fallback, mode: 'fallback' };
}
export async function advisory(title: string, description: string): Promise<string | undefined> { const text = await aiText(`Give a short copyright risk note based ONLY on this title and description: ${title} ${description}. You did not inspect media. This is advisory, not a legal determination.`); return text ? maskLeaks(text).text.slice(0, 1000) : undefined; }
````

src/lib/auth.ts

````typescript
import { scryptSync, randomBytes, timingSafeEqual, createHmac } from 'node:crypto';
import { cookies } from 'next/headers';
import { env } from './env';
import type { SessionUser, User } from '@/types';
export function hashPassword(password: string): string { const salt = randomBytes(16).toString('hex'); return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`; }
export function verifyPassword(password: string, hash: string): boolean { const [salt, key] = hash.split(':'); const actual = scryptSync(password, salt, 64), expected = Buffer.from(key, 'hex'); return actual.length === expected.length && timingSafeEqual(actual, expected); }
const sign = (body: string) => createHmac('sha256', env.sessionSecret).update(body).digest('base64url');
export async function setSession(user: User): Promise<void> { const body = Buffer.from(JSON.stringify({ id: user.id, role: user.role, alias: user.alias, expires: Date.now() + 7 * 86400000 })).toString('base64url'); (await cookies()).set('yg_session', `${body}.${sign(body)}`, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 7 * 86400 }); }
export async function getSession(): Promise<SessionUser | null> { try {
    const token = (await cookies()).get('yg_session')?.value;
    if (!token)
        return null;
    const [body, signature] = token.split('.');
    const a = Buffer.from(signature || ''), b = Buffer.from(sign(body));
    if (a.length !== b.length || !timingSafeEqual(a, b))
        return null;
    const u = JSON.parse(Buffer.from(body, 'base64url').toString()) as SessionUser & {
        expires: number;
    };
    if (u.expires < Date.now() || !['creator', 'brand'].includes(u.role))
        return null;
    return { id: u.id, role: u.role, alias: u.alias };
}
catch {
    return null;
} }
export async function logout(): Promise<void> { (await cookies()).delete('yg_session'); }
````

src/lib/billing.ts

````typescript
import { randomUUID } from 'node:crypto';
import { env } from './env';
import { maskLeaks } from './leakGuard';
import { redactIdentities } from './privacy';
import type { Database, Engagement, Invoice, PayoutStatement } from '@/types';
export const PLATFORM_FEE_PERCENT = 10;
export const TAX_RATE = env.taxRate;
const TAX_BASIS_POINTS = Math.round(TAX_RATE * 10000);
export function calculateTotals(price: number) {
    if (!Number.isSafeInteger(price) || price < 0 || price > 10000000000)
        throw new Error('Invalid contract price');
    const platformFee = Math.floor((price * PLATFORM_FEE_PERCENT + 50) / 100);
    const tax = Math.floor(((price + platformFee) * TAX_BASIS_POINTS + 5000) / 10000);
    return { subtotal: price, platformFee, taxRate: TAX_BASIS_POINTS / 10000, tax, total: price + platformFee + tax, creatorPayout: price - platformFee };
}
export function nextInvoiceNumber(db: Database, kind: 'INV' | 'PAY', now = new Date()): string {
    const key = `${kind}-${now.getUTCFullYear()}`;
    db.counters[key] = (db.counters[key] || 0) + 1;
    return `YG-${kind}-${now.getUTCFullYear()}-${String(db.counters[key]).padStart(4, '0')}`;
}
export function createInvoiceAndStatement(db: Database, e: Engagement): {
    invoice: Invoice;
    statement: PayoutStatement;
} {
    const existing = db.invoices.find(i => i.engagementId === e.id), statement = db.payoutStatements.find(p => p.engagementId === e.id);
    if (existing && statement)
        return { invoice: existing, statement };
    if (existing || statement)
        throw new Error('Inconsistent billing records');
    if (!e.contract)
        throw new Error('Accepted contract required');
    const b = db.briefs.find(b => b.id === e.briefId)!, brand = db.users.find(u => u.id === e.brandId)!, creator = db.users.find(u => u.id === e.creatorId)!;
    const totals = calculateTotals(e.contract.price), now = new Date().toISOString();
    if (totals.platformFee !== e.contract.platformFee || totals.creatorPayout !== e.contract.creatorPayout)
        throw new Error('Contract fee does not match billing policy');
    const invoice: Invoice = { id: randomUUID(), engagementId: e.id, brandId: e.brandId, number: nextInvoiceNumber(db, 'INV'), issuedAt: now, paidAt: now, status: 'Paid', companyName: redactIdentities(maskLeaks(brand.companyName).text, db), creatorAlias: creator.alias, briefTitle: redactIdentities(maskLeaks(b.title).text, db), subtotal: totals.subtotal, platformFee: totals.platformFee, taxRate: totals.taxRate, tax: totals.tax, total: totals.total };
    const payout: PayoutStatement = { id: randomUUID(), engagementId: e.id, creatorId: e.creatorId, number: nextInvoiceNumber(db, 'PAY'), date: now, briefTitle: invoice.briefTitle, companyName: invoice.companyName, gross: e.contract.price, platformFee: e.contract.platformFee, net: e.contract.creatorPayout, status: 'Payout simulated' };
    db.invoices.push(invoice);
    db.payoutStatements.push(payout);
    db.payments.push({ id: randomUUID(), engagementId: e.id, status: 'paid', method: 'Simulated', amount: totals.total, paidAt: now });
    e.status = 'Delivered';
    b.status = 'Delivered';
    return { invoice, statement: payout };
}
````

src/lib/client.ts

````typescript
'use client';
import { useEffect, useState, useCallback } from 'react';
export async function request<T>(url: string, body?: unknown): Promise<T> { const response = await fetch(url, { method: body === undefined ? 'GET' : 'POST', headers: body instanceof FormData ? undefined : body === undefined ? undefined : { 'content-type': 'application/json' }, body: body instanceof FormData ? body : body === undefined ? undefined : JSON.stringify(body), cache: 'no-store' }); const result = await response.json() as {
    ok: boolean;
    data: T;
    error?: string;
}; if (!result.ok)
    throw new Error(result.error || 'Request failed'); return result.data; }
export function useData<T>(url: string) { const [data, setData] = useState<T | null>(null), [error, setError] = useState(''), [loading, setLoading] = useState(true); const reload = useCallback(async () => { try {
    setError('');
    setData(await request<T>(url));
}
catch (e) {
    setError(e instanceof Error ? e.message : 'Request failed');
}
finally {
    setLoading(false);
} }, [url]); useEffect(() => { setLoading(true); void reload(); }, [reload]); return { data, error, loading, reload }; }
export const errorText = (e: unknown) => e instanceof Error ? e.message : 'Request failed';
````

src/lib/db.ts

````typescript
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Database } from '@/types';
import { createSeed } from '@/data/seed';
const dir = path.join(process.cwd(), 'data'), file = path.join(dir, 'db.json'), lock = path.join(dir, '.lock');
let queue: Promise<unknown> = Promise.resolve();
async function acquire() { await fs.mkdir(dir, { recursive: true }); const start = Date.now(); for (;;) {
    try {
        return await fs.open(lock, 'wx');
    }
    catch (e) {
        if ((e as NodeJS.ErrnoException).code !== 'EEXIST')
            throw e;
        if (Date.now() - start > 15000)
            throw new Error('Database is busy. If the server crashed, stop it and remove data/.lock.');
        await new Promise(r => setTimeout(r, 30));
    }
} }
async function transaction<T>(fn: (db: Database) => T | Promise<T>, write: boolean): Promise<T> { const handle = await acquire(); try {
    let db: Database;
    try {
        db = JSON.parse(await fs.readFile(file, 'utf8')) as Database;
    }
    catch (e) {
        if ((e as NodeJS.ErrnoException).code !== 'ENOENT')
            throw e;
        db = createSeed();
        await save(db);
    }
    const result = await fn(db);
    if (write)
        await save(db);
    return result;
}
finally {
    await handle.close();
    await fs.unlink(lock);
} }
async function save(db: Database) { const tmp = path.join(dir, `db-${process.pid}-${Date.now()}.tmp`); await fs.writeFile(tmp, JSON.stringify(db, null, 2)); await fs.rename(tmp, file); }
function run<T>(fn: (db: Database) => T | Promise<T>, write: boolean): Promise<T> { const next = queue.then(() => transaction(fn, write)); queue = next.catch(() => undefined); return next; }
export const readDb = <T>(fn: (db: Database) => T | Promise<T>) => run(fn, false);
export const mutateDb = <T>(fn: (db: Database) => T | Promise<T>) => run(fn, true);
````

src/lib/env.ts

````typescript
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const directory = path.join(process.cwd(), 'data');
mkdirSync(directory, { recursive: true });
function secret(): string {
    if (process.env.SESSION_SECRET)
        return process.env.SESSION_SECRET;
    const file = path.join(directory, '.secret');
    try {
        writeFileSync(file, randomBytes(48).toString('hex'), { flag: 'wx', mode: 0o600 });
    }
    catch (e) {
        if (!existsSync(file))
            throw e;
    }
    return readFileSync(file, 'utf8');
}
const rawTax = Number(process.env.TAX_RATE || 0);
if (!Number.isFinite(rawTax) || rawTax < 0 || rawTax > 1)
    throw new Error('TAX_RATE must be a decimal fraction between 0 and 1');
export const env = { apiKey: process.env.ANTHROPIC_API_KEY || '', model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5', sessionSecret: secret(), reverseKey: process.env.OPTIONAL_REVERSE_IMAGE_API_KEY || '', taxRate: rawTax };
console.info(`[YUGANTAR] AI: ${env.apiKey ? 'configured (fallback on service failure)' : 'fallback'}; sessions: ${process.env.SESSION_SECRET ? 'configured' : 'local generated secret'}; reverse search: not implemented.`);
````

src/lib/filters.ts

````typescript
import type { PublicCreator } from '@/types';
export function filterCreators(creators: PublicCreator[], p: URLSearchParams): PublicCreator[] {
    return creators.filter(c => {
        const q = (p.get('q') || '').toLowerCase();
        return (!q || [c.alias, c.headline, c.bio, ...c.skills, ...c.tools, ...c.specialization].join(' ').toLowerCase().includes(q)) && ['skills', 'tools', 'specialization', 'contentTypes'].every(k => !p.get(k) || (c[k as 'skills' | 'tools' | 'specialization' | 'contentTypes'] as string[]).some(v => v.toLowerCase().includes(p.get(k)!.toLowerCase()))) && (!p.get('verified') || c.badges[p.get('verified') as keyof typeof c.badges]) && (!p.get('min') || c.rate >= Number(p.get('min')) * 100) && (!p.get('max') || c.rate <= Number(p.get('max')) * 100);
    });
}
````

src/lib/format.ts

````typescript
export const money = (minor: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(minor / 100);
export const date = (iso: string) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
export function parseMoney(input: unknown): number {
    const value = String(input ?? '');
    if (!/^\d{1,8}(\.\d{1,2})?$/.test(value))
        throw new Error('Enter a positive amount with up to two decimal places');
    const [whole, fraction = ''] = value.split('.');
    return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}
export const moneyInput = (minor: number) => `${Math.floor(minor / 100)}.${String(minor % 100).padStart(2, '0')}`;
````

src/lib/http.ts

````typescript
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
````

src/lib/leakGuard.ts

````typescript
const patterns = [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, /(?:https?:\/\/|www\.)[^\s]+/gi, /\b(?:[a-z0-9-]+\.)+(?:com|net|org|io|co|in|ai|me)\b[^\s]*/gi, /@[a-z0-9_.]+/gi, /(?<!\w)\+?\d[\d\s().-]{7,}\d(?!\w)/g, /\b(?:whatsapp\s+me|dm\s+me(?:\s+on\s+(?:insta(?:gram)?|twitter|telegram))?|call\s+me|contact\s+me\s+on)\b/gi];
export function maskLeaks(value: string): {
    text: string;
    blocked: boolean;
} { let text = value; for (const pattern of patterns)
    text = text.replace(pattern, '[hidden by YUGANTAR]'); return { text, blocked: text !== value }; }
export function cleanText(value: string): string { if (maskLeaks(value).blocked)
    throw new Error('Please remove contact details; YUGANTAR keeps identities private'); return value.trim(); }
````

src/lib/matching.ts

````typescript
import type { Brief, PublicCreator, Match } from '@/types';
export function rankCreators(brief: Brief, creators: PublicCreator[]): Match[] {
    return creators.map(creator => {
        const covers = (wanted: string[], actual: string[]) => wanted.filter(w => actual.some(a => a.toLowerCase() === w.toLowerCase())).length;
        const tools = covers(brief.requiredTools, creator.tools), skills = covers(brief.requiredSkills, creator.skills), content = creator.contentTypes.includes(brief.contentType), budget = creator.rate <= brief.budget, days = Math.max(0, Math.ceil((Date.parse(brief.deadline) - Date.now()) / 86400000)), turnaround = creator.turnaroundDays <= days, commercial = !brief.commercialUse || creator.portfolio.every(p => p.workflow.license === 'commercial-safe');
        const score = Math.round(25 * (brief.requiredTools.length ? tools / brief.requiredTools.length : 1) + 25 * (brief.requiredSkills.length ? skills / brief.requiredSkills.length : 1) + 20 * Number(content) + 10 * Number(budget) + 10 * Number(turnaround) + 10 * Number(commercial));
        return { creator, score, reasons: [`Tools covered ${tools} of ${brief.requiredTools.length}`, `Skills covered ${skills} of ${brief.requiredSkills.length}`, content ? 'Content type covered' : 'Different content type', budget ? 'Within your budget' : 'Rate exceeds budget', turnaround ? 'Turnaround fits deadline' : 'Deadline may be too short', commercial ? 'Commercial-use compatible' : 'Non-commercial work in portfolio'], conflicts: [...(!commercial ? ['Non-commercial model or license in portfolio'] : []), ...(!turnaround ? ['Turnaround conflict'] : [])] };
    }).sort((a, b) => b.score - a.score);
}
````

src/lib/pageAuth.ts

````typescript
import { redirect } from 'next/navigation';
import { getSession } from './auth';
import type { Role } from '@/types';
export async function pageUser(role?: Role) { const u = await getSession(); if (!u)
    redirect('/login'); if (role && u.role !== role)
    redirect(`/${u.role}/dashboard`); return u; }
````

src/lib/plagiarism.ts

````typescript
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { env } from './env';
import { advisory } from './ai';
import type { PortfolioItem, PlagiarismCheck } from '@/types';
export function hamming(a: string, b: string): number { let n = BigInt(`0x${a}`) ^ BigInt(`0x${b}`), distance = 0; while (n) {
    distance += Number(n & 1n);
    n >>= 1n;
} return distance; }
function shingles(s: string): Set<string> { const words = s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(Boolean); return new Set(words.length < 3 ? words : words.slice(0, -2).map((_, i) => words.slice(i, i + 3).join(' '))); }
export function similarity(a: string, b: string): number { const x = shingles(a), y = shingles(b), union = new Set([...x, ...y]); return union.size ? [...x].filter(s => y.has(s)).length / union.size : 0; }
export async function reverseImageSearch(): Promise<string> { return env.reverseKey ? 'Key supplied; provider integration not implemented' : 'not configured'; }
export async function checkPlagiarism(file: Buffer | undefined, isImage: boolean, title: string, description: string, items: PortfolioItem[]): Promise<PlagiarismCheck> {
    const checks: string[] = [];
    let blocked = false, review = false, sha256: string | undefined, dhash: string | undefined;
    if (file) {
        sha256 = createHash('sha256').update(file).digest('hex');
        blocked = items.some(i => i.plagiarism.sha256 === sha256);
        checks.push(blocked ? 'Exact SHA-256 duplicate found within YUGANTAR' : 'Exact SHA-256: no duplicate within YUGANTAR');
    }
    else
        checks.push('Exact duplicate: skipped for media URL (remote file not fetched)');
    if (file && isImage) {
        try {
            const { data } = await sharp(file, { limitInputPixels: 25000000 }).rotate().resize(9, 8, { fit: 'fill' }).grayscale().raw().toBuffer({ resolveWithObject: true });
            let hash = 0n;
            for (let y = 0; y < 8; y++)
                for (let x = 0; x < 8; x++)
                    hash = (hash << 1n) | BigInt(data[y * 9 + x] > data[y * 9 + x + 1] ? 1 : 0);
            dhash = hash.toString(16).padStart(16, '0');
            review = items.some(i => i.plagiarism.dhash && hamming(dhash!, i.plagiarism.dhash) <= 10);
            checks.push(review ? 'Near-duplicate dHash within distance 10 found' : '64-bit dHash: no near-duplicate within distance 10');
        }
        catch {
            review = true;
            checks.push('Image could not be decoded; manual review needed');
        }
    }
    else
        checks.push('Near-duplicate images: skipped (no uploaded image)');
    const similar = items.some(i => similarity(`${title} ${description}`, `${i.title} ${i.description}`) > .8);
    review ||= similar;
    checks.push(similar ? 'Text shingles: similarity above 0.8' : 'Text shingles: no similarity above 0.8');
    const note = await advisory(title, description);
    if (note)
        checks.push('AI review (advisory): title and metadata only');
    checks.push('Scope: platform duplicates and basic risk, not the whole internet');
    return { status: blocked ? 'Blocked (duplicate)' : review ? 'Needs review' : 'Original', checks, advisory: note, sha256, dhash };
}
````

src/lib/privacy.ts

````typescript
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
````

src/lib/sanitize.ts

````typescript
import type { Database, User, PublicCreator, Engagement, SessionUser, Brief, Invoice, PayoutStatement } from '@/types';
import { maskLeaks } from './leakGuard';
import { sanitizeResponse } from './privacy';
export { sanitizeResponse } from './privacy';
const safe = (s: string) => maskLeaks(s).text;
export function publicCreator(u: User, db: Database): PublicCreator {
    const portfolio = db.portfolio.filter(p => p.creatorId === u.id && p.plagiarism.status !== 'Blocked (duplicate)').map(p => ({ ...p, title: safe(p.title), description: safe(p.description), workflow: { ...p.workflow, model: safe(p.workflow.model), seed: safe(p.workflow.seed), sampler: safe(p.workflow.sampler), cfg: safe(p.workflow.cfg), loras: safe(p.workflow.loras), controlNets: safe(p.workflow.controlNets), promptStructure: safe(p.workflow.promptStructure), modelSource: safe(p.workflow.modelSource) } }));
    const result: PublicCreator = { id: u.id, alias: u.alias, avatarColor: u.avatarColor, headline: safe(u.headline), bio: safe(u.bio), specialization: u.specialization.map(safe), skills: u.skills.map(safe), tools: u.tools.map(safe), contentTypes: u.contentTypes, rate: u.rate, turnaroundDays: u.turnaroundDays, portfolio, badges: { tools: u.tools.length > 0 && portfolio.length > 0 && u.tools.every(t => portfolio.some(p => p.toolsUsed.includes(t))), workflow: portfolio.some(p => Object.values(p.workflow).every(v => v.trim().length > 0)), pastWork: db.engagements.some(e => e.creatorId === u.id && e.status === 'Delivered') } };
    return sanitizeResponse(result, db) as PublicCreator;
}
export function publicBrief(b: Brief): Brief { return { ...b, title: safe(b.title), description: safe(b.description) }; }
export function publicEngagement(e: Engagement, db: Database, user: SessionUser) { const creator = db.users.find(u => u.id === e.creatorId)!, brand = db.users.find(u => u.id === e.brandId)!; return { ...e, message: safe(e.message), creatorAlias: creator.alias, companyName: e.status === 'Invited' ? 'Brand on YUGANTAR' : safe(brand.companyName), brief: publicBrief(db.briefs.find(b => b.id === e.briefId)!), invoiceId: user.role === 'brand' ? db.invoices.find(i => i.engagementId === e.id)?.id : undefined, payoutId: user.role === 'creator' ? db.payoutStatements.find(i => i.engagementId === e.id)?.id : undefined }; }
export function invoiceData(i: Invoice): Invoice { return { ...i, companyName: safe(i.companyName), creatorAlias: safe(i.creatorAlias), briefTitle: safe(i.briefTitle) }; }
export function payoutData(p: PayoutStatement): PayoutStatement { return { ...p, companyName: safe(p.companyName), briefTitle: safe(p.briefTitle) }; }
````

src/lib/service.ts

````typescript
import { NextRequest } from 'next/server';
import { randomUUID, randomInt } from 'node:crypto';
import { readDb, mutateDb } from './db';
import { hashPassword, verifyPassword, setSession, logout, getSession } from './auth';
import { requireUser, requireOwner, body, text, list, HttpError } from './http';
import { cleanText, maskLeaks } from './leakGuard';
import { publicCreator, publicBrief, publicEngagement, invoiceData, payoutData } from './sanitize';
import { filterCreators } from './filters';
import { rankCreators } from './matching';
import { parseMoney } from './format';
import { calculateTotals } from './billing';
import { buildBrief } from './ai';
import { env } from './env';
import { upload } from './uploads';
import { checkPlagiarism } from './plagiarism';
import type { User, Brief, ContentType, Workflow, Database, Engagement } from '@/types';
const content = (v: unknown): ContentType => { if (!['image', 'video', 'audio', 'animation'].includes(String(v)))
    throw new Error('Invalid content type'); return v as ContentType; };
const safeList = (v: unknown) => list(v).map(cleanText);
function getEngagement(db: Database, id: string, userId: string): Engagement { const e = db.engagements.find(e => e.id === id); if (!e)
    throw new HttpError(404, 'Engagement not found'); requireOwner(e.brandId === userId || e.creatorId === userId); return e; }
function validateBrief(b: Record<string, unknown>, brandId: string): Brief { const deadline = text(b, 'deadline', 10); if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline) || !Number.isFinite(Date.parse(deadline)) || Date.parse(deadline) < Date.now() - 86400000)
    throw new Error('Choose a current or future deadline'); const ratio = text(b, 'aspectRatio', 10); if (!['9:16', '16:9', '1:1', '4:5'].includes(ratio))
    throw new Error('Invalid aspect ratio'); const budget = parseMoney(b.budget); if (budget <= 0)
    throw new Error('Budget must be positive'); return { id: randomUUID(), brandId, title: cleanText(text(b, 'title', 120)), description: cleanText(text(b, 'description')), contentType: content(b.contentType), style: cleanText(text(b, 'style', 120)), aspectRatio: ratio, requiredTools: safeList(b.requiredTools), requiredSkills: safeList(b.requiredSkills), budget, deadline, commercialUse: b.commercialUse === true, platforms: cleanText(text(b, 'platforms', 200)), duration: cleanText(text(b, 'duration', 100)), territory: cleanText(text(b, 'territory', 100)), exclusivity: b.exclusivity === true, shortlist: [], status: 'Open' }; }
export async function handle(req: NextRequest, segments: string[]): Promise<unknown> {
    const [resource, id, action] = segments, method = req.method;
    if (resource === 'health' && method === 'GET')
        return { ai: env.apiKey ? 'live' : 'fallback', aiNote: env.apiKey ? 'Configured; service errors use fallback' : 'Built-in fallback', payments: 'simulated', reverseSearch: 'not configured' };
    if (resource === 'auth') {
        if (id === 'me' && method === 'GET')
            return await getSession();
        if (id === 'logout' && method === 'POST') {
            await logout();
            return { loggedOut: true };
        }
        if (id === 'login' && method === 'POST') {
            const b = await body(req), email = text(b, 'email', 254).toLowerCase(), password = text(b, 'password', 128);
            const u = await readDb(db => db.users.find(u => u.email === email));
            if (!u || !verifyPassword(password, u.passwordHash))
                throw new HttpError(401, 'Invalid email or password');
            await setSession(u);
            return { id: u.id, role: u.role, alias: u.alias };
        }
        if (id === 'signup' && method === 'POST') {
            const b = await body(req), email = text(b, 'email', 254).toLowerCase(), password = text(b, 'password', 128);
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8)
                throw new Error('Use a valid email and a password of at least 8 characters');
            if (!['creator', 'brand'].includes(String(b.role)))
                throw new Error('Invalid role');
            const u = await mutateDb(db => { if (db.users.some(u => u.email === email))
                throw new Error('Email already registered'); let alias = ''; do {
                alias = `${b.role === 'creator' ? 'Creator' : 'Brand'} YG-${randomInt(1000, 1000000)}`;
            } while (db.users.some(u => u.alias === alias)); const user: User = { id: randomUUID(), role: b.role as 'brand' | 'creator', email, passwordHash: hashPassword(password), realName: text(b, 'realName', 120), phone: text(b, 'phone', 30), alias, avatarColor: '#6373ed', companyName: b.role === 'brand' ? cleanText(text(b, 'companyName', 120)) : '', industry: b.role === 'brand' ? cleanText(text(b, 'industry', 120)) : '', headline: '', bio: '', specialization: [], skills: [], tools: [], contentTypes: [], rate: 100000, turnaroundDays: 7 }; db.users.push(user); return user; });
            await setSession(u);
            return { id: u.id, role: u.role, alias: u.alias };
        }
    }
    if (resource === 'creators' && method === 'GET')
        return readDb(db => { const all = db.users.filter(u => u.role === 'creator').map(u => publicCreator(u, db)); if (id) {
            const c = all.find(c => c.alias === id || c.id === id);
            if (!c)
                throw new HttpError(404, 'Creator not found');
            return c;
        } const results = filterCreators(all, req.nextUrl.searchParams); return { creators: results, count: results.length, alternatives: results.length ? [] : all.slice(0, 3) }; });
    if (resource === 'profile') {
        const user = await requireUser();
        if (method === 'GET')
            return readDb(db => { const u = db.users.find(u => u.id === user.id)!; return user.role === 'creator' ? publicCreator(u, db) : { companyName: maskLeaks(u.companyName).text, industry: maskLeaks(u.industry).text }; });
        if (method === 'POST') {
            const b = await body(req);
            return mutateDb(db => { const u = db.users.find(u => u.id === user.id)!; if (user.role === 'brand') {
                u.companyName = cleanText(text(b, 'companyName', 120));
                u.industry = cleanText(text(b, 'industry', 120));
                return { companyName: u.companyName, industry: u.industry };
            } u.headline = cleanText(text(b, 'headline', 160)); u.bio = cleanText(text(b, 'bio')); u.skills = safeList(b.skills); u.tools = safeList(b.tools); u.specialization = safeList(b.specialization); u.contentTypes = list(b.contentTypes).map(content); u.rate = parseMoney(b.rate); const days = Number(b.turnaroundDays); if (!Number.isInteger(days) || days < 1 || days > 365)
                throw new Error('Turnaround must be 1–365 days'); u.turnaroundDays = days; return publicCreator(u, db); });
        }
    }
    if ((resource === 'portfolio' || resource === 'plagiarism') && method === 'POST') {
        const user = await requireUser('creator'), form = await req.formData();
        const b = Object.fromEntries(form.entries()) as Record<string, unknown>;
        const title = cleanText(text(b, 'title', 120)), description = cleanText(text(b, 'description'));
        const uploaded = await upload(form);
        const fields = ['model', 'seed', 'sampler', 'cfg', 'loras', 'controlNets', 'promptStructure', 'modelSource'] as const;
        const workflow = {} as Workflow;
        for (const field of fields)
            workflow[field] = cleanText(text(b, field, 1000, true));
        if (!['commercial-safe', 'non-commercial'].includes(String(b.license)))
            throw new Error('Select a license');
        workflow.license = b.license as Workflow['license'];
        const toolsUsed = safeList(b.toolsUsed), ct = content(b.contentType);
        if (uploaded.buffer && uploaded.isImage && ct !== 'image' && ct !== 'animation')
            throw new Error('Image file requires image or animation content type');
        const note = await checkPlagiarism(uploaded.buffer, uploaded.isImage, title, description, await readDb(db => db.portfolio));
        if (resource === 'plagiarism')
            return note;
        return mutateDb(async (db) => { let plagiarism = note; if (uploaded.buffer && db.portfolio.some(p => p.plagiarism.sha256 === note.sha256))
            plagiarism = { ...note, status: 'Blocked (duplicate)', checks: [...note.checks, 'Duplicate found during publishing check'] }; if (plagiarism.status === 'Blocked (duplicate)')
            return { published: false, plagiarism }; const item = { id: randomUUID(), creatorId: user.id, title, description, contentType: ct, mediaUrl: uploaded.mediaUrl, toolsUsed, workflow, plagiarism }; db.portfolio.push(item); return { published: true, item, plagiarism }; });
    }
    if (resource === 'brief-builder' && method === 'POST') {
        await requireUser('brand');
        return buildBrief(text(await body(req), 'idea', 4000));
    }
    if (resource === 'briefs') {
        const user = await requireUser('brand');
        if (method === 'GET')
            return readDb(db => { const briefs = db.briefs.filter(b => b.brandId === user.id).map(publicBrief); if (!id)
                return briefs; const brief = briefs.find(b => b.id === id); if (!brief)
                throw new HttpError(403, 'Forbidden'); return brief; });
        if (method === 'POST') {
            const b = await body(req);
            return mutateDb(db => { if (id && action === 'shortlist') {
                const brief = db.briefs.find(x => x.id === id);
                requireOwner(brief?.brandId === user.id);
                const creatorId = text(b, 'creatorId', 100);
                if (!db.users.some(u => u.id === creatorId && u.role === 'creator'))
                    throw new Error('Creator not found');
                if (!brief!.shortlist.includes(creatorId))
                    brief!.shortlist.push(creatorId);
                if (brief!.status === 'Open')
                    brief!.status = 'Shortlisted';
                return publicBrief(brief!);
            } const brief = validateBrief(b, user.id); db.briefs.push(brief); return publicBrief(brief); });
        }
    }
    if (resource === 'match' && method === 'GET') {
        const user = await requireUser('brand');
        return readDb(db => { const brief = db.briefs.find(b => b.id === id); requireOwner(brief?.brandId === user.id); return rankCreators(brief!, db.users.filter(u => u.role === 'creator').map(u => publicCreator(u, db))); });
    }
    if (resource === 'invites' && method === 'POST') {
        const user = await requireUser('brand'), b = await body(req);
        return mutateDb(db => { const brief = db.briefs.find(x => x.id === text(b, 'briefId', 100)); requireOwner(brief?.brandId === user.id); if (brief!.status === 'Delivered')
            throw new Error('Brief already delivered'); const creatorId = text(b, 'creatorId', 100); if (!db.users.some(u => u.id === creatorId && u.role === 'creator'))
            throw new Error('Creator not found'); if (db.engagements.some(e => e.briefId === brief!.id && e.creatorId === creatorId && e.status !== 'Declined'))
            throw new Error('This creator is already invited'); const e: Engagement = { id: randomUUID(), brandId: user.id, creatorId, briefId: brief!.id, message: cleanText(text(b, 'message', 1000)), status: 'Invited', deliveries: [], createdAt: new Date().toISOString() }; db.engagements.push(e); return publicEngagement(e, db, user); });
    }
    if (resource === 'dashboard' && method === 'GET') {
        const user = await requireUser();
        return readDb(db => ({ user: { id: user.id, role: user.role, alias: user.alias }, engagements: db.engagements.filter(e => e.brandId === user.id || e.creatorId === user.id).map(e => publicEngagement(e, db, user)), briefs: user.role === 'brand' ? db.briefs.filter(b => b.brandId === user.id).map(publicBrief) : [], billing: user.role === 'brand' ? db.invoices.filter(i => i.brandId === user.id).map(invoiceData) : db.payoutStatements.filter(i => i.creatorId === user.id).map(payoutData), earnings: user.role === 'creator' ? db.payoutStatements.filter(p => p.creatorId === user.id).reduce((sum, p) => sum + p.net, 0) : 0 }));
    }
    if (resource === 'engagements') {
        const user = await requireUser();
        if (method === 'GET')
            return readDb(db => publicEngagement(getEngagement(db, id, user.id), db, user));
        if (method === 'POST') {
            const b = await body(req);
            return mutateDb(db => { const e = getEngagement(db, id, user.id), operation = text(b, 'action', 30); if (operation === 'accept' || operation === 'decline') {
                requireOwner(user.role === 'creator' && e.creatorId === user.id);
                if (e.status !== 'Invited')
                    throw new Error('Invite already handled');
                e.status = operation === 'accept' ? 'In Progress' : 'Declined';
                if (operation === 'accept') {
                    const brief = db.briefs.find(b => b.id === e.briefId)!;
                    const totals = calculateTotals(brief.budget);
                    e.contract = { id: randomUUID(), engagementId: e.id, price: brief.budget, platformFee: totals.platformFee, creatorPayout: totals.creatorPayout, createdAt: new Date().toISOString() };
                    brief.status = 'In Progress';
                }
            }
            else if (operation === 'approve' || operation === 'revision') {
                requireOwner(user.role === 'brand' && e.brandId === user.id);
                if (!['In Progress', 'Revision'].includes(e.status) || !e.deliveries.length)
                    throw new Error('Delivery required before review');
                e.status = operation === 'approve' ? 'Approved' : 'Revision';
                if (operation === 'revision')
                    db.briefs.find(b => b.id === e.briefId)!.status = 'Revision';
            }
            else
                throw new Error('Invalid action'); return publicEngagement(e, db, user); });
        }
    }
    if (resource === 'deliveries' && method === 'POST') {
        const user = await requireUser('creator');
        await readDb(db => { const e = getEngagement(db, id, user.id); requireOwner(e.creatorId === user.id); if (!['In Progress', 'Revision'].includes(e.status))
            throw new Error('Engagement cannot receive deliveries'); });
        const form = await req.formData(), title = cleanText(String(form.get('title') || 'Delivery'));
        if (!title || title.length > 120)
            throw new Error('Invalid delivery title');
        const uploaded = await upload(form);
        return mutateDb(db => { const e = getEngagement(db, id, user.id); if (!['In Progress', 'Revision'].includes(e.status))
            throw new Error('Engagement cannot receive deliveries'); e.deliveries.push({ id: randomUUID(), title, mediaUrl: uploaded.mediaUrl, createdAt: new Date().toISOString() }); e.status = 'In Progress'; db.briefs.find(b => b.id === e.briefId)!.status = 'In Progress'; return publicEngagement(e, db, user); });
    }
    if (resource === 'messages') {
        const user = await requireUser();
        if (method === 'GET')
            return readDb(db => { const e = getEngagement(db, id, user.id); if (['Invited', 'Declined'].includes(e.status))
                throw new HttpError(403, 'Chat opens after acceptance'); return db.messages.filter(m => m.engagementId === id).map(m => ({ id: m.id, text: maskLeaks(m.text).text, createdAt: m.createdAt, senderAlias: m.senderId === e.creatorId ? db.users.find(u => u.id === e.creatorId)!.alias : maskLeaks(db.users.find(u => u.id === e.brandId)!.companyName).text, mine: m.senderId === user.id })); });
        if (method === 'POST') {
            const b = await body(req), result = maskLeaks(text(b, 'text', 3000));
            return mutateDb(db => { const e = getEngagement(db, id, user.id); if (['Invited', 'Declined'].includes(e.status))
                throw new HttpError(403, 'Chat opens after acceptance'); db.messages.push({ id: randomUUID(), engagementId: id, senderId: user.id, text: result.text, createdAt: new Date().toISOString() }); if (result.blocked)
                db.blockedAttempts.push({ userId: user.id, createdAt: new Date().toISOString(), kind: 'chat contact leak' }); return { warning: result.blocked ? 'Contact details were hidden by YUGANTAR.' : '' }; });
        }
    }
    throw new HttpError(404, 'Route not found');
}
````

src/lib/uploads.ts

````typescript
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
const types: Record<string, string> = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif', 'video/mp4': '.mp4', 'video/webm': '.webm', 'audio/mpeg': '.mp3', 'audio/wav': '.wav', 'audio/ogg': '.ogg' };
export async function upload(form: FormData): Promise<{
    buffer?: Buffer;
    isImage: boolean;
    mediaUrl: string;
}> { const file = form.get('file'); if (file instanceof File && file.size) {
    if (file.size > 20 * 1024 * 1024)
        throw new Error('File limit is 20 MB');
    const extension = types[file.type];
    if (!extension)
        throw new Error('Use PNG, JPG, WebP, GIF, MP4, WebM, MP3, WAV or OGG');
    const buffer = Buffer.from(await file.arrayBuffer());
    if (file.type.startsWith('image/') && !((buffer[0] === 0xff && buffer[1] === 0xd8) || (buffer[0] === 0x89 && buffer.subarray(1, 4).toString() === 'PNG') || buffer.subarray(0, 4).toString() === 'RIFF' || buffer.subarray(0, 3).toString() === 'GIF'))
        throw new Error('File does not match its image type');
    const dir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(dir, { recursive: true });
    const name = randomUUID() + extension;
    await fs.writeFile(path.join(dir, name), buffer);
    return { buffer, isImage: file.type.startsWith('image/'), mediaUrl: `/uploads/${name}` };
} const raw = String(form.get('mediaUrl') || ''); const url = new URL(raw); if (url.protocol !== 'https:' || url.username || url.password)
    throw new Error('Use an HTTPS media URL without credentials'); return { isImage: false, mediaUrl: url.href }; }
````

src/data/seed.ts

````typescript
import { hashPassword } from '@/lib/auth';
import { calculateTotals, createInvoiceAndStatement } from '@/lib/billing';
import type { Database, User, ContentType } from '@/types';
export function createSeed(): Database {
    const db: Database = { users: [], portfolio: [], briefs: [], engagements: [], messages: [], payments: [], invoices: [], payoutStatements: [], counters: {}, blockedAttempts: [] };
    const pairs = [['Midjourney', 'Art direction'], ['Runway', 'Video editing'], ['ElevenLabs', 'Voice design'], ['ComfyUI', 'Product imagery'], ['Suno', 'Music'], ['Kling', 'Animation'], ['Pika', 'Storytelling'], ['Stable Diffusion', 'Illustration'], ['HeyGen', 'Avatars'], ['AnimateDiff', 'Motion design']];
    const types: ContentType[] = ['image', 'video', 'audio', 'image', 'audio', 'animation', 'video', 'image', 'video', 'animation'];
    const passwordHash = hashPassword('Demo123!');
    for (let i = 0; i < 10; i++) {
        const [tool, skill] = pairs[i];
        const u: User = { id: `creator-${i + 1}`, role: 'creator', realName: `Private Creator ${i + 1}`, email: `creator${i + 1}@demo.local`, phone: `90000000${String(i).padStart(2, '0')}`, passwordHash, alias: `Creator YG-${4821 + i}`, avatarColor: ['#6373ed', '#ac6ee5', '#289b89', '#df9852'][i % 4], companyName: '', industry: '', headline: `${skill} with ${tool}`, bio: 'Distinctive AI content, crafted with a documented creative process.', specialization: [i % 2 ? 'Advertising' : 'Product'], skills: [skill, 'Creative direction'], tools: [tool], contentTypes: [types[i]], rate: 100000 + i * 20000, turnaroundDays: 3 + i % 4 };
        db.users.push(u);
        db.portfolio.push({ id: `portfolio-${i + 1}`, creatorId: u.id, title: `Studio study ${i + 1}`, description: 'An original concept exploring colour, composition and storytelling.', contentType: 'image', mediaUrl: `/samples/study-${i % 4 + 1}.svg`, toolsUsed: [tool], workflow: { model: 'Studio demo model', seed: String(1200 + i), sampler: 'Euler', cfg: '7', loras: 'None', controlNets: 'None', promptStructure: 'Subject, setting, lighting, composition', license: i === 7 ? 'non-commercial' : 'commercial-safe', modelSource: 'Local demo workflow' }, plagiarism: { status: 'Original', checks: ['Seeded demonstration: no uploaded file was checked.'] } });
    }
    for (let i = 0; i < 4; i++)
        db.users.push({ id: `brand-${i + 1}`, role: 'brand', realName: `Private Brand Contact ${i + 1}`, email: `brand${i + 1}@demo.local`, phone: '9111111111', passwordHash, alias: `Brand YG-${8001 + i}`, avatarColor: '#6373ed', companyName: ['Orbit Studio', 'Moss & Co', 'Nova Goods', 'Echo Agency'][i], industry: ['Retail', 'Lifestyle', 'Technology', 'Agency'][i], headline: '', bio: '', specialization: [], skills: [], tools: [], contentTypes: [], rate: 0, turnaroundDays: 0 });
    for (let i = 0; i < 6; i++)
        db.briefs.push({ id: `brief-${i + 1}`, brandId: `brand-${i % 4 + 1}`, title: ['Launch campaign visuals', 'A cinematic product story', 'A new sonic identity', 'Seasonal product collection', 'Social launch series', 'Animated explainer'][i], description: 'Create memorable AI content for a fresh product campaign with a clear creative direction.', contentType: types[i], style: 'Modern, warm, editorial', aspectRatio: '9:16', requiredTools: [pairs[i][0]], requiredSkills: [pairs[i][1]], budget: 100000 + i * 25000, deadline: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10), commercialUse: true, platforms: 'Social and website', duration: '12 months', territory: 'Worldwide', exclusivity: false, shortlist: [], status: 'Open' });
    for (let i = 0; i < 2; i++) {
        const totals = calculateTotals(100000);
        const e = { id: `engagement-${i + 1}`, brandId: `brand-${i + 1}`, creatorId: `creator-${i + 1}`, briefId: `brief-${i + 1}`, message: 'We would love to collaborate on this campaign.', status: 'Approved' as const, createdAt: new Date().toISOString(), deliveries: [{ id: `delivery-${i + 1}`, title: 'Final campaign', mediaUrl: `/samples/study-${i + 1}.svg`, createdAt: new Date().toISOString() }], contract: { id: `contract-${i + 1}`, engagementId: `engagement-${i + 1}`, price: 100000, platformFee: totals.platformFee, creatorPayout: totals.creatorPayout, createdAt: new Date().toISOString() } };
        db.engagements.push(e);
        createInvoiceAndStatement(db, e);
        db.messages.push({ id: `message-${i + 1}`, engagementId: e.id, senderId: e.creatorId, text: 'Your campaign delivery is ready. Thanks for collaborating!', createdAt: new Date().toISOString() });
    }
    return db;
}
````

src/app/api/[...path]/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Explicit response projections expose public creator fields and role-owned records; private auth fields are never returned.
async function route(req: NextRequest, { params }: {
    params: Promise<{
        path: string[];
    }>;
}) { const resolved = await params; return api(req, () => handle(req, resolved.path)); }
export const GET = route;
export const POST = route;
````

src/app/api/auth/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['auth'])); }
export const GET = route;
export const POST = route;
````

src/app/api/brief-builder/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['brief-builder'])); }
export const GET = route;
export const POST = route;
````

src/app/api/briefs/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['briefs'])); }
export const GET = route;
export const POST = route;
````

src/app/api/creators/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['creators'])); }
export const GET = route;
export const POST = route;
````

src/app/api/document-access/[id]/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api, requireUser, requireOwner, HttpError } from '@/lib/http';
import { readDb } from '@/lib/db';
export const dynamic = 'force-dynamic';
// Access-check response exposes only permission, never document contents.
export async function GET(req: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}) { const resolved = await params; return api(req, async () => { const u = await requireUser(), kind = req.nextUrl.searchParams.get('kind'); return readDb(db => { const e = db.engagements.find(e => e.id === resolved.id); if (!e)
    throw new HttpError(404, 'Engagement not found'); if (kind === 'invoice')
    requireOwner(u.role === 'brand' && e.brandId === u.id);
else if (kind === 'payout')
    requireOwner(u.role === 'creator' && e.creatorId === u.id);
else
    throw new Error('Invalid document kind'); return { allowed: true }; }); }); }
````

src/app/api/engagements/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['engagements'])); }
export const GET = route;
export const POST = route;
````

src/app/api/health/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['health'])); }
export const GET = route;
export const POST = route;
````

src/app/api/invites/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['invites'])); }
export const GET = route;
export const POST = route;
````

src/app/api/invoices/[id]/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api, requireUser, requireOwner, HttpError } from '@/lib/http';
import { readDb } from '@/lib/db';
import { invoiceData } from '@/lib/sanitize';
export const dynamic = 'force-dynamic';
// Invoice allow-list contains company name and creator alias, with no personal contact fields.
export async function GET(req: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}) { const resolved = await params; return api(req, async () => { const user = await requireUser(); return readDb(db => { const invoice = db.invoices.find(i => i.id === resolved.id); if (!invoice)
    throw new HttpError(404, 'Invoice not found'); requireOwner(user.role === 'brand' && invoice.brandId === user.id); return invoiceData(invoice); }); }); }
````

src/app/api/match/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['match'])); }
export const GET = route;
export const POST = route;
````

src/app/api/messages/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['messages'])); }
export const GET = route;
export const POST = route;
````

src/app/api/payments/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api, body, text, requireUser, requireOwner, HttpError } from '@/lib/http';
import { mutateDb } from '@/lib/db';
import { createInvoiceAndStatement } from '@/lib/billing';
import { invoiceData } from '@/lib/sanitize';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Brand receives its sanitized invoice only; payout data is never sent to a brand.
export function POST(req: NextRequest) { return api(req, async () => { const user = await requireUser('brand'), b = await body(req), id = text(b, 'engagementId', 100); return mutateDb(db => { const e = db.engagements.find(e => e.id === id); if (!e)
    throw new HttpError(404, 'Engagement not found'); requireOwner(e.brandId === user.id); const existing = db.invoices.find(i => i.engagementId === id); if (existing)
    return invoiceData(existing); if (e.status !== 'Approved' || !e.deliveries.length)
    throw new Error('Approve a delivery before paying'); return invoiceData(createInvoiceAndStatement(db, e).invoice); }); }); }
````

src/app/api/payouts/[id]/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api, requireUser, requireOwner, HttpError } from '@/lib/http';
import { readDb } from '@/lib/db';
import { payoutData } from '@/lib/sanitize';
export const dynamic = 'force-dynamic';
// Only the engagement's creator receives its payout projection.
export async function GET(req: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}) { const resolved = await params; return api(req, async () => { const user = await requireUser(); return readDb(db => { const payout = db.payoutStatements.find(i => i.id === resolved.id); if (!payout)
    throw new HttpError(404, 'Statement not found'); requireOwner(user.role === 'creator' && payout.creatorId === user.id); return payoutData(payout); }); }); }
````

src/app/api/plagiarism/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['plagiarism'])); }
export const GET = route;
export const POST = route;
````

src/app/api/portfolio/route.ts

````typescript
import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['portfolio'])); }
export const GET = route;
export const POST = route;
````

src/components/AppViews.tsx

````tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SessionUser, PublicCreator, Brief, Engagement, Invoice, PayoutStatement, PortfolioItem, Match } from '@/types';
import { useData, request, errorText } from '@/lib/client';
import { money, moneyInput } from '@/lib/format';
import CreatorCard from './CreatorCard';
import BadgeRow from './BadgeRow';
import EmptyState from './EmptyState';
import FilterBar from './FilterBar';
import WorkflowModal from './WorkflowModal';
import MatchScoreCard from './MatchScoreCard';
import StatusStepper from './StatusStepper';
import ChatBox from './ChatBox';
import UploadForm from './UploadForm';
import BillingList from './BillingList';
import PayButton from './PayButton';
export function Heading({ label, title, text, action }: {
    label: string;
    title: string;
    text?: string;
    action?: React.ReactNode;
}) { return <div className="page-heading"><div><span className="eyebrow">{label}</span><h1>{title}</h1>{text && <p className="muted">{text}</p>}</div>{action}</div>; }
function State({ loading, error }: {
    loading: boolean;
    error: string;
}) { return loading ? <div className="empty" role="status">Loading your workspace…</div> : error ? <div className="notice error" role="alert">{error} <Link href="/login">Go to login →</Link></div> : null; }
export function AuthView({ signup = false, initialRole = 'creator' }: {
    signup?: boolean;
    initialRole?: string;
}) { const [role, setRole] = useState(initialRole), [error, setError] = useState(''), [busy, setBusy] = useState(false), router = useRouter(); return <div className="auth-layout"><div className="auth-story"><span className="eyebrow">A NEW ERA OF CREATIVE COLLABORATION</span><h1>Your talent.<br />Their vision.<br /><em>One platform.</em></h1><p>Build something extraordinary, with privacy at the heart of every collaboration.</p><img src="/samples/study-1.svg" alt="Abstract creative artwork"/></div><div><Heading label="WELCOME TO YUGANTAR" title={signup ? 'Create your account' : 'Good to see you again'} text={signup ? 'Your public identity is an alias. Your contact details stay private.' : 'Log in to your creative workspace.'}/><form className="card stack" onSubmit={async (e) => { e.preventDefault(); const b = Object.fromEntries(new FormData(e.currentTarget)); setBusy(true); setError(''); try {
    const u = await request<SessionUser>(`/api/auth/${signup ? 'signup' : 'login'}`, { ...b, role });
    router.push(`/${u.role}/dashboard`);
    router.refresh();
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}>{signup && <><label>I am a<select value={role} onChange={e => setRole(e.target.value)}><option value="creator">Creator</option><option value="brand">Brand / agency</option></select></label><label>Real name (private)<input name="realName" required maxLength={120}/></label><label>Phone (private)<input name="phone" required maxLength={30}/></label>{role === 'brand' && <><label>Company name<input name="companyName" required maxLength={120}/></label><label>Industry<input name="industry" required maxLength={120}/></label></>}</>}<label>Email (private)<input name="email" type="email" required autoComplete="email"/></label><label>Password<input name="password" type="password" minLength={8} maxLength={128} required autoComplete={signup ? 'new-password' : 'current-password'}/></label>{error && <p className="error" role="alert">{error}</p>}<button className="button" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account →' : 'Log in →'}</button><p className="muted">{signup ? 'Already a member?' : 'New here?'} <Link href={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create an account'}</Link></p></form>{!signup && <div className="notice"><strong>Try a demo account</strong><p>Brand: brand1@demo.local<br />Creator: creator1@demo.local<br />Password: Demo123!</p><small>Also available: brand2–4 and creator2–10, with the same password.</small></div>}</div></div>; }
export function DiscoverView() { const [filters, setFilters] = useState<Record<string, string>>({}), query = new URLSearchParams(filters).toString(), { data, error, loading } = useData<{
    creators: PublicCreator[];
    count: number;
    alternatives: PublicCreator[];
}>(`/api/creators?${query}`); return <><Heading label="THE CREATIVE COMMUNITY" title="Find your next creative partner" text="Exceptional AI talent. Verified workflows. A shared ambition."/><FilterBar value={filters} onChange={setFilters}/><State loading={loading} error={error}/>{data && <><p className="result-count">{data.count} creators found <button className="link-button" onClick={() => setFilters({})}>Reset filters</button></p>{!data.count ? <><EmptyState message="No creators match these filters" clear={() => setFilters({})}/><h2>Creators to explore</h2><div className="grid creators">{data.alternatives.map(c => <CreatorCard key={c.id} creator={c}/>)}</div></> : <div className="grid creators">{data.creators.map(c => <CreatorCard key={c.id} creator={c}/>)}</div>}</>}</>; }
export function CreatorView({ alias }: {
    alias: string;
}) { const { data: c, error, loading } = useData<PublicCreator>(`/api/creators/${encodeURIComponent(alias)}`), [selected, setSelected] = useState<PortfolioItem | null>(null); return <><State loading={loading} error={error}/>{c && <><div className="profile-hero card"><span className="avatar large" style={{ background: c.avatarColor }}>YG</span><div><span className="eyebrow">INDEPENDENT AI CREATOR</span><h1>{c.alias}</h1><h3>{c.headline}</h3><p>{c.bio}</p><BadgeRow badges={c.badges}/></div><div><strong>{money(c.rate)}</strong><p className="muted">Starting rate · {c.turnaroundDays} day turnaround</p><Link className="button" href="/brand/briefs">Invite to a brief →</Link></div></div><div className="card"><h3>Creative toolkit</h3><div className="tags">{[...c.skills, ...c.tools, ...c.specialization, ...c.contentTypes].map((s, i) => <span className="tag" key={i}>{s}</span>)}</div></div><Heading label="SELECTED WORK" title="The portfolio" text="Open any piece to inspect its proof of workflow."/>{c.portfolio.length ? <div className="grid creators">{c.portfolio.map(p => <article className="card portfolio-card" key={p.id}><Media url={p.mediaUrl} type={p.contentType}/><div className="card-body"><h3>{p.title}</h3><p className="muted">{p.description}</p><span className="tag">{p.plagiarism.status === 'Needs review' ? 'Under review' : p.plagiarism.status}</span><button className="button secondary" onClick={() => setSelected(p)}>View workflow ↗</button></div></article>)}</div> : <EmptyState message="Portfolio coming soon"/>}{selected && <WorkflowModal item={selected} close={() => setSelected(null)}/>}</>}</>; }
export function Media({ url, type }: {
    url: string;
    type: string;
}) { return type === 'video' ? <video src={url} controls preload="metadata"/> : type === 'audio' ? <audio src={url} controls preload="metadata"/> : <img src={url} alt="Creative work" loading="lazy" referrerPolicy="no-referrer"/>; }
type Dashboard = {
    user: SessionUser;
    engagements: (Engagement & {
        creatorAlias: string;
        companyName: string;
        brief: Brief;
    })[];
    briefs: Brief[];
    billing: (Invoice | PayoutStatement)[];
    earnings: number;
};
export function DashboardView() { const { data, error, loading } = useData<Dashboard>('/api/dashboard'); return <><State loading={loading} error={error}/>{data && <><Heading label="YOUR WORKSPACE" title={data.user.role === 'brand' ? 'Let’s bring your next idea to life' : 'Your creative studio'} text={`Welcome back, ${data.user.alias}.`} action={<Link className="button" href={data.user.role === 'brand' ? '/brand/briefs/new' : '/creator/portfolio/new'}>{data.user.role === 'brand' ? '+ Create a brief' : '+ Add portfolio work'}</Link>}/><div className="grid stats"><div className="card"><span className="muted">Active collaborations</span><strong>{data.engagements.filter(e => !['Invited', 'Declined', 'Delivered'].includes(e.status)).length}</strong></div><div className="card"><span className="muted">{data.user.role === 'brand' ? 'Open briefs' : 'Incoming invitations'}</span><strong>{data.user.role === 'brand' ? data.briefs.filter(b => b.status === 'Open').length : data.engagements.filter(e => e.status === 'Invited').length}</strong></div><div className="card"><span className="muted">{data.user.role === 'brand' ? 'Paid documents' : 'Simulated earnings'}</span><strong>{data.user.role === 'brand' ? data.billing.length : money(data.earnings)}</strong></div></div><section className="card"><div className="row between"><h2>Collaborations & chats</h2><Link href={data.user.role === 'brand' ? '/brand/briefs' : '/creator/profile'}>{data.user.role === 'brand' ? 'View all briefs →' : 'Edit profile →'}</Link></div>{!data.engagements.length ? <EmptyState message="Your next collaboration starts here"/> : <div className="list">{data.engagements.map(e => <Link className="list-item" key={e.id} href={`/engagements/${e.id}`}><div><strong>{e.brief.title}</strong><p className="muted">{data.user.role === 'brand' ? e.creatorAlias : e.companyName}</p></div><span className="tag">{e.status}</span><span>Open workspace ↗</span></Link>)}</div>}</section><BillingList role={data.user.role} items={data.billing}/>{data.user.role === 'brand' && <BrandProfile />}</>}</>; }
function BrandProfile() { const { data, reload } = useData<{
    companyName: string;
    industry: string;
}>('/api/profile'), [message, setMessage] = useState(''); if (!data)
    return null; return <form className="card form-grid" onSubmit={async (e) => { e.preventDefault(); try {
    await request('/api/profile', Object.fromEntries(new FormData(e.currentTarget)));
    setMessage('Brand profile saved.');
    await reload();
}
catch (e) {
    setMessage(errorText(e));
} }}><h2 className="wide">Brand profile</h2><label>Company name<input name="companyName" defaultValue={data.companyName} required/></label><label>Industry<input name="industry" defaultValue={data.industry} required/></label><button className="button">Save profile</button><p role="status">{message}</p></form>; }
export function ProfileView() { const { data, error, loading } = useData<PublicCreator>('/api/profile'), [message, setMessage] = useState(''), [busy, setBusy] = useState(false); return <><Heading label="YOUR PUBLIC IDENTITY" title="Build your creator profile" text="Brands see your alias and your work. Keep contact details out of public fields."/><State loading={loading} error={error}/>{data && <form className="card form-grid" onSubmit={async (e) => { e.preventDefault(); setBusy(true); try {
    await request('/api/profile', Object.fromEntries(new FormData(e.currentTarget)));
    setMessage('Profile saved.');
}
catch (e) {
    setMessage(errorText(e));
}
finally {
    setBusy(false);
} }}><h2 className="wide">{data.alias}</h2><label className="wide">Headline<input name="headline" defaultValue={data.headline} required/></label><label className="wide">Bio<textarea name="bio" defaultValue={data.bio} required/></label>{[['skills', 'Skills', data.skills.join(', ')], ['tools', 'Tools', data.tools.join(', ')], ['specialization', 'Specializations', data.specialization.join(', ')], ['contentTypes', 'Content types', data.contentTypes.join(', ')], ['rate', 'Starting rate (₹)', moneyInput(data.rate)], ['turnaroundDays', 'Turnaround days', String(data.turnaroundDays)]].map(([name, label, value]) => <label key={name}>{label}<input name={name} defaultValue={value} required/></label>)}<p className="wide muted">Separate lists with commas. Tools can include ComfyUI, Runway, Midjourney, ElevenLabs, Suno, Pika, Kling, Stable Diffusion, AnimateDiff, Sora and HeyGen. Content types: image, video, audio, animation.</p><button disabled={busy} className="button">{busy ? 'Saving…' : 'Save profile →'}</button><p role="status">{message}</p><Link href={`/creators/${encodeURIComponent(data.alias)}`}>View public profile ↗</Link></form>}</>; }
export function BriefsView() { const { data, error, loading } = useData<Brief[]>('/api/briefs'); return <><Heading label="YOUR PROJECTS" title="My briefs" text="From the first spark to final delivery." action={<Link className="button" href="/brand/briefs/new">+ Create a brief</Link>}/><State loading={loading} error={error}/>{data?.length === 0 && <EmptyState message="You haven’t posted a brief yet"/>}{data?.map(b => <article className="card" key={b.id}><div className="row between"><Link href={`/brand/briefs/${b.id}`}><h2>{b.title} ↗</h2></Link><strong>{money(b.budget)}</strong></div><p className="muted">{b.description}</p><StatusStepper status={b.status}/></article>)}</>; }
export function BriefDetail({ id }: {
    id: string;
}) { const { data: b, error, loading, reload } = useData<Brief>(`/api/briefs/${id}`), matches = useData<Match[]>(`/api/match/${id}`); return <><State loading={loading} error={error}/>{b && <><Heading label="PROJECT BRIEF" title={b.title} text={b.description}/><div className="card"><div className="tags"><span className="tag">{b.contentType}</span><span className="tag">{b.aspectRatio}</span><span className="tag">{money(b.budget)}</span><span className="tag">Due {b.deadline}</span></div><p>{b.style} · Usage: {b.platforms}, {b.duration}, {b.territory}{b.exclusivity ? ', exclusive' : ''}</p><StatusStepper status={b.status}/></div><Heading label="MATCHED TO YOUR VISION" title="Your creator matches" text="Ranked by tools, skills, budget, timing and commercial compatibility."/><State loading={matches.loading} error={matches.error}/>{matches.data?.length === 0 && <EmptyState message="No creators available"/>}<div className="match-grid">{matches.data?.map(m => <MatchScoreCard key={m.creator.id} match={m} briefId={id} shortlisted={b.shortlist.includes(m.creator.id)} onShortlist={() => void reload()}/>)}</div></>}</>; }
type EngagementDetail = Engagement & {
    creatorAlias: string;
    companyName: string;
    brief: Brief;
    invoiceId?: string;
    payoutId?: string;
};
export function EngagementView({ id }: {
    id: string;
}) { const { data: e, error, loading, reload } = useData<EngagementDetail>(`/api/engagements/${id}`), { data: user } = useData<SessionUser>('/api/auth/me'), [message, setMessage] = useState(''), [busy, setBusy] = useState(false); async function action(action: string) { setBusy(true); try {
    await request(`/api/engagements/${id}`, { action });
    await reload();
}
catch (err) {
    setMessage(errorText(err));
}
finally {
    setBusy(false);
} } return <><State loading={loading} error={error}/>{e && user && <><Heading label="COLLABORATION WORKSPACE" title={e.brief.title} text={`${e.creatorAlias} · ${e.companyName}`}/><div className="card"><div className="row between"><h2>Project status</h2><span className="tag">{e.status}</span></div><StatusStepper status={e.status}/><p>{e.message}</p>{e.status === 'Invited' && user.role === 'creator' && <div className="row"><button disabled={busy} className="button" onClick={() => void action('accept')}>Accept invite</button><button disabled={busy} className="button secondary" onClick={() => void action('decline')}>Decline</button></div>}{e.status === 'Invited' && user.role === 'brand' && <p className="muted">Waiting for the creator to accept. Chat opens on acceptance.</p>}{e.contract && <div className="contract grid stats"><div><span>Contract amount</span><strong>{money(e.contract.price)}</strong></div><div><span>Platform fee</span><strong>{money(e.contract.platformFee)}</strong></div><div><span>Creator payout</span><strong>{money(e.contract.creatorPayout)}</strong></div></div>}{message && <p className="error" role="alert">{message}</p>}</div>{e.deliveries.length > 0 && <div className="card"><h2>Deliveries</h2>{e.deliveries.map(d => <div className="delivery" key={d.id}><strong>{d.title}</strong><a href={d.mediaUrl} target="_blank" rel="noreferrer">Open delivery ↗</a></div>)}{user.role === 'brand' && ['In Progress', 'Revision'].includes(e.status) && <div className="row"><button disabled={busy} className="button" onClick={() => void action('approve')}>Approve delivery</button><button disabled={busy} className="button secondary" onClick={() => void action('revision')}>Request revision</button></div>}</div>}{user.role === 'creator' && ['In Progress', 'Revision'].includes(e.status) && <UploadForm engagementId={id} onDone={() => void reload()}/>}<div className="card"><h2>Payments & documents</h2>{e.status === 'Approved' && user.role === 'brand' && <><p>Approval complete. Simulate payment to generate the invoice and creator statement.</p><PayButton engagementId={id} onPaid={() => void reload()}/></>}{e.invoiceId && <Link className="button secondary" href={`/engagements/${id}/invoice`}>Open brand invoice ↗</Link>}{e.payoutId && <Link className="button secondary" href={`/engagements/${id}/payout`}>Open payout statement ↗</Link>}{!e.invoiceId && !e.payoutId && e.status !== 'Approved' && <p className="muted">Documents appear after approval and simulated payment.</p>}{e.status === 'Approved' && user.role === 'creator' && <p className="muted">Delivery approved. Waiting for the brand’s simulated payment.</p>}</div>{!['Invited', 'Declined'].includes(e.status) && <ChatBox engagementId={id}/>}</>}</>; }
````

src/components/BadgeRow.tsx

````tsx
import type { Badges } from '@/types';
export default function BadgeRow({ badges }: {
    badges: Badges;
}) { return <div className="tags">{badges.tools && <span className="tag success">✓ Tools verified</span>}{badges.workflow && <span className="tag success">✓ Workflow verified</span>}{badges.pastWork && <span className="tag success">✓ Past work verified</span>}</div>; }
````

src/components/BillingList.tsx

````tsx
import Link from 'next/link';
import type { Invoice, PayoutStatement } from '@/types';
import { money, date } from '@/lib/format';
import EmptyState from './EmptyState';
export default function BillingList({ items, role }: {
    items: (Invoice | PayoutStatement)[];
    role: 'brand' | 'creator';
}) { return <section className="card"><h2>Billing</h2><p className="muted">Your simulated payments and printable documents.</p>{!items.length ? <EmptyState message="No billing documents yet"/> : <div className="table-wrap"><table><thead><tr><th>Document</th><th>Project</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{items.map(i => <tr key={i.id}><td><Link href={`/engagements/${i.engagementId}/${role === 'brand' ? 'invoice' : 'payout'}`}>{i.number} ↗</Link></td><td>{i.briefTitle}</td><td>{date('issuedAt' in i ? i.issuedAt : i.date)}</td><td>{money('total' in i ? i.total : i.net)}</td><td><span className="tag success">{i.status}</span></td></tr>)}</tbody></table></div>}</section>; }
````

src/components/BriefBuilderBox.tsx

````tsx
'use client';
import { useState } from 'react';
import { request, errorText } from '@/lib/client';
export default function BriefBuilderBox({ onBuild }: {
    onBuild: (data: Record<string, unknown>) => void;
}) { const [idea, setIdea] = useState(''), [busy, setBusy] = useState(false), [message, setMessage] = useState(''); return <div className="card ai-box"><span className="eyebrow">✧ YOUR CREATIVE COPILOT</span><h3>Start with an idea. We’ll shape the brief.</h3><label htmlFor="idea">What do you want to create?</label><textarea id="idea" value={idea} onChange={e => setIdea(e.target.value)} placeholder="A cinematic launch reel for our new sustainable sneaker…"/><div className="row between"><small>Works with or without an AI key.</small><button className="button" disabled={busy || !idea.trim()} onClick={async () => { setBusy(true); try {
    const r = await request<{
        brief: Record<string, unknown>;
        mode: string;
    }>('/api/brief-builder', { idea });
    onBuild(r.brief);
    setMessage(`Brief prepared with ${r.mode}. Review the fields below.`);
}
catch (e) {
    setMessage(errorText(e));
}
finally {
    setBusy(false);
} }}>{busy ? 'Building…' : 'Build my brief ↗'}</button></div><p role="status">{message}</p></div>; }
````

src/components/BriefForm.tsx

````tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { request, errorText } from '@/lib/client';
import BriefBuilderBox from './BriefBuilderBox';
export default function BriefForm() { const router = useRouter(), [error, setError] = useState(''), [busy, setBusy] = useState(false), [values, setValues] = useState<Record<string, string | boolean>>({ title: '', description: '', contentType: 'image', style: '', aspectRatio: '9:16', requiredTools: '', requiredSkills: '', budget: '1000.00', deadline: '', commercialUse: true, platforms: 'Social and website', duration: '12 months', territory: 'Worldwide', exclusivity: false }); function update(k: string, v: string | boolean) { setValues(x => ({ ...x, [k]: v })); } return <><BriefBuilderBox onBuild={data => setValues(x => ({ ...x, ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : typeof v === 'boolean' ? v : String(v)])) }))}/><form className="card form-grid" onSubmit={async (e) => { e.preventDefault(); setBusy(true); setError(''); try {
    const b = await request<{
        id: string;
    }>('/api/briefs', values);
    router.push(`/brand/briefs/${b.id}`);
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}><h2 className="wide">Tell us about your project</h2>{[['title', 'Brief title'], ['description', 'Problem / requirement'], ['style', 'Visual style'], ['requiredTools', 'Required tools (comma separated)'], ['requiredSkills', 'Required skills (comma separated)'], ['budget', 'Contract budget (₹)'], ['deadline', 'Deadline'], ['platforms', 'Usage platforms'], ['duration', 'Usage duration'], ['territory', 'Usage territory']].map(([k, label]) => <label key={k} className={k === 'description' ? 'wide' : ''}>{label}{k === 'description' ? <textarea required value={String(values[k])} onChange={e => update(k, e.target.value)}/> : <input required={!['requiredTools', 'requiredSkills'].includes(k)} type={k === 'deadline' ? 'date' : 'text'} value={String(values[k])} onChange={e => update(k, e.target.value)}/>}</label>)}<label>Content type<select value={String(values.contentType)} onChange={e => update('contentType', e.target.value)}>{['image', 'video', 'audio', 'animation'].map(t => <option key={t}>{t}</option>)}</select></label><label>Aspect ratio<select value={String(values.aspectRatio)} onChange={e => update('aspectRatio', e.target.value)}>{['9:16', '16:9', '1:1', '4:5'].map(t => <option key={t}>{t}</option>)}</select></label>{[['commercialUse', 'Commercial use required'], ['exclusivity', 'Exclusive use required']].map(([k, label]) => <label className="checkbox" key={k}><input type="checkbox" checked={Boolean(values[k])} onChange={e => update(k, e.target.checked)}/>{label}</label>)}<p className="wide muted">At acceptance, the budget becomes the contract amount. The billing policy adds a platform fee to the brand payment and deducts it from the creator payout. Payments are simulated.</p>{error && <p className="error wide" role="alert">{error}</p>}<button disabled={busy} className="button wide">{busy ? 'Saving…' : 'Publish brief & find matches →'}</button></form></>; }
````

src/components/ChatBox.tsx

````tsx
'use client';
import { useEffect, useState } from 'react';
import { useData, request, errorText } from '@/lib/client';
type ChatMessage = {
    id: string;
    text: string;
    createdAt: string;
    senderAlias: string;
    mine: boolean;
};
export default function ChatBox({ engagementId }: {
    engagementId: string;
}) { const { data, error, loading, reload } = useData<ChatMessage[]>(`/api/messages/${engagementId}`), [text, setText] = useState(''), [notice, setNotice] = useState(''), [busy, setBusy] = useState(false); useEffect(() => { const timer = setInterval(() => void reload(), 3000); return () => clearInterval(timer); }, [reload]); return <section className="card chat"><div className="row between"><h2>Project chat</h2><span className="tag success">Private workspace</span></div><p className="muted">Keep communication here. Contact details are hidden automatically.</p><div className="messages" aria-live="polite">{loading && <p>Loading chat…</p>}{error && <p className="error">{error}</p>}{data?.length === 0 && <p className="muted">Start the conversation.</p>}{data?.map(m => <div key={m.id} className={`bubble ${m.mine ? 'mine' : ''}`}><strong>{m.senderAlias}</strong><p>{m.text}</p><small>{new Date(m.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</small></div>)}</div><form onSubmit={async (e) => { e.preventDefault(); setBusy(true); try {
    const r = await request<{
        warning: string;
    }>(`/api/messages/${engagementId}`, { text });
    setNotice(r.warning);
    setText('');
    await reload();
}
catch (e) {
    setNotice(errorText(e));
}
finally {
    setBusy(false);
} }}><label htmlFor="chat-text">Message<textarea id="chat-text" value={text} onChange={e => setText(e.target.value)} maxLength={3000} required/></label><button disabled={busy || !text.trim()} className="button">{busy ? 'Sending…' : 'Send message →'}</button><p role="status" className="notice-text">{notice}</p></form></section>; }
````

src/components/CreatorCard.tsx

````tsx
import Link from 'next/link';
import type { PublicCreator } from '@/types';
import { money } from '@/lib/format';
import BadgeRow from './BadgeRow';
export default function CreatorCard({ creator: c }: {
    creator: PublicCreator;
}) { return <article className="card creator-card"><div className="creator-cover"><img src={c.portfolio[0]?.mediaUrl || '/samples/study-1.svg'} alt="Creator portfolio preview"/></div><div className="card-body"><div className="row"><span className="avatar" style={{ background: c.avatarColor }}>YG</span><div><Link className="strong" href={`/creators/${encodeURIComponent(c.alias)}`}>{c.alias}</Link><p className="muted">{c.headline || 'Independent AI creator'}</p></div></div><BadgeRow badges={c.badges}/><div className="tags">{c.tools.slice(0, 3).map(t => <span className="tag" key={t}>{t}</span>)}</div><div className="card-bottom"><span>From <strong>{money(c.rate)}</strong></span><span className="muted">{c.turnaroundDays} days</span></div></div></article>; }
````

src/components/DocumentActions.tsx

````tsx
'use client';
export default function DocumentActions({ name }: {
    name: string;
}) { function download() { const node = document.getElementById('billing-document'); if (!node)
    return; const css = Array.from(document.styleSheets).flatMap(sheet => { try {
    return Array.from(sheet.cssRules).map(rule => rule.cssText);
}
catch {
    return [];
} }).join('\n'); const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name}</title><style>${css}</style><style>html,body{background:white;color:#172033}.document{margin:0 auto}</style></head><body>${node.outerHTML}</body></html>`; const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = `${name}.html`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); } return <div className="document-actions no-print"><button className="button" onClick={() => window.print()}>Download / Print</button><button className="button secondary" onClick={download}>Download .html</button></div>; }
````

src/components/EmptyState.tsx

````tsx
export default function EmptyState({ message = 'Nothing here yet.', clear }: {
    message?: string;
    clear?: () => void;
}) { return <div className="empty"><div className="empty-icon">◇</div><h3>{message}</h3><p className="muted">Start a new collaboration or explore the creator community.</p>{clear && <button className="button secondary" onClick={clear}>Clear filters</button>}</div>; }
````

src/components/FilterBar.tsx

````tsx
'use client';
export default function FilterBar({ value, onChange }: {
    value: Record<string, string>;
    onChange: (next: Record<string, string>) => void;
}) { return <div className="filter-bar">{[['q', 'Search creators'], ['skills', 'Skill'], ['tools', 'Tool'], ['specialization', 'Specialization'], ['min', 'Min ₹'], ['max', 'Max ₹']].map(([key, label]) => <label key={key}>{label}<input type={key === 'min' || key === 'max' ? 'number' : 'search'} min="0" value={value[key] || ''} onChange={e => onChange({ ...value, [key]: e.target.value })} placeholder={label}/></label>)}<label>Content<select value={value.contentTypes || ''} onChange={e => onChange({ ...value, contentTypes: e.target.value })}><option value="">All types</option>{['image', 'video', 'audio', 'animation'].map(t => <option key={t}>{t}</option>)}</select></label><label>Verification<select value={value.verified || ''} onChange={e => onChange({ ...value, verified: e.target.value })}><option value="">All creators</option><option value="tools">Tools verified</option><option value="workflow">Workflow verified</option><option value="pastWork">Past work verified</option></select></label></div>; }
````

src/components/Footer.tsx

````tsx
'use client';
import { useData } from '@/lib/client';
export default function Footer() { const { data } = useData<{
    ai: string;
    aiNote: string;
}>('/api/health'); return <footer className="no-print"><span>YUGANTAR · Creativity, without boundaries.</span><span className="tag" title={data?.aiNote}>AI {data?.ai === 'live' ? 'configured' : 'fallback'} · Payments simulated</span></footer>; }
````

src/components/InvoiceView.tsx

````tsx
import type { Invoice } from '@/types';
import { money, date } from '@/lib/format';
import { PLATFORM_FEE_PERCENT } from '@/lib/billing';
import DocumentActions from './DocumentActions';
export default function InvoiceView({ invoice: i }: {
    invoice: Invoice;
}) { return <><DocumentActions name={i.number}/><article className="document" id="billing-document"><div className="document-head"><strong>YUGANTAR</strong><h1>INVOICE</h1></div><p className="document-note">Prototype document, not a tax invoice</p><dl className="details"><div><dt>Invoice number</dt><dd>{i.number}</dd></div><div><dt>Issue date</dt><dd>{date(i.issuedAt)}</dd></div><div><dt>Payment date</dt><dd>{date(i.paidAt)}</dd></div><div><dt>Payment status</dt><dd>{i.status}</dd></div></dl><section className="document-part"><h3>Billed to</h3><p>{i.companyName}</p><h3>Service provider</h3><p>{i.creatorAlias}</p><p>Engagement reference: {i.engagementId}</p><p>Brief: {i.briefTitle}</p></section><table><thead><tr><th>Description</th><th>Quantity</th><th>Amount</th></tr></thead><tbody><tr><td>Creative services: {i.briefTitle}</td><td>1</td><td>{money(i.subtotal)}</td></tr><tr><td>Platform fee ({PLATFORM_FEE_PERCENT}%)</td><td>1</td><td>{money(i.platformFee)}</td></tr></tbody></table><dl className="totals"><div><dt>Subtotal (creative services)</dt><dd>{money(i.subtotal)}</dd></div><div><dt>Platform fee</dt><dd>{money(i.platformFee)}</dd></div><div><dt>Tax (prototype) · {i.taxRate * 100}%</dt><dd>{money(i.tax)}</dd></div><div className="grand"><dt>Grand total</dt><dd>{money(i.total)}</dd></div></dl><p className="document-note document-footer">Payments are simulated in this prototype.</p></article></>; }
````

src/components/MatchScoreCard.tsx

````tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Match } from '@/types';
import CreatorCard from './CreatorCard';
import { request, errorText } from '@/lib/client';
export default function MatchScoreCard({ match, briefId, shortlisted, onShortlist }: {
    match: Match;
    briefId: string;
    shortlisted: boolean;
    onShortlist: () => void;
}) { const router = useRouter(), [message, setMessage] = useState('I would love to collaborate on this brief.'), [error, setError] = useState(''), [busy, setBusy] = useState(false); return <div className="match-card"><CreatorCard creator={match.creator}/><div className="match-detail"><strong className="score">{match.score}% match</strong><ul>{match.reasons.map(r => <li key={r}>{r}</li>)}</ul>{match.conflicts.map(c => <p className="error" key={c}>{c}</p>)}<label>Invite message<input value={message} onChange={e => setMessage(e.target.value)} maxLength={1000}/></label><div className="row"><button disabled={busy || shortlisted} className="button secondary" onClick={async () => { setBusy(true); try {
    await request(`/api/briefs/${briefId}/shortlist`, { creatorId: match.creator.id });
    onShortlist();
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}>{shortlisted ? 'Shortlisted ✓' : 'Shortlist'}</button><button disabled={busy} className="button" onClick={async () => { setBusy(true); try {
    const e = await request<{
        id: string;
    }>('/api/invites', { briefId, creatorId: match.creator.id, message });
    router.push(`/engagements/${e.id}`);
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}>Invite creator →</button></div>{error && <p className="error" role="alert">{error}</p>}</div></div>; }
````

src/components/Navbar.tsx

````tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { request } from '@/lib/client';
import type { SessionUser } from '@/types';
export default function Navbar() { const [user, setUser] = useState<SessionUser | null>(null), [dark, setDark] = useState(false); const pathname = usePathname(); useEffect(() => { void request<SessionUser | null>('/api/auth/me').then(setUser); }, [pathname]); useEffect(() => { const d = localStorage.getItem('yg-theme') === 'dark'; setDark(d); document.documentElement.classList.toggle('dark', d); }, []); function toggle() { const d = !dark; setDark(d); localStorage.setItem('yg-theme', d ? 'dark' : 'light'); document.documentElement.classList.toggle('dark', d); } return <header className="navbar no-print"><Link href="/" className="logo"><span className="logo-mark">Y</span> YUGANTAR<span className="prototype">BETA</span></Link><nav><Link href="/discover">Discover creators</Link>{user ? <><Link href={`/${user.role}/dashboard`}>Dashboard</Link>{user.role === 'brand' ? <Link href="/brand/briefs">My briefs</Link> : <Link href="/creator/profile">My studio</Link>}<button className="link-button" onClick={async () => { await request('/api/auth/logout', {}); window.location.href = '/'; }}>Log out</button></> : <Link href="/login">Log in</Link>}<button onClick={toggle} aria-label="Toggle colour theme" className="theme-toggle">{dark ? '☀ Light' : '☾ Dark'}</button></nav></header>; }
````

src/components/PayButton.tsx

````tsx
'use client';
import { useState } from 'react';
import { request, errorText } from '@/lib/client';
export default function PayButton({ engagementId, onPaid }: {
    engagementId: string;
    onPaid: () => void;
}) { const [busy, setBusy] = useState(false), [error, setError] = useState(''); return <div><button disabled={busy} className="button" onClick={async () => { setBusy(true); try {
    await request('/api/payments', { engagementId });
    onPaid();
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}>{busy ? 'Generating documents…' : 'Pay now (simulated)'}</button>{error && <p className="error">{error}</p>}</div>; }
````

src/components/PayoutStatementView.tsx

````tsx
import type { PayoutStatement } from '@/types';
import { money, date } from '@/lib/format';
import { PLATFORM_FEE_PERCENT } from '@/lib/billing';
import DocumentActions from './DocumentActions';
export default function PayoutStatementView({ statement: p }: {
    statement: PayoutStatement;
}) { return <><DocumentActions name={p.number}/><article className="document" id="billing-document"><div className="document-head"><strong>YUGANTAR</strong><h1>PAYOUT STATEMENT</h1></div><p className="document-note">Prototype document, not a tax invoice</p><dl className="details"><div><dt>Statement number</dt><dd>{p.number}</dd></div><div><dt>Date</dt><dd>{date(p.date)}</dd></div><div><dt>Brief</dt><dd>{p.briefTitle}</dd></div><div><dt>Brand company</dt><dd>{p.companyName}</dd></div><div><dt>Status</dt><dd>{p.status}</dd></div></dl><dl className="totals"><div><dt>Gross contract amount</dt><dd>{money(p.gross)}</dd></div><div><dt>Platform fee ({PLATFORM_FEE_PERCENT}%)</dt><dd>−{money(p.platformFee)}</dd></div><div className="grand"><dt>Net payout to creator</dt><dd>{money(p.net)}</dd></div></dl><p className="document-note document-footer">Payments are simulated in this prototype.</p></article></>; }
````

src/components/PlagiarismResult.tsx

````tsx
import type { PlagiarismCheck } from '@/types';
export default function PlagiarismResult({ result }: {
    result: PlagiarismCheck;
}) { return <div className="notice"><strong>{result.status}</strong><ul>{result.checks.map((s, i) => <li key={i}>{s}</li>)}</ul>{result.advisory && <p>AI review (advisory): {result.advisory}</p>}<small>Checks within YUGANTAR and basic risk only; no internet-wide originality guarantee.</small></div>; }
````

src/components/StatusStepper.tsx

````tsx
const stages = ['Open', 'Shortlisted', 'In Progress', 'Revision', 'Delivered'];
export default function StatusStepper({ status }: {
    status: string;
}) { const active = status === 'Approved' ? 2 : status === 'Invited' ? 1 : stages.indexOf(status); return <ol className="stepper" aria-label={`Status: ${status}`}>{stages.map((s, i) => <li key={s} className={i <= active ? 'complete' : ''}><span>{i + 1}</span>{s}</li>)}</ol>; }
````

src/components/UploadForm.tsx

````tsx
'use client';
import { useState } from 'react';
import { request, errorText } from '@/lib/client';
import type { PlagiarismCheck } from '@/types';
import PlagiarismResult from './PlagiarismResult';
export default function UploadForm({ engagementId, onDone }: {
    engagementId?: string;
    onDone?: () => void;
}) { const [result, setResult] = useState<PlagiarismCheck | null>(null), [message, setMessage] = useState(''), [busy, setBusy] = useState(false); return <form className="card form-grid" onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); setBusy(true); setMessage(''); try {
    if (engagementId) {
        await request(`/api/deliveries/${engagementId}`, form);
        setMessage('Delivery uploaded. The brand can now review it.');
        onDone?.();
    }
    else {
        const r = await request<{
            published: boolean;
            plagiarism: PlagiarismCheck;
        }>('/api/portfolio', form);
        setResult(r.plagiarism);
        setMessage(r.published ? 'Published to your portfolio.' : 'Duplicate blocked; item was not published.');
    }
}
catch (e) {
    setMessage(errorText(e));
}
finally {
    setBusy(false);
} }}><h2 className="wide">{engagementId ? 'Upload delivery' : 'Add a portfolio piece'}</h2><label className="wide">Title<input name="title" required maxLength={120}/></label><label>Upload media (max 20 MB)<input type="file" name="file" accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm,audio/mpeg,audio/wav,audio/ogg"/></label><label>Or HTTPS media URL<input type="url" name="mediaUrl" placeholder="https://…"/></label>{!engagementId && <><label className="wide">Description<textarea name="description" required/></label><label>Content type<select name="contentType">{['image', 'video', 'audio', 'animation'].map(t => <option key={t}>{t}</option>)}</select></label><label>Tools used (comma separated)<input name="toolsUsed" required placeholder="ComfyUI, Midjourney"/></label><h3 className="wide">Proof of workflow</h3>{[['model', 'Model / checkpoint'], ['seed', 'Seed'], ['sampler', 'Sampler'], ['cfg', 'CFG'], ['loras', 'LoRAs (or None)'], ['controlNets', 'ControlNets (or None)'], ['promptStructure', 'Prompt structure'], ['modelSource', 'Model source (text; no URL)']].map(([name, label]) => <label key={name}>{label}<input name={name}/></label>)}<label>License<select name="license"><option value="commercial-safe">Commercial-safe</option><option value="non-commercial">Non-commercial</option></select></label><p className="muted wide">Uploads are checked for platform duplicates before publication. URL media receive text checks only. Contact details in titles, descriptions and workflow are blocked.</p></>}<button disabled={busy} className="button wide">{busy ? 'Checking & uploading…' : engagementId ? 'Submit delivery →' : 'Check & publish →'}</button>{message && <p className="wide notice-text" role="status">{message}</p>}{result && <div className="wide"><PlagiarismResult result={result}/></div>}</form>; }
````

src/components/WorkflowModal.tsx

````tsx
'use client';
import { useEffect, useRef } from 'react';
import type { PortfolioItem } from '@/types';
import PlagiarismResult from './PlagiarismResult';
export default function WorkflowModal({ item, close }: {
    item: PortfolioItem;
    close: () => void;
}) { const ref = useRef<HTMLDialogElement>(null); useEffect(() => { ref.current?.showModal(); }, []); return <dialog ref={ref} onCancel={close} className="modal"><div className="row between"><h2>Proof of workflow</h2><button onClick={close} aria-label="Close workflow">✕</button></div><h3>{item.title}</h3><dl className="details">{Object.entries(item.workflow).map(([k, v]) => <div key={k}><dt>{k.replace(/([A-Z])/g, ' $1')}</dt><dd>{v || 'Not supplied'}</dd></div>)}</dl><p>Tools: {item.toolsUsed.join(', ') || 'Not declared'}</p><PlagiarismResult result={item.plagiarism}/></dialog>; }
````

src/app/brand/briefs/[id]/page.tsx

````tsx
import { BriefDetail } from '@/components/AppViews';
export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>;
}) { const resolved = await params; return <BriefDetail id={resolved.id}/>; }
````

src/app/brand/briefs/new/page.tsx

````tsx
import BriefForm from '@/components/BriefForm';
import { Heading } from '@/components/AppViews';
export default function Page() { return <><Heading label="START SOMETHING GREAT" title="Create your next brief" text="A clear vision is the first step to exceptional work."/><BriefForm /></>; }
````

src/app/brand/briefs/page.tsx

````tsx
import { BriefsView } from '@/components/AppViews';
export default function Page() { return <BriefsView />; }
````

src/app/brand/dashboard/page.tsx

````tsx
import { DashboardView } from '@/components/AppViews';
export default function Page() { return <DashboardView />; }
````

src/app/brand/layout.tsx

````tsx
import { pageUser } from '@/lib/pageAuth';
export const dynamic = 'force-dynamic';
export default async function Layout({ children }: {
    children: React.ReactNode;
}) { await pageUser('brand'); return <>{children}</>; }
````

src/app/creator/dashboard/page.tsx

````tsx
import { DashboardView } from '@/components/AppViews';
export default function Page() { return <DashboardView />; }
````

src/app/creator/layout.tsx

````tsx
import { pageUser } from '@/lib/pageAuth';
export const dynamic = 'force-dynamic';
export default async function Layout({ children }: {
    children: React.ReactNode;
}) { await pageUser('creator'); return <>{children}</>; }
````

src/app/creator/portfolio/new/page.tsx

````tsx
import UploadForm from '@/components/UploadForm';
import { Heading } from '@/components/AppViews';
export default function Page() { return <><Heading label="SHOW YOUR PROCESS" title="Your work deserves a spotlight" text="Share the outcome and the workflow that made it possible."/><UploadForm /></>; }
````

src/app/creator/profile/page.tsx

````tsx
import { ProfileView } from '@/components/AppViews';
export default function Page() { return <ProfileView />; }
````

src/app/creators/[alias]/page.tsx

````tsx
import { CreatorView } from '@/components/AppViews';
export default async function Page({ params }: {
    params: Promise<{
        alias: string;
    }>;
}) { const resolved = await params; return <CreatorView alias={decodeURIComponent(resolved.alias)}/>; }
````

src/app/discover/page.tsx

````tsx
import { DiscoverView } from '@/components/AppViews';
export default function Page() { return <DiscoverView />; }
````

src/app/engagements/[id]/invoice/page.tsx

````tsx
import { pageUser } from '@/lib/pageAuth';
import { readDb } from '@/lib/db';
import { invoiceData } from '@/lib/sanitize';
import InvoiceView from '@/components/InvoiceView';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';
export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>;
}) { const resolved = await params; const u = await pageUser(); const result = await readDb(db => { const e = db.engagements.find(e => e.id === resolved.id); if (!e)
    return { denied: false, invoice: null }; if (u.role !== 'brand' || e.brandId !== u.id)
    return { denied: true, invoice: null }; const i = db.invoices.find(i => i.engagementId === e.id); return { denied: false, invoice: i ? invoiceData(i) : null }; }); if (result.denied)
    return <div className="notice error"><h1>403 — Forbidden</h1><p>Only the owning brand may open this invoice.</p></div>; if (!result.invoice)
    notFound(); return <InvoiceView invoice={result.invoice}/>; }
````

src/app/engagements/[id]/page.tsx

````tsx
import { pageUser } from '@/lib/pageAuth';
import { EngagementView } from '@/components/AppViews';
export const dynamic = 'force-dynamic';
export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>;
}) { const resolved = await params; await pageUser(); return <EngagementView id={resolved.id}/>; }
````

src/app/engagements/[id]/payout/page.tsx

````tsx
import { pageUser } from '@/lib/pageAuth';
import { readDb } from '@/lib/db';
import { payoutData } from '@/lib/sanitize';
import PayoutStatementView from '@/components/PayoutStatementView';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';
export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>;
}) { const resolved = await params; const u = await pageUser(); const result = await readDb(db => { const e = db.engagements.find(e => e.id === resolved.id); if (!e)
    return { denied: false, statement: null }; if (u.role !== 'creator' || e.creatorId !== u.id)
    return { denied: true, statement: null }; const p = db.payoutStatements.find(p => p.engagementId === e.id); return { denied: false, statement: p ? payoutData(p) : null }; }); if (result.denied)
    return <div className="notice error"><h1>403 — Forbidden</h1><p>Only the assigned creator may open this payout statement.</p></div>; if (!result.statement)
    notFound(); return <PayoutStatementView statement={result.statement}/>; }
````

src/app/error.tsx

````tsx
'use client';
export default function ErrorPage({ reset }: {
    error: Error;
    reset: () => void;
}) { return <div className="empty"><h1>Something went wrong</h1><p>Please try your request again.</p><button className="button" onClick={reset}>Try again</button></div>; }
````

src/app/globals.css

````css
@import "tailwindcss";
:root{--bg:#fafaf7;--surface:#fff;--text:#202522;--muted:#747b75;--line:#e4e8e0;--accent:#596b46;--accent-soft:#eef2e8;--shadow:0 14px 45px #273d2010;color-scheme:light}
.dark{--bg:#121714;--surface:#1d251f;--text:#ecf0e8;--muted:#a4afa4;--line:#344036;--accent:#b9d399;--accent-soft:#2e3d29;--shadow:0 14px 45px #0003;color-scheme:dark}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6}a{color:inherit;text-decoration:none}a:hover{color:var(--accent)}button,input,textarea,select{font:inherit}button,a,input,select,textarea{outline-offset:4px}button{cursor:pointer}button:disabled{opacity:.55;cursor:wait}h1,h2,h3,p{margin-top:0}h1{font-size:clamp(30px,4vw,48px);line-height:1.16;letter-spacing:-1.8px;margin-bottom:18px}h2{font-size:26px;letter-spacing:-.7px;line-height:1.25}h3{font-size:18px;line-height:1.35}main{max-width:1280px;margin:auto;padding:36px 44px 60px;min-height:75vh}.navbar{max-width:1440px;padding:23px 48px;margin:auto;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);gap:24px}.logo{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:800;letter-spacing:1.5px}.logo-mark{display:grid;place-items:center;background:var(--accent);color:var(--bg);height:32px;width:32px;border-radius:8px}.prototype{font-size:9px;letter-spacing:1px;background:var(--accent-soft);padding:2px 5px;border-radius:4px;color:var(--accent)}nav{display:flex;align-items:center;gap:28px;font-size:13px}.theme-toggle,.link-button{border:0;background:transparent;color:var(--text);padding:6px}.theme-toggle{border:1px solid var(--line);border-radius:20px;padding:6px 14px}.button{display:inline-flex;align-items:center;justify-content:center;background:var(--accent);color:var(--bg);border:1px solid var(--accent);padding:12px 22px;border-radius:8px;font-weight:600;font-size:13px;gap:8px;transition:transform .15s}.button:hover{color:var(--bg);transform:translateY(-1px)}.button.secondary{background:var(--surface);border-color:var(--line);color:var(--text)}.row{display:flex;gap:14px;align-items:center;flex-wrap:wrap}.between{justify-content:space-between}.muted{color:var(--muted)}.strong{font-weight:700}.eyebrow{font-size:10px;letter-spacing:2px;font-weight:700;color:var(--accent);display:inline-block;margin-bottom:16px}.dot{width:6px;height:6px;border-radius:100%;display:inline-block;background:var(--accent);margin-right:6px}.hero{display:grid;grid-template-columns:1.05fr 1fr;gap:60px;align-items:center;padding:40px 0 64px}.hero h1{font-size:clamp(42px,5.1vw,70px);letter-spacing:-3.8px;line-height:1.08}.hero em{font-family:Georgia,serif;font-weight:400;color:var(--accent)}.hero-copy>p{font-size:16px;color:var(--muted);max-width:430px;margin:26px 0 30px;line-height:1.8}.hero-art{height:430px;position:relative}.hero-art>img{height:100%;width:100%;object-fit:cover;border-radius:16px}.floating-card{position:absolute;left:-24px;bottom:26px;background:var(--surface);padding:18px 24px;border-radius:12px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:6px}.floating-card strong{font-size:16px}.floating-card small{color:var(--muted)}.art-label{position:absolute;right:20px;top:20px;font-size:9px;letter-spacing:2px;color:#fff}.hero-proof{display:flex;gap:14px;align-items:center;margin-top:38px;font-size:11px;color:var(--muted)}.hero-proof p{margin:0}.hero-proof strong{color:var(--text)}.mini-avatars{display:flex;padding-left:8px}.mini-avatars span{border:2px solid var(--bg);background:#d4dfc9;color:#596b46;border-radius:100%;width:32px;height:32px;display:grid;place-items:center;margin-left:-8px;font-size:9px;font-weight:700}.mini-avatars span:nth-child(2){background:#d9cbbd}.mini-avatars span:nth-child(3){background:#ddd2e9}.tool-strip{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;padding:26px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.tool-strip span{font-size:9px;letter-spacing:1.4px;color:var(--muted);max-width:130px}.tool-strip strong{color:var(--muted);font-size:17px}.section{padding:64px 0 20px}.page-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:30px}.page-heading p{max-width:730px}.page-heading h2{font-size:30px}.grid{display:grid;gap:22px}.creators{grid-template-columns:repeat(4,minmax(0,1fr))}.three,.stats{grid-template-columns:repeat(3,minmax(0,1fr))}.card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:26px;margin-bottom:24px;box-shadow:0 4px 18px #20302503}.creator-card{padding:0;overflow:hidden;margin:0}.creator-cover{height:165px;background:var(--accent-soft)}.creator-cover img{width:100%;height:100%;object-fit:cover}.card-body{padding:18px}.creator-card .row{flex-wrap:nowrap;gap:10px}.creator-card .strong{font-size:12px}.creator-card p{font-size:11px;margin:4px 0}.avatar{display:inline-grid;place-items:center;color:white;border-radius:100%;height:34px;min-width:34px;font-size:10px;font-weight:700}.avatar.large{height:85px;width:85px;font-size:23px}.tags{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}.tag{display:inline-block;font-size:10px;border:1px solid var(--line);background:var(--bg);border-radius:5px;padding:3px 7px;white-space:nowrap}.tag.success{color:var(--accent);background:var(--accent-soft);border:0}.card-bottom{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px;margin-top:14px;font-size:11px}.how h2{font-size:34px;max-width:540px;margin-bottom:30px}.step-number{display:block;color:var(--accent);font-family:Georgia,serif;font-size:35px;margin-bottom:20px}.how .card{background:transparent}.cta{text-align:center;background:var(--accent-soft);border-radius:18px;margin-top:48px;padding:55px 24px}.cta h2{font-family:Georgia,serif;font-size:44px;font-weight:400;line-height:1.1;margin-bottom:25px}.cta p{font-size:11px;color:var(--muted);margin:15px 0 0}footer{border-top:1px solid var(--line);padding:25px 48px;display:flex;justify-content:space-between;color:var(--muted);gap:16px;font-size:12px}label{display:flex;flex-direction:column;gap:7px;font-size:12px;font-weight:600}input,textarea,select{width:100%;border:1px solid var(--line);background:var(--bg);color:var(--text);border-radius:7px;padding:11px 12px;min-width:0}textarea{resize:vertical;min-height:100px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:940px;margin-left:auto;margin-right:auto}.wide{grid-column:1/-1}.checkbox{flex-direction:row;align-items:center}.checkbox input{width:auto}.stack{display:flex;flex-direction:column;gap:18px}.stack p{margin:0}.auth-layout{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center;padding:30px 20px}.auth-story{background:var(--accent-soft);padding:42px;border-radius:18px;overflow:hidden}.auth-story h1{font-size:48px}.auth-story em{font-family:Georgia,serif;color:var(--accent);font-weight:400}.auth-story img{width:100%;height:180px;object-fit:cover;border-radius:10px}.auth-story p{color:var(--muted)}.notice{padding:22px;border:1px solid var(--line);border-radius:10px;background:var(--accent-soft);margin:20px 0}.error{color:#c44b43}.notice-text{color:var(--accent)}.empty{text-align:center;padding:50px 20px;border:1px dashed var(--line);border-radius:12px;margin-bottom:24px}.empty-icon{font-size:35px;color:var(--accent)}.filter-bar{display:grid;grid-template-columns:2fr repeat(3,1fr);gap:14px;padding:22px;background:var(--surface);border:1px solid var(--line);border-radius:12px;margin-bottom:24px}.result-count{display:flex;justify-content:space-between;color:var(--muted)}.stats .card{display:flex;flex-direction:column;gap:10px}.stats strong{font-size:32px;letter-spacing:-1px}.list-item{display:flex;align-items:center;gap:20px;padding:20px 0;border-top:1px solid var(--line)}.list-item>div{flex:1}.list-item p{margin:4px 0 0;font-size:12px}.profile-hero{display:flex;align-items:center;gap:28px}.profile-hero>div:first-of-type{flex:1}.profile-hero h1{font-size:32px}.profile-hero p{max-width:540px}.portfolio-card{padding:0;overflow:hidden}.portfolio-card>img,.portfolio-card>video{width:100%;height:220px;object-fit:cover}.portfolio-card audio{width:100%;margin-top:20px}.portfolio-card .button{margin-top:16px}.modal{max-width:700px;width:90vw;max-height:90vh;overflow:auto;border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:14px;padding:28px}.modal::backdrop{background:#122016aa}.modal button{border:0;background:transparent;color:var(--text)}.details{display:grid;grid-template-columns:1fr 1fr;gap:20px}.details dt{text-transform:capitalize;font-size:11px;color:var(--muted)}.details dd{margin:4px 0 0;overflow-wrap:anywhere}.ai-box{max-width:940px;margin:auto auto 26px;background:var(--accent-soft)}.ai-box textarea{background:var(--surface);margin:10px 0 15px}.ai-box p{margin:10px 0 0}.match-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.match-card{border:1px solid var(--line);background:var(--surface);border-radius:12px;overflow:hidden}.match-card .creator-card{border:0;border-radius:0}.match-detail{padding:22px;border-top:1px solid var(--line)}.match-detail label{margin:18px 0}.score{color:var(--accent);font-size:20px}.match-detail ul{padding-left:18px;color:var(--muted);font-size:12px;line-height:1.9}.stepper{display:flex;list-style:none;padding:0;gap:16px;margin:25px 0;flex-wrap:wrap}.stepper li{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:11px}.stepper span{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--bg);border:1px solid var(--line)}.stepper .complete{color:var(--accent)}.stepper .complete span{background:var(--accent-soft);border-color:var(--accent)}.contract{padding:24px 0;border-top:1px solid var(--line);margin-top:22px}.contract>div{display:flex;flex-direction:column}.contract span{color:var(--muted);font-size:12px}.delivery{display:flex;justify-content:space-between;gap:20px;padding:20px 0;border-bottom:1px solid var(--line);margin-bottom:16px}.chat{max-width:940px;margin:auto}.messages{display:flex;flex-direction:column;gap:14px;max-height:420px;overflow:auto;padding:15px 0 30px}.bubble{background:var(--bg);border:1px solid var(--line);border-radius:12px;max-width:80%;padding:14px 18px;align-self:flex-start}.bubble.mine{align-self:flex-end;background:var(--accent-soft)}.bubble strong,.bubble small{font-size:10px;color:var(--muted)}.bubble p{margin:6px 0;white-space:pre-wrap;overflow-wrap:anywhere}.chat .button{margin-top:12px}table{border-collapse:collapse;width:100%;font-size:12px}th,td{text-align:left;border-bottom:1px solid var(--line);padding:16px 12px}th{color:var(--muted);font-weight:500}.table-wrap{overflow:auto}.document-actions{display:flex;justify-content:center;gap:12px;margin-bottom:25px}.document{background:white;color:#172033;width:100%;max-width:210mm;min-height:297mm;margin:0 auto;padding:18mm;border:1px solid #e0e5e9;font-family:Arial,sans-serif;--line:#e0e5e9;--muted:#667080}.document-head{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #596b46;padding-bottom:18px;gap:20px}.document-head strong{letter-spacing:2px}.document-head h1{font-size:25px;letter-spacing:1px;margin:0}.document-note{font-size:11px;color:#667080;margin:15px 0 30px}.document-part{padding:25px 0}.document-part h3{font-size:12px;color:#667080;margin:12px 0 4px}.document-part p{margin-bottom:10px}.totals{max-width:340px;margin:30px 0 30px auto}.totals>div{display:flex;justify-content:space-between;gap:20px;padding:12px 0}.totals dd{margin:0;white-space:nowrap}.grand{border-top:2px solid #596b46;font-weight:700;font-size:17px}.document-footer{border-top:1px solid #e0e5e9;padding-top:20px;margin-top:50px} @page{size:A4;margin:0}
@media print{html,body{background:white!important;color:#172033!important}.no-print{display:none!important}main{max-width:none;margin:0;padding:0;min-height:0}.document{border:0;margin:0;width:210mm;min-height:297mm;padding:18mm;box-shadow:none;print-color-adjust:exact;-webkit-print-color-adjust:exact}.document table,.document .details,.document .totals{break-inside:avoid}.document-actions,nav,footer,button{display:none!important}}
@media(max-width:1000px){main{padding:30px 24px}.navbar{padding:20px 24px}nav{gap:15px}.hero{gap:35px}.hero-art{height:380px}.creators{grid-template-columns:repeat(2,minmax(0,1fr))}.hero h1{font-size:50px}.profile-hero{flex-wrap:wrap}.auth-layout{gap:30px;padding:0}.auth-story{padding:26px}.auth-story h1{font-size:38px}}
@media(max-width:680px){main{padding:24px 18px}.navbar{padding:18px;align-items:flex-start;flex-wrap:wrap}.logo{font-size:17px}nav{width:100%;font-size:11px;gap:12px;flex-wrap:wrap}.theme-toggle{margin-left:auto}.hero{grid-template-columns:1fr;padding:16px 0 35px;gap:35px}.hero h1{font-size:47px;letter-spacing:-2px}.hero-art{height:300px}.floating-card{left:12px;bottom:16px}.hero-copy>p{font-size:14px}.tool-strip{justify-content:flex-start;gap:20px}.tool-strip span{max-width:none;width:100%}.tool-strip strong{font-size:14px}.section{padding:40px 0 0}.page-heading{align-items:flex-start;flex-direction:column}.page-heading h2,.how h2{font-size:26px}.grid.three,.stats,.form-grid,.match-grid{grid-template-columns:1fr}.creators{gap:12px}.creator-cover{height:135px}.card-body{padding:12px}.creator-card .row{align-items:flex-start}.creator-card .avatar{display:none}.card-bottom{flex-direction:column;align-items:flex-start;gap:5px}.creator-card .tag{font-size:9px}.filter-bar{grid-template-columns:1fr 1fr;padding:16px}.auth-layout{grid-template-columns:1fr}.auth-story{display:none}.card{padding:20px}.creator-card,.portfolio-card{padding:0}.wide{grid-column:auto}.form-grid>.wide{grid-column:1/-1}.list-item{flex-wrap:wrap}.list-item>div{min-width:100%}.list-item>span:last-child{font-size:11px}.profile-hero{gap:18px}.profile-hero>div{width:100%}.cta h2{font-size:34px}footer{padding:25px 18px;flex-direction:column}.document{padding:22px;min-height:0}.document-head{flex-wrap:wrap}.document-head h1{font-size:20px}.details{gap:12px}.document table{font-size:10px}.document th,.document td{padding:10px 5px}.bubble{max-width:92%}}
````

src/app/layout.tsx

````tsx
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
export const metadata: Metadata = { title: 'YUGANTAR — A new era of creativity', description: 'A private marketplace for AI creators and ambitious brands.' };
export default function Layout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en" suppressHydrationWarning><body><Navbar /><main>{children}</main><Footer /></body></html>; }
````

src/app/loading.tsx

````tsx
export default function Loading() { return <div className="empty" role="status">Loading YUGANTAR…</div>; }
````

src/app/login/page.tsx

````tsx
import { AuthView } from '@/components/AppViews';
export default function Page() { return <AuthView />; }
````

src/app/not-found.tsx

````tsx
import Link from 'next/link';
export default function NotFound() { return <div className="empty"><h1>Page not found</h1><Link className="button" href="/">Back to YUGANTAR</Link></div>; }
````

src/app/page.tsx

````tsx
import Link from 'next/link';
import { readDb } from '@/lib/db';
import { publicCreator } from '@/lib/sanitize';
import CreatorCard from '@/components/CreatorCard';
export const dynamic = 'force-dynamic';
export default async function Home() { const creators = await readDb(db => db.users.filter(u => u.role === 'creator').slice(0, 4).map(u => publicCreator(u, db))); return <><section className="hero"><div className="hero-copy"><span className="eyebrow"><span className="dot"/> THE NEXT CHAPTER OF CREATIVITY</span><h1>Big ideas meet<br /><em>limitless talent.</em></h1><p>Connect with exceptional AI creators. Turn your brand’s vision into content that moves people — in a workspace built for trust.</p><div className="row"><Link href="/signup?role=brand" className="button">I’m a Brand ↗</Link><Link href="/signup?role=creator" className="button secondary">I’m a Creator →</Link></div><div className="hero-proof"><div className="mini-avatars"><span>YG</span><span>YG</span><span>YG</span></div><p><strong>A new generation of makers</strong><br />Verified workflows. Private identities.</p></div></div><div className="hero-art"><img src="/samples/study-1.svg" alt="Abstract sculptural landscape"/><div className="floating-card"><span className="tag success">✓ Workflow verified</span><strong>Imagination, made real.</strong><small>AI video · Image · Audio · Animation</small></div><div className="art-label">YUGANTAR STUDIO / 001</div></div></section><div className="tool-strip"><span>BUILT FOR YOUR CREATIVE TOOLKIT</span>{['Midjourney', 'Runway', 'ComfyUI', 'ElevenLabs', 'Kling', 'Sora'].map(t => <strong key={t}>{t}</strong>)}</div><section className="section"><div className="page-heading"><div><span className="eyebrow">EXCEPTIONAL TALENT, REAL POSSIBILITIES</span><h2>Meet your next creative partner.</h2></div><Link href="/discover">Explore all creators →</Link></div><div className="grid creators">{creators.map(c => <CreatorCard key={c.id} creator={c}/>)}</div></section><section className="section how"><span className="eyebrow">LESS FRICTION. MORE CREATION.</span><h2>From a spark to something extraordinary.</h2><div className="grid three">{[['01', 'Share your vision', 'Build a clear brief with a little help from your creative copilot.'], ['02', 'Find your people', 'Discover talent matched to your tools, style, budget and timeline.'], ['03', 'Create together', 'Collaborate privately, review delivery, and simulate a payment.']].map(([n, title, description]) => <div className="card" key={n}><span className="step-number">{n}</span><h3>{title}</h3><p className="muted">{description}</p></div>)}</div></section><section className="cta"><span className="eyebrow">YOUR NEXT GREAT IDEA STARTS HERE</span><h2>Let’s make something<br />the world hasn’t seen.</h2><Link href="/signup" className="button">Join YUGANTAR →</Link><p>Private by design. Creative by nature.</p></section></>; }
````

src/app/signup/page.tsx

````tsx
import { AuthView } from '@/components/AppViews';
export default async function Page({ searchParams }: {
    searchParams: Promise<{
        role?: string;
    }>;
}) { const q = await searchParams; return <AuthView signup initialRole={q.role === 'brand' ? 'brand' : 'creator'}/>; }
````

.env.example

````text
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-5-5
SESSION_SECRET=
OPTIONAL_REVERSE_IMAGE_API_KEY=
# Decimal fraction: 0.05 means 5%. Prototype only.
TAX_RATE=0
````

.gitattributes

````text
* text=auto
*.ts text eol=lf
*.tsx text eol=lf
*.mjs text eol=lf
*.json text eol=lf
*.md text eol=lf
*.yml text eol=lf
*.css text eol=lf
````

.github/ISSUE_TEMPLATE/bug_report.md

````markdown
---
name: Bug report
about: Report a reproducible problem in the prototype
title: ''
labels: bug
assignees: ''
---

## What happened?

Describe the observed behavior.

## Steps to reproduce

1.
2.
3.

## Expected behavior

Describe the expected result.

## Environment

- Node version:
- Operating system:
- Browser:
- Account role (brand/creator):

Use synthetic demo data. Do not include API keys, session cookies, passwords or personal records. Report vulnerabilities privately using SECURITY.md.
````

.github/pull_request_template.md

````markdown
## What changes?

Describe the problem and resulting behavior.

## Validation

- [ ] Type checking passes
- [ ] Unit tests pass
- [ ] Production build passes
- [ ] Relevant manual/integration checks completed
- [ ] No private identities, environment secrets or runtime data included

For visual changes, include screenshots. For payment or access changes, include retry and cross-account test results.
````

.github/workflows/ci.yml

````yaml
name: YUGANTAR checks

on:
  push:
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  validate:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    env:
      NEXT_TELEMETRY_DISABLED: '1'
    steps:
      - uses: actions/checkout@v7
        with:
          persist-credentials: false
      - uses: actions/setup-node@v7
        with:
          node-version-file: .nvmrc
          package-manager-cache: false
      - name: Install locked dependencies
        run: npm ci
      - name: Generate route types and check TypeScript
        run: npm run typecheck
      - name: Run unit tests
        run: npm test
      - name: Build frontend and backend
        run: npm run build
````

.gitignore

````text
node_modules/
.next/
.env*
!.env.example
next-env.d.ts
data/db.json
data/.secret
data/.lock
public/uploads/
*.tsbuildinfo
.npm-cache/
data/*.tmp
coverage/
*.log
.DS_Store
Thumbs.db
````

.nvmrc

````text
24
````

AGENTS.md

````markdown
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
````

CONTRIBUTING.md

````markdown
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
````

docs/API.md

````markdown
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
````

docs/ARCHITECTURE.md

````markdown
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
````

docs/DEPLOYMENT.md

````markdown
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
````

docs/GITHUB_SETUP.md

````markdown
# Put this project in a GitHub repository

## Upload the ready-made files

1. Extract `YUGANTAR-GitHub-ready.zip`.
2. Open the extracted folder. Its top level contains `package.json`, `README.md`, `src/`, `docs/`, `.github/` and the configuration files.
3. Create an empty GitHub repository with your preferred name and visibility.
4. Choose **Add file → Upload files** and upload the extracted contents, keeping the folder structure. Commit the upload.
5. Confirm that `package.json` and `README.md` appear at the repository root. Confirm `.github/workflows/ci.yml` and `.gitignore` are present.

Upload the extracted files, rather than storing the ZIP as the only repository file. Preserve files whose names begin with a dot; they contain environment examples, ignore rules and CI configuration.

## Push using Git instead

Open a terminal in the extracted folder. Replace the URL below with your actual empty repository URL.

```sh
git init
git add .
git commit -m "Initial YUGANTAR prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Use GitHub's normal sign-in or SSH authentication. Do not put a password or token in the repository URL or source files. For an existing repository, use its existing Git checkout and copy these files into its root before committing.

## What is included

Complete frontend/backend, seeded demo generator, sample artwork, tests, dependency lockfile, configuration, setup guide, API and architecture docs, security/contribution guides, pull request and bug templates, and a GitHub Actions workflow.

Runtime secrets, databases, uploaded media, build files and installed dependencies are excluded. They are created locally when the app starts. `.env.example` contains configuration names and empty secret fields.

## Run after cloning

```sh
npm ci
```

On Windows:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

On macOS/Linux:

```sh
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Use the demo accounts in the root README.

## Automated checks

The included workflow runs type generation/type checking, unit tests and a production build on push and pull requests. It uses Node 24 and does not need API keys. The integration walkthrough remains a local check against a running server.

Workflow action references follow the official [checkout](https://github.com/actions/checkout) and [setup-node](https://github.com/actions/setup-node) documentation. Workflow configuration is included; its first hosted run occurs after you push the repository.

GitHub Pages alone cannot run this backend. See [deployment guidance](DEPLOYMENT.md) for the persistent Node server requirements.
````

docs/TESTING.md

````markdown
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
````

next.config.mjs

````javascript
/** @type {import('next').NextConfig} */
const config = { poweredByHeader: false };
export default config;
````

package.json

````json
{
  "name": "yugantar",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "next typegen && tsc --noEmit",
    "test": "node --import tsx --test tests/*.test.ts"
  },
  "dependencies": {
    "next": "16.4.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "sharp": "0.35.5"
  },
  "devDependencies": {
    "typescript": "^5.7.3",
    "@types/node": "^20.17.19",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "tailwindcss": "4.3.3",
    "postcss": "^8.5.23",
    "autoprefixer": "^10.4.20",
    "tsx": "^4.19.3",
    "@tailwindcss/postcss": "4.3.3"
  },
  "overrides": {
    "postcss": "^8.5.23"
  },
  "engines": {
    "node": ">=20.9.0"
  }
}
````

postcss.config.mjs

````javascript
export default {plugins:{'@tailwindcss/postcss':{}}};
````

public/samples/study-1.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="900" viewBox="0 0 1000 900"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#dbd9ce"/><stop offset="1" stop-color="#a6b297"/></linearGradient><linearGradient id="orb" x2=".9" y2="1"><stop stop-color="#f6f3e9"/><stop offset=".45" stop-color="#dbd9ce"/><stop offset="1" stop-color="#4d6553"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="35"/></filter><pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".5" fill="#fff" opacity=".16"/></pattern></defs><rect width="1000" height="900" fill="url(#bg)"/><circle cx="840" cy="110" r="280" fill="#ffffff" opacity=".12"/><path d="M0 640 Q450 450 1000 620 V900 H0Z" fill="#4d6553" opacity=".12"/><ellipse cx="525" cy="733" rx="220" ry="45" fill="#4d6553" opacity=".35" filter="url(#shadow)"/><rect x="262" y="590" width="490" height="150" rx="20" fill="url(#orb)"/><ellipse cx="510" cy="590" rx="245" ry="55" fill="#dbd9ce"/><g transform="translate(490 360) rotate(-24)"><ellipse rx="175" ry="205" fill="url(#orb)"/><ellipse rx="93" ry="122" fill="#4d6553"/><ellipse cx="14" cy="-4" rx="75" ry="107" fill="url(#bg)"/><path d="M-137 -126 C-220 50 -60 230 125 115" stroke="#f6f3e9" opacity=".35" stroke-width="7" fill="none"/></g><rect width="1000" height="900" fill="url(#grain)"/><text x="55" y="840" font-family="Arial" letter-spacing="5" font-size="12" fill="#4d6553">YUGANTAR / CREATIVE STUDY 001</text></svg>
````

public/samples/study-2.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="900" viewBox="0 0 1000 900"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#ddd1c1"/><stop offset="1" stop-color="#b77654"/></linearGradient><linearGradient id="orb" x2=".9" y2="1"><stop stop-color="#f6f3e9"/><stop offset=".45" stop-color="#ddd1c1"/><stop offset="1" stop-color="#603e32"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="35"/></filter><pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".5" fill="#fff" opacity=".16"/></pattern></defs><rect width="1000" height="900" fill="url(#bg)"/><circle cx="840" cy="110" r="280" fill="#ffffff" opacity=".12"/><path d="M0 640 Q450 450 1000 620 V900 H0Z" fill="#603e32" opacity=".12"/><ellipse cx="525" cy="733" rx="220" ry="45" fill="#603e32" opacity=".35" filter="url(#shadow)"/><rect x="262" y="590" width="490" height="150" rx="20" fill="url(#orb)"/><ellipse cx="510" cy="590" rx="245" ry="55" fill="#ddd1c1"/><g transform="translate(490 360) rotate(-24)"><ellipse rx="175" ry="205" fill="url(#orb)"/><ellipse rx="93" ry="122" fill="#603e32"/><ellipse cx="14" cy="-4" rx="75" ry="107" fill="url(#bg)"/><path d="M-137 -126 C-220 50 -60 230 125 115" stroke="#f6f3e9" opacity=".35" stroke-width="7" fill="none"/></g><rect width="1000" height="900" fill="url(#grain)"/><text x="55" y="840" font-family="Arial" letter-spacing="5" font-size="12" fill="#603e32">YUGANTAR / CREATIVE STUDY 002</text></svg>
````

public/samples/study-3.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="900" viewBox="0 0 1000 900"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#d4dce3"/><stop offset="1" stop-color="#6e899d"/></linearGradient><linearGradient id="orb" x2=".9" y2="1"><stop stop-color="#f6f3e9"/><stop offset=".45" stop-color="#d4dce3"/><stop offset="1" stop-color="#324f64"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="35"/></filter><pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".5" fill="#fff" opacity=".16"/></pattern></defs><rect width="1000" height="900" fill="url(#bg)"/><circle cx="840" cy="110" r="280" fill="#ffffff" opacity=".12"/><path d="M0 640 Q450 450 1000 620 V900 H0Z" fill="#324f64" opacity=".12"/><ellipse cx="525" cy="733" rx="220" ry="45" fill="#324f64" opacity=".35" filter="url(#shadow)"/><rect x="262" y="590" width="490" height="150" rx="20" fill="url(#orb)"/><ellipse cx="510" cy="590" rx="245" ry="55" fill="#d4dce3"/><g transform="translate(490 360) rotate(-24)"><ellipse rx="175" ry="205" fill="url(#orb)"/><ellipse rx="93" ry="122" fill="#324f64"/><ellipse cx="14" cy="-4" rx="75" ry="107" fill="url(#bg)"/><path d="M-137 -126 C-220 50 -60 230 125 115" stroke="#f6f3e9" opacity=".35" stroke-width="7" fill="none"/></g><rect width="1000" height="900" fill="url(#grain)"/><text x="55" y="840" font-family="Arial" letter-spacing="5" font-size="12" fill="#324f64">YUGANTAR / CREATIVE STUDY 003</text></svg>
````

public/samples/study-4.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="900" viewBox="0 0 1000 900"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#dcd1e2"/><stop offset="1" stop-color="#9d81ad"/></linearGradient><linearGradient id="orb" x2=".9" y2="1"><stop stop-color="#f6f3e9"/><stop offset=".45" stop-color="#dcd1e2"/><stop offset="1" stop-color="#57466b"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="35"/></filter><pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".5" fill="#fff" opacity=".16"/></pattern></defs><rect width="1000" height="900" fill="url(#bg)"/><circle cx="840" cy="110" r="280" fill="#ffffff" opacity=".12"/><path d="M0 640 Q450 450 1000 620 V900 H0Z" fill="#57466b" opacity=".12"/><ellipse cx="525" cy="733" rx="220" ry="45" fill="#57466b" opacity=".35" filter="url(#shadow)"/><rect x="262" y="590" width="490" height="150" rx="20" fill="url(#orb)"/><ellipse cx="510" cy="590" rx="245" ry="55" fill="#dcd1e2"/><g transform="translate(490 360) rotate(-24)"><ellipse rx="175" ry="205" fill="url(#orb)"/><ellipse rx="93" ry="122" fill="#57466b"/><ellipse cx="14" cy="-4" rx="75" ry="107" fill="url(#bg)"/><path d="M-137 -126 C-220 50 -60 230 125 115" stroke="#f6f3e9" opacity=".35" stroke-width="7" fill="none"/></g><rect width="1000" height="900" fill="url(#grain)"/><text x="55" y="840" font-family="Arial" letter-spacing="5" font-size="12" fill="#57466b">YUGANTAR / CREATIVE STUDY 004</text></svg>
````

README.md

````markdown
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
````

scripts/format-source.mjs

````javascript
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const printer=ts.createPrinter({newLine:ts.NewLineKind.LineFeed});
for(const file of [...walk('src'),...walk('tests'), 'tailwind.config.ts']){
  if(!/\.tsx?$/.test(file))continue;
  const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  fs.writeFileSync(file,printer.printFile(source));
}
````

scripts/integration.mjs

````javascript
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {randomBytes} from 'node:crypto';
const base=process.argv[2]||'http://localhost:3000';
async function login(email){const r=await fetch(`${base}/api/auth/login`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password:'Demo123!'})});assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0];}
async function call(path,cookie,body){const r=await fetch(`${base}/api/${path}`,{method:body===undefined?'GET':'POST',headers:{cookie,...(body===undefined?{}:{'content-type':'application/json'})},body:body===undefined?undefined:JSON.stringify(body)});const j=await r.json();assert.equal(r.status,200,JSON.stringify(j));assert.equal(j.ok,true);return j.data;}
const brand=await login('brand1@demo.local'),creator=await login('creator1@demo.local'),otherBrand=await login('brand2@demo.local'),otherCreator=await login('creator2@demo.local');
const discovered=await call('creators',brand);assert.equal(discovered.count,10);const encoded=JSON.stringify(discovered);for(const secret of ['realName','passwordHash','creator1@demo.local','9000000000'])assert.ok(!encoded.includes(secret));
const brief=await call('briefs',brand,{title:'Acceptance campaign',description:'Unique campaign artwork for a prototype launch.',contentType:'image',style:'Editorial',aspectRatio:'1:1',requiredTools:['Midjourney'],requiredSkills:['Art direction'],budget:'1000.00',deadline:new Date(Date.now()+10*86400000).toISOString().slice(0,10),commercialUse:true,platforms:'Website',duration:'12 months',territory:'Worldwide',exclusivity:false});
const matches=await call(`match/${brief.id}`,brand);assert.equal(matches[0].creator.id,'creator-1');
await call(`briefs/${brief.id}/shortlist`,brand,{creatorId:'creator-1'});
const engagement=await call('invites',brand,{briefId:brief.id,creatorId:'creator-1',message:'Please create our launch visuals.'});
const accepted=await call(`engagements/${engagement.id}`,creator,{action:'accept'});assert.equal(accepted.contract.price,100000);assert.equal(accepted.contract.creatorPayout,90000);
const chat=await call(`messages/${engagement.id}`,creator,{text:'call me on 9876543210 or mail me at a@b.com'});assert.ok(chat.warning);const messages=await call(`messages/${engagement.id}`,brand);assert.ok(!JSON.stringify(messages).includes('9876543210'));assert.ok(!JSON.stringify(messages).includes('a@b.com'));
const form=new FormData();form.set('title','Final visual');form.set('mediaUrl','https://example.org/sample.png');const delivery=await fetch(`${base}/api/deliveries/${engagement.id}`,{method:'POST',headers:{cookie:creator},body:form});assert.equal(delivery.status,200,await delivery.text());
await call(`engagements/${engagement.id}`,brand,{action:'revision'});
const form2=new FormData();form2.set('title','Revised visual');form2.set('mediaUrl','https://example.org/revised.png');assert.equal((await fetch(`${base}/api/deliveries/${engagement.id}`,{method:'POST',headers:{cookie:creator},body:form2})).status,200);
await call(`engagements/${engagement.id}`,brand,{action:'approve'});
const payments=await Promise.all(Array.from({length:5},()=>call('payments',brand,{engagementId:engagement.id})));assert.equal(new Set(payments.map(p=>p.id)).size,1);const invoice=payments[0];assert.equal(invoice.subtotal,100000);assert.equal(invoice.platformFee,10000);assert.equal(invoice.total,110000+invoice.tax);
const bd=await call('dashboard',brand),cd=await call('dashboard',creator);assert.equal(bd.billing.filter(i=>i.engagementId===engagement.id).length,1);assert.equal(cd.billing.filter(i=>i.engagementId===engagement.id).length,1);assert.equal(cd.billing.find(i=>i.engagementId===engagement.id).net,90000);assert.ok(!('payoutId' in (await call(`engagements/${engagement.id}`,brand))));
for(const cookie of [otherBrand,creator,otherCreator]){const r=await fetch(`${base}/api/invoices/${invoice.id}`,{headers:{cookie}});assert.equal(r.status,403);const page=await fetch(`${base}/engagements/${engagement.id}/invoice`,{headers:{cookie}});assert.equal(page.status,403);}
const payout=cd.billing.find(i=>i.engagementId===engagement.id);for(const cookie of [brand,otherBrand,otherCreator]){assert.equal((await fetch(`${base}/api/payouts/${payout.id}`,{headers:{cookie}})).status,403);assert.equal((await fetch(`${base}/engagements/${engagement.id}/payout`,{headers:{cookie}})).status,403);}
for(const doc of [invoice,payout]){assert.ok(!JSON.stringify(doc).includes('@'));assert.ok(!JSON.stringify(doc).includes('Private Creator'));assert.ok(!JSON.stringify(doc).includes('Private Brand'));}
const fallback=await call('brief-builder',brand,{idea:'A video about a new product'});assert.equal(fallback.brief.contentType,'video');assert.equal((await call('creators?q=totally-unmatched',brand)).count,0);
assert.equal((await fetch(`${base}/engagements/${engagement.id}/invoice`,{headers:{cookie:brand}})).status,200);assert.equal((await fetch(`${base}/engagements/${engagement.id}/payout`,{headers:{cookie:creator}})).status,200);
const png=await sharp({create:{width:32,height:32,channels:3,background:{r:randomBytes(1)[0],g:randomBytes(1)[0],b:randomBytes(1)[0]}}}).png().toBuffer();
async function portfolio(cookie){const form=new FormData();for(const [key,value] of Object.entries({title:'Acceptance art experiment',description:'A study of geometry and carefully arranged blocks of colour.',contentType:'image',toolsUsed:'Midjourney',model:'Prototype model',seed:'42',sampler:'Euler',cfg:'7',loras:'None',controlNets:'None',promptStructure:'Shape and colour composition',license:'commercial-safe',modelSource:'Local test'}))form.set(key,value);form.set('file',new Blob([png],{type:'image/png'}),'art.png');const r=await fetch(`${base}/api/portfolio`,{method:'POST',headers:{cookie},body:form});const json=await r.json();assert.equal(r.status,200,JSON.stringify(json));return json.data;}
assert.equal((await portfolio(creator)).published,true);const duplicate=await portfolio(otherCreator);assert.equal(duplicate.published,false);assert.equal(duplicate.plagiarism.status,'Blocked (duplicate)');
console.log('HTTP acceptance passed: matching, shortlist, invite, contract, masking, revision, approval, concurrent idempotent payments, billing privacy, and document API/page 403.');
````

SECURITY.md

````markdown
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
````

src/proxy.ts

````typescript
import { NextRequest, NextResponse } from 'next/server';
export async function proxy(req: NextRequest) { const match = req.nextUrl.pathname.match(/^\/engagements\/([^/]+)\/(invoice|payout)$/); if (!match)
    return NextResponse.next(); const url = new URL(`/api/document-access/${match[1]}?kind=${match[2]}`, req.url); try {
    const check = await fetch(url, { headers: { cookie: req.headers.get('cookie') || '' }, cache: 'no-store' });
    if (check.status === 401)
        return NextResponse.redirect(new URL('/login', req.url));
    if (check.status === 403)
        return new NextResponse('<!doctype html><html lang="en"><head><title>403 — Forbidden</title></head><body style="font-family:Arial;padding:48px"><h1>403 — Forbidden</h1><p>This document belongs to another account.</p><a href="/">Back to YUGANTAR</a></body></html>', { status: 403, headers: { 'content-type': 'text/html;charset=utf-8' } });
    if (!check.ok)
        return new NextResponse('Document not found', { status: check.status });
    return NextResponse.next();
}
catch {
    return new NextResponse('Document access check unavailable', { status: 503 });
} }
export const config = { matcher: ['/engagements/:id/invoice', '/engagements/:id/payout'] };
````

tailwind.config.ts

````typescript
import type { Config } from 'tailwindcss';
export default { content: ['./src/**/*.{ts,tsx}'], darkMode: 'class', theme: { extend: {} }, plugins: [] } satisfies Config;
````

tests/core.test.ts

````typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotals, createInvoiceAndStatement, nextInvoiceNumber } from '../src/lib/billing';
import { createSeed } from '../src/data/seed';
import { maskLeaks, cleanText } from '../src/lib/leakGuard';
import { publicCreator, publicEngagement } from '../src/lib/sanitize';
import { checkPlagiarism, hamming, similarity } from '../src/lib/plagiarism';
import { rankCreators } from '../src/lib/matching';
import { filterCreators } from '../src/lib/filters';
import { parseMoney } from '../src/lib/format';
import sharp from 'sharp';
import { redactIdentities } from '../src/lib/privacy';
test('integer billing and parsing', () => { const t = calculateTotals(100000); assert.equal(t.platformFee, 10000); assert.equal(t.creatorPayout, 90000); assert.equal(t.total, 110000 + t.tax); assert.equal(parseMoney('1000.00'), 100000); assert.equal(calculateTotals(5).platformFee, 1); assert.throws(() => parseMoney('1.999')); assert.throws(() => calculateTotals(1.5)); });
test('billing is idempotent with persistent counters and no contacts', () => { const db = createSeed(), e = db.engagements[0]; const before = [db.invoices.length, db.payoutStatements.length, db.payments.length]; const a = createInvoiceAndStatement(db, e), b = createInvoiceAndStatement(db, e); assert.equal(a.invoice.id, b.invoice.id); assert.deepEqual(before, [db.invoices.length, db.payoutStatements.length, db.payments.length]); assert.notEqual(nextInvoiceNumber(db, 'INV'), nextInvoiceNumber(db, 'INV')); const docs = JSON.stringify([a.invoice, a.statement]); for (const u of db.users) {
    assert.ok(!docs.includes(u.email));
    assert.ok(!docs.includes(u.realName));
    assert.ok(!docs.includes(u.phone));
} assert.equal(a.statement.net, 90000); });
test('public projections never contain private creator fields or creator payout documents for brands', () => { const db = createSeed(), c = publicCreator(db.users[0], db); assert.ok(!('email' in c)); assert.ok(!('realName' in c)); assert.ok(!('phone' in c)); assert.ok(!('passwordHash' in c)); const e = publicEngagement(db.engagements[0], db, { id: 'brand-1', role: 'brand', alias: 'Brand' }); assert.equal(e.payoutId, undefined); assert.ok(e.invoiceId); });
test('contact leaks are masked and profile contact leaks blocked', () => { for (const value of ['call me on 9876543210', 'mail me at a@b.com', 'https://example.com', '@myhandle', 'whatsapp me', 'dm me on insta', '+91 98765 43210']) {
    assert.ok(maskLeaks(value).blocked);
    assert.throws(() => cleanText(value));
} });
test('exact file duplicate blocks publication and hamming/text similarity work', async () => { const db = createSeed(), buffer = Buffer.from('duplicate sample'), first = await checkPlagiarism(buffer, false, 'One unique audio', 'Distinct soundscape', []); db.portfolio[0].plagiarism = first; const second = await checkPlagiarism(buffer, false, 'Another title', 'Different description', db.portfolio); assert.equal(second.status, 'Blocked (duplicate)'); assert.equal(hamming('0000000000000000', 'ffffffffffffffff'), 64); assert.equal(similarity('a b c d', 'a b c d'), 1); });
test('matching and empty filters', () => { const db = createSeed(), creators = db.users.filter(u => u.role === 'creator').map(u => publicCreator(u, db)), matches = rankCreators(db.briefs[0], creators); assert.equal(matches[0].creator.id, 'creator-1'); assert.ok(matches.every(m => m.score >= 0 && m.score <= 100 && m.reasons.length === 6)); assert.equal(filterCreators(creators, new URLSearchParams({ q: 'unfindable-value' })).length, 0); assert.equal(filterCreators(creators, new URLSearchParams()).length, 10); });
test('near-image detection computes a 64-bit perceptual hash', async () => { const db = createSeed(); const a = await sharp({ create: { width: 20, height: 20, channels: 3, background: '#566778' } }).png().toBuffer(); const b = await sharp({ create: { width: 20, height: 20, channels: 3, background: '#667788' } }).png().toBuffer(); const first = await checkPlagiarism(a, true, 'Geometric landscape', 'An experimental composition', []); assert.equal(first.dhash?.length, 16); db.portfolio[0].plagiarism = first; const second = await checkPlagiarism(b, true, 'Portrait series', 'Atmospheric studio portrait', db.portfolio); assert.equal(second.status, 'Needs review'); assert.ok(second.checks.some(x => x.includes('distance 10'))); });
test('known private names are redacted in free text without altering invoice numbers or dates', () => { const db = createSeed(); assert.equal(redactIdentities('Private Creator 1 made this', db), '[hidden by YUGANTAR] made this'); assert.equal(redactIdentities('YG-INV-2026-0001', db), 'YG-INV-2026-0001'); assert.equal(redactIdentities('2026-10-09', db), '2026-10-09'); });
````

tsconfig.json

````json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "baseUrl": "."
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
````

