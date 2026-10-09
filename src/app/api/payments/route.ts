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
