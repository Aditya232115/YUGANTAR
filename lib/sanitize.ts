import type { Database, User, PublicCreator, Engagement, SessionUser, Brief, Invoice, PayoutStatement } from '@/types';
import { maskLeaks } from './leakGuard';
import { sanitizeResponse } from './privacy';
export { sanitizeResponse } from './privacy';
const safe = (s: string) => maskLeaks(s).text;
export function publicCreator(u: User, db: Database): PublicCreator {
    const portfolio = db.portfolio.filter(p => p.creatorId === u.id && p.plagiarism.status !== 'Blocked (duplicate)').map(p => ({ ...p, title: safe(p.title), description: safe(p.description), workflow: { ...p.workflow, model: safe(p.workflow.model), seed: safe(p.workflow.seed), sampler: safe(p.workflow.sampler), cfg: safe(p.workflow.cfg), loras: safe(p.workflow.loras), controlNets: safe(p.workflow.controlNets), promptStructure: safe(p.workflow.promptStructure), modelSource: safe(p.workflow.modelSource) } }));
    const result: PublicCreator = { id: u.id, alias: u.alias, avatarColor: u.avatarColor, headline: safe(u.headline), bio: safe(u.bio), specialization: u.specialization.map(safe), skills: u.skills.map(safe), tools: u.tools.map(safe), contentTypes: u.contentTypes, rate: u.rate, turnaroundDays: u.turnaroundDays, portfolio, badges: { tools: u.tools.length > 0 && portfolio.length > 0 && u.tools.every(t => portfolio.some(p => p.toolsUsed.includes(t))), workflow: portfolio.some(p => Object.values(p.workflow).every(v => v.trim().length > 0)), pastWork: db.engagements.some(e => e.creatorId === u.id && e.status === 'Delivered') } };
    return sanitizeResponse(result, db) as PublicCreator;
}
export function publicBrief(b: Brief): Brief { return { ...b, title: safe(b.title), description: safe(b.description) }; }
export function publicEngagement(e: Engagement, db: Database, user: SessionUser) { const creator = db.users.find(u => u.id === e.creatorId)!, brand = db.users.find(u => u.id === e.brandId)!; return { ...e, message: safe(e.message), creatorAlias: creator.alias, companyName: e.status === 'Invited' ? 'Brand on YUGANTAR' : safe(brand.companyName), brief: publicBrief(db.briefs.find(b => b.id === e.briefId)!), invoiceId: user.role === 'brand' ? db.invoices.find(i => i.engagementId === e.id)?.id : undefined, payoutId: user.role === 'creator' ? db.payoutStatements.find(i => i.engagementId === e.id)?.id : undefined }; }
export function invoiceData(i: Invoice): Invoice { return { ...i, companyName: safe(i.companyName), creatorAlias: safe(i.creatorAlias), briefTitle: safe(i.briefTitle) }; }
export function payoutData(p: PayoutStatement): PayoutStatement { return { ...p, companyName: safe(p.companyName), briefTitle: safe(p.briefTitle) }; }
