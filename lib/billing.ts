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
