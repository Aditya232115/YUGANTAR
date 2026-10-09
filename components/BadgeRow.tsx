import type { Badges } from '@/types';
export default function BadgeRow({ badges }: {
    badges: Badges;
}) { return <div className="tags">{badges.tools && <span className="tag success">✓ Tools verified</span>}{badges.workflow && <span className="tag success">✓ Workflow verified</span>}{badges.pastWork && <span className="tag success">✓ Past work verified</span>}</div>; }
