const stages = ['Open', 'Shortlisted', 'In Progress', 'Revision', 'Delivered'];
export default function StatusStepper({ status }: {
    status: string;
}) { const active = status === 'Approved' ? 2 : status === 'Invited' ? 1 : stages.indexOf(status); return <ol className="stepper" aria-label={`Status: ${status}`}>{stages.map((s, i) => <li key={s} className={i <= active ? 'complete' : ''}><span>{i + 1}</span>{s}</li>)}</ol>; }
