'use client';
import { useState } from 'react';
import { request, errorText } from '@/lib/client';
export default function BriefBuilderBox({ onBuild }: {
    onBuild: (data: Record<string, unknown>) => void;
}) { const [idea, setIdea] = useState(''), [busy, setBusy] = useState(false), [message, setMessage] = useState(''); return <div className="card ai-box"><span className="eyebrow">✧ YOUR CREATIVE COPILOT</span><h3>Start with an idea. We’ll shape the brief.</h3><label htmlFor="idea">What do you want to create?</label><textarea id="idea" value={idea} onChange={e => setIdea(e.target.value)} placeholder="A cinematic launch reel for our new sustainable sneaker…"/><div className="row between"><small>Works with or without an AI key.</small><button className="button" disabled={busy || !idea.trim()} onClick={async () => { setBusy(true); try {
    const r = await request<{
        brief: Record<string, unknown>;
        mode: string;
    }>('/api/brief-builder', { idea });
    onBuild(r.brief);
    setMessage(`Brief prepared with ${r.mode}. Review the fields below.`);
}
catch (e) {
    setMessage(errorText(e));
}
finally {
    setBusy(false);
} }}>{busy ? 'Building…' : 'Build my brief ↗'}</button></div><p role="status">{message}</p></div>; }
