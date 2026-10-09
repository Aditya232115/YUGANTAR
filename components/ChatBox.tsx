'use client';
import { useEffect, useState } from 'react';
import { useData, request, errorText } from '@/lib/client';
type ChatMessage = {
    id: string;
    text: string;
    createdAt: string;
    senderAlias: string;
    mine: boolean;
};
export default function ChatBox({ engagementId }: {
    engagementId: string;
}) { const { data, error, loading, reload } = useData<ChatMessage[]>(`/api/messages/${engagementId}`), [text, setText] = useState(''), [notice, setNotice] = useState(''), [busy, setBusy] = useState(false); useEffect(() => { const timer = setInterval(() => void reload(), 3000); return () => clearInterval(timer); }, [reload]); return <section className="card chat"><div className="row between"><h2>Project chat</h2><span className="tag success">Private workspace</span></div><p className="muted">Keep communication here. Contact details are hidden automatically.</p><div className="messages" aria-live="polite">{loading && <p>Loading chat…</p>}{error && <p className="error">{error}</p>}{data?.length === 0 && <p className="muted">Start the conversation.</p>}{data?.map(m => <div key={m.id} className={`bubble ${m.mine ? 'mine' : ''}`}><strong>{m.senderAlias}</strong><p>{m.text}</p><small>{new Date(m.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</small></div>)}</div><form onSubmit={async (e) => { e.preventDefault(); setBusy(true); try {
    const r = await request<{
        warning: string;
    }>(`/api/messages/${engagementId}`, { text });
    setNotice(r.warning);
    setText('');
    await reload();
}
catch (e) {
    setNotice(errorText(e));
}
finally {
    setBusy(false);
} }}><label htmlFor="chat-text">Message<textarea id="chat-text" value={text} onChange={e => setText(e.target.value)} maxLength={3000} required/></label><button disabled={busy || !text.trim()} className="button">{busy ? 'Sending…' : 'Send message →'}</button><p role="status" className="notice-text">{notice}</p></form></section>; }
