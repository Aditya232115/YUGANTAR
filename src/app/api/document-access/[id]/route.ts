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
