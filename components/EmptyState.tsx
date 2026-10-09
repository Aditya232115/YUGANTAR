export default function EmptyState({ message = 'Nothing here yet.', clear }: {
    message?: string;
    clear?: () => void;
}) { return <div className="empty"><div className="empty-icon">◇</div><h3>{message}</h3><p className="muted">Start a new collaboration or explore the creator community.</p>{clear && <button className="button secondary" onClick={clear}>Clear filters</button>}</div>; }
