import { NextRequest } from 'next/server';
import { randomUUID, randomInt } from 'node:crypto';
import { readDb, mutateDb } from './db';
import { hashPassword, verifyPassword, setSession, logout, getSession } from './auth';
import { requireUser, requireOwner, body, text, list, HttpError } from './http';
import { cleanText, maskLeaks } from './leakGuard';
import { publicCreator, publicBrief, publicEngagement, invoiceData, payoutData } from './sanitize';
import { filterCreators } from './filters';
import { rankCreators } from './matching';
import { parseMoney } from './format';
import { calculateTotals } from './billing';
import { buildBrief } from './ai';
import { env } from './env';
import { upload } from './uploads';
import { checkPlagiarism } from './plagiarism';
import type { User, Brief, ContentType, Workflow, Database, Engagement } from '@/types';
const content = (v: unknown): ContentType => { if (!['image', 'video', 'audio', 'animation'].includes(String(v)))
    throw new Error('Invalid content type'); return v as ContentType; };
const safeList = (v: unknown) => list(v).map(cleanText);
function getEngagement(db: Database, id: string, userId: string): Engagement { const e = db.engagements.find(e => e.id === id); if (!e)
    throw new HttpError(404, 'Engagement not found'); requireOwner(e.brandId === userId || e.creatorId === userId); return e; }
function validateBrief(b: Record<string, unknown>, brandId: string): Brief { const deadline = text(b, 'deadline', 10); if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline) || !Number.isFinite(Date.parse(deadline)) || Date.parse(deadline) < Date.now() - 86400000)
    throw new Error('Choose a current or future deadline'); const ratio = text(b, 'aspectRatio', 10); if (!['9:16', '16:9', '1:1', '4:5'].includes(ratio))
    throw new Error('Invalid aspect ratio'); const budget = parseMoney(b.budget); if (budget <= 0)
    throw new Error('Budget must be positive'); return { id: randomUUID(), brandId, title: cleanText(text(b, 'title', 120)), description: cleanText(text(b, 'description')), contentType: content(b.contentType), style: cleanText(text(b, 'style', 120)), aspectRatio: ratio, requiredTools: safeList(b.requiredTools), requiredSkills: safeList(b.requiredSkills), budget, deadline, commercialUse: b.commercialUse === true, platforms: cleanText(text(b, 'platforms', 200)), duration: cleanText(text(b, 'duration', 100)), territory: cleanText(text(b, 'territory', 100)), exclusivity: b.exclusivity === true, shortlist: [], status: 'Open' }; }
export async function handle(req: NextRequest, segments: string[]): Promise<unknown> {
    const [resource, id, action] = segments, method = req.method;
    if (resource === 'health' && method === 'GET')
        return { ai: env.apiKey ? 'live' : 'fallback', aiNote: env.apiKey ? 'Configured; service errors use fallback' : 'Built-in fallback', payments: 'simulated', reverseSearch: 'not configured' };
    if (resource === 'auth') {
        if (id === 'me' && method === 'GET')
            return await getSession();
        if (id === 'logout' && method === 'POST') {
            await logout();
            return { loggedOut: true };
        }
        if (id === 'login' && method === 'POST') {
            const b = await body(req), email = text(b, 'email', 254).toLowerCase(), password = text(b, 'password', 128);
            const u = await readDb(db => db.users.find(u => u.email === email));
            if (!u || !verifyPassword(password, u.passwordHash))
                throw new HttpError(401, 'Invalid email or password');
            await setSession(u);
            return { id: u.id, role: u.role, alias: u.alias };
        }
        if (id === 'signup' && method === 'POST') {
            const b = await body(req), email = text(b, 'email', 254).toLowerCase(), password = text(b, 'password', 128);
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8)
                throw new Error('Use a valid email and a password of at least 8 characters');
            if (!['creator', 'brand'].includes(String(b.role)))
                throw new Error('Invalid role');
            const u = await mutateDb(db => { if (db.users.some(u => u.email === email))
                throw new Error('Email already registered'); let alias = ''; do {
                alias = `${b.role === 'creator' ? 'Creator' : 'Brand'} YG-${randomInt(1000, 1000000)}`;
            } while (db.users.some(u => u.alias === alias)); const user: User = { id: randomUUID(), role: b.role as 'brand' | 'creator', email, passwordHash: hashPassword(password), realName: text(b, 'realName', 120), phone: text(b, 'phone', 30), alias, avatarColor: '#6373ed', companyName: b.role === 'brand' ? cleanText(text(b, 'companyName', 120)) : '', industry: b.role === 'brand' ? cleanText(text(b, 'industry', 120)) : '', headline: '', bio: '', specialization: [], skills: [], tools: [], contentTypes: [], rate: 100000, turnaroundDays: 7 }; db.users.push(user); return user; });
            await setSession(u);
            return { id: u.id, role: u.role, alias: u.alias };
        }
    }
    if (resource === 'creators' && method === 'GET')
        return readDb(db => { const all = db.users.filter(u => u.role === 'creator').map(u => publicCreator(u, db)); if (id) {
            const c = all.find(c => c.alias === id || c.id === id);
            if (!c)
                throw new HttpError(404, 'Creator not found');
            return c;
        } const results = filterCreators(all, req.nextUrl.searchParams); return { creators: results, count: results.length, alternatives: results.length ? [] : all.slice(0, 3) }; });
    if (resource === 'profile') {
        const user = await requireUser();
        if (method === 'GET')
            return readDb(db => { const u = db.users.find(u => u.id === user.id)!; return user.role === 'creator' ? publicCreator(u, db) : { companyName: maskLeaks(u.companyName).text, industry: maskLeaks(u.industry).text }; });
        if (method === 'POST') {
            const b = await body(req);
            return mutateDb(db => { const u = db.users.find(u => u.id === user.id)!; if (user.role === 'brand') {
                u.companyName = cleanText(text(b, 'companyName', 120));
                u.industry = cleanText(text(b, 'industry', 120));
                return { companyName: u.companyName, industry: u.industry };
            } u.headline = cleanText(text(b, 'headline', 160)); u.bio = cleanText(text(b, 'bio')); u.skills = safeList(b.skills); u.tools = safeList(b.tools); u.specialization = safeList(b.specialization); u.contentTypes = list(b.contentTypes).map(content); u.rate = parseMoney(b.rate); const days = Number(b.turnaroundDays); if (!Number.isInteger(days) || days < 1 || days > 365)
                throw new Error('Turnaround must be 1–365 days'); u.turnaroundDays = days; return publicCreator(u, db); });
        }
    }
    if ((resource === 'portfolio' || resource === 'plagiarism') && method === 'POST') {
        const user = await requireUser('creator'), form = await req.formData();
        const b = Object.fromEntries(form.entries()) as Record<string, unknown>;
        const title = cleanText(text(b, 'title', 120)), description = cleanText(text(b, 'description'));
        const uploaded = await upload(form);
        const fields = ['model', 'seed', 'sampler', 'cfg', 'loras', 'controlNets', 'promptStructure', 'modelSource'] as const;
        const workflow = {} as Workflow;
        for (const field of fields)
            workflow[field] = cleanText(text(b, field, 1000, true));
        if (!['commercial-safe', 'non-commercial'].includes(String(b.license)))
            throw new Error('Select a license');
        workflow.license = b.license as Workflow['license'];
        const toolsUsed = safeList(b.toolsUsed), ct = content(b.contentType);
        if (uploaded.buffer && uploaded.isImage && ct !== 'image' && ct !== 'animation')
            throw new Error('Image file requires image or animation content type');
        const note = await checkPlagiarism(uploaded.buffer, uploaded.isImage, title, description, await readDb(db => db.portfolio));
        if (resource === 'plagiarism')
            return note;
        return mutateDb(async (db) => { let plagiarism = note; if (uploaded.buffer && db.portfolio.some(p => p.plagiarism.sha256 === note.sha256))
            plagiarism = { ...note, status: 'Blocked (duplicate)', checks: [...note.checks, 'Duplicate found during publishing check'] }; if (plagiarism.status === 'Blocked (duplicate)')
            return { published: false, plagiarism }; const item = { id: randomUUID(), creatorId: user.id, title, description, contentType: ct, mediaUrl: uploaded.mediaUrl, toolsUsed, workflow, plagiarism }; db.portfolio.push(item); return { published: true, item, plagiarism }; });
    }
    if (resource === 'brief-builder' && method === 'POST') {
        await requireUser('brand');
        return buildBrief(text(await body(req), 'idea', 4000));
    }
    if (resource === 'briefs') {
        const user = await requireUser('brand');
        if (method === 'GET')
            return readDb(db => { const briefs = db.briefs.filter(b => b.brandId === user.id).map(publicBrief); if (!id)
                return briefs; const brief = briefs.find(b => b.id === id); if (!brief)
                throw new HttpError(403, 'Forbidden'); return brief; });
        if (method === 'POST') {
            const b = await body(req);
            return mutateDb(db => { if (id && action === 'shortlist') {
                const brief = db.briefs.find(x => x.id === id);
                requireOwner(brief?.brandId === user.id);
                const creatorId = text(b, 'creatorId', 100);
                if (!db.users.some(u => u.id === creatorId && u.role === 'creator'))
                    throw new Error('Creator not found');
                if (!brief!.shortlist.includes(creatorId))
                    brief!.shortlist.push(creatorId);
                if (brief!.status === 'Open')
                    brief!.status = 'Shortlisted';
                return publicBrief(brief!);
            } const brief = validateBrief(b, user.id); db.briefs.push(brief); return publicBrief(brief); });
        }
    }
    if (resource === 'match' && method === 'GET') {
        const user = await requireUser('brand');
        return readDb(db => { const brief = db.briefs.find(b => b.id === id); requireOwner(brief?.brandId === user.id); return rankCreators(brief!, db.users.filter(u => u.role === 'creator').map(u => publicCreator(u, db))); });
    }
    if (resource === 'invites' && method === 'POST') {
        const user = await requireUser('brand'), b = await body(req);
        return mutateDb(db => { const brief = db.briefs.find(x => x.id === text(b, 'briefId', 100)); requireOwner(brief?.brandId === user.id); if (brief!.status === 'Delivered')
            throw new Error('Brief already delivered'); const creatorId = text(b, 'creatorId', 100); if (!db.users.some(u => u.id === creatorId && u.role === 'creator'))
            throw new Error('Creator not found'); if (db.engagements.some(e => e.briefId === brief!.id && e.creatorId === creatorId && e.status !== 'Declined'))
            throw new Error('This creator is already invited'); const e: Engagement = { id: randomUUID(), brandId: user.id, creatorId, briefId: brief!.id, message: cleanText(text(b, 'message', 1000)), status: 'Invited', deliveries: [], createdAt: new Date().toISOString() }; db.engagements.push(e); return publicEngagement(e, db, user); });
    }
    if (resource === 'dashboard' && method === 'GET') {
        const user = await requireUser();
        return readDb(db => ({ user: { id: user.id, role: user.role, alias: user.alias }, engagements: db.engagements.filter(e => e.brandId === user.id || e.creatorId === user.id).map(e => publicEngagement(e, db, user)), briefs: user.role === 'brand' ? db.briefs.filter(b => b.brandId === user.id).map(publicBrief) : [], billing: user.role === 'brand' ? db.invoices.filter(i => i.brandId === user.id).map(invoiceData) : db.payoutStatements.filter(i => i.creatorId === user.id).map(payoutData), earnings: user.role === 'creator' ? db.payoutStatements.filter(p => p.creatorId === user.id).reduce((sum, p) => sum + p.net, 0) : 0 }));
    }
    if (resource === 'engagements') {
        const user = await requireUser();
        if (method === 'GET')
            return readDb(db => publicEngagement(getEngagement(db, id, user.id), db, user));
        if (method === 'POST') {
            const b = await body(req);
            return mutateDb(db => { const e = getEngagement(db, id, user.id), operation = text(b, 'action', 30); if (operation === 'accept' || operation === 'decline') {
                requireOwner(user.role === 'creator' && e.creatorId === user.id);
                if (e.status !== 'Invited')
                    throw new Error('Invite already handled');
                e.status = operation === 'accept' ? 'In Progress' : 'Declined';
                if (operation === 'accept') {
                    const brief = db.briefs.find(b => b.id === e.briefId)!;
                    const totals = calculateTotals(brief.budget);
                    e.contract = { id: randomUUID(), engagementId: e.id, price: brief.budget, platformFee: totals.platformFee, creatorPayout: totals.creatorPayout, createdAt: new Date().toISOString() };
                    brief.status = 'In Progress';
                }
            }
            else if (operation === 'approve' || operation === 'revision') {
                requireOwner(user.role === 'brand' && e.brandId === user.id);
                if (!['In Progress', 'Revision'].includes(e.status) || !e.deliveries.length)
                    throw new Error('Delivery required before review');
                e.status = operation === 'approve' ? 'Approved' : 'Revision';
                if (operation === 'revision')
                    db.briefs.find(b => b.id === e.briefId)!.status = 'Revision';
            }
            else
                throw new Error('Invalid action'); return publicEngagement(e, db, user); });
        }
    }
    if (resource === 'deliveries' && method === 'POST') {
        const user = await requireUser('creator');
        await readDb(db => { const e = getEngagement(db, id, user.id); requireOwner(e.creatorId === user.id); if (!['In Progress', 'Revision'].includes(e.status))
            throw new Error('Engagement cannot receive deliveries'); });
        const form = await req.formData(), title = cleanText(String(form.get('title') || 'Delivery'));
        if (!title || title.length > 120)
            throw new Error('Invalid delivery title');
        const uploaded = await upload(form);
        return mutateDb(db => { const e = getEngagement(db, id, user.id); if (!['In Progress', 'Revision'].includes(e.status))
            throw new Error('Engagement cannot receive deliveries'); e.deliveries.push({ id: randomUUID(), title, mediaUrl: uploaded.mediaUrl, createdAt: new Date().toISOString() }); e.status = 'In Progress'; db.briefs.find(b => b.id === e.briefId)!.status = 'In Progress'; return publicEngagement(e, db, user); });
    }
    if (resource === 'messages') {
        const user = await requireUser();
        if (method === 'GET')
            return readDb(db => { const e = getEngagement(db, id, user.id); if (['Invited', 'Declined'].includes(e.status))
                throw new HttpError(403, 'Chat opens after acceptance'); return db.messages.filter(m => m.engagementId === id).map(m => ({ id: m.id, text: maskLeaks(m.text).text, createdAt: m.createdAt, senderAlias: m.senderId === e.creatorId ? db.users.find(u => u.id === e.creatorId)!.alias : maskLeaks(db.users.find(u => u.id === e.brandId)!.companyName).text, mine: m.senderId === user.id })); });
        if (method === 'POST') {
            const b = await body(req), result = maskLeaks(text(b, 'text', 3000));
            return mutateDb(db => { const e = getEngagement(db, id, user.id); if (['Invited', 'Declined'].includes(e.status))
                throw new HttpError(403, 'Chat opens after acceptance'); db.messages.push({ id: randomUUID(), engagementId: id, senderId: user.id, text: result.text, createdAt: new Date().toISOString() }); if (result.blocked)
                db.blockedAttempts.push({ userId: user.id, createdAt: new Date().toISOString(), kind: 'chat contact leak' }); return { warning: result.blocked ? 'Contact details were hidden by YUGANTAR.' : '' }; });
        }
    }
    throw new HttpError(404, 'Route not found');
}
