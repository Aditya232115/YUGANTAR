'use client';
import { useState } from 'react';
import { request, errorText } from '@/lib/client';
import type { PlagiarismCheck } from '@/types';
import PlagiarismResult from './PlagiarismResult';
export default function UploadForm({ engagementId, onDone }: {
    engagementId?: string;
    onDone?: () => void;
}) { const [result, setResult] = useState<PlagiarismCheck | null>(null), [message, setMessage] = useState(''), [busy, setBusy] = useState(false); return <form className="card form-grid" onSubmit={async (e) => { e.preventDefault(); const form = new FormData(e.currentTarget); setBusy(true); setMessage(''); try {
    if (engagementId) {
        await request(`/api/deliveries/${engagementId}`, form);
        setMessage('Delivery uploaded. The brand can now review it.');
        onDone?.();
    }
    else {
        const r = await request<{
            published: boolean;
            plagiarism: PlagiarismCheck;
        }>('/api/portfolio', form);
        setResult(r.plagiarism);
        setMessage(r.published ? 'Published to your portfolio.' : 'Duplicate blocked; item was not published.');
    }
}
catch (e) {
    setMessage(errorText(e));
}
finally {
    setBusy(false);
} }}><h2 className="wide">{engagementId ? 'Upload delivery' : 'Add a portfolio piece'}</h2><label className="wide">Title<input name="title" required maxLength={120}/></label><label>Upload media (max 20 MB)<input type="file" name="file" accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm,audio/mpeg,audio/wav,audio/ogg"/></label><label>Or HTTPS media URL<input type="url" name="mediaUrl" placeholder="https://…"/></label>{!engagementId && <><label className="wide">Description<textarea name="description" required/></label><label>Content type<select name="contentType">{['image', 'video', 'audio', 'animation'].map(t => <option key={t}>{t}</option>)}</select></label><label>Tools used (comma separated)<input name="toolsUsed" required placeholder="ComfyUI, Midjourney"/></label><h3 className="wide">Proof of workflow</h3>{[['model', 'Model / checkpoint'], ['seed', 'Seed'], ['sampler', 'Sampler'], ['cfg', 'CFG'], ['loras', 'LoRAs (or None)'], ['controlNets', 'ControlNets (or None)'], ['promptStructure', 'Prompt structure'], ['modelSource', 'Model source (text; no URL)']].map(([name, label]) => <label key={name}>{label}<input name={name}/></label>)}<label>License<select name="license"><option value="commercial-safe">Commercial-safe</option><option value="non-commercial">Non-commercial</option></select></label><p className="muted wide">Uploads are checked for platform duplicates before publication. URL media receive text checks only. Contact details in titles, descriptions and workflow are blocked.</p></>}<button disabled={busy} className="button wide">{busy ? 'Checking & uploading…' : engagementId ? 'Submit delivery →' : 'Check & publish →'}</button>{message && <p className="wide notice-text" role="status">{message}</p>}{result && <div className="wide"><PlagiarismResult result={result}/></div>}</form>; }
