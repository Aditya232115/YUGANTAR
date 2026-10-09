'use client';
import { useData } from '@/lib/client';
export default function Footer() { const { data } = useData<{
    ai: string;
    aiNote: string;
}>('/api/health'); return <footer className="no-print"><span>YUGANTAR · Creativity, without boundaries.</span><span className="tag" title={data?.aiNote}>AI {data?.ai === 'live' ? 'configured' : 'fallback'} · Payments simulated</span></footer>; }
