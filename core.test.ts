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
