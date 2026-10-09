import Link from 'next/link';
import type { PublicCreator } from '@/types';
import { money } from '@/lib/format';
import BadgeRow from './BadgeRow';
export default function CreatorCard({ creator: c }: {
    creator: PublicCreator;
}) { return <article className="card creator-card"><div className="creator-cover"><img src={c.portfolio[0]?.mediaUrl || '/samples/study-1.svg'} alt="Creator portfolio preview"/></div><div className="card-body"><div className="row"><span className="avatar" style={{ background: c.avatarColor }}>YG</span><div><Link className="strong" href={`/creators/${encodeURIComponent(c.alias)}`}>{c.alias}</Link><p className="muted">{c.headline || 'Independent AI creator'}</p></div></div><BadgeRow badges={c.badges}/><div className="tags">{c.tools.slice(0, 3).map(t => <span className="tag" key={t}>{t}</span>)}</div><div className="card-bottom"><span>From <strong>{money(c.rate)}</strong></span><span className="muted">{c.turnaroundDays} days</span></div></div></article>; }
