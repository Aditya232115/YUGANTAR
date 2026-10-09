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
