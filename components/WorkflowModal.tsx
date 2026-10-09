'use client';
import { useEffect, useRef } from 'react';
import type { PortfolioItem } from '@/types';
import PlagiarismResult from './PlagiarismResult';
export default function WorkflowModal({ item, close }: {
    item: PortfolioItem;
    close: () => void;
}) { const ref = useRef<HTMLDialogElement>(null); useEffect(() => { ref.current?.showModal(); }, []); return <dialog ref={ref} onCancel={close} className="modal"><div className="row between"><h2>Proof of workflow</h2><button onClick={close} aria-label="Close workflow">✕</button></div><h3>{item.title}</h3><dl className="details">{Object.entries(item.workflow).map(([k, v]) => <div key={k}><dt>{k.replace(/([A-Z])/g, ' $1')}</dt><dd>{v || 'Not supplied'}</dd></div>)}</dl><p>Tools: {item.toolsUsed.join(', ') || 'Not declared'}</p><PlagiarismResult result={item.plagiarism}/></dialog>; }
