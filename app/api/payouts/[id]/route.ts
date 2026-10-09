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
