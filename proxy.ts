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
