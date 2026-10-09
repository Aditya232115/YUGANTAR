'use client';
import { useEffect, useState, useCallback } from 'react';
export async function request<T>(url: string, body?: unknown): Promise<T> { const response = await fetch(url, { method: body === undefined ? 'GET' : 'POST', headers: body instanceof FormData ? undefined : body === undefined ? undefined : { 'content-type': 'application/json' }, body: body instanceof FormData ? body : body === undefined ? undefined : JSON.stringify(body), cache: 'no-store' }); const result = await response.json() as {
    ok: boolean;
    data: T;
    error?: string;
}; if (!result.ok)
    throw new Error(result.error || 'Request failed'); return result.data; }
export function useData<T>(url: string) { const [data, setData] = useState<T | null>(null), [error, setError] = useState(''), [loading, setLoading] = useState(true); const reload = useCallback(async () => { try {
    setError('');
    setData(await request<T>(url));
}
catch (e) {
    setError(e instanceof Error ? e.message : 'Request failed');
}
finally {
    setLoading(false);
} }, [url]); useEffect(() => { setLoading(true); void reload(); }, [reload]); return { data, error, loading, reload }; }
export const errorText = (e: unknown) => e instanceof Error ? e.message : 'Request failed';
