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
