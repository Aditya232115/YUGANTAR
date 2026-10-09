'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { request, errorText } from '@/lib/client';
import BriefBuilderBox from './BriefBuilderBox';
export default function BriefForm() { const router = useRouter(), [error, setError] = useState(''), [busy, setBusy] = useState(false), [values, setValues] = useState<Record<string, string | boolean>>({ title: '', description: '', contentType: 'image', style: '', aspectRatio: '9:16', requiredTools: '', requiredSkills: '', budget: '1000.00', deadline: '', commercialUse: true, platforms: 'Social and website', duration: '12 months', territory: 'Worldwide', exclusivity: false }); function update(k: string, v: string | boolean) { setValues(x => ({ ...x, [k]: v })); } return <><BriefBuilderBox onBuild={data => setValues(x => ({ ...x, ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : typeof v === 'boolean' ? v : String(v)])) }))}/><form className="card form-grid" onSubmit={async (e) => { e.preventDefault(); setBusy(true); setError(''); try {
    const b = await request<{
        id: string;
    }>('/api/briefs', values);
    router.push(`/brand/briefs/${b.id}`);
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}><h2 className="wide">Tell us about your project</h2>{[['title', 'Brief title'], ['description', 'Problem / requirement'], ['style', 'Visual style'], ['requiredTools', 'Required tools (comma separated)'], ['requiredSkills', 'Required skills (comma separated)'], ['budget', 'Contract budget (₹)'], ['deadline', 'Deadline'], ['platforms', 'Usage platforms'], ['duration', 'Usage duration'], ['territory', 'Usage territory']].map(([k, label]) => <label key={k} className={k === 'description' ? 'wide' : ''}>{label}{k === 'description' ? <textarea required value={String(values[k])} onChange={e => update(k, e.target.value)}/> : <input required={!['requiredTools', 'requiredSkills'].includes(k)} type={k === 'deadline' ? 'date' : 'text'} value={String(values[k])} onChange={e => update(k, e.target.value)}/>}</label>)}<label>Content type<select value={String(values.contentType)} onChange={e => update('contentType', e.target.value)}>{['image', 'video', 'audio', 'animation'].map(t => <option key={t}>{t}</option>)}</select></label><label>Aspect ratio<select value={String(values.aspectRatio)} onChange={e => update('aspectRatio', e.target.value)}>{['9:16', '16:9', '1:1', '4:5'].map(t => <option key={t}>{t}</option>)}</select></label>{[['commercialUse', 'Commercial use required'], ['exclusivity', 'Exclusive use required']].map(([k, label]) => <label className="checkbox" key={k}><input type="checkbox" checked={Boolean(values[k])} onChange={e => update(k, e.target.checked)}/>{label}</label>)}<p className="wide muted">At acceptance, the budget becomes the contract amount. The billing policy adds a platform fee to the brand payment and deducts it from the creator payout. Payments are simulated.</p>{error && <p className="error wide" role="alert">{error}</p>}<button disabled={busy} className="button wide">{busy ? 'Saving…' : 'Publish brief & find matches →'}</button></form></>; }
