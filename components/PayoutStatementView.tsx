import type { PayoutStatement } from '@/types';
import { money, date } from '@/lib/format';
import { PLATFORM_FEE_PERCENT } from '@/lib/billing';
import DocumentActions from './DocumentActions';
export default function PayoutStatementView({ statement: p }: {
    statement: PayoutStatement;
}) { return <><DocumentActions name={p.number}/><article className="document" id="billing-document"><div className="document-head"><strong>YUGANTAR</strong><h1>PAYOUT STATEMENT</h1></div><p className="document-note">Prototype document, not a tax invoice</p><dl className="details"><div><dt>Statement number</dt><dd>{p.number}</dd></div><div><dt>Date</dt><dd>{date(p.date)}</dd></div><div><dt>Brief</dt><dd>{p.briefTitle}</dd></div><div><dt>Brand company</dt><dd>{p.companyName}</dd></div><div><dt>Status</dt><dd>{p.status}</dd></div></dl><dl className="totals"><div><dt>Gross contract amount</dt><dd>{money(p.gross)}</dd></div><div><dt>Platform fee ({PLATFORM_FEE_PERCENT}%)</dt><dd>−{money(p.platformFee)}</dd></div><div className="grand"><dt>Net payout to creator</dt><dd>{money(p.net)}</dd></div></dl><p className="document-note document-footer">Payments are simulated in this prototype.</p></article></>; }
