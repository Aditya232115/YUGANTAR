'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Match } from '@/types';
import CreatorCard from './CreatorCard';
import { request, errorText } from '@/lib/client';
export default function MatchScoreCard({ match, briefId, shortlisted, onShortlist }: {
    match: Match;
    briefId: string;
    shortlisted: boolean;
    onShortlist: () => void;
}) { const router = useRouter(), [message, setMessage] = useState('I would love to collaborate on this brief.'), [error, setError] = useState(''), [busy, setBusy] = useState(false); return <div className="match-card"><CreatorCard creator={match.creator}/><div className="match-detail"><strong className="score">{match.score}% match</strong><ul>{match.reasons.map(r => <li key={r}>{r}</li>)}</ul>{match.conflicts.map(c => <p className="error" key={c}>{c}</p>)}<label>Invite message<input value={message} onChange={e => setMessage(e.target.value)} maxLength={1000}/></label><div className="row"><button disabled={busy || shortlisted} className="button secondary" onClick={async () => { setBusy(true); try {
    await request(`/api/briefs/${briefId}/shortlist`, { creatorId: match.creator.id });
    onShortlist();
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}>{shortlisted ? 'Shortlisted ✓' : 'Shortlist'}</button><button disabled={busy} className="button" onClick={async () => { setBusy(true); try {
    const e = await request<{
        id: string;
    }>('/api/invites', { briefId, creatorId: match.creator.id, message });
    router.push(`/engagements/${e.id}`);
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}>Invite creator →</button></div>{error && <p className="error" role="alert">{error}</p>}</div></div>; }
