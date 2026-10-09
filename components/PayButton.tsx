'use client';
import { useState } from 'react';
import { request, errorText } from '@/lib/client';
export default function PayButton({ engagementId, onPaid }: {
    engagementId: string;
    onPaid: () => void;
}) { const [busy, setBusy] = useState(false), [error, setError] = useState(''); return <div><button disabled={busy} className="button" onClick={async () => { setBusy(true); try {
    await request('/api/payments', { engagementId });
    onPaid();
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}>{busy ? 'Generating documents…' : 'Pay now (simulated)'}</button>{error && <p className="error">{error}</p>}</div>; }
