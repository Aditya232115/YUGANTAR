'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SessionUser, PublicCreator, Brief, Engagement, Invoice, PayoutStatement, PortfolioItem, Match } from '@/types';
import { useData, request, errorText } from '@/lib/client';
import { money, moneyInput } from '@/lib/format';
import CreatorCard from './CreatorCard';
import BadgeRow from './BadgeRow';
import EmptyState from './EmptyState';
import FilterBar from './FilterBar';
import WorkflowModal from './WorkflowModal';
import MatchScoreCard from './MatchScoreCard';
import StatusStepper from './StatusStepper';
import ChatBox from './ChatBox';
import UploadForm from './UploadForm';
import BillingList from './BillingList';
import PayButton from './PayButton';
export function Heading({ label, title, text, action }: {
    label: string;
    title: string;
    text?: string;
    action?: React.ReactNode;
}) { return <div className="page-heading"><div><span className="eyebrow">{label}</span><h1>{title}</h1>{text && <p className="muted">{text}</p>}</div>{action}</div>; }
function State({ loading, error }: {
    loading: boolean;
    error: string;
}) { return loading ? <div className="empty" role="status">Loading your workspace…</div> : error ? <div className="notice error" role="alert">{error} <Link href="/login">Go to login →</Link></div> : null; }
export function AuthView({ signup = false, initialRole = 'creator' }: {
    signup?: boolean;
    initialRole?: string;
}) { const [role, setRole] = useState(initialRole), [error, setError] = useState(''), [busy, setBusy] = useState(false), router = useRouter(); return <div className="auth-layout"><div className="auth-story"><span className="eyebrow">A NEW ERA OF CREATIVE COLLABORATION</span><h1>Your talent.<br />Their vision.<br /><em>One platform.</em></h1><p>Build something extraordinary, with privacy at the heart of every collaboration.</p><img src="/samples/study-1.svg" alt="Abstract creative artwork"/></div><div><Heading label="WELCOME TO YUGANTAR" title={signup ? 'Create your account' : 'Good to see you again'} text={signup ? 'Your public identity is an alias. Your contact details stay private.' : 'Log in to your creative workspace.'}/><form className="card stack" onSubmit={async (e) => { e.preventDefault(); const b = Object.fromEntries(new FormData(e.currentTarget)); setBusy(true); setError(''); try {
    const u = await request<SessionUser>(`/api/auth/${signup ? 'signup' : 'login'}`, { ...b, role });
    router.push(`/${u.role}/dashboard`);
    router.refresh();
}
catch (e) {
    setError(errorText(e));
}
finally {
    setBusy(false);
} }}>{signup && <><label>I am a<select value={role} onChange={e => setRole(e.target.value)}><option value="creator">Creator</option><option value="brand">Brand / agency</option></select></label><label>Real name (private)<input name="realName" required maxLength={120}/></label><label>Phone (private)<input name="phone" required maxLength={30}/></label>{role === 'brand' && <><label>Company name<input name="companyName" required maxLength={120}/></label><label>Industry<input name="industry" required maxLength={120}/></label></>}</>}<label>Email (private)<input name="email" type="email" required autoComplete="email"/></label><label>Password<input name="password" type="password" minLength={8} maxLength={128} required autoComplete={signup ? 'new-password' : 'current-password'}/></label>{error && <p className="error" role="alert">{error}</p>}<button className="button" disabled={busy}>{busy ? 'Please wait…' : signup ? 'Create account →' : 'Log in →'}</button><p className="muted">{signup ? 'Already a member?' : 'New here?'} <Link href={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create an account'}</Link></p></form>{!signup && <div className="notice"><strong>Try a demo account</strong><p>Brand: brand1@demo.local<br />Creator: creator1@demo.local<br />Password: Demo123!</p><small>Also available: brand2–4 and creator2–10, with the same password.</small></div>}</div></div>; }
export function DiscoverView() { const [filters, setFilters] = useState<Record<string, string>>({}), query = new URLSearchParams(filters).toString(), { data, error, loading } = useData<{
    creators: PublicCreator[];
    count: number;
    alternatives: PublicCreator[];
}>(`/api/creators?${query}`); return <><Heading label="THE CREATIVE COMMUNITY" title="Find your next creative partner" text="Exceptional AI talent. Verified workflows. A shared ambition."/><FilterBar value={filters} onChange={setFilters}/><State loading={loading} error={error}/>{data && <><p className="result-count">{data.count} creators found <button className="link-button" onClick={() => setFilters({})}>Reset filters</button></p>{!data.count ? <><EmptyState message="No creators match these filters" clear={() => setFilters({})}/><h2>Creators to explore</h2><div className="grid creators">{data.alternatives.map(c => <CreatorCard key={c.id} creator={c}/>)}</div></> : <div className="grid creators">{data.creators.map(c => <CreatorCard key={c.id} creator={c}/>)}</div>}</>}</>; }
export function CreatorView({ alias }: {
    alias: string;
}) { const { data: c, error, loading } = useData<PublicCreator>(`/api/creators/${encodeURIComponent(alias)}`), [selected, setSelected] = useState<PortfolioItem | null>(null); return <><State loading={loading} error={error}/>{c && <><div className="profile-hero card"><span className="avatar large" style={{ background: c.avatarColor }}>YG</span><div><span className="eyebrow">INDEPENDENT AI CREATOR</span><h1>{c.alias}</h1><h3>{c.headline}</h3><p>{c.bio}</p><BadgeRow badges={c.badges}/></div><div><strong>{money(c.rate)}</strong><p className="muted">Starting rate · {c.turnaroundDays} day turnaround</p><Link className="button" href="/brand/briefs">Invite to a brief →</Link></div></div><div className="card"><h3>Creative toolkit</h3><div className="tags">{[...c.skills, ...c.tools, ...c.specialization, ...c.contentTypes].map((s, i) => <span className="tag" key={i}>{s}</span>)}</div></div><Heading label="SELECTED WORK" title="The portfolio" text="Open any piece to inspect its proof of workflow."/>{c.portfolio.length ? <div className="grid creators">{c.portfolio.map(p => <article className="card portfolio-card" key={p.id}><Media url={p.mediaUrl} type={p.contentType}/><div className="card-body"><h3>{p.title}</h3><p className="muted">{p.description}</p><span className="tag">{p.plagiarism.status === 'Needs review' ? 'Under review' : p.plagiarism.status}</span><button className="button secondary" onClick={() => setSelected(p)}>View workflow ↗</button></div></article>)}</div> : <EmptyState message="Portfolio coming soon"/>}{selected && <WorkflowModal item={selected} close={() => setSelected(null)}/>}</>}</>; }
export function Media({ url, type }: {
    url: string;
    type: string;
}) { return type === 'video' ? <video src={url} controls preload="metadata"/> : type === 'audio' ? <audio src={url} controls preload="metadata"/> : <img src={url} alt="Creative work" loading="lazy" referrerPolicy="no-referrer"/>; }
type Dashboard = {
    user: SessionUser;
    engagements: (Engagement & {
        creatorAlias: string;
        companyName: string;
        brief: Brief;
    })[];
    briefs: Brief[];
    billing: (Invoice | PayoutStatement)[];
    earnings: number;
};
export function DashboardView() { const { data, error, loading } = useData<Dashboard>('/api/dashboard'); return <><State loading={loading} error={error}/>{data && <><Heading label="YOUR WORKSPACE" title={data.user.role === 'brand' ? 'Let’s bring your next idea to life' : 'Your creative studio'} text={`Welcome back, ${data.user.alias}.`} action={<Link className="button" href={data.user.role === 'brand' ? '/brand/briefs/new' : '/creator/portfolio/new'}>{data.user.role === 'brand' ? '+ Create a brief' : '+ Add portfolio work'}</Link>}/><div className="grid stats"><div className="card"><span className="muted">Active collaborations</span><strong>{data.engagements.filter(e => !['Invited', 'Declined', 'Delivered'].includes(e.status)).length}</strong></div><div className="card"><span className="muted">{data.user.role === 'brand' ? 'Open briefs' : 'Incoming invitations'}</span><strong>{data.user.role === 'brand' ? data.briefs.filter(b => b.status === 'Open').length : data.engagements.filter(e => e.status === 'Invited').length}</strong></div><div className="card"><span className="muted">{data.user.role === 'brand' ? 'Paid documents' : 'Simulated earnings'}</span><strong>{data.user.role === 'brand' ? data.billing.length : money(data.earnings)}</strong></div></div><section className="card"><div className="row between"><h2>Collaborations & chats</h2><Link href={data.user.role === 'brand' ? '/brand/briefs' : '/creator/profile'}>{data.user.role === 'brand' ? 'View all briefs →' : 'Edit profile →'}</Link></div>{!data.engagements.length ? <EmptyState message="Your next collaboration starts here"/> : <div className="list">{data.engagements.map(e => <Link className="list-item" key={e.id} href={`/engagements/${e.id}`}><div><strong>{e.brief.title}</strong><p className="muted">{data.user.role === 'brand' ? e.creatorAlias : e.companyName}</p></div><span className="tag">{e.status}</span><span>Open workspace ↗</span></Link>)}</div>}</section><BillingList role={data.user.role} items={data.billing}/>{data.user.role === 'brand' && <BrandProfile />}</>}</>; }
function BrandProfile() { const { data, reload } = useData<{
    companyName: string;
    industry: string;
}>('/api/profile'), [message, setMessage] = useState(''); if (!data)
    return null; return <form className="card form-grid" onSubmit={async (e) => { e.preventDefault(); try {
    await request('/api/profile', Object.fromEntries(new FormData(e.currentTarget)));
    setMessage('Brand profile saved.');
    await reload();
}
catch (e) {
    setMessage(errorText(e));
} }}><h2 className="wide">Brand profile</h2><label>Company name<input name="companyName" defaultValue={data.companyName} required/></label><label>Industry<input name="industry" defaultValue={data.industry} required/></label><button className="button">Save profile</button><p role="status">{message}</p></form>; }
export function ProfileView() { const { data, error, loading } = useData<PublicCreator>('/api/profile'), [message, setMessage] = useState(''), [busy, setBusy] = useState(false); return <><Heading label="YOUR PUBLIC IDENTITY" title="Build your creator profile" text="Brands see your alias and your work. Keep contact details out of public fields."/><State loading={loading} error={error}/>{data && <form className="card form-grid" onSubmit={async (e) => { e.preventDefault(); setBusy(true); try {
    await request('/api/profile', Object.fromEntries(new FormData(e.currentTarget)));
    setMessage('Profile saved.');
}
catch (e) {
    setMessage(errorText(e));
}
finally {
    setBusy(false);
} }}><h2 className="wide">{data.alias}</h2><label className="wide">Headline<input name="headline" defaultValue={data.headline} required/></label><label className="wide">Bio<textarea name="bio" defaultValue={data.bio} required/></label>{[['skills', 'Skills', data.skills.join(', ')], ['tools', 'Tools', data.tools.join(', ')], ['specialization', 'Specializations', data.specialization.join(', ')], ['contentTypes', 'Content types', data.contentTypes.join(', ')], ['rate', 'Starting rate (₹)', moneyInput(data.rate)], ['turnaroundDays', 'Turnaround days', String(data.turnaroundDays)]].map(([name, label, value]) => <label key={name}>{label}<input name={name} defaultValue={value} required/></label>)}<p className="wide muted">Separate lists with commas. Tools can include ComfyUI, Runway, Midjourney, ElevenLabs, Suno, Pika, Kling, Stable Diffusion, AnimateDiff, Sora and HeyGen. Content types: image, video, audio, animation.</p><button disabled={busy} className="button">{busy ? 'Saving…' : 'Save profile →'}</button><p role="status">{message}</p><Link href={`/creators/${encodeURIComponent(data.alias)}`}>View public profile ↗</Link></form>}</>; }
export function BriefsView() { const { data, error, loading } = useData<Brief[]>('/api/briefs'); return <><Heading label="YOUR PROJECTS" title="My briefs" text="From the first spark to final delivery." action={<Link className="button" href="/brand/briefs/new">+ Create a brief</Link>}/><State loading={loading} error={error}/>{data?.length === 0 && <EmptyState message="You haven’t posted a brief yet"/>}{data?.map(b => <article className="card" key={b.id}><div className="row between"><Link href={`/brand/briefs/${b.id}`}><h2>{b.title} ↗</h2></Link><strong>{money(b.budget)}</strong></div><p className="muted">{b.description}</p><StatusStepper status={b.status}/></article>)}</>; }
export function BriefDetail({ id }: {
    id: string;
}) { const { data: b, error, loading, reload } = useData<Brief>(`/api/briefs/${id}`), matches = useData<Match[]>(`/api/match/${id}`); return <><State loading={loading} error={error}/>{b && <><Heading label="PROJECT BRIEF" title={b.title} text={b.description}/><div className="card"><div className="tags"><span className="tag">{b.contentType}</span><span className="tag">{b.aspectRatio}</span><span className="tag">{money(b.budget)}</span><span className="tag">Due {b.deadline}</span></div><p>{b.style} · Usage: {b.platforms}, {b.duration}, {b.territory}{b.exclusivity ? ', exclusive' : ''}</p><StatusStepper status={b.status}/></div><Heading label="MATCHED TO YOUR VISION" title="Your creator matches" text="Ranked by tools, skills, budget, timing and commercial compatibility."/><State loading={matches.loading} error={matches.error}/>{matches.data?.length === 0 && <EmptyState message="No creators available"/>}<div className="match-grid">{matches.data?.map(m => <MatchScoreCard key={m.creator.id} match={m} briefId={id} shortlisted={b.shortlist.includes(m.creator.id)} onShortlist={() => void reload()}/>)}</div></>}</>; }
type EngagementDetail = Engagement & {
    creatorAlias: string;
    companyName: string;
    brief: Brief;
    invoiceId?: string;
    payoutId?: string;
};
export function EngagementView({ id }: {
    id: string;
}) { const { data: e, error, loading, reload } = useData<EngagementDetail>(`/api/engagements/${id}`), { data: user } = useData<SessionUser>('/api/auth/me'), [message, setMessage] = useState(''), [busy, setBusy] = useState(false); async function action(action: string) { setBusy(true); try {
    await request(`/api/engagements/${id}`, { action });
    await reload();
}
catch (err) {
    setMessage(errorText(err));
}
finally {
    setBusy(false);
} } return <><State loading={loading} error={error}/>{e && user && <><Heading label="COLLABORATION WORKSPACE" title={e.brief.title} text={`${e.creatorAlias} · ${e.companyName}`}/><div className="card"><div className="row between"><h2>Project status</h2><span className="tag">{e.status}</span></div><StatusStepper status={e.status}/><p>{e.message}</p>{e.status === 'Invited' && user.role === 'creator' && <div className="row"><button disabled={busy} className="button" onClick={() => void action('accept')}>Accept invite</button><button disabled={busy} className="button secondary" onClick={() => void action('decline')}>Decline</button></div>}{e.status === 'Invited' && user.role === 'brand' && <p className="muted">Waiting for the creator to accept. Chat opens on acceptance.</p>}{e.contract && <div className="contract grid stats"><div><span>Contract amount</span><strong>{money(e.contract.price)}</strong></div><div><span>Platform fee</span><strong>{money(e.contract.platformFee)}</strong></div><div><span>Creator payout</span><strong>{money(e.contract.creatorPayout)}</strong></div></div>}{message && <p className="error" role="alert">{message}</p>}</div>{e.deliveries.length > 0 && <div className="card"><h2>Deliveries</h2>{e.deliveries.map(d => <div className="delivery" key={d.id}><strong>{d.title}</strong><a href={d.mediaUrl} target="_blank" rel="noreferrer">Open delivery ↗</a></div>)}{user.role === 'brand' && ['In Progress', 'Revision'].includes(e.status) && <div className="row"><button disabled={busy} className="button" onClick={() => void action('approve')}>Approve delivery</button><button disabled={busy} className="button secondary" onClick={() => void action('revision')}>Request revision</button></div>}</div>}{user.role === 'creator' && ['In Progress', 'Revision'].includes(e.status) && <UploadForm engagementId={id} onDone={() => void reload()}/>}<div className="card"><h2>Payments & documents</h2>{e.status === 'Approved' && user.role === 'brand' && <><p>Approval complete. Simulate payment to generate the invoice and creator statement.</p><PayButton engagementId={id} onPaid={() => void reload()}/></>}{e.invoiceId && <Link className="button secondary" href={`/engagements/${id}/invoice`}>Open brand invoice ↗</Link>}{e.payoutId && <Link className="button secondary" href={`/engagements/${id}/payout`}>Open payout statement ↗</Link>}{!e.invoiceId && !e.payoutId && e.status !== 'Approved' && <p className="muted">Documents appear after approval and simulated payment.</p>}{e.status === 'Approved' && user.role === 'creator' && <p className="muted">Delivery approved. Waiting for the brand’s simulated payment.</p>}</div>{!['Invited', 'Declined'].includes(e.status) && <ChatBox engagementId={id}/>}</>}</>; }
