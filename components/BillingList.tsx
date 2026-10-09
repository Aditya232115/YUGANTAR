import Link from 'next/link';
import type { Invoice, PayoutStatement } from '@/types';
import { money, date } from '@/lib/format';
import EmptyState from './EmptyState';
export default function BillingList({ items, role }: {
    items: (Invoice | PayoutStatement)[];
    role: 'brand' | 'creator';
}) { return <section className="card"><h2>Billing</h2><p className="muted">Your simulated payments and printable documents.</p>{!items.length ? <EmptyState message="No billing documents yet"/> : <div className="table-wrap"><table><thead><tr><th>Document</th><th>Project</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{items.map(i => <tr key={i.id}><td><Link href={`/engagements/${i.engagementId}/${role === 'brand' ? 'invoice' : 'payout'}`}>{i.number} ↗</Link></td><td>{i.briefTitle}</td><td>{date('issuedAt' in i ? i.issuedAt : i.date)}</td><td>{money('total' in i ? i.total : i.net)}</td><td><span className="tag success">{i.status}</span></td></tr>)}</tbody></table></div>}</section>; }
