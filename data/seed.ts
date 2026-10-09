import { hashPassword } from '@/lib/auth';
import { calculateTotals, createInvoiceAndStatement } from '@/lib/billing';
import type { Database, User, ContentType } from '@/types';
export function createSeed(): Database {
    const db: Database = { users: [], portfolio: [], briefs: [], engagements: [], messages: [], payments: [], invoices: [], payoutStatements: [], counters: {}, blockedAttempts: [] };
    const pairs = [['Midjourney', 'Art direction'], ['Runway', 'Video editing'], ['ElevenLabs', 'Voice design'], ['ComfyUI', 'Product imagery'], ['Suno', 'Music'], ['Kling', 'Animation'], ['Pika', 'Storytelling'], ['Stable Diffusion', 'Illustration'], ['HeyGen', 'Avatars'], ['AnimateDiff', 'Motion design']];
    const types: ContentType[] = ['image', 'video', 'audio', 'image', 'audio', 'animation', 'video', 'image', 'video', 'animation'];
    const passwordHash = hashPassword('Demo123!');
    for (let i = 0; i < 10; i++) {
        const [tool, skill] = pairs[i];
        const u: User = { id: `creator-${i + 1}`, role: 'creator', realName: `Private Creator ${i + 1}`, email: `creator${i + 1}@demo.local`, phone: `90000000${String(i).padStart(2, '0')}`, passwordHash, alias: `Creator YG-${4821 + i}`, avatarColor: ['#6373ed', '#ac6ee5', '#289b89', '#df9852'][i % 4], companyName: '', industry: '', headline: `${skill} with ${tool}`, bio: 'Distinctive AI content, crafted with a documented creative process.', specialization: [i % 2 ? 'Advertising' : 'Product'], skills: [skill, 'Creative direction'], tools: [tool], contentTypes: [types[i]], rate: 100000 + i * 20000, turnaroundDays: 3 + i % 4 };
        db.users.push(u);
        db.portfolio.push({ id: `portfolio-${i + 1}`, creatorId: u.id, title: `Studio study ${i + 1}`, description: 'An original concept exploring colour, composition and storytelling.', contentType: 'image', mediaUrl: `/samples/study-${i % 4 + 1}.svg`, toolsUsed: [tool], workflow: { model: 'Studio demo model', seed: String(1200 + i), sampler: 'Euler', cfg: '7', loras: 'None', controlNets: 'None', promptStructure: 'Subject, setting, lighting, composition', license: i === 7 ? 'non-commercial' : 'commercial-safe', modelSource: 'Local demo workflow' }, plagiarism: { status: 'Original', checks: ['Seeded demonstration: no uploaded file was checked.'] } });
    }
    for (let i = 0; i < 4; i++)
        db.users.push({ id: `brand-${i + 1}`, role: 'brand', realName: `Private Brand Contact ${i + 1}`, email: `brand${i + 1}@demo.local`, phone: '9111111111', passwordHash, alias: `Brand YG-${8001 + i}`, avatarColor: '#6373ed', companyName: ['Orbit Studio', 'Moss & Co', 'Nova Goods', 'Echo Agency'][i], industry: ['Retail', 'Lifestyle', 'Technology', 'Agency'][i], headline: '', bio: '', specialization: [], skills: [], tools: [], contentTypes: [], rate: 0, turnaroundDays: 0 });
    for (let i = 0; i < 6; i++)
        db.briefs.push({ id: `brief-${i + 1}`, brandId: `brand-${i % 4 + 1}`, title: ['Launch campaign visuals', 'A cinematic product story', 'A new sonic identity', 'Seasonal product collection', 'Social launch series', 'Animated explainer'][i], description: 'Create memorable AI content for a fresh product campaign with a clear creative direction.', contentType: types[i], style: 'Modern, warm, editorial', aspectRatio: '9:16', requiredTools: [pairs[i][0]], requiredSkills: [pairs[i][1]], budget: 100000 + i * 25000, deadline: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10), commercialUse: true, platforms: 'Social and website', duration: '12 months', territory: 'Worldwide', exclusivity: false, shortlist: [], status: 'Open' });
    for (let i = 0; i < 2; i++) {
        const totals = calculateTotals(100000);
        const e = { id: `engagement-${i + 1}`, brandId: `brand-${i + 1}`, creatorId: `creator-${i + 1}`, briefId: `brief-${i + 1}`, message: 'We would love to collaborate on this campaign.', status: 'Approved' as const, createdAt: new Date().toISOString(), deliveries: [{ id: `delivery-${i + 1}`, title: 'Final campaign', mediaUrl: `/samples/study-${i + 1}.svg`, createdAt: new Date().toISOString() }], contract: { id: `contract-${i + 1}`, engagementId: `engagement-${i + 1}`, price: 100000, platformFee: totals.platformFee, creatorPayout: totals.creatorPayout, createdAt: new Date().toISOString() } };
        db.engagements.push(e);
        createInvoiceAndStatement(db, e);
        db.messages.push({ id: `message-${i + 1}`, engagementId: e.id, senderId: e.creatorId, text: 'Your campaign delivery is ready. Thanks for collaborating!', createdAt: new Date().toISOString() });
    }
    return db;
}
